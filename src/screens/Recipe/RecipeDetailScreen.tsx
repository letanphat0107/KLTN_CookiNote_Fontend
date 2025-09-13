import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { recipeStyles } from "./styles";

interface RecipeDetailScreenProps {
  route?: {
    params?: {
      recipeId?: string;
    };
  };
}

const RecipeDetailScreen: React.FC<RecipeDetailScreenProps> = ({ route }) => {
  const recipeId = route?.params?.recipeId;

  return (
    <View style={recipeStyles.container}>
      <ScrollView
        style={recipeStyles.content}
        contentContainerStyle={recipeStyles.scrollContainer}
      >
        {/* Recipe Image */}
        <View style={recipeStyles.imageContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/350x200" }}
            style={recipeStyles.recipeImage}
          />
        </View>

        {/* Recipe Title */}
        <Text style={recipeStyles.title}>Phở Bò Truyền Thống</Text>

        {/* Recipe Info Section */}
        <View style={recipeStyles.infoSection}>
          <View style={recipeStyles.infoRow}>
            <Text style={recipeStyles.infoLabel}>Thời gian:</Text>
            <Text style={recipeStyles.infoValue}>2 giờ</Text>
          </View>
          <View style={recipeStyles.infoRow}>
            <Text style={recipeStyles.infoLabel}>Độ khó:</Text>
            <Text style={recipeStyles.infoValue}>Trung bình</Text>
          </View>
          <View style={recipeStyles.infoRow}>
            <Text style={recipeStyles.infoLabel}>Phục vụ:</Text>
            <Text style={recipeStyles.infoValue}>4 người</Text>
          </View>
        </View>

        {/* Rating and Tags */}
        <View style={recipeStyles.ratingContainer}>
          <Text style={recipeStyles.ratingText}>⭐⭐⭐⭐⭐ (4.8/5)</Text>
          <View style={recipeStyles.difficultyBadge}>
            <Text style={recipeStyles.difficultyText}>Trung bình</Text>
          </View>
        </View>

        {/* Tags */}
        <View style={recipeStyles.tagsContainer}>
          <View style={recipeStyles.tag}>
            <Text style={recipeStyles.tagText}>Phở</Text>
          </View>
          <View style={recipeStyles.tag}>
            <Text style={recipeStyles.tagText}>Việt Nam</Text>
          </View>
          <View style={recipeStyles.tag}>
            <Text style={recipeStyles.tagText}>Thịt bò</Text>
          </View>
        </View>

        {/* Nutrition Info */}
        <View style={recipeStyles.nutritionContainer}>
          <View style={recipeStyles.nutritionItem}>
            <Text style={recipeStyles.nutritionValue}>450</Text>
            <Text style={recipeStyles.nutritionLabel}>Calo</Text>
          </View>
          <View style={recipeStyles.nutritionItem}>
            <Text style={recipeStyles.nutritionValue}>25g</Text>
            <Text style={recipeStyles.nutritionLabel}>Protein</Text>
          </View>
          <View style={recipeStyles.nutritionItem}>
            <Text style={recipeStyles.nutritionValue}>60g</Text>
            <Text style={recipeStyles.nutritionLabel}>Carbs</Text>
          </View>
          <View style={recipeStyles.nutritionItem}>
            <Text style={recipeStyles.nutritionValue}>12g</Text>
            <Text style={recipeStyles.nutritionLabel}>Fat</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={recipeStyles.description}>
          Phở bò là món ăn truyền thống của Việt Nam, được chế biến từ bánh phở,
          nước dùng trong và ngọt từ xương bò, cùng với thịt bò tái hoặc chín.
          Đây là món ăn đặc trưng và được yêu thích nhất của ẩm thực Việt Nam.
          Recipe ID: {recipeId || "Not provided"}
        </Text>
      </ScrollView>

      {/* Action Buttons */}
      <View style={recipeStyles.actionButtons}>
        <TouchableOpacity style={recipeStyles.favoriteButton}>
          <Text style={recipeStyles.favoriteButtonText}>❤️ Yêu thích</Text>
        </TouchableOpacity>

        <TouchableOpacity style={recipeStyles.shareButton}>
          <Text style={recipeStyles.shareButtonText}>📤 Chia sẻ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecipeDetailScreen;
