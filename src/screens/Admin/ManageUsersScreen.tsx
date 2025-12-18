import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
  TextInput,
  Modal,
  Image,
  ScrollView,
} from "react-native";
import { useAppSelector } from "../../store/hooks";
import adminService, { AdminUser } from "../../services/adminService";
import { adminStyles } from "./styles";
import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

const ManageUsersScreen = () => {
  const navigation = useNavigation<any>();
  const { tokens } = useAppSelector((state) => state.auth);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("");

  // Detail Modal
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [userRecipes, setUserRecipes] = useState<any[]>([]);
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [loadingMoreRecipes, setLoadingMoreRecipes] = useState(false);
  const [recipesPage, setRecipesPage] = useState(0);
  const [recipesTotalPages, setRecipesTotalPages] = useState(0);
  const [recipesHasNext, setRecipesHasNext] = useState(false);
  const [processingAction, setProcessingAction] = useState(false);

  useEffect(() => {
    fetchUsers(0);
  }, []);

  useEffect(() => {
    let result = [...users];

    if (search.trim()) {
      const searchLower = search.toLowerCase().trim();
      result = result.filter(
        (user) =>
          user.username.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.displayName.toLowerCase().includes(searchLower)
      );
    }

    if (selectedRole) {
      result = result.filter((user) => user.role === selectedRole);
    }

    setFilteredUsers(result);
  }, [users, search, selectedRole]);

  const fetchUsers = async (pageNum: number = 0, isRefresh = false) => {
    if (!tokens?.accessToken) return;

    try {
      if (isRefresh) setRefreshing(true);
      else if (pageNum === 0) setLoading(true);

      const data = await adminService.getUsers(pageNum, 12);

      if (isRefresh || pageNum === 0) {
        setUsers(data.items);
      } else {
        setUsers((prev) => [...prev, ...data.items]);
      }

      setTotalPages(data.totalPages);
      setPage(data.page);
    } catch (error) {
      console.error("Error fetching users:", error);
      Alert.alert("Lỗi", "Không thể tải danh sách người dùng");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchUserRecipes = async (userId: number, pageNum: number = 0, isLoadMore: boolean = false) => {
    try {
      if (isLoadMore) {
        setLoadingMoreRecipes(true);
      } else {
        setLoadingRecipes(true);
        setUserRecipes([]);
      }

      const data = await adminService.getUserRecipes(userId, pageNum, 10);
      
      if (isLoadMore) {
        setUserRecipes((prev) => [...prev, ...data.items]);
      } else {
        setUserRecipes(data.items);
      }

      setRecipesPage(pageNum);
      setRecipesTotalPages(data.totalPages);
      setRecipesHasNext(data.hasNext);
    } catch (error) {
      console.error("Error fetching user recipes:", error);
      Alert.alert("Lỗi", "Không thể tải danh sách công thức");
    } finally {
      setLoadingRecipes(false);
      setLoadingMoreRecipes(false);
    }
  };

  const loadMoreRecipes = () => {
    if (recipesHasNext && !loadingMoreRecipes && selectedUser) {
      fetchUserRecipes(selectedUser.userId, recipesPage + 1, true);
    }
  };

  const onRefresh = () => {
    fetchUsers(0, true);
  };

  const loadMore = () => {
    if (page < totalPages - 1 && !loading) {
      fetchUsers(page + 1);
    }
  };

  const handleUserPress = async (user: AdminUser) => {
    setSelectedUser(user);
    setUserRecipes([]);
    setRecipesPage(0);
    setRecipesTotalPages(0);
    setRecipesHasNext(false);
    setShowDetailModal(true);
    await fetchUserRecipes(user.userId, 0, false);
  };

  const handleToggleUserStatus = async (user: AdminUser) => {
    const action = user.enabled ? "vô hiệu hóa" : "kích hoạt";
    Alert.alert(
      "Xác nhận",
      `Bạn có chắc muốn ${action} tài khoản "${user.username}"?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xác nhận",
          onPress: async () => {
            setProcessingAction(true);
            try {
              if (user.enabled) {
                await adminService.disableUser(user.userId);
                Alert.alert("Thành công", "Đã vô hiệu hóa tài khoản");
              } else {
                const result = await adminService.enableUser(user.userId);
                if (result.success) {
                  Alert.alert("Thành công", "Đã kích hoạt tài khoản");
                } else {
                  Alert.alert(
                    "Lỗi",
                    result.message || "Không thể kích hoạt tài khoản"
                  );
                  return;
                }
              }
              setShowDetailModal(false);
              fetchUsers(0, true);
            } catch (error: any) {
              Alert.alert(
                "Lỗi",
                error.message || "Không thể thực hiện thao tác"
              );
            } finally {
              setProcessingAction(false);
            }
          },
        },
      ]
    );
  };

  const handleViewRecipeDetail = (recipeId: number) => {
    setShowDetailModal(false);
    navigation.navigate("RecipeDetail", { recipeId });
  };

  const handleEditRecipe = (recipeId: number) => {
    setShowDetailModal(false);
    navigation.navigate("EditRecipe", { recipeId });
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
            
            // Refresh user's recipes from first page
            if (selectedUser) {
              await fetchUserRecipes(selectedUser.userId, 0, false);
            }
          } catch (error: any) {
            Alert.alert("Lỗi", error.message || "Không thể xóa món ăn");
          }
        },
      },
    ]);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "#E74C3C";
      case "USER":
        return "#3498DB";
      default:
        return "#95A5A6";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "shield-checkmark";
      case "USER":
        return "person";
      default:
        return "help";
    }
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
        return "TB";
      case "HARD":
        return "Khó";
      default:
        return difficulty;
    }
  };

  const renderUserItem = ({ item }: { item: AdminUser }) => (
    <TouchableOpacity
      style={adminStyles.modernUserCard}
      onPress={() => handleUserPress(item)}
      activeOpacity={0.7}
    >
      <View style={adminStyles.modernUserHeader}>
        <View style={adminStyles.modernUserAvatarWrapper}>
          {item.avatarUrl ? (
            <Image
              source={{ uri: item.avatarUrl }}
              style={adminStyles.modernUserAvatar}
            />
          ) : (
            <View style={adminStyles.modernUserAvatarPlaceholder}>
              <Ionicons name="person" size={32} color="#95A5A6" />
            </View>
          )}
          {!item.enabled && (
            <View style={adminStyles.modernUserDisabledBadge}>
              <Ionicons name="ban" size={16} color="#FFF" />
            </View>
          )}
        </View>

        <View style={adminStyles.modernUserInfo}>
          <View style={adminStyles.modernUserNameRow}>
            <Text style={adminStyles.modernUserDisplayName} numberOfLines={1}>
              {item.displayName}
            </Text>
            {item.emailVerified && (
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
            )}
          </View>
          <Text style={adminStyles.modernUserUsername}>@{item.username}</Text>
          <Text style={adminStyles.modernUserEmail} numberOfLines={1}>
            {item.email}
          </Text>
        </View>

        <View
          style={[
            adminStyles.modernRoleBadge,
            { backgroundColor: getRoleColor(item.role) },
          ]}
        >
          <Ionicons
            name={getRoleIcon(item.role) as any}
            size={14}
            color="#FFF"
          />
          <Text style={adminStyles.modernRoleBadgeText}>{item.role}</Text>
        </View>
      </View>

      <View style={adminStyles.modernUserStats}>
        <View style={adminStyles.modernUserStat}>
          <Ionicons name="restaurant-outline" size={18} color="#FF6B6B" />
          <Text style={adminStyles.modernUserStatValue}>
            {item.recipeCount || 0}
          </Text>
          <Text style={adminStyles.modernUserStatLabel}>Công thức</Text>
        </View>

        <View style={adminStyles.modernUserStat}>
          <Ionicons name="heart-outline" size={18} color="#FF6B6B" />
          <Text style={adminStyles.modernUserStatValue}>
            {item.favoriteCount || 0}
          </Text>
          <Text style={adminStyles.modernUserStatLabel}>Yêu thích</Text>
        </View>

        <View style={adminStyles.modernUserStat}>
          <Ionicons
            name={
              item.enabled ? "checkmark-circle-outline" : "close-circle-outline"
            }
            size={18}
            color={item.enabled ? "#4CAF50" : "#E74C3C"}
          />
          <Text
            style={[
              adminStyles.modernUserStatValue,
              { color: item.enabled ? "#4CAF50" : "#E74C3C" },
            ]}
          >
            {item.enabled ? "Hoạt động" : "Vô hiệu"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderRecipeItem = ({ item }: { item: any }) => (
    <View style={adminStyles.modernUserRecipeCardUser}>
      <Image
        source={{
          uri: item.imageUrl || "https://thecrites.com/sites/all/modules/cookbook/theme/images/default-recipe-big.png",
        }}
        style={adminStyles.modernUserRecipeImage}
      />

      <View style={adminStyles.modernUserRecipeContentWrapper}>
        <View style={adminStyles.modernUserRecipeInfo}>
          <Text style={adminStyles.modernUserRecipeTitle} numberOfLines={2}>
            {item.title}
          </Text>

          <View style={adminStyles.modernUserRecipeMeta}>
            <View
              style={[
                adminStyles.modernUserRecipeDifficulty,
                { backgroundColor: getDifficultyColor(item.difficulty) },
              ]}
            >
              <Text style={adminStyles.modernUserRecipeDifficultyText}>
                {getDifficultyText(item.difficulty)}
              </Text>
            </View>

            <View style={adminStyles.modernUserRecipeMetaItem}>
              <Ionicons name="eye-outline" size={14} color="#7F8C8D" />
              <Text style={adminStyles.modernUserRecipeMetaText}>
                {item.view}
              </Text>
            </View>

            <Text style={adminStyles.modernUserRecipeDate}>
              {new Date(item.createdAt).toLocaleDateString("vi-VN")}
            </Text>
          </View>
        </View>

        {/* Recipe Actions */}
        <View style={adminStyles.modernRecipeActionsRow}>
          <TouchableOpacity
            style={[adminStyles.modernActionButtonUser, { backgroundColor: '#E3F2FD' }]}
            onPress={() => handleViewRecipeDetail(item.id)}
          >
            <Ionicons name="eye-outline" size={18} color="#4A90E2" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[adminStyles.modernActionButtonUser, { backgroundColor: '#E8F5E9' }]}
            onPress={() => handleEditRecipe(item.id)}
          >
            <Ionicons name="create-outline" size={18} color="#4CAF50" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[adminStyles.modernActionButtonUser, { backgroundColor: '#FFEBEE' }]}
            onPress={() => handleDeleteRecipe(item.id, item.title)}
          >
            <Ionicons name="trash-outline" size={18} color="#E74C3C" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderRecipeFooter = () => {
    if (!recipesHasNext) return null;

    return (
      <View style={adminStyles.loadMoreContainer}>
        {loadingMoreRecipes ? (
          <ActivityIndicator size="small" color="#FF6B6B" />
        ) : (
          <TouchableOpacity
            style={adminStyles.loadMoreButton}
            onPress={loadMoreRecipes}
          >
            <Ionicons name="chevron-down-outline" size={20} color="#FF6B6B" />
            <Text style={adminStyles.loadMoreButtonText}>
              Kéo xuống để xem thêm
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderDetailModal = () => (
    <Modal visible={showDetailModal} transparent animationType="slide">
      <View style={adminStyles.modernModalOverlay1}>
        <View style={adminStyles.modernModalContainer}>
          {/* Header */}
          <View style={adminStyles.modernModalHeader1}>
            <View style={{ flex: 1 }}>
              <Text style={adminStyles.modernModalTitle1} numberOfLines={1}>
                {selectedUser?.displayName}
              </Text>
              <Text style={adminStyles.modernModalSubtitle}>
                @{selectedUser?.username}
              </Text>
            </View>
            <TouchableOpacity onPress={() => setShowDetailModal(false)}>
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>
          </View>

          {/* User Info */}
          <View style={adminStyles.modernUserDetailInfo}>
            <View style={adminStyles.modernUserDetailAvatarWrapper}>
              {selectedUser?.avatarUrl ? (
                <Image
                  source={{ uri: selectedUser.avatarUrl }}
                  style={adminStyles.modernUserDetailAvatar}
                />
              ) : (
                <View style={adminStyles.modernUserDetailAvatarPlaceholder}>
                  <Ionicons name="person" size={48} color="#95A5A6" />
                </View>
              )}
            </View>

            <View style={adminStyles.modernUserDetailStats}>
              <View style={adminStyles.modernUserDetailStatItem}>
                <Ionicons name="mail-outline" size={18} color="#7F8C8D" />
                <Text style={adminStyles.modernUserDetailStatText}>
                  {selectedUser?.email}
                </Text>
              </View>

              <View style={adminStyles.modernUserDetailStatItem}>
                <Ionicons
                  name={getRoleIcon(selectedUser?.role || "") as any}
                  size={18}
                  color={getRoleColor(selectedUser?.role || "")}
                />
                <Text
                  style={[
                    adminStyles.modernUserDetailStatText,
                    { color: getRoleColor(selectedUser?.role || "") },
                  ]}
                >
                  {selectedUser?.role}
                </Text>
              </View>

              <View style={adminStyles.modernUserDetailStatItem}>
                <Ionicons
                  name={
                    selectedUser?.enabled ? "checkmark-circle" : "close-circle"
                  }
                  size={18}
                  color={selectedUser?.enabled ? "#4CAF50" : "#E74C3C"}
                />
                <Text
                  style={[
                    adminStyles.modernUserDetailStatText,
                    {
                      color: selectedUser?.enabled ? "#4CAF50" : "#E74C3C",
                    },
                  ]}
                >
                  {selectedUser?.enabled ? "Đang hoạt động" : "Đã vô hiệu hóa"}
                </Text>
              </View>

              {selectedUser?.emailVerified && (
                <View style={adminStyles.modernUserDetailStatItem}>
                  <Ionicons name="shield-checkmark" size={18} color="#4CAF50" />
                  <Text style={adminStyles.modernUserDetailStatText}>
                    Email đã xác thực
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Action Button */}
          {selectedUser && (
            <View style={adminStyles.modernUserDetailActions}>
              <TouchableOpacity
                style={[
                  adminStyles.modernToggleButton,
                  selectedUser.enabled
                    ? adminStyles.modernToggleButtonDisable
                    : adminStyles.modernToggleButtonEnable,
                  processingAction && adminStyles.modernButtonDisabled,
                ]}
                onPress={() => handleToggleUserStatus(selectedUser)}
                disabled={processingAction}
              >
                {processingAction ? (
                  <ActivityIndicator size="small" color="#FFF" />
                ) : (
                  <>
                    <Ionicons
                      name={selectedUser.enabled ? "ban" : "checkmark-circle"}
                      size={20}
                      color="#FFF"
                    />
                    <Text style={adminStyles.modernToggleButtonText}>
                      {selectedUser.enabled ? "Vô hiệu hóa" : "Kích hoạt"}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* Recipes Section */}
          <View style={adminStyles.modernUserRecipesSection}>
            <View style={adminStyles.modernSectionHeader}>
              <Text style={adminStyles.modernSectionTitle}>
                <Ionicons name="restaurant-outline" size={20} color="#FF6B6B" />{" "}
                Công thức ({userRecipes.length})
              </Text>
            </View>

            {loadingRecipes ? (
              <View style={adminStyles.modernUserRecipesLoading}>
                <ActivityIndicator size="large" color="#FF6B6B" />
              </View>
            ) : userRecipes.length > 0 ? (
              <FlatList
                data={userRecipes}
                renderItem={renderRecipeItem}
                keyExtractor={(item) => item.id.toString()}
                style={adminStyles.modernUserRecipesList}
                showsVerticalScrollIndicator={false}
                onEndReached={loadMoreRecipes}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderRecipeFooter()}
              />
            ) : (
              <View style={adminStyles.modernUserRecipesEmpty}>
                <Ionicons name="restaurant-outline" size={50} color="#CCC" />
                <Text style={adminStyles.modernUserRecipesEmptyText}>
                  Chưa có công thức nào
                </Text>
              </View>
            )}
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
            placeholder="Tìm kiếm người dùng..."
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Role Filter */}
      <View style={adminStyles.modernFilterContainer}>
        {[
          { key: "", label: "Tất cả", icon: "apps-outline" },
          { key: "ADMIN", label: "Admin", icon: "shield-checkmark" },
          { key: "USER", label: "User", icon: "person" },
        ].map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              adminStyles.modernFilterButton,
              selectedRole === filter.key &&
                adminStyles.modernFilterButtonActive,
            ]}
            onPress={() => setSelectedRole(filter.key)}
          >
            <Ionicons
              name={filter.icon as any}
              size={16}
              color={selectedRole === filter.key ? "#FFFFFF" : "#7F8C8D"}
            />
            <Text
              style={[
                adminStyles.modernFilterButtonText,
                selectedRole === filter.key &&
                  adminStyles.modernFilterButtonTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Users List */}
      {loading && page === 0 ? (
        <View style={adminStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
        </View>
      ) : (
        <FlatList
          data={filteredUsers}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.userId.toString()}
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
              <Ionicons name="people-outline" size={80} color="#CCC" />
              <Text style={adminStyles.emptyText}>
                Không tìm thấy người dùng
              </Text>
            </View>
          }
        />
      )}

      {/* Detail Modal */}
      {renderDetailModal()}
    </View>
  );
};

export default ManageUsersScreen;