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
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginUser, clearError } from "../../store/authSlice";
import AuthHeader from "../../components/AuthHeader";
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
    <ScrollView
      style={authStyles.container}
      contentContainerStyle={authStyles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <AuthHeader title="Đăng nhập" showBackButton={true} />

      <View style={authStyles.form}>
        <View style={authStyles.inputGroup}>
          <Text style={authStyles.inputLabel}>Tên đăng nhập</Text>
          <TextInput
            style={authStyles.roundedInput}
            placeholder=""
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
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

        <TouchableOpacity
          style={[
            authStyles.roundedButton,
            isLoading && authStyles.disabledButton,
          ]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={authStyles.roundedButtonText}>Đăng nhập</Text>
          )}
        </TouchableOpacity>

        {error && <Text style={authStyles.errorText}>{error}</Text>}

        <View style={{ marginTop: 20, alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => navigation?.navigate("ForgotPassword")}
            disabled={isLoading}
          >
            <Text style={authStyles.linkText}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 15 }}
            onPress={() => navigation?.navigate("Register")}
            disabled={isLoading}
          >
            <Text style={authStyles.secondaryText}>
              Chưa có tài khoản?{" "}
              <Text style={authStyles.linkText}>Đăng ký</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
