

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { logoutUser } from "../../store/authSlice";
import adminService, { DashboardStats } from "../../services/adminService";
import { adminStyles } from "./styles";

// Sử dụng Legacy API để giữ hàm downloadAsync
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';

const AdminDashboardScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { tokens } = useAppSelector((state) => state.auth);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const defaultStats: DashboardStats = {
  totalUsers: 0,
  totalRecipes: 0,
  activeUsers: 0,
  newUsersToday: 0,
};

  const fetchStats = async () => {
    if (!tokens?.accessToken) return;

    try {
      const data = await adminService.getDashboardStats(tokens.accessToken);
      setStats(data);
    } catch (error) {
      setStats(defaultStats);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchStats();
  };

 const handleExportReport = async () => {
  if (!tokens?.accessToken) {
    Alert.alert("Lỗi", "Vui lòng đăng nhập để thực hiện chức năng này.");
    return;
  }

  Alert.alert("Xuất báo cáo", "Bạn có muốn xuất báo cáo người dùng?", [
    { text: "Hủy", style: "cancel" },
    {
      text: "Xuất",
      onPress: async () => {
        let isSuccess = false;
        try {
          // 1. GỌI API & NHẬN URL TẢI XUỐNG
          const fileDownloadUrl = await adminService.exportUserReport(
            tokens.accessToken
          );
          
          if (!fileDownloadUrl) {
              throw new Error("Không nhận được đường dẫn tải tệp từ máy chủ.");
          }

          // 2. TẢI TỆP VỀ THIẾT BỊ
          const fileName = `user_report_${Date.now()}.xlsx`; 
          const fileUri = FileSystem.documentDirectory + fileName; 
          
          Alert.alert("Đang xử lý", "Đang tải báo cáo về thiết bị...", [{ text: "OK" }]);

          // Hàm downloadAsync này không còn bị cảnh báo deprecated nữa!
          const downloadResult = await FileSystem.downloadAsync(
            fileDownloadUrl,
            fileUri
          );

          if (downloadResult.status !== 200) {
            throw new Error(`Tải tệp thất bại: Trạng thái ${downloadResult.status}`);
          }
          
          // 3. CHIA SẺ/MỞ TỆP
          if (await Sharing.isAvailableAsync()) {
              await Sharing.shareAsync(downloadResult.uri);
              Alert.alert("Thành công", `Báo cáo đã được tải về và mở.`);
          } else {
              Alert.alert("Thành công", "Báo cáo đã được tải về. Tính năng chia sẻ không khả dụng.");
          }
          
          isSuccess = true;

        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định.";
          Alert.alert("Lỗi", `Không thể xuất báo cáo: ${errorMessage}`);
        }
      },
    },
  ]);
};

  if (loading) {
    return (
      <View style={adminStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    );
  }

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: async () => {
          try {
            // Dispatch logout thunk
            const result = await dispatch(logoutUser());

            if (
              logoutUser.fulfilled.match(result) ||
              logoutUser.rejected.match(result)
            ) {
              // Navigate to login screen after logout (successful or failed)
              if (navigation) {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" as never }],
                });
              }
            }
          } catch (error) {
            console.error("Logout error:", error);
            // Even if logout fails, still navigate to login
            if (navigation) {
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" as never }],
              });
            }
          }
        },
      },
    ]);
  };

  return (
    <ScrollView
      style={adminStyles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#FF6B6B"]}
        />
      }
    >
      {/* Header */}
      <View style={adminStyles.header}>
        <Text style={adminStyles.headerTitle}>Trang quản trị</Text>
        <Text style={adminStyles.headerSubtitle}>
          Quản lý hệ thống CookiNote
        </Text>
      </View>

      {/* Stats Cards */}
      <View style={adminStyles.statsContainer}>
        <View style={adminStyles.statCard}>
          <Text style={{ fontSize: 28 }}>👥</Text>
          <Text style={adminStyles.statNumber}>{stats?.totalUsers || 0}</Text>
          <Text style={adminStyles.statLabel}>Tổng người dùng</Text>
        </View>

        <View style={adminStyles.statCard}>
          <Text style={{ fontSize: 28 }}>🍲</Text>
          <Text style={adminStyles.statNumber}>{stats?.totalRecipes || 0}</Text>
          <Text style={adminStyles.statLabel}>Tổng món ăn</Text>
        </View>

        <View style={adminStyles.statCard}>
          <Text style={{ fontSize: 28 }}>✅</Text>
          <Text style={adminStyles.statNumber}>{stats?.activeUsers || 0}</Text>
          <Text style={adminStyles.statLabel}>Hoạt động</Text>
        </View>

        <View style={adminStyles.statCard}>
          <Text style={{ fontSize: 28 }}>🆕</Text>
          <Text style={adminStyles.statNumber}>
            {stats?.newUsersToday || 0}
          </Text>
          <Text style={adminStyles.statLabel}>Mới hôm nay</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={adminStyles.section}>
        <Text style={adminStyles.sectionTitle}>Thao tác nhanh</Text>

        <TouchableOpacity
          style={adminStyles.actionButton}
          onPress={handleExportReport}
        >
          <Text style={adminStyles.actionIcon}>📄</Text>
          <View style={adminStyles.actionContent}>
            <Text style={adminStyles.actionTitle}>Xuất báo cáo</Text>
            <Text style={adminStyles.actionSubtitle}>
              Xuất báo cáo người dùng và hoạt động
            </Text>
          </View>
          <Text style={adminStyles.actionArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={adminStyles.actionButton}
          onPress={() => navigation.navigate("ManageUsers" as never)}
        >
          <Text style={adminStyles.actionIcon}>👤</Text>
          <View style={adminStyles.actionContent}>
            <Text style={adminStyles.actionTitle}>Quản lý người dùng</Text>
            <Text style={adminStyles.actionSubtitle}>
              Xem và quản lý tài khoản người dùng
            </Text>
          </View>
          <Text style={adminStyles.actionArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={adminStyles.actionButton}
          onPress={() => navigation.navigate("ManageRecipe" as never)}
        >
          <Text style={adminStyles.actionIcon}>🍳</Text>
          <View style={adminStyles.actionContent}>
            <Text style={adminStyles.actionTitle}>Quản lý món ăn</Text>
            <Text style={adminStyles.actionSubtitle}>
              Tạo, chỉnh sửa và xóa món ăn
            </Text>
          </View>
          <Text style={adminStyles.actionArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={adminStyles.actionButton}
          onPress={handleLogout}
        >
          <Text style={adminStyles.actionIcon}>🚪</Text>
          <View style={adminStyles.actionContent}>
            <Text style={adminStyles.actionTitle}>Đăng xuất</Text>
            <Text style={adminStyles.actionSubtitle}>
              Thoát khỏi tài khoản quản trị
            </Text>
          </View>
          <Text style={adminStyles.actionArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Activity */}
      <View style={adminStyles.section}>
        <Text style={adminStyles.sectionTitle}>Hoạt động gần đây</Text>
        <View style={adminStyles.activityCard}>
          <Text style={{ marginRight: 6 }}>🕒</Text>
          <Text style={adminStyles.activityText}>
            Chức năng đang phát triển...
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AdminDashboardScreen;
