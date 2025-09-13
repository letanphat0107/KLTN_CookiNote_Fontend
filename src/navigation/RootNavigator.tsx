import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import screens
import LoadingScreen from "../screens/Loading/LoadingScreen";
import LoginScreen from "../screens/Authentication/LoginScreen";
import RegisterScreen from "../screens/Authentication/RegisterScreen";
import ForgotPasswordScreen from "../screens/Authentication/ForgotPasswordScreen";
import NewPasswordScreen from "../screens/Authentication/NewPasswordScreen";

import TabNavigator from "./TabNavigator";

import RecipeDetailScreen from "../screens/Recipe/RecipeDetailScreen";
import RecipeGuideScreen from "../screens/Recipe/RecipeGuideScreen";
import AccountScreen from "../screens/Account/AccountScreen";
import ProfileScreen from "../screens/Account/ProfileScreen";
import ChangePasswordScreen from "../screens/Account/ChangePasswordScreen";
import SharedAccountScreen from "../screens/Account/SharedAccountScreen";
import AdminDashboardScreen from "../screens/Admin/AdminDashboardScreen";
import ManageDishesScreen from "../screens/Admin/ManageDishesScreen";
import ManageUsersScreen from "../screens/Admin/ManageUsersScreen";
import AddRecipeScreen from "../screens/Admin/AddRecipeScreen";

import { RootStackParamList } from "./types";

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Loading"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Loading */}
      <Stack.Screen name="Loading" component={LoadingScreen} />

      {/* Authentication */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />

      {/* Main App */}
      <Stack.Screen
        name="UnauthenticatedHome"
        component={TabNavigator}
      />

      {/* Recipe */}
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{ headerShown: true, title: "Chi tiết công thức" }}
      />
      <Stack.Screen
        name="RecipeGuide"
        component={RecipeGuideScreen}
        options={{ headerShown: true, title: "Hướng dẫn nấu ăn" }}
      />

      {/* Account */}
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: true, title: "Tài khoản" }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: true, title: "Thông tin cá nhân" }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ headerShown: true, title: "Đổi mật khẩu" }}
      />
      <Stack.Screen
        name="SharedAccount"
        component={SharedAccountScreen}
        options={{ headerShown: true, title: "Trang cá nhân" }}
      />

      {/* Admin */}
      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboardScreen}
        options={{ headerShown: true, title: "Quản trị viên" }}
      />
      <Stack.Screen
        name="ManageDishes"
        component={ManageDishesScreen}
        options={{ headerShown: true, title: "Quản lý món ăn" }}
      />
      <Stack.Screen
        name="ManageUsers"
        component={ManageUsersScreen}
        options={{ headerShown: true, title: "Quản lý người dùng" }}
      />
      <Stack.Screen
        name="AddRecipe"
        component={AddRecipeScreen}
        options={{ headerShown: true, title: "Thêm công thức" }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
