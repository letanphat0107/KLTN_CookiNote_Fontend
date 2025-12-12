// src/screens/Suggestion/PersonalizedSuggestionScreen.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  Alert,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "../../store/hooks";
import {
  getPersonalizedRecipes,
  PersonalizedRecipe,
  PersonalizedRecipeParams,
  calculateBMI,
  getBMICategory,
  calculateBMR,
  calculateTDEE,
  savePersonalizedRecipe,
  getPersonalizedHistory,
} from "../../services/personalizedSuggestionService";
import { personalizedStyles } from "./styles";

const { width } = Dimensions.get("window");

interface PersonalizedSuggestionScreenProps {
  navigation?: any;
}

const PersonalizedSuggestionScreen: React.FC<
  PersonalizedSuggestionScreenProps
> = ({ navigation }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const scrollViewRef = useRef<ScrollView>(null);
  const resultsRef = useRef<View>(null);

  // Form state - will be populated from history or defaults
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("60");
  const [age, setAge] = useState("23");
  const [gender, setGender] = useState<"MALE" | "FEMALE" | "OTHER">("MALE");
  const [activityLevel, setActivityLevel] = useState<
    "SEDENTARY" | "LIGHT" | "MODERATE" | "ACTIVE" | "VERY_ACTIVE"
  >("MODERATE");
  const [servings, setServings] = useState("1");
  const [targetCalories, setTargetCalories] = useState("");
  const [healthCondition, setHealthCondition] = useState("");
  const [dishCharacteristics, setDishCharacteristics] = useState("");
  const [mealType, setMealType] = useState<
    "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK"
  >("LUNCH");

  // Results state
  const [recipes, setRecipes] = useState<PersonalizedRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [savingRecipeId, setSavingRecipeId] = useState<number | null>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  // Health metrics
  const [bmi, setBmi] = useState(0);
  const [bmr, setBmr] = useState(0);
  const [tdee, setTdee] = useState(0);

  // Load history on mount
  useEffect(() => {
    if (isAuthenticated) {
      loadHistory();
    } else {
      setIsLoadingHistory(false);
    }
  }, [isAuthenticated]);

  // Recalculate metrics when form values change
  useEffect(() => {
    if (!isLoadingHistory) {
      calculateHealthMetrics();
    }
  }, [height, weight, age, gender, activityLevel, isLoadingHistory]);

  const loadHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const history = await getPersonalizedHistory();
      if (history) {
        // Populate form with historical data
        setHeight(history.height.toString());
        setWeight(history.weight.toString());
        setAge(history.age.toString());
        setGender(history.gender);
        setActivityLevel(history.activityLevel);
        setServings(history.servings.toString());
        setTargetCalories(
          history.targetCalories ? history.targetCalories.toString() : ""
        );
        setHealthCondition(history.healthCondition || "");
        setDishCharacteristics(history.dishCharacteristics || "");
        setMealType(history.mealType);
      }
    } catch (error) {
      console.error("Error loading history:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const calculateHealthMetrics = () => {
    const h = parseFloat(height) || 170;
    const w = parseFloat(weight) || 65;
    const a = parseInt(age) || 25;

    const calculatedBMI = calculateBMI(h, w);
    const calculatedBMR = calculateBMR(w, h, a, gender);
    const calculatedTDEE = calculateTDEE(calculatedBMR, activityLevel);

    setBmi(calculatedBMI);
    setBmr(calculatedBMR);
    setTdee(calculatedTDEE);
  };

  const handleGetSuggestions = async () => {
    if (!isAuthenticated) {
      Alert.alert(
        "Yêu cầu đăng nhập",
        "Vui lòng đăng nhập để sử dụng tính năng này"
      );
      return;
    }

    setIsLoading(true);
    setShowResults(false);

    const params: PersonalizedRecipeParams = {
      height: parseFloat(height) || 170,
      weight: parseFloat(weight) || 65,
      age: parseInt(age) || 25,
      gender,
      activityLevel,
      servings: parseInt(servings) || 1,
      healthCondition: healthCondition.trim() || undefined,
      dishCharacteristics: dishCharacteristics.trim() || undefined,
      mealType,
      targetCalories: targetCalories ? parseInt(targetCalories) : undefined,
    };

    try {
      const results = await getPersonalizedRecipes(params);
      setRecipes(results.slice(0, 3)); // Only take top 3
      setShowResults(true);

      // Scroll to results after a short delay to ensure rendering
      setTimeout(() => {
        resultsRef.current?.measureLayout(
          scrollViewRef.current as any,
          (x, y) => {
            scrollViewRef.current?.scrollTo({ y: y - 20, animated: true });
          },
          () => {}
        );
      }, 300);

      // Auto save recipes
      if (results.length > 0 && user?.role === "ADMIN") {
        await saveRecipesAutomatically(results.slice(0, 3));
      }
    } catch (error) {
      console.error("Error fetching personalized recipes:", error);
      Alert.alert("Lỗi", "Không thể lấy gợi ý công thức. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveRecipesAutomatically = async (
    recipesToSave: PersonalizedRecipe[]
  ) => {
    for (const recipe of recipesToSave) {
      try {
        await savePersonalizedRecipe(recipe);
      } catch (error) {
        console.error("Error auto-saving recipe:", recipe.title, error);
      }
    }
  };

  const handleSaveRecipe = async (recipe: PersonalizedRecipe) => {
    if (!isAuthenticated) {
      Alert.alert("Yêu cầu đăng nhập", "Vui lòng đăng nhập để lưu công thức");
      return;
    }

    setSavingRecipeId(recipe.originalRecipeId);

    try {
      const result = await savePersonalizedRecipe(recipe);

      if (result.success) {
        Alert.alert("Thành công", "Đã lưu công thức vào thư viện của bạn!");
      } else {
        Alert.alert("Lỗi", result.message || "Không thể lưu công thức");
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi lưu công thức");
    } finally {
      setSavingRecipeId(null);
    }
  };

  const renderHealthMetrics = () => (
    <View style={personalizedStyles.metricsContainer}>
      <View style={personalizedStyles.metricCard}>
        <Ionicons name="fitness" size={24} color="#FF6B35" />
        <Text style={personalizedStyles.metricValue}>{bmi.toFixed(1)}</Text>
        <Text style={personalizedStyles.metricLabel}>BMI</Text>
        <Text style={personalizedStyles.metricCategory}>
          {getBMICategory(bmi)}
        </Text>
      </View>

      <View style={personalizedStyles.metricCard}>
        <Ionicons name="flame" size={24} color="#FF6B35" />
        <Text style={personalizedStyles.metricValue}>{Math.round(bmr)}</Text>
        <Text style={personalizedStyles.metricLabel}>BMR (kcal)</Text>
        <Text style={personalizedStyles.metricCategory}>Cơ bản</Text>
      </View>

      <View style={personalizedStyles.metricCard}>
        <Ionicons name="nutrition" size={24} color="#FF6B35" />
        <Text style={personalizedStyles.metricValue}>{Math.round(tdee)}</Text>
        <Text style={personalizedStyles.metricLabel}>TDEE (kcal)</Text>
        <Text style={personalizedStyles.metricCategory}>Hàng ngày</Text>
      </View>
    </View>
  );

  const renderRecipeCard = (recipe: PersonalizedRecipe) => (
    <View key={recipe.originalRecipeId} style={personalizedStyles.recipeCard}>
      <Image
        source={{ uri: recipe.imageUrl }}
        style={personalizedStyles.recipeImage}
        resizeMode="cover"
      />

      <View style={personalizedStyles.recipeContent}>
        <Text style={personalizedStyles.recipeTitle} numberOfLines={2}>
          {recipe.title}
        </Text>

        <Text style={personalizedStyles.recipeDescription} numberOfLines={2}>
          {recipe.description}
        </Text>

        <View style={personalizedStyles.recipeMetrics}>
          <View style={personalizedStyles.metricItem}>
            <Ionicons name="flame-outline" size={16} color="#FF6B35" />
            <Text style={personalizedStyles.metricText}>
              {recipe.calories} kcal
            </Text>
          </View>

          <View style={personalizedStyles.metricItem}>
            <Ionicons name="time-outline" size={16} color="#4CAF50" />
            <Text style={personalizedStyles.metricText}>
              {recipe.prepareTime + recipe.cookTime} phút
            </Text>
          </View>

          <View style={personalizedStyles.metricItem}>
            <Ionicons name="restaurant-outline" size={16} color="#2196F3" />
            <Text style={personalizedStyles.metricText}>
              {recipe.servings} phần
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={personalizedStyles.viewDetailsButton}
          onPress={() =>
            navigation?.navigate("RecipeDetail", {
              recipeId: recipe.originalRecipeId.toString(),
              showRating: false,
  showComments: false 
            })
          }
        >
          <Text style={personalizedStyles.viewDetailsText}>Xem chi tiết</Text>
          <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={personalizedStyles.saveButton}
          onPress={() => handleSaveRecipe(recipe)}
          disabled={savingRecipeId === recipe.originalRecipeId}
        >
          {savingRecipeId === recipe.originalRecipeId ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name="bookmark-outline" size={16} color="#FFFFFF" />
              <Text style={personalizedStyles.saveButtonText}>
                Lưu công thức
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  // Show loading while fetching history
  if (isLoadingHistory) {
    return (
      <View style={personalizedStyles.container}>
        <View style={personalizedStyles.header}>
          <Ionicons name="nutrition" size={32} color="#FF6B35" />
          <Text style={personalizedStyles.headerTitle}>Gợi Ý Cá Nhân</Text>
          <Text style={personalizedStyles.headerSubtitle}>
            Tìm công thức phù hợp với bạn
          </Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text
            style={{
              marginTop: 16,
              fontSize: 16,
              color: "#666666",
              fontFamily: "Roboto-Regular",
            }}
          >
            Đang tải thông tin...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={personalizedStyles.container}>
      {/* Header */}
      <View style={personalizedStyles.header}>
        <Ionicons name="nutrition" size={32} color="#FF6B35" />
        <Text style={personalizedStyles.headerTitle}>Gợi Ý Cá Nhân</Text>
        <Text style={personalizedStyles.headerSubtitle}>
          Tìm công thức phù hợp với bạn
        </Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={personalizedStyles.scrollView}
        contentContainerStyle={personalizedStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Body Metrics Section */}
        <View style={personalizedStyles.section}>
          <Text style={personalizedStyles.sectionTitle}>
            📊 Thông số cơ thể
          </Text>

          <View style={personalizedStyles.inputRow}>
            <View style={personalizedStyles.inputGroup}>
              <Text style={personalizedStyles.inputLabel}>Chiều cao (cm)</Text>
              <TextInput
                style={personalizedStyles.input}
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                placeholder="170"
              />
            </View>

            <View style={personalizedStyles.inputGroup}>
              <Text style={personalizedStyles.inputLabel}>Cân nặng (kg)</Text>
              <TextInput
                style={personalizedStyles.input}
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                placeholder="65"
              />
            </View>
          </View>

          <View style={personalizedStyles.inputRow}>
            <View style={personalizedStyles.inputGroup}>
              <Text style={personalizedStyles.inputLabel}>Tuổi</Text>
              <TextInput
                style={personalizedStyles.input}
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                placeholder="25"
              />
            </View>

            <View style={personalizedStyles.inputGroup}>
              <Text style={personalizedStyles.inputLabel}>Giới tính</Text>
              <View style={personalizedStyles.buttonGroup}>
                <TouchableOpacity
                  style={[
                    personalizedStyles.genderButton,
                    gender === "MALE" && personalizedStyles.genderButtonActive,
                  ]}
                  onPress={() => setGender("MALE")}
                >
                  <Text
                    style={[
                      personalizedStyles.genderButtonText,
                      gender === "MALE" &&
                        personalizedStyles.genderButtonTextActive,
                    ]}
                  >
                    Nam
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    personalizedStyles.genderButton,
                    gender === "FEMALE" &&
                      personalizedStyles.genderButtonActive,
                  ]}
                  onPress={() => setGender("FEMALE")}
                >
                  <Text
                    style={[
                      personalizedStyles.genderButtonText,
                      gender === "FEMALE" &&
                        personalizedStyles.genderButtonTextActive,
                    ]}
                  >
                    Nữ
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Health Metrics Display */}
          {renderHealthMetrics()}
        </View>

        {/* Activity & Preferences Section */}
        <View style={personalizedStyles.section}>
          <Text style={personalizedStyles.sectionTitle}>
            🏃 Hoạt động & Sở thích
          </Text>

          <Text style={personalizedStyles.inputLabel}>Mức độ hoạt động</Text>
          <View style={personalizedStyles.activityButtons}>
            {[
              { key: "SEDENTARY", label: "Ít vận động" },
              { key: "LIGHT", label: "Nhẹ" },
              { key: "MODERATE", label: "Trung bình" },
              { key: "ACTIVE", label: "Tích cực" },
              { key: "VERY_ACTIVE", label: "Rất tích cực" },
            ].map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  personalizedStyles.activityButton,
                  activityLevel === option.key &&
                    personalizedStyles.activityButtonActive,
                ]}
                onPress={() =>
                  setActivityLevel(option.key as typeof activityLevel)
                }
              >
                <Text
                  style={[
                    personalizedStyles.activityButtonText,
                    activityLevel === option.key &&
                      personalizedStyles.activityButtonTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={personalizedStyles.inputLabel}>Bữa ăn</Text>
          <View style={personalizedStyles.mealButtons}>
            {[
              { key: "BREAKFAST", label: "🌅 Sáng", icon: "sunny" },
              { key: "LUNCH", label: "☀️ Trưa", icon: "partly-sunny" },
              { key: "DINNER", label: "🌙 Tối", icon: "moon" },
              { key: "SNACK", label: "🍪 Ăn vặt", icon: "cafe" },
            ].map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  personalizedStyles.mealButton,
                  mealType === option.key &&
                    personalizedStyles.mealButtonActive,
                ]}
                onPress={() => setMealType(option.key as typeof mealType)}
              >
                <Text
                  style={[
                    personalizedStyles.mealButtonText,
                    mealType === option.key &&
                      personalizedStyles.mealButtonTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={personalizedStyles.inputRow}>
            <View style={personalizedStyles.inputGroup}>
              <Text style={personalizedStyles.inputLabel}>Số khẩu phần</Text>
              <TextInput
                style={personalizedStyles.input}
                value={servings}
                onChangeText={setServings}
                keyboardType="numeric"
                placeholder="1"
              />
            </View>

            <View style={personalizedStyles.inputGroup}>
              <Text style={personalizedStyles.inputLabel}>
                Calo mục tiêu (tùy chọn)
              </Text>
              <TextInput
                style={personalizedStyles.input}
                value={targetCalories}
                onChangeText={setTargetCalories}
                keyboardType="numeric"
                placeholder={Math.round(tdee / 3).toString()}
              />
            </View>
          </View>

          <Text style={personalizedStyles.inputLabel}>
            Tình trạng sức khỏe (tùy chọn)
          </Text>
          <TextInput
            style={personalizedStyles.textArea}
            value={healthCondition}
            onChangeText={setHealthCondition}
            placeholder="VD: Cần bổ sung đạm, hạn chế dầu mỡ"
            multiline
            numberOfLines={3}
          />

          <Text style={personalizedStyles.inputLabel}>
            Đặc điểm món ăn (tùy chọn)
          </Text>
          <TextInput
            style={personalizedStyles.textArea}
            value={dishCharacteristics}
            onChangeText={setDishCharacteristics}
            placeholder="VD: Món nước, thanh đạm"
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            personalizedStyles.submitButton,
            isLoading && personalizedStyles.submitButtonDisabled,
          ]}
          onPress={handleGetSuggestions}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name="sparkles" size={20} color="#FFFFFF" />
              <Text style={personalizedStyles.submitButtonText}>
                Tạo gợi ý phù hợp
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* Results Section */}
        {showResults && recipes.length > 0 && (
          <View
            ref={resultsRef}
            style={personalizedStyles.resultsSection}
            onLayout={() => {}}
          >
            <Text style={personalizedStyles.resultsTitle}>
              🎯 {recipes.length} Công thức dành cho bạn
            </Text>
            <Text style={personalizedStyles.resultsSubtitle}>
              Được tối ưu hóa theo thông số cơ thể của bạn
            </Text>

            {recipes.map((recipe) => renderRecipeCard(recipe))}
          </View>
        )}

        {showResults && recipes.length === 0 && (
          <View
            ref={resultsRef}
            style={personalizedStyles.emptyResults}
            onLayout={() => {}}
          >
            <Ionicons name="sad-outline" size={64} color="#CCCCCC" />
            <Text style={personalizedStyles.emptyText}>
              Không tìm thấy công thức phù hợp
            </Text>
            <Text style={personalizedStyles.emptySubtext}>
              Thử điều chỉnh thông số và thử lại
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default PersonalizedSuggestionScreen;
