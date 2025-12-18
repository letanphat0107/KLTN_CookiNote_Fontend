// src/hooks/useCategory.ts
import { useState, useEffect, useCallback } from "react";
import { useAppSelector } from "../store/hooks";
import { Category } from "../types/recipe";
import {
  getCategories,
  searchCategories,
  createCategory,
  updateCategory,
  moveRecipesBetweenCategories,
  deleteCategory,
} from "../services/categoryService";
import { Alert } from "react-native";

export const useCategory = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is admin
  const isAdmin = user?.role === "ADMIN";

  // Fetch categories
  const fetchCategories = useCallback(async (showLoading = true) => {
    if (showLoading) {
      setIsLoading(true);
    }
    setError(null);

    try {
      const categoryList = await getCategories();
      setCategories(categoryList);
    } catch (error) {
      setError("Không thể tải danh sách danh mục");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Refresh categories (for pull-to-refresh)
  const refreshCategories = useCallback(async () => {
    setIsRefreshing(true);
    await fetchCategories(false);
  }, [fetchCategories]);

  // Search categories
  const searchCategoriesLocal = useCallback(
    async (query: string): Promise<Category[]> => {
      try {
        if (!query.trim()) {
          return categories;
        }
        return await searchCategories(query);
      } catch (error) {
        console.error("Error searching categories:", error);
        return [];
      }
    },
    [categories]
  );

  // Admin functions - only available for admin users


  // Update category (Admin only)




  // Delete category (Admin only)


  // Get category by ID
  const getCategoryById = useCallback(
    (categoryId: number): Category | undefined => {
      return categories.find((cat) => cat.id === categoryId);
    },
    [categories]
  );

  // Initial load
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    // Data
    categories,
    isLoading,
    isRefreshing,
    error,
    isAdmin,

    // Actions
    fetchCategories,
    refreshCategories,
    searchCategories: searchCategoriesLocal,
    getCategoryById,

    // Admin actions

  };
};
