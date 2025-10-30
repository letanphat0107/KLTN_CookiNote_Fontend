

import { API_CONFIG, buildApiUrl, createAuthHeaders } from "../config/api";

export interface AdminUser {
  userId: number;
  email: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  role: string;
  enabled: boolean;
  emailVerified: boolean;
  createdAt: string;
  recipeCount?: number;
  favoriteCount?: number;
}

export interface AdminUserDetail extends AdminUser {
  stats: {
    totalRecipes: number;
    totalFavorites: number;
    totalViews: number;
    lastLogin?: string;
  };
}

export interface PaginatedUsers {
  users: AdminUser[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface DashboardStats {
  totalUsers: number;
  totalRecipes: number;
  activeUsers: number;
  newUsersToday: number;
}

class AdminService {
  private getAuthHeader(accessToken: string) {
    return createAuthHeaders(accessToken);
  }

  // Get dashboard statistics
  async getDashboardStats(accessToken: string): Promise<DashboardStats> {
    try {
      const response = await fetch(
        buildApiUrl(API_CONFIG.ENDPOINTS.ADMIN.DASHBOARD),
        {
          method: "GET",
          headers: this.getAuthHeader(accessToken),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard stats");
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      throw error;
    }
  }

  // Get users list with pagination
  async getUsers(
    accessToken: string,
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

      const response = await fetch(
        `${buildApiUrl(API_CONFIG.ENDPOINTS.ADMIN.USERS)}?${params}`,
        {
          method: "GET",
          headers: this.getAuthHeader(accessToken),
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
  async getUserDetail(
    accessToken: string,
    userId: number
  ): Promise<AdminUserDetail> {
    try {
      const response = await fetch(
        buildApiUrl(`${API_CONFIG.ENDPOINTS.ADMIN.USERS}/${userId}`),
        {
          method: "GET",
          headers: this.getAuthHeader(accessToken),
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
  async disableUser(accessToken: string, userId: number): Promise<void> {
    try {
      const response = await fetch(
        buildApiUrl(`${API_CONFIG.ENDPOINTS.ADMIN.USERS}/${userId}/disable`),
        {
          method: "PATCH",
          headers: this.getAuthHeader(accessToken),
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
  async enableUser(accessToken: string, userId: number): Promise<void> {
    try {
      const response = await fetch(
        buildApiUrl(`${API_CONFIG.ENDPOINTS.ADMIN.USERS}/${userId}/enable`),
        {
          method: "PATCH",
          headers: this.getAuthHeader(accessToken),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to enable user");
      }
    } catch (error) {
      console.error("Error enabling user:", error);
      throw error;
    }
  }

  // Export user report
  async exportUserReport(
    accessToken: string,
    path: string = "/user-report"
  ): Promise<string> {
    try {
      const response = await fetch(
        buildApiUrl(`${API_CONFIG.ENDPOINTS.ADMIN.USERS}/export/recipes`),
        {
          method: "POST",
          headers: this.getAuthHeader(accessToken),
          body: JSON.stringify({ path }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to export report");
      }

      const data = await response.json();
      return data.data.filePath;
    } catch (error) {
      console.error("Error exporting report:", error);
      throw error;
    }
  }

  // Recipe Management Methods
  async getAdminRecipes(
    accessToken: string,
    page: number = 0,
    size: number = 10
  ) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });

      const response = await fetch(
        `${buildApiUrl(API_CONFIG.ENDPOINTS.ADMIN.RECIPES)}?${params}`,
        {
          method: "GET",
          headers: this.getAuthHeader(accessToken),
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

  async deleteRecipe(accessToken: string, recipeId: number): Promise<void> {
    try {
      const response = await fetch(
        buildApiUrl(`${API_CONFIG.ENDPOINTS.RECIPE.DELETE}/${recipeId}`),
        {
          method: "DELETE",
          headers: this.getAuthHeader(accessToken),
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
}

export default new AdminService();