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
import AuthHeader from "../../components/AuthHeader";
import { authStyles } from "./styles";
import { API_CONFIG, API_HEADERS } from "../../config/api";

interface ForgotPasswordScreenProps {
  navigation: any;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  navigation,
}) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async () => {
    if (!email.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Lỗi", "Email không hợp lệ");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}/cookinote/auth/forgot`,
        {
          method: "POST",
          headers: API_HEADERS,
          body: JSON.stringify({ email: email.trim() }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        Alert.alert(
          "Mã OTP đã được gửi",
          "Vui lòng kiểm tra email để lấy mã OTP",
          [
            {
              text: "OK",
              onPress: () =>
                navigation.navigate("OTPVerification", {
                  email: email.trim(),
                  purpose: "forgot_password",
                }),
            },
          ]
        );
      } else {
        const errorMessage =
          result.message || "Không thể gửi mã OTP. Vui lòng thử lại.";
        Alert.alert("Lỗi", errorMessage);
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      Alert.alert(
        "Lỗi kết nối",
        "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      style={authStyles.container}
      contentContainerStyle={authStyles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <AuthHeader
        title="Quên mật khẩu"
        showBackButton={true}
        onBackPress={handleBackToLogin}
      />

      <View style={authStyles.form}>
        <Text style={authStyles.subtitle}>
          Nhập email của bạn để nhận mã OTP
        </Text>

        <View style={authStyles.inputGroup}>
          <Text style={authStyles.inputLabel}>Email</Text>
          <TextInput
            style={authStyles.roundedInput}
            placeholder="Nhập email của bạn"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
          />
        </View>

        <TouchableOpacity
          style={[
            authStyles.roundedButton,
            isLoading && authStyles.disabledButton,
          ]}
          onPress={handleSendCode}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={authStyles.roundedButtonText}>Gửi mã OTP</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;
