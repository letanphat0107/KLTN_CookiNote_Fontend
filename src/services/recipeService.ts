// src/services/recipeService.ts
import { fetchWithAuth } from "../utils/apiUtils";
import { API_URLS, buildApiUrl, API_CONFIG } from "../config/api";
import { Recipe, RecipeWithDetails } from "../types/recipe";
import { RecipeSearchParams } from "../types/api";

export interface RecipeResponse {
  code: number;
  message: string;
  data: Recipe[];
}

export interface RecipeDetailResponse {
  code: number;
  message: string;
  data: RecipeWithDetails;
}

// Get popular recipes (public access)
export const getPopularRecipes = async (limit = 8): Promise<Recipe[]> => {
  try {
    console.log("Fetching popular recipes...");

    const params = new URLSearchParams({
      sort_by: "view",
      sort_order: "desc",
      limit: limit.toString(),
    });

    const response = await fetch(`${API_URLS.RECIPES}?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const result: RecipeResponse = await response.json();
    console.log("Popular recipes response:", result);

    if (response.ok && result.code === 200) {
      return result.data || [];
    } else {
      console.error("Failed to fetch popular recipes:", result.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching popular recipes:", error);
    return [];
  }
};

// Get easy-to-cook recipes (difficulty = "easy")
export const getEasyToCookRecipes = async (limit = 7): Promise<Recipe[]> => {
  try {
    console.log("Fetching easy-to-cook recipes...");

    const params = new URLSearchParams({
      difficulty: "easy",
      sort_by: "created_at",
      sort_order: "desc",
      limit: limit.toString(),
    });

    const response = await fetch(`${API_URLS.RECIPES}?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const result: RecipeResponse = await response.json();
    console.log("Easy-to-cook recipes response:", result);

    if (response.ok && result.code === 200) {
      return result.data || [];
    } else {
      console.error("Failed to fetch easy-to-cook recipes:", result.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching easy-to-cook recipes:", error);
    return [];
  }
};

// Search recipes (public access)
export const searchRecipes = async (
  searchParams: RecipeSearchParams
): Promise<Recipe[]> => {
  try {
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
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
      return result.data || [];
    } else {
      console.error("Failed to search recipes:", result.message);
      return [];
    }
  } catch (error) {
    console.error("Error searching recipes:", error);
    return [];
  }
};

// Get recipe details (requires authentication for some features)
export const getRecipeDetails = async (
  recipeId: number
): Promise<RecipeWithDetails | null> => {
  try {
    console.log("Fetching recipe details for ID:", recipeId);

    const response = await fetch(`${API_URLS.RECIPES}/${recipeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const result: RecipeDetailResponse = await response.json();
    console.log("Recipe details response:", result);

    if (response.ok && result.code === 200) {
      return result.data;
    } else {
      console.error("Failed to fetch recipe details:", result.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return null;
  }
};

// Get recipes by category (public access)
export const getRecipesByCategory = async (
  categoryId: number,
  limit = 20
): Promise<Recipe[]> => {
  try {
    const params = new URLSearchParams({
      category_id: categoryId.toString(),
      limit: limit.toString(),
      sort_by: "created_at",
      sort_order: "desc",
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
      return result.data || [];
    } else {
      console.error("Failed to fetch recipes by category:", result.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching recipes by category:", error);
    return [];
  }
};
