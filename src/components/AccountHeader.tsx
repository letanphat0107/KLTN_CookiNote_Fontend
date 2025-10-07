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
            <Text style={styles.backButtonText}>←</Text>
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
          <Text style={styles.appName}>CookiNote</Text>
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
  backButtonText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: "Roboto",
  },

  // Logo section
  logoSection: {
    backgroundColor: "#FF6B35",
    paddingBottom: 60,
    alignItems: "center",
  },
  logoContainer: {
    backgroundColor: "#FFF3E0",
    borderRadius: 100,
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
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
    marginTop: 30,
    marginBottom: 40,
    fontFamily: "Roboto",
  },
});

export default AccountHeader;
