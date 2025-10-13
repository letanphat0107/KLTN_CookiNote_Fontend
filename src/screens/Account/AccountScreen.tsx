import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { logoutUser } from "../../store/authSlice";
import { accountStyles } from "./styles";
import AccountHeader from "../../components/AccountHeader";

interface AccountScreenProps {
  navigation?: any;
}

const AccountScreen: React.FC<AccountScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);

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
        onPress: async () => {
          try {
            // Dispatch logout thunk
            const result = await dispatch(logoutUser());

            if (
              logoutUser.fulfilled.match(result) ||
              logoutUser.rejected.match(result)
            ) {
              // Navigate to login screen after logout (successful or failed)
              if (navigation) {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "MainTabs" }],
                });
              }
            }
          } catch (error) {
            console.error("Logout error:", error);
            // Even if logout fails, still navigate to login
            if (navigation) {
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });
            }
          }
        },
      },
    ]);
  };

  return (
    <View style={accountStyles.container}>
      <AccountHeader
        title="Tài khoản"
        userName={user?.displayName || "User"}
        userEmail={user?.email}
        userAvatar={user?.avatarUrl} // Add avatar prop
        onBackPress={handleBack}
      />

      {/* Menu Items */}
      <View style={accountStyles.menuContainer}>
        <TouchableOpacity
          style={accountStyles.menuItem}
          onPress={handleProfile}
          disabled={isLoading}
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
          disabled={isLoading}
        >
          <View style={accountStyles.menuLeft}>
            <Text style={accountStyles.menuIcon}>🔒</Text>
            <Text style={accountStyles.menuText}>Đổi mật khẩu</Text>
          </View>
          <Text style={accountStyles.menuArrow}>›</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={accountStyles.menuItem} disabled={isLoading}>
          <View style={accountStyles.menuLeft}>
            <Text style={accountStyles.menuIcon}>📊</Text>
            <Text style={accountStyles.menuText}>Thống kê nấu ăn</Text>
          </View>
          <Text style={accountStyles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={accountStyles.menuItem} disabled={isLoading}>
          <View style={accountStyles.menuLeft}>
            <Text style={accountStyles.menuIcon}>⚙️</Text>
            <Text style={accountStyles.menuText}>Cài đặt</Text>
          </View>
          <Text style={accountStyles.menuArrow}>›</Text>
        </TouchableOpacity> */}
      </View>

      {/* Logout Button */}
      <View style={accountStyles.logoutContainer}>
        <TouchableOpacity
          style={[
            accountStyles.logoutButton,
            isLoading && accountStyles.logoutButtonDisabled,
          ]}
          onPress={handleLogout}
          disabled={isLoading}
        >
          {isLoading ? (
            <View style={accountStyles.logoutButtonContent}>
              <ActivityIndicator size="small" color="#FFFFFF" />
              <Text
                style={[accountStyles.logoutButtonText, { marginLeft: 10 }]}
              >
                Đang đăng xuất...
              </Text>
            </View>
          ) : (
            <Text style={accountStyles.logoutButtonText}>Đăng xuất</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountScreen;
