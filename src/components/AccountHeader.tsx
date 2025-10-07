import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

interface AccountHeaderProps {
  title: string;
  userName?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

const AccountHeader: React.FC<AccountHeaderProps> = ({
  title,
  userName,
  showBackButton = true,
  onBackPress,
}) => {
  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        {showBackButton && (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Image
              source={require("../../assets/images/vector.png")}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      {/* Logo Section */}
      <View style={styles.logoSection}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* User Name */}
      {userName && <Text style={styles.userName}>{userName}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  // Header styles
  header: {
    backgroundColor: "#FF6B35",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 20,
  },
  backIcon: {
    width: 30,
    height: 30,
    tintColor: "#ffffff",
  },
  headerTitle: {
    fontSize: 26,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: "Roboto",
  },

  // Logo section
  logoSection: {
    backgroundColor: "#FF6B35",
    alignItems: "center",
    height: 120, // Chiều cao vùng màu cam
    position: "relative",
  },

  logoContainer: {
    position: "absolute",
    top: 35, // ✅ Logo nhô ra nửa ngoài (tùy chỉnh)
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 160,
    height: 160,
  },

  appName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6B35",
    fontFamily: "Roboto",
  },

  // User name
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    marginTop: 100,
    marginBottom: 10,
    fontFamily: "Roboto",
  },
});

export default AccountHeader;
