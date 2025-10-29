import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { adminStyles } from "./styles";

const AdminDashboardScreen = () => {
  return (
    <View style={adminStyles.container}>
      <Text style={adminStyles.title}>Quản Trị Viên</Text>

      <ScrollView style={adminStyles.content}>
        <View style={adminStyles.statsContainer}>
          <View style={adminStyles.statCard}>
            <Text style={adminStyles.statNumber}>1,234</Text>
            <Text style={adminStyles.statLabel}>Người dùng</Text>
          </View>

          <View style={adminStyles.statCard}>
            <Text style={adminStyles.statNumber}>567</Text>
            <Text style={adminStyles.statLabel}>Công thức</Text>
          </View>

          <View style={adminStyles.statCard}>
            <Text style={adminStyles.statNumber}>89</Text>
            <Text style={adminStyles.statLabel}>Báo cáo</Text>
          </View>

          <View style={adminStyles.statCard}>
            <Text style={adminStyles.statNumber}>12</Text>
            <Text style={adminStyles.statLabel}>Chờ duyệt</Text>
          </View>
        </View>

        <View style={adminStyles.menuContainer}>
          <TouchableOpacity style={adminStyles.menuItem}>
            <Text style={adminStyles.menuIcon}>👥</Text>
            <View style={adminStyles.menuContent}>
              <Text style={adminStyles.menuTitle}>Quản lý người dùng</Text>
              <Text style={adminStyles.menuDescription}>
                Xem và quản lý tài khoản người dùng
              </Text>
            </View>
            <Text style={adminStyles.menuArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={adminStyles.menuItem}>
            <Text style={adminStyles.menuIcon}>🍽️</Text>
            <View style={adminStyles.menuContent}>
              <Text style={adminStyles.menuTitle}>Quản lý món ăn</Text>
              <Text style={adminStyles.menuDescription}>
                Duyệt và quản lý công thức món ăn
              </Text>
            </View>
            <Text style={adminStyles.menuArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={adminStyles.menuItem}>
            <Text style={adminStyles.menuIcon}>➕</Text>
            <View style={adminStyles.menuContent}>
              <Text style={adminStyles.menuTitle}>Thêm công thức</Text>
              <Text style={adminStyles.menuDescription}>
                Thêm công thức món ăn mới
              </Text>
            </View>
            <Text style={adminStyles.menuArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={adminStyles.menuItem}>
            <Text style={adminStyles.menuIcon}>📊</Text>
            <View style={adminStyles.menuContent}>
              <Text style={adminStyles.menuTitle}>Thống kê</Text>
              <Text style={adminStyles.menuDescription}>
                Xem báo cáo và thống kê hệ thống
              </Text>
            </View>
            <Text style={adminStyles.menuArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={adminStyles.menuItem}>
            <Text style={adminStyles.menuIcon}>⚙️</Text>
            <View style={adminStyles.menuContent}>
              <Text style={adminStyles.menuTitle}>Cài đặt hệ thống</Text>
              <Text style={adminStyles.menuDescription}>
                Cấu hình và cài đặt ứng dụng
              </Text>
            </View>
            <Text style={adminStyles.menuArrow}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={adminStyles.recentActivity}>
          <Text style={adminStyles.sectionTitle}>Hoạt động gần đây</Text>

          <View style={adminStyles.activityItem}>
            <Text style={adminStyles.activityText}>
              Người dùng mới đăng ký: user123
            </Text>
            <Text style={adminStyles.activityTime}>5 phút trước</Text>
          </View>

          <View style={adminStyles.activityItem}>
            <Text style={adminStyles.activityText}>
              Công thức mới được thêm: "Bún Bò Huế"
            </Text>
            <Text style={adminStyles.activityTime}>10 phút trước</Text>
          </View>

          <View style={adminStyles.activityItem}>
            <Text style={adminStyles.activityText}>Báo cáo từ user456</Text>
            <Text style={adminStyles.activityTime}>15 phút trước</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AdminDashboardScreen;
