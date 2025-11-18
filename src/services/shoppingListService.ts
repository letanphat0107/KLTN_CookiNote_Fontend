// src/services/shoppingListService.ts
import { API_CONFIG } from "../config/api";
import { fetchWithAuth } from "../utils/apiHelper";

interface ShoppingListItem {
  id: number;
  ingredient: string;
  quantity: string;
  checked: boolean;
  isFromRecipe: boolean;
}

interface ShoppingListGroup {
  recipeId: number | null;
  recipeTitle: string;
  recipeImageUrl: string | null;
  isRecipeDeleted: boolean | null;
  items: ShoppingListItem[];
}

interface ShoppingListResponse {
  groups: ShoppingListGroup[];
  totalItems: number;
}

interface AddItemRequest {
  ingredient: string;
  quantity: string;
}

// Get shopping list
export const getShoppingList = async (): Promise<ShoppingListResponse> => {
  try {
    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/shopping-lists`,
      {
        method: "GET",
      }
    );

    const result = await response.json();
    console.log("API response:", result);

    if (response.ok && result.code === 200) {
      const groups = result.data || [];
      const totalItems = groups.reduce(
        (total: number, group: ShoppingListGroup) => {
          return total + (group.items?.length || 0);
        },
        0
      );

      return {
        groups,
        totalItems,
      };
    } else {
      console.error("Failed to get shopping list:", result.message);
      return { groups: [], totalItems: 0 };
    }
  } catch (error) {
    console.error("Error getting shopping list:", error);
    return { groups: [], totalItems: 0 };
  }
};

// Add item to shopping list
export const addShoppingListItem = async (
  item: AddItemRequest
): Promise<boolean> => {
  try {
    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/shopping-lists/items`,
      {
        method: "POST",
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

// Remove shopping list items by IDs
export const removeShoppingListItem = async (
  itemIds: number[]
): Promise<boolean> => {
  try {
    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/shopping-lists/items-by-ids`,
      {
        method: "DELETE",
        body: JSON.stringify({ itemIds }),
      }
    );

    const result = await response.json();

    if (response.ok && result.code === 200) {
      return true;
    } else {
      console.error("Failed to remove shopping list items:", result.message);
      return false;
    }
  } catch (error) {
    console.error("Error removing shopping list items:", error);
    return false;
  }
};

// Toggle item checked status
export const toggleShoppingListItemCheck = async (
  itemId: number,
  checked: boolean
): Promise<boolean> => {
  try {
    console.log(`Toggling item ${itemId} check status to:`, checked);

    // Use different endpoints for check and uncheck
    const endpoint = checked
      ? `${API_CONFIG.BASE_URL}/cookinote/shopping-lists/items/${itemId}/check`
      : `${API_CONFIG.BASE_URL}/cookinote/shopping-lists/items/${itemId}/uncheck`;

    const response = await fetchWithAuth(endpoint, {
      method: "PATCH",
    });

    const result = await response.json();
    console.log("Toggle check response:", result);

    if (response.ok && result.code === 200) {
      return true;
    } else {
      console.error("Failed to toggle item check:", result.message);
      return false;
    }
  } catch (error) {
    console.error("Error toggling item check:", error);
    return false;
  }
};

// Move item to another group/recipe
export const moveShoppingListItem = async (
  itemId: number,
  targetRecipeId: number
): Promise<boolean> => {
  try {
    console.log(`Moving item ${itemId} to recipe ${targetRecipeId}`);

    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/shopping-lists/items/${itemId}/move`,
      {
        method: "PATCH",
        body: JSON.stringify({ targetRecipeId }),
      }
    );

    const result = await response.json();
    console.log("Move item response:", result);

    if (response.ok && result.code === 200) {
      return true;
    } else {
      console.error("Failed to move item:", result.message);
      return false;
    }
  } catch (error) {
    console.error("Error moving item:", error);
    return false;
  }
};

// Remove items by filter (recipe)
export const removeShoppingListItemsByRecipe = async (
  recipeId: number
): Promise<boolean> => {
  try {
    console.log(`Removing items for recipe ${recipeId}`);

    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/shopping-lists/items-by-filter?filter=recipe&recipeId=${recipeId}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();
    console.log("Remove by recipe response:", result);

    if (response.ok && result.code === 200) {
      return true;
    } else {
      console.error("Failed to remove items by recipe:", result.message);
      return false;
    }
  } catch (error) {
    console.error("Error removing items by recipe:", error);
    return false;
  }
};

// Remove checked items
export const removeCheckedItems = async (): Promise<boolean> => {
  try {
    console.log("Removing all checked items");

    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/shopping-lists/items-by-filter?filter=checked`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();
    console.log("Remove checked items response:", result);

    if (response.ok && result.code === 200) {
      return true;
    } else {
      console.error("Failed to remove checked items:", result.message);
      return false;
    }
  } catch (error) {
    console.error("Error removing checked items:", error);
    return false;
  }
};
