import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AppState, AppStateStatus } from "react-native";

// Redux
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { checkAuthStatus } from "../store/authSlice";

// Import screens
import LoadingScreen from "../screens/Loading/LoadingScreen";
import LoginScreen from "../screens/Authentication/LoginScreen";
import RegisterScreen from "../screens/Authentication/RegisterScreen";
import ForgotPasswordScreen from "../screens/Authentication/ForgotPasswordScreen";
import NewPasswordScreen from "../screens/Authentication/NewPasswordScreen";
import OTPVerificationScreen from "../screens/Authentication/OTPVerificationScreen";

import TabNavigator from "./TabNavigator";

import RecipeDetailScreen from "../screens/Recipe/RecipeDetailScreen";
import RecipeGuideScreen from "../screens/Recipe/RecipeGuideScreen";
import AccountScreen from "../screens/Account/AccountScreen";
import ProfileScreen from "../screens/Account/ProfileScreen";
import SharedAccountScreen from "../screens/Account/SharedAccountScreen";

import AdminTabNavigator from "./AdminTabNavigator";
import ManageUsersScreen from "../screens/Admin/ManageUsersScreen";
import ManageCategoryScreen from "../screens/Admin/ManageCategory";
import ManageRecipeScreen from "../screens/Admin/ManageRecipesScreen";
import CreateRecipeScreen from "../screens/Admin/CreateRecipeScreen";
import EditRecipeScreen from "../screens/Admin/EditRecipeScreen";
import DailySuggestionsScreen from "../screens/Home/DailySuggestionsScreen";
import QRScannerScreen from "../screens/QRScanner/QRScannerScreen";
import LogStreamScreen from "../screens/Admin/LogStreamScreen";

import { RootStackParamList } from "./types";

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, user } = useAppSelector(
    (state) => state.auth
  );

  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);

  // Check authentication status when app starts (only once)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(checkAuthStatus()).unwrap();
      } catch (error) {
        console.log("Auth check failed:", error);
      } finally {
        setInitialCheckDone(true);
      }
    };

    if (!initialCheckDone) {
      checkAuth();
    }
  }, [dispatch, initialCheckDone]);

  // Handle app state changes (background/foreground)
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (nextAppState: AppStateStatus) => {
        // Track app state changes
        if (
          appState.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          // App has come to the foreground
          // Only silently check auth if user was authenticated
          if (isAuthenticated && initialCheckDone) {
            dispatch(checkAuthStatus()).catch((error) => {
              console.log("Background auth check failed:", error);
            });
          }
        }
        setAppState(nextAppState);
      }
    );

    return () => {
      subscription.remove();
    };
  }, [dispatch, isAuthenticated, initialCheckDone, appState]);

  // Show loading screen ONLY during initial check
  // Not when returning from background or image picker
  if (!initialCheckDone) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={
        isAuthenticated
          ? user?.role === "ADMIN"
            ? "AdminDashboard"
            : "MainTabs"
          : "Login"
      }
    >
      {isAuthenticated ? (
        // Authenticated Stack
        <>
          {/* Admin screens - conditional based on user role */}
          {user?.role === "ADMIN" && (
            <>
              <Stack.Screen
                name="AdminDashboard"
                component={AdminTabNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ManageUsers"
                component={ManageUsersScreen}
                options={{
                  headerShown: true,
                  title: "Quản lý người dùng",
                }}
              />
              <Stack.Screen
                name="ManageRecipe"
                component={ManageRecipeScreen}
                options={{
                  headerShown: true,
                  title: "Quản lý món ăn",
                }}
              />
              <Stack.Screen
                name="ManageCategory"
                component={ManageCategoryScreen}
                options={{
                  headerShown: true,
                  title: "Quản lý danh mục",
                }}
              />
              <Stack.Screen
                name="CreateRecipe"
                component={CreateRecipeScreen}
                options={{
                  headerShown: true,
                  title: "Tạo công thức mới",
                }}
              />
              <Stack.Screen
                name="EditRecipe"
                component={EditRecipeScreen}
                options={{ 
                  headerShown: true,
                  title: "Chỉnh sửa công thức"
                }}
              />
              <Stack.Screen
  name="LogStream"
  component={LogStreamScreen}
  options={{
    headerShown: false,
  }}
/>
            </>
          )}
          {/* Main App with Authenticated Tab Navigator */}
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="DailySuggestions" component={DailySuggestionsScreen} />

          {/* Additional authenticated screens */}
          <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
          <Stack.Screen name="RecipeGuide" component={RecipeGuideScreen} />
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
          <Stack.Screen name="SharedAccount" component={SharedAccountScreen} />
          
          <Stack.Screen
            name="OTPVerification"
            component={OTPVerificationScreen}
          />

<Stack.Screen 
  name="QRScanner" 
  component={QRScannerScreen}
/>

          {/* Authentication screens (for logout/re-login) */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
        </>
      ) : (
        // Unauthenticated Stack
        <>
          {/* Authentication */}
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen
                name="AdminDashboard"
                component={AdminTabNavigator}
                options={{ headerShown: false }}
              />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="OTPVerification"
            component={OTPVerificationScreen}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen name="NewPassword" component={NewPasswordScreen} />

          {/* Public recipe viewing */}
          <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
