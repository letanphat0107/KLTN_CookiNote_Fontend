// Recipe related types
export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  calories?: number;
  ingredients: Ingredient[];
  instructions: Instruction[];
  tags: string[];
  nutrition?: Nutrition;
  createdAt: Date;
  updatedAt: Date;
}

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  notes?: string;
}

export interface Instruction {
  id: string;
  step: number;
  description: string;
  imageUrl?: string;
  timer?: number; // seconds
}

export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}
