// src/services/tokenService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tokens } from "../types/user";

const TOKEN_KEY = "auth_tokens";
const USER_KEY = "user_data";

export const tokenService = {
  // Save tokens to storage
  saveTokens: async (tokens: Tokens) => {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
    } catch (error) {
      console.error("Error saving tokens:", error);
    }
  },

  // Get tokens from storage
  getTokens: async (): Promise<Tokens | null> => {
    try {
      const tokens = await AsyncStorage.getItem(TOKEN_KEY);
      return tokens ? JSON.parse(tokens) : null;
    } catch (error) {
      console.error("Error getting tokens:", error);
      return null;
    }
  },

  // Save user data
  saveUser: async (user: any) => {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error("Error saving user:", error);
    }
  },

  // Get user data
  getUser: async () => {
    try {
      const user = await AsyncStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  },

  // Clear all data
  clearStorage: async () => {
    try {
      await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  },
};
