// src/services/favoriteService.ts
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

// Response interfaces
interface FavoriteResponse {
  code: number;
  message: string;
  data?: any;
  timestamp: string;
  path: string;
}

// Add recipe to favorites
export const addToFavorites = async (recipeId: number): Promise<boolean> => {
  try {
    console.log("Adding recipe to favorites:", recipeId);

    const headers = await createAuthHeaders();
    const url = buildApiUrl(API_CONFIG.ENDPOINTS.RECIPE.ADD_FAVORITE, {
      id: recipeId,
    });

    const response = await fetch(url, {
      method: "POST",
      headers,
    });

    const result: FavoriteResponse = await response.json();
    console.log("Add to favorites response:", result);

    if (response.ok && result.code === 200) {
      return true;
    } else {
      console.error("Failed to add to favorites:", result.message);
      return false;
    }
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return false;
  }
};

// Remove recipe from favorites
export const removeFromFavorites = async (
  recipeId: number
): Promise<boolean> => {
  try {
    console.log("Removing recipe from favorites:", recipeId);

    const headers = await createAuthHeaders();
    const url = buildApiUrl(API_CONFIG.ENDPOINTS.RECIPE.REMOVE_FAVORITE, {
      id: recipeId,
    });

    const response = await fetch(url, {
      method: "DELETE",
      headers,
    });

    const result: FavoriteResponse = await response.json();
    console.log("Remove from favorites response:", result);

    if (response.ok && result.code === 200) {
      return true;
    } else {
      console.error("Failed to remove from favorites:", result.message);
      return false;
    }
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return false;
  }
};

// Check if recipe is in favorites
export const checkFavoriteStatus = async (
  recipeId: number
): Promise<boolean> => {
  try {
    console.log("Checking favorite status for recipe:", recipeId);

    const headers = await createAuthHeaders();
    const url = buildApiUrl(API_CONFIG.ENDPOINTS.RECIPE.ADD_FAVORITE, {
      id: recipeId,
    });

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    const result: FavoriteResponse = await response.json();
    console.log("Check favorite status response:", result);

    // Assuming the API returns the favorite status in the response
    // Adjust this based on your actual API response structure
    return response.ok && result.code === 200;
  } catch (error) {
    console.error("Error checking favorite status:", error);
    return false;
  }
};

// Get user's favorite recipes
export const getFavoriteRecipes = async (
  page = 0,
  size = 20
): Promise<{ recipes: any[]; hasNext: boolean }> => {
  try {
    console.log("Fetching favorite recipes...");

    const headers = await createAuthHeaders();
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      sort: "createdAt,desc",
    });

    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.RECIPE.FAVORITE}?${params}`,
      {
        method: "GET",
        headers,
      }
    );

    const result: FavoriteResponse = await response.json();
    console.log("Get favorite recipes response:", result);

    if (response.ok && result.code === 200) {
      return {
        recipes: result.data?.items || [],
        hasNext: result.data?.hasNext || false,
      };
    } else {
      console.error("Failed to get favorite recipes:", result.message);
      return { recipes: [], hasNext: false };
    }
  } catch (error) {
    console.error("Error getting favorite recipes:", error);
    return { recipes: [], hasNext: false };
  }
};
