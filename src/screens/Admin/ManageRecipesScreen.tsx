import React from "react";
import { View, Text } from "react-native";
import { adminStyles } from "./styles";

const ManageRecipesScreen = () => {
  return (
    <View style={adminStyles.container}>
      <View style={adminStyles.comingSoonContainer}>
        <Text style={{ fontSize: 64, color: "#FF6B6B" }}>🍳</Text>
        <Text style={adminStyles.comingSoonTitle}>Quản lý món ăn</Text>
        <Text style={adminStyles.comingSoonText}>
          Chức năng đang được phát triển...
        </Text>
      </View>
    </View>
  );
};

export default ManageRecipesScreen;
