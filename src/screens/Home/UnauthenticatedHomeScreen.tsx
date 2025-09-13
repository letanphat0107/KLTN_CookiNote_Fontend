import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { homeStyles } from "./styles";

const UnauthenticatedHomeScreen = () => {
  const handleLogin = () => {
    // Navigate to login screen
    console.log("Navigate to login");
  };

  const handleRegister = () => {
    // Navigate to register screen
    console.log("Navigate to register");
  };

  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.centerContent}>
        <View style={homeStyles.logoContainer}>
          <View style={homeStyles.logo}>
            <Text style={homeStyles.logoText}>🍳</Text>
          </View>
          <Text style={homeStyles.appName}>CookiNote</Text>
          <Text style={homeStyles.welcomeSubtitle}>
            Khám phá thế giới ẩm thực
          </Text>
        </View>

        <View style={homeStyles.featuresSection}>
          <View style={homeStyles.featureItem}>
            <Text style={homeStyles.featureIcon}>❤️</Text>
            <Text style={homeStyles.featureText}>Lưu công thức yêu thích</Text>
          </View>

          <View style={homeStyles.featureItem}>
            <Text style={homeStyles.featureIcon}>🔥</Text>
            <Text style={homeStyles.featureText}>Gợi ý món ăn hàng ngày</Text>
          </View>

          <View style={homeStyles.featureItem}>
            <Text style={homeStyles.featureIcon}>📖</Text>
            <Text style={homeStyles.featureText}>
              Chia sẻ câu chuyện ẩm thực
            </Text>
          </View>

          <View style={homeStyles.featureItem}>
            <Text style={homeStyles.featureIcon}>👥</Text>
            <Text style={homeStyles.featureText}>
              Kết nối với cộng đồng đầu bếp
            </Text>
          </View>
        </View>

        <View style={homeStyles.buttonContainer}>
          <TouchableOpacity
            style={homeStyles.primaryButton}
            onPress={handleLogin}
          >
            <Text style={homeStyles.primaryButtonText}>Đăng nhập</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={homeStyles.secondaryButton}
            onPress={handleRegister}
          >
            <Text style={homeStyles.secondaryButtonText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UnauthenticatedHomeScreen;
