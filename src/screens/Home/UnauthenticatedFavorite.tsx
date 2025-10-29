import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface UnauthenticatedFavoriteProps {
  navigation?: any;
}

const UnauthenticatedFavorite: React.FC<UnauthenticatedFavoriteProps> = ({
  navigation,
}) => {
  const nav = useNavigation();

  const handleLogin = () => {
    if (navigation) {
      navigation.navigate("Login");
    } else {
      nav.navigate("Login" as never);
    }
  };

  const handleRegister = () => {
    if (navigation) {
      navigation.navigate("Register");
    } else {
      nav.navigate("Register" as never);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Heart Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.heartIcon}>💔</Text>
        </View>

        {/* Main Message */}
        <Text style={styles.title}>Yêu thích của bạn</Text>
        <Text style={styles.description}>
          Hãy đăng nhập/đăng ký để lưu trữ những công thức yêu thích nhé!
        </Text>

        {/* Features List */}
        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>❤️</Text>
            <Text style={styles.featureText}>Lưu công thức yêu thích</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📝</Text>
            <Text style={styles.featureText}>Tạo danh sách riêng</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🔄</Text>
            <Text style={styles.featureText}>Đồng bộ trên nhiều thiết bị</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Đăng nhập</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>

        {/* Skip Option
        <TouchableOpacity style={styles.skipButton}>
          <Text style={styles.skipButtonText}>Khám phá công thức ngay</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  iconContainer: {
    marginBottom: 30,
  },
  heartIcon: {
    fontSize: 80,
    textAlign: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    marginBottom: 15,
    fontFamily: "Quicksand",
  },
  description: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
    fontFamily: "Roboto",
  },
  featuresList: {
    width: "100%",
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  featureText: {
    fontSize: 16,
    color: "#555555",
    fontFamily: "Roboto",
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#FF6B35",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontFamily: "Quicksand",
  },
  registerButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FF6B35",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6B35",
    fontFamily: "Quicksand",
  },
  skipButton: {
    marginTop: 20,
  },
  skipButtonText: {
    fontSize: 14,
    color: "#999999",
    textDecorationLine: "underline",
    fontFamily: "Roboto",
  },
});

export default UnauthenticatedFavorite;
