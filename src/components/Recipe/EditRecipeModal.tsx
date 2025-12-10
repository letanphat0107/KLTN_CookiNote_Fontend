// src/components/Recipe/EditRecipeModal.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { editRecipeStyles } from "./styles";
import { RecipeWithDetails } from "../../types/recipe";
import { forkRecipeWithSuggestion } from "../../services/recipeActionService";

interface EditRecipeModalProps {
  visible: boolean;
  onClose: () => void;
  recipe: RecipeWithDetails;
  onSave: (data: any) => Promise<boolean>;
}

interface FormData {
  categoryId: number;
  title: string;
  description: string;
  prepareTime: number;
  cookTime: number;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  privacy: "PUBLIC" | "PRIVATE";
  ingredients: Array<{
    name: string;
    quantity: string;
  }>;
  steps: Array<{
    stepNo: number;
    content: string;
    suggestedTime?: number;
    tips?: string;
  }>;
}

const EditRecipeModal: React.FC<EditRecipeModalProps> = ({
  visible,
  onClose,
  recipe,
  onSave,
}) => {
  const [formData, setFormData] = useState<FormData>({
    categoryId: 1,
    title: "",
    description: "",
    prepareTime: 15,
    cookTime: 30,
    difficulty: "MEDIUM",
    privacy: "PRIVATE",
    ingredients: [],
    steps: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAIInput, setShowAIInput] = useState(false);
  const [modificationRequest, setModificationRequest] = useState("");
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  // Initialize form data when recipe changes
  useEffect(() => {
    if (recipe) {
      setFormData({
        categoryId: recipe.categoryId || 1,
        title: recipe.title,
        description: recipe.description || "",
        prepareTime: recipe.prepareTime,
        cookTime: recipe.cookTime,
        difficulty: recipe.difficulty as "EASY" | "MEDIUM" | "HARD",
        privacy: "PRIVATE", // Default to private for forked recipes
        ingredients:
          recipe.ingredients?.map((ing) => ({
            name: ing.name,
            quantity: ing.quantity,
          })) || [],
        steps:
          recipe.steps?.map((step) => ({
            stepNo: step.stepNo,
            content: step.content,
            suggestedTime: step.suggestedTime,
            tips: step.tips,
          })) || [],
      });
      // Reset AI input when recipe changes
      setShowAIInput(false);
      setModificationRequest("");
    }
  }, [recipe]);

  const handleAISuggestion = async () => {
    if (!modificationRequest.trim()) {
      Alert.alert("Thông báo", "Vui lòng nhập yêu cầu điều chỉnh");
      return;
    }

    setIsLoadingAI(true);
    try {
      const suggestedRecipe = await forkRecipeWithSuggestion(
        recipe.id,
        modificationRequest.trim()
      );

      if (suggestedRecipe) {
        setFormData(suggestedRecipe);
        setShowAIInput(false);
        setModificationRequest("");
        Alert.alert(
          "Thành công",
          "Đã điều chỉnh công thức theo yêu cầu của bạn!"
        );
      } else {
        Alert.alert("Lỗi", "Không thể điều chỉnh công thức. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error getting AI suggestion:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi điều chỉnh công thức");
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập tên công thức");
      return;
    }

    if (formData.ingredients.length === 0) {
      Alert.alert("Lỗi", "Vui lòng thêm ít nhất 1 nguyên liệu");
      return;
    }

    if (formData.steps.length === 0) {
      Alert.alert("Lỗi", "Vui lòng thêm ít nhất 1 bước thực hiện");
      return;
    }

    setIsLoading(true);
    try {
      const success = await onSave(formData);
      if (success) {
        Alert.alert("Thành công", "Đã tạo bản sao công thức thành công!");
        onClose();
      } else {
        Alert.alert("Lỗi", "Không thể tạo bản sao công thức");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi lưu công thức");
    } finally {
      setIsLoading(false);
    }
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", quantity: "" }],
    }));
  };

  const removeIngredient = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const updateIngredient = (
    index: number,
    field: "name" | "quantity",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) =>
        i === index ? { ...ing, [field]: value } : ing
      ),
    }));
  };

  const addStep = () => {
    setFormData((prev) => ({
      ...prev,
      steps: [
        ...prev.steps,
        {
          stepNo: prev.steps.length + 1,
          content: "",
          suggestedTime: 10,
          tips: "",
        },
      ],
    }));
  };

  const removeStep = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps
        .filter((_, i) => i !== index)
        .map((step, i) => ({
          ...step,
          stepNo: i + 1,
        })),
    }));
  };

  const updateStep = (
    index: number,
    field: keyof FormData["steps"][0],
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.map((step, i) =>
        i === index ? { ...step, [field]: value } : step
      ),
    }));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={editRecipeStyles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <View style={editRecipeStyles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={editRecipeStyles.cancelButton}>Hủy</Text>
          </TouchableOpacity>
          <Text style={editRecipeStyles.title}>Chỉnh sửa công thức</Text>
          <TouchableOpacity onPress={handleSave} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#FF6B35" />
            ) : (
              <Text style={editRecipeStyles.saveButton}>Lưu</Text>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView style={editRecipeStyles.content}>
          {/* AI Suggestion Section */}
          <View style={editRecipeStyles.section}>
            <View style={editRecipeStyles.aiButtonContainer}>
              <TouchableOpacity
                style={editRecipeStyles.aiSuggestButton}
                onPress={() => setShowAIInput(!showAIInput)}
                disabled={isLoadingAI}
              >
                <Ionicons name="sparkles" size={20} color="#FFFFFF" />
                <Text style={editRecipeStyles.aiSuggestButtonText}>
                  Điều chỉnh AI
                </Text>
              </TouchableOpacity>
            </View>

            {showAIInput && (
              <View style={editRecipeStyles.aiInputContainer}>
                <Text style={editRecipeStyles.aiInputLabel}>
                  Nhập yêu cầu điều chỉnh:
                </Text>
                <TextInput
                  style={[editRecipeStyles.input, editRecipeStyles.aiTextArea]}
                  value={modificationRequest}
                  onChangeText={setModificationRequest}
                  placeholder="VD: Khẩu phần cho 2 người, Giảm 50% đường, Thay thế bằng nguyên liệu chay..."
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={3}
                />
                <View style={editRecipeStyles.aiButtonRow}>
                  <TouchableOpacity
                    style={editRecipeStyles.aiCancelButton}
                    onPress={() => {
                      setShowAIInput(false);
                      setModificationRequest("");
                    }}
                  >
                    <Text style={editRecipeStyles.aiCancelButtonText}>Hủy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={editRecipeStyles.aiApplyButton}
                    onPress={handleAISuggestion}
                    disabled={isLoadingAI}
                  >
                    {isLoadingAI ? (
                      <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                      <>
                        <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                        <Text style={editRecipeStyles.aiApplyButtonText}>
                          Áp dụng
                        </Text>
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          {/* Basic Info */}
          <View style={editRecipeStyles.section}>
            <Text style={editRecipeStyles.sectionTitle}>Thông tin cơ bản</Text>

            <Text style={editRecipeStyles.label}>Tên công thức *</Text>
            <TextInput
              style={editRecipeStyles.input}
              value={formData.title}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, title: text }))
              }
              placeholder="Nhập tên công thức"
              placeholderTextColor="#999"
            />

            <Text style={editRecipeStyles.label}>Mô tả</Text>
            <TextInput
              style={[editRecipeStyles.input, editRecipeStyles.textArea]}
              value={formData.description}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, description: text }))
              }
              placeholder="Mô tả công thức"
              placeholderTextColor="#999"
              multiline
              numberOfLines={3}
            />

            <View style={editRecipeStyles.row}>
              <View style={editRecipeStyles.halfWidth}>
                <Text style={editRecipeStyles.label}>
                  Thời gian chuẩn bị (phút)
                </Text>
                <TextInput
                  style={editRecipeStyles.input}
                  value={formData.prepareTime.toString()}
                  onChangeText={(text) =>
                    setFormData((prev) => ({
                      ...prev,
                      prepareTime: parseInt(text) || 0,
                    }))
                  }
                  keyboardType="numeric"
                  placeholder="15"
                />
              </View>
              <View style={editRecipeStyles.halfWidth}>
                <Text style={editRecipeStyles.label}>Thời gian nấu (phút)</Text>
                <TextInput
                  style={editRecipeStyles.input}
                  value={formData.cookTime.toString()}
                  onChangeText={(text) =>
                    setFormData((prev) => ({
                      ...prev,
                      cookTime: parseInt(text) || 0,
                    }))
                  }
                  keyboardType="numeric"
                  placeholder="30"
                />
              </View>
            </View>
          </View>

          {/* Ingredients */}
          <View style={editRecipeStyles.section}>
            <View style={editRecipeStyles.sectionHeader}>
              <Text style={editRecipeStyles.sectionTitle}>Nguyên liệu</Text>
              <TouchableOpacity onPress={addIngredient}>
                <Text style={editRecipeStyles.addButton}>+ Thêm</Text>
              </TouchableOpacity>
            </View>

            {formData.ingredients.map((ingredient, index) => (
              <View key={index} style={editRecipeStyles.ingredientRow}>
                <TextInput
                  style={[editRecipeStyles.input, { flex: 2, marginRight: 10 }]}
                  value={ingredient.name}
                  onChangeText={(text) => updateIngredient(index, "name", text)}
                  placeholder="Tên nguyên liệu"
                  placeholderTextColor="#999"
                />
                <TextInput
                  style={[editRecipeStyles.input, { flex: 1, marginRight: 10 }]}
                  value={ingredient.quantity}
                  onChangeText={(text) =>
                    updateIngredient(index, "quantity", text)
                  }
                  placeholder="Số lượng"
                  placeholderTextColor="#999"
                />
                <TouchableOpacity
                  onPress={() => removeIngredient(index)}
                  style={editRecipeStyles.removeButton}
                >
                  <Text style={editRecipeStyles.removeButtonText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Steps */}
          <View style={editRecipeStyles.section}>
            <View style={editRecipeStyles.sectionHeader}>
              <Text style={editRecipeStyles.sectionTitle}>
                Các bước thực hiện
              </Text>
              <TouchableOpacity onPress={addStep}>
                <Text style={editRecipeStyles.addButton}>+ Thêm</Text>
              </TouchableOpacity>
            </View>

            {formData.steps.map((step, index) => (
              <View key={index} style={editRecipeStyles.stepContainer}>
                <View style={editRecipeStyles.stepHeader}>
                  <Text style={editRecipeStyles.stepNumber}>
                    Bước {step.stepNo}
                  </Text>
                  <TouchableOpacity
                    onPress={() => removeStep(index)}
                    style={editRecipeStyles.removeButton}
                  >
                    <Text style={editRecipeStyles.removeButtonText}>🗑️</Text>
                  </TouchableOpacity>
                </View>

                <Text style={editRecipeStyles.label}>Nội dung *</Text>
                <TextInput
                  style={[editRecipeStyles.input, editRecipeStyles.textArea]}
                  value={step.content}
                  onChangeText={(text) => updateStep(index, "content", text)}
                  placeholder="Mô tả cách thực hiện"
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={3}
                />

                <Text style={editRecipeStyles.label}>
                  Thời gian gợi ý (phút)
                </Text>
                <TextInput
                  style={editRecipeStyles.input}
                  value={step.suggestedTime?.toString() || ""}
                  onChangeText={(text) =>
                    updateStep(
                      index,
                      "suggestedTime",
                      parseInt(text) || undefined
                    )
                  }
                  keyboardType="numeric"
                  placeholder="10"
                />

                <Text style={editRecipeStyles.label}>Mẹo</Text>
                <TextInput
                  style={[editRecipeStyles.input, editRecipeStyles.textArea]}
                  value={step.tips || ""}
                  onChangeText={(text) => updateStep(index, "tips", text)}
                  placeholder="Mẹo hữu ích cho bước này"
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={2}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default EditRecipeModal;
