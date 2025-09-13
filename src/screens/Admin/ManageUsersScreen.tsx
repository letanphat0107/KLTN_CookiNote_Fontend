import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { adminStyles } from "./styles";

const ManageUsersScreen = () => {
  return (
    <View style={adminStyles.container}>
      <Text style={adminStyles.title}>Quản Lý Người Dùng</Text>

      <View style={adminStyles.filterContainer}>
        <TouchableOpacity
          style={[adminStyles.filterButton, adminStyles.activeFilter]}
        >
          <Text style={[adminStyles.filterText, adminStyles.activeFilterText]}>
            Tất cả
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={adminStyles.filterButton}>
          <Text style={adminStyles.filterText}>Hoạt động</Text>
        </TouchableOpacity>
        <TouchableOpacity style={adminStyles.filterButton}>
          <Text style={adminStyles.filterText}>Bị khóa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={adminStyles.filterButton}>
          <Text style={adminStyles.filterText}>Admin</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={adminStyles.content}>
        <View style={adminStyles.userCard}>
          <View style={adminStyles.userHeader}>
            <View style={adminStyles.userAvatar}>
              <Text style={adminStyles.avatarText}>NA</Text>
            </View>
            <View style={adminStyles.userInfo}>
              <Text style={adminStyles.userName}>Nguyễn Văn A</Text>
              <Text style={adminStyles.userEmail}>user@example.com</Text>
              <Text style={adminStyles.userJoinDate}>Tham gia: 15/01/2024</Text>
            </View>
            <View style={[adminStyles.statusBadge, adminStyles.activeStatus]}>
              <Text style={adminStyles.statusText}>Hoạt động</Text>
            </View>
          </View>

          <View style={adminStyles.userStats}>
            <View style={adminStyles.statItem}>
              <Text style={adminStyles.statNumber}>12</Text>
              <Text style={adminStyles.statLabel}>Công thức</Text>
            </View>
            <View style={adminStyles.statItem}>
              <Text style={adminStyles.statNumber}>45</Text>
              <Text style={adminStyles.statLabel}>Theo dõi</Text>
            </View>
            <View style={adminStyles.statItem}>
              <Text style={adminStyles.statNumber}>28</Text>
              <Text style={adminStyles.statLabel}>Đang theo dõi</Text>
            </View>
          </View>

          <View style={adminStyles.userActions}>
            <TouchableOpacity style={adminStyles.viewButton}>
              <Text style={adminStyles.viewButtonText}>Xem</Text>
            </TouchableOpacity>
            <TouchableOpacity style={adminStyles.editButton}>
              <Text style={adminStyles.editButtonText}>Sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={adminStyles.blockButton}>
              <Text style={adminStyles.blockButtonText}>Khóa</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={adminStyles.userCard}>
          <View style={adminStyles.userHeader}>
            <View style={adminStyles.userAvatar}>
              <Text style={adminStyles.avatarText}>TB</Text>
            </View>
            <View style={adminStyles.userInfo}>
              <Text style={adminStyles.userName}>Trần Thị B</Text>
              <Text style={adminStyles.userEmail}>user2@example.com</Text>
              <Text style={adminStyles.userJoinDate}>Tham gia: 20/01/2024</Text>
            </View>
            <View style={[adminStyles.statusBadge, adminStyles.blockedStatus]}>
              <Text style={adminStyles.statusText}>Bị khóa</Text>
            </View>
          </View>

          <View style={adminStyles.userStats}>
            <View style={adminStyles.statItem}>
              <Text style={adminStyles.statNumber}>8</Text>
              <Text style={adminStyles.statLabel}>Công thức</Text>
            </View>
            <View style={adminStyles.statItem}>
              <Text style={adminStyles.statNumber}>23</Text>
              <Text style={adminStyles.statLabel}>Theo dõi</Text>
            </View>
            <View style={adminStyles.statItem}>
              <Text style={adminStyles.statNumber}>15</Text>
              <Text style={adminStyles.statLabel}>Đang theo dõi</Text>
            </View>
          </View>

          <View style={adminStyles.userActions}>
            <TouchableOpacity style={adminStyles.viewButton}>
              <Text style={adminStyles.viewButtonText}>Xem</Text>
            </TouchableOpacity>
            <TouchableOpacity style={adminStyles.editButton}>
              <Text style={adminStyles.editButtonText}>Sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={adminStyles.unblockButton}>
              <Text style={adminStyles.unblockButtonText}>Mở khóa</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={adminStyles.userCard}>
          <View style={adminStyles.userHeader}>
            <View style={adminStyles.userAvatar}>
              <Text style={adminStyles.avatarText}>LC</Text>
            </View>
            <View style={adminStyles.userInfo}>
              <Text style={adminStyles.userName}>Lê Văn C</Text>
              <Text style={adminStyles.userEmail}>admin@example.com</Text>
              <Text style={adminStyles.userJoinDate}>Tham gia: 01/01/2024</Text>
            </View>
            <View style={[adminStyles.statusBadge, adminStyles.adminStatus]}>
              <Text style={adminStyles.statusText}>Admin</Text>
            </View>
          </View>

          <View style={adminStyles.userStats}>
            <View style={adminStyles.statItem}>
              <Text style={adminStyles.statNumber}>25</Text>
              <Text style={adminStyles.statLabel}>Công thức</Text>
            </View>
            <View style={adminStyles.statItem}>
              <Text style={adminStyles.statNumber}>100</Text>
              <Text style={adminStyles.statLabel}>Theo dõi</Text>
            </View>
            <View style={adminStyles.statItem}>
              <Text style={adminStyles.statNumber}>50</Text>
              <Text style={adminStyles.statLabel}>Đang theo dõi</Text>
            </View>
          </View>

          <View style={adminStyles.userActions}>
            <TouchableOpacity style={adminStyles.viewButton}>
              <Text style={adminStyles.viewButtonText}>Xem</Text>
            </TouchableOpacity>
            <TouchableOpacity style={adminStyles.disabledButton}>
              <Text style={adminStyles.disabledButtonText}>Sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={adminStyles.disabledButton}>
              <Text style={adminStyles.disabledButtonText}>Admin</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ManageUsersScreen;
