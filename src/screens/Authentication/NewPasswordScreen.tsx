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

interface NewPasswordScreenProps {
  navigation: any;
  route: any;
}

const NewPasswordScreen: React.FC<NewPasswordScreenProps> = ({
  navigation,
  route,
}) => {
  const { email } = route.params || {};
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSetNewPassword = async () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      Alert.alert(
        "Đặt mật khẩu thành công",
        "Mật khẩu của bạn đã được thay đổi thành công!",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Lỗi", "Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      style={authStyles.container}
      contentContainerStyle={authStyles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <AuthHeader
        title="Đặt mật khẩu mới"
        showBackButton={true}
        onBackPress={handleBack}
      />

      <View style={authStyles.form}>
        <Text style={authStyles.subtitle}>
          Nhập mật khẩu mới cho tài khoản của bạn
        </Text>

        <View style={authStyles.inputGroup}>
          <Text style={authStyles.inputLabel}>Mật khẩu mới</Text>
          <TextInput
            style={authStyles.roundedInput}
            placeholder=""
            placeholderTextColor="#999"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
          />
        </View>

        <View style={authStyles.inputGroup}>
          <Text style={authStyles.inputLabel}>Xác nhận mật khẩu</Text>
          <TextInput
            style={authStyles.roundedInput}
            placeholder=""
            placeholderTextColor="#999"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
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
          onPress={handleSetNewPassword}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={authStyles.roundedButtonText}>Đặt mật khẩu</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NewPasswordScreen;
