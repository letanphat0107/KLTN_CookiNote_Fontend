import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Dimensions,
  FlatList,
  Modal,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { logoutUser } from "../../store/authSlice";
import adminService, {
  DashboardStats,
  LoginHistory,
  LoginHistoryResponse,
} from "../../services/adminService";
import { adminStyles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { logStreamService, LogMessage } from "../../services/logStreamService";
import DateTimePicker from "@react-native-community/datetimepicker";

const { width } = Dimensions.get("window");

const AdminDashboardScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { tokens } = useAppSelector((state) => state.auth);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [exportingReport, setExportingReport] = useState(false);

  // Login history states
  const [loginHistory, setLoginHistory] = useState<LoginHistory[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Log stream states
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [isLogStreamActive, setIsLogStreamActive] = useState(false);
  const [logStreamError, setLogStreamError] = useState<string | null>(null);
  const logFlatListRef = useRef<FlatList>(null);
  const maxLogs = 100;

  const defaultStats: DashboardStats = {
    totalUsers: 0,
    totalRecipes: 0,
    activeUsers: 0,
    newUsersToday: 0,
  };

  const fetchStats = async () => {
    if (!tokens?.accessToken) return;

    try {
      const data = await adminService.getDashboardStats();
      setStats(data);
    } catch (error) {
      setStats(defaultStats);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchLoginHistory = async (date: Date) => {
    if (!tokens?.accessToken) return;

    setLoadingHistory(true);
    try {
      const dateString = date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
      const data = await adminService.getLoginHistory(dateString, 0, 20);
      setLoginHistory(data.items);
    } catch (error) {
      console.error("Error fetching login history:", error);
      Alert.alert("Lỗi", "Không thể tải lịch sử đăng nhập");
      setLoginHistory([]);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (showHistoryModal) {
      fetchLoginHistory(selectedDate);
    }
  }, [showHistoryModal, selectedDate]);

  // Log stream lifecycle
  useEffect(() => {
    if (isLogStreamActive && tokens?.accessToken) {
      startLogStream();
    } else {
      stopLogStream();
    }

    return () => {
      stopLogStream();
    };
  }, [isLogStreamActive, tokens?.accessToken]);

  const startLogStream = () => {
    if (!tokens?.accessToken) return;

    setLogStreamError(null);

    logStreamService.connect(
      tokens.accessToken,
      (log: LogMessage) => {
        setLogs((prevLogs) => {
          const newLogs = [log, ...prevLogs];
          return newLogs.slice(0, maxLogs);
        });

        setTimeout(() => {
          logFlatListRef.current?.scrollToOffset({ offset: 0, animated: true });
        }, 100);
      },
      (error) => {
        console.error("Log stream error:", error);
        setLogStreamError("Mất kết nối với server. Đang thử kết nối lại...");
      }
    );
  };

  const stopLogStream = () => {
    logStreamService.disconnect();
  };

  const toggleLogStream = () => {
    setIsLogStreamActive(!isLogStreamActive);
    if (isLogStreamActive) {
      setLogs([]);
      setLogStreamError(null);
    }
  };

  const clearLogs = () => {
    Alert.alert("Xóa logs", "Bạn có chắc muốn xóa tất cả logs?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: () => setLogs([]),
      },
    ]);
  };

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (date) {
      setSelectedDate(date);
    }
  };

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case "ERROR":
        return "#E74C3C";
      case "WARN":
        return "#FF9800";
      case "INFO":
        return "#2196F3";
      case "DEBUG":
        return "#9C27B0";
      case "TRACE":
        return "#607D8B";
      default:
        return "#7F8C8D";
    }
  };

  const getLogLevelIcon = (level: string) => {
    switch (level) {
      case "ERROR":
        return "close-circle";
      case "WARN":
        return "warning";
      case "INFO":
        return "information-circle";
      case "DEBUG":
        return "bug";
      case "TRACE":
        return "code-slash";
      default:
        return "ellipse";
    }
  };

  const renderLoginHistoryItem = ({ item }: { item: LoginHistory }) => (
    <View style={adminStyles.loginHistoryItem}>
      <View style={adminStyles.loginHistoryHeader}>
        <View style={adminStyles.loginHistoryUser}>
          <Ionicons name="person-circle" size={24} color="#FF6B35" />
          <Text style={adminStyles.loginHistoryUsername}>{item.username}</Text>
        </View>
        <Text style={adminStyles.loginHistoryTime}>
          {formatDateTime(item.loginTime)}
        </Text>
      </View>

      <View style={adminStyles.loginHistoryDetails}>
        <View style={adminStyles.loginHistoryDetailRow}>
          <Ionicons name="globe-outline" size={16} color="#666" />
          <Text style={adminStyles.loginHistoryDetailText}>
            IP: {item.ipAddress}
          </Text>
        </View>
        <View style={adminStyles.loginHistoryDetailRow}>
          <Ionicons name="desktop-outline" size={16} color="#666" />
          <Text style={adminStyles.loginHistoryDetailText}>
            {item.browser} • {item.os}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderLoginHistoryModal = () => (
    <Modal
      visible={showHistoryModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowHistoryModal(false)}
    >
      <View style={adminStyles.modalOverlay}>
        <View style={adminStyles.modalContent}>
          <View style={adminStyles.modalHeader}>
            <Text style={adminStyles.modalTitle}>Lịch sử đăng nhập</Text>
            <TouchableOpacity
              onPress={() => setShowHistoryModal(false)}
              style={adminStyles.modalCloseButton}
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Date Picker */}
          <View style={adminStyles.datePickerContainer}>
            <Text style={adminStyles.datePickerLabel}>Chọn ngày:</Text>
            <TouchableOpacity
              style={adminStyles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar-outline" size={20} color="#FF6B35" />
              <Text style={adminStyles.datePickerText}>
                {selectedDate.toLocaleDateString("vi-VN")}
              </Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}

          {/* Login History List */}
          {loadingHistory ? (
            <View style={adminStyles.modalLoadingContainer}>
              <ActivityIndicator size="large" color="#FF6B35" />
              <Text style={adminStyles.modalLoadingText}>Đang tải...</Text>
            </View>
          ) : loginHistory.length > 0 ? (
            <FlatList
              data={loginHistory}
              renderItem={renderLoginHistoryItem}
              keyExtractor={(item) => item.id.toString()}
              style={adminStyles.loginHistoryList}
              showsVerticalScrollIndicator={true}
            />
          ) : (
            <View style={adminStyles.emptyStateContainer}>
              <Ionicons name="calendar-outline" size={48} color="#CCC" />
              <Text style={adminStyles.emptyStateText}>
                Không có lịch sử đăng nhập trong ngày này
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );

  const renderLogStreamSection = () => (
    <View style={adminStyles.modernDashboardSection}>
      <View style={adminStyles.modernSectionHeader}>
        <Text style={adminStyles.modernSectionTitle}>
          <Ionicons name="terminal" size={20} color="#FF6B6B" /> Logs Realtime
        </Text>
      </View>

      <TouchableOpacity
        style={adminStyles.logStreamNavigateCard}
        onPress={() => navigation.navigate("LogStream" as never)}
      >
        <View style={adminStyles.logStreamNavigateIcon}>
          <Ionicons name="terminal-outline" size={48} color="#4A90E2" />
        </View>
        <Text style={adminStyles.logStreamNavigateTitle}>
          Xem Logs Realtime
        </Text>
        <Text style={adminStyles.logStreamNavigateSubtitle}>
          Theo dõi hoạt động hệ thống trực tiếp
        </Text>
        <View style={adminStyles.logStreamNavigateArrow}>
          <Ionicons name="arrow-forward-circle" size={32} color="#4A90E2" />
        </View>
      </TouchableOpacity>
    </View>
  );

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
          setExportingReport(true);
          try {
            const fileDownloadUrl = await adminService.exportUserReport(
              tokens.accessToken
            );

            if (!fileDownloadUrl) {
              throw new Error("Không nhận được đường dẫn tải tệp từ máy chủ.");
            }

            const fileName = `user_report_${Date.now()}.xlsx`;
            const fileUri = FileSystem.documentDirectory + fileName;

            const downloadResult = await FileSystem.downloadAsync(
              fileDownloadUrl,
              fileUri
            );

            if (downloadResult.status !== 200) {
              throw new Error(
                `Tải tệp thất bại: Trạng thái ${downloadResult.status}`
              );
            }

            if (await Sharing.isAvailableAsync()) {
              await Sharing.shareAsync(downloadResult.uri);
              Alert.alert("Thành công", "Báo cáo đã được tải về và mở.");
            } else {
              Alert.alert(
                "Thành công",
                "Báo cáo đã được tải về. Tính năng chia sẻ không khả dụng."
              );
            }
          } catch (error) {
            const errorMessage =
              error instanceof Error
                ? error.message
                : "Đã xảy ra lỗi không xác định.";
            Alert.alert("Lỗi", `Không thể xuất báo cáo: ${errorMessage}`);
          } finally {
            setExportingReport(false);
          }
        },
      },
    ]);
  };

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: async () => {
          try {
            const result = await dispatch(logoutUser());

            if (
              logoutUser.fulfilled.match(result) ||
              logoutUser.rejected.match(result)
            ) {
              if (navigation) {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" as never }],
                });
              }
            }
          } catch (error) {
            console.error("Logout error:", error);
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

  if (loading) {
    return (
      <View style={adminStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={{ marginTop: 16, color: "#7F8C8D" }}>Đang tải...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={adminStyles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#FF6B6B"]}
          tintColor="#FF6B6B"
        />
      }
    >
      {/* Modern Header */}
      <View style={adminStyles.modernDashboardHeader}>
        <View style={adminStyles.modernDashboardHeaderContent}>
          <View style={adminStyles.modernDashboardHeaderIcon}>
            <Ionicons name="shield-checkmark" size={32} color="#FF6B6B" />
          </View>
          <View style={adminStyles.modernDashboardHeaderText}>
            <Text style={adminStyles.modernDashboardTitle}>Quản trị viên</Text>
            <Text style={adminStyles.modernDashboardSubtitle}>
              CookiNote Admin Panel
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={adminStyles.modernDashboardLogoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={22} color="#E74C3C" />
        </TouchableOpacity>
      </View>

      {/* Modern Stats Cards */}
      <View style={adminStyles.modernStatsGrid}>
        <View
          style={[adminStyles.modernStatCard, { backgroundColor: "#FFE5E5" }]}
        >
          <View style={adminStyles.modernStatCardHeader}>
            <View
              style={[
                adminStyles.modernStatCardIcon,
                { backgroundColor: "#FF6B6B" },
              ]}
            >
              <Ionicons name="people" size={24} color="#FFFFFF" />
            </View>
            <View style={adminStyles.modernStatCardTrend}>
              <Ionicons name="trending-up" size={14} color="#FF6B6B" />
            </View>
          </View>
          <Text style={adminStyles.modernStatCardNumber}>
            {stats?.totalUsers || 0}
          </Text>
          <Text style={[adminStyles.modernStatCardLabel, { color: "#FF6B6B" }]}>
            Tổng người dùng
          </Text>
        </View>

        <View
          style={[adminStyles.modernStatCard, { backgroundColor: "#E8F5E9" }]}
        >
          <View style={adminStyles.modernStatCardHeader}>
            <View
              style={[
                adminStyles.modernStatCardIcon,
                { backgroundColor: "#4CAF50" },
              ]}
            >
              <Ionicons name="restaurant" size={24} color="#FFFFFF" />
            </View>
            <View style={adminStyles.modernStatCardTrend}>
              <Ionicons name="trending-up" size={14} color="#4CAF50" />
            </View>
          </View>
          <Text style={adminStyles.modernStatCardNumber}>
            {stats?.totalRecipes || 0}
          </Text>
          <Text style={[adminStyles.modernStatCardLabel, { color: "#4CAF50" }]}>
            Tổng công thức
          </Text>
        </View>

        <View
          style={[adminStyles.modernStatCard, { backgroundColor: "#E3F2FD" }]}
        >
          <View style={adminStyles.modernStatCardHeader}>
            <View
              style={[
                adminStyles.modernStatCardIcon,
                { backgroundColor: "#2196F3" },
              ]}
            >
              <Ionicons name="pulse" size={24} color="#FFFFFF" />
            </View>
            <View style={adminStyles.modernStatCardTrend}>
              <Ionicons name="trending-up" size={14} color="#2196F3" />
            </View>
          </View>
          <Text style={adminStyles.modernStatCardNumber}>
            {stats?.activeUsers || 0}
          </Text>
          <Text style={[adminStyles.modernStatCardLabel, { color: "#2196F3" }]}>
            Đang hoạt động
          </Text>
        </View>

        <View
          style={[adminStyles.modernStatCard, { backgroundColor: "#FFF3E0" }]}
        >
          <View style={adminStyles.modernStatCardHeader}>
            <View
              style={[
                adminStyles.modernStatCardIcon,
                { backgroundColor: "#FF9800" },
              ]}
            >
              <Ionicons name="star" size={24} color="#FFFFFF" />
            </View>
            <View style={adminStyles.modernStatCardTrend}>
              <Ionicons name="trending-up" size={14} color="#FF9800" />
            </View>
          </View>
          <Text style={adminStyles.modernStatCardNumber}>
            {stats?.newUsersToday || 0}
          </Text>
          <Text style={[adminStyles.modernStatCardLabel, { color: "#FF9800" }]}>
            Mới hôm nay
          </Text>
        </View>
      </View>

      {/* Quick Actions Section */}
      <View style={adminStyles.modernDashboardSection}>
        <View style={adminStyles.modernSectionHeader}>
          <Text style={adminStyles.modernSectionTitle}>
            <Ionicons name="flash" size={20} color="#FF6B6B" /> Thao tác nhanh
          </Text>
        </View>

        <View style={adminStyles.modernActionsGrid}>
          <TouchableOpacity
            style={adminStyles.modernActionCard}
            onPress={handleExportReport}
            disabled={exportingReport}
          >
            <View
              style={[
                adminStyles.modernActionCardIcon,
                { backgroundColor: "#E3F2FD" },
              ]}
            >
              {exportingReport ? (
                <ActivityIndicator size="small" color="#2196F3" />
              ) : (
                <Ionicons name="document-text" size={28} color="#2196F3" />
              )}
            </View>
            <Text style={adminStyles.modernActionCardTitle}>Xuất báo cáo</Text>
            <Text style={adminStyles.modernActionCardSubtitle}>
              Tải về Excel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={adminStyles.modernActionCard}
            onPress={() => navigation.navigate("ManageUsers" as never)}
          >
            <View
              style={[
                adminStyles.modernActionCardIcon,
                { backgroundColor: "#FFE5E5" },
              ]}
            >
              <Ionicons name="people" size={28} color="#FF6B6B" />
            </View>
            <Text style={adminStyles.modernActionCardTitle}>Người dùng</Text>
            <Text style={adminStyles.modernActionCardSubtitle}>
              Quản lý tài khoản
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={adminStyles.modernActionCard}
            onPress={() => navigation.navigate("ManageCategory" as never)}
          >
            <View
              style={[
                adminStyles.modernActionCardIcon,
                { backgroundColor: "#F3E5F5" },
              ]}
            >
              <Ionicons name="albums" size={28} color="#9C27B0" />
            </View>
            <Text style={adminStyles.modernActionCardTitle}>Danh mục</Text>
            <Text style={adminStyles.modernActionCardSubtitle}>
              Quản lý phân loại
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={adminStyles.modernActionCard}
            onPress={() => navigation.navigate("ManageRecipe" as never)}
          >
            <View
              style={[
                adminStyles.modernActionCardIcon,
                { backgroundColor: "#E8F5E9" },
              ]}
            >
              <Ionicons name="restaurant" size={28} color="#4CAF50" />
            </View>
            <Text style={adminStyles.modernActionCardTitle}>Món ăn</Text>
            <Text style={adminStyles.modernActionCardSubtitle}>
              Quản lý công thức
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* System Info Section */}
      <View style={adminStyles.modernDashboardSection}>
        <View style={adminStyles.modernSectionHeader}>
          <Text style={adminStyles.modernSectionTitle}>
            <Ionicons name="information-circle" size={20} color="#FF6B6B" />
            {"  "}
            Thông tin hệ thống
          </Text>
        </View>

        <View style={adminStyles.modernSystemInfoCard}>
          <View style={adminStyles.modernSystemInfoRow}>
            <View style={adminStyles.modernSystemInfoItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={adminStyles.modernSystemInfoLabel}>Trạng thái</Text>
              <Text
                style={[
                  adminStyles.modernSystemInfoValue,
                  { color: "#4CAF50" },
                ]}
              >
                Hoạt động
              </Text>
            </View>

            <View style={adminStyles.modernSystemInfoDivider} />

            <View style={adminStyles.modernSystemInfoItem}>
              <Ionicons name="server" size={20} color="#2196F3" />
              <Text style={adminStyles.modernSystemInfoLabel}>Máy chủ</Text>
              <Text
                style={[
                  adminStyles.modernSystemInfoValue,
                  { color: "#2196F3" },
                ]}
              >
                Online
              </Text>
            </View>

            <View style={adminStyles.modernSystemInfoDivider} />

            <View style={adminStyles.modernSystemInfoItem}>
              <Ionicons name="shield-checkmark" size={20} color="#9C27B0" />
              <Text style={adminStyles.modernSystemInfoLabel}>Bảo mật</Text>
              <Text
                style={[
                  adminStyles.modernSystemInfoValue,
                  { color: "#9C27B0" },
                ]}
              >
                An toàn
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Login History Section - Replaced Recent Activity Preview */}
      <View style={adminStyles.modernDashboardSection}>
        <View style={adminStyles.modernSectionHeader}>
          <Text style={adminStyles.modernSectionTitle}>
            <Ionicons name="time" size={20} color="#FF6B6B" /> Lịch sử đăng nhập
          </Text>
          <TouchableOpacity
            onPress={() => setShowHistoryModal(true)}
            style={adminStyles.viewAllButton}
          >
            <Text style={adminStyles.viewAllButtonText}>Xem chi tiết</Text>
            <Ionicons name="arrow-forward" size={16} color="#FF6B35" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={adminStyles.loginHistoryPreviewCard}
          onPress={() => setShowHistoryModal(true)}
        >
          <View style={adminStyles.loginHistoryPreviewIcon}>
            <Ionicons name="finger-print" size={48} color="#4A90E2" />
          </View>
          <Text style={adminStyles.loginHistoryPreviewTitle}>
            Xem lịch sử đăng nhập
          </Text>
          <Text style={adminStyles.loginHistoryPreviewSubtitle}>
            Theo dõi hoạt động đăng nhập của người dùng
          </Text>
          <View style={adminStyles.loginHistoryPreviewStats}>
            <View style={adminStyles.loginHistoryPreviewStatItem}>
              <Text style={adminStyles.loginHistoryPreviewStatNumber}>
                {stats?.activeUsers || 0}
              </Text>
              <Text style={adminStyles.loginHistoryPreviewStatLabel}>
                Đang online
              </Text>
            </View>
            <View style={adminStyles.loginHistoryPreviewStatDivider} />
            <View style={adminStyles.loginHistoryPreviewStatItem}>
              <Text style={adminStyles.loginHistoryPreviewStatNumber}>
                {stats?.newUsersToday || 0}
              </Text>
              <Text style={adminStyles.loginHistoryPreviewStatLabel}>
                Mới hôm nay
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Log Stream Section */}
      {renderLogStreamSection()}

      {/* Login History Modal */}
      {renderLoginHistoryModal()}

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

export default AdminDashboardScreen;
