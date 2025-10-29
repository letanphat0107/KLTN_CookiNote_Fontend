import React, { useState, useEffect } from "react";
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

interface OTPVerificationScreenProps {
  route: {
    params: {
      email: string;
      purpose: "register" | "email_change";
    };
  };
  navigation: any;
}

const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = ({
  route,
  navigation,
}) => {
  const { email, purpose } = route.params;
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    // Start countdown when component mounts
    setCountdown(60);
  }, []);

  useEffect(() => {
    // Countdown timer
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập mã OTP");
      return;
    }

    if (otp.length !== 6) {
      Alert.alert("Lỗi", "Mã OTP phải có 6 chữ số");
      return;
    }

    setIsLoading(true);

    try {
      const verifyData = {
        email: email,
        otp: otp.trim(),
      };

      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.VERIFY_OTP}`,
        {
          method: "POST",
          headers: API_HEADERS,
          body: JSON.stringify(verifyData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        // OTP verification successful
        const successMessage =
          purpose === "register"
            ? "Xác thực email thành công! Tài khoản của bạn đã được kích hoạt."
            : "Xác thực email thành công!";

        Alert.alert("Thành công", successMessage, [
          {
            text: "OK",
            onPress: () => {
              if (purpose === "register") {
                navigation.navigate("Login");
              } else {
                navigation.goBack();
              }
            },
          },
        ]);
      } else {
        // Handle specific error messages from API
        const errorMessage =
          result.message || "Mã OTP không hợp lệ hoặc đã hết hạn";
        Alert.alert("Xác thực thất bại", errorMessage);
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      Alert.alert(
        "Lỗi kết nối",
        "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) {
      Alert.alert(
        "Thông báo",
        `Vui lòng chờ ${countdown} giây trước khi gửi lại OTP`
      );
      return;
    }

    setIsResending(true);

    try {
      const resendData = {
        email: email,
      };

      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.RESEND_OTP}`,
        {
          method: "POST",
          headers: API_HEADERS,
          body: JSON.stringify(resendData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        Alert.alert("Thành công", "Mã OTP mới đã được gửi đến email của bạn");
        setCountdown(60); // Reset countdown
        setOtp(""); // Clear current OTP
      } else {
        const errorMessage =
          result.message || "Không thể gửi lại OTP. Vui lòng thử lại.";
        Alert.alert("Lỗi", errorMessage);
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      Alert.alert(
        "Lỗi kết nối",
        "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng."
      );
    } finally {
      setIsResending(false);
    }
  };

  const handleBack = () => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc muốn quay lại? Quá trình xác thực sẽ bị hủy.",
      [
        { text: "Ở lại", style: "cancel" },
        { text: "Quay lại", onPress: () => navigation.goBack() },
      ]
    );
  };

  const getTitle = () => {
    return purpose === "register" ? "Xác thực tài khoản" : "Xác thực email";
  };

  const getDescription = () => {
    return purpose === "register"
      ? "Chúng tôi đã gửi mã xác thực đến email của bạn để hoàn tất đăng ký."
      : "Chúng tôi đã gửi mã xác thực đến email mới của bạn.";
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
        {/* Email Display */}
        <View style={authStyles.otpEmailContainer}>
          <Text style={authStyles.otpDescription}>{getDescription()}</Text>
          <Text style={authStyles.otpEmailText}>{email}</Text>
        </View>

        {/* OTP Input */}
        <View style={authStyles.inputGroup}>
          <Text style={authStyles.inputLabel}>Mã xác thực (OTP)</Text>
          <TextInput
            style={[authStyles.roundedInput, authStyles.otpInput]}
            placeholder="Nhập 6 chữ số"
            placeholderTextColor="#999"
            value={otp}
            onChangeText={(text) => setOtp(text.replace(/[^0-9]/g, ""))}
            keyboardType="numeric"
            maxLength={6}
            editable={!isLoading}
          />
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          style={[
            authStyles.roundedButton,
            (isLoading || otp.length !== 6) && authStyles.disabledButton,
          ]}
          onPress={handleVerifyOTP}
          disabled={isLoading || otp.length !== 6}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={authStyles.roundedButtonText}>Xác thực</Text>
          )}
        </TouchableOpacity>

        {/* Resend OTP */}
        <View style={authStyles.resendContainer}>
          <Text style={authStyles.resendText}>Không nhận được mã? </Text>
          <TouchableOpacity
            onPress={handleResendOTP}
            disabled={countdown > 0 || isResending}
          >
            {isResending ? (
              <ActivityIndicator size="small" color="#FF6B35" />
            ) : (
              <Text
                style={[
                  authStyles.resendButton,
                  countdown > 0 && authStyles.resendButtonDisabled,
                ]}
              >
                {countdown > 0 ? `Gửi lại (${countdown}s)` : "Gửi lại OTP"}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Help Text */}
        <View style={authStyles.helpContainer}>
          <Text style={authStyles.helpText}>
            • Mã OTP có hiệu lực trong 5 phút{"\n"}• Kiểm tra thư mục spam nếu
            không thấy email{"\n"}• Liên hệ hỗ trợ nếu gặp vấn đề
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default OTPVerificationScreen;
