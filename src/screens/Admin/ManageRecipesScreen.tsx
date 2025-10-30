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
  Modal,
  ScrollView,
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
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

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
    setSelectedRecipe(recipe);
    setModalVisible(true);
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
            setModalVisible(false);
            fetchRecipes(0, true);
          } catch (error: any) {
            Alert.alert("Lỗi", error.message || "Không thể xóa món ăn");
          }
        },
      },
    ]);
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
          {/* <Text style={adminStyles.recipeRating}>
            ⭐ {item.averageRating?.toFixed(1) || "0.0"} (
            {item.ratingCount || 0})
          </Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={adminStyles.container}>
      {/* Create Recipe Button */}
      <TouchableOpacity
        style={adminStyles.createButton}
        onPress={() => navigation.navigate("CreateRecipe" as never)}
      >
        <Text style={adminStyles.createButtonText}>➕ Tạo công thức mới</Text>
      </TouchableOpacity>

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

      {/* Recipe Detail Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={adminStyles.modalOverlay}>
          <View style={adminStyles.modalContent}>
            {selectedRecipe && (
              <ScrollView>
                <Image
                  source={{
                    uri:
                      selectedRecipe.imageUrl ||
                      "https://via.placeholder.com/300",
                  }}
                  style={adminStyles.modalRecipeImage}
                />
                <Text style={adminStyles.modalRecipeTitle}>
                  {selectedRecipe.title}
                </Text>

                <View style={adminStyles.modalInfoRow}>
                  <Text style={adminStyles.modalLabel}>Tác giả:</Text>
                  <Text style={adminStyles.modalValue}>
                    {selectedRecipe.ownerName}
                  </Text>
                </View>

                <View style={adminStyles.modalInfoRow}>
                  <Text style={adminStyles.modalLabel}>Độ khó:</Text>
                  <View
                    style={[
                      adminStyles.difficultyBadge,
                      {
                        backgroundColor: getDifficultyColor(
                          selectedRecipe.difficulty
                        ),
                      },
                    ]}
                  >
                    <Text style={adminStyles.difficultyText}>
                      {getDifficultyText(selectedRecipe.difficulty)}
                    </Text>
                  </View>
                </View>

                <View style={adminStyles.modalInfoRow}>
                  <Text style={adminStyles.modalLabel}>Thời gian:</Text>
                  <Text style={adminStyles.modalValue}>
                    Chuẩn bị: {selectedRecipe.prepare_time}p | Nấu:{" "}
                    {selectedRecipe.cook_time}p
                  </Text>
                </View>

                <View style={adminStyles.modalInfoRow}>
                  <Text style={adminStyles.modalLabel}>Lượt xem:</Text>
                  <Text style={adminStyles.modalValue}>
                    {selectedRecipe.view}
                  </Text>
                </View>

                {/* <View style={adminStyles.modalInfoRow}>
                  <Text style={adminStyles.modalLabel}>Đánh giá:</Text>
                  <Text style={adminStyles.modalValue}>
                    ⭐ {selectedRecipe.averageRating?.toFixed(1) || "0.0"} (
                    {selectedRecipe.ratingCount || 0} đánh giá)
                  </Text>
                </View> */}

                <View style={adminStyles.modalInfoRow}>
                  <Text style={adminStyles.modalLabel}>Ngày tạo:</Text>
                  <Text style={adminStyles.modalValue}>
                    {new Date(selectedRecipe.createdAt).toLocaleDateString(
                      "vi-VN"
                    )}
                  </Text>
                </View>

                <View style={adminStyles.modalButtons}>
                  <TouchableOpacity
                    style={[adminStyles.modalButton, adminStyles.deleteButton]}
                    onPress={() => handleDeleteRecipe(selectedRecipe.id)}
                  >
                    <Text style={adminStyles.modalButtonText}>Xóa món ăn</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[adminStyles.modalButton, adminStyles.cancelButton]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={adminStyles.modalButtonText}>Đóng</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ManageRecipesScreen;
