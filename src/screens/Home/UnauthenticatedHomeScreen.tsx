import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const UnauthenticatedHomeScreen = () => {
  const handleFeaturePress = () => {
    Alert.alert(
      'Yêu cầu đăng nhập',
      'Bạn cần đăng nhập để sử dụng tính năng này',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đăng nhập',
          onPress: () => {
            // Navigate to login screen
            console.log('Navigate to login');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CookiNote</Text>
      <Text style={styles.subtitle}>Khám phá thế giới ẩm thực</Text>
      
      <View style={styles.featuresContainer}>
        <TouchableOpacity style={styles.featureButton} onPress={handleFeaturePress}>
          <Text style={styles.featureButtonText}>Công thức yêu thích</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.featureButton} onPress={handleFeaturePress}>
          <Text style={styles.featureButtonText}>Gợi ý hôm nay</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.featureButton} onPress={handleFeaturePress}>
          <Text style={styles.featureButtonText}>Câu chuyện ẩm thực</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.featureButton} onPress={handleFeaturePress}>
          <Text style={styles.featureButtonText}>Tìm kiếm món ăn</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.authContainer}>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Đăng Nhập</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Đăng Ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF6B6B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
    marginBottom: 40,
  },
  featuresContainer: {
    marginBottom: 40,
  },
  featureButton: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  featureButtonText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
  },
  authContainer: {
    gap: 12,
  },
  loginButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  registerButtonText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UnauthenticatedHomeScreen;
