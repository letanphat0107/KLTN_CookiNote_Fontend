

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
import { useAppSelector } from "../../store/hooks";
import adminService, { DashboardStats } from "../../services/adminService";
import { adminStyles } from "./styles";

const AdminDashboardScreen = () => {
  const navigation = useNavigation();
  const { tokens } = useAppSelector((state) => state.auth);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    if (!tokens?.accessToken) return;

    try {
      const data = await adminService.getDashboardStats(tokens.accessToken);
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
      Alert.alert("Lỗi", "Không thể tải thông tin thống kê");
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
    if (!tokens?.accessToken) return;

    Alert.alert("Xuất báo cáo", "Bạn có muốn xuất báo cáo người dùng?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xuất",
        onPress: async () => {
          try {
            const filePath = await adminService.exportUserReport(
              tokens.accessToken
            );
            Alert.alert("Thành công", `Báo cáo đã được lưu tại: ${filePath}`);
          } catch (error) {
            Alert.alert("Lỗi", "Không thể xuất báo cáo");
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
          onPress={() => navigation.navigate("Users" as never)}
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
          onPress={() => navigation.navigate("Recipes" as never)}
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
