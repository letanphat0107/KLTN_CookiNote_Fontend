// src/services/recipeActionService.ts
import { API_CONFIG } from "../config/api";
import { fetchWithAuth } from "../utils/apiHelper";

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

interface ForkSuggestResponse {
  code: number;
  message: string;
  data: {
    categoryId: number;
    title: string;
    description: string;
    prepareTime: number;
    cookTime: number;
    difficulty: "EASY" | "MEDIUM" | "HARD";
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
  };
  timestamp: string;
  path: string;
}

// Add recipe ingredients to shopping list
export const addRecipeToShoppingList = async (
  recipeId: number
): Promise<boolean> => {
  try {
    console.log("Adding recipe to shopping list:", recipeId);

    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/shopping-lists/recipes/${recipeId}`,
      {
        method: "POST",
      }
    );

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

    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/recipes/${recipeId}/fork`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    console.log("Fork recipe response:", result);

    if (response.ok && result.code === 200) {
      return true;
    } else {
      // Cannot fork your own recipe
      return false;
    }
  } catch (error) {
    console.error("Error forking recipe:", error);
    return false;
  }
};

// Fork recipe with AI suggestions
export const forkRecipeWithSuggestion = async (
  recipeId: number,
  modificationRequest: string
): Promise<ForkRecipeData | null> => {
  try {
    console.log("Fork recipe with suggestion:", recipeId, modificationRequest);

    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/recipes/${recipeId}/fork-suggest`,
      {
        method: "POST",
        body: JSON.stringify({ modificationRequest }),
      }
    );

    const result: ForkSuggestResponse = await response.json();
    console.log("Fork recipe with suggestion response:", result);

    if (response.ok && result.code === 200) {
      return {
        categoryId: result.data.categoryId,
        title: result.data.title,
        description: result.data.description,
        prepareTime: result.data.prepareTime,
        cookTime: result.data.cookTime,
        difficulty: result.data.difficulty,
        privacy: "PRIVATE", // Default to private
        ingredients: result.data.ingredients,
        steps: result.data.steps,
      };
    } else {
      console.error("Failed to fork recipe with suggestion:", result.message);
      return null;
    }
  } catch (error) {
    console.error("Error forking recipe with suggestion:", error);
    return null;
  }
};

export type { ForkRecipeData };
