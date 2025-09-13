import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { loadingStyles } from "./styles";

const LoadingScreen = () => {
  return (
    <View style={loadingStyles.container}>
      <ActivityIndicator size="large" color="#FF6B6B" />
      <Text style={loadingStyles.text}>Đang tải...</Text>
    </View>
  );
};

export default LoadingScreen;
