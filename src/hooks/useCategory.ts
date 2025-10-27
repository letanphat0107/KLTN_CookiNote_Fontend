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
  CategoryCreateRequest,
  CategoryUpdateRequest,
  MoveCategoryRequest,
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

  // Create category (Admin only)
  const createCategoryLocal = useCallback(
    async (categoryData: CategoryCreateRequest): Promise<boolean> => {
      if (!isAdmin) {
        Alert.alert("Lỗi", "Chỉ quản trị viên mới có thể tạo danh mục");
        return false;
      }

      setIsLoading(true);
      try {
        const success = await createCategory(categoryData);
        if (success) {
          Alert.alert("Thành công", "Đã tạo danh mục mới");
          await fetchCategories(false); // Refresh list
        } else {
          Alert.alert("Lỗi", "Không thể tạo danh mục");
        }
        return success;
      } catch (error) {
        console.error("Error creating category:", error);
        Alert.alert("Lỗi", "Đã có lỗi xảy ra khi tạo danh mục");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [isAdmin, fetchCategories]
  );

  // Update category (Admin only)
  const updateCategoryLocal = useCallback(
    async (categoryData: CategoryUpdateRequest): Promise<boolean> => {
      if (!isAdmin) {
        Alert.alert("Lỗi", "Chỉ quản trị viên mới có thể cập nhật danh mục");
        return false;
      }

      setIsLoading(true);
      try {
        const success = await updateCategory(categoryData);
        if (success) {
          Alert.alert("Thành công", "Đã cập nhật danh mục");
          await fetchCategories(false); // Refresh list
        } else {
          Alert.alert("Lỗi", "Không thể cập nhật danh mục");
        }
        return success;
      } catch (error) {
        console.error("Error updating category:", error);
        Alert.alert("Lỗi", "Đã có lỗi xảy ra khi cập nhật danh mục");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [isAdmin, fetchCategories]
  );

  // Move recipes between categories (Admin only)
  const moveRecipes = useCallback(
    async (moveData: MoveCategoryRequest): Promise<boolean> => {
      if (!isAdmin) {
        Alert.alert("Lỗi", "Chỉ quản trị viên mới có thể di chuyển công thức");
        return false;
      }

      setIsLoading(true);
      try {
        const success = await moveRecipesBetweenCategories(moveData);
        if (success) {
          Alert.alert("Thành công", "Đã di chuyển công thức giữa các danh mục");
        } else {
          Alert.alert("Lỗi", "Không thể di chuyển công thức");
        }
        return success;
      } catch (error) {
        console.error("Error moving recipes:", error);
        Alert.alert("Lỗi", "Đã có lỗi xảy ra khi di chuyển công thức");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [isAdmin]
  );

  // Delete category (Admin only)
  const deleteCategoryLocal = useCallback(
    async (categoryId: number): Promise<boolean> => {
      if (!isAdmin) {
        Alert.alert("Lỗi", "Chỉ quản trị viên mới có thể xóa danh mục");
        return false;
      }

      return new Promise((resolve) => {
        Alert.alert(
          "Xác nhận xóa",
          "Bạn có chắc chắn muốn xóa danh mục này? Hành động này không thể hoàn tác.",
          [
            {
              text: "Hủy",
              style: "cancel",
              onPress: () => resolve(false),
            },
            {
              text: "Xóa",
              style: "destructive",
              onPress: async () => {
                setIsLoading(true);
                try {
                  const success = await deleteCategory(categoryId);
                  if (success) {
                    Alert.alert("Thành công", "Đã xóa danh mục");
                    await fetchCategories(false); // Refresh list
                  } else {
                    Alert.alert("Lỗi", "Không thể xóa danh mục");
                  }
                  resolve(success);
                } catch (error) {
                  console.error("Error deleting category:", error);
                  Alert.alert("Lỗi", "Đã có lỗi xảy ra khi xóa danh mục");
                  resolve(false);
                } finally {
                  setIsLoading(false);
                }
              },
            },
          ]
        );
      });
    },
    [isAdmin, fetchCategories]
  );

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
    createCategory: createCategoryLocal,
    updateCategory: updateCategoryLocal,
    deleteCategory: deleteCategoryLocal,
    moveRecipes,
  };
};
