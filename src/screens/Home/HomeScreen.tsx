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

interface HomeScreenProps {
  navigation?: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const handleProfilePress = () => {
    if (navigation) {
      navigation.navigate("Profile");
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
      title: "Phở Bò Truyền Thống",
      image: "https://via.placeholder.com/150x100",
    },
    {
      id: 2,
      title: "Bánh Flan Caramel",
      image: "https://via.placeholder.com/150x100",
    },
    {
      id: 3,
      title: "Cơm Tấm Sườn Bì Chả",
      image: "https://via.placeholder.com/150x100",
    },
  ];

  const commonRecipes = [
    {
      id: 1,
      title: "Canh Chua Cá Lóc",
      image: "https://via.placeholder.com/150x100",
    },
    {
      id: 2,
      title: "Thịt Kho Tàu",
      image: "https://via.placeholder.com/150x100",
    },
    {
      id: 3,
      title: "Gà Xào Sả Ớt",
      image: "https://via.placeholder.com/150x100",
    },
    {
      id: 4,
      title: "Chè Ba Màu",
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
            placeholder="Tìm kiếm công thức..."
            placeholderTextColor="#999"
          />
        </View>
        <TouchableOpacity onPress={handleProfilePress}>
          <Image
            source={{ uri: "https://via.placeholder.com/40x40" }}
            style={homeStyles.userAvatar}
          />
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

        {/* Add some bottom padding for tab navigator */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
