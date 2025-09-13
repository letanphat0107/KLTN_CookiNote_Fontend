import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Ký</Text>
      
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Tên đầy đủ"
          placeholderTextColor="#999"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Tên đăng nhập"
          placeholderTextColor="#999"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          placeholderTextColor="#999"
          secureTextEntry
        />
        
        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu"
          placeholderTextColor="#999"
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Đăng Ký</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.loginLink}>
          <Text style={styles.loginLinkText}>
            Đã có tài khoản? <Text style={styles.loginLinkTextBold}>Đăng nhập</Text>
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
  registerButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    alignItems: 'center',
  },
  loginLinkText: {
    color: '#666666',
    fontSize: 14,
  },
  loginLinkTextBold: {
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
