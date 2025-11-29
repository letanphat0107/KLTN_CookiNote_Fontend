import { fetchWithAuth } from "../utils/apiHelper";
import { API_CONFIG } from "../config/api";

export interface RatingData {
  score: number;
}

export const rateRecipe = async (
  recipeId: number,
  score: number
): Promise<boolean> => {
  try {
    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/recipes/${recipeId}/ratings/me`,
      {
        method: "PUT",
        body: JSON.stringify({ score: score.toString() }),
      }
    );

    if (response.ok) {
      const result = await response.json();
      return result.code === 200;
    }
    return false;
  } catch (error) {
    console.error("Error rating recipe:", error);
    return false;
  }
};

export const deleteRating = async (recipeId: number): Promise<boolean> => {
  try {
    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/recipes/${recipeId}/ratings/me`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      const result = await response.json();
      return result.code === 200;
    }
    return false;
  } catch (error) {
    console.error("Error deleting rating:", error);
    return false;
  }
};