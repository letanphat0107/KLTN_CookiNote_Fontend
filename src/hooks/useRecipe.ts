// src/hooks/useRecipe.ts
import { useState, useEffect, useCallback } from "react";
import { Recipe, RecipeWithDetails } from "../types/recipe";
import { RecipeSearchParams } from "../types/api";
import {
  getPopularRecipes,
  getEasyToCookRecipes,
  searchRecipes,
  getRecipeDetails,
  getRecipesByCategory,
} from "../services/recipeService";

export const useRecipe = () => {
  const [popularRecipes, setPopularRecipes] = useState<Recipe[]>([]);
  const [easyToCookRecipes, setEasyToCookRecipes] = useState<Recipe[]>([]);
  const [isLoadingPopular, setIsLoadingPopular] = useState(false);
  const [isLoadingEasy, setIsLoadingEasy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch popular recipes
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

  // Fetch easy-to-cook recipes
  const fetchEasyToCookRecipes = useCallback(async (limit = 7) => {
    setIsLoadingEasy(true);
    setError(null);

    try {
      const recipes = await getEasyToCookRecipes(limit);
      setEasyToCookRecipes(recipes);
    } catch (error) {
      console.error("Error fetching easy-to-cook recipes:", error);
      setError("Không thể tải món ăn dễ nấu");
    } finally {
      setIsLoadingEasy(false);
    }
  }, []);

  // Refresh all recipes
  const refreshRecipes = useCallback(async () => {
    await Promise.all([fetchPopularRecipes(), fetchEasyToCookRecipes()]);
  }, [fetchPopularRecipes, fetchEasyToCookRecipes]);

  // Search recipes
  const searchRecipesLocal = useCallback(
    async (searchParams: RecipeSearchParams): Promise<Recipe[]> => {
      try {
        return await searchRecipes(searchParams);
      } catch (error) {
        console.error("Error searching recipes:", error);
        return [];
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

  // Get recipes by category
  const getRecipesByCategoryLocal = useCallback(
    async (categoryId: number, limit = 20): Promise<Recipe[]> => {
      try {
        return await getRecipesByCategory(categoryId, limit);
      } catch (error) {
        console.error("Error getting recipes by category:", error);
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
  };
};
