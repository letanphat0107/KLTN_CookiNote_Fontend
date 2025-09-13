import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const AddRecipeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm Công Thức Mới</Text>
      
      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tên món ăn *</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập tên món ăn"
              placeholderTextColor="#999"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mô tả ngắn</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Mô tả ngắn về món ăn..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={3}
            />
          </View>
          
          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Thời gian nấu (phút)</Text>
              <TextInput
                style={styles.input}
                placeholder="60"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>
            
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Số người ăn</Text>
              <TextInput
                style={styles.input}
                placeholder="4"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Độ khó</Text>
            <View style={styles.difficultyContainer}>
              <TouchableOpacity style={[styles.difficultyButton, styles.selectedDifficulty]}>
                <Text style={[styles.difficultyText, styles.selectedDifficultyText]}>Dễ</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.difficultyButton}>
                <Text style={styles.difficultyText}>Trung bình</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.difficultyButton}>
                <Text style={styles.difficultyText}>Khó</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nguyên liệu *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Mỗi nguyên liệu một dòng&#10;Ví dụ:&#10;• 500g thịt bò&#10;• 2 củ hành tây&#10;• 1 thìa muối"
              placeholderTextColor="#999"
              multiline
              numberOfLines={6}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cách làm *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Mỗi bước một dòng&#10;Ví dụ:&#10;Bước 1: Sơ chế nguyên liệu...&#10;Bước 2: Ướp thịt với gia vị...&#10;Bước 3: Nấu nước dùng..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={8}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Lời khuyên</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Những lời khuyên hữu ích khi làm món này..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Danh mục</Text>
            <View style={styles.categoryContainer}>
              <TouchableOpacity style={[styles.categoryButton, styles.selectedCategory]}>
                <Text style={[styles.categoryText, styles.selectedCategoryText]}>Món chính</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.categoryText}>Món phụ</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.categoryText}>Tráng miệng</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.categoryText}>Đồ uống</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ảnh món ăn</Text>
            <TouchableOpacity style={styles.imageUploadButton}>
              <Text style={styles.imageUploadText}>📷 Chọn ảnh</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Lưu công thức</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
    color: '#333333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  form: {
    paddingBottom: 20,
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  difficultyContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  difficultyButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  selectedDifficulty: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  difficultyText: {
    fontSize: 14,
    color: '#666666',
  },
  selectedDifficultyText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedCategory: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  categoryText: {
    fontSize: 14,
    color: '#666666',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  imageUploadButton: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 40,
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  imageUploadText: {
    fontSize: 16,
    color: '#666666',
  },
  actionButtons: {
    padding: 20,
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

export default AddRecipeScreen;
