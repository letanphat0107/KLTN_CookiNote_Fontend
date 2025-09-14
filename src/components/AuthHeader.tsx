import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface AuthHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  showBackButton = true,
  onBackPress,
}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
      )}

      <View style={styles.logoContainer}>
        <View style={styles.logoBox}>
          <Text style={styles.logoIcon}>🍳</Text>
          <Text style={styles.logoText}>CookiNote</Text>
        </View>
        <Text style={styles.appName}>CookiNote</Text>
      </View>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 30,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 50,
    zIndex: 1,
    padding: 10,
  },
  backIcon: {
    fontSize: 24,
    color: "#333333",
    fontWeight: "bold",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF0E6",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  logoIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  logoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    fontFamily: "Quicksand",
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6B6B",
    fontFamily: "Quicksand",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    fontFamily: "Quicksand",
  },
});

export default AuthHeader;
