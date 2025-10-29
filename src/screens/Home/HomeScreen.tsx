import React, { useRef, useState, useEffect } from "react";
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
} from "react-native";
import { useAppSelector } from "../../store/hooks";
import { useCategory } from "../../hooks/useCategory";
import { useRecipe } from "../../hooks/useRecipe";
import { homeStyles } from "./styles";
import FloatingButtonsContainer from '../../components/FloatingButtons/FloatingButtonContainer';

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

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;

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

  const handleCategoryPress = (category: any) => {
    if (navigation) {
      if (isAuthenticated) {
        navigation.navigate("CategoryRecipes", {
          categoryId: category.id,
          categoryName: category.name,
        });
      } else {
        openPrompt();
      }
    }
  };

  // Handle pull-to-refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([refreshCategories(), refreshRecipes()]);
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Default categories as fallback
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

  // Default recipes as fallback
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

  // Use API data or fallback to default
  const displayCategories =
    categories.length > 0 ? categories : defaultCategories;
  const displayPopularRecipes =
    popularRecipes.length > 0 ? popularRecipes : defaultPopularRecipes;
  const displayEasyRecipes =
    easyToCookRecipes.length > 0 ? easyToCookRecipes : defaultEasyRecipes;

  // Helper function to render category icon/image
  const renderCategoryIcon = (category: any) => {
    // Check if imageUrl is an emoji
    if (category.imageUrl && /[\u{1f000}-\u{1f999}]/u.test(category.imageUrl)) {
      return <Text style={homeStyles.categoryIcon}>{category.imageUrl}</Text>;
    }

    // Check if imageUrl is a valid URL
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

    // Fallback to default icon
    return <Text style={homeStyles.categoryIcon}>🍽️</Text>;
  };

  // Helper function to get recipe image
  const getRecipeImage = (recipe: any) => {
    if (recipe.imageUrl) {
      return { uri: recipe.imageUrl };
    }
    // Fallback to local image
    return require("../../../assets/images/cachlamcomtam.jpg");
  };

  // Helper function to format recipe title
  const formatRecipeTitle = (recipe: any) => {
    if (!isAuthenticated) {
      return "Cách làm cơm tấm sườn bì chả";
    }
    return recipe.title || "Món ăn ngon";
  };

  // Helper function to format difficulty
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

  return (
    <View style={homeStyles.container}>
      {/* Header */}
      <View style={homeStyles.unauthHeader}>
        <View style={homeStyles.searchWrapper}>
          <TextInput
            style={homeStyles.unauthSearchInput}
            placeholder={isAuthenticated ? "Tìm kiếm công thức..." : ""}
            placeholderTextColor="#999"
          />
        </View>

        {isAuthenticated ? (
          // Authenticated: Show user avatar
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
          // Unauthenticated: Show account button
          <TouchableOpacity
            style={homeStyles.accountButton}
            onPress={handleLogin}
          >
            <Text style={homeStyles.accountButtonText}>Tài khoản</Text>
          </TouchableOpacity>
        )}
      </View>

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
              <TouchableOpacity style={homeStyles.bannerButton}>
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
                    <Text style={homeStyles.recipeCardTitle} numberOfLines={2}>
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
                              color: formatDifficulty(recipe.difficulty).color,
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

        {/* Easy-to-Cook Recipes Section (replacing Common Recipes) */}
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

      {/* Floating Buttons - Only show when authenticated */}
      {isAuthenticated && (
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
