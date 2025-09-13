import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginUser, clearError } from "../../store/authSlice";
import { authStyles } from "./styles";

interface LoginScreenProps {
  navigation?: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      // Navigation sẽ được handle tự động bởi RootNavigator
    } catch (error) {
      Alert.alert("Đăng nhập thất bại", error as string);
    }
  };

  const handleRegister = () => {
    if (navigation) {
      navigation.navigate("Register");
    }
  };

  // Clear error khi component unmount
  React.useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Đăng Nhập</Text>

      <View style={authStyles.form}>
        {/* Demo credentials info */}
        <View style={authStyles.demoContainer}>
          <Text style={authStyles.demoTitle}>Demo Account:</Text>
          <Text style={authStyles.demoText}>Username: phat123</Text>
          <Text style={authStyles.demoText}>Password: 111111</Text>
        </View>

        <TextInput
          style={authStyles.input}
          placeholder="Email hoặc tên đăng nhập"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
        />

        <TextInput
          style={authStyles.input}
          placeholder="Mật khẩu"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
        />

        <TouchableOpacity
          style={[
            authStyles.loginButton,
            isLoading && authStyles.disabledButton,
          ]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={authStyles.loginButtonText}>Đăng Nhập</Text>
          )}
        </TouchableOpacity>

        {error && <Text style={authStyles.errorText}>{error}</Text>}

        <TouchableOpacity style={authStyles.forgotPassword}>
          <Text style={authStyles.forgotPasswordText}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={authStyles.registerLink}
          onPress={handleRegister}
          disabled={isLoading}
        >
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
