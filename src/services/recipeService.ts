// src/services/recipeService.ts
import { fetchWithAuth } from "../utils/apiUtils";
import { API_URLS, buildApiUrl, API_CONFIG } from "../config/api";
import {
  Recipe,
  RecipeWithDetails,
  RecipeResponse,
  RecipeDetailResponse,
  PaginatedRecipeResponse,
} from "../types/recipe";
import { RecipeSearchParams } from "../types/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Helper function to get access token
const getAccessToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem("auth_tokens").then((tokens) => {
      if (tokens) {
        const parsedTokens = JSON.parse(tokens);
        return parsedTokens.accessToken;
      } else {
        return null;
      }    }     )
  } catch (error) {
    console.error("Error getting access token:", error);
    return null;
  }
};

// Get popular recipes (sorted by view count)
export const getPopularRecipes = async (limit = 8): Promise<Recipe[]> => {
  try {
    console.log("Fetching popular recipes...");

    const response = await fetch(`${API_URLS.POPULAR_RECIPES}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const result: RecipeResponse = await response.json();

    if (response.ok && result.code === 200) {
      return result.data.items || [];
    } else {
      console.error("Failed to fetch popular recipes:", result.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching popular recipes:", error);
    return [];
  }
};

// Get latest recipes (easy-to-cook section - sorted by creation date)
export const getEasyToCookRecipes = async (limit = 7): Promise<Recipe[]> => {
  try {
    console.log("Fetching latest recipes...");

    const response = await fetch(`${API_URLS.EASYTOCOOK_RECIPES}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const result: RecipeResponse = await response.json();
    console.log("Latest recipes response:", result);

    if (response.ok && result.code === 200) {
      // Filter for easy recipes if needed, or return all latest
      const recipes = result.data.items || [];

      // Option 1: Return all latest recipes
      return recipes;

      // Option 2: Filter for easy recipes only (uncomment if needed)
      // return recipes.filter(recipe =>
      //   recipe.difficulty?.toUpperCase() === "EASY"
      // );
    } else {
      console.error("Failed to fetch latest recipes:", result.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching latest recipes:", error);
    return [];
  }
};

// Search recipes with pagination
export const searchRecipes = async (
  searchParams: RecipeSearchParams & {
    page?: number;
    size?: number;
    sort?: string;
  }
): Promise<PaginatedRecipeResponse> => {
  try {
    const params = new URLSearchParams();

    // Add search parameters
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    // Default pagination
    if (!searchParams.page) params.append("page", "0");
    if (!searchParams.size) params.append("size", "20");
    if (!searchParams.sort) params.append("sort", "createdAt,desc");

    const response = await fetch(`${API_URLS.RECIPES}?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const result: RecipeResponse = await response.json();

    if (response.ok && result.code === 200) {
      return result.data;
    } else {
      console.error("Failed to search recipes:", result.message);
      return {
        page: 0,
        size: 0,
        totalElements: 0,
        totalPages: 0,
        hasNext: false,
        items: [],
      };
    }
  } catch (error) {
    console.error("Error searching recipes:", error);
    return {
      page: 0,
      size: 0,
      totalElements: 0,
      totalPages: 0,
      hasNext: false,
      items: [],
    };
  }
};

// Get recipe details with authentication
export const getRecipeDetails = async (
  recipeId: number
): Promise<RecipeWithDetails | null> => {
  try {
    console.log("Fetching recipe details for ID:", recipeId);

    // Get access token
    const accessToken = await getAccessToken();

    // Prepare headers
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    // Add authorization header if token exists
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    console.log(accessToken);
    

    const response = await fetch(`${API_URLS.RECIPES}/${recipeId}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result: RecipeDetailResponse = await response.json();
    console.log("Recipe details response:", result);

    if (result.code === 200) {
      return result.data;
    } else {
      console.error("Failed to fetch recipe details:", result.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching recipe details s:", error);
    return null;
  }
};

// Alternative: Using fetchWithAuth utility

// Get recipes by category with pagination
export const getRecipesByCategory = async (
  categoryId: number,
  page = 0,
  size = 20
): Promise<PaginatedRecipeResponse> => {
  try {
    const params = new URLSearchParams({
      categoryId: categoryId.toString(),
      page: page.toString(),
      size: size.toString(),
      sort: "createdAt,desc",
    });

    const response = await fetch(`${API_URLS.RECIPES}?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const result: RecipeResponse = await response.json();

    if (response.ok && result.code === 200) {
      return result.data;
    } else {
      console.error("Failed to fetch recipes by category:", result.message);
      return {
        page: 0,
        size: 0,
        totalElements: 0,
        totalPages: 0,
        hasNext: false,
        items: [],
      };
    }
  } catch (error) {
    console.error("Error fetching recipes by category:", error);
    return {
      page: 0,
      size: 0,
      totalElements: 0,
      totalPages: 0,
      hasNext: false,
      items: [],
    };
  }
};

// Get recipes by difficulty
export const getRecipesByDifficulty = async (
  difficulty: "EASY" | "MEDIUM" | "HARD",
  limit = 20
): Promise<Recipe[]> => {
  try {
    const params = new URLSearchParams({
      page: "0",
      size: limit.toString(),
      sort: "createdAt,desc",
    });

    const response = await fetch(`${API_URLS.RECIPES}?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const result: RecipeResponse = await response.json();

    if (response.ok && result.code === 200) {
      // Filter by difficulty on client side
      return result.data.items.filter(
        (recipe) => recipe.difficulty?.toUpperCase() === difficulty
      );
    } else {
      console.error("Failed to fetch recipes by difficulty:", result.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching recipes by difficulty:", error);
    return [];
  }
};
