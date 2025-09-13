import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ChangePasswordScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đổi Mật Khẩu</Text>
      
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mật khẩu hiện tại</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập mật khẩu hiện tại"
            secureTextEntry
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mật khẩu mới</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập mật khẩu mới"
            secureTextEntry
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Xác nhận mật khẩu mới</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập lại mật khẩu mới"
            secureTextEntry
          />
        </View>
        
        <View style={styles.passwordRequirements}>
          <Text style={styles.requirementTitle}>Yêu cầu mật khẩu:</Text>
          <Text style={styles.requirement}>• Ít nhất 8 ký tự</Text>
          <Text style={styles.requirement}>• Có chữ hoa và chữ thường</Text>
          <Text style={styles.requirement}>• Có ít nhất 1 số</Text>
          <Text style={styles.requirement}>• Có ít nhất 1 ký tự đặc biệt</Text>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Đổi mật khẩu</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Hủy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333333',
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F8F8F8',
  },
  passwordRequirements: {
    backgroundColor: '#F0F8FF',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  requirementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  requirement: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  buttonContainer: {
    gap: 12,
  },
  saveButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cancelButtonText: {
    color: '#666666',
    fontSize: 16,
  },
});

export default ChangePasswordScreen;
