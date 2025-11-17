// src/screens/Home/HomeScreen.tsx
import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Animated,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from "react-native";
import { useAppSelector } from "../../store/hooks";
import { useCategory } from "../../hooks/useCategory";
import { useRecipe } from "../../hooks/useRecipe";
import { homeStyles } from "./styles";
import {
  getRecipesByCategoryEndpoint,
  searchRecipesByQuery,
} from "../../services/recipeService";
import { Recipe, PaginatedRecipeResponse } from "../../types/recipe";
import FloatingButtonsContainer from "./../../components/FloatingButtons/FloatingButtonContainer";

const { height } = Dimensions.get("window");

interface HomeScreenProps {
  navigation?: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const {
    categories,
    isLoading: categoriesLoading,
    isRefreshing: categoriesRefreshing,
    refreshCategories,
  } = useCategory();

  const {
    popularRecipes,
    easyToCookRecipes,
    isLoadingPopular,
    isLoadingEasy,
    refreshRecipes,
  } = useRecipe();

  // UI State
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchDebounceTimer, setSearchDebounceTimer] =
    useState<NodeJS.Timeout | null>(null);

  // Category State
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [categoryRecipes, setCategoryRecipes] = useState<Recipe[]>([]);
  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  const [categoryPage, setCategoryPage] = useState(0);
  const [categoryHasMore, setCategoryHasMore] = useState(false);

  // Search debounce effect
  useEffect(() => {
    if (searchDebounceTimer) {
      clearTimeout(searchDebounceTimer);
    }

    if (searchQuery.trim().length > 0) {
      const timer = setTimeout(() => {
        handleSearch(searchQuery.trim());
      }, 2000); // 2 second delay

      setSearchDebounceTimer(timer);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }

    return () => {
      if (searchDebounceTimer) {
        clearTimeout(searchDebounceTimer);
      }
    };
  }, [searchQuery]);

  // Search handler
  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setIsSearching(true);
    setShowSearchResults(true);

    try {
      const response = await searchRecipesByQuery(query);
      setSearchResults(response.items);
    } catch (error) {
      console.error("Error searching recipes:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Category handler
  const handleCategoryPress = async (category: any) => {
    console.log("Category pressed:", category);

    if (!isAuthenticated) {
      openPrompt();
      return;
    }

    setSelectedCategory(category);
    setIsLoadingCategory(true);
    setCategoryPage(0);

    try {
      const response = await getRecipesByCategoryEndpoint(category.id, 0, 12);
      setCategoryRecipes(response.items);
      setCategoryHasMore(response.hasNext);
    } catch (error) {
      console.error("Error loading category recipes:", error);
      setCategoryRecipes([]);
    } finally {
      setIsLoadingCategory(false);
    }
  };

  // Back to home handler
  const handleBackToHome = () => {
    setSelectedCategory(null);
    setCategoryRecipes([]);
    setShowSearchResults(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  // Search input focus handler
  const handleSearchFocus = () => {
    if (searchQuery.trim().length > 0) {
      setShowSearchResults(true);
    }
  };

  // Search submit handler
  const handleSearchSubmit = () => {
    if (searchQuery.trim().length > 0) {
      handleSearch(searchQuery.trim());
    }
  };

  const openPrompt = () => {
    setShowLoginPrompt(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closePrompt = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowLoginPrompt(false));
  };

  const handleProfilePress = () => {
    if (navigation) {
      navigation.navigate("Account");
    }
  };

  const handleLogin = () => {
    if (navigation) {
      navigation.navigate("Login");
    }
    closePrompt();
  };

  const handleRegister = () => {
    if (navigation) {
      navigation.navigate("Register");
    }
    closePrompt();
  };

  const handleRecipePress = (recipe: any) => {
    if (navigation) {
      if (isAuthenticated) {
        navigation.navigate("RecipeDetail", { recipeId: recipe.id });
      } else {
        openPrompt();
      }
    }
  };

  // Handle pull-to-refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      if (selectedCategory) {
        // Refresh category recipes
        const response = await getRecipesByCategoryEndpoint(
          selectedCategory.id,
          0,
          12
        );
        setCategoryRecipes(response.items);
        setCategoryHasMore(response.hasNext);
      } else {
        // Refresh home data
        await Promise.all([refreshCategories(), refreshRecipes()]);
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Default data (existing code)
  const defaultCategories = [
    { id: 1, name: "Món Việt", description: "", imageUrl: "🍜" },
    { id: 2, name: "Món Ý", description: "", imageUrl: "🍝" },
    { id: 3, name: "Tráng miệng", description: "", imageUrl: "🍰" },
    { id: 4, name: "Salad", description: "", imageUrl: "🥗" },
    { id: 5, name: "Thịt nướng", description: "", imageUrl: "🍖" },
    { id: 6, name: "Hải sản", description: "", imageUrl: "🐟" },
    { id: 7, name: "Cà ri", description: "", imageUrl: "🥘" },
    { id: 8, name: "Cơm", description: "", imageUrl: "🍛" },
    { id: 9, name: "Lẩu", description: "", imageUrl: "🍲" },
    { id: 10, name: "Đồ uống", description: "", imageUrl: "🥤" },
  ];

  const defaultPopularRecipes = [
    {
      id: 1,
      title: "Cách làm cơm tấm sườn bì chả",
      imageUrl: null,
      difficulty: "MEDIUM",
      ownerName: "Chef Demo",
      view: 0,
    },
    {
      id: 2,
      title: "Phở Bò Truyền Thống",
      imageUrl: null,
      difficulty: "HARD",
      ownerName: "Chef Demo",
      view: 0,
    },
  ];

  const defaultEasyRecipes = [
    {
      id: 1,
      title: "Trứng chiên đơn giản",
      imageUrl: null,
      difficulty: "EASY",
      ownerName: "Chef Demo",
      view: 0,
    },
    {
      id: 2,
      title: "Mì tôm trứng",
      imageUrl: null,
      difficulty: "EASY",
      ownerName: "Chef Demo",
      view: 0,
    },
  ];

  const displayCategories =
    categories.length > 0 ? categories : defaultCategories;
  const displayPopularRecipes =
    popularRecipes.length > 0 ? popularRecipes : defaultPopularRecipes;
  const displayEasyRecipes =
    easyToCookRecipes.length > 0 ? easyToCookRecipes : defaultEasyRecipes;

  // Helper functions (existing code)
  const renderCategoryIcon = (category: any) => {
    if (category.imageUrl && /[\u{1f000}-\u{1f999}]/u.test(category.imageUrl)) {
      return <Text style={homeStyles.categoryIcon}>{category.imageUrl}</Text>;
    }

    if (
      category.imageUrl &&
      (category.imageUrl.startsWith("http://") ||
        category.imageUrl.startsWith("https://"))
    ) {
      return (
        <Image
          source={{ uri: category.imageUrl }}
          style={homeStyles.categoryIcon}
          resizeMode="cover"
        />
      );
    }

    return <Text style={homeStyles.categoryIcon}>🍽️</Text>;
  };

  const getRecipeImage = (recipe: any) => {
    if (recipe.imageUrl) {
      return { uri: recipe.imageUrl };
    }
    return require("../../../assets/images/cachlamcomtam.jpg");
  };

  const formatRecipeTitle = (recipe: any) => {
    if (!isAuthenticated) {
      return "Cách làm cơm tấm sườn bì chả";
    }
    return recipe.title || "Món ăn ngon";
  };

  const formatDifficulty = (difficulty: string) => {
    switch (difficulty?.toUpperCase()) {
      case "EASY":
        return { text: "Dễ", color: "#4CAF50" };
      case "MEDIUM":
        return { text: "Trung bình", color: "#FF9800" };
      case "HARD":
        return { text: "Khó", color: "#F44336" };
      default:
        return { text: "Trung bình", color: "#FF9800" };
    }
  };

  // Recipe card component
  const renderRecipeCard = (recipe: Recipe) => (
    <TouchableOpacity
      key={recipe.id}
      style={homeStyles.searchResultCard}
      onPress={() => handleRecipePress(recipe)}
    >
      <Image
        source={getRecipeImage(recipe)}
        style={homeStyles.searchResultImage}
      />
      <View style={homeStyles.searchResultInfo}>
        <Text style={homeStyles.searchResultTitle} numberOfLines={2}>
          {recipe.title}
        </Text>
        <Text style={homeStyles.searchResultOwner}>👨‍🍳 {recipe.ownerName}</Text>
        <View style={homeStyles.searchResultMeta}>
          <Text
            style={[
              homeStyles.searchResultDifficulty,
              { color: formatDifficulty(recipe.difficulty).color },
            ]}
          >
            {formatDifficulty(recipe.difficulty).text}
          </Text>
          <Text style={homeStyles.searchResultViews}>
            👁️ {recipe.view} lượt xem
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleSuggestionBannerPress = () => {
    if (navigation && isAuthenticated) {
      navigation.navigate("DailySuggestions");
    }
  };

  return (
    <View style={homeStyles.container}>
      {/* Header */}
      <View style={homeStyles.unauthHeader}>
        <View style={homeStyles.searchWrapper}>
          <TextInput
            style={homeStyles.unauthSearchInput}
            placeholder={isAuthenticated ? "Tìm kiếm công thức..." : ""}
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={handleSearchFocus}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
          />
          {isSearching && (
            <ActivityIndicator
              size="small"
              color="#FF6B35"
              style={homeStyles.searchLoading}
            />
          )}
        </View>

        {/* Back button when viewing category or search results */}
        {(selectedCategory || showSearchResults) && (
          <TouchableOpacity
            style={homeStyles.backButton}
            onPress={handleBackToHome}
          >
            <Text style={homeStyles.backButtonText}>← Về trang chủ</Text>
          </TouchableOpacity>
        )}

        {!selectedCategory &&
          !showSearchResults &&
          (isAuthenticated ? (
            <TouchableOpacity onPress={handleProfilePress}>
              <Image
                source={{
                  uri:
                    user?.avatarUrl ||
                    "https://i.pinimg.com/736x/6b/43/47/6b43478d2362f5e6ba3457abc8adcb06.jpg",
                }}
                style={homeStyles.userAvatar}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={homeStyles.accountButton}
              onPress={handleLogin}
            >
              <Text style={homeStyles.accountButtonText}>Tài khoản</Text>
            </TouchableOpacity>
          ))}
      </View>

      {/* Search Results */}
      {showSearchResults && (
        <ScrollView
          style={homeStyles.scrollContent}
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
          <View style={homeStyles.searchResultsContainer}>
            <Text style={homeStyles.searchResultsTitle}>
              Kết quả tìm kiếm "{searchQuery}" ({searchResults.length})
            </Text>

            {isSearching ? (
              <View style={homeStyles.searchLoadingContainer}>
                <ActivityIndicator size="large" color="#FF6B35" />
                <Text style={homeStyles.searchLoadingText}>
                  Đang tìm kiếm...
                </Text>
              </View>
            ) : searchResults.length === 0 ? (
              <View style={homeStyles.noResultsContainer}>
                <Text style={homeStyles.noResultsIcon}>🔍</Text>
                <Text style={homeStyles.noResultsTitle}>
                  Không tìm thấy kết quả
                </Text>
                <Text style={homeStyles.noResultsText}>
                  Thử tìm kiếm với từ khóa khác
                </Text>
              </View>
            ) : (
              <View style={homeStyles.searchResultsList}>
                {searchResults.map(renderRecipeCard)}
              </View>
            )}
          </View>
        </ScrollView>
      )}

      {/* Category Results */}
      {selectedCategory && !showSearchResults && (
        <ScrollView
          style={homeStyles.scrollContent}
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
          <View style={homeStyles.categoryResultsContainer}>
            <Text style={homeStyles.categoryResultsTitle}>
              {selectedCategory.name} ({categoryRecipes.length})
            </Text>

            {isLoadingCategory ? (
              <View style={homeStyles.categoryLoadingContainer}>
                <ActivityIndicator size="large" color="#FF6B35" />
                <Text style={homeStyles.categoryLoadingText}>Đang tải...</Text>
              </View>
            ) : categoryRecipes.length === 0 ? (
              <View style={homeStyles.noResultsContainer}>
                <Text style={homeStyles.noResultsIcon}>🍽️</Text>
                <Text style={homeStyles.noResultsTitle}>Chưa có công thức</Text>
                <Text style={homeStyles.noResultsText}>
                  Danh mục này chưa có công thức nào
                </Text>
              </View>
            ) : (
              <View style={homeStyles.categoryResultsList}>
                {categoryRecipes.map(renderRecipeCard)}
              </View>
            )}
          </View>
        </ScrollView>
      )}

      {/* Home Content - Only show when not viewing category or search results */}
      {!selectedCategory && !showSearchResults && (
        <ScrollView
          style={homeStyles.scrollContent}
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
          {/* Today's Suggestion Banner - Only for authenticated users */}
          {isAuthenticated && (
            <View style={homeStyles.suggestionBanner}>
              <View style={homeStyles.bannerContent}>
                <View style={homeStyles.bannerTextContainer}>
                  <Text style={homeStyles.bannerTitle}>Hôm nay ăn gì?</Text>
                  <Text style={homeStyles.bannerSubtitle}>
                    Đã có CookiNote lo!
                  </Text>
                </View>
                <TouchableOpacity
                  style={homeStyles.bannerButton}
                  onPress={handleSuggestionBannerPress}
                >
                  <Text style={homeStyles.bannerButtonText}>Xem ngay</Text>
                </TouchableOpacity>
              </View>
              <Image
                source={{
                  uri: "https://cdn.eva.vn/upload/4-2021/images/2021-12-02/hom-nay-an-gi-anh-1638435422-875-width640height480.jpeg",
                }}
                style={homeStyles.bannerImage}
              />
            </View>
          )}

          {/* Categories Grid */}
          <View style={homeStyles.categoriesSection}>
            <View style={homeStyles.categoriesGrid}>
              {displayCategories.slice(0, 10).map((category, index) => (
                <TouchableOpacity
                  key={category.id || index}
                  style={homeStyles.categoryItem}
                  onPress={() => handleCategoryPress(category)}
                >
                  <View style={homeStyles.categoryIconContainer}>
                    {renderCategoryIcon(category)}
                  </View>
                  <Text style={homeStyles.categoryLabel} numberOfLines={2}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Popular Recipes Section */}
          <View style={homeStyles.recipeSection}>
            <View style={homeStyles.sectionHeader}>
              <Text style={homeStyles.sectionTitle}>Món ăn hấp dẫn</Text>
              {isLoadingPopular && (
                <ActivityIndicator size="small" color="#FF6B35" />
              )}
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={homeStyles.recipeRow}>
                {displayPopularRecipes.map((recipe, index) => (
                  <TouchableOpacity
                    key={recipe.id || index}
                    style={homeStyles.recipeCardHorizontal}
                    onPress={() => handleRecipePress(recipe)}
                  >
                    <Image
                      source={getRecipeImage(recipe)}
                      style={homeStyles.recipeCardImage}
                    />
                    <View style={homeStyles.recipeCardInfo}>
                      <Text
                        style={homeStyles.recipeCardTitle}
                        numberOfLines={2}
                      >
                        {formatRecipeTitle(recipe)}
                      </Text>
                      {isAuthenticated && (
                        <View style={homeStyles.recipeMetaInfo}>
                          <Text style={homeStyles.recipeOwnerText}>
                            👨‍🍳 {recipe.ownerName || "Unknown Chef"}
                          </Text>
                          <Text
                            style={[
                              homeStyles.recipeDifficultyText,
                              {
                                color: formatDifficulty(recipe.difficulty)
                                  .color,
                              },
                            ]}
                          >
                            {formatDifficulty(recipe.difficulty).text}
                          </Text>
                        </View>
                      )}
                      {isAuthenticated && (
                        <View style={homeStyles.recipeStatsInfo}>
                          <Text style={homeStyles.recipeViewText}>
                            👁️ {recipe.view || 0} lượt xem
                          </Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Easy-to-Cook Recipes Section */}
          <View style={homeStyles.recipeSection}>
            <View style={homeStyles.sectionHeader}>
              <Text style={homeStyles.sectionTitle}>Món ăn dễ nấu</Text>
              {isLoadingEasy && (
                <ActivityIndicator size="small" color="#FF6B35" />
              )}
            </View>

            <View style={homeStyles.easyRecipesContainer}>
              {displayEasyRecipes.map((recipe, index) => (
                <TouchableOpacity
                  key={recipe.id || index}
                  style={homeStyles.easyRecipeCard}
                  onPress={() => handleRecipePress(recipe)}
                >
                  <Image
                    source={getRecipeImage(recipe)}
                    style={homeStyles.recipeCardImage}
                  />
                  <View style={homeStyles.recipeCardInfo}>
                    <Text style={homeStyles.recipeCardTitle} numberOfLines={2}>
                      {formatRecipeTitle(recipe)}
                    </Text>
                    {isAuthenticated && (
                      <View style={homeStyles.recipeMetaInfo}>
                        <Text style={homeStyles.recipeOwnerText}>
                          👨‍🍳 {recipe.ownerName || "Unknown Chef"}
                        </Text>
                        <View style={homeStyles.easyBadge}>
                          <Text style={homeStyles.easyBadgeText}>DỄ NẤU</Text>
                        </View>
                      </View>
                    )}
                    {isAuthenticated && (
                      <View style={homeStyles.recipeStatsInfo}>
                        <Text style={homeStyles.recipeViewText}>
                          👁️ {recipe.view || 0} lượt xem
                        </Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Add some bottom padding for tab navigator */}
          <View style={{ height: 60 }} />
        </ScrollView>
      )}

      {/* Floating Buttons - Only show when authenticated and not in search/category mode */}
      {isAuthenticated && !selectedCategory && !showSearchResults && (
        <FloatingButtonsContainer navigation={navigation} />
      )}

      {/* Login Popup */}
      {showLoginPrompt && (
        <Animated.View
          style={[
            homeStyles.loginPrompt,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Text style={homeStyles.promptTitle}>Xin chào bếp trưởng!</Text>
          <Text style={homeStyles.promptMessage}>
            Để lưu công thức và tạo thực đơn, bạn cần đăng nhập hoặc đăng ký tài
            khoản mới nhé.
          </Text>

          <View style={homeStyles.promptButtons}>
            <TouchableOpacity
              style={homeStyles.registerButton}
              onPress={handleRegister}
            >
              <Text style={homeStyles.registerButtonText}>Đăng ký</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={homeStyles.loginButton}
              onPress={handleLogin}
            >
              <Text style={homeStyles.loginButtonText}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={homeStyles.closePromptButton}
            onPress={closePrompt}
          >
            <Text style={homeStyles.closePromptText}>✕</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

export default HomeScreen;
