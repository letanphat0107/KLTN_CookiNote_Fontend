import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { recipeStyles } from "./styles";
import { useAppSelector } from "../../store/hooks";

interface RecipeDetailScreenProps {
  route?: {
    params?: {
      recipeId?: string;
    };
  };
  navigation?: any;
}

// Mock data for ingredients and steps
const mockIngredients = [
  { id: 1, name: "Xương bò", quantity: "1kg", recipe_id: 1 },
  { id: 2, name: "Bánh phở khô", quantity: "400g", recipe_id: 1 },
  { id: 3, name: "Thịt bò tái", quantity: "200g", recipe_id: 1 },
  { id: 4, name: "Hành tây", quantity: "1 củ", recipe_id: 1 },
  { id: 5, name: "Gừng", quantity: "50g", recipe_id: 1 },
  { id: 6, name: "Hạt tiêu", quantity: "1 thìa cà phê", recipe_id: 1 },
  { id: 7, name: "Muối", quantity: "1 thìa cà phê", recipe_id: 1 },
  { id: 8, name: "Đường phèn", quantity: "1 thìa canh", recipe_id: 1 },
];

const mockSteps = [
  {
    id: 1,
    content:
      "Rửa sạch xương bò, cho vào nồi nước sôi chần 5 phút để loại bỏ tạp chất",
    step_no: 1,
    recipe_id: 1,
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_2BWz0CukYGFT9pvza-w6su7smU_xUkoEOg&s",
  },
  {
    id: 2,
    content: "Nướng hành tây và gừng trên bếp gas cho thơm, sau đó rửa sạch",
    step_no: 2,
    recipe_id: 1,
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_2BWz0CukYGFT9pvza-w6su7smU_xUkoEOg&s",
  },
  {
    id: 3,
    content:
      "Cho xương bò đã chần vào nồi nước lạnh, nấu trên lửa lớn đến khi sôi",
    step_no: 3,
    recipe_id: 1,
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_2BWz0CukYGFT9pvza-w6su7smU_xUkoEOg&s",
  },
  {
    id: 4,
    content:
      "Hạ lửa nhỏ, vớt bọt, thêm hành tây, gừng nướng và gia vị. Niêu 2-3 tiếng",
    step_no: 4,
    recipe_id: 1,
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_2BWz0CukYGFT9pvza-w6su7smU_xUkoEOg&s",
  },
];

const RecipeDetailScreen: React.FC<RecipeDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const recipeId = route?.params?.recipeId;
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Toast message state
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const toastOpacity = useState(new Animated.Value(0))[0];
  const toastTranslateY = useState(new Animated.Value(-100))[0];

  // Toast functions
  const showToastMessage = (message: string, duration: number = 3000) => {
    // Hide any existing toast first
    hideToast();

    setToastMessage(message);
    setShowToast(true);

    // Animate in
    Animated.parallel([
      Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(toastTranslateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto hide after duration
    setTimeout(() => {
      hideToast();
    }, duration);
  };

  const hideToast = () => {
    if (showToast) {
      Animated.parallel([
        Animated.timing(toastOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(toastTranslateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowToast(false);
        setToastMessage("");
      });
    }
  };

  const handleStartCooking = () => {
    if (!isAuthenticated) {
      showToastMessage(
        "🔐 Vui lòng đăng nhập để sử dụng chế độ hướng dẫn nấu ăn!",
        4000
      );

      // Navigate to login after showing toast
      setTimeout(() => {
        if (navigation) {
          navigation.navigate("Login");
        }
      }, 2000);
      return;
    }

    if (navigation) {
      navigation.navigate("RecipeGuide", { recipeId });
    }
  };

  const handleAddToFavorite = () => {
    if (!isAuthenticated) {
      showToastMessage(
        "❤️ Vui lòng đăng nhập để lưu công thức yêu thích!",
        3000
      );
      return;
    }

    // TODO: Implement add to favorite logic
    showToastMessage("❤️ Đã thêm vào danh sách yêu thích!", 2000);
    console.log("Added to favorites");
  };

  const handleShare = () => {
    // TODO: Implement share logic
    showToastMessage("📤 Đang chia sẻ công thức...", 2000);
    console.log("Share recipe");
  };

  return (
    <View style={recipeStyles.container}>
      {/* Toast Message */}
      {showToast && (
        <Animated.View
          style={[
            recipeStyles.toastContainer,
            {
              opacity: toastOpacity,
              transform: [{ translateY: toastTranslateY }],
            },
          ]}
        >
          <View style={recipeStyles.toastContent}>
            <Text style={recipeStyles.toastText}>{toastMessage}</Text>
            <TouchableOpacity
              style={recipeStyles.toastCloseButton}
              onPress={hideToast}
            >
              <Text style={recipeStyles.toastCloseText}>✕</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      <ScrollView
        style={recipeStyles.content}
        contentContainerStyle={recipeStyles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Recipe Image */}
        <View style={recipeStyles.imageContainer}>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_2BWz0CukYGFT9pvza-w6su7smU_xUkoEOg&s",
            }}
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
        </Text>

        {/* Ingredients Section */}
        <View style={recipeStyles.section}>
          <Text style={recipeStyles.sectionTitle}>🥄 Nguyên liệu</Text>
          <View style={recipeStyles.ingredientsContainer}>
            {mockIngredients.map((ingredient) => (
              <View key={ingredient.id} style={recipeStyles.ingredientItem}>
                <View style={recipeStyles.ingredientBullet} />
                <Text style={recipeStyles.ingredientName}>
                  {ingredient.name}
                </Text>
                <Text style={recipeStyles.ingredientQuantity}>
                  {ingredient.quantity}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Steps Section */}
        <View style={recipeStyles.section}>
          <Text style={recipeStyles.sectionTitle}>📝 Các bước thực hiện</Text>
          <View style={recipeStyles.stepsContainer}>
            {mockSteps.map((step) => (
              <View key={step.id} style={recipeStyles.stepItem}>
                <View style={recipeStyles.stepNumber}>
                  <Text style={recipeStyles.stepNumberText}>
                    {step.step_no}
                  </Text>
                </View>
                <View style={recipeStyles.stepContent}>
                  <Text style={recipeStyles.stepText}>{step.content}</Text>
                  {step.image_url && (
                    <Image
                      source={{ uri: step.image_url }}
                      style={recipeStyles.stepImage}
                    />
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Bottom spacing for fixed buttons */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Action Buttons */}
      <View style={recipeStyles.actionButtons}>
        <TouchableOpacity
          style={recipeStyles.favoriteButton}
          onPress={handleAddToFavorite}
        >
          <Text style={recipeStyles.favoriteButtonText}>❤️ Yêu thích</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={recipeStyles.shareButton}
          onPress={handleShare}
        >
          <Text style={recipeStyles.shareButtonText}>📤 Chia sẻ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            recipeStyles.startCookingButton,
            !isAuthenticated && recipeStyles.disabledCookingButton,
          ]}
          onPress={handleStartCooking}
        >
          <Text
            style={[
              recipeStyles.startCookingButtonText,
              !isAuthenticated && recipeStyles.disabledCookingButtonText,
            ]}
          >
            {!isAuthenticated ? "👨‍🍳 Bắt đầu nấu" : "👨‍🍳 Bắt đầu nấu"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecipeDetailScreen;
