import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const FavoriteScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Món Ăn Yêu Thích</Text>
      
      <ScrollView style={styles.content}>
        <View style={styles.favoriteCard}>
          <Text style={styles.recipeName}>Phở Bò Truyền Thống</Text>
          <Text style={styles.recipeDescription}>
            Món phở bò với nước dùng trong vắt, thơm ngon...
          </Text>
          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>Xem công thức</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Bỏ yêu thích</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.favoriteCard}>
          <Text style={styles.recipeName}>Bánh Mì Việt Nam</Text>
          <Text style={styles.recipeDescription}>
            Bánh mì giòn tan với nhân thịt và rau củ tươi ngon...
          </Text>
          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>Xem công thức</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Bỏ yêu thích</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.favoriteCard}>
          <Text style={styles.recipeName}>Gỏi Cuốn Tôm Thịt</Text>
          <Text style={styles.recipeDescription}>
            Gỏi cuốn tươi mát với tôm, thịt và rau thơm...
          </Text>
          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>Xem công thức</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Bỏ yêu thích</Text>
            </TouchableOpacity>
          </View>
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
  favoriteCard: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  recipeDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  viewButton: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  removeButton: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  removeButtonText: {
    color: '#FF6B6B',
    fontSize: 14,
  },
});

export default FavoriteScreen;
