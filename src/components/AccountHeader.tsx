import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

interface AccountHeaderProps {
  title: string;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  // Avatar edit props
  enableAvatarEdit?: boolean;
  onAvatarPress?: () => void;
  isUpdatingAvatar?: boolean;
}

const AccountHeader: React.FC<AccountHeaderProps> = ({
  title,
  userName,
  userEmail,
  userAvatar,
  showBackButton = true,
  onBackPress,
  enableAvatarEdit = false,
  onAvatarPress,
  isUpdatingAvatar = false,
}) => {
  const renderAvatar = () => {
    const avatarContent = userAvatar ? (
      <Image
        source={{ uri: userAvatar }}
        style={styles.logo}
        resizeMode="cover"
      />
    ) : (
      <View style={[styles.logo, styles.defaultAvatar]}>
        <Text style={styles.avatarText}>
          {userName ? userName.charAt(0).toUpperCase() : "U"}
        </Text>
      </View>
    );

    if (enableAvatarEdit) {
      return (
        <TouchableOpacity
          onPress={onAvatarPress}
          disabled={isUpdatingAvatar}
          style={styles.avatarTouchable}
          activeOpacity={0.8}
        >
          {avatarContent}

          {/* Loading overlay */}
          {isUpdatingAvatar && (
            <View style={styles.avatarLoading}>
              <ActivityIndicator size="large" color="#FF6B35" />
            </View>
          )}

          {/* Camera icon for edit */}
          {!isUpdatingAvatar && (
            <View style={styles.cameraIcon}>
              <Text style={styles.cameraText}>📷</Text>
            </View>
          )}
        </TouchableOpacity>
      );
    }

    return avatarContent;
  };

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
        <View style={styles.logoContainer}>{renderAvatar()}</View>
      </View>

      {/* User Name */}
      {userName && (
        <View style={styles.userNameSection}>
          <Text style={styles.userName}>{userName}</Text>
          {enableAvatarEdit && !isUpdatingAvatar && (
            <Text style={styles.avatarHint}>Nhấn vào ảnh để thay đổi</Text>
          )}
        </View>
      )}
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
    height: 120,
    position: "relative",
  },

  logoContainer: {
    position: "absolute",
    top: 35,
    justifyContent: "center",
    alignItems: "center",
  },

  // Avatar styles (ưu tiên AccountHeader CSS)
  logo: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },

  // Default avatar (when no image)
  defaultAvatar: {
    backgroundColor: "#FF6B35",
    justifyContent: "center",
    alignItems: "center",
    // Shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  avatarText: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontFamily: "Roboto",
  },

  // Edit mode styles
  avatarTouchable: {
    position: "relative",
  },

  avatarLoading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 80,
  },

  cameraIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#FF6B35",
    borderRadius: 18,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    // Shadow for camera icon
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  cameraText: {
    fontSize: 16,
  },

  // User name section
  userNameSection: {
    alignItems: "center",
    marginTop: 100,
    marginBottom: 10,
  },

  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    fontFamily: "Roboto",
    marginBottom: 5,
  },

  avatarHint: {
    fontSize: 12,
    color: "#666666",
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default AccountHeader;
