import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { homeStyles } from "./styles";

interface UnauthenticatedHomeScreenProps {
  navigation?: any;
}

const UnauthenticatedHomeScreen: React.FC<UnauthenticatedHomeScreenProps> = ({
  navigation,
}) => {
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

  const categories = [
    { icon: "🥬", name: "Món xào" },
    { icon: "🥬", name: "Món xào" },
    { icon: "🥬", name: "Món xào" },
    { icon: "🥬", name: "Món xào" },
    { icon: "🥬", name: "Món xào" },
    { icon: "🥬", name: "Món xào" },
    { icon: "🥬", name: "Món xào" },
    { icon: "🥬", name: "Món xào" },
    { icon: "🥬", name: "Món xào" },
    { icon: "🥬", name: "Món xào" },
  ];

  const popularRecipes = [
    {
      id: 1,
      title: "Cách làm cơm tấm sườn bì chả",
      image: "https://via.placeholder.com/150x100",
    },
    {
      id: 2,
      title: "Cách làm cơm tấm sườn bì chả",
      image: "https://via.placeholder.com/150x100",
    },
    {
      id: 3,
      title: "Cách làm cơm tấm sườn bì chả",
      image: "https://via.placeholder.com/150x100",
    },
  ];

  const commonRecipes = [
    {
      id: 1,
      title: "Cách làm cơm tấm sườn bì chả",
      image: "https://via.placeholder.com/150x100",
    },
    {
      id: 2,
      title: "Cách làm cơm tấm sướn bì chả",
      image: "https://via.placeholder.com/150x100",
    },
    {
      id: 3,
      title: "Cách làm cơm tấm sướn bì chả",
      image: "https://via.placeholder.com/150x100",
    },
    {
      id: 4,
      title: "Cách làm cơm tấm sướn bì chả",
      image: "https://via.placeholder.com/150x100",
    },
  ];

  return (
    <View style={homeStyles.container}>
      {/* Header */}
      <View style={homeStyles.unauthHeader}>
        <View style={homeStyles.searchWrapper}>
          <TextInput
            style={homeStyles.unauthSearchInput}
            placeholder=""
            placeholderTextColor="#999"
          />
        </View>
        <TouchableOpacity
          style={homeStyles.accountButton}
          onPress={handleLogin}
        >
          <Text style={homeStyles.accountButtonText}>Tài khoản</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={homeStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Today's Suggestion Banner */}
        <View style={homeStyles.suggestionBanner}>
          <View style={homeStyles.bannerContent}>
            <Text style={homeStyles.bannerTitle}>Hôm nay ăn gì?</Text>
            <Text style={homeStyles.bannerSubtitle}>Đã có CookiNote lo!</Text>
            <TouchableOpacity style={homeStyles.bannerButton}>
              <Text style={homeStyles.bannerButtonText}>Xem ngay</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: "https://via.placeholder.com/120x80" }}
            style={homeStyles.bannerImage}
          />
        </View>

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
                >
                  <Image
                    source={{ uri: recipe.image }}
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
                style={homeStyles.recipeCardHorizontal}
              >
                <Image
                  source={{ uri: recipe.image }}
                  style={homeStyles.recipeCardImage}
                />
                <Text style={homeStyles.recipeCardTitle}>{recipe.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Login Prompt Card */}
        <View style={homeStyles.loginPromptCard}>
          <Text style={homeStyles.loginPromptTitle}>Xin chào bếp trưởng!</Text>
          <Text style={homeStyles.loginPromptSubtitle}>
            Để lưu công thức và tạo thực đơn, bạn cần đăng nhập hoặc đăng ký tài
            khoản mới nhé
          </Text>
          <View style={homeStyles.loginPromptButtons}>
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
        </View>

        {/* Add some bottom padding for tab navigator */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

export default UnauthenticatedHomeScreen;
