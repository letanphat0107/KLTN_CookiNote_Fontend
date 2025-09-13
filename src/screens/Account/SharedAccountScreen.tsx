import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const SharedAccountScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tài Khoản Chia Sẻ</Text>
      
      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>NA</Text>
          </View>
          <Text style={styles.userName}>Nguyễn Văn A</Text>
          <Text style={styles.userDescription}>
            Yêu thích nấu ăn và chia sẻ những công thức độc đáo
          </Text>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>Công thức</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>128</Text>
            <Text style={styles.statLabel}>Người theo dõi</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>45</Text>
            <Text style={styles.statLabel}>Đang theo dõi</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Công thức đã chia sẻ</Text>
          
          <View style={styles.recipeCard}>
            <Text style={styles.recipeName}>Phở Bò Truyền Thống</Text>
            <Text style={styles.recipeStats}>👁 245 lượt xem • ❤️ 18 yêu thích</Text>
          </View>
          
          <View style={styles.recipeCard}>
            <Text style={styles.recipeName}>Bánh Mì Việt Nam</Text>
            <Text style={styles.recipeStats}>👁 189 lượt xem • ❤️ 12 yêu thích</Text>
          </View>
          
          <View style={styles.recipeCard}>
            <Text style={styles.recipeName}>Gỏi Cuốn Tôm Thịt</Text>
            <Text style={styles.recipeStats}>👁 156 lượt xem • ❤️ 9 yêu thích</Text>
          </View>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Chỉnh sửa trang cá nhân</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareButtonText}>Chia sẻ trang cá nhân</Text>
          </TouchableOpacity>
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  userDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F8F8F8',
    padding: 20,
    borderRadius: 8,
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  recipeCard: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  recipeStats: {
    fontSize: 14,
    color: '#666666',
  },
  actionButtons: {
    gap: 12,
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shareButton: {
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

export default SharedAccountScreen;
