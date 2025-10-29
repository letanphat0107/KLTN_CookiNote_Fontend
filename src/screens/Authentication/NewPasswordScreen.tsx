import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  ToastAndroid,
  Platform,
} from "react-native";
import { useAppSelector } from "../../store/hooks";
import AuthHeader from "../../components/AuthHeader";
import { authStyles } from "./styles";
import { API_URLS, createAuthHeaders } from "../../config/api";

interface NewPasswordScreenProps {
  navigation: any;
  route: any;
}

const NewPasswordScreen: React.FC<NewPasswordScreenProps> = ({
  navigation,
  route,
}) => {
  const { mode = "reset", email } = route.params || {};
  const { tokens, user } = useAppSelector((state) => state.auth);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if this is change password mode (user is logged in)
  const isChangePasswordMode = mode === "change" && tokens && user;

  const validatePassword = (password: string) => {
    // Check if password has at least 6 characters
    if (password.length < 6) {
      return {
        isValid: false,
        message: "Mật khẩu phải có ít nhất 6 ký tự",
      };
    }

    // Check if password contains at least one letter
    const hasLetter = /[a-zA-Z]/.test(password);
    if (!hasLetter) {
      return {
        isValid: false,
        message: "Mật khẩu phải có ít nhất một chữ cái",
      };
    }

    // Check if password contains at least one number
    const hasNumber = /[0-9]/.test(password);
    if (!hasNumber) {
      return {
        isValid: false,
        message: "Mật khẩu phải có ít nhất một chữ số",
      };
    }

    return {
      isValid: true,
      message: "",
    };
  };

  const showToast = (message: string) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      // For iOS, you might want to use a toast library or Alert
      Alert.alert("Thông báo", message);
    }
  };

  const handleChangePassword = async () => {
    // Validation
    if (isChangePasswordMode && !currentPassword.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập mật khẩu hiện tại");
      return;
    }

    if (!newPassword.trim() || !confirmPassword.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp");
      return;
    }

    // Enhanced password validation
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      Alert.alert("Lỗi", passwordValidation.message);
      return;
    }

    if (isChangePasswordMode && currentPassword === newPassword) {
      Alert.alert("Lỗi", "Mật khẩu mới phải khác mật khẩu hiện tại");
      return;
    }

    setIsLoading(true);

    try {
      if (isChangePasswordMode) {
        // Change password for logged in user
        await changePasswordAPI();
      } else {
        // Reset password flow (implement if needed)
        await resetPasswordAPI();
      }
    } catch (error) {
      console.error("Password change error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const changePasswordAPI = async () => {
    try {
      const changePasswordData = {
        currentPassword: currentPassword,
        newPassword: newPassword,
      };

      console.log("Change password data:", {
        ...changePasswordData,
        currentPassword: "[HIDDEN]",
        newPassword: "[HIDDEN]",
      });

      const response = await fetch(API_URLS.CHANGE_PASSWORD, {
        method: "PUT",
        headers: createAuthHeaders(tokens?.accessToken),
        body: JSON.stringify(changePasswordData),
      });

      const result = await response.json();
      console.log("Change password response:", result);

      if (response.ok && result.code === 200) {
        // Success
        showToast("Đổi mật khẩu thành công!");

        // Navigate back after a short delay to show toast
        setTimeout(() => {
          navigation.goBack();
        }, 1000);
      } else {
        // Handle specific error messages from API
        const errorMessage = result.message || "Đổi mật khẩu thất bại";

        if (response.status === 400) {
          Alert.alert("Lỗi", "Mật khẩu hiện tại không đúng");
        } else if (response.status === 401) {
          Alert.alert(
            "Lỗi",
            "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại"
          );
        } else {
          Alert.alert("Lỗi đổi mật khẩu", errorMessage);
        }
      }
    } catch (error) {
      console.error("Change password API error:", error);

      if (
        error instanceof TypeError &&
        error.message === "Network request failed"
      ) {
        Alert.alert(
          "Lỗi kết nối",
          "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng."
        );
      }
    }
  };

  const resetPasswordAPI = async () => {
    // Implement reset password API if needed
    // This would be for forgot password flow
    Alert.alert(
      "Chức năng đang phát triển",
      "Tính năng đặt lại mật khẩu đang được phát triển"
    );
  };

  const handleBack = () => {
    navigation.goBack();
  };

  // Get password strength indicator
  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return null;

    const validation = validatePassword(password);
    const hasMinLength = password.length >= 6;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (validation.isValid) {
      return { color: "#4CAF50", text: "Mật khẩu hợp lệ ✓" };
    } else {
      const missingRequirements = [];
      if (!hasMinLength) missingRequirements.push("6 ký tự");
      if (!hasLetter) missingRequirements.push("chữ cái");
      if (!hasNumber) missingRequirements.push("chữ số");

      return {
        color: "#FF5722",
        text: `Cần: ${missingRequirements.join(", ")}`,
      };
    }
  };

  const passwordStrength = getPasswordStrength(newPassword);

  const getTitle = () => {
    return isChangePasswordMode ? "Đổi mật khẩu" : "Đặt mật khẩu mới";
  };

  const getSubtitle = () => {
    return isChangePasswordMode
      ? "Nhập mật khẩu hiện tại và mật khẩu mới"
      : "Nhập mật khẩu mới cho tài khoản của bạn";
  };

  return (
    <ScrollView
      style={authStyles.container}
      contentContainerStyle={authStyles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <AuthHeader
        title={getTitle()}
        showBackButton={true}
        onBackPress={handleBack}
      />

      <View style={authStyles.form}>
        <Text style={authStyles.subtitle}>{getSubtitle()}</Text>

        {/* Show email if available */}
        {/* {email && (
          <View style={authStyles.emailContainer}>
            <Text style={authStyles.emailLabel}>Email:</Text>
            <Text style={authStyles.emailText}>{email}</Text>
          </View>
        )} */}

        {/* Current Password - only show in change mode */}
        {isChangePasswordMode && (
          <View style={authStyles.inputGroup}>
            <Text style={authStyles.inputLabel}>Mật khẩu hiện tại</Text>
            <TextInput
              style={authStyles.roundedInput}
              placeholder="Nhập mật khẩu hiện tại"
              placeholderTextColor="#999"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />
          </View>
        )}

        {/* New Password */}
        <View style={authStyles.inputGroup}>
          <Text style={authStyles.inputLabel}>Mật khẩu mới</Text>
          <TextInput
            style={authStyles.roundedInput}
            placeholder="Ít nhất 6 ký tự, có chữ cái và số"
            placeholderTextColor="#999"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
          />
          {/* Password strength indicator */}
          {passwordStrength && (
            <Text
              style={[
                authStyles.passwordStrength,
                { color: passwordStrength.color },
              ]}
            >
              {passwordStrength.text}
            </Text>
          )}
        </View>

        {/* Confirm Password */}
        <View style={authStyles.inputGroup}>
          <Text style={authStyles.inputLabel}>Xác nhận mật khẩu mới</Text>
          <TextInput
            style={authStyles.roundedInput}
            placeholder="Nhập lại mật khẩu mới"
            placeholderTextColor="#999"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
          />
          {/* Password match indicator */}
          {confirmPassword.length > 0 && (
            <Text
              style={[
                authStyles.passwordMatch,
                {
                  color:
                    newPassword === confirmPassword ? "#4CAF50" : "#FF5722",
                },
              ]}
            >
              {newPassword === confirmPassword
                ? "Mật khẩu khớp ✓"
                : "Mật khẩu không khớp ✗"}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={[
            authStyles.roundedButton,
            isLoading && authStyles.disabledButton,
          ]}
          onPress={handleChangePassword}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={authStyles.roundedButtonText}>
              {isChangePasswordMode ? "Đổi mật khẩu" : "Đặt mật khẩu"}
            </Text>
          )}
        </TouchableOpacity>

        {/* Password Requirements Info */}
        {/* <View style={authStyles.passwordRequirements}>
          <Text style={authStyles.requirementsTitle}>Yêu cầu mật khẩu:</Text>
          <Text style={authStyles.requirementItem}>• Ít nhất 6 ký tự</Text>
          <Text style={authStyles.requirementItem}>
            • Có ít nhất một chữ cái (a-z, A-Z)
          </Text>
          <Text style={authStyles.requirementItem}>
            • Có ít nhất một chữ số (0-9)
          </Text>
          {isChangePasswordMode && (
            <Text style={authStyles.requirementItem}>
              • Khác mật khẩu hiện tại
            </Text>
          )}
        </View> */}
      </View>
    </ScrollView>
  );
};

export default NewPasswordScreen;
