// src/services/categoryService.ts
import { fetchWithAuth } from "../utils/apiUtils";
import { API_URLS, buildApiUrl, API_CONFIG } from "../config/api";
import { Category } from "../types/recipe";

export interface CategoryResponse {
  code: number;
  message: string;
  data: Category[];
}

export interface CategoryCreateRequest {
  name: string;
  description: string;
  imageUrl?: string;
}

export interface CategoryUpdateRequest {
  id: number;
  name?: string;
  description?: string;
  imageUrl?: string;
}

export interface MoveCategoryRequest {
  fromCategoryId: number;
  toCategoryId: number;
}

// Get all categories (public access)
export const getCategories = async (): Promise<Category[]> => {
  try {
    console.log("Fetching categories...");

    const response = await fetch(API_URLS.CATEGORIES, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const result: CategoryResponse = await response.json();

    if (response.ok && result.code === 200) {
      return result.data || [];
    } else {
      console.error("Failed to fetch categories:", result.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// Search categories (public access)
export const searchCategories = async (query: string): Promise<Category[]> => {
  try {
    const searchUrl = `${buildApiUrl(
      API_CONFIG.ENDPOINTS.CATEGORY.SEARCH
    )}?q=${encodeURIComponent(query)}`;

    const response = await fetch(searchUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const result: CategoryResponse = await response.json();

    if (response.ok && result.code === 200) {
      return result.data || [];
    } else {
      console.error("Failed to search categories:", result.message);
      return [];
    }
  } catch (error) {
    console.error("Error searching categories:", error);
    return [];
  }
};

// Admin only functions - require authentication and ADMIN role

// Create category (ADMIN only)
export const createCategory = async (
  categoryData: CategoryCreateRequest
): Promise<boolean> => {
  try {
    console.log("Creating category:", categoryData);

    const response = await fetchWithAuth(
      buildApiUrl(API_CONFIG.ENDPOINTS.CATEGORY.CREATE),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      }
    );

    const result = await response.json();
    console.log("Create category response:", result);

    if (response.ok && result.code === 200) {
      return true;
    } else {
      console.error("Failed to create category:", result.message);
      return false;
    }
  } catch (error) {
    console.error("Error creating category:", error);
    return false;
  }
};

// Update category (ADMIN only)
export const updateCategory = async (
  categoryData: CategoryUpdateRequest
): Promise<boolean> => {
  try {
    console.log("Updating category:", categoryData);

    const updateUrl = buildApiUrl(API_CONFIG.ENDPOINTS.CATEGORY.UPDATE, {
      id: categoryData.id,
    });

    const response = await fetchWithAuth(updateUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });

    const result = await response.json();
    console.log("Update category response:", result);

    if (response.ok && result.code === 200) {
      return true;
    } else {
      console.error("Failed to update category:", result.message);
      return false;
    }
  } catch (error) {
    console.error("Error updating category:", error);
    return false;
  }
};

// Move recipes between categories (ADMIN only)
export const moveRecipesBetweenCategories = async (
  moveData: MoveCategoryRequest
): Promise<boolean> => {
  try {
    console.log("Moving recipes between categories:", moveData);

    const response = await fetchWithAuth(
      buildApiUrl(API_CONFIG.ENDPOINTS.CATEGORY.CHANGECATEGORY),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(moveData),
      }
    );

    const result = await response.json();
    console.log("Move categories response:", result);

    if (response.ok && result.code === 200) {
      return true;
    } else {
      console.error("Failed to move categories:", result.message);
      return false;
    }
  } catch (error) {
    console.error("Error moving categories:", error);
    return false;
  }
};

// Delete category (ADMIN only)
export const deleteCategory = async (categoryId: number): Promise<boolean> => {
  try {
    console.log("Deleting category:", categoryId);

    const deleteUrl = buildApiUrl(API_CONFIG.ENDPOINTS.CATEGORY.UPDATE, {
      id: categoryId,
    });

    const response = await fetchWithAuth(deleteUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    console.log("Delete category response:", result);

    if (response.ok && result.code === 200) {
      return true;
    } else {
      console.error("Failed to delete category:", result.message);
      return false;
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    return false;
  }
};
