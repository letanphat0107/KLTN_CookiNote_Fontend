// src/hooks/useRecipe.ts
import { useState, useEffect, useCallback } from "react";
import {
  Recipe,
  RecipeWithDetails,
  PaginatedRecipeResponse,
} from "../types/recipe";
import { RecipeSearchParams } from "../types/api";
import {
  getPopularRecipes,
  getEasyToCookRecipes,
  searchRecipes,
  getRecipeDetails,
  getRecipesByCategory,
  getRecipesByDifficulty,
} from "../services/recipeService";

export const useRecipe = () => {
  const [popularRecipes, setPopularRecipes] = useState<Recipe[]>([]);
  const [easyToCookRecipes, setEasyToCookRecipes] = useState<Recipe[]>([]);
  const [isLoadingPopular, setIsLoadingPopular] = useState(false);
  const [isLoadingEasy, setIsLoadingEasy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch popular recipes (sorted by view count)
  const fetchPopularRecipes = useCallback(async (limit = 8) => {
    setIsLoadingPopular(true);
    setError(null);

    try {
      const recipes = await getPopularRecipes(limit);
      setPopularRecipes(recipes);
    } catch (error) {
      console.error("Error fetching popular recipes:", error);
      setError("Không thể tải món ăn hấp dẫn");
    } finally {
      setIsLoadingPopular(false);
    }
  }, []);

  // Fetch latest recipes (for easy-to-cook section)
  const fetchEasyToCookRecipes = useCallback(async (limit = 7) => {
    setIsLoadingEasy(true);
    setError(null);

    try {
      const recipes = await getEasyToCookRecipes(limit);
      setEasyToCookRecipes(recipes);
    } catch (error) {
      console.error("Error fetching latest recipes:", error);
      setError("Không thể tải món ăn mới nhất");
    } finally {
      setIsLoadingEasy(false);
    }
  }, []);

  // Refresh all recipes
  const refreshRecipes = useCallback(async () => {
    await Promise.all([fetchPopularRecipes(), fetchEasyToCookRecipes()]);
  }, [fetchPopularRecipes, fetchEasyToCookRecipes]);

  // Search recipes with pagination
  const searchRecipesLocal = useCallback(
    async (
      searchParams: RecipeSearchParams & {
        page?: number;
        size?: number;
        sort?: string;
      }
    ): Promise<PaginatedRecipeResponse> => {
      try {
        return await searchRecipes(searchParams);
      } catch (error) {
        console.error("Error searching recipes:", error);
        return {
          page: 0,
          size: 0,
          totalElements: 0,
          totalPages: 0,
          hasNext: false,
          items: [],
        };
      }
    },
    []
  );

  // Get recipe details
  const getRecipeDetailsLocal = useCallback(
    async (recipeId: number): Promise<RecipeWithDetails | null> => {
      try {
        return await getRecipeDetails(recipeId);
      } catch (error) {
        console.error("Error getting recipe details:", error);
        return null;
      }
    },
    []
  );

  // Get recipes by category with pagination
  const getRecipesByCategoryLocal = useCallback(
    async (
      categoryId: number,
      page = 0,
      size = 20
    ): Promise<PaginatedRecipeResponse> => {
      try {
        return await getRecipesByCategory(categoryId, page, size);
      } catch (error) {
        console.error("Error getting recipes by category:", error);
        return {
          page: 0,
          size: 0,
          totalElements: 0,
          totalPages: 0,
          hasNext: false,
          items: [],
        };
      }
    },
    []
  );

  // Get recipes by difficulty
  const getRecipesByDifficultyLocal = useCallback(
    async (
      difficulty: "EASY" | "MEDIUM" | "HARD",
      limit = 20
    ): Promise<Recipe[]> => {
      try {
        return await getRecipesByDifficulty(difficulty, limit);
      } catch (error) {
        console.error("Error getting recipes by difficulty:", error);
        return [];
      }
    },
    []
  );

  // Initial load
  useEffect(() => {
    refreshRecipes();
  }, [refreshRecipes]);

  return {
    // Data
    popularRecipes,
    easyToCookRecipes,
    isLoadingPopular,
    isLoadingEasy,
    isLoading: isLoadingPopular || isLoadingEasy,
    error,

    // Actions
    fetchPopularRecipes,
    fetchEasyToCookRecipes,
    refreshRecipes,
    searchRecipes: searchRecipesLocal,
    getRecipeDetails: getRecipeDetailsLocal,
    getRecipesByCategory: getRecipesByCategoryLocal,
    getRecipesByDifficulty: getRecipesByDifficultyLocal,
  };
};
