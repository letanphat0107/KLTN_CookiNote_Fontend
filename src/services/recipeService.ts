// src/services/recipeService.ts
import { fetchWithAuth } from "../utils/apiHelper";
import { API_URLS, API_CONFIG } from "../config/api";
import {
  Recipe,
  RecipeWithDetails,
  RecipeResponse,
  RecipeDetailResponse,
  PaginatedRecipeResponse,
} from "../types/recipe";
import { RecipeSearchParams } from "../types/api";

// Get popular recipes (sorted by view count) - PUBLIC, keep fetch
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

// Get latest recipes (easy-to-cook section) - PUBLIC, keep fetch
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

    if (response.ok && result.code === 200) {
      return result.data.items || [];
    } else {
      console.error("Failed to fetch latest recipes:", result.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching latest recipes:", error);
    return [];
  }
};

// Search recipes with pagination - PUBLIC, keep fetch
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

// Get recipe details - REQUIRES AUTH (already using fetchWithAuth)
export const getRecipeDetails = async (
  recipeId: number
): Promise<RecipeWithDetails | null> => {
  try {
    console.log("Fetching recipe details for ID:", recipeId);

    const response = await fetchWithAuth(`${API_URLS.RECIPES}/${recipeId}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result: RecipeDetailResponse = await response.json();

    if (result.code === 200) {
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

// Get recipes by category - PUBLIC, keep fetch
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

// Get recipes by difficulty - PUBLIC, keep fetch
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

// Get recipes by category using specific endpoint - PUBLIC, keep fetch
export const getRecipesByCategoryEndpoint = async (
  categoryId: number,
  page = 0,
  size = 12
): Promise<PaginatedRecipeResponse> => {
  try {
    console.log(`Fetching recipes for category ${categoryId}...`);

    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    const response = await fetch(
      `${API_CONFIG.BASE_URL}/cookinote/recipes/categories/${categoryId}?${params}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const result: RecipeResponse = await response.json();
    console.log("Category recipes response:", result);

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

// Search recipes with query - PUBLIC, keep fetch
export const searchRecipesByQuery = async (
  query: string,
  page = 0,
  size = 20
): Promise<PaginatedRecipeResponse> => {
  try {
    console.log(`Searching recipes with query: ${query}`);

    const params = new URLSearchParams({
      query: query.trim(),
      page: page.toString(),
      size: size.toString(),
    });

    const response = await fetch(
      `${API_CONFIG.BASE_URL}/cookinote/recipes/search?${params}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const result: RecipeResponse = await response.json();
    console.log("Search recipes response:", result);

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
