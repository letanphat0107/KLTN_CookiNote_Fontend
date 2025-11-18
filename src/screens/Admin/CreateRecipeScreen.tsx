import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useAppSelector } from "../../store/hooks";
import adminService, { CreateRecipeData } from "../../services/adminService";
import { adminStyles } from "./styles";

interface Ingredient {
  name: string;
  quantity: string;
}

interface Step {
  stepNo: number;
  content: string;
  suggestedTime: number;
  tips?: string;
  imageUris?: string[];
}

const CreateRecipeScreen = () => {
  const navigation = useNavigation();
  const { tokens } = useAppSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  // Basic info
  const [categoryId, setCategoryId] = useState("1");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prepareTime, setPrepareTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [difficulty, setDifficulty] = useState<"EASY" | "MEDIUM" | "HARD">(
    "MEDIUM"
  );
  const [privacy, setPrivacy] = useState<"PUBLIC" | "PRIVATE">("PUBLIC");

  // Cover image
  const [coverImageUri, setCoverImageUri] = useState<string | null>(null);

  // Ingredients
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", quantity: "" },
  ]);

  // Steps
  const [steps, setSteps] = useState<Step[]>([
    { stepNo: 1, content: "", suggestedTime: 0, tips: "", imageUris: [] },
  ]);

  const pickCoverImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setCoverImageUri(result.assets[0].uri);
    }
  };

  const pickStepImages = async (stepIndex: number) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const newSteps = [...steps];
      // Append new images to existing ones instead of replacing
      const existingImages = newSteps[stepIndex].imageUris || [];
      newSteps[stepIndex].imageUris = [
        ...existingImages,
        ...result.assets.map((asset) => asset.uri),
      ];
      setSteps(newSteps);
    }
  };

  const removeStepImage = (stepIndex: number, imageIndex: number) => {
    const newSteps = [...steps];
    const currentImages = newSteps[stepIndex].imageUris || [];
    newSteps[stepIndex].imageUris = currentImages.filter(
      (_, idx) => idx !== imageIndex
    );
    setSteps(newSteps);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };

  const updateIngredient = (
    index: number,
    field: keyof Ingredient,
    value: string
  ) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const addStep = () => {
    setSteps([
      ...steps,
      {
        stepNo: steps.length + 1,
        content: "",
        suggestedTime: 0,
        tips: "",
        imageUris: [],
      },
    ]);
  };

  const updateStep = <K extends keyof Step>(
    index: number,
    field: K,
    value: Step[K]
  ) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: value } as Step;
    setSteps(newSteps);
  };

  const removeStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index);
    // Re-number steps
    newSteps.forEach((step, i) => {
      step.stepNo = i + 1;
    });
    setSteps(newSteps);
  };

  const validateForm = (): boolean => {
    if (!title.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập tên món ăn");
      return false;
    }
    if (!description.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập mô tả");
      return false;
    }
    if (!prepareTime || parseInt(prepareTime) <= 0) {
      Alert.alert("Lỗi", "Vui lòng nhập thời gian chuẩn bị hợp lệ");
      return false;
    }
    if (!cookTime || parseInt(cookTime) <= 0) {
      Alert.alert("Lỗi", "Vui lòng nhập thời gian nấu hợp lệ");
      return false;
    }
    if (ingredients.some((ing) => !ing.name.trim() || !ing.quantity.trim())) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin nguyên liệu");
      return false;
    }
    if (steps.some((step) => !step.content.trim())) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ nội dung các bước");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!tokens?.accessToken) {
      Alert.alert("Lỗi", "Vui lòng đăng nhập");
      return;
    }

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Prepare recipe data
      const recipeData: CreateRecipeData = {
        categoryId: parseInt(categoryId),
        title: title.trim(),
        description: description.trim(),
        prepareTime: parseInt(prepareTime),
        cookTime: parseInt(cookTime),
        difficulty,
        privacy,
        ingredients: ingredients.map((ing) => ({
          name: ing.name.trim(),
          quantity: ing.quantity.trim(),
        })),
        steps: steps.map((step) => ({
          stepNo: step.stepNo,
          content: step.content.trim(),
          suggestedTime: step.suggestedTime,
          tips: step.tips?.trim(),
        })),
      };

      // Prepare step images
      const stepImages = steps
        .filter((step) => step.imageUris && step.imageUris.length > 0)
        .map((step) => ({
          stepNo: step.stepNo,
          imageUris: step.imageUris!,
        }));

      // Create recipe with all images in one request
      const createdRecipe = await adminService.createRecipe(
        tokens.accessToken,
        recipeData,
        coverImageUri || undefined,
        stepImages
      );

      Alert.alert("Thành công", "Đã tạo công thức với đầy đủ hình ảnh", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error: any) {
      console.error("Error creating recipe:", error);
      Alert.alert("Lỗi", error.message || "Không thể tạo công thức");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={adminStyles.addContainer}>
      <Text style={adminStyles.sectionTitle}>Thông tin cơ bản</Text>

      {/* Cover Image */}
      <TouchableOpacity
        style={adminStyles.imagePickerButton}
        onPress={pickCoverImage}
      >
        {coverImageUri ? (
          <View
            style={{
              position: "relative",
              width: "100%",
              height: 200,
              borderRadius: 8,
            }}
          >
            <Image
              source={{ uri: coverImageUri }}
              style={adminStyles.coverPreview}
            />
            <TouchableOpacity
              style={adminStyles.imageRemoveButton}
              onPress={() => setCoverImageUri(null)}
            >
              <Text style={adminStyles.imageRemoveButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text>📷 Chọn ảnh bìa</Text>
        )}
      </TouchableOpacity>

      {/* Title */}
      <TextInput
        style={adminStyles.input}
        placeholder="Tên món ăn *"
        value={title}
        onChangeText={setTitle}
      />

      {/* Description */}
      <TextInput
        style={[adminStyles.input, { height: 100 }]}
        placeholder="Mô tả *"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      {/* Category */}
      <TextInput
        style={adminStyles.input}
        placeholder="ID danh mục *"
        value={categoryId}
        onChangeText={setCategoryId}
        keyboardType="numeric"
      />

      {/* Times */}
      <View style={{ flexDirection: "row", gap: 10 }}>
        <TextInput
          style={[adminStyles.input, { flex: 1 }]}
          placeholder="Thời gian chuẩn bị (phút) *"
          value={prepareTime}
          onChangeText={setPrepareTime}
          keyboardType="numeric"
        />
        <TextInput
          style={[adminStyles.input, { flex: 1 }]}
          placeholder="Thời gian nấu (phút) *"
          value={cookTime}
          onChangeText={setCookTime}
          keyboardType="numeric"
        />
      </View>

      {/* Difficulty */}
      <View style={adminStyles.filterContainer}>
        {["EASY", "MEDIUM", "HARD"].map((diff) => (
          <TouchableOpacity
            key={diff}
            style={[
              adminStyles.filterButton,
              difficulty === diff && adminStyles.filterButtonActive,
            ]}
            onPress={() => setDifficulty(diff as any)}
          >
            <Text
              style={[
                adminStyles.filterButtonText,
                difficulty === diff && adminStyles.filterButtonTextActive,
              ]}
            >
              {diff === "EASY" ? "Dễ" : diff === "MEDIUM" ? "TB" : "Khó"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Ingredients */}
      <Text style={adminStyles.sectionTitle}>Nguyên liệu</Text>
      {ingredients.map((ing, index) => (
        <View
          key={index}
          style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}
        >
          <TextInput
            style={[adminStyles.input, { flex: 2 }]}
            placeholder="Tên nguyên liệu"
            value={ing.name}
            onChangeText={(text) => updateIngredient(index, "name", text)}
          />
          <TextInput
            style={[adminStyles.input, { flex: 1 }]}
            placeholder="Số lượng"
            value={ing.quantity}
            onChangeText={(text) => updateIngredient(index, "quantity", text)}
          />
          {ingredients.length > 1 && (
            <TouchableOpacity onPress={() => removeIngredient(index)}>
              <Text style={{ fontSize: 24, color: "red" }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
      <TouchableOpacity style={adminStyles.addButton} onPress={addIngredient}>
        <Text style={adminStyles.addButtonText}>+ Thêm nguyên liệu</Text>
      </TouchableOpacity>

      {/* Steps */}
      <Text style={adminStyles.sectionTitle}>Các bước thực hiện</Text>
      {steps.map((step, index) => (
        <View key={index} style={adminStyles.stepContainer}>
          <Text style={adminStyles.stepNumber}>Bước {step.stepNo}</Text>

          <TextInput
            style={[adminStyles.input, { height: 80 }]}
            placeholder="Nội dung bước *"
            value={step.content}
            onChangeText={(text) => updateStep(index, "content", text)}
            multiline
          />

          <TextInput
            style={adminStyles.input}
            placeholder="Thời gian gợi ý (phút)"
            value={step.suggestedTime.toString()}
            onChangeText={(text) =>
              updateStep(index, "suggestedTime", parseInt(text) || 0)
            }
            keyboardType="numeric"
          />

          <TextInput
            style={[adminStyles.input, { height: 60 }]}
            placeholder="Mẹo (tùy chọn)"
            value={step.tips}
            onChangeText={(text) => updateStep(index, "tips", text)}
            multiline
          />

          {/* Image Picker Button */}
        <TouchableOpacity
          style={adminStyles.imagePickerButton}
          onPress={() => pickStepImages(index)}
        >
          <Text>
            📷 {step.imageUris?.length ? "Thêm" : "Chọn"} ảnh cho bước này
            {step.imageUris?.length ? ` (${step.imageUris.length})` : ""}
          </Text>
        </TouchableOpacity>

        {/* Step Images Grid */}
        {step.imageUris && step.imageUris.length > 0 && (
          <View style={adminStyles.stepImagesContainer}>
            {step.imageUris.map((uri, imgIndex) => (
              <View key={imgIndex} style={adminStyles.stepImageWrapper}>
                <Image
                  source={{ uri }}
                  style={adminStyles.stepImagePreview}
                />
                <TouchableOpacity
                  style={adminStyles.stepImageRemoveButton}
                  onPress={() => removeStepImage(index, imgIndex)}
                >
                  <Text style={adminStyles.stepImageRemoveButtonText}>✕</Text>
                </TouchableOpacity>
                <View style={adminStyles.stepImageNumber}>
                  <Text style={adminStyles.stepImageNumberText}>
                    {imgIndex + 1}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          )}

          {steps.length > 1 && (
            <TouchableOpacity
              style={adminStyles.removeButton}
              onPress={() => removeStep(index)}
            >
              <Text style={{ color: "red" }}>Xóa bước này</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
      <TouchableOpacity style={adminStyles.addButton} onPress={addStep}>
        <Text style={adminStyles.addButtonText}>+ Thêm bước</Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity
        style={[adminStyles.submitButton, loading && { opacity: 0.6 }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={adminStyles.submitButtonText}>Tạo công thức</Text>
        )}
      </TouchableOpacity>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

export default CreateRecipeScreen;
