import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { adminStyles } from "./styles";

const AddRecipeScreen = () => {
  return (
    <View style={adminStyles.container}>
      <Text style={adminStyles.title}>Thêm Công Thức Mới</Text>

      <ScrollView style={adminStyles.content}>
        <View style={adminStyles.form}>
          <View style={adminStyles.inputGroup}>
            <Text style={adminStyles.label}>Tên món ăn *</Text>
            <TextInput
              style={adminStyles.input}
              placeholder="Nhập tên món ăn"
              placeholderTextColor="#999"
            />
          </View>

          <View style={adminStyles.inputGroup}>
            <Text style={adminStyles.label}>Mô tả ngắn</Text>
            <TextInput
              style={[adminStyles.input, adminStyles.textArea]}
              placeholder="Mô tả ngắn về món ăn..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={adminStyles.row}>
            <View style={[adminStyles.inputGroup, adminStyles.halfWidth]}>
              <Text style={adminStyles.label}>Thời gian nấu (phút)</Text>
              <TextInput
                style={adminStyles.input}
                placeholder="60"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>

            <View style={[adminStyles.inputGroup, adminStyles.halfWidth]}>
              <Text style={adminStyles.label}>Số người ăn</Text>
              <TextInput
                style={adminStyles.input}
                placeholder="4"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={adminStyles.inputGroup}>
            <Text style={adminStyles.label}>Danh mục</Text>
            <TouchableOpacity style={adminStyles.picker}>
              <Text style={adminStyles.label}>Chọn danh mục món ăn</Text>
            </TouchableOpacity>
          </View>

          <View style={adminStyles.inputGroup}>
            <Text style={adminStyles.label}>Nguyên liệu *</Text>
            <TextInput
              style={[adminStyles.input, adminStyles.textArea]}
              placeholder="Liệt kê các nguyên liệu cần thiết..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={5}
            />
          </View>

          <View style={adminStyles.inputGroup}>
            <Text style={adminStyles.label}>Hướng dẫn nấu *</Text>
            <TextInput
              style={[adminStyles.input, adminStyles.textArea]}
              placeholder="Các bước thực hiện chi tiết..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={8}
            />
          </View>

          <View style={adminStyles.inputGroup}>
            <Text style={adminStyles.label}>Hình ảnh món ăn</Text>
            <TouchableOpacity style={adminStyles.imageButton}>
              <Text style={adminStyles.imageButtonText}>Chọn hình ảnh</Text>
            </TouchableOpacity>
          </View>

          <View style={adminStyles.inputGroup}>
            <Text style={adminStyles.label}>Mẹo vặt</Text>
            <TextInput
              style={[adminStyles.input, adminStyles.textArea]}
              placeholder="Chia sẻ những mẹo hay khi nấu món này..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={adminStyles.inputGroup}>
            <Text style={adminStyles.label}>Tags</Text>
            <TextInput
              style={adminStyles.input}
              placeholder="Ví dụ: món Việt, đơn giản, gia đình"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <View style={adminStyles.buttonContainer}>
          <TouchableOpacity style={adminStyles.primaryButton}>
            <Text style={adminStyles.primaryButtonText}>Lưu công thức</Text>
          </TouchableOpacity>

          <TouchableOpacity style={adminStyles.secondaryButton}>
            <Text style={adminStyles.secondaryButtonText}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddRecipeScreen;
