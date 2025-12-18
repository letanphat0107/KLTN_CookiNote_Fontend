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
} from "react-native";
import { useAppSelector } from "../../store/hooks";
import adminService from "../../services/adminService";
import { Recipe } from "../../types/recipe";
import { adminStyles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import FloatingButtonsContainer from "../../components/FloatingButtons/FloatingButtonContainer";
import { Ionicons } from "@expo/vector-icons";

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
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const navigation = useNavigation<any>();

  const fetchRecipes = async (pageNum: number = 0, isRefresh = false) => {
    if (!tokens?.accessToken) return;

    try {
      if (isRefresh) setRefreshing(true);
      else if (pageNum === 0) setLoading(true);

      const data = await adminService.getAdminRecipes(pageNum, 12);

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
    setShowDetailModal(true);
  };

  const handleDeleteRecipe = async (recipeId: number, title: string) => {
    if (!tokens?.accessToken) return;

    Alert.alert("Xác nhận xóa", `Bạn có chắc muốn xóa "${title}"?`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            await adminService.deleteRecipe(recipeId);
            Alert.alert("Thành công", "Đã xóa món ăn");
            setShowDetailModal(false);
            fetchRecipes(0, true);
          } catch (error: any) {
            Alert.alert("Lỗi", error.message || "Không thể xóa món ăn");
          }
        },
      },
    ]);
  };

  const handleEditRecipe = (recipeId: number) => {
    setShowDetailModal(false);
    navigation.navigate("EditRecipe", { recipeId });
  };

  const handleViewDetail = (recipeId: number) => {
    setShowDetailModal(false);
    navigation.navigate("RecipeDetail", { recipeId, showAddToCartButton: false,
      showEditButton: false }, 
      
    );
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

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "EASY":
        return "leaf-outline";
      case "MEDIUM":
        return "flame-outline";
      case "HARD":
        return "flash-outline";
      default:
        return "help-outline";
    }
  };

  const renderRecipeItem = ({ item }: { item: Recipe }) => (
    <TouchableOpacity
      style={adminStyles.modernRecipeCard}
      onPress={() => handleRecipePress(item)}
      activeOpacity={0.7}
    >
      <View style={adminStyles.modernRecipeImageWrapper}>
        <Image
          source={{
            uri: item.imageUrl || "https://thecrites.com/sites/all/modules/cookbook/theme/images/default-recipe-big.png",
          }}
          style={adminStyles.modernRecipeImage}
        />
        <View
          style={[
            adminStyles.modernDifficultyBadge,
            { backgroundColor: getDifficultyColor(item.difficulty) },
          ]}
        >
          <Ionicons
            name={getDifficultyIcon(item.difficulty) as any}
            size={14}
            color="#FFF"
          />
          <Text style={adminStyles.modernDifficultyText}>
            {getDifficultyText(item.difficulty)}
          </Text>
        </View>
      </View>

      <View style={adminStyles.modernRecipeContent}>
        <Text style={adminStyles.modernRecipeTitle} numberOfLines={2}>
          {item.title}
        </Text>

        <View style={adminStyles.modernRecipeMetaRow}>
          <View style={adminStyles.modernRecipeMeta}>
            <Ionicons name="person-outline" size={14} color="#7F8C8D" />
            <Text style={adminStyles.modernRecipeMetaText} numberOfLines={1}>
              {item.ownerName}
            </Text>
          </View>

          <View style={adminStyles.modernRecipeMeta}>
            <Ionicons name="eye-outline" size={14} color="#7F8C8D" />
            <Text style={adminStyles.modernRecipeMetaText}>{item.view}</Text>
          </View>

          {/* <View style={adminStyles.modernRecipeMeta}>
            <Ionicons name="heart-outline" size={14} color="#7F8C8D" />
            <Text style={adminStyles.modernRecipeMetaText}>
              {item.favoriteCount || 0}
            </Text>
          </View> */}
        </View>
      </View>

      <View style={adminStyles.modernRecipeActions}>
        <TouchableOpacity
          style={adminStyles.modernActionButton}
          onPress={(e) => {
            e.stopPropagation();
            handleEditRecipe(item.id);
          }}
        >
          <Ionicons name="create-outline" size={20} color="#4A90E2" />
        </TouchableOpacity>

        <TouchableOpacity
          style={adminStyles.modernActionButton}
          onPress={(e) => {
            e.stopPropagation();
            handleDeleteRecipe(item.id, item.title);
          }}
        >
          <Ionicons name="trash-outline" size={20} color="#E74C3C" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderDetailModal = () => (
    <Modal visible={showDetailModal} transparent animationType="slide">
      <View style={adminStyles.modernModalOverlay1}>
        <View style={adminStyles.modernModalContainer}>
          {/* Header */}
          <View style={adminStyles.modernModalHeader1}>
            <View style={{ flex: 1 }}>
              <Text style={adminStyles.modernModalTitle1} numberOfLines={2}>
                {selectedRecipe?.title}
              </Text>
              <Text style={adminStyles.modernModalSubtitle}>
                Bởi {selectedRecipe?.ownerName}
              </Text>
            </View>
            <TouchableOpacity onPress={() => setShowDetailModal(false)}>
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Recipe Image */}
          <View style={adminStyles.detailImageSection}>
            <Image
              source={{
                uri:
                  selectedRecipe?.imageUrl ||
                  "https://thecrites.com/sites/all/modules/cookbook/theme/images/default-recipe-big.png",
              }}
              style={adminStyles.detailRecipeImage}
            />
          </View>

          {/* Recipe Info */}
          <View style={adminStyles.detailInfoSection}>
            <View style={adminStyles.detailInfoRow}>
              <View style={adminStyles.detailInfoItem}>
                <Ionicons name="time-outline" size={20} color="#FF6B6B" />
                <Text style={adminStyles.detailInfoLabel}>Chuẩn bị</Text>
                <Text style={adminStyles.detailInfoValue}>
                  {selectedRecipe?.prepareTime || 0}p
                </Text>
              </View>

              <View style={adminStyles.detailInfoItem}>
                <Ionicons name="flame-outline" size={20} color="#FF6B6B" />
                <Text style={adminStyles.detailInfoLabel}>Nấu</Text>
                <Text style={adminStyles.detailInfoValue}>
                  {selectedRecipe?.cookTime || 0}p
                </Text>
              </View>

              <View style={adminStyles.detailInfoItem}>
                <Ionicons name="eye-outline" size={20} color="#FF6B6B" />
                <Text style={adminStyles.detailInfoLabel}>Lượt xem</Text>
                <Text style={adminStyles.detailInfoValue}>
                  {selectedRecipe?.view || 0}
                </Text>
              </View>

              {/* <View style={adminStyles.detailInfoItem}>
                <Ionicons name="heart-outline" size={20} color="#FF6B6B" />
                <Text style={adminStyles.detailInfoLabel}>Yêu thích</Text>
                <Text style={adminStyles.detailInfoValue}>
                  {selectedRecipe?.favoriteCount || 0}
                </Text>
              </View> */}
            </View>

            <View style={adminStyles.detailDifficultyRow}>
              <Ionicons
                name={
                  getDifficultyIcon(selectedRecipe?.difficulty || "") as any
                }
                size={20}
                color={getDifficultyColor(selectedRecipe?.difficulty || "")}
              />
              <Text
                style={[
                  adminStyles.detailDifficultyText,
                  {
                    color: getDifficultyColor(selectedRecipe?.difficulty || ""),
                  },
                ]}
              >
                Độ khó: {getDifficultyText(selectedRecipe?.difficulty || "")}
              </Text>
            </View>

            {selectedRecipe?.description && (
              <Text style={adminStyles.detailDescription}>
                {selectedRecipe.description}
              </Text>
            )}
          </View>

          {/* Action Buttons */}
          <View style={adminStyles.detailActionsSection}>
            <TouchableOpacity
              style={adminStyles.detailActionButton}
              onPress={() => handleViewDetail(selectedRecipe?.id || 0)}
            >
              <Ionicons name="eye-outline" size={20} color="#4A90E2" />
              <Text style={adminStyles.detailActionButtonText}>
                Xem chi tiết
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={adminStyles.detailActionButton}
              onPress={() => handleEditRecipe(selectedRecipe?.id || 0)}
            >
              <Ionicons name="create-outline" size={20} color="#27AE60" />
              <Text style={adminStyles.detailActionButtonText}>Chỉnh sửa</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                adminStyles.detailActionButton,
                { backgroundColor: "#FFEBEE" },
              ]}
              onPress={() =>
                handleDeleteRecipe(
                  selectedRecipe?.id || 0,
                  selectedRecipe?.title || ""
                )
              }
            >
              <Ionicons name="trash-outline" size={20} color="#E74C3C" />
              <Text
                style={[
                  adminStyles.detailActionButtonText,
                  { color: "#E74C3C" },
                ]}
              >
                Xóa
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={adminStyles.container}>
      {/* Header */}
      <View style={adminStyles.modernHeader}>
        <View style={adminStyles.searchWrapper}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            style={adminStyles.modernSearchInput}
            placeholder="Tìm kiếm món ăn..."
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <TouchableOpacity
          style={adminStyles.modernCreateButton}
          onPress={() => navigation.navigate("CreateRecipe")}
        >
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Difficulty Filter */}
      <View style={adminStyles.modernFilterContainer}>
        {/*
          { key: "", label: "Tất cả", icon: "apps-outline" },
          { key: "EASY", label: "Dễ", icon: "leaf-outline" },
          { key: "MEDIUM", label: "TB", icon: "flame-outline" },
          { key: "HARD", label: "Khó", icon: "flash-outline" },
        ].map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              adminStyles.modernFilterButton,
              selectedDifficulty === filter.key &&
                adminStyles.modernFilterButtonActive,
            ]}
            onPress={() => setSelectedDifficulty(filter.key)}
          >
            <Ionicons
              name={filter.icon as any}
              size={16}
              color={
                selectedDifficulty === filter.key ? "#FFFFFF" : "#7F8C8D"
              }
            />
            <Text
              style={[
                adminStyles.modernFilterButtonText,
                selectedDifficulty === filter.key &&
                  adminStyles.modernFilterButtonTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      */}
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
          contentContainerStyle={adminStyles.listContainer}
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
              <Ionicons name="restaurant-outline" size={80} color="#CCC" />
              <Text style={adminStyles.emptyText}>Không tìm thấy món ăn</Text>
            </View>
          }
        />
      )}

      {/* Detail Modal */}
      {renderDetailModal()}

      {/* Floating Buttons */}
      <FloatingButtonsContainer
        navigation={navigation}
        showShoppingList={false}
        isAdminMode={true}
      />
    </View>
  );
};

export default ManageRecipesScreen;
