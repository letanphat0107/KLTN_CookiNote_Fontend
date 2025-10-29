import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { adminStyles } from './styles';

const ManageDishesScreen = () => {
  return (
    <View style={adminStyles.container}>
      <Text style={adminStyles.title}>Quản Lý Món Ăn</Text>
      
      <View style={adminStyles.filterContainer}>
        <TouchableOpacity style={[adminStyles.filterButton, adminStyles.activeFilter]}>
          <Text style={[adminStyles.filterText, adminStyles.activeFilterText]}>Tất cả</Text>
        </TouchableOpacity>
        <TouchableOpacity style={adminStyles.filterButton}>
          <Text style={adminStyles.filterText}>Chờ duyệt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={adminStyles.filterButton}>
          <Text style={adminStyles.filterText}>Đã duyệt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={adminStyles.filterButton}>
          <Text style={adminStyles.filterText}>Bị từ chối</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={adminStyles.content}>
        <View style={adminStyles.card}>
          <View style={adminStyles.cardHeader}>
            <Text style={adminStyles.cardTitle}>Phở Bò Truyền Thống</Text>
            <View style={[adminStyles.statusBadge, adminStyles.approvedStatus]}>
              <Text style={adminStyles.statusText}>Đã duyệt</Text>
            </View>
          </View>
          <Text style={adminStyles.author}>Tác giả: Nguyễn Văn A</Text>
          <Text style={adminStyles.description}>
            Món phở bò với nước dùng trong vắt, thơm ngon...
          </Text>
          <View style={adminStyles.actions}>
            <TouchableOpacity style={adminStyles.viewButton}>
              <Text style={adminStyles.viewButtonText}>Xem chi tiết</Text>
            </TouchableOpacity>
            <TouchableOpacity style={adminStyles.editButton}>
              <Text style={adminStyles.editButtonText}>Chỉnh sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={adminStyles.deleteButton}>
              <Text style={adminStyles.deleteButtonText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={adminStyles.card}>
          <View style={adminStyles.cardHeader}>
            <Text style={adminStyles.cardTitle}>Bánh Mì Việt Nam</Text>
            <View style={[adminStyles.statusBadge, adminStyles.pendingStatus]}>
              <Text style={adminStyles.statusText}>Chờ duyệt</Text>
            </View>
          </View>
          <Text style={adminStyles.author}>Tác giả: Trần Thị B</Text>
          <Text style={adminStyles.description}>
            Bánh mì giòn tan với nhân thịt và rau củ tươi ngon...
          </Text>
          <View style={adminStyles.actions}>
            <TouchableOpacity style={adminStyles.viewButton}>
              <Text style={adminStyles.viewButtonText}>Xem chi tiết</Text>
            </TouchableOpacity>
            <TouchableOpacity style={adminStyles.approveButton}>
              <Text style={adminStyles.approveButtonText}>Duyệt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={adminStyles.rejectButton}>
              <Text style={adminStyles.rejectButtonText}>Từ chối</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={adminStyles.card}>
          <View style={adminStyles.cardHeader}>
            <Text style={adminStyles.cardTitle}>Gỏi Cuốn Tôm Thịt</Text>
            <View style={[adminStyles.statusBadge, adminStyles.rejectedStatus]}>
              <Text style={adminStyles.statusText}>Bị từ chối</Text>
            </View>
          </View>
          <Text style={adminStyles.author}>Tác giả: Lê Văn C</Text>
          <Text style={adminStyles.description}>
            Gỏi cuốn tươi mát với tôm, thịt và rau thơm...
          </Text>
          <View style={adminStyles.actions}>
            <TouchableOpacity style={adminStyles.viewButton}>
              <Text style={adminStyles.viewButtonText}>Xem chi tiết</Text>
            </TouchableOpacity>
            <TouchableOpacity style={adminStyles.editButton}>
              <Text style={adminStyles.editButtonText}>Chỉnh sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={adminStyles.deleteButton}>
              <Text style={adminStyles.deleteButtonText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ManageDishesScreen;
