import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { accountStyles } from "./styles";

const AccountScreen = () => {
  return (
    <View style={accountStyles.container}>
      <Text style={accountStyles.title}>Tài Khoản</Text>

      <View style={accountStyles.userInfo}>
        <Text style={accountStyles.userName}>Nguyễn Văn A</Text>
        <Text style={accountStyles.userEmail}>user@example.com</Text>
      </View>

      <View style={accountStyles.menuContainer}>
        <TouchableOpacity style={accountStyles.menuItem}>
          <Text style={accountStyles.menuText}>Thông tin cá nhân</Text>
          <Text style={accountStyles.menuArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={accountStyles.menuItem}>
          <Text style={accountStyles.menuText}>Đổi mật khẩu</Text>
          <Text style={accountStyles.menuArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={accountStyles.menuItem}>
          <Text style={accountStyles.menuText}>Tài khoản chia sẻ</Text>
          <Text style={accountStyles.menuArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={accountStyles.menuItem}>
          <Text style={accountStyles.menuText}>Cài đặt thông báo</Text>
          <Text style={accountStyles.menuArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={accountStyles.menuItem}>
          <Text style={accountStyles.menuText}>Trợ giúp</Text>
          <Text style={accountStyles.menuArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={accountStyles.menuItem}>
          <Text style={accountStyles.menuText}>Điều khoản sử dụng</Text>
          <Text style={accountStyles.menuArrow}>→</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={accountStyles.logoutButton}>
        <Text style={accountStyles.logoutButtonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountScreen;
