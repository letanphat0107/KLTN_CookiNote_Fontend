// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Common utility types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Navigation types (to be extended based on navigation structure)
export type RootStackParamList = {
  Home: undefined;
  RecipeDetail: { recipeId: string };
  TodaySuggest: undefined;
  WeeklySuggest: undefined;
};
