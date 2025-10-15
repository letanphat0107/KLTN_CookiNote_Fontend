// src/config/api.ts
export const API_CONFIG = {
  BASE_URL: "http://192.168.60.110:8386",
  ENDPOINTS: {
    AUTH: {
      REGISTER: "/cookinote/auth/register",
      VERIFY_OTP: "/cookinote/auth/verify-otp",
      RESEND_OTP: "/cookinote/auth/resend-otp",
      LOGIN: "/cookinote/auth/login",
      LOGOUT: "/cookinote/auth/logout",
      REFRESH: "/cookinote/auth/refresh", // Refresh token API
    },
    USER: {
      ME: "/cookinote/user/me", // Validate token and get user info
      CHANGE_PASSWORD: "/cookinote/user/password", // Change password
      PROFILE: "/cookinote/user/profile", // User profile
      UPDATE_PROFILE: "/cookinote/user/profile", // Update profile
      UPLOAD_AVATAR: "/cookinote/user/avatar", // Upload avatar
    },
    RECIPE: {
      LIST: "/cookinote/recipes", // Get recipes list
      DETAIL: "/cookinote/recipes", // Get recipe detail (+ /{id})
      CREATE: "/cookinote/recipes", // Create new recipe
      UPDATE: "/cookinote/recipes", // Update recipe (+ /{id})
      DELETE: "/cookinote/recipes", // Delete recipe (+ /{id})
      SEARCH: "/cookinote/recipes/search", // Search recipes
      FAVORITE: "/cookinote/recipes/favorite", // User's favorite recipes
      ADD_FAVORITE: "/cookinote/recipes/{id}/favorite", // Add to favorite
      REMOVE_FAVORITE: "/cookinote/recipes/{id}/favorite", // Remove from favorite
    },
    ADMIN: {
      DASHBOARD: "/cookinote/admin/dashboard", // Admin dashboard stats
      USERS: "/cookinote/admin/users", // Manage users
      RECIPES: "/cookinote/admin/recipes", // Manage recipes
      CATEGORIES: "/cookinote/admin/categories", // Manage categories
    },
    CATEGORY: {
      LIST: "/cookinote/categories", // Get categories
      CREATE: "/cookinote/categories", // Create category
      UPDATE: "/cookinote/categories", // Update category (+ /{id})
      DELETE: "/cookinote/categories", // Delete category (+ /{id})
    },
    UPLOAD: {
      IMAGE: "/cookinote/upload/image", // Upload single image
      IMAGES: "/cookinote/upload/images", // Upload multiple images
    },
  },
};

export const API_HEADERS: Record<string, string> = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// Helper functions to build URLs
export const buildApiUrl = (
  endpoint: string,
  params?: Record<string, string | number>
) => {
  let url = `${API_CONFIG.BASE_URL}${endpoint}`;

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`{${key}}`, String(value));
    });
  }

  return url;
};

// Helper function to create headers with auth
export const createAuthHeaders = (
  accessToken?: string,
  additionalHeaders?: Record<string, string>
) => {
  const headers = { ...API_HEADERS };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  if (additionalHeaders) {
    Object.assign(headers, additionalHeaders);
  }

  return headers;
};

// Specific API URLs (for convenience)
export const API_URLS = {
  // Auth
  LOGIN: buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.LOGIN),
  REGISTER: buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.REGISTER),
  LOGOUT: buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.LOGOUT),
  REFRESH_TOKEN: buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.REFRESH),
  VERIFY_OTP: buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.VERIFY_OTP),
  RESEND_OTP: buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.RESEND_OTP),

  // User
  USER_ME: buildApiUrl(API_CONFIG.ENDPOINTS.USER.ME),
  CHANGE_PASSWORD: buildApiUrl(API_CONFIG.ENDPOINTS.USER.CHANGE_PASSWORD),
  USER_PROFILE: buildApiUrl(API_CONFIG.ENDPOINTS.USER.PROFILE),
  UPLOAD_AVATAR: buildApiUrl(API_CONFIG.ENDPOINTS.USER.UPLOAD_AVATAR),

  // Recipe
  RECIPES: buildApiUrl(API_CONFIG.ENDPOINTS.RECIPE.LIST),
  SEARCH_RECIPES: buildApiUrl(API_CONFIG.ENDPOINTS.RECIPE.SEARCH),
  FAVORITE_RECIPES: buildApiUrl(API_CONFIG.ENDPOINTS.RECIPE.FAVORITE),

  // Category
  CATEGORIES: buildApiUrl(API_CONFIG.ENDPOINTS.CATEGORY.LIST),

  // Upload
  UPLOAD_IMAGE: buildApiUrl(API_CONFIG.ENDPOINTS.UPLOAD.IMAGE),
  UPLOAD_IMAGES: buildApiUrl(API_CONFIG.ENDPOINTS.UPLOAD.IMAGES),
};

// API Helper functions
export const getRecipeDetailUrl = (recipeId: string | number) =>
  buildApiUrl(API_CONFIG.ENDPOINTS.RECIPE.DETAIL, { id: recipeId });

export const getRecipeFavoriteUrl = (recipeId: string | number) =>
  buildApiUrl(API_CONFIG.ENDPOINTS.RECIPE.ADD_FAVORITE, { id: recipeId });

export const getCategoryUrl = (categoryId: string | number) =>
  buildApiUrl(API_CONFIG.ENDPOINTS.CATEGORY.UPDATE, { id: categoryId });

export const getUserUrl = (userId: string | number) =>
  buildApiUrl(API_CONFIG.ENDPOINTS.ADMIN.USERS, { id: userId });
