import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { authStyles } from "./styles";

const NewPasswordScreen = () => {
  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Đặt Mật Khẩu Mới</Text>
      <Text style={authStyles.subtitle}>
        Vui lòng nhập mật khẩu mới cho tài khoản của bạn
      </Text>

      <View style={authStyles.form}>
        <TextInput
          style={authStyles.input}
          placeholder="Mật khẩu mới"
          placeholderTextColor="#999"
          secureTextEntry
        />

        <TextInput
          style={authStyles.input}
          placeholder="Xác nhận mật khẩu mới"
          placeholderTextColor="#999"
          secureTextEntry
        />

        <TouchableOpacity style={authStyles.primaryButton}>
          <Text style={authStyles.primaryButtonText}>Đặt Mật Khẩu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewPasswordScreen;
