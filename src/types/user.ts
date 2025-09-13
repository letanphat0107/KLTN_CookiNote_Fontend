// User and authentication types
export interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  preferences?: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  dietaryRestrictions: string[];
  allergies: string[];
  favoriteIngredients: string[];
  dislikedIngredients: string[];
  cookingSkillLevel: 'beginner' | 'intermediate' | 'advanced';
  preferredMealTypes: string[];
  maxCookingTime?: number; // minutes
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username: string;
  firstName?: string;
  lastName?: string;
}
