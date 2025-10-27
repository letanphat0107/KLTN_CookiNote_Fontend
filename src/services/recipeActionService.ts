// src/services/recipeActionService.ts
import { API_CONFIG, buildApiUrl } from "../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Helper function to get access token
const getAccessToken = async (): Promise<string | null> => {
  try {
    const tokens = await AsyncStorage.getItem("auth_tokens");
    if (tokens) {
      const parsedTokens = JSON.parse(tokens);
      return parsedTokens.accessToken;
    }
    return null;
  } catch (error) {
    console.error("Error getting access token:", error);
    return null;
  }
};

// Helper function to create auth headers
const createAuthHeaders = async (): Promise<Record<string, string>> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const accessToken = await getAccessToken();
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return headers;
};

interface ForkRecipeData {
  categoryId: number;
  title: string;
  description: string;
  prepareTime: number;
  cookTime: number;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  privacy: "PUBLIC" | "PRIVATE";
  ingredients: Array<{
    name: string;
    quantity: string;
  }>;
  steps: Array<{
    stepNo: number;
    content: string;
    suggestedTime?: number;
    tips?: string;
  }>;
}

// Add recipe ingredients to shopping list
export const addRecipeToShoppingList = async (
  recipeId: number
): Promise<boolean> => {
  try {
    console.log("Adding recipe to shopping list:", recipeId);

    const headers = await createAuthHeaders();
    const url = `${API_CONFIG.BASE_URL}/cookinote/shopping-lists/recipes/${recipeId}`;

    const response = await fetch(url, {
      method: "POST",
      headers,
      
    });

    const result = await response.json();
    console.log("Add recipe to shopping list response:", result);

    if (response.ok && result.code === 200) {
      return true;
    } else {
      console.error("Failed to add recipe to shopping list:", result.message);
      return false;
    }
  } catch (error) {
    console.error("Error adding recipe to shopping list:", error);
    return false;
  }
};

// Fork recipe (create editable copy)
export const forkRecipe = async (
  recipeId: number,
  data: ForkRecipeData
): Promise<boolean> => {
  try {
    console.log("Forking recipe:", recipeId, data);

    const headers = await createAuthHeaders();
    const url = `${API_CONFIG.BASE_URL}/cookinote/recipes/${recipeId}/fork`;

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
      
    });

    const result = await response.json();
    console.log("Fork recipe response:", result);

    if (response.ok && result.code === 200) {
      return true;
    } else {
      console.error("Failed to fork recipe:", result.message);
      return false;
    }
  } catch (error) {
    console.error("Error forking recipe:", error);
    return false;
  }
};
