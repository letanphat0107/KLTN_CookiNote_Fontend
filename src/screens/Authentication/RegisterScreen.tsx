import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { authStyles } from "./styles";

const RegisterScreen = () => {
  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Đăng Ký</Text>

      <View style={authStyles.form}>
        <TextInput
          style={authStyles.input}
          placeholder="Tên đầy đủ"
          placeholderTextColor="#999"
        />

        <TextInput
          style={authStyles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
        />

        <TextInput
          style={authStyles.input}
          placeholder="Tên đăng nhập"
          placeholderTextColor="#999"
        />

        <TextInput
          style={authStyles.input}
          placeholder="Mật khẩu"
          placeholderTextColor="#999"
          secureTextEntry
        />

        <TextInput
          style={authStyles.input}
          placeholder="Xác nhận mật khẩu"
          placeholderTextColor="#999"
          secureTextEntry
        />

        <TouchableOpacity style={authStyles.registerButton}>
          <Text style={authStyles.registerButtonText}>Đăng Ký</Text>
        </TouchableOpacity>

        <TouchableOpacity style={authStyles.loginLink}>
          <Text style={authStyles.loginLinkText}>
            Đã có tài khoản?{" "}
            <Text style={authStyles.loginLinkTextBold}>Đăng nhập</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
