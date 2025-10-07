import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { logoutUser } from "../../store/authSlice";
import { accountStyles } from "./styles";
import AccountHeader from "../../components/AccountHeader";

interface AccountScreenProps {
  navigation?: any;
}

const AccountScreen: React.FC<AccountScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleProfile = () => {
    if (navigation) {
      navigation.navigate("Profile");
    }
  };

  const handleChangePassword = () => {
    if (navigation) {
      navigation.navigate("NewPassword", {
        mode: "change",
        email: user?.email,
      });
    }
  };

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: () => dispatch(logoutUser()),
      },
    ]);
  };

  return (
    <View style={accountStyles.container}>
      <AccountHeader
        title="Tài khoản"
        userName={user?.display_name || "Leslie Gilliams"}
        onBackPress={handleBack}
      />

      {/* Menu Items */}
      <View style={accountStyles.menuContainer}>
        <TouchableOpacity
          style={accountStyles.menuItem}
          onPress={handleProfile}
        >
          <View style={accountStyles.menuLeft}>
            <Text style={accountStyles.menuIcon}>👤</Text>
            <Text style={accountStyles.menuText}>Thông tin cá nhân</Text>
          </View>
          <Text style={accountStyles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={accountStyles.menuItem}
          onPress={handleChangePassword}
        >
          <View style={accountStyles.menuLeft}>
            <Text style={accountStyles.menuIcon}>🔒</Text>
            <Text style={accountStyles.menuText}>Đổi mật khẩu</Text>
          </View>
          <Text style={accountStyles.menuArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <View style={accountStyles.logoutContainer}>
        <TouchableOpacity
          style={accountStyles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={accountStyles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountScreen;
