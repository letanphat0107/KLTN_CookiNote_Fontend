import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { accountStyles } from "./styles";

const ChangePasswordScreen = () => {
  return (
    <View style={accountStyles.container}>
      <Text style={accountStyles.title}>Đổi Mật Khẩu</Text>

      <View style={accountStyles.form}>
        <View style={accountStyles.inputGroup}>
          <Text style={accountStyles.label}>Mật khẩu hiện tại</Text>
          <TextInput
            style={accountStyles.input}
            placeholder="Nhập mật khẩu hiện tại"
            secureTextEntry
          />
        </View>

        <View style={accountStyles.inputGroup}>
          <Text style={accountStyles.label}>Mật khẩu mới</Text>
          <TextInput
            style={accountStyles.input}
            placeholder="Nhập mật khẩu mới"
            secureTextEntry
          />
        </View>

        <View style={accountStyles.inputGroup}>
          <Text style={accountStyles.label}>Xác nhận mật khẩu mới</Text>
          <TextInput
            style={accountStyles.input}
            placeholder="Nhập lại mật khẩu mới"
            secureTextEntry
          />
        </View>

        <View style={accountStyles.passwordRequirements}>
          <Text style={accountStyles.requirementTitle}>Yêu cầu mật khẩu:</Text>
          <Text style={accountStyles.requirement}>• Ít nhất 8 ký tự</Text>
          <Text style={accountStyles.requirement}>
            • Có chữ hoa và chữ thường
          </Text>
          <Text style={accountStyles.requirement}>• Có ít nhất 1 số</Text>
          <Text style={accountStyles.requirement}>
            • Có ít nhất 1 ký tự đặc biệt
          </Text>
        </View>
      </View>

      <View style={accountStyles.buttonContainer}>
        <TouchableOpacity style={accountStyles.primaryButton}>
          <Text style={accountStyles.primaryButtonText}>Đổi mật khẩu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={accountStyles.cancelButton}>
          <Text style={accountStyles.cancelButtonText}>Hủy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePasswordScreen;
