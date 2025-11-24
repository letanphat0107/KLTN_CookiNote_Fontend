// src/services/aiChatService.ts
import { API_CONFIG } from "../config/api";
import { fetchWithAuth } from "../utils/apiHelper";

interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
}

// Send message to AI
export const sendAIChatMessage = async (message: string): Promise<string> => {
  try {
    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/ai/chat`,
      {
        method: "POST",
        body: JSON.stringify({ message }),
      }
    );

    const result = await response.json();

    if (response.ok && result.code === 200) {
      // Return the answer from data object
      return (
        result.data?.answer || "Xin lỗi, tôi không thể trả lời câu hỏi này."
      );
    } else {
      console.error("Failed to send AI chat message:", result.message);
      return "Xin lỗi, đã xảy ra lỗi khi xử lý câu hỏi của bạn.";
    }
  } catch (error) {
    console.error("Error sending AI chat message:", error);
    return "Xin lỗi, không thể kết nối đến AI. Vui lòng thử lại sau.";
  }
};

// Get chat history
export const getChatHistory = async (): Promise<ChatMessage[]> => {
  try {
    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/ai/chat/history`,
      {
        method: "GET",
      }
    );

    const result = await response.json();

    if (response.ok && result.code === 200) {
      return result.data?.messages || [];
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

// Recipe Suggestion interfaces
interface RecipeSuggestion {
  recipe: {
    id: number;
    title: string;
    imageUrl: string;
    ownerName: string;
    createdAt: string;
    difficulty: string;
    view: number;
    prepareTime: number;
    cookTime: number;
    deleted: boolean;
  };
  mainIngredientMatchScore: number;
  overallMatchScore: number;
  justification: string;
}

interface RecipeSuggestionResponse {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  items: RecipeSuggestion[];
}

// Get recipe suggestions based on available ingredients
export const getRecipeSuggestions = async (
  ingredientNames: string[]
): Promise<RecipeSuggestionResponse> => {
  try {
    console.log("Getting recipe suggestions for ingredients:", ingredientNames);

    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/shopping-lists/suggest-recipes`,
      {
        method: "POST",
        body: JSON.stringify({ ingredientNames }),
      }
    );

    const result = await response.json();
    console.log("Recipe suggestions response:", result);

    if (response.ok && result.code === 200) {
      return result.data;
    } else {
      console.error("Failed to get recipe suggestions:", result.message);
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
    console.error("Error getting recipe suggestions:", error);
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

// AI Generated Recipe interfaces
interface AIGeneratedRecipe {
  title: string;
  description: string;
  prepareTime: number;
  cookTime: number;
  difficulty: string;
  ingredients: Array<{
    name: string;
    quantity: string;
  }>;
  steps: Array<{
    stepNo: number;
    content: string;
    suggestedTime: number | null;
    tips: string | null;
  }>;
}

interface GenerateRecipeResponse {
  code: number;
  message: string;
  data: AIGeneratedRecipe;
  timestamp: string;
  path: string;
}

// Generate recipe from AI
export const generateRecipe = async (
  dishName: string
): Promise<AIGeneratedRecipe | null> => {
  try {
    console.log("Generating recipe for:", dishName);

    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/ai/generate-recipe`,
      {
        method: "POST",
        body: JSON.stringify({ dishName }),
      }
    );

    const result: GenerateRecipeResponse = await response.json();
    console.log("Generate recipe response:", result);

    if (response.ok && result.code === 200) {
      return result.data;
    } else {
      console.error("Failed to generate recipe:", result.message);
      return null;
    }
  } catch (error) {
    console.error("Error generating recipe:", error);
    return null;
  }
};

export const saveAIRecipe = async (
  recipe: AIGeneratedRecipe,
  isAdmin: boolean = false
): Promise<{ success: boolean; recipeId?: number; message?: string }> => {
  try {
    console.log("Saving AI recipe:", recipe);

    const categoryId = 5;

    const recipeData = {
      categoryId: categoryId,
      title: `AI: ${recipe.title}`,
      description: recipe.description,
      prepareTime: recipe.prepareTime,
      cookTime: recipe.cookTime,
      difficulty: recipe.difficulty.toUpperCase(),
      privacy: isAdmin ? "PUBLIC" : "PRIVATE",
      ingredients: recipe.ingredients.map((ing) => ({
        name: ing.name,
        quantity: ing.quantity,
      })),
      steps: recipe.steps.map((step) => ({
        stepNo: step.stepNo,
        content: step.content,
        suggestedTime: step.suggestedTime || 0,
        tips: step.tips || undefined,
      })),
    };

    console.log("Recipe data to save:", recipeData);

    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/recipes`,
      {
        method: "POST",
        body: JSON.stringify(recipeData),
      },
      true,
      false // JSON request
    );

    const result = await response.json();
    console.log("Save AI recipe response:", result);

    if (response.ok && result.code === 200) {
      return {
        success: true,
        recipeId: result.data?.id,
        message: "Đã lưu công thức thành công!",
      };
    } else {
      console.error("Failed to save AI recipe:", result.message);
      return {
        success: false,
        message: result.message || "Không thể lưu công thức",
      };
    }
  } catch (error) {
    console.error("Error saving AI recipe:", error);
    return {
      success: false,
      message: "Đã xảy ra lỗi khi lưu công thức",
    };
  }
};

// Export interfaces
export type {
  ChatMessage,
  RecipeSuggestion,
  RecipeSuggestionResponse,
  AIGeneratedRecipe,
  GenerateRecipeResponse,
};
