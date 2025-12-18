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
import { API_URLS, createAuthHeaders, API_CONFIG, API_HEADERS } from "../../config/api";

interface NewPasswordScreenProps {
  navigation: any;
  route: any;
}

const NewPasswordScreen: React.FC<NewPasswordScreenProps> = ({
  navigation,
  route,
}) => {
  const { mode = "reset", email, otp } = route.params || {};
  const { tokens, user } = useAppSelector((state) => state.auth);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if this is change password mode (user is logged in)
  const isChangePasswordMode = mode === "change" && tokens && user;
  const isResetPasswordMode = mode === "reset" && email && otp;

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
      } else if (isResetPasswordMode) {
        // Reset password with OTP
        await resetPasswordWithOTP();
      } else {
        Alert.alert("Lỗi", "Thông tin không hợp lệ");
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

  const resetPasswordWithOTP = async () => {
    try {
      const resetData = {
        email: email,
        otp: otp,
        newPassword: newPassword,
      };

      console.log("Reset password data:", {
        ...resetData,
        otp: "[HIDDEN]",
        newPassword: "[HIDDEN]",
      });

      const response = await fetch(
        `${API_CONFIG.BASE_URL}/cookinote/auth/forgot/reset-with-otp`,
        {
          method: "PUT",
          headers: API_HEADERS,
          body: JSON.stringify(resetData),
        }
      );

      const result = await response.json();
      console.log("Reset password response:", result);

      if (response.ok) {
        Alert.alert(
          "Thành công",
          "Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại.",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("Login"),
            },
          ]
        );
      } else {
        const errorMessage =
          result.message || "Đặt lại mật khẩu thất bại. Vui lòng thử lại.";
        Alert.alert("Lỗi", errorMessage);
      }
    } catch (error) {
      console.error("Reset password API error:", error);
      Alert.alert(
        "Lỗi kết nối",
        "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng."
      );
    }
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
    if (isChangePasswordMode) return "Đổi mật khẩu";
    if (isResetPasswordMode) return "Đặt mật khẩu mới";
    return "Mật khẩu";
  };

  const getSubtitle = () => {
    if (isChangePasswordMode)
      return "Nhập mật khẩu hiện tại và mật khẩu mới";
    if (isResetPasswordMode) return "Nhập mật khẩu mới cho tài khoản của bạn";
    return "";
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

        {/* Show email in reset mode */}
        {isResetPasswordMode && (
          <View style={authStyles.otpEmailContainer}>
            <Text style={authStyles.emailLabel}>Email:</Text>
            <Text style={authStyles.otpEmailText}>{email}</Text>
          </View>
        )}

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
      </View>
    </ScrollView>
  );
};

export default NewPasswordScreen;
