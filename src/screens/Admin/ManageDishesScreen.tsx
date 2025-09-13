import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const ManageDishesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản Lý Món Ăn</Text>
      
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
          <Text style={[styles.filterText, styles.activeFilterText]}>Tất cả</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Chờ duyệt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Đã duyệt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Bị từ chối</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.dishCard}>
          <View style={styles.dishHeader}>
            <Text style={styles.dishName}>Phở Bò Truyền Thống</Text>
            <View style={[styles.statusBadge, styles.approvedStatus]}>
              <Text style={styles.statusText}>Đã duyệt</Text>
            </View>
          </View>
          <Text style={styles.dishAuthor}>Tác giả: Nguyễn Văn A</Text>
          <Text style={styles.dishDescription}>
            Món phở bò với nước dùng trong vắt, thơm ngon...
          </Text>
          <View style={styles.dishActions}>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>Xem chi tiết</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Chỉnh sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.dishCard}>
          <View style={styles.dishHeader}>
            <Text style={styles.dishName}>Bánh Mì Việt Nam</Text>
            <View style={[styles.statusBadge, styles.pendingStatus]}>
              <Text style={styles.statusText}>Chờ duyệt</Text>
            </View>
          </View>
          <Text style={styles.dishAuthor}>Tác giả: Trần Thị B</Text>
          <Text style={styles.dishDescription}>
            Bánh mì giòn tan với nhân thịt và rau củ tươi ngon...
          </Text>
          <View style={styles.dishActions}>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>Xem chi tiết</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.approveButton}>
              <Text style={styles.approveButtonText}>Duyệt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rejectButton}>
              <Text style={styles.rejectButtonText}>Từ chối</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.dishCard}>
          <View style={styles.dishHeader}>
            <Text style={styles.dishName}>Gỏi Cuốn Tôm Thịt</Text>
            <View style={[styles.statusBadge, styles.rejectedStatus]}>
              <Text style={styles.statusText}>Bị từ chối</Text>
            </View>
          </View>
          <Text style={styles.dishAuthor}>Tác giả: Lê Văn C</Text>
          <Text style={styles.dishDescription}>
            Gỏi cuốn tươi mát với tôm, thịt và rau thơm...
          </Text>
          <View style={styles.dishActions}>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>Xem chi tiết</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Chỉnh sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Xóa</Text>
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
  dishCard: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dishHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  approvedStatus: {
    backgroundColor: '#4CAF50',
  },
  pendingStatus: {
    backgroundColor: '#FF9800',
  },
  rejectedStatus: {
    backgroundColor: '#F44336',
  },
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  dishAuthor: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  dishDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  dishActions: {
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
  approveButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  approveButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  rejectButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ManageDishesScreen;
