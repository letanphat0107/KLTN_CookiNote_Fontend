import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { recipeStyles } from "./styles";

const RecipeGuideScreen = () => {
  return (
    <View style={recipeStyles.container}>
      <ScrollView style={recipeStyles.content}>
        <Text style={recipeStyles.title}>Phở Bò Truyền Thống</Text>

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

        <View style={recipeStyles.section}>
          <Text style={recipeStyles.sectionTitle}>Nguyên liệu</Text>
          <View style={recipeStyles.ingredientList}>
            <Text style={recipeStyles.ingredient}>• 500g xương bò</Text>
            <Text style={recipeStyles.ingredient}>• 300g thịt bò tái</Text>
            <Text style={recipeStyles.ingredient}>• 400g bánh phở</Text>
            <Text style={recipeStyles.ingredient}>• 1 củ hành tây</Text>
            <Text style={recipeStyles.ingredient}>• Gừng, hành khô</Text>
            <Text style={recipeStyles.ingredient}>
              • Gia vị: muối, đường, nước mắm
            </Text>
            <Text style={recipeStyles.ingredient}>
              • Rau thơm: ngò, hành lá
            </Text>
          </View>
        </View>

        <View style={recipeStyles.section}>
          <Text style={recipeStyles.sectionTitle}>Cách làm</Text>

          <View style={recipeStyles.step}>
            <Text style={recipeStyles.stepNumber}>Bước 1</Text>
            <Text style={recipeStyles.stepDescription}>
              Nướng gừng và hành tây trên bếp gas cho đến khi thơm. Sau đó rửa
              sạch và để riêng.
            </Text>
          </View>

          <View style={recipeStyles.step}>
            <Text style={recipeStyles.stepNumber}>Bước 2</Text>
            <Text style={recipeStyles.stepDescription}>
              Cho xương bò vào nồi, đổ nước ngập. Đun sôi rồi vớt bọt, hạ lửa
              nhỏ và niêu trong 1.5 giờ.
            </Text>
          </View>

          <View style={recipeStyles.step}>
            <Text style={recipeStyles.stepNumber}>Bước 3</Text>
            <Text style={recipeStyles.stepDescription}>
              Thêm gừng, hành tây đã nướng vào nồi nước dùng. Nêm nếm gia vị cho
              vừa khẩu vị.
            </Text>
          </View>

          <View style={recipeStyles.step}>
            <Text style={recipeStyles.stepNumber}>Bước 4</Text>
            <Text style={recipeStyles.stepDescription}>
              Chần bánh phở với nước sôi. Thái thịt bò mỏng. Chuẩn bị rau thơm.
            </Text>
          </View>

          <View style={recipeStyles.step}>
            <Text style={recipeStyles.stepNumber}>Bước 5</Text>
            <Text style={recipeStyles.stepDescription}>
              Cho bánh phở vào tô, xếp thịt bò lên trên, chan nước dùng sôi và
              rắc rau thơm.
            </Text>
          </View>
        </View>

        <View style={recipeStyles.section}>
          <Text style={recipeStyles.sectionTitle}>Lời khuyên</Text>
          <Text style={recipeStyles.tip}>
            • Để có nước dùng trong và ngọt, nên vớt bọt thật kỹ{"\n"}• Thịt bò
            cắt mỏng sẽ chín vừa tới khi chan nước dùng{"\n"}• Có thể thêm tắc,
            ớt tươi theo sở thích
          </Text>
        </View>
      </ScrollView>

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

export default RecipeGuideScreen;
