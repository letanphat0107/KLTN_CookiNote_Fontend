import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>
      
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email hoặc tên đăng nhập"
          placeholderTextColor="#999"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          placeholderTextColor="#999"
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Đăng Nhập</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.registerLink}>
          <Text style={styles.registerLinkText}>
            Chưa có tài khoản? <Text style={styles.registerLinkTextBold}>Đăng ký</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333333',
  },
  form: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#F8F8F8',
  },
  loginButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    alignItems: 'center',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#FF6B6B',
    fontSize: 14,
  },
  registerLink: {
    alignItems: 'center',
  },
  registerLinkText: {
    color: '#666666',
    fontSize: 14,
  },
  registerLinkTextBold: {
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
