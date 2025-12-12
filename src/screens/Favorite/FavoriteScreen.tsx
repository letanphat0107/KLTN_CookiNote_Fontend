import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { favoriteStyles } from "./styles";
import { useAppSelector } from "../../store/hooks";
import { Recipe } from "../../types/recipe";
import {
  getFavoriteRecipes,
  getMyRecipes,
  getDeletedRecipes,
  addToFavorites,
  removeFromFavorites,
  getCookedHistory,
  CookedHistoryItem,
  restoreRecipe,
  permanentDeleteRecipe,
} from "../../services/favoriteService";
import { useFocusEffect } from "@react-navigation/native";
import { getSharedRecipe } from "../../services/shareService";
import adminService from "../../services/adminService";

interface FavoriteScreenProps {
  navigation?: any;
}

type TabType = "favorites" | "myRecipes" | "cooked" | "deleted";

const FavoriteScreen: React.FC<FavoriteScreenProps> = ({ navigation }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("cooked");

  // Data states
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
  const [cookedHistory, setCookedHistory] = useState<CookedHistoryItem[]>([]);
  const [deletedRecipes, setDeletedRecipes] = useState<Recipe[]>([]);

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loadingActions, setLoadingActions] = useState<{
    [key: number]: boolean;
  }>({});

  // Pagination states
  const [hasMoreFavorites, setHasMoreFavorites] = useState(false);
  const [hasMoreMyRecipes, setHasMoreMyRecipes] = useState(false);
  const [hasMoreCooked, setHasMoreCooked] = useState(false);
  const [hasMoreDeleted, setHasMoreDeleted] = useState(false);

  // Add state for share code input
  const [shareCode, setShareCode] = useState("");
  const [isLoadingShare, setIsLoadingShare] = useState(false);

  // Track favorite status for each recipe
  const [favoriteStatuses, setFavoriteStatuses] = useState<{
    [key: number]: boolean;
  }>({});

  const tabs = [
    { key: "cooked" as TabType, label: "Đã nấu", icon: "✅" },
    { key: "favorites" as TabType, label: "Yêu thích", icon: "❤️" },
    { key: "myRecipes" as TabType, label: "Của tôi", icon: "👨‍🍳" },
    { key: "deleted" as TabType, label: "Đã xóa", icon: "🗑️" },
  ];

  // Auto-reload when screen is focused
  useFocusEffect(
    useCallback(() => {
      if (isAuthenticated) {
        console.log("Screen focused, reloading data...");
        loadData(true);
      }
    }, [isAuthenticated, activeTab])
  );

  // Load data when tab changes
  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [activeTab]);

  const loadData = async (isRefresh = false) => {
    if (!isAuthenticated) return;

    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      switch (activeTab) {
        case "cooked":
          await loadCookedHistory(isRefresh);
          break;
        case "favorites":
          await loadFavoriteRecipes(isRefresh);
          break;
        case "myRecipes":
          await loadMyRecipes(isRefresh);
          break;
        case "deleted":
          await loadDeletedRecipes(isRefresh);
          break;
      }
    } catch (error) {
      console.error("Error loading data:", error);
      Alert.alert("Lỗi", "Không thể tải dữ liệu. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const loadFavoriteRecipes = async (isRefresh = false) => {
    try {
      console.log("Loading favorite recipes...");
      const result = await getFavoriteRecipes(0, 20);
      setFavoriteRecipes(result.items || []);
      setHasMoreFavorites(result.hasNext);

      const newFavoriteStatuses = { ...favoriteStatuses };
      (result.items || []).forEach((recipe) => {
        newFavoriteStatuses[recipe.id] = true;
      });
      setFavoriteStatuses(newFavoriteStatuses);
    } catch (error) {
      console.error("Error loading favorite recipes:", error);
      setFavoriteRecipes([]);
    }
  };

  const loadMyRecipes = async (isRefresh = false) => {
    try {
      console.log("Loading my recipes...");
      const result = await getMyRecipes(0, 20);
      setMyRecipes(result.items || []);
      setHasMoreMyRecipes(result.hasNext);

      const newFavoriteStatuses = { ...favoriteStatuses };
      (result.items || []).forEach((recipe) => {
        if (!(recipe.id in newFavoriteStatuses)) {
          newFavoriteStatuses[recipe.id] = false;
        }
      });
      setFavoriteStatuses(newFavoriteStatuses);
    } catch (error) {
      console.error("Error loading my recipes:", error);
      setMyRecipes([]);
    }
  };

  const loadCookedHistory = async (isRefresh = false) => {
    try {
      const result = await getCookedHistory(0, 20);

      const items = result.items || [];
      setCookedHistory(items);
      setHasMoreCooked(result.hasNext || false);

      const newFavoriteStatuses = { ...favoriteStatuses };
      if (items.length > 0) {
        items.forEach((item) => {
          if (!(item.recipeId in newFavoriteStatuses)) {
            newFavoriteStatuses[item.recipeId] = false;
          }
        });
        setFavoriteStatuses(newFavoriteStatuses);
      }
    } catch (error) {
      console.error("Error loading cooked history:", error);
      setCookedHistory([]);
      setHasMoreCooked(false);
    }
  };

  const loadDeletedRecipes = async (isRefresh = false) => {
    if (!user?.userId) return;

    try {
      console.log("Loading deleted recipes...");
      const result = await getDeletedRecipes(user.userId, 0, 20);
      setDeletedRecipes(result.items || []);
      setHasMoreDeleted(result.hasNext);
    } catch (error) {
      console.error("Error loading deleted recipes:", error);
      setDeletedRecipes([]);
    }
  };

  const handleRefresh = useCallback(() => {
    loadData(true);
  }, [activeTab, isAuthenticated]);

  const handleToggleFavorite = async (recipeId: number) => {
    if (!isAuthenticated) {
      Alert.alert("Thông báo", "Vui lòng đăng nhập để sử dụng tính năng này");
      return;
    }

    const currentlyFavorited = favoriteStatuses[recipeId] || false;
    setLoadingActions((prev) => ({ ...prev, [recipeId]: true }));

    try {
      let success = false;

      if (currentlyFavorited) {
        // Remove from favorites
        success = await removeFromFavorites(recipeId);
        if (success) {
          // Update favorite status
          setFavoriteStatuses((prev) => ({
            ...prev,
            [recipeId]: false,
          }));

          // Remove from favorites list if we're on favorites tab
          if (activeTab === "favorites") {
            setFavoriteRecipes((prev) =>
              prev.filter((recipe) => recipe.id !== recipeId)
            );
          }
        }
      } else {
        // Add to favorites
        success = await addToFavorites(recipeId);
        if (success) {
          // Update favorite status
          setFavoriteStatuses((prev) => ({
            ...prev,
            [recipeId]: true,
          }));
        }
      }

      if (!success) {
        Alert.alert("Lỗi", "Không thể thực hiện thao tác. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setLoadingActions((prev) => ({ ...prev, [recipeId]: false }));
    }
  };

  const handleViewRecipe = (
    recipeId: number,
    showEdit = false,
    showCart = false
  ) => {
    if (navigation) {
      navigation.navigate("RecipeDetail", {
        recipeId: recipeId.toString(),
        showEditButton: showEdit,
        showAddToCartButton: showCart,
      });
    }
  };

  const handleCardPress = (recipeId: number) => {
    // Determine button visibility based on active tab
    const showEdit = activeTab !== "myRecipes";
    const showCart = activeTab !== "myRecipes";
    handleViewRecipe(recipeId, showEdit, showCart);
  };

  const handleEditRecipe = (recipeId: number) => {
    navigation?.navigate("EditRecipe", { recipeId });
  };

  const handleDeleteRecipe = async (recipeId: number) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc muốn xóa công thức này? Công thức sẽ được chuyển vào thùng rác.",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            setLoadingActions((prev) => ({ ...prev, [recipeId]: true }));
            try {
              await adminService.deleteRecipe(recipeId);
              Alert.alert("Thành công", "Đã xóa công thức");
              loadData(true);
            } catch (error) {
              console.error("Error deleting recipe:", error);
              Alert.alert("Lỗi", "Không thể xóa công thức. Vui lòng thử lại.");
            } finally {
              setLoadingActions((prev) => ({ ...prev, [recipeId]: false }));
            }
          },
        },
      ]
    );
  };

  const handleRestoreRecipe = async (recipeId: number) => {
    Alert.alert("Xác nhận khôi phục", "Bạn có muốn khôi phục công thức này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Khôi phục",
        onPress: async () => {
          setLoadingActions((prev) => ({ ...prev, [recipeId]: true }));
          try {
            await restoreRecipe(recipeId);
            Alert.alert("Thành công", "Đã khôi phục công thức");
            loadData(true);
          } catch (error: any) {
            console.error("Error restoring recipe:", error);
            Alert.alert(
              "Lỗi",
              error.message ||
                "Không thể khôi phục công thức. Vui lòng thử lại."
            );
          } finally {
            setLoadingActions((prev) => ({ ...prev, [recipeId]: false }));
          }
        },
      },
    ]);
  };

  const handlePermanentDelete = async (recipeId: number) => {
    Alert.alert(
      "Xác nhận xóa vĩnh viễn",
      "⚠️ Hành động này không thể hoàn tác! Công thức sẽ bị xóa vĩnh viễn khỏi hệ thống.",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa vĩnh viễn",
          style: "destructive",
          onPress: async () => {
            setLoadingActions((prev) => ({ ...prev, [recipeId]: true }));
            try {
              await permanentDeleteRecipe(recipeId);
              Alert.alert("Thành công", "Đã xóa vĩnh viễn công thức");
              loadData(true);
            } catch (error: any) {
              console.error("Error permanently deleting recipe:", error);
              Alert.alert(
                "Lỗi",
                error.message || "Không thể xóa công thức. Vui lòng thử lại."
              );
            } finally {
              setLoadingActions((prev) => ({ ...prev, [recipeId]: false }));
            }
          },
        },
      ]
    );
  };

  const handleShareCodeSubmit = async () => {
    if (!shareCode.trim()) {
      Alert.alert("Thông báo", "Vui lòng nhập mã chia sẻ");
      return;
    }

    setIsLoadingShare(true);

    try {
      console.log("Getting shared recipe with code:", shareCode.trim());
      const recipe = await getSharedRecipe(shareCode.trim());

      if (recipe) {
        setShareCode("");
        navigation?.navigate("RecipeDetail", {
          recipeId: recipe.id,
          fromShare: true,
        });
      } else {
        Alert.alert(
          "Lỗi",
          "Không thể tải công thức. Mã chia sẻ không hợp lệ hoặc đã hết hạn."
        );
      }
    } catch (error) {
      console.error("Error loading shared recipe:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải công thức. Vui lòng thử lại.");
    } finally {
      setIsLoadingShare(false);
    }
  };

  const getFilteredRecipes = (): (Recipe | CookedHistoryItem)[] => {
    let items: (Recipe | CookedHistoryItem)[] = [];

    switch (activeTab) {
      case "favorites":
        items = favoriteRecipes;
        break;
      case "myRecipes":
        items = myRecipes;
        break;
      case "cooked":
        items = cookedHistory;
        break;
      case "deleted":
        items = deletedRecipes;
        break;
    }

    if (!searchQuery.trim()) {
      return items;
    }

    return items.filter((item) => {
      if ("recipeTitle" in item) {
        return item.recipeTitle
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      }
      if ("title" in item) {
        return item.title.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false;
    });
  };

  const getEmptyMessage = () => {
    switch (activeTab) {
      case "favorites":
        return {
          icon: "❤️",
          title: "Chưa có món ăn yêu thích",
          description:
            "Hãy khám phá và thêm những món ăn ngon vào danh sách yêu thích của bạn!",
          buttonText: "Khám phá ngay",
        };
      case "myRecipes":
        return {
          icon: "👨‍🍳",
          title: "Chưa có công thức nào",
          description:
            "Hãy tạo công thức đầu tiên của bạn và chia sẻ với mọi người!",
          buttonText: "Tạo công thức",
        };
      case "cooked":
        return {
          icon: "✅",
          title: "Chưa nấu món nào",
          description: "Hãy thử nấu một món ăn và ghi lại trải nghiệm của bạn!",
          buttonText: "Khám phá công thức",
        };
      case "deleted":
        return {
          icon: "🗑️",
          title: "Chưa có công thức nào bị xóa",
          description: "Các công thức đã xóa sẽ hiển thị ở đây.",
          buttonText: "",
        };
      default:
        return {
          icon: "📝",
          title: "Không có dữ liệu",
          description: "",
          buttonText: "",
        };
    }
  };

  const renderEmptyState = () => {
    const emptyMessage = getEmptyMessage();

    return (
      <View style={favoriteStyles.emptyContainer}>
        <Text style={favoriteStyles.emptyIcon}>{emptyMessage.icon}</Text>
        <Text style={favoriteStyles.emptyTitle}>{emptyMessage.title}</Text>
        <Text style={favoriteStyles.emptyDescription}>
          {emptyMessage.description}
        </Text>
        {emptyMessage.buttonText && (
          <TouchableOpacity
            style={favoriteStyles.exploreButton}
            onPress={() => {
              if (activeTab === "myRecipes") {
                navigation?.navigate("CreateRecipe");
              } else {
                navigation?.navigate("Home");
              }
            }}
          >
            <Text style={favoriteStyles.exploreButtonText}>
              {emptyMessage.buttonText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderRecipeCard = (item: Recipe | CookedHistoryItem) => {
    let recipeId: number;
    let recipeTitle: string;
    let recipeImageUrl: string;
    let difficulty: string;
    let totalTime: number;
    let viewCount: number;
    let description: string | undefined;
    let historyItem: CookedHistoryItem | undefined;

    if ("recipeId" in item && "recipeTitle" in item) {
      historyItem = item as CookedHistoryItem;
      recipeId = historyItem.recipeId;
      recipeTitle = historyItem.recipeTitle;
      recipeImageUrl = historyItem.recipeImageUrl;
      difficulty = historyItem.difficulty;
      totalTime = (historyItem.prepareTime || 0) + (historyItem.cookTime || 0);
      viewCount = historyItem.view;
      description = undefined;
    } else {
      const recipe = item as Recipe;
      recipeId = recipe.id;
      recipeTitle = recipe.title;
      recipeImageUrl = recipe.imageUrl || "";
      difficulty = recipe.difficulty;
      totalTime = (recipe.prepareTime || 0) + (recipe.cookTime || 0);
      viewCount = recipe.view;
      description = recipe.description;
    }

    const isFavorited = favoriteStatuses[recipeId] || false;
    const isActionLoading = loadingActions[recipeId] || false;

    return (
      <TouchableOpacity
        key={recipeId}
        style={favoriteStyles.favoriteCard}
        onPress={() => handleCardPress(recipeId)}
        activeOpacity={0.7}
      >
        <Image
          source={{
            uri:
              recipeImageUrl ||
              "https://thecrites.com/sites/all/modules/cookbook/theme/images/default-recipe-big.png",
          }}
          style={favoriteStyles.recipeImage}
        />

        {historyItem?.cookedAt && (
          <View style={favoriteStyles.cookedBadge}>
            <Text style={favoriteStyles.cookedBadgeText}>
              ✅ Đã nấu ngày{" "}
              {new Date(historyItem.cookedAt).toLocaleDateString("vi-VN")}
            </Text>
          </View>
        )}

        <Text style={favoriteStyles.recipeName}>{recipeTitle}</Text>

        {historyItem?.rating && (
          <View style={favoriteStyles.ratingContainer}>
            <Text style={favoriteStyles.ratingText}>
              {"⭐".repeat(historyItem.rating)}
            </Text>
          </View>
        )}

        {historyItem?.note && (
          <Text style={favoriteStyles.cookedNote} numberOfLines={2}>
            💭 {historyItem.note}
          </Text>
        )}

        <View style={favoriteStyles.recipeInfo}>
          <View style={favoriteStyles.infoItem}>
            <Text style={favoriteStyles.infoText}>⏱️ {totalTime} phút</Text>
          </View>
          <View style={favoriteStyles.infoItem}>
            <Text style={favoriteStyles.infoText}>📊 {difficulty}</Text>
          </View>
          <View style={favoriteStyles.infoItem}>
            <Text style={favoriteStyles.infoText}>👁️ {viewCount} lượt xem</Text>
          </View>
        </View>

        {description && (
          <Text style={favoriteStyles.recipeDescription} numberOfLines={2}>
            {description}
          </Text>
        )}

        {/* Actions based on tab */}
        <View style={favoriteStyles.cardActions}>
          {activeTab === "myRecipes" ? (
            <>
              {/* Edit and Delete for My Recipes */}
              <TouchableOpacity
                style={favoriteStyles.editButton}
                onPress={(e) => {
                  e.stopPropagation();
                  handleEditRecipe(recipeId);
                }}
                disabled={isActionLoading}
              >
                <Ionicons name="create-outline" size={18} color="#FF6B35" />
                <Text style={favoriteStyles.editButtonText}>Sửa</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={favoriteStyles.deleteButton}
                onPress={(e) => {
                  e.stopPropagation();
                  handleDeleteRecipe(recipeId);
                }}
                disabled={isActionLoading}
              >
                {isActionLoading ? (
                  <ActivityIndicator size="small" color="#E74C3C" />
                ) : (
                  <>
                    <Ionicons name="trash-outline" size={18} color="#E74C3C" />
                    <Text style={favoriteStyles.deleteButtonText}>Xóa</Text>
                  </>
                )}
              </TouchableOpacity>
            </>
          ) : activeTab === "deleted" ? (
            <>
              {/* Restore and Permanent Delete for Deleted Recipes */}
              <TouchableOpacity
                style={favoriteStyles.restoreButton}
                onPress={(e) => {
                  e.stopPropagation();
                  handleRestoreRecipe(recipeId);
                }}
                disabled={isActionLoading}
              >
                {isActionLoading ? (
                  <ActivityIndicator size="small" color="#27AE60" />
                ) : (
                  <>
                    <Ionicons name="reload-outline" size={18} color="#27AE60" />
                    <Text style={favoriteStyles.restoreButtonText}>
                      Khôi phục
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={favoriteStyles.permanentDeleteButton}
                onPress={(e) => {
                  e.stopPropagation();
                  handlePermanentDelete(recipeId);
                }}
                disabled={isActionLoading}
              >
                {isActionLoading ? (
                  <ActivityIndicator size="small" color="#C0392B" />
                ) : (
                  <>
                    <Ionicons
                      name="trash-bin-outline"
                      size={18}
                      color="#C0392B"
                    />
                    <Text style={favoriteStyles.permanentDeleteButtonText}>
                      Xóa vĩnh viễn
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* View and Favorite for other tabs */}
              <TouchableOpacity
                style={favoriteStyles.viewButton}
                onPress={(e) => {
                  e.stopPropagation();
                  handleViewRecipe(recipeId, true, true);
                }}
              >
                <Text style={favoriteStyles.viewButtonText}>Xem công thức</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  favoriteStyles.favoriteActionButton,
                  isFavorited && favoriteStyles.removeButton,
                ]}
                onPress={(e) => {
                  e.stopPropagation();
                  handleToggleFavorite(recipeId);
                }}
                disabled={isActionLoading}
              >
                {isActionLoading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text
                    style={[
                      favoriteStyles.favoriteActionButtonText,
                      isFavorited && favoriteStyles.removeButtonText,
                    ]}
                  >
                    {isFavorited ? "Bỏ yêu thích" : "Yêu thích"}
                  </Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (!isAuthenticated) {
    return (
      <View style={favoriteStyles.container}>
        <View style={favoriteStyles.emptyContainer}>
          <Text style={favoriteStyles.emptyIcon}>🔒</Text>
          <Text style={favoriteStyles.emptyTitle}>Vui lòng đăng nhập</Text>
          <Text style={favoriteStyles.emptyDescription}>
            Đăng nhập để xem công thức của bạn
          </Text>
          <TouchableOpacity
            style={favoriteStyles.exploreButton}
            onPress={() => navigation?.navigate("Login")}
          >
            <Text style={favoriteStyles.exploreButtonText}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const filteredRecipes = getFilteredRecipes();

  return (
    <View style={favoriteStyles.container}>
      <Text style={favoriteStyles.title}>Công Thức Của Tôi</Text>

      <View style={favoriteStyles.searchContainer}>
        <TextInput
          style={favoriteStyles.searchInput}
          placeholder="Tìm kiếm công thức..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          style={favoriteStyles.modernCreateButton}
          onPress={() => navigation.navigate("CreateRecipe")}
        >
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={favoriteStyles.shareCodeContainer}>
        <View style={favoriteStyles.shareCodeRow}>
          <TextInput
            style={favoriteStyles.shareCodeInput}
            placeholder="Nhập mã chia sẻ..."
            value={shareCode}
            onChangeText={setShareCode}
            placeholderTextColor="#999"
            autoCapitalize="characters"
          />
          <TouchableOpacity
            style={[
              favoriteStyles.shareCodeButton,
              (!shareCode.trim() || isLoadingShare) &&
                favoriteStyles.shareCodeButtonDisabled,
            ]}
            onPress={handleShareCodeSubmit}
            disabled={!shareCode.trim() || isLoadingShare}
          >
            {isLoadingShare ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={favoriteStyles.shareCodeButtonText}>Mở</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={favoriteStyles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              favoriteStyles.tabButton,
              activeTab === tab.key && favoriteStyles.tabButtonActive,
            ]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={favoriteStyles.tabIcon}>{tab.icon}</Text>
            <Text
              style={[
                favoriteStyles.tabButtonText,
                activeTab === tab.key && favoriteStyles.tabButtonTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {isLoading ? (
        <View style={favoriteStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={favoriteStyles.loadingText}>Đang tải...</Text>
        </View>
      ) : filteredRecipes.length === 0 ? (
        renderEmptyState()
      ) : (
        <ScrollView
          style={favoriteStyles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={["#FF6B35"]}
              tintColor="#FF6B35"
            />
          }
        >
          {filteredRecipes.map((item, index) => (
            <React.Fragment key={index}>
              {renderRecipeCard(item)}
            </React.Fragment>
          ))}

          {((activeTab === "favorites" && hasMoreFavorites) ||
            (activeTab === "myRecipes" && hasMoreMyRecipes) ||
            (activeTab === "cooked" && hasMoreCooked) ||
            (activeTab === "deleted" && hasMoreDeleted)) && (
            <View style={favoriteStyles.loadMoreContainer}>
              <Text style={favoriteStyles.loadMoreText}>
                Kéo để tải thêm...
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default FavoriteScreen;
