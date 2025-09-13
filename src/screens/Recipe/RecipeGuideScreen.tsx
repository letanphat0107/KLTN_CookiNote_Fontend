import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const RecipeGuideScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Phở Bò Truyền Thống</Text>
        
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Thời gian:</Text>
            <Text style={styles.infoValue}>2 giờ</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Độ khó:</Text>
            <Text style={styles.infoValue}>Trung bình</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phục vụ:</Text>
            <Text style={styles.infoValue}>4 người</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nguyên liệu</Text>
          <View style={styles.ingredientList}>
            <Text style={styles.ingredient}>• 500g xương bò</Text>
            <Text style={styles.ingredient}>• 300g thịt bò tái</Text>
            <Text style={styles.ingredient}>• 400g bánh phở</Text>
            <Text style={styles.ingredient}>• 1 củ hành tây</Text>
            <Text style={styles.ingredient}>• Gừng, hành khô</Text>
            <Text style={styles.ingredient}>• Gia vị: muối, đường, nước mắm</Text>
            <Text style={styles.ingredient}>• Rau thơm: ngò, hành lá</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cách làm</Text>
          
          <View style={styles.step}>
            <Text style={styles.stepNumber}>Bước 1</Text>
            <Text style={styles.stepDescription}>
              Nướng gừng và hành tây trên bếp gas cho đến khi thơm. 
              Sau đó rửa sạch và để riêng.
            </Text>
          </View>
          
          <View style={styles.step}>
            <Text style={styles.stepNumber}>Bước 2</Text>
            <Text style={styles.stepDescription}>
              Cho xương bò vào nồi, đổ nước ngập. Đun sôi rồi vớt bọt, 
              hạ lửa nhỏ và niêu trong 1.5 giờ.
            </Text>
          </View>
          
          <View style={styles.step}>
            <Text style={styles.stepNumber}>Bước 3</Text>
            <Text style={styles.stepDescription}>
              Thêm gừng, hành tây đã nướng vào nồi nước dùng. 
              Nêm nếm gia vị cho vừa khẩu vị.
            </Text>
          </View>
          
          <View style={styles.step}>
            <Text style={styles.stepNumber}>Bước 4</Text>
            <Text style={styles.stepDescription}>
              Chần bánh phở với nước sôi. Thái thịt bò mỏng. 
              Chuẩn bị rau thơm.
            </Text>
          </View>
          
          <View style={styles.step}>
            <Text style={styles.stepNumber}>Bước 5</Text>
            <Text style={styles.stepDescription}>
              Cho bánh phở vào tô, xếp thịt bò lên trên, 
              chan nước dùng sôi và rắc rau thơm.
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lời khuyên</Text>
          <Text style={styles.tip}>
            • Để có nước dùng trong và ngọt, nên vớt bọt thật kỹ{'\n'}
            • Thịt bò cắt mỏng sẽ chín vừa tới khi chan nước dùng{'\n'}
            • Có thể thêm tắc, ớt tươi theo sở thích
          </Text>
        </View>
      </ScrollView>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.favoriteButton}>
          <Text style={styles.favoriteButtonText}>❤️ Yêu thích</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareButtonText}>📤 Chia sẻ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoSection: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  infoValue: {
    fontSize: 16,
    color: '#666666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 12,
  },
  ingredientList: {
    backgroundColor: '#F0F8FF',
    padding: 16,
    borderRadius: 8,
  },
  ingredient: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
    lineHeight: 24,
  },
  step: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  },
  tip: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    backgroundColor: '#FFF9E6',
    padding: 16,
    borderRadius: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  favoriteButton: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  favoriteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shareButton: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  shareButtonText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RecipeGuideScreen;
