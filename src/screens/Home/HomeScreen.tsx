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
import { homeStyles } from "./styles";

const { height } = Dimensions.get("window");

interface HomeScreenProps {
  navigation?: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const {
    categories,
    isLoading: categoriesLoading,
    isRefreshing,
    refreshCategories,
  } = useCategory();

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
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
      navigation.navigate("RecipeDetail", { recipeId: recipe.id });
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

  // Use API categories or fallback to default
  const displayCategories =
    categories.length > 0 ? categories : defaultCategories;

  const popularRecipes = [
    {
      id: 1,
      title: isAuthenticated
        ? "Phở Bò Truyền Thống"
        : "Cách làm cơm tấm sườn bì chả",
      image: require("../../../assets/images/cachlamcomtam.jpg"),
    },
    {
      id: 2,
      title: isAuthenticated
        ? "Bánh Flan Caramel"
        : "Cách làm cơm tấm sườn bì chả",
      image: require("../../../assets/images/cachlamcomtam.jpg"),
    },
    {
      id: 3,
      title: isAuthenticated
        ? "Cơm Tấm Sườn Bì Chả 3"
        : "Cách làm cơm tấm sườn bì chả 3",
      image: require("../../../assets/images/cachlamcomtam.jpg"),
    },
    {
      id: 4,
      title: isAuthenticated
        ? "Bánh Flan Caramel"
        : "Cách làm cơm tấm sườn bì chả 4",
      image: require("../../../assets/images/cachlamcomtam.jpg"),
    },
    {
      id: 5,
      title: isAuthenticated
        ? "Cơm Tấm Sườn Bì Chả"
        : "Cách làm cơm tấm sườn bì chả 5",
      image: require("../../../assets/images/cachlamcomtam.jpg"),
    },
    {
      id: 6,
      title: isAuthenticated
        ? "Cơm Tấm Sườn Bì Chả"
        : "Cách làm cơm tấm sườn bì chả",
      image: require("../../../assets/images/cachlamcomtam.jpg"),
    },
    {
      id: 7,
      title: isAuthenticated
        ? "Bánh Flan Caramel"
        : "Cách làm cơm tấm sườn bì chả",
      image: require("../../../assets/images/cachlamcomtam.jpg"),
    },
    {
      id: 8,
      title: isAuthenticated
        ? "Cơm Tấm Sườn Bì Chả"
        : "Cách làm cơm tấm sườn bì chả",
      image: require("../../../assets/images/cachlamcomtam.jpg"),
    },
  ];

  const commonRecipes = [
    {
      id: 1,
      title: isAuthenticated
        ? "Canh Chua Cá Lóc"
        : "Cách làm cơm tấm sườn bì chả",
      image: require("../../../assets/images/cachlamcomtam.jpg"),
    },
    {
      id: 2,
      title: isAuthenticated ? "Thịt Kho Tàu" : "Cách làm cơm tấm sướn bì chả",
      image: require("../../../assets/images/cachlamcomtam.jpg"),
    },
    {
      id: 3,
      title: isAuthenticated ? "Gà Xào Sả Ớt" : "Cách làm cơm tấm sướn bì chả",
      image: require("../../../assets/images/cachlamcomtam.jpg"),
    },
    {
      id: 4,
      title: isAuthenticated ? "Chè Ba Màu" : "Cách làm cơm tấm sướn bì chả",
      image: require("../../../assets/images/cachlamcomtam.jpg"),
    },
    {
      id: 5,
      title: isAuthenticated
        ? "Cơm Tấm Sườn Bì Chả"
        : "Cách làm cơm tấm sườn bì chả 5",
      image: require("../../../assets/images/cachlamcomtam.jpg"),
    },
    {
      id: 6,
      title: isAuthenticated
        ? "Cơm Tấm Sườn Bì Chả"
        : "Cách làm cơm tấm sườn bì chả",
      image: require("../../../assets/images/cachlamcomtam.jpg"),
    },
    {
      id: 7,
      title: isAuthenticated
        ? "Bánh Flan Caramel"
        : "Cách làm cơm tấm sườn bì chả",
      image: require("../../../assets/images/cachlamcomtam.jpg"),
    },
  ];

  // Helper function to get category icon/image
  const getCategoryIcon = (category: any) => {
    // If imageUrl contains emoji, use it directly
    if (category.imageUrl && /[\u{1f000}-\u{1f999}]/u.test(category.imageUrl)) {
      return category.imageUrl;
    }

    // If imageUrl is a proper URL, you could use Image component
    // For now, fallback to generic icon
    return "🍽️";
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
            onRefresh={refreshCategories}
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
          <View style={homeStyles.sectionHeader}>
            <Text style={homeStyles.sectionTitle}>Danh mục món ăn</Text>
            {categoriesLoading && (
              <ActivityIndicator size="small" color="#FF6B35" />
            )}
          </View>

          <View style={homeStyles.categoriesGrid}>
            {displayCategories.slice(0, 10).map((category, index) => (
              <TouchableOpacity
                key={category.id || index}
                style={homeStyles.categoryItem}
                onPress={() => handleCategoryPress(category)}
              >
                <View style={homeStyles.categoryIconContainer}>
                  <Text style={homeStyles.categoryIcon}>
                    {getCategoryIcon(category)}
                  </Text>
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
          <Text style={homeStyles.sectionTitle}>Món ăn hấp dẫn</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={homeStyles.recipeRow}>
              {popularRecipes.map((recipe) => (
                <TouchableOpacity
                  key={recipe.id}
                  style={homeStyles.recipeCardHorizontal}
                  onPress={() => handleRecipePress(recipe)}
                >
                  <Image
                    source={recipe.image}
                    style={homeStyles.recipeCardImage}
                  />
                  <Text style={homeStyles.recipeCardTitle}>{recipe.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Common Recipes Section */}
        <View style={homeStyles.recipeSection}>
          <Text style={homeStyles.sectionTitle}>Món ăn phổ biến</Text>
          <View style={homeStyles.commonRecipesContainer}>
            {commonRecipes.map((recipe) => (
              <TouchableOpacity
                key={recipe.id}
                style={homeStyles.commonRecipeCard}
                onPress={() => handleRecipePress(recipe)}
              >
                <Image
                  source={recipe.image}
                  style={homeStyles.recipeCardImage}
                />
                <Text style={homeStyles.recipeCardTitle}>{recipe.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Add some bottom padding for tab navigator */}
        <View style={{ height: 60 }} />
      </ScrollView>

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
