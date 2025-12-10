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
import {
  clearError,
  setLoading,
  loginSuccess,
  loginFailure,
} from "../../store/authSlice";
import AuthHeader from "../../components/AuthHeader";
import { authStyles } from "./styles";
import { API_CONFIG, API_HEADERS } from "../../config/api";
import { LoginResponse } from "../../types/user";

interface LoginScreenProps {
  navigation?: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      const loginData = {
        username: username.trim(),
        password: password,
      };

      const response = await fetch(
        API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.AUTH.LOGIN,
        {
          method: "POST",
          headers: API_HEADERS,
          body: JSON.stringify(loginData),
        }
      );

      const result: LoginResponse = await response.json();

      if (response.ok && result.code === 200) {
        // Login successful
        dispatch(loginSuccess(result.data));

        // Navigate based on user role
        if (navigation) {
          const userRole = result.data.role;

          navigation.reset({
            index: 0,
            routes: [
              {
                name: userRole === "ADMIN" ? "AdminDashboard" : "MainTabs",
              },
            ],
          });
        }
      } else {
        // Handle login errors
        const errorMessage = result.message || "Đăng nhập thất bại";
        dispatch(loginFailure(errorMessage));

        if (response.status === 401) {
          Alert.alert(
            "Lỗi đăng nhập",
            "Tên đăng nhập hoặc mật khẩu không đúng"
          );
        } else if (response.status === 403) {
          Alert.alert(
            "Tài khoản bị khóa",
            "Tài khoản của bạn đã bị vô hiệu hóa"
          );
        } else {
          Alert.alert("Lỗi đăng nhập", errorMessage);
        }
      }
    } catch (error) {
      console.error("Login error:", error);

      const errorMessage =
        error instanceof TypeError && error.message === "Network request failed"
          ? "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng."
          : `Lỗi không xác định`;

      dispatch(loginFailure(errorMessage));
      Alert.alert("Lỗi kết nối", errorMessage);
    }
  };

  // Clear error when component unmounts
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
      <AuthHeader title="Đăng nhập" showBackButton={false} />

      <View style={authStyles.form}>
        <View style={authStyles.inputGroup}>
          <Text style={authStyles.inputLabel}>Tên đăng nhập</Text>
          <TextInput
            style={authStyles.roundedInput}
            placeholder="username"
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
            placeholder="Nhập mật khẩu"
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

        {/* Test Login Buttons for Development */}
        {/* {__DEV__ && (
          <View style={authStyles.testSection}>
            <Text style={authStyles.testTitle}>🧪 Test Account</Text>
            <TouchableOpacity
              style={authStyles.testButton}
              onPress={() => {
                setUsername("uiooo");
                setPassword("000000p");
              }}
              disabled={isLoading}
            >
              <Text style={authStyles.testButtonText}>Fill User Account</Text>
            </TouchableOpacity>
            <Text style={authStyles.testTitle}>🧪 Test Account</Text>
            <TouchableOpacity
              style={authStyles.testButton}
              onPress={() => {
                setUsername("adminadmin");
                setPassword("newPassword123");
              }}
              disabled={isLoading}
            >
              <Text style={authStyles.testButtonText}>Fill Admin Account</Text>
            </TouchableOpacity>
          </View>
        )} */}
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
