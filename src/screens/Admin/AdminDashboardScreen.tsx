import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const AdminDashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản Trị Viên</Text>
      
      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>1,234</Text>
            <Text style={styles.statLabel}>Người dùng</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>567</Text>
            <Text style={styles.statLabel}>Công thức</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>89</Text>
            <Text style={styles.statLabel}>Báo cáo</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Chờ duyệt</Text>
          </View>
        </View>
        
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>👥</Text>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Quản lý người dùng</Text>
              <Text style={styles.menuDescription}>Xem và quản lý tài khoản người dùng</Text>
            </View>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>🍽️</Text>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Quản lý món ăn</Text>
              <Text style={styles.menuDescription}>Duyệt và quản lý công thức món ăn</Text>
            </View>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>➕</Text>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Thêm công thức</Text>
              <Text style={styles.menuDescription}>Thêm công thức món ăn mới</Text>
            </View>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>📊</Text>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Thống kê</Text>
              <Text style={styles.menuDescription}>Xem báo cáo và thống kê hệ thống</Text>
            </View>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>⚙️</Text>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Cài đặt hệ thống</Text>
              <Text style={styles.menuDescription}>Cấu hình và cài đặt ứng dụng</Text>
            </View>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.recentActivity}>
          <Text style={styles.sectionTitle}>Hoạt động gần đây</Text>
          
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>Người dùng mới đăng ký: user123</Text>
            <Text style={styles.activityTime}>5 phút trước</Text>
          </View>
          
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>Công thức mới được thêm: "Bún Bò Huế"</Text>
            <Text style={styles.activityTime}>10 phút trước</Text>
          </View>
          
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>Báo cáo từ user456</Text>
            <Text style={styles.activityTime}>15 phút trước</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
    color: '#333333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  menuContainer: {
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    marginBottom: 12,
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 14,
    color: '#666666',
  },
  menuArrow: {
    fontSize: 16,
    color: '#999999',
  },
  recentActivity: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  activityItem: {
    padding: 12,
    backgroundColor: '#F0F8FF',
    borderRadius: 8,
    marginBottom: 8,
  },
  activityText: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#666666',
  },
});

export default AdminDashboardScreen;
