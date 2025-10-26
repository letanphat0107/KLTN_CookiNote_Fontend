// Recipe related types
export interface Recipe {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  prepare_time: number;
  cook_time: number;
  difficulty: string;
  view: number;
  category_id: number;
  user_id: number;
  created_at: string;
}

export interface RecipeStep {
  id: number;
  content: string;
  image_url?: string;
  step_no: number;
  recipe_id: number;
  suggested_time?: number;
  tips?: string;
}

export interface RecipeIngredient {
  id: number;
  name: string;
  quantity: string;
  recipe_id: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export interface Favorite {
  recipe_id: number;
  user_id: number;
}

export interface Share {
  id: number;
  share_code: string;
  recipe_id: number;
  user_id: number;
}

export interface ShoppingList {
  id: number;
  checked: boolean;
  ingredient: string;
  quantity: string;
  recipe_id: number;
  user_id: number;
}

export interface DailyMenu {
  id: number;
  created_at: string;
  meal_type: string;
  note: string;
  recipe_id: number;
}

export interface WeeklyMenu {
  id: number;
  day_of_week: number;
  meal_type: string;
  note: string;
  week: number;
  recipe_id: number;
  user_id: number;
}
