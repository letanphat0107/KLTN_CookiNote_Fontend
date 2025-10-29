// API Response types
import { User } from "./user";
import {
  Recipe,
  Category,
  RecipeIngredient,
  RecipeStep,
  DailyMenu,
  WeeklyMenu,
} from "./recipe";
import { ApiResponse, PaginatedResponse } from "./common";

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

// Request types
export interface CreateRecipeRequest {
  title: string;
  description: string;
  image_url?: string;
  prepare_time: number;
  cook_time: number;
  difficulty: string;
  category_id: number;
  ingredients: {
    name: string;
    quantity: string;
  }[];
  steps: {
    content: string;
    image_url?: string;
    step_no: number;
  }[];
}

export interface UpdateRecipeRequest extends Partial<CreateRecipeRequest> {
  id: number;
}

export interface AddToFavoriteRequest {
  recipe_id: number;
}

export interface CreateShoppingListRequest {
  ingredient: string;
  quantity: string;
  recipe_id: number;
}

export interface ShareRecipeRequest {
  recipe_id: number;
}

export interface CreateMenuRequest {
  meal_type: string;
  note?: string;
  recipe_id: number;
  // For daily menu
  created_at?: string;
  // For weekly menu
  day_of_week?: number;
  week?: number;
}

// Extended types with relationships
export interface RecipeWithDetails extends Recipe {
  category: Category;
  user: User;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  isFavorited?: boolean;
  favoritesCount?: number;
  sharesCount?: number;
}

export interface MenuWithRecipe {
  menu: DailyMenu | WeeklyMenu;
  recipe: RecipeWithDetails;
}

export interface UserProfile extends User {
  recipesCount: number;
  favoritesCount: number;
  createdRecipes?: Recipe[];
  favoriteRecipes?: Recipe[];
}

// Search and filter types
export interface RecipeSearchParams {
  query?: string;
  category_id?: number;
  difficulty?: string;
  max_cook_time?: number;
  max_prepare_time?: number;
  user_id?: number;
  page?: number;
  limit?: number;
  sort_by?: "created_at" | "view" | "title";
  sort_order?: "asc" | "desc";
}

export interface MenuParams {
  week?: number;
  day_of_week?: number;
  meal_type?: string;
  date?: string;
}
