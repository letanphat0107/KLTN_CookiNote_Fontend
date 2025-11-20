import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Redux
import { useAppSelector } from "../store/hooks";

// Import screens and navigators
import HomeScreen from "../screens/Home/HomeScreen";
import FavoriteScreen from "../screens/Favorite/FavoriteScreen";
import UnauthenticatedFavorite from "../screens/Home/UnauthenticatedFavorite";
import CulinaryStoryNavigator from "./CulinaryStoryNavigator";
import { TabParamList } from "./types";

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF6B6B",
        tabBarInactiveTintColor: "#95A5A6",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E0E0E0",
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
      }}
    >
      {/* Home Tab */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={focused ? 26 : 24}
              color={color}
            />
          ),
        }}
      />

      {/* Story Tab */}
      <Tab.Screen
        name="CulinaryStory"
        component={CulinaryStoryNavigator}
        options={{
          tabBarLabel: "Câu chuyện",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "book" : "book-outline"}
              size={focused ? 26 : 24}
              color={color}
            />
          ),
        }}
      />

      {/* Favorite Tab */}
      <Tab.Screen
        name="Favorite"
        component={isAuthenticated ? FavoriteScreen : UnauthenticatedFavorite}
        options={{
          tabBarLabel: "Công thức",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
        name={focused ? "restaurant" : "restaurant-outline"}
        size={focused ? 26 : 24}
        color={color}
      />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
