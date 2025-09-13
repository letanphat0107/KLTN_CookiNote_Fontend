import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, TouchableOpacity, Alert } from "react-native";

// Redux
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { logoutUser } from "../store/authSlice";

// Import screens
import HomeScreen from "../screens/Home/HomeScreen";
import UnauthenticatedHomeScreen from "../screens/Home/UnauthenticatedHomeScreen";
import FavoriteScreen from "../screens/Favorite/FavoriteScreen";
import CulinaryStoryScreen from "../screens/CulinaryStory/CulinaryStoryScreen";
import { UnauthenticatedTabParamList } from "./types";

const Tab = createBottomTabNavigator<UnauthenticatedTabParamList>();

const TabNavigator = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: () => dispatch(logoutUser()),
      },
    ]);
  };

  const ProfileTab = () => (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#FFFFFF",
      }}
      onPress={handleLogout}
    >
      <Text style={{ fontSize: 50, marginBottom: 16 }}>👤</Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: "#333333",
          marginBottom: 8,
        }}
      >
        {user?.display_name || "User"}
      </Text>
      <Text style={{ fontSize: 14, color: "#666666", marginBottom: 20 }}>
        {user?.email}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#FF6B6B",
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 8,
        }}
        onPress={handleLogout}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "bold" }}>
          Đăng xuất
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

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
      {isAuthenticated ? (
        // Authenticated Tabs
        <>
          <Tab.Screen
            name="UnauthHome"
            component={HomeScreen}
            options={{
              tabBarLabel: "Trang chủ",
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 20, color }}>🏠</Text>
              ),
            }}
          />
          <Tab.Screen
            name="UnauthFavorite"
            component={FavoriteScreen}
            options={{
              tabBarLabel: "Yêu thích",
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 20, color }}>❤️</Text>
              ),
            }}
          />
          <Tab.Screen
            name="UnauthStory"
            component={CulinaryStoryScreen}
            options={{
              tabBarLabel: "Câu chuyện",
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 20, color }}>📖</Text>
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileTab}
            options={{
              tabBarLabel: "Cá nhân",
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 20, color }}>👤</Text>
              ),
            }}
          />
        </>
      ) : (
        // Unauthenticated Tabs
        <>
          <Tab.Screen
            name="UnauthHome"
            component={UnauthenticatedHomeScreen}
            options={{
              tabBarLabel: "Trang chủ",
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 20, color }}>🏠</Text>
              ),
            }}
          />
          <Tab.Screen
            name="UnauthStory"
            component={CulinaryStoryScreen}
            options={{
              tabBarLabel: "Câu chuyện",
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 20, color }}>📖</Text>
              ),
            }}
          />
          <Tab.Screen
            name="UnauthFavorite"
            component={() => <UnauthenticatedHomeScreen />}
            options={{
              tabBarLabel: "Yêu thích",
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 20, color }}>❤️</Text>
              ),
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

export default TabNavigator;
