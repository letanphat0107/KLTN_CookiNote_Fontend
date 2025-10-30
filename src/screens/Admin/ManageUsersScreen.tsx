import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import { useAppSelector } from "../../store/hooks";
import adminService, {
  AdminUser,
  AdminUserDetail,
} from "../../services/adminService";
import { adminStyles } from "./styles";

const ManageUsersScreen = () => {
  const { tokens } = useAppSelector((state) => state.auth);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<AdminUserDetail | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);

  const fetchUsers = async (pageNum: number = 0, isRefresh = false) => {
    if (!tokens?.accessToken) return;

    try {
      if (isRefresh) setRefreshing(true);
      else if (pageNum === 0) setLoading(true);

      const data = await adminService.getUsers(
        tokens.accessToken,
        pageNum,
        10,
        search,
        selectedRole
      );

      if (isRefresh || pageNum === 0) {
        setUsers(data.users);
      } else {
        setUsers((prev) => [...prev, ...data.users]);
      }

      setTotalPages(data.totalPages);
      setPage(pageNum);
    } catch (error) {
      console.error("Error fetching users:", error);
      Alert.alert("Lỗi", "Không thể tải danh sách người dùng");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers(0);
  }, [search, selectedRole]);

  const onRefresh = () => {
    fetchUsers(0, true);
  };

  const loadMore = () => {
    if (page < totalPages - 1 && !loading) {
      fetchUsers(page + 1);
    }
  };

  const handleUserPress = async (user: AdminUser) => {
    if (!tokens?.accessToken) return;

    try {
      const detail = await adminService.getUserDetail(
        tokens.accessToken,
        user.userId
      );
      setSelectedUser(detail);
      setModalVisible(true);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể tải thông tin người dùng");
    }
  };

  const handleToggleStatus = async (userId: number, currentStatus: boolean) => {
    if (!tokens?.accessToken) return;

    const action = currentStatus ? "vô hiệu hóa" : "kích hoạt";
    Alert.alert("Xác nhận", `Bạn có chắc muốn ${action} tài khoản này?`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xác nhận",
        onPress: async () => {
          try {
            if (currentStatus) {
              await adminService.disableUser(tokens.accessToken, userId);
            } else {
              await adminService.enableUser(tokens.accessToken, userId);
            }
            Alert.alert("Thành công", `Đã ${action} tài khoản`);
            setModalVisible(false);
            fetchUsers(0, true);
          } catch (error) {
            Alert.alert("Lỗi", `Không thể ${action} tài khoản`);
          }
        },
      },
    ]);
  };

  const renderUserItem = ({ item }: { item: AdminUser }) => (
    <TouchableOpacity
      style={adminStyles.userCard}
      onPress={() => handleUserPress(item)}
    >
      <Image
        source={{
          uri: item.avatarUrl || "https://via.placeholder.com/50",
        }}
        style={adminStyles.userAvatar}
      />
      <View style={adminStyles.userInfo}>
        <Text style={adminStyles.userName}>{item.displayName}</Text>
        <Text style={adminStyles.userEmail}>{item.email}</Text>
        <View style={adminStyles.userMeta}>
          <View
            style={[
              adminStyles.roleBadge,
              {
                backgroundColor: item.role === "ADMIN" ? "#FF6B6B" : "#4CAF50",
              },
            ]}
          >
            <Text style={adminStyles.roleBadgeText}>{item.role}</Text>
          </View>
          <View
            style={[
              adminStyles.statusBadge,
              {
                backgroundColor: item.enabled ? "#4CAF50" : "#999",
              },
            ]}
          >
            <Text style={adminStyles.statusBadgeText}>
              {item.enabled ? "Hoạt động" : "Vô hiệu"}
            </Text>
          </View>
        </View>
      </View>
      <Text style={{ fontSize: 20 }}>➡️</Text>
    </TouchableOpacity>
  );

  return (
    <View style={adminStyles.container}>
      {/* Search and Filter */}
      <View style={adminStyles.searchContainer}>
        <Text style={{ fontSize: 20 }}>🔍</Text>
        <TextInput
          style={adminStyles.searchInput}
          placeholder="Tìm kiếm người dùng..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={adminStyles.filterContainer}>
        <TouchableOpacity
          style={[
            adminStyles.filterButton,
            !selectedRole && adminStyles.filterButtonActive,
          ]}
          onPress={() => setSelectedRole("")}
        >
          <Text
            style={[
              adminStyles.filterButtonText,
              !selectedRole && adminStyles.filterButtonTextActive,
            ]}
          >
            Tất cả
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            adminStyles.filterButton,
            selectedRole === "USER" && adminStyles.filterButtonActive,
          ]}
          onPress={() => setSelectedRole("USER")}
        >
          <Text
            style={[
              adminStyles.filterButtonText,
              selectedRole === "USER" && adminStyles.filterButtonTextActive,
            ]}
          >
            Người dùng
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            adminStyles.filterButton,
            selectedRole === "ADMIN" && adminStyles.filterButtonActive,
          ]}
          onPress={() => setSelectedRole("ADMIN")}
        >
          <Text
            style={[
              adminStyles.filterButtonText,
              selectedRole === "ADMIN" && adminStyles.filterButtonTextActive,
            ]}
          >
            Quản trị
          </Text>
        </TouchableOpacity>
      </View>

      {/* User List */}
      {loading && page === 0 ? (
        <View style={adminStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
        </View>
      ) : (
        <FlatList
          data={users}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.userId.toString()}
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
              <Text style={{ fontSize: 40 }}>👤❌</Text>
              <Text style={adminStyles.emptyText}>
                Không tìm thấy người dùng
              </Text>
            </View>
          }
        />
      )}

      {/* User Detail Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={adminStyles.modalOverlay}>
          <View style={adminStyles.modalContent}>
            {selectedUser && (
              <>
                <View style={adminStyles.modalHeader}>
                  <Text style={adminStyles.modalTitle}>
                    Chi tiết người dùng
                  </Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text style={{ fontSize: 20 }}>✖️</Text>
                  </TouchableOpacity>
                </View>

                <View style={adminStyles.modalBody}>
                  <Image
                    source={{
                      uri:
                        selectedUser.avatarUrl ||
                        "https://via.placeholder.com/100",
                    }}
                    style={adminStyles.modalAvatar}
                  />
                  <Text style={adminStyles.modalName}>
                    {selectedUser.displayName}
                  </Text>
                  <Text style={adminStyles.modalEmail}>
                    {selectedUser.email}
                  </Text>

                  <View style={adminStyles.statsGrid}>
                    <View style={adminStyles.statItem}>
                      <Text style={adminStyles.statValue}>
                        {selectedUser.stats.totalRecipes}
                      </Text>
                      <Text style={adminStyles.statLabel}>Món ăn</Text>
                    </View>
                    <View style={adminStyles.statItem}>
                      <Text style={adminStyles.statValue}>
                        {selectedUser.stats.totalFavorites}
                      </Text>
                      <Text style={adminStyles.statLabel}>Yêu thích</Text>
                    </View>
                    <View style={adminStyles.statItem}>
                      <Text style={adminStyles.statValue}>
                        {selectedUser.stats.totalViews}
                      </Text>
                      <Text style={adminStyles.statLabel}>Lượt xem</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={[
                      adminStyles.toggleButton,
                      {
                        backgroundColor: selectedUser.enabled
                          ? "#f44336"
                          : "#4CAF50",
                      },
                    ]}
                    onPress={() =>
                      handleToggleStatus(
                        selectedUser.userId,
                        selectedUser.enabled
                      )
                    }
                  >
                    <Text style={{ fontSize: 20 }}>
                      {selectedUser.enabled ? "🚫" : "✅"}
                    </Text>
                    <Text style={adminStyles.toggleButtonText}>
                      {selectedUser.enabled ? "Vô hiệu hóa" : "Kích hoạt"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ManageUsersScreen;
