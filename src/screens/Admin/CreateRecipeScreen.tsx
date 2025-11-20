import React, { useState, useEffect } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import { getCategories } from "../../services/categoryService";
import { Category } from "../../types/recipe";

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
  const [categories, setCategories] = useState<Category[]>([]);

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

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const pickCoverImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Lỗi", "Cần cấp quyền truy cập thư viện ảnh");
      return;
    }

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
    if (ingredients.length === 1) {
      Alert.alert("Lỗi", "Phải có ít nhất một nguyên liệu");
      return;
    }
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
    if (steps.length === 1) {
      Alert.alert("Lỗi", "Phải có ít nhất một bước thực hiện");
      return;
    }
    const newSteps = steps.filter((_, i) => i !== index);
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
        recipeData,
        coverImageUri || undefined,
        stepImages
      );

      Alert.alert("Thành công", "Đã tạo công thức mới", [
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

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "EASY":
        return "#4CAF50";
      case "MEDIUM":
        return "#FF9800";
      case "HARD":
        return "#F44336";
      default:
        return "#757575";
    }
  };

  const getDifficultyIcon = (diff: string) => {
    switch (diff) {
      case "EASY":
        return "leaf-outline";
      case "MEDIUM":
        return "flame-outline";
      case "HARD":
        return "flash-outline";
      default:
        return "help-outline";
    }
  };

  return (
    <View style={adminStyles.container}>
      <ScrollView
        style={adminStyles.modernFormContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cover Image Section */}
        <View style={adminStyles.modernSection}>
          <Text style={adminStyles.modernSectionTitle}>
            <Ionicons name="image-outline" size={20} color="#FF6B6B" /> Ảnh bìa
          </Text>
          <TouchableOpacity
            style={adminStyles.modernImagePicker}
            onPress={pickCoverImage}
          >
            {coverImageUri ? (
              <View style={adminStyles.modernImagePreviewContainer}>
                <Image
                  source={{ uri: coverImageUri }}
                  style={adminStyles.modernCoverPreview}
                />
                <TouchableOpacity
                  style={adminStyles.modernImageRemoveButton}
                  onPress={() => setCoverImageUri(null)}
                >
                  <Ionicons name="close-circle" size={32} color="#FFF" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={adminStyles.modernImagePlaceholder}>
                <Ionicons name="camera-outline" size={48} color="#95A5A6" />
                <Text style={adminStyles.modernImagePlaceholderText}>
                  Chọn ảnh bìa
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Basic Info Section */}
        <View style={adminStyles.modernSection}>
          <Text style={adminStyles.modernSectionTitle}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color="#FF6B6B"
            />{" "}
            Thông tin cơ bản
          </Text>

          <View style={adminStyles.modernFormGroup}>
            <Text style={adminStyles.modernLabel}>Tên món ăn *</Text>
            <TextInput
              style={adminStyles.modernInput}
              placeholder="Nhập tên món ăn"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor="#95A5A6"
            />
          </View>

          <View style={adminStyles.modernFormGroup}>
            <Text style={adminStyles.modernLabel}>Mô tả *</Text>
            <TextInput
              style={[adminStyles.modernInput, adminStyles.modernTextArea]}
              placeholder="Nhập mô tả món ăn"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor="#95A5A6"
            />
          </View>

          <View style={adminStyles.modernFormGroup}>
            <Text style={adminStyles.modernLabel}>Danh mục *</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={adminStyles.categoryScrollPicker}
            >
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    adminStyles.modernCategoryChip,
                    categoryId === cat.id.toString() &&
                      adminStyles.modernCategoryChipActive,
                  ]}
                  onPress={() => setCategoryId(cat.id.toString())}
                >
                  <Text
                    style={[
                      adminStyles.modernCategoryChipText,
                      categoryId === cat.id.toString() &&
                        adminStyles.modernCategoryChipTextActive,
                    ]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={adminStyles.modernRowGroup}>
            <View style={[adminStyles.modernFormGroup, { flex: 1 }]}>
              <Text style={adminStyles.modernLabel}>
                <Ionicons name="time-outline" size={16} color="#7F8C8D" /> Chuẩn
                bị (phút) *
              </Text>
              <TextInput
                style={adminStyles.modernInput}
                placeholder="0"
                value={prepareTime}
                onChangeText={setPrepareTime}
                keyboardType="numeric"
                placeholderTextColor="#95A5A6"
              />
            </View>

            <View style={[adminStyles.modernFormGroup, { flex: 1 }]}>
              <Text style={adminStyles.modernLabel}>
                <Ionicons name="flame-outline" size={16} color="#7F8C8D" /> Nấu
                (phút) *
              </Text>
              <TextInput
                style={adminStyles.modernInput}
                placeholder="0"
                value={cookTime}
                onChangeText={setCookTime}
                keyboardType="numeric"
                placeholderTextColor="#95A5A6"
              />
            </View>
          </View>

          <View style={adminStyles.modernFormGroup}>
            <Text style={adminStyles.modernLabel}>Độ khó *</Text>
            <View style={adminStyles.modernDifficultyPicker}>
              {(["EASY", "MEDIUM", "HARD"] as const).map((diff) => (
                <TouchableOpacity
                  key={diff}
                  style={[
                    adminStyles.modernDifficultyChip,
                    difficulty === diff &&
                      adminStyles.modernDifficultyChipActive,
                    difficulty === diff && {
                      backgroundColor: getDifficultyColor(diff),
                    },
                  ]}
                  onPress={() => setDifficulty(diff)}
                >
                  <Ionicons
                    name={getDifficultyIcon(diff) as any}
                    size={18}
                    color={difficulty === diff ? "#FFF" : "#7F8C8D"}
                  />
                  <Text
                    style={[
                      adminStyles.modernDifficultyChipText,
                      difficulty === diff &&
                        adminStyles.modernDifficultyChipTextActive,
                    ]}
                  >
                    {diff === "EASY"
                      ? "Dễ"
                      : diff === "MEDIUM"
                      ? "Trung bình"
                      : "Khó"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={adminStyles.modernFormGroup}>
            <Text style={adminStyles.modernLabel}>Quyền riêng tư</Text>
            <View style={adminStyles.modernPrivacyPicker}>
              <TouchableOpacity
                style={[
                  adminStyles.modernPrivacyChip,
                  privacy === "PUBLIC" && adminStyles.modernPrivacyChipActive,
                ]}
                onPress={() => setPrivacy("PUBLIC")}
              >
                <Ionicons
                  name="earth-outline"
                  size={18}
                  color={privacy === "PUBLIC" ? "#FFF" : "#7F8C8D"}
                />
                <Text
                  style={[
                    adminStyles.modernPrivacyChipText,
                    privacy === "PUBLIC" &&
                      adminStyles.modernPrivacyChipTextActive,
                  ]}
                >
                  Công khai
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  adminStyles.modernPrivacyChip,
                  privacy === "PRIVATE" && adminStyles.modernPrivacyChipActive,
                ]}
                onPress={() => setPrivacy("PRIVATE")}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color={privacy === "PRIVATE" ? "#FFF" : "#7F8C8D"}
                />
                <Text
                  style={[
                    adminStyles.modernPrivacyChipText,
                    privacy === "PRIVATE" &&
                      adminStyles.modernPrivacyChipTextActive,
                  ]}
                >
                  Riêng tư
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Ingredients Section */}
        <View style={adminStyles.modernSection}>
          <View style={adminStyles.modernSectionHeader}>
            <Text style={adminStyles.modernSectionTitle}>
              <Ionicons name="nutrition-outline" size={20} color="#FF6B6B" />{" "}
              Nguyên liệu ({ingredients.length})
            </Text>
            <TouchableOpacity
              style={adminStyles.modernAddButton}
              onPress={addIngredient}
            >
              <Ionicons name="add-circle" size={24} color="#FF6B6B" />
            </TouchableOpacity>
          </View>

          {ingredients.map((ing, index) => (
            <View key={index} style={adminStyles.modernIngredientItem}>
              <View style={adminStyles.modernIngredientNumber}>
                <Text style={adminStyles.modernIngredientNumberText}>
                  {index + 1}
                </Text>
              </View>

              <View style={adminStyles.modernIngredientInputs}>
                <TextInput
                  style={[adminStyles.modernInput, { flex: 2 }]}
                  placeholder="Tên nguyên liệu"
                  value={ing.name}
                  onChangeText={(text) => updateIngredient(index, "name", text)}
                  placeholderTextColor="#95A5A6"
                />

                <TextInput
                  style={[adminStyles.modernInput, { flex: 1 }]}
                  placeholder="Số lượng"
                  value={ing.quantity}
                  onChangeText={(text) =>
                    updateIngredient(index, "quantity", text)
                  }
                  placeholderTextColor="#95A5A6"
                />
              </View>

              {ingredients.length > 1 && (
                <TouchableOpacity
                  style={adminStyles.modernRemoveButton}
                  onPress={() => removeIngredient(index)}
                >
                  <Ionicons name="trash-outline" size={20} color="#E74C3C" />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {/* Steps Section */}
        <View style={adminStyles.modernSection}>
          <View style={adminStyles.modernSectionHeader}>
            <Text style={adminStyles.modernSectionTitle}>
              <Ionicons name="list-outline" size={20} color="#FF6B6B" /> Các
              bước thực hiện ({steps.length})
            </Text>
            <TouchableOpacity
              style={adminStyles.modernAddButton}
              onPress={addStep}
            >
              <Ionicons name="add-circle" size={24} color="#FF6B6B" />
            </TouchableOpacity>
          </View>

          {steps.map((step, index) => (
            <View key={index} style={adminStyles.modernStepCard}>
              <View style={adminStyles.modernStepHeader}>
                <View style={adminStyles.modernStepBadge}>
                  <Ionicons name="footsteps-outline" size={16} color="#FFF" />
                  <Text style={adminStyles.modernStepBadgeText}>
                    Bước {step.stepNo}
                  </Text>
                </View>

                {steps.length > 1 && (
                  <TouchableOpacity
                    style={adminStyles.modernStepRemoveButton}
                    onPress={() => removeStep(index)}
                  >
                    <Ionicons name="trash-outline" size={18} color="#E74C3C" />
                    <Text style={adminStyles.modernStepRemoveText}>Xóa</Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={adminStyles.modernFormGroup}>
                <Text style={adminStyles.modernLabel}>Nội dung *</Text>
                <TextInput
                  style={[adminStyles.modernInput, adminStyles.modernTextArea]}
                  placeholder="Mô tả chi tiết cách thực hiện..."
                  value={step.content}
                  onChangeText={(text) => updateStep(index, "content", text)}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  placeholderTextColor="#95A5A6"
                />
              </View>

              <View style={adminStyles.modernRowGroup}>
                <View style={[adminStyles.modernFormGroup, { flex: 1 }]}>
                  <Text style={adminStyles.modernLabel}>
                    <Ionicons name="timer-outline" size={16} color="#7F8C8D" />{" "}
                    Thời gian (phút)
                  </Text>
                  <TextInput
                    style={adminStyles.modernInput}
                    placeholder="0"
                    value={step.suggestedTime.toString()}
                    onChangeText={(text) =>
                      updateStep(index, "suggestedTime", parseInt(text) || 0)
                    }
                    keyboardType="numeric"
                    placeholderTextColor="#95A5A6"
                  />
                </View>

                <View style={[adminStyles.modernFormGroup, { flex: 1 }]}>
                  <Text style={adminStyles.modernLabel}>
                    <Ionicons name="bulb-outline" size={16} color="#7F8C8D" />{" "}
                    Mẹo
                  </Text>
                  <TextInput
                    style={adminStyles.modernInput}
                    placeholder="Gợi ý ..."
                    value={step.tips}
                    onChangeText={(text) => updateStep(index, "tips", text)}
                    placeholderTextColor="#95A5A6"
                  />
                </View>
              </View>

              {/* Step Images */}
              <View style={adminStyles.modernFormGroup}>
                <TouchableOpacity
                  style={adminStyles.modernImagePickerButton}
                  onPress={() => pickStepImages(index)}
                >
                  <Ionicons name="images-outline" size={20} color="#FF6B6B" />
                  <Text style={adminStyles.modernImagePickerButtonText}>
                    {step.imageUris?.length
                      ? `Thêm ảnh (${step.imageUris.length})`
                      : "Chọn ảnh minh họa"}
                  </Text>
                </TouchableOpacity>

                {step.imageUris && step.imageUris.length > 0 && (
                  <View style={adminStyles.modernStepImagesGrid}>
                    {step.imageUris.map((uri, imgIndex) => (
                      <View
                        key={imgIndex}
                        style={adminStyles.modernStepImageItem}
                      >
                        <Image
                          source={{ uri }}
                          style={adminStyles.modernStepImagePreview}
                        />
                        <TouchableOpacity
                          style={adminStyles.modernStepImageRemove}
                          onPress={() => removeStepImage(index, imgIndex)}
                        >
                          <Ionicons
                            name="close-circle"
                            size={24}
                            color="#FFF"
                          />
                        </TouchableOpacity>
                        <View style={adminStyles.modernStepImageBadge}>
                          <Text style={adminStyles.modernStepImageBadgeText}>
                            {imgIndex + 1}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Fixed Bottom Submit Button */}
      <View style={adminStyles.modernFormFooter}>
        <TouchableOpacity
          style={[
            adminStyles.modernSubmitButton,
            loading && adminStyles.modernButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <>
              <Ionicons
                name="checkmark-circle-outline"
                size={24}
                color="#FFF"
              />
              <Text style={adminStyles.modernSubmitButtonText}>
                Tạo công thức
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateRecipeScreen;
