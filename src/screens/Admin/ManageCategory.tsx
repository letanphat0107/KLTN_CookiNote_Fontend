import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  Image,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Dimensions,
} from "react-native";
import { adminStyles } from "./styles";
import {
  getCategories,
  searchCategories,
  createCategory,
  updateCategory,
  moveRecipesBetweenCategories,
  deleteCategory,
  getRecipesByCategory,
  MoveRecipesRequest,
} from "../../services/categoryService";
import { Category, Recipe } from "../../types/recipe";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const ManageCategory = () => {
  // State
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  // Category detail states
  const [categoryRecipes, setCategoryRecipes] = useState<Recipe[]>([]);
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState<number[]>([]);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageFile: null as {
      uri: string;
      type: string;
      name: string;
    } | null,
  });

  // Move data
  const [destinationCategoryId, setDestinationCategoryId] = useState<number>(0);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      handleSearch();
    } else {
      setFilteredCategories(categories);
    }
  }, [searchQuery, categories]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
      setFilteredCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
      Alert.alert("Lỗi", "Không thể tải danh sách danh mục");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setFilteredCategories(categories);
      return;
    }

    try {
      const results = await searchCategories(searchQuery);
      setFilteredCategories(results);
    } catch (error) {
      console.error("Error searching categories:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCategories();
    setRefreshing(false);
  };

  // Image picker
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Lỗi", "Cần cấp quyền truy cập thư viện ảnh");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setFormData({
        ...formData,
        imageFile: {
          uri: asset.uri,
          type: "image/jpeg",
          name: `category-${Date.now()}.jpg`,
        },
      });
    }
  };

  // View category detail
  const handleViewDetail = async (category: Category) => {
    setSelectedCategory(category);
    setSelectedRecipes([]);
    setDestinationCategoryId(0);
    setShowDetailModal(true);

    // Load recipes
    setLoadingRecipes(true);
    try {
      const result = await getRecipesByCategory(category.id, 0, 100);
      setCategoryRecipes(result.items);
    } catch (error) {
      console.error("Error loading category recipes:", error);
      Alert.alert("Lỗi", "Không thể tải danh sách công thức");
    } finally {
      setLoadingRecipes(false);
    }
  };

  // Toggle recipe selection
  const toggleRecipeSelection = (recipeId: number) => {
    setSelectedRecipes((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  // Create category
  const handleCreate = () => {
    setFormData({ name: "", description: "", imageFile: null });
    setShowCreateModal(true);
  };

  const handleSubmitCreate = async () => {
    if (!formData.name.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập tên danh mục");
      return;
    }

    if (!formData.description.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập mô tả");
      return;
    }

    setIsSaving(true);
    try {
      const result = await createCategory(
        formData.name,
        formData.description,
        formData.imageFile || undefined
      );

      if (result.success) {
        Alert.alert("Thành công", result.message || "Tạo danh mục thành công");
        setShowCreateModal(false);
        loadCategories();
      } else {
        Alert.alert("Lỗi", result.message || "Không thể tạo danh mục");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi tạo danh mục");
    } finally {
      setIsSaving(false);
    }
  };

  // Update category
  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description || "",
      imageFile: null,
    });
    setShowEditModal(true);
  };

  const handleSubmitUpdate = async () => {
    if (!selectedCategory) return;

    if (!formData.name.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập tên danh mục");
      return;
    }

    setIsSaving(true);
    try {
      const result = await updateCategory(
        selectedCategory.id,
        formData.name,
        formData.description,
        formData.imageFile || undefined
      );

      if (result.success) {
        Alert.alert(
          "Thành công",
          result.message || "Cập nhật danh mục thành công"
        );
        setShowEditModal(false);
        loadCategories();
      } else {
        Alert.alert("Lỗi", result.message || "Không thể cập nhật danh mục");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi cập nhật danh mục");
    } finally {
      setIsSaving(false);
    }
  };

  // Move recipes
  const handleSubmitMove = async () => {
    if (!selectedCategory) return;

    if (destinationCategoryId === 0) {
      Alert.alert("Lỗi", "Vui lòng chọn danh mục đích");
      return;
    }

    if (selectedRecipes.length === 0) {
      Alert.alert("Lỗi", "Vui lòng chọn ít nhất một công thức");
      return;
    }

    Alert.alert(
      "Xác nhận",
      `Chuyển ${selectedRecipes.length} công thức sang danh mục khác?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Chuyển",
          onPress: async () => {
            setIsSaving(true);
            try {
              const request: MoveRecipesRequest = {
                sourceCategoryId: selectedCategory.id,
                destinationCategoryId: destinationCategoryId,
                recipeIds: selectedRecipes,
              };

              const result = await moveRecipesBetweenCategories(request);

              if (result.success) {
                Alert.alert(
                  "Thành công",
                  `Đã chuyển ${selectedRecipes.length} công thức`
                );
                setShowDetailModal(false);
                setSelectedRecipes([]);
                setDestinationCategoryId(0);
                loadCategories();
              } else {
                Alert.alert(
                  "Lỗi",
                  result.message || "Không thể chuyển công thức"
                );
              }
            } catch (error) {
              Alert.alert("Lỗi", "Đã xảy ra lỗi khi chuyển công thức");
            } finally {
              setIsSaving(false);
            }
          },
        },
      ]
    );
  };

  // Delete category
  const handleDelete = (category: Category) => {
    Alert.alert(
      "Xóa danh mục",
      `Bạn có chắc muốn xóa danh mục "${category.name}"?\n(Chức năng chưa khả dụng)`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            const result = await deleteCategory(category.id);
            Alert.alert(
              result.success ? "Thành công" : "Thông báo",
              result.message || "Chức năng chưa khả dụng"
            );
          },
        },
      ]
    );
  };

  // Render category card
  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={adminStyles.modernCategoryCard}
      onPress={() => handleViewDetail(item)}
      activeOpacity={0.7}
    >
      <View style={adminStyles.modernCategoryImageWrapper}>
        {item.imageUrl ? (
          <Image
            source={{ uri: item.imageUrl }}
            style={adminStyles.modernCategoryImage}
          />
        ) : (
          <View style={adminStyles.modernCategoryImagePlaceholder}>
            <Ionicons name="fast-food-outline" size={50} color="#FF6B6B" />
          </View>
        )}
      </View>

      <View style={adminStyles.modernCategoryContent}>
        <Text style={adminStyles.modernCategoryName}>{item.name}</Text>
        <Text style={adminStyles.modernCategoryDescription} numberOfLines={2}>
          {item.description || "Chưa có mô tả"}
        </Text>
      </View>

      <View style={adminStyles.modernCategoryActions}>
        <TouchableOpacity
          style={adminStyles.modernActionButton}
          onPress={(e) => {
            e.stopPropagation();
            handleEdit(item);
          }}
        >
          <Ionicons name="create-outline" size={20} color="#4A90E2" />
        </TouchableOpacity>

        <TouchableOpacity
          style={adminStyles.modernActionButton}
          onPress={(e) => {
            e.stopPropagation();
            handleDelete(item);
          }}
        >
          <Ionicons name="trash-outline" size={20} color="#E74C3C" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Render recipe item in detail modal
  const renderRecipeItem = ({ item }: { item: Recipe }) => {
    const isSelected = selectedRecipes.includes(item.id);

    return (
      <TouchableOpacity
        style={[
          adminStyles.recipeItem,
          isSelected && adminStyles.recipeItemSelected,
        ]}
        onPress={() => toggleRecipeSelection(item.id)}
        activeOpacity={0.7}
      >
        <View style={adminStyles.recipeCheckbox}>
          {isSelected && (
            <Ionicons name="checkmark-circle" size={24} color="#FF6B6B" />
          )}
          {!isSelected && (
            <Ionicons name="ellipse-outline" size={24} color="#CCC" />
          )}
        </View>

        <Image
          source={{
            uri: item.imageUrl || "https://via.placeholder.com/80",
          }}
          style={adminStyles.recipeItemImage}
        />

        <View style={adminStyles.recipeItemInfo}>
          <Text style={adminStyles.recipeItemTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={adminStyles.recipeItemMeta}>
            ID: {item.id} • {item.difficulty} • {item.view} lượt xem
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Render create/edit form modal
  const renderFormModal = (
    visible: boolean,
    onClose: () => void,
    onSubmit: () => void,
    title: string
  ) => (
    <Modal visible={visible} transparent animationType="slide">
      <View style={adminStyles.modernModalOverlay}>
        <View style={adminStyles.modernModalContainer}>
          {/* Header */}
          <View style={adminStyles.modernModalHeader}>
            <Text style={adminStyles.modernModalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose} disabled={isSaving}>
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={adminStyles.modernModalContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Image section */}
            <View style={adminStyles.imageSection}>
              {formData.imageFile ? (
                <Image
                  source={{ uri: formData.imageFile.uri }}
                  style={adminStyles.modernImagePreview}
                />
              ) : (
                <View style={adminStyles.modernImagePlaceholder}>
                  <Ionicons name="image-outline" size={60} color="#CCC" />
                  <Text style={adminStyles.imagePlaceholderText}>
                    Chưa có ảnh
                  </Text>
                </View>
              )}

              <TouchableOpacity
                style={adminStyles.modernPickImageButton}
                onPress={pickImage}
                disabled={isSaving}
              >
                <Ionicons name="camera" size={20} color="#FFF" />
                <Text style={adminStyles.modernPickImageText}>
                  {formData.imageFile ? "Đổi ảnh" : "Chọn ảnh"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Form inputs */}
            <View style={adminStyles.formGroup}>
              <Text style={adminStyles.formLabel}>Tên danh mục *</Text>
              <TextInput
                style={adminStyles.modernInput}
                placeholder="Nhập tên danh mục"
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
                editable={!isSaving}
              />
            </View>

            <View style={adminStyles.formGroup}>
              <Text style={adminStyles.formLabel}>Mô tả *</Text>
              <TextInput
                style={[adminStyles.modernInput, adminStyles.modernTextArea]}
                placeholder="Nhập mô tả"
                value={formData.description}
                onChangeText={(text) =>
                  setFormData({ ...formData, description: text })
                }
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                editable={!isSaving}
              />
            </View>
          </ScrollView>

          {/* Footer buttons */}
          <View style={adminStyles.modernModalFooter}>
            <TouchableOpacity
              style={adminStyles.modernCancelButton}
              onPress={onClose}
              disabled={isSaving}
            >
              <Text style={adminStyles.modernCancelButtonText}>Hủy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                adminStyles.modernSubmitButton,
                isSaving && adminStyles.modernButtonDisabled,
              ]}
              onPress={onSubmit}
              disabled={isSaving}
            >
              {isSaving ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <>
                  <Ionicons name="checkmark" size={20} color="#FFF" />
                  <Text style={adminStyles.modernSubmitButtonText}>Lưu</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Render category detail modal
  const renderDetailModal = () => (
    <Modal visible={showDetailModal} transparent animationType="slide">
      <View style={adminStyles.modernModalOverlay}>
        <View style={adminStyles.modernModalContainer}>
          {/* Header */}
          <View style={adminStyles.modernModalHeader}>
            <View>
              <Text style={adminStyles.modernModalTitle}>
                {selectedCategory?.name}
              </Text>
              <Text style={adminStyles.modernModalSubtitle}>
                {categoryRecipes.length} công thức
              </Text>
            </View>
            <TouchableOpacity onPress={() => setShowDetailModal(false)}>
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Category info */}
          <View style={adminStyles.detailInfoSection}>
            {selectedCategory?.imageUrl && (
              <Image
                source={{ uri: selectedCategory.imageUrl }}
                style={adminStyles.detailCategoryImage}
              />
            )}
            <Text style={adminStyles.detailCategoryDescription}>
              {selectedCategory?.description || "Chưa có mô tả"}
            </Text>
          </View>

          

          {/* Recipe list */}
          <View style={adminStyles.recipeListSection}>
            <Text style={adminStyles.sectionTitle}>
              Danh sách công thức (Nhấn để chọn)
            </Text>
            {loadingRecipes ? (
              <View style={adminStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF6B6B" />
              </View>
            ) : (
              <FlatList
                data={categoryRecipes}
                renderItem={renderRecipeItem}
                keyExtractor={(item) => item.id.toString()}
                style={adminStyles.recipeList}
                ListEmptyComponent={
                  <View style={adminStyles.emptyRecipeList}>
                    <Ionicons
                      name="restaurant-outline"
                      size={50}
                      color="#CCC"
                    />
                    <Text style={adminStyles.emptyRecipeText}>
                      Chưa có công thức nào
                    </Text>
                  </View>
                }
              />
            )}
          </View>

          {/* Move section */}
          {selectedRecipes.length > 0 && (
            <View style={adminStyles.moveSection}>
              <Text style={adminStyles.moveSectionTitle}>
                Đã chọn {selectedRecipes.length} công thức
              </Text>

              <Text style={adminStyles.formLabel}>Chuyển đến:</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={adminStyles.categoryPickerScroll}
              >
                {categories
                  .filter((cat) => cat.id !== selectedCategory?.id)
                  .map((cat) => (
                    <TouchableOpacity
                      key={cat.id}
                      style={[
                        adminStyles.categoryPickerItem,
                        destinationCategoryId === cat.id &&
                          adminStyles.categoryPickerItemSelected,
                      ]}
                      onPress={() => setDestinationCategoryId(cat.id)}
                    >
                      <Text
                        style={[
                          adminStyles.categoryPickerText,
                          destinationCategoryId === cat.id &&
                            adminStyles.categoryPickerTextSelected,
                        ]}
                      >
                        {cat.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>

              <TouchableOpacity
                style={[
                  adminStyles.modernMoveButton,
                  (isSaving || destinationCategoryId === 0) &&
                    adminStyles.modernButtonDisabled,
                ]}
                onPress={handleSubmitMove}
                disabled={isSaving || destinationCategoryId === 0}
              >
                {isSaving ? (
                  <ActivityIndicator size="small" color="#FFF" />
                ) : (
                  <>
                    <Ionicons name="swap-horizontal" size={20} color="#FFF" />
                    <Text style={adminStyles.modernMoveButtonText}>
                      Chuyển ngay
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          )}
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
            placeholder="Tìm kiếm danh mục..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <TouchableOpacity
          style={adminStyles.modernCreateButton}
          onPress={handleCreate}
        >
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Category list */}
      {loading ? (
        <View style={adminStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
        </View>
      ) : (
        <FlatList
          data={filteredCategories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={adminStyles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#FF6B6B"]}
            />
          }
          ListEmptyComponent={
            <View style={adminStyles.emptyContainer}>
              <Ionicons name="folder-open-outline" size={80} color="#CCC" />
              <Text style={adminStyles.emptyText}>Không tìm thấy danh mục</Text>
            </View>
          }
        />
      )}

      {/* Modals */}
      {renderFormModal(
        showCreateModal,
        () => setShowCreateModal(false),
        handleSubmitCreate,
        "Tạo danh mục mới"
      )}

      {renderFormModal(
        showEditModal,
        () => setShowEditModal(false),
        handleSubmitUpdate,
        "Cập nhật danh mục"
      )}

      {renderDetailModal()}
    </View>
  );
};

export default ManageCategory;
