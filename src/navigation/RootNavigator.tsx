import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Redux
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { checkAuthStatus } from "../store/authSlice";

// Import screens
import LoadingScreen from "../screens/Loading/LoadingScreen";
import LoginScreen from "../screens/Authentication/LoginScreen";

import TabNavigator from "./TabNavigator";

import RecipeDetailScreen from "../screens/Recipe/RecipeDetailScreen";
import RecipeGuideScreen from "../screens/Recipe/RecipeGuideScreen";
import AccountScreen from "../screens/Account/AccountScreen";
import ProfileScreen from "../screens/Account/ProfileScreen";
import ChangePasswordScreen from "../screens/Account/ChangePasswordScreen";
import SharedAccountScreen from "../screens/Account/SharedAccountScreen";
import AdminDashboardScreen from "../screens/Admin/AdminDashboardScreen";
import ManageDishesScreen from "../screens/Admin/ManageDishesScreen";
import AddRecipeScreen from "../screens/Admin/AddRecipeScreen";

import { RootStackParamList } from "./types";

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, user } = useAppSelector(
    (state) => state.auth
  );

  // Check authentication status when app starts
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isAuthenticated ? (
        // Authenticated Stack
        <>
          {/* Loading */}
          <Stack.Screen name="Loading" component={LoadingScreen} />

          {/* Main App with Authenticated Tab Navigator */}
          <Stack.Screen name="HomeScreen" component={TabNavigator} />

          {/* Additional authenticated screens */}
          <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
          <Stack.Screen name="RecipeGuide" component={RecipeGuideScreen} />
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
          />
          <Stack.Screen name="SharedAccount" component={SharedAccountScreen} />

          {/* Admin screens - conditional based on user role */}
          {user?.role === "admin" && (
            <>
              <Stack.Screen
                name="AdminDashboard"
                component={AdminDashboardScreen}
              />
              <Stack.Screen
                name="ManageDishes"
                component={ManageDishesScreen}
              />
              {/* <Stack.Screen name="ManageUsers" component={ManageUsersScreen} /> */}
              <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
            </>
          )}
        </>
      ) : (
        // Unauthenticated Stack
        <>
          {/* Loading */}
          <Stack.Screen name="Loading" component={LoadingScreen} />
          
          {/* Unauthenticated Home with limited features */}
          <Stack.Screen name="HomeScreen" component={TabNavigator} />

          {/* Authentication */}
          <Stack.Screen name="Login" component={LoginScreen} />

          {/* Public recipe viewing */}
          <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
