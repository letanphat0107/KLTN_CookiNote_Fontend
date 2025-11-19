// src/services/shareService.ts
import { API_CONFIG } from "../config/api";
import { fetchWithAuth } from "../utils/apiHelper";
import { RecipeWithDetails } from "../types/recipe";

export interface ShareRecipeResponse {
  shareCode: string;
  shareUrl: string;
  qrCodeBase64: string;
}

// Share recipe and get QR code
export const shareRecipe = async (
  recipeId: number
): Promise<ShareRecipeResponse | null> => {
  try {
    console.log("Sharing recipe:", recipeId);

    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/recipes/${recipeId}/share`,
      {
        method: "POST",
      },
      true,
      false
    );

    const result = await response.json();
    console.log("Share recipe response:", result);

    if (response.ok && result.code === 200) {
      return result.data;
    } else {
      console.error("Failed to share recipe:", result.message);
      return null;
    }
  } catch (error) {
    console.error("Error sharing recipe:", error);
    return null;
  }
};

// Get shared recipe by share code
export const getSharedRecipe = async (
  shareCode: string
): Promise<RecipeWithDetails | null> => {
  try {
    console.log("Getting shared recipe with code:", shareCode);

    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/recipes/shared/${shareCode}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const result = await response.json();
    console.log("Get shared recipe response:", result);

    if (response.ok && result.code === 200) {
      return result.data;
    } else {
      console.error("Failed to get shared recipe:", result.message);
      return null;
    }
  } catch (error) {
    console.error("Error getting shared recipe:", error);
    return null;
  }
};
