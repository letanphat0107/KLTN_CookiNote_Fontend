// src/services/shoppingListService.ts
import { API_CONFIG } from "../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Helper function to get access token
const getAccessToken = async (): Promise<string | null> => {
  try {
    const tokens = await AsyncStorage.getItem("auth_tokens");
    if (tokens) {
      const parsedTokens = JSON.parse(tokens);
      return parsedTokens.accessToken;
    }
    return null;
  } catch (error) {
    console.error("Error getting access token:", error);
    return null;
  }
};

// Helper function to create auth headers
const createAuthHeaders = async (): Promise<Record<string, string>> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const accessToken = await getAccessToken();
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return headers;
};

interface ShoppingListItem {
  id: number;
  ingredient: string;
  quantity: string;
  isCompleted?: boolean;
}

interface AddItemRequest {
  ingredient: string;
  quantity: string;
}

// Get shopping list
export const getShoppingList = async (): Promise<ShoppingListItem[]> => {
  try {
    const headers = await createAuthHeaders();
    const response = await fetch(
      `${API_CONFIG.BASE_URL}/cookinote/shopping-lists`,
      {
        method: "GET",
        headers,
        
      }
    );

    const result = await response.json();

    if (response.ok && result.code === 200) {
      return result.data?.items || [];
    } else {
      console.error("Failed to get shopping list:", result.message);
      return [];
    }
  } catch (error) {
    console.error("Error getting shopping list:", error);
    return [];
  }
};

// Add item to shopping list
export const addShoppingListItem = async (
  item: AddItemRequest
): Promise<boolean> => {
  try {
    const headers = await createAuthHeaders();
    const response = await fetch(
      `${API_CONFIG.BASE_URL}/cookinote/shopping-lists/items`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(item),
        
      }
    );

    const result = await response.json();

    if (response.ok && result.code === 200) {
      return true;
    } else {
      console.error("Failed to add shopping list item:", result.message);
      return false;
    }
  } catch (error) {
    console.error("Error adding shopping list item:", error);
    return false;
  }
};

// Remove item from shopping list
export const removeShoppingListItem = async (
  itemId: number
): Promise<boolean> => {
  try {
    const headers = await createAuthHeaders();
    const response = await fetch(
      `${API_CONFIG.BASE_URL}/cookinote/shopping-lists/items/${itemId}`,
      {
        method: "DELETE",
        headers,
        
      }
    );

    const result = await response.json();

    if (response.ok && result.code === 200) {
      return true;
    } else {
      console.error("Failed to remove shopping list item:", result.message);
      return false;
    }
  } catch (error) {
    console.error("Error removing shopping list item:", error);
    return false;
  }
};
