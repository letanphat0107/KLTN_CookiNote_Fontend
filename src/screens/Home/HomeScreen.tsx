import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { homeStyles } from "./styles";

const HomeScreen: React.FC = () => {
  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.header}>
        <Text style={homeStyles.title}>Trang Chủ</Text>

        <View style={homeStyles.searchContainer}>
          <Text style={homeStyles.searchIcon}>🔍</Text>
          <TextInput
            style={homeStyles.searchInput}
            placeholder="Tìm kiếm công thức..."
            placeholderTextColor="#999999"
          />
        </View>
      </View>

      <ScrollView style={homeStyles.content}>
        <View style={homeStyles.welcomeSection}>
          <Text style={homeStyles.welcomeTitle}>
            Chào mừng đến với CookiNote!
          </Text>
          <Text style={homeStyles.welcomeSubtitle}>
            Khám phá và chia sẻ những công thức nấu ăn tuyệt vời
          </Text>
        </View>

        <View style={homeStyles.categorySection}>
          <Text style={homeStyles.sectionTitle}>Danh mục món ăn</Text>
          <View style={homeStyles.categoryContainer}>
            <TouchableOpacity style={homeStyles.categoryCard}>
              <Text style={homeStyles.categoryIcon}>🍜</Text>
              <Text style={homeStyles.categoryName}>Món Việt</Text>
            </TouchableOpacity>

            <TouchableOpacity style={homeStyles.categoryCard}>
              <Text style={homeStyles.categoryIcon}>🍝</Text>
              <Text style={homeStyles.categoryName}>Món Ý</Text>
            </TouchableOpacity>

            <TouchableOpacity style={homeStyles.categoryCard}>
              <Text style={homeStyles.categoryIcon}>🍰</Text>
              <Text style={homeStyles.categoryName}>Tráng miệng</Text>
            </TouchableOpacity>

            <TouchableOpacity style={homeStyles.categoryCard}>
              <Text style={homeStyles.categoryIcon}>🥗</Text>
              <Text style={homeStyles.categoryName}>Salad</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={homeStyles.categorySection}>
          <Text style={homeStyles.sectionTitle}>Công thức phổ biến</Text>

          <View style={homeStyles.recipeCard}>
            <View style={homeStyles.recipeImage}>
              <Text style={homeStyles.recipeImagePlaceholder}>🍜</Text>
            </View>
            <View style={homeStyles.recipeInfo}>
              <Text style={homeStyles.recipeName}>Phở Bò Truyền Thống</Text>
              <Text style={homeStyles.recipeDescription}>
                Món phở bò với nước dùng trong vắt, thơm ngon đậm đà hương vị
                truyền thống
              </Text>
              <View style={homeStyles.recipeStats}>
                <Text style={homeStyles.recipeStat}>⏱️ 2 giờ</Text>
                <Text style={homeStyles.recipeStat}>👥 4 người</Text>
                <Text style={homeStyles.recipeStat}>⭐ 4.8</Text>
              </View>
            </View>
          </View>

          <View style={homeStyles.recipeCard}>
            <View style={homeStyles.recipeImage}>
              <Text style={homeStyles.recipeImagePlaceholder}>🍰</Text>
            </View>
            <View style={homeStyles.recipeInfo}>
              <Text style={homeStyles.recipeName}>Bánh Flan Caramel</Text>
              <Text style={homeStyles.recipeDescription}>
                Bánh flan mềm mịn với lớp caramel đắng ngọt hài hòa
              </Text>
              <View style={homeStyles.recipeStats}>
                <Text style={homeStyles.recipeStat}>⏱️ 45 phút</Text>
                <Text style={homeStyles.recipeStat}>👥 6 người</Text>
                <Text style={homeStyles.recipeStat}>⭐ 4.9</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
