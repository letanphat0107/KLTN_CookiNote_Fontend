import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image, Animated } from "react-native";
import { loadingStyles } from "./styles";

interface LoadingScreenProps {
  navigation?: any;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ navigation }) => {
  const [activeDot, setActiveDot] = useState(0);
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

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

    // Animation cho loading dots
    const dotInterval = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % 3);
    }, 500);

    // Chuyển đến trang chủ chưa đăng nhập sau 3 giây
    const navigationTimer = setTimeout(() => {
      if (navigation) {
        navigation.replace("UnauthenticatedHome");
      }
    }, 3000);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(navigationTimer);
    };
  }, [navigation, fadeAnim, scaleAnim]);

  const renderLoadingDots = () => {
    return (
      <View style={loadingStyles.dotsContainer}>
        {[0, 1, 2].map((index) => (
          <View
            key={index}
            style={[
              loadingStyles.dot,
              activeDot === index && loadingStyles.dotActive,
            ]}
          />
        ))}
      </View>
    );
  };

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
        <Text style={loadingStyles.tagline}>
          Nơi chia sẻ công thức nấu ăn yêu thích
        </Text>
      </Animated.View>

      {/* Loading Section */}
      <View style={loadingStyles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#FF6B6B"
          style={loadingStyles.loadingIndicator}
        />
        <Text style={loadingStyles.text}>Đang tải ứng dụng...</Text>
        {renderLoadingDots()}
      </View>
    </View>
  );
};

export default LoadingScreen;
