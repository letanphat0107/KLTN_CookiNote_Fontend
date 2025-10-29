// src/hooks/useUserProfile.ts
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { UserService } from "../services/userService";
import { loginSuccess } from "../store/authSlice";
import { Alert, ToastAndroid, Platform } from "react-native";

export const useUserProfile = () => {
  const { tokens, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const showToast = (message: string) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert("Thông báo", message);
    }
  };

  const updateDisplayName = async (newDisplayName: string) => {
    if (!tokens?.accessToken) {
      Alert.alert("Lỗi", "Vui lòng đăng nhập lại");
      return false;
    }

    setIsLoading(true);
    try {
      const result = await UserService.updateDisplayName(
        newDisplayName,
        tokens.accessToken
      );

      if (result.code === 200) {
        // Update Redux store with new display name
        if (user) {
          const updatedUserData = {
            userId: user.userId,
            username: user.username || "",
            email: user.email,
            displayName: newDisplayName,
            avatarUrl: user.avatarUrl,
            tokens: tokens,
          };
          dispatch(loginSuccess(updatedUserData));
        }

        showToast("Cập nhật tên hiển thị thành công!");
        return true;
      } else {
        Alert.alert("Lỗi", result.message || "Cập nhật thất bại");
        return false;
      }
    } catch (error) {
      console.error("Update display name error:", error);
      Alert.alert("Lỗi", "Không thể kết nối đến server");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const requestEmailChange = async (newEmail: string) => {
    if (!tokens?.accessToken) {
      Alert.alert("Lỗi", "Vui lòng đăng nhập lại");
      return false;
    }

    setIsLoading(true);
    try {
      const result = await UserService.requestEmailChange(
        newEmail,
        tokens.accessToken
      );

      if (result.code === 200) {
        showToast("Mã OTP đã được gửi đến email mới!");
        return true;
      } else {
        Alert.alert("Lỗi", result.message || "Gửi OTP thất bại");
        return false;
      }
    } catch (error) {
      console.error("Request email change error:", error);
      Alert.alert("Lỗi", "Không thể kết nối đến server");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resendEmailChangeOTP = async (newEmail: string) => {
    if (!tokens?.accessToken) {
      Alert.alert("Lỗi", "Vui lòng đăng nhập lại");
      return false;
    }

    setIsLoading(true);
    try {
      const result = await UserService.resendEmailChangeOTP(
        newEmail,
        tokens.accessToken
      );

      if (result.code === 200) {
        showToast("Mã OTP mới đã được gửi!");
        return true;
      } else {
        Alert.alert("Lỗi", result.message || "Gửi lại OTP thất bại");
        return false;
      }
    } catch (error) {
      console.error("Resend email OTP error:", error);
      Alert.alert("Lỗi", "Không thể kết nối đến server");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmailChange = async (newEmail: string, otp: string) => {
    if (!tokens?.accessToken) {
      Alert.alert("Lỗi", "Vui lòng đăng nhập lại");
      return false;
    }

    setIsLoading(true);
    try {
      const result = await UserService.verifyEmailChange(
        newEmail,
        otp,
        tokens.accessToken
      );

      if (result.code === 200) {
        // Update Redux store with new email
        if (user) {
          const updatedUserData = {
            userId: user.userId,
            username: user.username || "",
            email: newEmail,
            displayName: user.displayName,
            avatarUrl: user.avatarUrl,
            tokens: tokens,
          };
          dispatch(loginSuccess(updatedUserData));
        }

        showToast("Đổi email thành công!");
        return true;
      } else {
        Alert.alert("Lỗi", result.message || "Xác thực OTP thất bại");
        return false;
      }
    } catch (error) {
      console.error("Verify email change error:", error);
      Alert.alert("Lỗi", "Không thể kết nối đến server");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const changeAvatar = async (imageUri: string) => {
    if (!tokens?.accessToken) {
      Alert.alert("Lỗi", "Vui lòng đăng nhập lại");
      return false;
    }

    setIsLoading(true);
    try {
      // Create FormData for image upload
      const formData = new FormData();
      formData.append("avatar", {
        uri: imageUri,
        type: "image/jpeg",
        name: "avatar.jpg",
      } as any);

      const result = await UserService.changeAvatar(
        {
          uri: imageUri,
          type: "image/jpeg",
          name: "avatar.jpg",
        },
        tokens.accessToken
      );

      if (result.code === 200) {
        // Update Redux store with new avatar URL
        if (user) {
          const updatedUserData = {
            userId: user.userId,
            username: user.username || "",
            email: user.email,
            displayName: user.displayName,
            avatarUrl: result.data?.avatarUrl || imageUri,
            tokens: tokens,
          };
          dispatch(loginSuccess(updatedUserData));
        }

        showToast("Cập nhật avatar thành công!");
        return true;
      } else {
        Alert.alert("Lỗi", result.message || "Cập nhật avatar thất bại");
        return false;
      }
    } catch (error) {
      console.error("Change avatar error:", error);
      Alert.alert("Lỗi", "Không thể kết nối đến server");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    updateDisplayName,
    requestEmailChange,
    resendEmailChangeOTP,
    verifyEmailChange,
    changeAvatar,
  };
};
