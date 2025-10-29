import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useAppDispatch } from "../../store/hooks";
import AuthHeader from "../../components/AuthHeader";
import { authStyles } from "./styles";
import { API_CONFIG, API_HEADERS, API_URLS } from "../../config/api";

interface RegisterScreenProps {
  navigation: any;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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

  const handleRegister = async () => {
    // Validation
    if (
      !email.trim() ||
      !username.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Lỗi", "Email không hợp lệ");
      return;
    }

    if (username.length < 3) {
      Alert.alert("Lỗi", "Tên đăng nhập phải có ít nhất 3 ký tự");
      return;
    }

    // Enhanced password validation
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      Alert.alert("Lỗi", passwordValidation.message);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp");
      return;
    }

    setIsLoading(true);

    try {
      const registerData = {
        email: email.trim(),
        username: username.trim(),
        password: password,
        displayName: username.trim(),
      };

      const response = await fetch(API_URLS.REGISTER, {
        method: "POST",
        headers: API_HEADERS,
        body: JSON.stringify(registerData),
      });

      const result = await response.json();

      if (response.ok) {
        // Registration successful, navigate to OTP verification
        Alert.alert(
          "Đăng ký thành công",
          "Vui lòng kiểm tra email để xác thực tài khoản!",
          [
            {
              text: "OK",
              onPress: () =>
                navigation.navigate("OTPVerification", {
                  email: email.trim(),
                  purpose: "register",
                }),
            },
          ]
        );
      } else {
        // Handle specific error messages from API
        const errorMessage =
          result.message || "Đăng ký thất bại. Vui lòng thử lại.";
        Alert.alert("Lỗi đăng ký", errorMessage);
      }
    } catch (error) {
      console.error("Register error:", error);

      // More specific error handling
      if (
        error instanceof TypeError &&
        error.message === "Network request failed"
      ) {
        Alert.alert(
          "Lỗi kết nối",
          "Không thể kết nối đến server. Vui lòng kiểm tra:\n\n" +
            "• Kết nối internet\n" +
            "• Server có đang chạy không\n" +
            "• Địa chỉ API có đúng không\n\n" +
            `URL: ${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REGISTER}`
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
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

  const passwordStrength = getPasswordStrength(password);

  return (
    <ScrollView
      style={authStyles.container}
      contentContainerStyle={authStyles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <AuthHeader
        title="Đăng ký"
        showBackButton={true}
        onBackPress={handleBackToLogin}
      />

      <View style={authStyles.form}>
        <View style={authStyles.inputGroup}>
          <Text style={authStyles.inputLabel}>Tên đăng nhập</Text>
          <TextInput
            style={authStyles.roundedInput}
            placeholder="username"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
          />
        </View>

        <View style={authStyles.inputGroup}>
          <Text style={authStyles.inputLabel}>Mật khẩu</Text>
          <TextInput
            style={authStyles.roundedInput}
            placeholder="Ít nhất 6 ký tự, có chữ cái và số"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
          />
          {/* {passwordStrength && (
            <Text
              style={[
                authStyles.passwordStrength,
                { color: passwordStrength.color },
              ]}
            >
              {passwordStrength.text}
            </Text>
          )} */}
        </View>

        <View style={authStyles.inputGroup}>
          <Text style={authStyles.inputLabel}>Xác nhận mật khẩu</Text>
          <TextInput
            style={authStyles.roundedInput}
            placeholder="Nhập lại mật khẩu"
            placeholderTextColor="#999"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
          />
        </View>

        <View style={authStyles.inputGroup}>
          <Text style={authStyles.inputLabel}>Email</Text>
          <TextInput
            style={authStyles.roundedInput}
            placeholder="example@email.com"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            editable={!isLoading}
          />
        </View>

        <TouchableOpacity
          style={[
            authStyles.roundedButton,
            isLoading && authStyles.disabledButton,
          ]}
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={authStyles.roundedButtonText}>Đăng ký</Text>
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
        </View> */}

        {/* Additional Info */}
        <View style={authStyles.infoContainer}>
          <Text style={authStyles.infoText}>
            Bằng cách đăng ký, bạn đồng ý với Điều khoản sử dụng và Chính sách
            bảo mật của chúng tôi.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
