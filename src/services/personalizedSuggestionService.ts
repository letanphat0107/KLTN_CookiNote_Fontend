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
}

export interface PersonalizedRecipeIngredient {
  name: string;
  quantity: string;
}

export interface PersonalizedRecipeStep {
  stepNo: number;
  content: string;
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

// Get personalized recipe suggestions
export const getPersonalizedRecipes = async (
  params: PersonalizedRecipeParams
): Promise<PersonalizedRecipe[]> => {
  try {
    console.log("Getting personalized recipes with params:", params);

    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/recipes/suggest-personalized`,
      {
        method: "POST",
        body: JSON.stringify(params),
      }
    );

    const result: PersonalizedRecipeResponse = await response.json();
    console.log("Personalized recipes response:", result);

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