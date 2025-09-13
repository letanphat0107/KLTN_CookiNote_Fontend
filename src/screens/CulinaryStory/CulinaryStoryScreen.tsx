import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const CulinaryStoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Câu Chuyện Ẩm Thực</Text>
      
      <ScrollView style={styles.content}>
        <View style={styles.storyCard}>
          <Text style={styles.storyTitle}>Khám phá văn hóa ẩm thực Việt Nam</Text>
          <Text style={styles.storyContent}>
            Nơi chia sẻ những câu chuyện thú vị về ẩm thực, 
            từ những món ăn truyền thống đến các xu hướng hiện đại...
          </Text>
        </View>
        
        <View style={styles.storyCard}>
          <Text style={styles.storyTitle}>Bí quyết nấu ăn từ các đầu bếp</Text>
          <Text style={styles.storyContent}>
            Học hỏi những kỹ thuật nấu ăn độc đáo và 
            bí quyết từ các chuyên gia ẩm thực...
          </Text>
        </View>
        
        <View style={styles.storyCard}>
          <Text style={styles.storyTitle}>Hành trình khám phá món ăn địa phương</Text>
          <Text style={styles.storyContent}>
            Cùng nhau khám phá những món ăn đặc sản 
            từ khắp mọi miền đất nước...
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
    color: '#333333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  storyCard: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  storyContent: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});

export default CulinaryStoryScreen;
