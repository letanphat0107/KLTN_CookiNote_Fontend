// src/hooks/useImagePicker.ts
import { useState } from "react";
import { Alert } from "react-native";

export const useImagePicker = () => {
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = (): Promise<string | null> => {
    return new Promise((resolve) => {
      Alert.alert("Chọn ảnh đại diện", "Bạn muốn chọn ảnh từ đâu?", [
        { text: "Hủy", style: "cancel", onPress: () => resolve(null) },
        {
          text: "Thư viện ảnh",
          onPress: () => {
            // Simulate image picker - replace with actual image picker
            const mockImageUri = "https://via.placeholder.com/150";
            resolve(mockImageUri);
          },
        },
        {
          text: "Chụp ảnh",
          onPress: () => {
            // Simulate camera - replace with actual camera
            const mockImageUri = "https://via.placeholder.com/150";
            resolve(mockImageUri);
          },
        },
      ]);
    });
  };

  return {
    isLoading,
    pickImage,
  };
};
