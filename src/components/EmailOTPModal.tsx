// src/components/EmailOTPModal.tsx
import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

interface EmailOTPModalProps {
  visible: boolean;
  newEmail: string;
  onVerificationSuccess: () => void;
  onCancel: () => void;
  verifyEmailChange: (email: string, otp: string) => Promise<boolean>;
  resendEmailChangeOTP: (email: string) => Promise<boolean>;
}

const EmailOTPModal: React.FC<EmailOTPModalProps> = ({
  visible,
  newEmail,
  onVerificationSuccess,
  onCancel,
  verifyEmailChange,
  resendEmailChangeOTP,
}) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);

  // Countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0 && visible) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown, visible]);

  // Reset state when modal opens
  useEffect(() => {
    if (visible) {
      setOtp("");
      setCountdown(60);
    }
  }, [visible]);

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      Alert.alert("Lỗi", "Mã OTP phải có 6 chữ số");
      return;
    }

    setIsLoading(true);
    try {
      const success = await verifyEmailChange(newEmail, otp);
      if (success) {
        onVerificationSuccess();
      }
    } catch (error) {
      console.error("Verify OTP error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    try {
      const success = await resendEmailChangeOTP(newEmail);
      if (success) {
        setCountdown(60);
        setOtp("");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
    } finally {
      setIsResending(false);
    }
  };

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Xác thực Email</Text>
            <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <Text style={styles.description}>Mã xác thực đã được gửi đến:</Text>
            <Text style={styles.email}>{newEmail}</Text>

            <Text style={styles.inputLabel}>Nhập mã OTP (6 chữ số)</Text>
            <TextInput
              style={styles.otpInput}
              value={otp}
              onChangeText={(text) =>
                setOtp(text.replace(/[^0-9]/g, "").slice(0, 6))
              }
              placeholder="000000"
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={6}
              editable={!isLoading}
            />

            <Text style={styles.otpLength}>{otp.length}/6 chữ số</Text>

            <TouchableOpacity
              style={[
                styles.verifyButton,
                (isLoading || otp.length !== 6) && styles.disabledButton,
              ]}
              onPress={handleVerifyOTP}
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.verifyButtonText}>Xác thực</Text>
              )}
            </TouchableOpacity>

            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>Không nhận được mã?</Text>

              <TouchableOpacity
                style={[
                  styles.resendButton,
                  (isResending || countdown > 0) && styles.disabledButton,
                ]}
                onPress={handleResendOTP}
                disabled={isResending || countdown > 0}
              >
                {isResending ? (
                  <ActivityIndicator size="small" color="#FF6B35" />
                ) : (
                  <Text style={styles.resendButtonText}>
                    {countdown > 0
                      ? `Gửi lại sau ${formatCountdown(countdown)}`
                      : "Gửi lại mã OTP"}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#FF6B35",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  closeButton: {
    padding: 5,
  },
  closeText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B35",
    textAlign: "center",
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
    marginBottom: 8,
    textAlign: "center",
  },
  otpInput: {
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 15,
    fontSize: 20,
    textAlign: "center",
    letterSpacing: 5,
    fontWeight: "bold",
    marginBottom: 10,
  },
  otpLength: {
    fontSize: 12,
    color: "#666666",
    textAlign: "center",
    marginBottom: 25,
  },
  verifyButton: {
    backgroundColor: "#FF6B35",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  resendContainer: {
    alignItems: "center",
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  resendText: {
    fontSize: 13,
    color: "#666666",
    marginBottom: 10,
  },
  resendButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  resendButtonText: {
    fontSize: 14,
    color: "#FF6B35",
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default EmailOTPModal;
