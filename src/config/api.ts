// src/config/api.ts
export const API_CONFIG = {
  BASE_URL: "http://192.168.1.8:8386",
  ENDPOINTS: {
    AUTH: {
      REGISTER: "/cookinote/auth/register",
      VERIFY_OTP: "/cookinote/auth/verify-otp",
      RESEND_OTP: "/cookinote/auth/resend-otp",
      LOGIN: "/cookinote/auth/login",
      LOGOUT: "/cookinote/auth/logout",
      REFRESH: "/cookinote/auth/refresh",
    },
    USER: {
      ME: "/cookinote/user/me",
      CHANGE_PASSWORD: "/cookinote/user/password",
      PROFILE: "/cookinote/user/profile",
      UPDATE_PROFILE: "/cookinote/user/profile",
      UPDATE_DISPLAY_NAME: "/cookinote/user/display-name", 
      CHANGE_AVATAR: "/cookinote/user/avatar", 
      EMAIL_CHANGE_REQUEST: "/cookinote/user/email-change-request", 
      EMAIL_RESEND_OTP: "/cookinote/user/email-resend-otp", 
      EMAIL_VERIFY_CHANGE: "/cookinote/user/email-verify-change", 
      UPLOAD_AVATAR: "/cookinote/user/avatar", 
    },
    RECIPE: {
      LIST: "/cookinote/recipes",
      DETAIL: "/cookinote/recipes",
      CREATE: "/cookinote/recipes",
      UPDATE: "/cookinote/recipes",
      DELETE: "/cookinote/recipes",
      SEARCH: "/cookinote/recipes/search",
      FAVORITE: "/cookinote/recipes/favorite",
      ADD_FAVORITE: "/cookinote/recipes/{id}/favorite",
      REMOVE_FAVORITE: "/cookinote/recipes/{id}/favorite",
    },
    ADMIN: {
      DASHBOARD: "/cookinote/admin/dashboard",
      USERS: "/cookinote/admin/users",
      RECIPES: "/cookinote/admin/recipes",
      CATEGORIES: "/cookinote/admin/categories",
    },
    CATEGORY: {
      LIST: "/cookinote/categories",
      CREATE: "/cookinote/categories/create",
      UPDATE: "/cookinote/categories",
      SEARCH: "/cookinote/categories/search",
      CHANGECATEGORY: "cookinote/categories/move-recipes",
    },
    UPLOAD: {
      IMAGE: "/cookinote/upload/image",
      IMAGES: "/cookinote/upload/images",
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

// Helper function to create FormData headers (for file uploads)
export const createFormDataHeaders = (
  accessToken?: string,
  additionalHeaders?: Record<string, string>
) => {
  const headers: Record<string, string> = {
    Accept: "application/json",
    // Don't set Content-Type for FormData, browser will set it with boundary
  };

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
  UPDATE_DISPLAY_NAME: buildApiUrl(
    API_CONFIG.ENDPOINTS.USER.UPDATE_DISPLAY_NAME
  ),
  CHANGE_AVATAR: buildApiUrl(API_CONFIG.ENDPOINTS.USER.CHANGE_AVATAR),
  EMAIL_CHANGE_REQUEST: buildApiUrl(
    API_CONFIG.ENDPOINTS.USER.EMAIL_CHANGE_REQUEST
  ),
  EMAIL_RESEND_OTP: buildApiUrl(API_CONFIG.ENDPOINTS.USER.EMAIL_RESEND_OTP),
  EMAIL_VERIFY_CHANGE: buildApiUrl(
    API_CONFIG.ENDPOINTS.USER.EMAIL_VERIFY_CHANGE
  ),
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
