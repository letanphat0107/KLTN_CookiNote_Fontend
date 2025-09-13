import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { accountStyles } from "./styles";

const ProfileScreen = () => {
  return (
    <View style={accountStyles.container}>
      <Text style={accountStyles.title}>Thông Tin Cá Nhân</Text>

      <View style={accountStyles.form}>
        <View style={accountStyles.inputGroup}>
          <Text style={accountStyles.label}>Tên đầy đủ</Text>
          <TextInput
            style={accountStyles.input}
            placeholder="Nhập tên đầy đủ"
            defaultValue="Nguyễn Văn A"
          />
        </View>

        <View style={accountStyles.inputGroup}>
          <Text style={accountStyles.label}>Email</Text>
          <TextInput
            style={accountStyles.input}
            placeholder="Nhập email"
            defaultValue="user@example.com"
            keyboardType="email-address"
          />
        </View>

        <View style={accountStyles.inputGroup}>
          <Text style={accountStyles.label}>Số điện thoại</Text>
          <TextInput
            style={accountStyles.input}
            placeholder="Nhập số điện thoại"
            defaultValue="0123456789"
            keyboardType="phone-pad"
          />
        </View>

        <View style={accountStyles.inputGroup}>
          <Text style={accountStyles.label}>Địa chỉ</Text>
          <TextInput
            style={accountStyles.input}
            placeholder="Nhập địa chỉ"
            defaultValue="123 Đường ABC, TP.HCM"
          />
        </View>

        <View style={accountStyles.inputGroup}>
          <Text style={accountStyles.label}>Giới thiệu bản thân</Text>
          <TextInput
            style={[accountStyles.input, accountStyles.textArea]}
            placeholder="Viết giới thiệu về bản thân..."
            multiline
            numberOfLines={4}
            defaultValue="Tôi là một người yêu thích nấu ăn và khám phá những món ăn mới."
          />
        </View>
      </View>

      <View style={accountStyles.buttonContainer}>
        <TouchableOpacity style={accountStyles.primaryButton}>
          <Text style={accountStyles.primaryButtonText}>Lưu thay đổi</Text>
        </TouchableOpacity>

        <TouchableOpacity style={accountStyles.cancelButton}>
          <Text style={accountStyles.cancelButtonText}>Hủy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
