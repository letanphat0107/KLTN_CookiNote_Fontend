
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AdminDashboardScreen from "../screens/Admin/AdminDashboardScreen";
import ManageUsersScreen from "../screens/Admin/ManageUsersScreen";
import ManageRecipesScreen from "../screens/Admin/ManageRecipesScreen";

const AdminTabNavigator = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const renderScreen = () => {
    switch (activeTab) {
      case "Users":
        return <ManageUsersScreen />;
      case "Recipes":
        return <ManageRecipesScreen />;
      default:
        return <AdminDashboardScreen />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* --- Thanh Tab --- */}
      <View style={styles.tabBar}>
        {["Dashboard", "Users", "Recipes"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabItem,
              activeTab === tab && styles.activeTabItem,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabLabel,
                activeTab === tab && styles.activeTabLabel,
              ]}
            >
              {tab === "Dashboard"
                ? "Tổng quan"
                : tab === "Users"
                ? "Người dùng"
                : "Món ăn"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* --- Nội dung màn hình --- */}
      <View style={{ flex: 1 }}>{renderScreen()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  activeTabItem: {
    borderBottomWidth: 3,
    borderBottomColor: "#FF6B6B",
  },
  tabLabel: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },
  activeTabLabel: {
    color: "#FF6B6B",
    fontWeight: "700",
  },
});

export default AdminTabNavigator;
