import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const ManageUsersScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản Lý Người Dùng</Text>
      
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
          <Text style={[styles.filterText, styles.activeFilterText]}>Tất cả</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Hoạt động</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Bị khóa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Admin</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.userCard}>
          <View style={styles.userHeader}>
            <View style={styles.userAvatar}>
              <Text style={styles.avatarText}>NA</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Nguyễn Văn A</Text>
              <Text style={styles.userEmail}>user@example.com</Text>
              <Text style={styles.userJoinDate}>Tham gia: 15/01/2024</Text>
            </View>
            <View style={[styles.statusBadge, styles.activeStatus]}>
              <Text style={styles.statusText}>Hoạt động</Text>
            </View>
          </View>
          
          <View style={styles.userStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Công thức</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>45</Text>
              <Text style={styles.statLabel}>Theo dõi</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>28</Text>
              <Text style={styles.statLabel}>Yêu thích</Text>
            </View>
          </View>
          
          <View style={styles.userActions}>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>Xem hồ sơ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.blockButton}>
              <Text style={styles.blockButtonText}>Khóa tài khoản</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.userCard}>
          <View style={styles.userHeader}>
            <View style={styles.userAvatar}>
              <Text style={styles.avatarText}>TB</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Trần Thị B</Text>
              <Text style={styles.userEmail}>user2@example.com</Text>
              <Text style={styles.userJoinDate}>Tham gia: 20/01/2024</Text>
            </View>
            <View style={[styles.statusBadge, styles.blockedStatus]}>
              <Text style={styles.statusText}>Bị khóa</Text>
            </View>
          </View>
          
          <View style={styles.userStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Công thức</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Theo dõi</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Yêu thích</Text>
            </View>
          </View>
          
          <View style={styles.userActions}>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>Xem hồ sơ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.unblockButton}>
              <Text style={styles.unblockButtonText}>Mở khóa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.userCard}>
          <View style={styles.userHeader}>
            <View style={styles.userAvatar}>
              <Text style={styles.avatarText}>LC</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Lê Văn C</Text>
              <Text style={styles.userEmail}>admin@example.com</Text>
              <Text style={styles.userJoinDate}>Tham gia: 01/01/2024</Text>
            </View>
            <View style={[styles.statusBadge, styles.adminStatus]}>
              <Text style={styles.statusText}>Admin</Text>
            </View>
          </View>
          
          <View style={styles.userStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>25</Text>
              <Text style={styles.statLabel}>Công thức</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>156</Text>
              <Text style={styles.statLabel}>Theo dõi</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>89</Text>
              <Text style={styles.statLabel}>Yêu thích</Text>
            </View>
          </View>
          
          <View style={styles.userActions}>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>Xem hồ sơ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Chỉnh sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.disabledButton} disabled>
              <Text style={styles.disabledButtonText}>Admin</Text>
            </TouchableOpacity>
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  activeFilter: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  filterText: {
    fontSize: 14,
    color: '#666666',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userCard: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  userJoinDate: {
    fontSize: 12,
    color: '#999999',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeStatus: {
    backgroundColor: '#4CAF50',
  },
  blockedStatus: {
    backgroundColor: '#F44336',
  },
  adminStatus: {
    backgroundColor: '#9C27B0',
  },
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  userStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  userActions: {
    flexDirection: 'row',
    gap: 8,
  },
  viewButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  blockButton: {
    flex: 1,
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  blockButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  unblockButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  unblockButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  editButton: {
    flex: 1,
    backgroundColor: '#FF9800',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  disabledButton: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  disabledButtonText: {
    color: '#999999',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ManageUsersScreen;
