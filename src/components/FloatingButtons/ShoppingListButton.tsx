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
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { floatingStyles } from "./styles";
import { useAppSelector } from "../../store/hooks";
import {
  getShoppingList,
  addShoppingListItem,
  removeShoppingListItem,
  toggleShoppingListItemCheck,
  removeShoppingListItemsByRecipe,
  removeCheckedItems,
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
  const [processingItems, setProcessingItems] = useState<Set<number>>(
    new Set()
  );

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

  const handleToggleItem = async (itemId: number, currentChecked: boolean) => {
    if (processingItems.has(itemId)) return;

    setProcessingItems((prev) => new Set(prev).add(itemId));

    try {
      setShoppingListGroups((prev) =>
        prev.map((group) => ({
          ...group,
          items: group.items.map((item) =>
            item.id === itemId ? { ...item, checked: !currentChecked } : item
          ),
        }))
      );

      const success = await toggleShoppingListItemCheck(
        itemId,
        !currentChecked
      );

      if (!success) {
        setShoppingListGroups((prev) =>
          prev.map((group) => ({
            ...group,
            items: group.items.map((item) =>
              item.id === itemId ? { ...item, checked: currentChecked } : item
            ),
          }))
        );
        Alert.alert("Lỗi", "Không thể cập nhật trạng thái mục");
      }
    } catch (error) {
      console.error("Error toggling item:", error);
      setShoppingListGroups((prev) =>
        prev.map((group) => ({
          ...group,
          items: group.items.map((item) =>
            item.id === itemId ? { ...item, checked: currentChecked } : item
          ),
        }))
      );
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi cập nhật");
    } finally {
      setProcessingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const handleRemoveItem = async (itemId: number, recipeId?: number | null) => {
    if (recipeId) {
      Alert.alert(
        "Xóa nguyên liệu",
        "Bạn có chắc chắc không muốn mua món này!",
        [
          { text: "Hủy", style: "cancel" },
          {
            text: "Có",
            onPress: () => removeSingleItem(itemId),
          },
        ]
      );
    } else {
      Alert.alert("Xóa nguyên liệu", "Bạn có chắc muốn xóa nguyên liệu này?", [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => removeSingleItem(itemId),
        },
      ]);
    }
  };

  const removeSingleItem = async (itemId: number) => {
    try {
      const success = await removeShoppingListItem([itemId]);

      if (success) {
        await loadShoppingList();
      } else {
        Alert.alert("Lỗi", "Không thể xóa nguyên liệu");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa");
    }
  };

  const removeRecipeGroup = async (recipeId: number) => {
    try {
      const success = await removeShoppingListItemsByRecipe(recipeId);
      if (success) {
        await loadShoppingList();
        Alert.alert("Thành công", "Đã xóa toàn bộ nguyên liệu của công thức");
      } else {
        Alert.alert("Lỗi", "Không thể xóa nguyên liệu của công thức");
      }
    } catch (error) {
      console.error("Error removing recipe items:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa");
    }
  };

  const handleClearCheckedItems = () => {
    const checkedCount = shoppingListGroups.reduce((count, group) => {
      return count + group.items.filter((item) => item.checked).length;
    }, 0);

    if (checkedCount === 0) {
      Alert.alert("Thông báo", "Không có nguyên liệu nào đã được chọn");
      return;
    }

    Alert.alert(
      "Xóa nguyên liệu đã mua",
      `Bạn có chắc muốn xóa ${checkedCount} nguyên liệu đã được chọn?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            try {
              const success = await removeCheckedItems();
              if (success) {
                await loadShoppingList();
                Alert.alert("Thành công", "Đã xóa các nguyên liệu đã mua");
              } else {
                Alert.alert("Lỗi", "Không thể xóa nguyên liệu đã chọn");
              }
            } catch (error) {
              console.error("Error removing checked items:", error);
              Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa");
            }
          },
        },
      ]
    );
  };

  // NEW: Shopee Integration Function
  const handleBuyOnShopee = async (ingredientName: string) => {
    try {
      // Format ingredient name for URL (replace spaces with +)
      const keyword = encodeURIComponent(
        ingredientName.trim().replace(/\s+/g, "+")
      );
      const shopeeUrl = `https://shopee.vn/search?keyword=${keyword}`;

      // Check if URL can be opened
      const supported = await Linking.canOpenURL(shopeeUrl);

      if (supported) {
        await Linking.openURL(shopeeUrl);
      } else {
        Alert.alert("Lỗi", "Không thể mở Shopee. Vui lòng kiểm tra lại.");
      }
    } catch (error) {
      console.error("Error opening Shopee:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi mở Shopee");
    }
  };

  // NEW: Buy all items in a group on Shopee
  const handleBuyGroupOnShopee = async (group: ShoppingListGroup) => {
    try {
      // Combine all unchecked items from the group
      const uncheckedItems = group.items
        .filter((item) => !item.checked)
        .map((item) => item.ingredient)
        .join(" ");

      if (!uncheckedItems.trim()) {
        Alert.alert("Thông báo", "Tất cả nguyên liệu đã được mua");
        return;
      }

      const keyword = encodeURIComponent(
        uncheckedItems.trim().replace(/\s+/g, "+")
      );
      const shopeeUrl = `https://shopee.vn/search?keyword=${keyword}`;

      const supported = await Linking.canOpenURL(shopeeUrl);

      if (supported) {
        await Linking.openURL(shopeeUrl);
      } else {
        Alert.alert("Lỗi", "Không thể mở Shopee. Vui lòng kiểm tra lại.");
      }
    } catch (error) {
      console.error("Error opening Shopee:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi mở Shopee");
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

  const renderGroupHeader = (group: ShoppingListGroup) => {
    const checkedCount = group.items.filter((item) => item.checked).length;
    const totalCount = group.items.length;
    const hasUncheckedItems = checkedCount < totalCount;

    return (
      <View style={floatingStyles.groupHeader}>
        <View style={floatingStyles.groupTitleContainer}>
          <Text style={floatingStyles.groupIcon}>
            {group.recipeId ? "📝" : "🛒"}
          </Text>
          <Text style={floatingStyles.groupTitle} numberOfLines={2}>
            {group.recipeTitle}
          </Text>
        </View>
        <View style={floatingStyles.groupActions}>
          <Text style={floatingStyles.groupItemCount}>
            {checkedCount}/{totalCount} nguyên liệu
          </Text>
          {/* NEW: Buy all button for group */}
          {hasUncheckedItems && (
            <TouchableOpacity
              style={floatingStyles.shopeeGroupButton}
              onPress={() => handleBuyGroupOnShopee(group)}
            >
              <Ionicons name="cart-outline" size={16} color="#EE4D2D" />
            </TouchableOpacity>
          )}
          {group.recipeId && (
            <TouchableOpacity
              style={floatingStyles.removeGroupButton}
              onPress={() => removeRecipeGroup(group.recipeId!)}
            >
              <Text style={floatingStyles.removeGroupText}>🗑️</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderShoppingItem = (
    item: ShoppingListItem,
    group: ShoppingListGroup
  ) => {
    const isProcessing = processingItems.has(item.id);

    return (
      <View key={item.id} style={floatingStyles.shoppingListItem}>
        {/* Checkbox */}
        <TouchableOpacity
          style={[
            floatingStyles.checkbox,
            item.checked && floatingStyles.checkboxChecked,
            isProcessing && floatingStyles.checkboxProcessing,
          ]}
          onPress={() => handleToggleItem(item.id, item.checked)}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator size="small" color="#FF6B35" />
          ) : (
            item.checked && <Text style={floatingStyles.checkboxIcon}>✓</Text>
          )}
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

        {/* NEW: Shopee Buy Button */}
        {!item.checked && (
          <TouchableOpacity
            style={floatingStyles.shopeeButton}
            onPress={() => handleBuyOnShopee(item.ingredient)}
          >
            <Ionicons name="cart" size={18} color="#EE4D2D" />
          </TouchableOpacity>
        )}

        {/* Remove Button */}
        <TouchableOpacity
          style={floatingStyles.removeItemButton}
          onPress={() => handleRemoveItem(item.id, group.recipeId)}
        >
          <Text style={floatingStyles.removeItemText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderShoppingListModal = () => {
    const checkedItemsCount = shoppingListGroups.reduce((count, group) => {
      return count + group.items.filter((item) => item.checked).length;
    }, 0);

    return (
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
                Danh sách mua sắm ({totalItems})
              </Text>
              <View style={floatingStyles.headerActions}>
                {checkedItemsCount > 0 && (
                  <TouchableOpacity
                    style={floatingStyles.clearCheckedButton}
                    onPress={handleClearCheckedItems}
                  >
                    <Text style={floatingStyles.clearCheckedText}>
                      Xóa đã mua ({checkedItemsCount})
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={onToggle}>
                  <Text style={floatingStyles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>
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
                    {renderGroupHeader(group)}
                    <View style={floatingStyles.groupItems}>
                      {group.items.map((item) =>
                        renderShoppingItem(item, group)
                      )}
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
  };

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
          <Text style={floatingStyles.buttonIcon}>📃</Text>
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
