import React, { useEffect, useRef } from "react";
import { View, Text, Image, Animated } from "react-native";
import { loadingStyles } from "./styles";

interface LoadingScreenProps {
  navigation?: any;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animation cho logo
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Chuyển đến trang chủ chưa đăng nhập sau 3 giây
    const navigationTimer = setTimeout(() => {
      if (navigation) {
        navigation.replace("MainTabs");
      }
    }, 3000);

    return () => {
      clearTimeout(navigationTimer);
    };
  }, [navigation]);

  return (
    <View style={loadingStyles.container}>
      {/* Logo Section */}
      <Animated.View
        style={[
          loadingStyles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image
          source={require("../../../assets/images/logo.png")}
          style={loadingStyles.logo}
          resizeMode="contain"
        />
        <Text style={loadingStyles.appName}>CookiNote</Text>
      </Animated.View>
    </View>
  );
};

export default LoadingScreen;
