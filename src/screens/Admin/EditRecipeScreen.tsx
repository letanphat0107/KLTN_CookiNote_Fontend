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
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useAppSelector } from "../../store/hooks";
import adminService, { CreateRecipeData } from "../../services/adminService";
import { useRecipe } from "../../hooks/useRecipe";
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
  images?: string[];
}

const EditRecipeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { recipeId } = route.params;
  const { tokens } = useAppSelector((state) => state.auth);
  const { getRecipeDetails } = useRecipe();

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Basic info
  const [categoryId, setCategoryId] = useState("1");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prepareTime, setPrepareTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [privacy, setPrivacy] = useState<"PUBLIC" | "PRIVATE">("PUBLIC");

  // Cover image
  const [coverImageUri, setCoverImageUri] = useState<string | null>(null);

  // Ingredients
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", quantity: "" },
  ]);

  // Steps
  const [steps, setSteps] = useState<Step[]>([
    { stepNo: 1, content: "", suggestedTime: 0, tips: "", images: [] },
  ]);

  // Fetch recipe details when component mounts
  useEffect(() => {
    fetchRecipeDetails();
  }, [recipeId]);

  const fetchRecipeDetails = async () => {
    try {
      setInitialLoading(true);
      console.log("Fetching recipe details for ID:", recipeId);

      const recipeData = await getRecipeDetails(Number(recipeId));

      if (recipeData) {
        // Fill form with existing data
        setCategoryId(recipeData.categoryId?.toString() || "1");
        setTitle(recipeData.title);
        setDescription(recipeData.description || "");
        setPrepareTime(recipeData.prepare_time?.toString() || "");
        setCookTime(recipeData.cook_time?.toString() || "");
        setDifficulty(recipeData.difficulty);
        setPrivacy(recipeData.privacy || "PUBLIC");
        setCoverImageUri(recipeData.imageUrl || null);

        // Fill ingredients
        if (recipeData.ingredients && recipeData.ingredients.length > 0) {
          setIngredients(
            recipeData.ingredients.map((ing) => ({
              name: ing.name,
              quantity: ing.quantity,
            }))
          );
        }

        // Fill steps
        if (recipeData.steps && recipeData.steps.length > 0) {
          setSteps(
            recipeData.steps.map((step) => ({
              stepNo: step.stepNo,
              content: step.content,
              suggestedTime: step.suggestedTime || 0,
              tips: step.tips || "",
              images: step.images?.map((img) => img) || [],
            }))
          );
        }

        console.log("Recipe details loaded:", recipeData.title);
      } else {
        Alert.alert("Lỗi", "Không thể tải thông tin món ăn");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải công thức");
      navigation.goBack();
    } finally {
      setInitialLoading(false);
    }
  };

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
      newSteps[stepIndex].images = result.assets.map((asset) => asset.uri);
      setSteps(newSteps);
    }
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
        images: [],
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
      // TODO: Implement update API when backend is ready
      Alert.alert(
        "Thông báo",
        "API cập nhật sẽ được implement sau. Hiện tại chỉ có chức năng xem và điền form.",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert("Lỗi", error.message || "Không thể cập nhật công thức");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <View style={adminStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={{ marginTop: 16, color: "#6C757D" }}>Đang tải...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={adminStyles.addContainer}>
      <Text style={adminStyles.sectionTitle}>Chỉnh sửa món ăn</Text>

      {/* Cover Image */}
      <TouchableOpacity
        style={adminStyles.imagePickerButton}
        onPress={pickCoverImage}
      >
        {coverImageUri ? (
          <Image
            source={{ uri: coverImageUri }}
            style={adminStyles.coverPreview}
          />
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

          <TouchableOpacity
            style={adminStyles.imagePickerButton}
            onPress={() => pickStepImages(index)}
          >
            <Text>
              📷 Chọn ảnh cho bước này{" "}
              {step.images?.length ? `(${step.images.length})` : ""}
            </Text>
          </TouchableOpacity>

          {step.images && step.images.length > 0 && (
            <ScrollView horizontal style={{ marginTop: 10 }}>
              {step.images.map((uri, imgIndex) => (
                <Image
                  key={imgIndex}
                  source={{ uri }}
                  style={{
                    width: 80,
                    height: 80,
                    marginRight: 10,
                    borderRadius: 8,
                  }}
                />
              ))}
            </ScrollView>
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
          <Text style={adminStyles.submitButtonText}>Cập nhật công thức</Text>
        )}
      </TouchableOpacity>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

export default EditRecipeScreen;
