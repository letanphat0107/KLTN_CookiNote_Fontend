import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  Alert,
  TextInput,
} from "react-native";
import { recipeStyles } from "./styles";
import { useAppSelector } from "../../store/hooks";
import { useRecipe } from "../../hooks/useRecipe";
import { RecipeWithDetails } from "../../types/recipe";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../services/favoriteService";
import EditRecipeModal from "../../components/Recipe/EditRecipeModal";
import {
  addRecipeToShoppingList,
  forkRecipe,
} from "../../services/recipeActionService";

import { shareRecipe, ShareRecipeResponse } from "../../services/shareService";
import ShareQRModal from "../Recipe/ShareQRModal";

import { rateRecipe, deleteRating } from "../../services/ratingService";
import {
  getRecipeComments,
  addComment,
  updateComment,
  deleteComment,
  Comment,
} from "../../services/commentService";
import { Ionicons } from "@expo/vector-icons";

interface RecipeDetailScreenProps {
  route?: {
    params?: {
      recipeId?: string | number;
      showEditButton?: boolean; // Add prop to control edit button visibility
      showAddToCartButton?: boolean; // Add prop to control add to cart button visibility
    };
  };
  navigation?: any;
}

const RecipeDetailScreen: React.FC<RecipeDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const recipeId = route?.params?.recipeId;
  const showEditButton = route?.params?.showEditButton ?? true; // Default: true
  const showAddToCartButton = route?.params?.showAddToCartButton ?? true; // Default: true

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { getRecipeDetails } = useRecipe();

  // State for recipe data
  const [recipe, setRecipe] = useState<RecipeWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Favorite state
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);

  // Toast message state
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const toastOpacity = useState(new Animated.Value(0))[0];
  const toastTranslateY = useState(new Animated.Value(-100))[0];

  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Share modal state
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareData, setShareData] = useState<ShareRecipeResponse | null>(null);
  const [isSharing, setIsSharing] = useState(false);

  // Rating state
  const userId = useAppSelector((state) => state.auth.user?.userId);
  const [currentRating, setCurrentRating] = useState<number>(0);
  const [isRating, setIsRating] = useState(false);

  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [replyToCommentId, setReplyToCommentId] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Fetch recipe details when component mounts
  useEffect(() => {
    if (recipeId) {
      fetchRecipeDetails();
    } else {
      setError("Recipe ID not found");
      setIsLoading(false);
    }
  }, [recipeId]);

  useEffect(() => {
    if (recipe && isAuthenticated) {
      // Remove checkRecipeFavoriteStatus() - use isFavorited from API
      loadComments();
    }
  }, [recipe, isAuthenticated]);

  const fetchRecipeDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log("Fetching recipe details for ID:", recipeId);
      const recipeData = await getRecipeDetails(Number(recipeId));

      if (recipeData) {
        setRecipe(recipeData);
        setIsFavorite(recipeData.isFavorited); // Use isFavorited from API
        setCurrentRating(recipeData.myRating || 0); // Set current rating
        console.log("Recipe details loaded:", recipeData.title);
      } else {
        setError("Vui lòng đăng nhập để xem chi tiết công thức");
      }
    } catch (error) {
      setError("Đã xảy ra lỗi khi tải công thức");
    } finally {
      setIsLoading(false);
    }
  };

  // Toast functions
  const showToastMessage = (message: string, duration: number = 3000) => {
    hideToast();

    setToastMessage(message);
    setShowToast(true);

    Animated.parallel([
      Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(toastTranslateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      hideToast();
    }, duration);
  };

  const hideToast = () => {
    if (showToast) {
      Animated.parallel([
        Animated.timing(toastOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(toastTranslateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowToast(false);
        setToastMessage("");
      });
    }
  };

  const handleStartCooking = () => {
    if (!isAuthenticated) {
      showToastMessage(
        "🔐 Vui lòng đăng nhập để sử dụng chế độ hướng dẫn nấu ăn!",
        4000
      );

      setTimeout(() => {
        if (navigation) {
          navigation.navigate("Login");
        }
      }, 2000);
      return;
    }

    // Check if recipe has steps
    if (!recipe?.steps || recipe.steps.length === 0) {
      showToastMessage("😔 Công thức này chưa có hướng dẫn từng bước!", 3000);
      return;
    }

    // Navigate to RecipeGuide with steps data
    if (navigation) {
      navigation.navigate("RecipeGuide", {
        steps: recipe.steps,
        recipeTitle: recipe.title,
        recipeId: recipe.id,
      });
    }
  };

  const handleAddToFavorite = async () => {
    if (!isAuthenticated) {
      showToastMessage(
        "❤️ Vui lòng đăng nhập để lưu công thức yêu thích!",
        3000
      );

      setTimeout(() => {
        if (navigation) {
          navigation.navigate("Login");
        }
      }, 2000);
      return;
    }

    if (!recipe?.id) {
      showToastMessage("❌ Không thể thực hiện thao tác này!", 2000);
      return;
    }

    setIsFavoriteLoading(true);

    try {
      if (isFavorite) {
        // Remove from favorites
        const success = await removeFromFavorites(recipe.id);

        if (success) {
          setIsFavorite(false);
          showToastMessage("💔 Đã xóa khỏi danh sách yêu thích!", 2000);
        } else {
          showToastMessage(
            "❌ Không thể xóa khỏi yêu thích. Thử lại sau!",
            3000
          );
        }
      } else {
        // Add to favorites
        const success = await addToFavorites(recipe.id);

        if (success) {
          setIsFavorite(true);
          showToastMessage("❤️ Đã thêm vào danh sách yêu thích!", 2000);
        } else {
          showToastMessage(
            "❌ Không thể thêm vào yêu thích. Thử lại sau!",
            3000
          );
        }
      }
    } catch (error) {
      console.error("Error handling favorite:", error);
      showToastMessage("❌ Đã xảy ra lỗi. Vui lòng thử lại!", 3000);
    } finally {
      setIsFavoriteLoading(false);
    }
  };

  const handleShare = async () => {
    if (!isAuthenticated) {
      showToastMessage("🔐 Vui lòng đăng nhập để chia sẻ công thức!", 3000);
      setTimeout(() => {
        if (navigation) {
          navigation.navigate("Login");
        }
      }, 2000);
      return;
    }

    if (!recipe?.id) {
      showToastMessage("❌ Không thể chia sẻ công thức này!", 2000);
      return;
    }

    setIsSharing(true);
    showToastMessage("📤 Đang tạo mã chia sẻ...", 2000);

    try {
      const result = await shareRecipe(recipe.id);

      if (result) {
        setShareData(result);
        setShowShareModal(true);
        // showToastMessage("✅ Tạo mã QR thành công!", 2000);
      } else {
        showToastMessage("❌ Không thể tạo mã chia sẻ. Thử lại sau!", 3000);
      }
    } catch (error) {
      console.error("Error sharing recipe:", error);
      showToastMessage("❌ Đã xảy ra lỗi. Vui lòng thử lại!", 3000);
    } finally {
      setIsSharing(false);
    }
  };

  const handleRetry = () => {
    fetchRecipeDetails();
  };

  const handleAddToShoppingCart = async () => {
    if (!isAuthenticated) {
      showToastMessage(
        "🛒 Vui lòng đăng nhập để sử dụng danh sách mua sắm!",
        3000
      );
      setTimeout(() => {
        if (navigation) {
          navigation.navigate("Login");
        }
      }, 2000);
      return;
    }

    if (!recipe?.id) {
      showToastMessage("❌ Không thể thực hiện thao tác này!", 2000);
      return;
    }

    setIsAddingToCart(true);
    try {
      const success = await addRecipeToShoppingList(recipe.id);

      if (success) {
        showToastMessage("🛒 Đã thêm nguyên liệu vào danh sách mua sắm!", 3000);
      } else {
        showToastMessage("❌ Không thể thêm vào danh sách mua sắm!", 3000);
      }
    } catch (error) {
      console.error("Error adding to shopping cart:", error);
      showToastMessage("❌ Đã xảy ra lỗi. Vui lòng thử lại!", 3000);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleEditRecipe = () => {
    if (!isAuthenticated) {
      showToastMessage("✏️ Vui lòng đăng nhập để chỉnh sửa công thức!", 3000);
      setTimeout(() => {
        if (navigation) {
          navigation.navigate("Login");
        }
      }, 2000);
      return;
    }

    setShowEditModal(true);
  };

  const handleSaveEditedRecipe = async (formData: any) => {
    if (!recipe?.id) return false;

    try {
      const success = await forkRecipe(recipe.id, formData);
      return success;
    } catch (error) {
      console.error("Error saving edited recipe:", error);
      return false;
    }
  };

  const handleRating = async (score: number) => {
  if (!isAuthenticated) {
    showToastMessage("⭐ Vui lòng đăng nhập để đánh giá!", 3000);
    setTimeout(() => {
      if (navigation) {
        navigation.navigate("Login");
      }
    }, 2000);
    return;
  }

  if (!recipe?.id) return;

  setIsRating(true);
  try {
    const success = await rateRecipe(recipe.id, score);

    if (success) {
      setCurrentRating(score);
      showToastMessage(`⭐ Đã đánh giá ${score} sao!`, 2000);
      
      // Update recipe state locally instead of reloading
      setRecipe(prev => {
        if (!prev) return prev;
        
        const oldRating = currentRating;
        const oldCount = prev.ratingCount || 0;
        const oldAverage = prev.averageRating || 0;
        
        let newCount = oldCount;
        let newAverage = oldAverage;
        
        if (oldRating === 0) {
          // New rating
          newCount = oldCount + 1;
          newAverage = ((oldAverage * oldCount) + score) / newCount;
        } else {
          // Update existing rating
          newAverage = ((oldAverage * oldCount) - oldRating + score) / oldCount;
        }
        
        return {
          ...prev,
          ratingCount: newCount,
          averageRating: newAverage,
          myRating: score
        };
      });
    } else {
      showToastMessage("❌ Không thể đánh giá. Thử lại sau!", 3000);
    }
  } catch (error) {
    console.error("Error rating recipe:", error);
    showToastMessage("❌ Đã xảy ra lỗi. Vui lòng thử lại!", 3000);
  } finally {
    setIsRating(false);
  }
};

  const handleDeleteRating = async () => {
  if (!recipe?.id || !currentRating) return;

  Alert.alert("Xác nhận", "Bạn có chắc muốn xóa đánh giá của mình?", [
    { text: "Hủy", style: "cancel" },
    {
      text: "Xóa",
      style: "destructive",
      onPress: async () => {
        setIsRating(true);
        try {
          const success = await deleteRating(recipe.id);

          if (success) {
            const oldRating = currentRating;
            setCurrentRating(0);
            showToastMessage("🗑️ Đã xóa đánh giá!", 2000);
            
            // Update recipe state locally
            setRecipe(prev => {
              if (!prev) return prev;
              
              const oldCount = prev.ratingCount || 0;
              const oldAverage = prev.averageRating || 0;
              const newCount = Math.max(0, oldCount - 1);
              
              let newAverage = 0;
              if (newCount > 0) {
                newAverage = ((oldAverage * oldCount) - oldRating) / newCount;
              }
              
              return {
                ...prev,
                ratingCount: newCount,
                averageRating: newAverage,
                myRating: 0
              };
            });
          } else {
            showToastMessage("❌ Không thể xóa đánh giá!", 3000);
          }
        } catch (error) {
          console.error("Error deleting rating:", error);
          showToastMessage("❌ Đã xảy ra lỗi!", 3000);
        } finally {
          setIsRating(false);
        }
      },
    },
  ]);
};

  // Add comment functions
const loadComments = async (showLoading = true) => {
  if (!recipe?.id) return;

  if (showLoading) {
    setIsLoadingComments(true);
  }
  
  try {
    const commentsData = await getRecipeComments(recipe.id);

    // Add isOwner flag to each comment and reply
    const commentsWithOwnership = commentsData.map((comment) => ({
      ...comment,
      isOwner: comment.authorId === userId,
      replies: comment.replies?.map((reply) => ({
        ...reply,
        isOwner: reply.authorId === userId,
      })),
    }));

    setComments(commentsWithOwnership);
  } catch (error) {
    console.error("Error loading comments:", error);
  } finally {
    if (showLoading) {
      setIsLoadingComments(false);
    }
  }
};

  const handleSubmitComment = async () => {
  if (!isAuthenticated) {
    showToastMessage("💬 Vui lòng đăng nhập để bình luận!", 3000);
    setTimeout(() => {
      if (navigation) {
        navigation.navigate("Login");
      }
    }, 2000);
    return;
  }

  if (!recipe?.id || !commentText.trim()) return;

  setIsSubmittingComment(true);
  try {
    if (editingCommentId) {
      // Update existing comment
      const success = await updateComment(
        editingCommentId,
        commentText.trim()
      );
      if (success) {
        showToastMessage("✅ Đã cập nhật bình luận!", 2000);
        setEditingCommentId(null);
        setCommentText("");
        loadComments(); // Only reload comments, not entire recipe
      } else {
        showToastMessage("❌ Không thể cập nhật bình luận!", 3000);
      }
    } else {
      // Add new comment or reply
      const success = await addComment(
        recipe.id,
        commentText.trim(),
        replyToCommentId || undefined
      );

      if (success) {
        showToastMessage(
          replyToCommentId ? "💬 Đã trả lời!" : "💬 Đã bình luận!",
          2000
        );
        setCommentText("");
        setReplyToCommentId(null);
        loadComments(); // Only reload comments
        
        // Update comment count locally
        setRecipe(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            commentCount: (prev.commentCount || 0) + 1
          };
        });
      } else {
        showToastMessage("❌ Không thể gửi bình luận!", 3000);
      }
    }
  } catch (error) {
    console.error("Error submitting comment:", error);
    showToastMessage("❌ Đã xảy ra lỗi!", 3000);
  } finally {
    setIsSubmittingComment(false);
  }
};

  const handleEditComment = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setCommentText(comment.content);
    setReplyToCommentId(null);
  };

  const handleDeleteComment = async (commentId: number) => {
  Alert.alert("Xác nhận", "Bạn có chắc muốn xóa bình luận này?", [
    { text: "Hủy", style: "cancel" },
    {
      text: "Xóa",
      style: "destructive",
      onPress: async () => {
        try {
          const success = await deleteComment(commentId);

          if (success) {
            showToastMessage("🗑️ Đã xóa bình luận!", 2000);
            loadComments(); // Only reload comments
            
            // Update comment count locally
            setRecipe(prev => {
              if (!prev) return prev;
              return {
                ...prev,
                commentCount: Math.max(0, (prev.commentCount || 0) - 1)
              };
            });
          } else {
            showToastMessage("❌ Không thể xóa bình luận!", 3000);
          }
        } catch (error) {
          console.error("Error deleting comment:", error);
          showToastMessage("❌ Đã xảy ra lỗi!", 3000);
        }
      },
    },
  ]);
};

  const handleReplyComment = (commentId: number, authorName: string) => {
    setReplyToCommentId(commentId);
    setCommentText(`@${authorName} `);
    setEditingCommentId(null);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setReplyToCommentId(null);
    setCommentText("");
  };

  // Helper functions
  const formatDifficulty = (difficulty: string) => {
    switch (difficulty?.toUpperCase()) {
      case "EASY":
        return "Dễ";
      case "MEDIUM":
        return "Trung bình";
      case "HARD":
        return "Khó";
      default:
        return "Trung bình";
    }
  };

  const formatTime = (prepareTime: number, cookTime: number) => {
    const totalTime = prepareTime + cookTime;
    if (totalTime < 60) {
      return `${totalTime} phút`;
    } else {
      const hours = Math.floor(totalTime / 60);
      const minutes = totalTime % 60;
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }
  };

  const getRecipeImage = () => {
    if (recipe?.imageUrl) {
      return { uri: recipe.imageUrl };
    }
    // Fallback image
    return {
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_2BWz0CukYGFT9pvza-w6su7smU_xUkoEOg&s",
    };
  };

  // Render step images
  const renderStepImages = (images?: string[]) => {
    if (!images || images.length === 0) return null;

    return (
      <View style={recipeStyles.stepImagesWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={recipeStyles.stepImagesContainer}
          contentContainerStyle={{ paddingRight: 15 }}
        >
          {images.map((imageUrl, index) => (
            <View
              key={index}
              style={[
                recipeStyles.stepImageContainer,
                index === 0 && { marginLeft: 0 },
              ]}
            >
              <Image
                source={{ uri: imageUrl }}
                style={recipeStyles.stepImage}
                resizeMode="cover"
              />

              {/* Image counter */}
              <View style={recipeStyles.imageCounter}>
                <Text style={recipeStyles.imageCounterText}>
                  {index + 1}/{images.length}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Instructions for multiple images */}
        {images.length > 1 && (
          <Text style={recipeStyles.scrollHint}>
            📸 Lướt để xem {images.length} ảnh hướng dẫn
          </Text>
        )}
      </View>
    );
  };

  // Render rating stars
  const renderRatingStars = () => {
    return (
      <View style={recipeStyles.ratingContainer}>
        <View style={recipeStyles.ratingHeader}>
          <Text style={recipeStyles.ratingTitle}>⭐ Đánh giá</Text>
          <View style={recipeStyles.ratingStats}>
            <Text style={recipeStyles.averageRating}>
              {recipe?.averageRating?.toFixed(1) || "0.0"}
            </Text>
            <Text style={recipeStyles.ratingCount}>
              ({recipe?.ratingCount || 0} đánh giá)
            </Text>
          </View>
        </View>

        <View style={recipeStyles.starContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => handleRating(star)}
              disabled={isRating || !isAuthenticated}
              style={recipeStyles.starButton}
            >
              <Ionicons
                name={star <= currentRating ? "star" : "star-outline"}
                size={32}
                color={star <= currentRating ? "#FFD700" : "#BDC3C7"}
              />
            </TouchableOpacity>
          ))}
        </View>

        {currentRating > 0 && (
          <View style={recipeStyles.myRatingContainer}>
            <Text style={recipeStyles.myRatingText}>
              Bạn đã đánh giá: {currentRating} ⭐
            </Text>
            <TouchableOpacity
              onPress={handleDeleteRating}
              style={recipeStyles.deleteRatingButton}
              disabled={isRating}
            >
              <Ionicons name="trash-outline" size={16} color="#E74C3C" />
              <Text style={recipeStyles.deleteRatingText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  // Render comments
  const renderComment = (comment: Comment, isReply = false) => {
    return (
      <View
        key={comment.id}
        style={[recipeStyles.commentItem, isReply && recipeStyles.commentReply]}
      >
        <View style={recipeStyles.commentHeader}>
          <View style={recipeStyles.commentUserInfo}>
            <View style={recipeStyles.commentAvatar}>
              {comment.authorAvatar ? (
                <Image
                  source={{ uri: comment.authorAvatar }}
                  style={recipeStyles.avatarImage}
                />
              ) : (
                <Ionicons name="person-circle" size={40} color="#95A5A6" />
              )}
            </View>
            <View>
              <Text style={recipeStyles.commentUserName}>
                {comment.authorName}
              </Text>
              <Text style={recipeStyles.commentTime}>
                {new Date(comment.createdAt).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                {comment.updatedAt &&
                  comment.updatedAt !== comment.createdAt && (
                    <Text style={recipeStyles.editedLabel}>
                      {" "}
                      (Đã chỉnh sửa)
                    </Text>
                  )}
              </Text>
            </View>
          </View>

          {comment.isOwner && (
            <View style={recipeStyles.commentActions}>
              <TouchableOpacity
                onPress={() => handleEditComment(comment)}
                style={recipeStyles.commentActionButton}
              >
                <Ionicons name="create-outline" size={18} color="#4A90E2" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteComment(comment.id)}
                style={recipeStyles.commentActionButton}
              >
                <Ionicons name="trash-outline" size={18} color="#E74C3C" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Text style={recipeStyles.commentContent}>{comment.content}</Text>

        {!isReply && (
          <TouchableOpacity
            onPress={() => handleReplyComment(comment.id, comment.authorName)}
            style={recipeStyles.replyButton}
          >
            <Ionicons name="arrow-undo-outline" size={16} color="#4A90E2" />
            <Text style={recipeStyles.replyButtonText}>Trả lời</Text>
          </TouchableOpacity>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <View style={recipeStyles.repliesContainer}>
            {comment.replies.map((reply) => renderComment(reply, true))}
          </View>
        )}
      </View>
    );
  };

  const renderCommentsSection = () => {
    return (
      <View style={recipeStyles.commentsSection}>
        <View style={recipeStyles.commentsSectionHeader}>
          <Text style={recipeStyles.sectionTitle}>
            💬 Bình luận ({recipe?.commentCount || 0})
          </Text>
        </View>

        {/* Comment Input */}
        <View style={recipeStyles.commentInputContainer}>
          <TextInput
            style={recipeStyles.commentInput}
            placeholder={
              editingCommentId
                ? "Chỉnh sửa bình luận..."
                : replyToCommentId
                ? "Viết câu trả lời..."
                : "Viết bình luận của bạn..."
            }
            value={commentText}
            onChangeText={setCommentText}
            multiline
            maxLength={500}
            placeholderTextColor="#95A5A6"
            editable={!isSubmittingComment}
          />
          <View style={recipeStyles.commentInputActions}>
            {(editingCommentId || replyToCommentId) && (
              <TouchableOpacity
                onPress={handleCancelEdit}
                style={recipeStyles.cancelButton}
              >
                <Text style={recipeStyles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[
                recipeStyles.submitCommentButton,
                (!commentText.trim() || isSubmittingComment) &&
                  recipeStyles.submitCommentButtonDisabled,
              ]}
              onPress={handleSubmitComment}
              disabled={!commentText.trim() || isSubmittingComment}
            >
              {isSubmittingComment ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Ionicons name="send" size={20} color="#FFFFFF" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Comments List */}
        {isLoadingComments ? (
          <View style={recipeStyles.loadingCommentsContainer}>
            <ActivityIndicator size="small" color="#FF6B35" />
            <Text style={recipeStyles.loadingCommentsText}>
              Đang tải bình luận...
            </Text>
          </View>
        ) : comments.length > 0 ? (
          <View style={recipeStyles.commentsList}>
            {comments.map((comment) => renderComment(comment))}
          </View>
        ) : (
          <View style={recipeStyles.noCommentsContainer}>
            <Ionicons name="chatbubbles-outline" size={48} color="#BDC3C7" />
            <Text style={recipeStyles.noCommentsText}>
              Chưa có bình luận nào. Hãy là người đầu tiên!
            </Text>
          </View>
        )}
      </View>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <View style={recipeStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
        <Text style={recipeStyles.loadingText}>Đang tải công thức...</Text>
      </View>
    );
  }

  // Error state
  if (error || !recipe) {
    return (
      <View style={recipeStyles.errorContainer}>
        <Text style={recipeStyles.errorTitle}>😔 Oops!</Text>
        <Text style={recipeStyles.errorMessage}>
          {error || "Vui lòng thử lại sau vài phút."}
        </Text>
        <TouchableOpacity
          style={recipeStyles.retryButton}
          onPress={handleRetry}
        >
          <Text style={recipeStyles.retryButtonText}>Thử lại</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={recipeStyles.backButton}
          onPress={() => navigation?.goBack()}
        >
          <Text style={recipeStyles.backButtonText}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={recipeStyles.container}>
      {/* Toast Message */}
      {showToast && (
        <Animated.View
          style={[
            recipeStyles.toastContainer,
            {
              opacity: toastOpacity,
              transform: [{ translateY: toastTranslateY }],
            },
          ]}
        >
          <View style={recipeStyles.toastContent}>
            <Text style={recipeStyles.toastText}>{toastMessage}</Text>
            <TouchableOpacity
              style={recipeStyles.toastCloseButton}
              onPress={hideToast}
            >
              <Text style={recipeStyles.toastCloseText}>✕</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      <ScrollView
        style={recipeStyles.content}
        contentContainerStyle={recipeStyles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Recipe Image */}
        <View style={recipeStyles.imageContainer}>
          <Image source={getRecipeImage()} style={recipeStyles.recipeImage} />
        </View>

        {/* Recipe Title */}
        <Text style={recipeStyles.title}>{recipe.title}</Text>

        {/* Owner Info */}
        <View style={recipeStyles.ownerSection}>
          <Text style={recipeStyles.ownerText}>
            👨‍🍳 Bởi: {recipe.ownerName || "Ẩn danh"}
          </Text>
          <Text style={recipeStyles.viewText}>👁️ {recipe.view} lượt xem</Text>
        </View>

        {/* Recipe Info Section */}
        <View style={recipeStyles.infoSection}>
          <View style={recipeStyles.infoRow}>
            <Text style={recipeStyles.infoLabel}>Thời gian chuẩn bị:</Text>
            <Text style={recipeStyles.infoValue}>
              {recipe.prepareTime} phút
            </Text>
          </View>
          <View style={recipeStyles.infoRow}>
            <Text style={recipeStyles.infoLabel}>Thời gian nấu:</Text>
            <Text style={recipeStyles.infoValue}>{recipe.cookTime} phút</Text>
          </View>
          <View style={recipeStyles.infoRow}>
            <Text style={recipeStyles.infoLabel}>Tổng thời gian:</Text>
            <Text style={recipeStyles.infoValue}>
              {formatTime(recipe.prepareTime, recipe.cookTime)}
            </Text>
          </View>
          <View style={recipeStyles.infoRow}>
            <Text style={recipeStyles.infoLabel}>Độ khó:</Text>
            <Text style={recipeStyles.infoValue}>
              {formatDifficulty(recipe.difficulty)}
            </Text>
          </View>
        </View>

        {/* Button Chỉnh sửa va Button Thêm vào Shopping Cart */}
        {(showEditButton || showAddToCartButton) && (
          <View style={recipeStyles.actionButtonsTop}>
            {showEditButton && (
              <TouchableOpacity
                style={[
                  recipeStyles.editButton,
                  !showAddToCartButton && { flex: 1 }, // Full width if cart button hidden
                  !isAuthenticated && recipeStyles.disabledButton,
                ]}
                onPress={handleEditRecipe}
                disabled={!isAuthenticated}
              >
                <Text
                  style={[
                    recipeStyles.editButtonText,
                    !isAuthenticated && recipeStyles.disabledButtonText,
                  ]}
                >
                  ✏️ Tạo bản sao
                </Text>
              </TouchableOpacity>
            )}

            {showAddToCartButton && (
              <TouchableOpacity
                style={[
                  recipeStyles.addToCartButton,
                  !showEditButton && { flex: 1 }, // Full width if edit button hidden
                  !isAuthenticated && recipeStyles.disabledButton,
                ]}
                onPress={handleAddToShoppingCart}
                disabled={!isAuthenticated || isAddingToCart}
              >
                {isAddingToCart ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text
                    style={[
                      recipeStyles.addToCartButtonText,
                      !isAuthenticated && recipeStyles.disabledButtonText,
                    ]}
                  >
                    📃 Thêm vào giỏ
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Description */}
        {recipe.description && (
          <Text style={recipeStyles.description}>{recipe.description}</Text>
        )}

        {/* Ingredients Section */}
        <View style={recipeStyles.section}>
          <Text style={recipeStyles.sectionTitle}>🥄 Nguyên liệu</Text>
          <View style={recipeStyles.ingredientsContainer}>
            {recipe.ingredients?.map((ingredient) => (
              <View key={ingredient.id} style={recipeStyles.ingredientItem}>
                <View style={recipeStyles.ingredientBullet} />
                <Text style={recipeStyles.ingredientName}>
                  {ingredient.name}
                </Text>
                <Text style={recipeStyles.ingredientQuantity}>
                  {ingredient.quantity}
                </Text>
              </View>
            )) || (
              <Text style={recipeStyles.noDataText}>
                Chưa có thông tin nguyên liệu
              </Text>
            )}
          </View>
        </View>

        {/* Steps Section */}
        <View style={recipeStyles.section}>
          <Text style={recipeStyles.sectionTitle}>📝 Các bước thực hiện</Text>
          <View style={recipeStyles.stepsContainer}>
            {recipe.steps?.map((step) => (
              <View key={step.id} style={recipeStyles.stepItem}>
                <View style={recipeStyles.stepNumber}>
                  <Text style={recipeStyles.stepNumberText}>{step.stepNo}</Text>
                </View>
                <View style={recipeStyles.stepContent}>
                  <Text style={recipeStyles.stepText}>{step.content}</Text>

                  {/* Step Images */}
                  {renderStepImages(step.images)}

                  {/* Suggested Time */}
                  {step.suggestedTime != null && (
                    <View style={recipeStyles.stepTimeContainer}>
                      <Text style={recipeStyles.stepTimeText}>
                        ⏱️ Thời gian gợi ý: {step.suggestedTime} phút
                      </Text>
                    </View>
                  )}

                  {/* Tips */}
                  {step.tips && (
                    <View style={recipeStyles.stepTipsContainer}>
                      <Text style={recipeStyles.stepTipsTitle}>💡 Mẹo:</Text>
                      <Text style={recipeStyles.stepTipsText}>{step.tips}</Text>
                    </View>
                  )}
                </View>
              </View>
            )) || (
              <Text style={recipeStyles.noDataText}>
                Chưa có hướng dẫn thực hiện
              </Text>
            )}
          </View>
        </View>

        {/* Rating Section */}
        {renderRatingStars()}

        {/* Comments Section */}
        {renderCommentsSection()}
        {/* Bottom spacing for fixed buttons */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Action Buttons */}
      <View style={recipeStyles.actionButtons}>
        <TouchableOpacity
          style={[
            recipeStyles.favoriteButton,
            isFavorite && recipeStyles.favoriteActiveButton,
          ]}
          onPress={handleAddToFavorite}
          disabled={isFavoriteLoading || !isAuthenticated}
        >
          {isFavoriteLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text
              style={[
                recipeStyles.favoriteButtonText,
                isFavorite && recipeStyles.favoriteActiveButtonText,
              ]}
            >
              {isFavorite ? "💖 Đã yêu thích" : "❤️ Yêu thích"}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            recipeStyles.shareButton,
            isSharing && recipeStyles.disabledButton,
          ]}
          onPress={handleShare}
          disabled={isSharing}
        >
          {isSharing ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={recipeStyles.shareButtonText}>📤 Chia sẻ</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            recipeStyles.startCookingButton,
            !isAuthenticated && recipeStyles.disabledCookingButton,
          ]}
          onPress={handleStartCooking}
        >
          <Text
            style={[
              recipeStyles.startCookingButtonText,
              !isAuthenticated && recipeStyles.disabledCookingButtonText,
            ]}
          >
            👨‍🍳 Bắt đầu nấu
          </Text>
        </TouchableOpacity>
      </View>

      <ShareQRModal
        visible={showShareModal}
        onClose={() => setShowShareModal(false)}
        shareData={shareData}
        recipeTitle={recipe?.title || ""}
      />

      {/* Edit Recipe Modal */}
      {recipe && (
        <EditRecipeModal
          visible={showEditModal}
          onClose={() => setShowEditModal(false)}
          recipe={recipe}
          onSave={handleSaveEditedRecipe}
        />
      )}
    </View>
  );
};

export default RecipeDetailScreen;
