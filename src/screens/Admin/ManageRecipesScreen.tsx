import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
  TextInput,
} from "react-native";
import { useAppSelector } from "../../store/hooks";
import adminService from "../../services/adminService";
import { Recipe } from "../../types/recipe";
import { adminStyles } from "./styles";
import { useNavigation } from "@react-navigation/native";

const ManageRecipesScreen = () => {
  const { tokens } = useAppSelector((state) => state.auth);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");

  const navigation = useNavigation<any>();

  const fetchRecipes = async (pageNum: number = 0, isRefresh = false) => {
    if (!tokens?.accessToken) return;

    try {
      if (isRefresh) setRefreshing(true);
      else if (pageNum === 0) setLoading(true);

      const data = await adminService.getAdminRecipes(
        tokens.accessToken,
        pageNum,
        12
      );

      if (isRefresh || pageNum === 0) {
        setRecipes(data.items);
      } else {
        setRecipes((prev) => [...prev, ...data.items]);
      }

      setTotalPages(data.totalPages);
      setPage(data.page);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      Alert.alert("Lỗi", "Không thể tải danh sách món ăn");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Filter recipes locally
  useEffect(() => {
    let result = [...recipes];

    // Filter by search
    if (search.trim()) {
      const searchLower = search.toLowerCase().trim();
      result = result.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchLower) ||
          recipe.ownerName?.toLowerCase().includes(searchLower)
      );
    }

    // Filter by difficulty
    if (selectedDifficulty) {
      result = result.filter(
        (recipe) => recipe.difficulty === selectedDifficulty
      );
    }

    setFilteredRecipes(result);
  }, [recipes, search, selectedDifficulty]);

  useEffect(() => {
    fetchRecipes(0);
  }, []);

  const onRefresh = () => {
    fetchRecipes(0, true);
  };

  const loadMore = () => {
    if (page < totalPages - 1 && !loading) {
      fetchRecipes(page + 1);
    }
  };

  const handleRecipePress = (recipe: Recipe) => {
    // Navigate to RecipeDetail screen
    navigation.navigate("RecipeDetail", { recipeId: recipe.id });
  };

  const handleDeleteRecipe = async (recipeId: number) => {
    if (!tokens?.accessToken) return;

    Alert.alert("Xác nhận xóa", "Bạn có chắc muốn xóa món ăn này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            await adminService.deleteRecipe(tokens.accessToken, recipeId);
            Alert.alert("Thành công", "Đã xóa món ăn");
            fetchRecipes(0, true);
          } catch (error: any) {
            Alert.alert("Lỗi", error.message || "Không thể xóa món ăn");
          }
        },
      },
    ]);
  };

  const handleEditRecipe = (recipe: Recipe) => {
    // Navigate to EditRecipe screen with recipe data
    navigation.navigate("EditRecipe", { recipeId: recipe.id });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "EASY":
        return "#4CAF50";
      case "MEDIUM":
        return "#FF9800";
      case "HARD":
        return "#F44336";
      default:
        return "#757575";
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "EASY":
        return "Dễ";
      case "MEDIUM":
        return "Trung bình";
      case "HARD":
        return "Khó";
      default:
        return difficulty;
    }
  };

  const renderRecipeItem = ({ item }: { item: Recipe }) => (
    <TouchableOpacity
      style={adminStyles.recipeCard}
      onPress={() => handleRecipePress(item)}
      activeOpacity={0.7}
    >
      <Image
        source={{
          uri: item.imageUrl || "https://via.placeholder.com/120",
        }}
        style={adminStyles.recipeImage}
      />
      <View style={adminStyles.recipeInfo}>
        <Text style={adminStyles.recipeTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={adminStyles.recipeOwner}>Bởi: {item.ownerName}</Text>
        <View style={adminStyles.recipeMeta}>
          <View
            style={[
              adminStyles.difficultyBadge,
              { backgroundColor: getDifficultyColor(item.difficulty) },
            ]}
          >
            <Text style={adminStyles.difficultyText}>
              {getDifficultyText(item.difficulty)}
            </Text>
          </View>
          <Text style={adminStyles.recipeViews}>👁 {item.view}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={adminStyles.recipeActions}>
        <TouchableOpacity
          style={adminStyles.actionIconButton}
          onPress={(e) => {
            e.stopPropagation();
            handleEditRecipe(item);
          }}
          activeOpacity={0.7}
        >
          <Text style={adminStyles.actionIconText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[adminStyles.actionIconButton, { backgroundColor: "#FFEBEE" }]}
          onPress={(e) => {
            e.stopPropagation();
            handleDeleteRecipe(item.id);
          }}
          activeOpacity={0.7}
        >
          <Text style={adminStyles.actionIconText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={adminStyles.container}>
      {/* Search Bar */}
      <View style={adminStyles.searchContainer}>
        <Text style={{ fontSize: 20 }}>🔍</Text>
        <TextInput
          style={adminStyles.searchInput}
          placeholder="Tìm kiếm món ăn..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Difficulty Filter */}
      <View style={adminStyles.filterContainer}>
        <TouchableOpacity
          style={[
            adminStyles.filterButton,
            !selectedDifficulty && adminStyles.filterButtonActive,
          ]}
          onPress={() => setSelectedDifficulty("")}
        >
          <Text
            style={[
              adminStyles.filterButtonText,
              !selectedDifficulty && adminStyles.filterButtonTextActive,
            ]}
          >
            Tất cả
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            adminStyles.filterButton,
            selectedDifficulty === "EASY" && adminStyles.filterButtonActive,
          ]}
          onPress={() => setSelectedDifficulty("EASY")}
        >
          <Text
            style={[
              adminStyles.filterButtonText,
              selectedDifficulty === "EASY" &&
                adminStyles.filterButtonTextActive,
            ]}
          >
            Dễ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            adminStyles.filterButton,
            selectedDifficulty === "MEDIUM" && adminStyles.filterButtonActive,
          ]}
          onPress={() => setSelectedDifficulty("MEDIUM")}
        >
          <Text
            style={[
              adminStyles.filterButtonText,
              selectedDifficulty === "MEDIUM" &&
                adminStyles.filterButtonTextActive,
            ]}
          >
            TB
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            adminStyles.filterButton,
            selectedDifficulty === "HARD" && adminStyles.filterButtonActive,
          ]}
          onPress={() => setSelectedDifficulty("HARD")}
        >
          <Text
            style={[
              adminStyles.filterButtonText,
              selectedDifficulty === "HARD" &&
                adminStyles.filterButtonTextActive,
            ]}
          >
            Khó
          </Text>
        </TouchableOpacity>
      </View>

      {/* Recipe List */}
      {loading && page === 0 ? (
        <View style={adminStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
        </View>
      ) : (
        <FlatList
          data={filteredRecipes}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#FF6B6B"]}
            />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading && page > 0 ? (
              <ActivityIndicator size="small" color="#FF6B6B" />
            ) : null
          }
          ListEmptyComponent={
            <View style={adminStyles.emptyContainer}>
              <Text style={{ fontSize: 40 }}>🍳❌</Text>
              <Text style={adminStyles.emptyText}>Không tìm thấy món ăn</Text>
            </View>
          }
        />
      )}

      {/* Floating Action Button */}
      <TouchableOpacity
        style={adminStyles.fabButton}
        onPress={() => navigation.navigate("CreateRecipe")}
        activeOpacity={0.8}
      >
        <Text style={adminStyles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ManageRecipesScreen;
