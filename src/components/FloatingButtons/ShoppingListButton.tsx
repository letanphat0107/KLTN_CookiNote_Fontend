// src/components/FloatingButtons/ShoppingListButton.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
  Animated,
} from "react-native";
import { floatingStyles } from "./styles";
import { useAppSelector } from "../../store/hooks";
import {
  getShoppingList,
  addShoppingListItem,
  removeShoppingListItem,
} from "../../services/shoppingListService";

interface ShoppingListButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  navigation?: any;
}

interface ShoppingListItem {
  id: number;
  ingredient: string;
  quantity: string;
  checked: boolean;
  isFromRecipe: boolean;
}

interface ShoppingListGroup {
  recipeId: number | null;
  recipeTitle: string;
  recipeImageUrl: string | null;
  isRecipeDeleted: boolean | null;
  items: ShoppingListItem[];
}

const ShoppingListButton: React.FC<ShoppingListButtonProps> = ({
  isOpen,
  onToggle,
  navigation,
}) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [shoppingListGroups, setShoppingListGroups] = useState<
    ShoppingListGroup[]
  >([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Form state
  const [newIngredient, setNewIngredient] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // Animation
  const scaleAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadShoppingList();
    }
  }, [isOpen, isAuthenticated]);

  const loadShoppingList = async () => {
    setIsLoading(true);
    try {
      const response = await getShoppingList();
      console.log("Shopping list response:", response);

      setShoppingListGroups(response.groups);
      setTotalItems(response.totalItems);
    } catch (error) {
      console.error("Error loading shopping list:", error);
      Alert.alert("Lỗi", "Không thể tải danh sách mua sắm");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = async () => {
    if (!newIngredient.trim() || !newQuantity.trim()) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setIsAdding(true);
    try {
      const success = await addShoppingListItem({
        ingredient: newIngredient.trim(),
        quantity: newQuantity.trim(),
      });

      if (success) {
        setNewIngredient("");
        setNewQuantity("");
        setShowAddForm(false);
        await loadShoppingList();
        Alert.alert("Thành công", "Đã thêm vào danh sách mua sắm");
      } else {
        Alert.alert("Lỗi", "Không thể thêm vào danh sách mua sắm");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi thêm món đồ");
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveItem = async (itemId: number) => {
    try {
      const success = await removeShoppingListItem(itemId);
      if (success) {
        await loadShoppingList();
        Alert.alert("Thành công", "Đã xóa khỏi danh sách");
      } else {
        Alert.alert("Lỗi", "Không thể xóa món đồ");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa");
    }
  };

  const handleToggleItem = async (itemId: number, currentChecked: boolean) => {
    try {
      // Optimistically update UI
      setShoppingListGroups((prev) =>
        prev.map((group) => ({
          ...group,
          items: group.items.map((item) =>
            item.id === itemId ? { ...item, checked: !currentChecked } : item
          ),
        }))
      );

      // Call API to update on server (if API exists)
      // const success = await toggleShoppingListItem(itemId, !currentChecked);
      // if (!success) {
      //   // Revert on failure
      //   setShoppingListGroups(prev =>
      //     prev.map(group => ({
      //       ...group,
      //       items: group.items.map(item =>
      //         item.id === itemId
      //           ? { ...item, checked: currentChecked }
      //           : item
      //       )
      //     }))
      //   );
      // }
    } catch (error) {
      console.error("Error toggling item:", error);
      // Revert on error
      setShoppingListGroups((prev) =>
        prev.map((group) => ({
          ...group,
          items: group.items.map((item) =>
            item.id === itemId ? { ...item, checked: currentChecked } : item
          ),
        }))
      );
    }
  };

  const handleButtonPress = () => {
    if (!isAuthenticated) {
      Alert.alert(
        "Yêu cầu đăng nhập",
        "Vui lòng đăng nhập để sử dụng danh sách mua sắm",
        [
          { text: "Hủy", style: "cancel" },
          { text: "Đăng nhập", onPress: () => navigation?.navigate("Login") },
        ]
      );
      return;
    }

    // Animation effect
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onToggle();
  };

  const renderGroupHeader = (group: ShoppingListGroup) => (
    <View style={floatingStyles.groupHeader}>
      <View style={floatingStyles.groupTitleContainer}>
        <Text style={floatingStyles.groupIcon}>
          {group.recipeId ? "📝" : "🛒"}
        </Text>
        <Text style={floatingStyles.groupTitle} numberOfLines={2}>
          {group.recipeTitle}
        </Text>
      </View>
      <Text style={floatingStyles.groupItemCount}>
        {group.items.length} món
      </Text>
    </View>
  );

  const renderShoppingItem = (item: ShoppingListItem) => (
    <View key={item.id} style={floatingStyles.shoppingListItem}>
      {/* Checkbox */}
      <TouchableOpacity
        style={[
          floatingStyles.checkbox,
          item.checked && floatingStyles.checkboxChecked,
        ]}
        onPress={() => handleToggleItem(item.id, item.checked)}
      >
        {item.checked && <Text style={floatingStyles.checkboxIcon}>✓</Text>}
      </TouchableOpacity>

      {/* Item Info */}
      <View
        style={[
          floatingStyles.itemInfo,
          item.checked && floatingStyles.itemInfoChecked,
        ]}
      >
        <Text
          style={[
            floatingStyles.itemName,
            item.checked && floatingStyles.itemNameChecked,
          ]}
        >
          {item.ingredient}
        </Text>
        <Text
          style={[
            floatingStyles.itemQuantity,
            item.checked && floatingStyles.itemQuantityChecked,
          ]}
        >
          {item.quantity}
        </Text>
        {item.isFromRecipe && (
          <Text style={floatingStyles.recipeTag}>📝 Từ công thức</Text>
        )}
      </View>

      {/* Remove Button */}
      <TouchableOpacity
        style={floatingStyles.removeItemButton}
        onPress={() => handleRemoveItem(item.id)}
      >
        <Text style={floatingStyles.removeItemText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  const renderShoppingListModal = () => (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="slide"
      onRequestClose={onToggle}
    >
      <View style={floatingStyles.modalOverlay}>
        <View style={floatingStyles.shoppingListModal}>
          {/* Header */}
          <View style={floatingStyles.modalHeader}>
            <Text style={floatingStyles.modalTitle}>
              🛒 Danh sách mua sắm ({totalItems})
            </Text>
            <TouchableOpacity onPress={onToggle}>
              <Text style={floatingStyles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Shopping List Content */}
          <ScrollView
            style={floatingStyles.shoppingListContent}
            showsVerticalScrollIndicator={false}
          >
            {isLoading ? (
              <View style={floatingStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF6B35" />
                <Text style={floatingStyles.loadingText}>Đang tải...</Text>
              </View>
            ) : totalItems === 0 ? (
              <View style={floatingStyles.emptyContainer}>
                <Text style={floatingStyles.emptyIcon}>🛒</Text>
                <Text style={floatingStyles.emptyTitle}>Danh sách trống</Text>
                <Text style={floatingStyles.emptyDescription}>
                  Thêm nguyên liệu để bắt đầu mua sắm!
                </Text>
              </View>
            ) : (
              shoppingListGroups.map((group, groupIndex) => (
                <View
                  key={`group-${groupIndex}`}
                  style={floatingStyles.shoppingGroup}
                >
                  {/* Group Header */}
                  {renderGroupHeader(group)}

                  {/* Group Items */}
                  <View style={floatingStyles.groupItems}>
                    {group.items.map(renderShoppingItem)}
                  </View>
                </View>
              ))
            )}
          </ScrollView>

          {/* Add Button */}
          {!showAddForm && (
            <TouchableOpacity
              style={floatingStyles.showAddFormButton}
              onPress={() => setShowAddForm(true)}
            >
              <Text style={floatingStyles.showAddFormButtonText}>
                + Thêm nguyên liệu
              </Text>
            </TouchableOpacity>
          )}

          {/* Add Item Form */}
          {showAddForm && (
            <View style={floatingStyles.addFormContainer}>
              <TextInput
                style={floatingStyles.input}
                placeholder="Nguyên liệu (VD: Nước cốt dừa)"
                value={newIngredient}
                onChangeText={setNewIngredient}
                placeholderTextColor="#999"
              />
              <TextInput
                style={floatingStyles.input}
                placeholder="Số lượng (VD: 90 ml)"
                value={newQuantity}
                onChangeText={setNewQuantity}
                placeholderTextColor="#999"
              />
              <View style={floatingStyles.formButtons}>
                <TouchableOpacity
                  style={floatingStyles.cancelButton}
                  onPress={() => {
                    setShowAddForm(false);
                    setNewIngredient("");
                    setNewQuantity("");
                  }}
                >
                  <Text style={floatingStyles.cancelButtonText}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={floatingStyles.addButton}
                  onPress={handleAddItem}
                  disabled={isAdding}
                >
                  {isAdding ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={floatingStyles.addButtonText}>Thêm</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );

  return (
    <>
      <Animated.View
        style={[
          floatingStyles.floatingButton,
          floatingStyles.shoppingListButton,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <TouchableOpacity onPress={handleButtonPress}>
          <Text style={floatingStyles.buttonIcon}>🛒</Text>
          {totalItems > 0 && (
            <View style={floatingStyles.badge}>
              <Text style={floatingStyles.badgeText}>
                {totalItems > 99 ? "99+" : totalItems}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
      {renderShoppingListModal()}
    </>
  );
};

export default ShoppingListButton;
