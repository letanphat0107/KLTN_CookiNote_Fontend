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
} from "react-native";
import { recipeStyles } from "./styles";
import { useAppSelector } from "../../store/hooks";
import { useRecipe } from "../../hooks/useRecipe";
import { RecipeWithDetails } from "../../types/recipe";
import {
  addToFavorites,
  removeFromFavorites,
  checkFavoriteStatus,
} from "../../services/favoriteService";
import EditRecipeModal from "../../components/Recipe/EditRecipeModal";
import {
  addRecipeToShoppingList,
  forkRecipe,
} from "../../services/recipeActionService";

interface RecipeDetailScreenProps {
  route?: {
    params?: {
      recipeId?: string | number;
    };
  };
  navigation?: any;
}

const RecipeDetailScreen: React.FC<RecipeDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const recipeId = route?.params?.recipeId;
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

  // Fetch recipe details when component mounts
  useEffect(() => {
    if (recipeId) {
      fetchRecipeDetails();
    } else {
      setError("Recipe ID not found");
      setIsLoading(false);
    }
  }, [recipeId]);

  // Check favorite status when recipe loads and user is authenticated
  useEffect(() => {
    if (recipe && isAuthenticated) {
      checkRecipeFavoriteStatus();
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

  const checkRecipeFavoriteStatus = async () => {
    if (!recipe?.id) return;

    try {
      const favoriteStatus = await checkFavoriteStatus(recipe.id);
      setIsFavorite(favoriteStatus);
    } catch (error) {
      console.error("Error checking favorite status:", error);
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

  const handleShare = () => {
    showToastMessage("📤 Đang chia sẻ công thức...", 2000);
    console.log("Share recipe");
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
        <View style={recipeStyles.actionButtonsTop}>
          <TouchableOpacity
            style={[
              recipeStyles.editButton,
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
              ✏️ Chỉnh sửa
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              recipeStyles.addToCartButton,
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
        </View>

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
                  {step.suggestedTime && (
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
          style={recipeStyles.shareButton}
          onPress={handleShare}
        >
          <Text style={recipeStyles.shareButtonText}>📤 Chia sẻ</Text>
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
