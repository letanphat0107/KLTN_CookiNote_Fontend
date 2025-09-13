import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { authStyles } from "./styles";

const LoginScreen = () => {
  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Đăng Nhập</Text>

      <View style={authStyles.form}>
        <TextInput
          style={authStyles.input}
          placeholder="Email hoặc tên đăng nhập"
          placeholderTextColor="#999"
        />

        <TextInput
          style={authStyles.input}
          placeholder="Mật khẩu"
          placeholderTextColor="#999"
          secureTextEntry
        />

        <TouchableOpacity style={authStyles.loginButton}>
          <Text style={authStyles.loginButtonText}>Đăng Nhập</Text>
        </TouchableOpacity>

        <TouchableOpacity style={authStyles.forgotPassword}>
          <Text style={authStyles.forgotPasswordText}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={authStyles.registerLink}>
          <Text style={authStyles.registerLinkText}>
            Chưa có tài khoản?{" "}
            <Text style={authStyles.registerLinkTextBold}>Đăng ký</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
