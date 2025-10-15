import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";

// Redux
import { useAppSelector } from "../store/hooks";

// Import screens and navigators
import HomeScreen from "../screens/Home/HomeScreen";
import FavoriteScreen from "../screens/Favorite/FavoriteScreen";
import UnauthenticatedFavorite from "../screens/Home/UnauthenticatedFavorite";
import CulinaryStoryNavigator from "./CulinaryStoryNavigator"; // Change this import
import { TabParamList } from "./types";

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF6B6B",
        tabBarInactiveTintColor: "#666666",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E0E0E0",
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
      }}
    >
      {/* Home Tab - Always use the unified HomeScreen */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>🏠</Text>
          ),
        }}
      />

      {/* Story Tab - Use Stack Navigator */}
      <Tab.Screen
        name="CulinaryStory"
        component={CulinaryStoryNavigator} // Change this to use Navigator
        options={{
          tabBarLabel: "Câu chuyện",
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>📖</Text>
          ),
        }}
      />

      {/* Favorite Tab - Show different component based on authentication */}
      <Tab.Screen
        name="Favorite"
        component={isAuthenticated ? FavoriteScreen : UnauthenticatedFavorite}
        options={{
          tabBarLabel: "Yêu thích",
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>❤️</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
