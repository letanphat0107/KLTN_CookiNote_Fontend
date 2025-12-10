// src/services/personalizedSuggestionService.ts
import { API_CONFIG } from "../config/api";
import { fetchWithAuth } from "../utils/apiHelper";

export interface PersonalizedRecipeParams {
  height: number;
  weight: number;
  age: number;
  gender: "MALE" | "FEMALE" | "OTHER";
  activityLevel: "SEDENTARY" | "LIGHT" | "MODERATE" | "ACTIVE" | "VERY_ACTIVE";
  servings: number;
  healthCondition?: string;
  dishCharacteristics?: string;
  mealType: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK";
  targetCalories?: number;
}

export interface PersonalizedRecipeIngredient {
  name: string;
  quantity: string;
}

export interface PersonalizedRecipeStep {
  stepNo: number;
  content: string;
  tips?: string;
  suggestedTime?: number;
}

export interface PersonalizedRecipe {
  originalRecipeId: number;
  title: string;
  description: string;
  imageUrl: string;
  prepareTime: number;
  cookTime: number;
  difficulty: string;
  calories: number;
  servings: number;
  ingredients: PersonalizedRecipeIngredient[];
  steps: PersonalizedRecipeStep[];
}

export interface PersonalizedRecipeResponse {
  code: number;
  message: string;
  data: PersonalizedRecipe[];
  timestamp: string;
  path: string;
}

export interface SavePersonalizedRecipeResponse {
  code: number;
  message: string;
  data?: {
    id: number;
  };
  timestamp: string;
  path: string;
}

export interface PersonalizedHistoryItem {
  request: PersonalizedRecipeParams;
  searchedAt: string;
}

export interface PersonalizedHistoryResponse {
  code: number;
  message: string;
  data: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
    items: PersonalizedHistoryItem[];
  };
  timestamp: string;
  path: string;
}

// Get personalized recipe suggestions
export const getPersonalizedRecipes = async (
  params: PersonalizedRecipeParams
): Promise<PersonalizedRecipe[]> => {
  try {
    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/recipes/suggest-personalized`,
      {
        method: "POST",
        body: JSON.stringify(params),
      }
    );

    const result: PersonalizedRecipeResponse = await response.json();

    if (response.ok && result.code === 200) {
      return result.data || [];
    } else {
      console.error("Failed to get personalized recipes:", result.message);
      return [];
    }
  } catch (error) {
    console.error("Error getting personalized recipes:", error);
    return [];
  }
};

// Get personalized history
export const getPersonalizedHistory = async (
  page: number = 0,
  size: number = 1
): Promise<PersonalizedRecipeParams | null> => {
  try {
    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/recipes/personalized-history?page=${page}&size=${size}`,
      {
        method: "GET",
      }
    );

    const result: PersonalizedHistoryResponse = await response.json();

    if (response.ok && result.code === 200 && result.data.items.length > 0) {
      // Return the most recent request
      return result.data.items[0].request;
    } else {
      console.log("No personalized history found");
      return null;
    }
  } catch (error) {
    console.error("Error getting personalized history:", error);
    return null;
  }
};

// Save personalized recipe
export const savePersonalizedRecipe = async (
  recipe: PersonalizedRecipe
): Promise<{ success: boolean; recipeId?: number; message?: string }> => {
  try {
    console.log("Saving personalized recipe:", recipe);

    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/recipes/save-personalized`,
      {
        method: "POST",
        body: JSON.stringify({
          originalRecipeId: recipe.originalRecipeId,
          title: recipe.title,
          description: recipe.description,
          imageUrl: recipe.imageUrl,
          prepareTime: recipe.prepareTime,
          cookTime: recipe.cookTime,
          difficulty: recipe.difficulty,
          calories: recipe.calories,
          servings: recipe.servings,
          ingredients: recipe.ingredients,
          steps: recipe.steps,
        }),
      }
    );

    const result: SavePersonalizedRecipeResponse = await response.json();

    if (response.ok && result.code === 200) {
      return {
        success: true,
        recipeId: result.data?.id,
        message: "Đã lưu công thức thành công!",
      };
    } else {
      console.error("Failed to save personalized recipe:", result.message);
      return {
        success: false,
        message: result.message || "Không thể lưu công thức",
      };
    }
  } catch (error) {
    console.error("Error saving personalized recipe:", error);
    return {
      success: false,
      message: "Đã xảy ra lỗi khi lưu công thức",
    };
  }
};

export const calculateBMI = (height: number, weight: number): number => {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return "Thiếu cân";
  if (bmi < 25) return "Bình thường";
  if (bmi < 30) return "Thừa cân";
  return "Béo phì";
};

export const calculateBMR = (
  weight: number,
  height: number,
  age: number,
  gender: string
): number => {
  // Mifflin-St Jeor Equation
  if (gender === "MALE") {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

export const calculateTDEE = (bmr: number, activityLevel: string): number => {
  const multipliers: { [key: string]: number } = {
    SEDENTARY: 1.2,
    LIGHT: 1.375,
    MODERATE: 1.55,
    ACTIVE: 1.725,
    VERY_ACTIVE: 1.9,
  };
  return bmr * (multipliers[activityLevel] || 1.55);
};
