// src/services/favoriteService.ts
import { API_CONFIG, buildApiUrl } from "../config/api";
import { fetchWithAuth } from "../utils/apiHelper";
import { Recipe } from "../types/recipe";

// Response interfaces
interface FavoriteResponse {
  code: number;
  message: string;
  data?: any;
  timestamp: string;
  path: string;
}

interface PaginatedFavoriteResponse {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  items: Recipe[];
}

interface CookedHistoryResponse {
  code: number;
  message: string;
  data: PaginatedFavoriteResponse;
  timestamp: string;
  path: string;
}

interface PaginatedCookedHistoryResponse {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  items: CookedHistoryItem[];
}

interface CookedHistoryItem {
  id: number;
  recipe: Recipe;
  cookedAt: string;
  rating?: number;
  note?: string;
}

// Get cooked history
export const getCookedHistory = async (
  page = 0,
  size = 20
): Promise<PaginatedFavoriteResponse> => {
  try {
    console.log("Fetching cooked history...");

    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      sort: "cookedAt,desc",
    });

    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/cooked-history/me?${params}`,
      {
        method: "GET",
      }
    );

    const result: CookedHistoryResponse = await response.json();
    console.log("Get cooked history response:", result);

    if (response.ok && result.code === 200) {
      return result.data;
    } else {
      console.error("Failed to get cooked history:", result.message);
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
    console.error("Error getting cooked history:", error);
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

// Add recipe to cooked history
export const addToCookedHistory = async (
  recipeId: number,
  rating?: number,
  note?: string
): Promise<boolean> => {
  try {
    console.log("Adding to cooked history:", { recipeId, rating, note });

    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/cooked-history`,
      {
        method: "POST",
        body: JSON.stringify({
          recipeId,
          rating,
          note,
        }),
      }
    );

    const result = await response.json();
    console.log("Add to cooked history response:", result);

    return response.ok && result.code === 200;
  } catch (error) {
    console.error("Error adding to cooked history:", error);
    return false;
  }
};

// Remove from cooked history
export const removeFromCookedHistory = async (
  historyId: number
): Promise<boolean> => {
  try {
    console.log("Removing from cooked history:", historyId);

    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/cooked-history/${historyId}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();
    console.log("Remove from cooked history response:", result);

    return response.ok && result.code === 200;
  } catch (error) {
    console.error("Error removing from cooked history:", error);
    return false;
  }
};

// Add recipe to favorites
export const addToFavorites = async (recipeId: number): Promise<boolean> => {
  try {
    console.log("Adding recipe to favorites:", recipeId);

    const url = buildApiUrl(API_CONFIG.ENDPOINTS.RECIPE.ADD_FAVORITE, {
      id: recipeId,
    });

    const response = await fetchWithAuth(url, {
      method: "POST",
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

    const url = buildApiUrl(API_CONFIG.ENDPOINTS.RECIPE.REMOVE_FAVORITE, {
      id: recipeId,
    });

    const response = await fetchWithAuth(url, {
      method: "DELETE",
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

    const url = buildApiUrl(API_CONFIG.ENDPOINTS.RECIPE.ADD_FAVORITE, {
      id: recipeId,
    });

    const response = await fetchWithAuth(url, {
      method: "GET",
    });

    const result: FavoriteResponse = await response.json();
    console.log("Check favorite status response:", result);

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
): Promise<PaginatedFavoriteResponse> => {
  try {
    console.log("Fetching favorite recipes...");

    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      sort: "createdAt,desc",
    });

    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.RECIPE.FAVORITE}?${params}`,
      {
        method: "GET",
      }
    );

    const result: FavoriteResponse = await response.json();
    console.log("Get favorite recipes response:", result);

    if (response.ok && result.code === 200) {
      const items = Array.isArray(result.data)
        ? result.data
        : result.data?.items || [];

      return {
        page: result.data?.page || 0,
        size: result.data?.size || items.length,
        totalElements: result.data?.totalElements || items.length,
        totalPages: result.data?.totalPages || (items.length > 0 ? 1 : 0),
        hasNext: result.data?.hasNext || false,
        items: items,
      };
    } else {
      console.error("Failed to get favorite recipes:", result.message);
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
    console.error("Error getting favorite recipes:", error);
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

// Get user's own recipes
export const getMyRecipes = async (
  page = 0,
  size = 20
): Promise<PaginatedFavoriteResponse> => {
  try {
    console.log("Fetching my recipes...");

    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      sort: "createdAt,desc",
      owner: "me",
    });

    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.RECIPE.MYRECIPE}?${params}`,
      {
        method: "GET",
      }
    );

    const result: FavoriteResponse = await response.json();
    console.log("Get my recipes response:", result);

    if (response.ok && result.code === 200) {
      return {
        page: result.data?.page || 0,
        size: result.data?.size || 0,
        totalElements: result.data?.totalElements || 0,
        totalPages: result.data?.totalPages || 0,
        hasNext: result.data?.hasNext || false,
        items: result.data?.items || [],
      };
    } else {
      console.error("Failed to get my recipes:", result.message);
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
    console.error("Error getting my recipes:", error);
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

// Get user's deleted recipes
export const getDeletedRecipes = async (
  userId: number,
  page = 0,
  size = 20
): Promise<PaginatedFavoriteResponse> => {
  try {
    console.log("Fetching deleted recipes...");

    const params = new URLSearchParams({
      userId: userId.toString(),
      page: page.toString(),
      size: size.toString(),
      sort: "deletedAt,desc",
    });

    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/recipes/deleted?${params}`,
      {
        method: "GET",
      }
    );

    const result: FavoriteResponse = await response.json();
    console.log("Get deleted recipes response:", result);

    if (response.ok && result.code === 200) {
      return {
        page: result.data?.page || 0,
        size: result.data?.size || 0,
        totalElements: result.data?.totalElements || 0,
        totalPages: result.data?.totalPages || 0,
        hasNext: result.data?.hasNext || false,
        items: result.data?.items || [],
      };
    } else {
      console.error("Failed to get deleted recipes:", result.message);
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
    console.error("Error getting deleted recipes:", error);
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

export type { CookedHistoryItem, PaginatedCookedHistoryResponse };
