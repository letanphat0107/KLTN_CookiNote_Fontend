import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Alert } from "react-native";

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
import AdminDashboardScreen from "../screens/Admin/AdminDashboardScreen";
import ManageDishesScreen from "../screens/Admin/ManageDishesScreen";
import AdminTabNavigator from "./AdminTabNavigator";

import { RootStackParamList } from "./types";

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, user, error } = useAppSelector(
    (state) => state.auth
  );

  // Check authentication status when app starts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(checkAuthStatus()).unwrap();
      } catch (error) {
        console.log("Auth check failed:", error);
        // Error is already handled in the thunk
      }
    };

    checkAuth();
  }, [dispatch]);

  // Show loading screen while checking authentication
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={isAuthenticated ? "MainTabs" : "Login"}
    >
      {isAuthenticated ? (
        // Authenticated Stack
        <>
                  {/* Admin screens - conditional based on user role */}
          {/* Admin screens - conditional based on user role */}
          {user?.role === "ADMIN" && (
            <>
              <Stack.Screen
                name="AdminDashboard"
                component={AdminTabNavigator}
                options={{ headerShown: false }}
              />
            </>
          )}
          {/* Main App with Authenticated Tab Navigator */}
          <Stack.Screen name="MainTabs" component={TabNavigator} />

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
