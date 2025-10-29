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
import { favoriteStyles } from "./styles";
import { useAppSelector } from "../../store/hooks";
import { Recipe } from "../../types/recipe";
import {
  getFavoriteRecipes,
  getMyRecipes,
  getDeletedRecipes,
  addToFavorites,
  removeFromFavorites,
} from "../../services/favoriteService";
import { useFocusEffect } from "@react-navigation/native";

interface FavoriteScreenProps {
  navigation?: any;
}

type TabType = "favorites" | "myRecipes" | "deleted";

const FavoriteScreen: React.FC<FavoriteScreenProps> = ({ navigation }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("favorites");

  // Data states
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
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
  const [hasMoreDeleted, setHasMoreDeleted] = useState(false);

  // Track favorite status for each recipe
  const [favoriteStatuses, setFavoriteStatuses] = useState<{
    [key: number]: boolean;
  }>({});

  const tabs = [
    { key: "favorites" as TabType, label: "Yêu thích", icon: "❤️" },
    { key: "myRecipes" as TabType, label: "Của tôi", icon: "👨‍🍳" },
    { key: "deleted" as TabType, label: "Đã xóa", icon: "🗑️" },
  ];

  // Auto-reload when screen is focused (when switching from TabNavigator)
  useFocusEffect(
    useCallback(() => {
      if (isAuthenticated) {
        console.log("Screen focused, reloading data...");
        loadData(true); // Force refresh when screen is focused
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
      setFavoriteRecipes(result.items);
      setHasMoreFavorites(result.hasNext);

      // Update favorite statuses - all items in favorites are favorited
      const newFavoriteStatuses = { ...favoriteStatuses };
      result.items.forEach((recipe) => {
        newFavoriteStatuses[recipe.id] = true;
      });
      setFavoriteStatuses(newFavoriteStatuses);
    } catch (error) {
      console.error("Error loading favorite recipes:", error);
    }
  };

  const loadMyRecipes = async (isRefresh = false) => {
    try {
      console.log("Loading my recipes...");
      const result = await getMyRecipes(0, 20);
      setMyRecipes(result.items);
      setHasMoreMyRecipes(result.hasNext);

      // For my recipes, we need to check favorite status separately
      // (assuming they might or might not be in favorites)
      const newFavoriteStatuses = { ...favoriteStatuses };
      result.items.forEach((recipe) => {
        // Default to false, will be updated by checkFavoriteStatus if needed
        if (!(recipe.id in newFavoriteStatuses)) {
          newFavoriteStatuses[recipe.id] = false;
        }
      });
      setFavoriteStatuses(newFavoriteStatuses);
    } catch (error) {
      console.error("Error loading my recipes:", error);
    }
  };

  const loadDeletedRecipes = async (isRefresh = false) => {
    if (!user?.userId) return;

    try {
      console.log("Loading deleted recipes...");
      const result = await getDeletedRecipes(user.userId, 0, 20);
      setDeletedRecipes(result.items);
      setHasMoreDeleted(result.hasNext);
    } catch (error) {
      console.error("Error loading deleted recipes:", error);
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

          Alert.alert("Thành công", "Đã xóa khỏi danh sách yêu thích");
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

          Alert.alert("Thành công", "Đã thêm vào danh sách yêu thích");

          // Reload favorites if we're on favorites tab to show the new item
          if (activeTab === "favorites") {
            await loadFavoriteRecipes();
          }
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

  const handleViewRecipe = (recipeId: number) => {
    if (navigation) {
      navigation.navigate("RecipeDetail", { recipeId: recipeId.toString() });
    }
  };

  const handleCardPress = (recipeId: number) => {
    handleViewRecipe(recipeId);
  };

  const getCurrentRecipes = (): Recipe[] => {
    switch (activeTab) {
      case "favorites":
        return favoriteRecipes;
      case "myRecipes":
        return myRecipes;
      case "deleted":
        return deletedRecipes;
      default:
        return [];
    }
  };

  const getFilteredRecipes = (): Recipe[] => {
    const currentRecipes = getCurrentRecipes();

    if (!searchQuery.trim()) {
      return currentRecipes;
    }

    return currentRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
              if (activeTab === "favorites") {
                navigation?.navigate("Home");
              } else if (activeTab === "myRecipes") {
                navigation?.navigate("CreateRecipe");
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

  const renderRecipeCard = (recipe: Recipe) => {
    const isFavorited = favoriteStatuses[recipe.id] || false;
    const isActionLoading = loadingActions[recipe.id] || false;

    return (
      <TouchableOpacity
        key={recipe.id}
        style={favoriteStyles.favoriteCard}
        onPress={() => handleCardPress(recipe.id)}
        activeOpacity={0.7}
      >
        {/* Recipe Image */}
        <Image
          source={{
            uri:
              recipe.imageUrl ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_2BWz0CukYGFT9pvza-w6su7smU_xUkoEOg&s",
          }}
          style={favoriteStyles.recipeImage}
        />

        {/* Recipe Info */}
        <Text style={favoriteStyles.recipeName}>{recipe.title}</Text>

        {/* Recipe Details */}
        <View style={favoriteStyles.recipeInfo}>
          <View style={favoriteStyles.infoItem}>
            <Text style={favoriteStyles.infoText}>
              {/* ⏱️ {(recipe.prepareTime || 15) + (recipe.cookTime || 15)} phút */}
            </Text>
          </View>
          <View style={favoriteStyles.infoItem}>
            <Text style={favoriteStyles.infoText}>📊 {recipe.difficulty}</Text>
          </View>
          <View style={favoriteStyles.infoItem}>
            <Text style={favoriteStyles.infoText}>
              👁️ {recipe.view} lượt xem
            </Text>
          </View>
        </View>

        {recipe.description && (
          <Text style={favoriteStyles.recipeDescription} numberOfLines={2}>
            {recipe.description}
          </Text>
        )}

        {/* Actions */}
        <View style={favoriteStyles.cardActions}>
          <TouchableOpacity
            style={favoriteStyles.viewButton}
            onPress={(e) => {
              e.stopPropagation();
              handleViewRecipe(recipe.id);
            }}
          >
            <Text style={favoriteStyles.viewButtonText}>Xem công thức</Text>
          </TouchableOpacity>

          {activeTab !== "deleted" && (
            <TouchableOpacity
              style={[
                favoriteStyles.favoriteActionButton,
                isFavorited && favoriteStyles.removeButton,
              ]}
              onPress={(e) => {
                e.stopPropagation();
                handleToggleFavorite(recipe.id);
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
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (!isAuthenticated) {
    return (
      <View style={favoriteStyles.container}>
        <View style={favoriteStyles.emptyContainer}>
          <Text style={favoriteStyles.emptyIcon}>🔐</Text>
          <Text style={favoriteStyles.emptyTitle}>Vui lòng đăng nhập</Text>
          <Text style={favoriteStyles.emptyDescription}>
            Đăng nhập để xem danh sách yêu thích và công thức của bạn
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

      {/* Search Input */}
      <View style={favoriteStyles.searchContainer}>
        <TextInput
          style={favoriteStyles.searchInput}
          placeholder="Tìm kiếm công thức..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      {/* Tab Navigation */}
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

      {/* Content */}
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
          {filteredRecipes.map(renderRecipeCard)}

          {/* Load more indicator */}
          {((activeTab === "favorites" && hasMoreFavorites) ||
            (activeTab === "myRecipes" && hasMoreMyRecipes) ||
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
