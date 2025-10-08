import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import { useAppSelector } from "../../store/hooks";
import { homeStyles } from "./styles";

const { height } = Dimensions.get("window");

interface HomeScreenProps {
  navigation?: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current; // bắt đầu ở ngoài màn hình (bottom)

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
  };

  const handleRegister = () => {
    if (navigation) {
      navigation.navigate("Register");
    }
  };

  const handleRecipePress = (recipe: any) => {
    if (navigation) {
      navigation.navigate("RecipeDetail", { recipeId: recipe.id });
    }
  };

  const categories = [
    { icon: "🍜", name: "Món Việt" },
    { icon: "🍝", name: "Món Ý" },
    { icon: "🍰", name: "Tráng miệng" },
    { icon: "🥗", name: "Salad" },
    { icon: "🍖", name: "Thịt nướng" },
    { icon: "🐟", name: "Hải sản" },
    { icon: "🥘", name: "Cà ri" },
    { icon: "🍛", name: "Cơm" },
    { icon: "🍲", name: "Lẩu" },
    { icon: "🥤", name: "Đồ uống" },
  ];

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
                  user?.avatar_url ||
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
      >
        {/* Today's Suggestion Banner - Only for authenticated users */}
        {isAuthenticated && (
          <View style={homeStyles.suggestionBanner}>
            <View style={homeStyles.bannerContent}>
              <View style = {homeStyles.bannerTextContainer}>
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
        <View style={homeStyles.categoriesGrid}>
          {categories.map((category, index) => (
            <TouchableOpacity key={index} style={homeStyles.categoryItem}>
              <View style={homeStyles.categoryIconContainer}>
                <Text style={homeStyles.categoryIcon}>{category.icon}</Text>
              </View>
              <Text style={homeStyles.categoryLabel}>{category.name}</Text>
            </TouchableOpacity>
          ))}
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

        {/* Create a touchable area for the entire content */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (!isAuthenticated) {
            }
          }}
          style={{ flex: 1 }}
        ></TouchableOpacity>

        {/* Add some bottom padding for tab navigator */}
        <View style={{ height: 60 }} />
      </ScrollView>
      {/* Popup */}
      {showLoginPrompt && (
        <Animated.View
          style={{
            position: "absolute",
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#fff",
            padding: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            elevation: 5,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Xin chào bếp trưởng!
          </Text>
          <Text style={{ marginBottom: 20 }}>
            Để lưu công thức và tạo thực đơn, bạn cần đăng nhập hoặc đăng ký tài
            khoản mới nhé.
          </Text>

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#FFD54F",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
              }}
              onPress={() => {
                console.log("Đăng ký");
                closePrompt();
              }}
            >
              <Text style={{ color: "#000" }}>Đăng ký</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "#FF7043",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
              }}
              onPress={() => {
                console.log("Đăng nhập");
                closePrompt();
              }}
            >
              <Text style={{ color: "#fff" }}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default HomeScreen;
