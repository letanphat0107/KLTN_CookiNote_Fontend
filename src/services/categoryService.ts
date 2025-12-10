// src/services/categoryService.ts
import { fetchWithAuth } from "../utils/apiHelper";
import { API_URLS, buildApiUrl, API_CONFIG } from "../config/api";
import { Category, Recipe } from "../types/recipe";

export interface CategoryResponse {
  code: number;
  message: string;
  data: Category[];
}

export interface SingleCategoryResponse {
  code: number;
  message: string;
  data: Category;
}

export interface MoveRecipesRequest {
  sourceCategoryId: number;
  destinationCategoryId: number;
  recipeIds: number[];
}

// Get all categories - PUBLIC, keep fetch
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

// Search categories - PUBLIC, keep fetch
export const searchCategories = async (
  categoryName: string
): Promise<Category[]> => {
  try {
    console.log("Searching categories:", categoryName);

    const searchUrl = `${
      API_CONFIG.BASE_URL
    }/cookinote/categories/search?categoryName=${encodeURIComponent(
      categoryName
    )}`;

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

// Create category - REQUIRES AUTH (already using fetchWithAuth)
export const createCategory = async (
  name: string,
  description: string,
  imageFile?: {
    uri: string;
    type: string;
    name: string;
  }
): Promise<{ success: boolean; message?: string; data?: Category }> => {
  try {
    console.log("Creating category:", {
      name,
      description,
      hasImage: !!imageFile,
    });

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    if (imageFile) {
      formData.append("image", {
        uri: imageFile.uri,
        type: imageFile.type || "image/jpeg",
        name: imageFile.name || "category-image.jpg",
      } as any);
    }

    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/categories/create`,
      {
        method: "POST",
        body: formData,
        headers: {
          // Don't set Content-Type, let browser set it with boundary for FormData
        },
      },
      true,
      true // multipart
    );

    const result = await response.json();
    console.log("Create category response:", result);

    if (response.ok && result.code === 200) {
      return {
        success: true,
        message: result.message || "Tạo danh mục thành công",
        data: result.data,
      };
    } else {
      return {
        success: false,
        message: result.message || "Không thể tạo danh mục",
      };
    }
  } catch (error) {
    console.error("Error creating category:", error);
    return {
      success: false,
      message: "Đã xảy ra lỗi khi tạo danh mục",
    };
  }
};

// Update category - REQUIRES AUTH (already using fetchWithAuth)
export const updateCategory = async (
  categoryId: number,
  name?: string,
  description?: string,
  imageFile?: {
    uri: string;
    type: string;
    name: string;
  }
): Promise<{ success: boolean; message?: string; data?: Category }> => {
  try {
    console.log("Updating category:", {
      categoryId,
      name,
      description,
      hasImage: !!imageFile,
    });

    const formData = new FormData();

    if (name) {
      formData.append("name", name);
    }
    if (description) {
      formData.append("description", description);
    }
    if (imageFile) {
      formData.append("image", {
        uri: imageFile.uri,
        type: imageFile.type || "image/jpeg",
        name: imageFile.name || "category-image.jpg",
      } as any);
    }

    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/categories/${categoryId}`,
      {
        method: "PUT",
        body: formData,
        headers: {
          // Don't set Content-Type for FormData
        },
      },
      true,
      true // multipart
    );

    const result = await response.json();
    console.log("Update category response:", result);

    if (response.ok && result.code === 200) {
      return {
        success: true,
        message: result.message || "Cập nhật danh mục thành công",
        data: result.data,
      };
    } else {
      return {
        success: false,
        message: result.message || "Không thể cập nhật danh mục",
      };
    }
  } catch (error) {
    console.error("Error updating category:", error);
    return {
      success: false,
      message: "Đã xảy ra lỗi khi cập nhật danh mục",
    };
  }
};

// Move recipes - REQUIRES AUTH (already using fetchWithAuth)
export const moveRecipesBetweenCategories = async (
  moveData: MoveRecipesRequest
): Promise<{ success: boolean; message?: string }> => {
  try {
    console.log("Moving recipes between categories:", moveData);

    const response = await fetchWithAuth(
      `${API_CONFIG.BASE_URL}/cookinote/categories/move-recipes`,
      {
        method: "POST",
        body: JSON.stringify(moveData),
      },
      true,
      false
    );

    const result = await response.json();
    console.log("Move recipes response:", result);

    if (response.ok && result.code === 200) {
      return {
        success: true,
        message: result.message || "Chuyển công thức thành công",
      };
    } else {
      return {
        success: false,
        message: result.message || "Không thể chuyển công thức",
      };
    }
  } catch (error) {
    console.error("Error moving recipes:", error);
    return {
      success: false,
      message: "Đã xảy ra lỗi khi chuyển công thức",
    };
  }
};

// Delete category - REQUIRES AUTH
export const deleteCategory = async (
  categoryId: number
): Promise<{ success: boolean; message?: string }> => {
  // Not implemented - API not available
  return {
    success: false,
    message: "Chức năng xóa danh mục chưa được hỗ trợ",
  };
};

// Get recipes by category - PUBLIC, keep fetch
export const getRecipesByCategory = async (
  categoryId: number,
  page: number = 0,
  size: number = 20,
  sort: string = "createdAt,desc"
): Promise<{
  items: Recipe[];
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
}> => {
  try {
    console.log("Fetching recipes for category:", categoryId);

    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      sort: sort,
    });

    const response = await fetch(
      `${API_CONFIG.BASE_URL}/cookinote/recipes/categories/${categoryId}?${params}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const result = await response.json();
    console.log("Get recipes by category response:", result);

    if (response.ok && result.code === 200) {
      return {
        items: result.data?.items || [],
        totalPages: result.data?.totalPages || 0,
        totalElements: result.data?.totalElements || 0,
        hasNext: result.data?.hasNext || false,
      };
    } else {
      return {
        items: [],
        totalPages: 0,
        totalElements: 0,
        hasNext: false,
      };
    }
  } catch (error) {
    console.error("Error fetching recipes by category:", error);
    return {
      items: [],
      totalPages: 0,
      totalElements: 0,
      hasNext: false,
    };
  }
};
