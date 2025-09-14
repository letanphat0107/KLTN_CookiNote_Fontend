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
import { useAppDispatch } from "../../store/hooks";
import AuthHeader from "../../components/AuthHeader";
import { authStyles } from "./styles";

interface RegisterScreenProps {
  navigation: any;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      Alert.alert(
        "Đăng ký thành công",
        "Tài khoản của bạn đã được tạo thành công!",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Đăng ký thất bại", "Có lỗi xảy ra. Vui lòng thử lại.");
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
        title="Đăng ký"
        showBackButton={true}
        onBackPress={handleBackToLogin}
      />

      <View style={authStyles.form}>
        <View style={authStyles.inputGroup}>
          <Text style={authStyles.inputLabel}>Tên đăng nhập</Text>
          <TextInput
            style={authStyles.roundedInput}
            placeholder=""
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
          />
        </View>

        <View style={authStyles.inputGroup}>
          <Text style={authStyles.inputLabel}>Mật khẩu</Text>
          <TextInput
            style={authStyles.roundedInput}
            placeholder=""
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
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
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={authStyles.roundedButtonText}>Đăng ký</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
