import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
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
          <Image
            source={require("../../assets/images/vector.png")}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}

      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>CookiNote</Text>
      </View>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 40,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: 30,
    zIndex: 1,
  },
  backIcon: {
    width: 30,
    height: 30,
    tintColor: "#333333",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  appName: {
    fontSize: 44,
    fontWeight: "bold",
    color: "#FF7043",
    fontFamily: "Quicksand",
    letterSpacing: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    fontFamily: "Quicksand",
  },
});

export default AuthHeader;
