import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { authStyles } from "./styles";

const ForgotPasswordScreen = () => {
  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Quên Mật Khẩu</Text>
      <Text style={authStyles.subtitle}>
        Nhập email của bạn để nhận liên kết đặt lại mật khẩu
      </Text>

      <View style={authStyles.form}>
        <TextInput
          style={authStyles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
        />

        <TouchableOpacity style={authStyles.primaryButton}>
          <Text style={authStyles.primaryButtonText}>Gửi Liên Kết</Text>
        </TouchableOpacity>

        <TouchableOpacity style={authStyles.registerLink}>
          <Text style={authStyles.linkText}>Quay lại đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
