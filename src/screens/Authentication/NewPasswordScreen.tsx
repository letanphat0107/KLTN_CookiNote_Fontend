import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const NewPasswordScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đặt Mật Khẩu Mới</Text>
      <Text style={styles.subtitle}>
        Vui lòng nhập mật khẩu mới cho tài khoản của bạn
      </Text>
      
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu mới"
          placeholderTextColor="#999"
          secureTextEntry
        />
        
        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu mới"
          placeholderTextColor="#999"
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Đặt Mật Khẩu</Text>
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
    marginBottom: 16,
    color: '#333333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#666666',
    lineHeight: 24,
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
  submitButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewPasswordScreen;
