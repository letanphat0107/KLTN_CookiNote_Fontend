import { API_CONFIG, buildApiUrl } from "../config/api";
import { fetchWithAuth } from "../utils/apiHelper";

export interface AdminUser {
  userId: number;
  username: string;
  email: string;
  avatarUrl?: string;
  displayName: string;
  role: string;
  enabled: boolean;
  emailVerified: boolean;
  createdAt: string;
  recipeCount?: number;
  favoriteCount?: number;
}

export interface AdminUserDetail extends AdminUser {
  passwordChangedAt?: string;
  authProvider?: string;
}

export interface PaginatedUsers {
  items: AdminUser[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

export interface DashboardStats {
  totalUsers: number;
  totalRecipes: number;
  activeUsers: number;
  newUsersToday: number;
}

export interface CreateRecipeData {
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
    suggestedTime: number;
    tips?: string;
  }>;
}

export interface CreateRecipeResponse {
  id: number;
  title: string;
}

export interface UpdateRecipeData {
  categoryId: number;
  title: string;
  description: string;
  prepareTime: number;
  cookTime: number;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  privacy: "PUBLIC" | "PRIVATE";
  ingredients: Array<{
    id?: number;
    name: string;
    quantity: string;
  }>;
  steps: Array<{
    id?: number;
    stepNo: number;
    content: string;
    suggestedTime?: number;
    tips?: string;
  }>;
}

class AdminService {
  // Get dashboard statistics
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const response = await fetchWithAuth(
        buildApiUrl(API_CONFIG.ENDPOINTS.ADMIN.DASHBOARD),
        {
          method: "GET",
        },
        true,
        false
      );

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard stats");
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  }

  // Get users list with pagination
  async getUsers(
    page: number = 0,
    size: number = 10,
    search?: string,
    role?: string
  ): Promise<PaginatedUsers> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });

      if (search) params.append("search", search);
      if (role) params.append("role", role);

      const response = await fetchWithAuth(
        `${buildApiUrl(API_CONFIG.ENDPOINTS.ADMIN.USERS)}?${params}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  // Get user detail
  async getUserDetail(userId: number): Promise<AdminUserDetail> {
    try {
      const response = await fetchWithAuth(
        buildApiUrl(`${API_CONFIG.ENDPOINTS.ADMIN.USERS}/${userId}`),
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user detail");
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching user detail:", error);
      throw error;
    }
  }

  // Disable user account
  async disableUser(userId: number): Promise<void> {
    try {
      const response = await fetchWithAuth(
        buildApiUrl(`${API_CONFIG.ENDPOINTS.ADMIN.USERS}/${userId}/disable`),
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to disable user");
      }
    } catch (error) {
      console.error("Error disabling user:", error);
      throw error;
    }
  }

  // Enable user account
  async enableUser(
    userId: number
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await fetchWithAuth(
        buildApiUrl(`${API_CONFIG.ENDPOINTS.ADMIN.USERS}/${userId}/enable`),
        {
          method: "PATCH",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (
          response.status === 500 &&
          data.message?.includes("xác thực email")
        ) {
          return {
            success: false,
            message: data.message,
          };
        }
        throw new Error(data.message || "Failed to enable user");
      }

      return { success: true };
    } catch (error: any) {
      console.error("Error enabling user:", error);
      throw error;
    }
  }

  // Export user report
  async exportUserReport(path: string = "/user-report"): Promise<string> {
    try {
      const response = await fetchWithAuth(
        buildApiUrl(`${API_CONFIG.ENDPOINTS.ADMIN.REPORT}`),
        {
          method: "POST",
          body: JSON.stringify({ path }),
        }
      );

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Failed to export report" }));
        throw new Error(errorData.message || "Failed to export report");
      }

      const data = await response.json();
      return data.data.filePath;
    } catch (error) {
      console.error("Error exporting report:", error);
      throw error;
    }
  }

  // Recipe Management Methods
  async getAdminRecipes(page: number = 0, size: number = 10) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        deleted: "0",
      });

      const response = await fetchWithAuth(
        `${buildApiUrl(API_CONFIG.ENDPOINTS.ADMIN.RECIPES)}?${params}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      throw error;
    }
  }

  async deleteRecipe(recipeId: number): Promise<void> {
    try {
      const response = await fetchWithAuth(
        buildApiUrl(`${API_CONFIG.ENDPOINTS.RECIPE.DELETE}/${recipeId}`),
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete recipe");
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
      throw error;
    }
  }

  // Create new recipe
  async createRecipe(
    recipeData: CreateRecipeData,
    coverImageUri?: string,
    stepImages?: { stepNo: number; imageUris: string[] }[]
  ): Promise<CreateRecipeResponse> {
    try {
      const formData = new FormData();

      const recipeJson = JSON.stringify(recipeData);
      formData.append("recipe", recipeJson);

      if (coverImageUri) {
        const coverFilename = coverImageUri.split("/").pop() || "cover.jpg";
        const coverMatch = /\.(\w+)$/.exec(coverFilename);
        const coverType = coverMatch ? `image/${coverMatch[1]}` : "image/jpeg";

        formData.append("cover", {
          uri: coverImageUri,
          name: coverFilename,
          type: coverType,
        } as any);
      }

      if (stepImages && stepImages.length > 0) {
        stepImages.forEach((stepImage) => {
          if (stepImage.imageUris && stepImage.imageUris.length > 0) {
            stepImage.imageUris.forEach((uri) => {
              const filename =
                uri.split("/").pop() || `step_${stepImage.stepNo}.jpg`;
              const match = /\.(\w+)$/.exec(filename);
              const type = match ? `image/${match[1]}` : "image/jpeg";

              formData.append(`stepImages_${stepImage.stepNo}`, {
                uri: uri,
                name: filename,
                type: type,
              } as any);
            });
          }
        });
      }

      const response = await fetchWithAuth(
        buildApiUrl(API_CONFIG.ENDPOINTS.RECIPE.CREATE),
        {
          method: "POST",
          body: formData,
        },
        true,
        true
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create recipe");
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error creating recipe:", error);
      throw error;
    }
  }

  // For Edit Recipe Screen:
  // Cover image (Post & Put)
  async updateRecipeCover(
    recipeId: number,
    imageUri: string,
    method: "POST" | "PUT" = "PUT"
  ): Promise<void> {
    try {
      const formData = new FormData();
      const filename = imageUri.split("/").pop() || "cover.jpg";
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : "image/jpeg";

      formData.append("file", {
        uri: imageUri,
        name: filename,
        type: type,
      } as any);

      const response = await fetchWithAuth(
        buildApiUrl(`${API_CONFIG.ENDPOINTS.RECIPE.UPDATE}/${recipeId}/cover`),
        {
          method: method,
          body: formData,
        },
        true,
        true
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Failed to ${method === "POST" ? "add" : "update"} cover image`
        );
      }
    } catch (error) {
      console.error(
        `Error ${method === "POST" ? "adding" : "updating"} cover image:`,
        error
      );
      throw error;
    }
  }

  // Basic infor, include edit ingredients (Update)
  async updateRecipe(
    recipeId: number,
    recipeData: {
      categoryId: number;
      title: string;
      description: string;
      prepareTime: number;
      cookTime: number;
      difficulty: string;
      privacy: string;
      ingredients: Array<{ name: string; quantity: string }>;
    }
  ): Promise<void> {
    try {
      const response = await fetchWithAuth(
        buildApiUrl(`${API_CONFIG.ENDPOINTS.RECIPE.UPDATE}/${recipeId}`),
        {
          method: "PUT",
          body: JSON.stringify(recipeData),
        },
        true,
        false
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update recipe");
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
      throw error;
    }
  }

  // Ingredient: add one or more
  async addIngredients(
    recipeId: number,
    ingredients: Array<{ name: string; quantity: string }>
  ): Promise<Array<{ id: number; name: string; quantity: string }>> {
    try {
      const response = await fetchWithAuth(
        buildApiUrl(
          `${API_CONFIG.ENDPOINTS.RECIPE.UPDATE}/${recipeId}/ingredients`
        ),
        {
          method: "POST",
          body: JSON.stringify({ ingredients }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add ingredients");
      }

      const data = await response.json();
      return data.data; // Return array of added ingredients with IDs
    } catch (error) {
      console.error("Error adding ingredients:", error);
      throw error;
    }
  }

  // Ingredients: delete one or more
  async deleteIngredients(
    recipeId: number,
    ingredientIds: number[]
  ): Promise<void> {
    try {
      const response = await fetchWithAuth(
        buildApiUrl(
          `${API_CONFIG.ENDPOINTS.RECIPE.UPDATE}/${recipeId}/ingredients`
        ),
        {
          method: "DELETE",
          body: JSON.stringify({ ingredientIds }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete ingredients");
      }
    } catch (error) {
      console.error("Error deleting ingredients:", error);
      throw error;
    }
  }

  // Step: update all field
  async updateStep(
    recipeId: number,
    stepId: number,
    stepData: {
      content: string;
      stepNo: number;
      suggestedTime?: number;
      tips?: string;
      keepUrls?: string;
    },
    addImageUris?: string[]
  ): Promise<{
    id: number;
    stepNo: number;
    content: string;
    suggestedTime?: number;
    tips?: string;
    images: string[];
  }> {
    try {
      const formData = new FormData();

      formData.append("content", stepData.content);
      formData.append("stepNo", stepData.stepNo.toString());
      if (stepData.suggestedTime !== undefined) {
        formData.append("suggestedTime", stepData.suggestedTime.toString());
      }
      if (stepData.tips) {
        formData.append("tips", stepData.tips);
      }
      if (stepData.keepUrls) {
        formData.append("keepUrls", stepData.keepUrls);
      }

      if (addImageUris && addImageUris.length > 0) {
        addImageUris.forEach((uri) => {
          const filename = uri.split("/").pop() || "step_image.jpg";
          const match = /\.(\w+)$/.exec(filename);
          const type = match ? `image/${match[1]}` : "image/jpeg";

          formData.append("addFiles", {
            uri: uri,
            name: filename,
            type: type,
          } as any);
        });
      }

      const response = await fetchWithAuth(
        buildApiUrl(
          `${API_CONFIG.ENDPOINTS.RECIPE.UPDATE}/${recipeId}/steps/${stepId}`
        ),
        {
          method: "PUT",
          body: formData,
        },
        true,
        true
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update step");
      }

      const data = await response.json();
      return data.data; // Return updated step with all fields including images
    } catch (error) {
      console.error("Error updating step:", error);
      throw error;
    }
  }

  // Step: delete one or more
  async deleteSteps(recipeId: number, stepIds: number[]): Promise<void> {
    try {
      const response = await fetchWithAuth(
        buildApiUrl(`${API_CONFIG.ENDPOINTS.RECIPE.UPDATE}/${recipeId}/steps`),
        {
          method: "DELETE",
          body: JSON.stringify({ stepIds }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete steps");
      }
    } catch (error) {
      console.error("Error deleting steps:", error);
      throw error;
    }
  }

  // Add this method to the AdminService class in adminService.ts

async updateRecipeNutrition(
  recipeId: number,
  nutritionData: { calories?: number; servings?: number }
): Promise<void> {
  try {
    const response = await fetchWithAuth(
      buildApiUrl(`${API_CONFIG.ENDPOINTS.RECIPE.UPDATE}/${recipeId}/nutrition`),
      {
        method: "PATCH",
        body: JSON.stringify(nutritionData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update nutrition info");
    }
  } catch (error) {
    console.error("Error updating nutrition:", error);
    throw error;
  }
}

  // Step: add full field
  async addStep(
    recipeId: number,
    stepData: {
      content: string;
      suggestedTime?: number;
      tips?: string;
    },
    imageUris?: string[]
  ): Promise<
    Array<{
      id: number;
      stepNo: number;
      content: string;
      suggestedTime?: number;
      tips?: string;
      images: string[];
    }>
  > {
    try {
      const formData = new FormData();

      formData.append("content", stepData.content);
      if (stepData.suggestedTime) {
        formData.append("suggestedTime", stepData.suggestedTime.toString());
      }
      if (stepData.tips) {
        formData.append("tips", stepData.tips);
      }

      if (imageUris && imageUris.length > 0) {
        imageUris.forEach((uri) => {
          const filename = uri.split("/").pop() || "step_image.jpg";
          const match = /\.(\w+)$/.exec(filename);
          const type = match ? `image/${match[1]}` : "image/jpeg";

          formData.append("addFiles", {
            uri: uri,
            name: filename,
            type: type,
          } as any);
        });
      }

      const response = await fetchWithAuth(
        buildApiUrl(`${API_CONFIG.ENDPOINTS.RECIPE.UPDATE}/${recipeId}/steps`),
        {
          method: "POST",
          body: formData,
        },
        true,
        true
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add step");
      }

      const data = await response.json();
      return data.data; // Return array of all steps after adding
    } catch (error) {
      console.error("Error adding step:", error);
      throw error;
    }
  }

  // Step: reorder
  async reorderSteps(
    recipeId: number,
    steps: Array<{ stepId: number; newStepNo: number }>
  ): Promise<
    Array<{
      id: number;
      stepNo: number;
      content: string;
      suggestedTime?: number;
      tips?: string;
      images: string[];
    }>
  > {
    try {
      const response = await fetchWithAuth(
        buildApiUrl(
          `${API_CONFIG.ENDPOINTS.RECIPE.UPDATE}/${recipeId}/steps/reorder`
        ),
        {
          method: "PUT",
          body: JSON.stringify({ steps }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to reorder steps");
      }

      const data = await response.json();
      return data.data; // Return array of all steps with new order
    } catch (error) {
      console.error("Error reordering steps:", error);
      throw error;
    }
  }

  //For manage user
  async getUserRecipes(
    userId: number,
    page: number = 0,
    size: number = 12
  ): Promise<{
    items: any[];
    totalPages: number;
    totalElements: number;
    hasNext: boolean;
  }> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });

      const response = await fetchWithAuth(
        buildApiUrl(`/cookinote/recipes/users/${userId}?${params}`),
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user recipes");
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching user recipes:", error);
      throw error;
    }
  }
}

export default new AdminService();
