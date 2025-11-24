// src/components/FloatingButtons/AIChatButton.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { floatingStyles } from "./styles";
import { useAppSelector } from "../../store/hooks";

import {
  saveChatHistory,
  loadChatHistory,
  clearChatHistory,
} from "../../services/chatStorageService";

import {
  sendAIChatMessage,
  getRecipeSuggestions,
  generateRecipe,
  saveAIRecipe,
  RecipeSuggestion,
  AIGeneratedRecipe,
} from "../../services/aiChatService";

interface AIChatButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  navigation?: any;
  isAdminMode: boolean;
}

interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
  isLoading?: boolean;
  suggestions?: RecipeSuggestion[];
  generatedRecipe?: AIGeneratedRecipe;
}

const AIChatButton: React.FC<AIChatButtonProps> = ({
  isOpen,
  onToggle,
  navigation,
  isAdminMode = false,
}) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const userId = user?.userId || "guest"; // Fallback to 'guest' nếu chưa login
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showIngredientSelector, setShowIngredientSelector] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [isSavingRecipe, setIsSavingRecipe] = useState(false);

  const [showAIRecipeCreator, setShowAIRecipeCreator] = useState(false);
  const [dishNameInput, setDishNameInput] = useState("");
  const [isGeneratingRecipe, setIsGeneratingRecipe] = useState(false);

  // Animation
  const scaleAnim = useState(new Animated.Value(1))[0];

  // Common ingredients list
  const commonIngredients = [
    "Sả",
    "Nước cốt dừa",
    "Sữa đặc",
    "Đường",
    "Muối",
    "Dừa nạo",
    "Vừng rang",
    "Lá dứa",
    "Chuối chín",
    "Bột mì",
    "Bơ lạt",
    "Bột ca cao",
    "Milo",
    "Sữa tươi không đường",
    "Trứng gà",
    "Baking powder",
    "Baking soda",
    "Bột mì đa dụng",
    "Nước đường",
    "Dầu ăn",
    "Thịt heo",
    "Thịt bò",
    "Gà",
    "Tôm",
    "Cá",
    "Hành tây",
    "Tỏi",
    "Gừng",
    "Cà chua",
    "Khoai tây",
    "Cà rốt",
    "Rau xanh",
    "Nước mắm",
    "Dầu hào",
    "Tương ớt",
    "Mayonnaise",
  ];

  // Load chat history when component mounts or when opened
  useEffect(() => {
    if (isOpen && isAuthenticated && userId) {
      loadStoredChatHistory();
    }
  }, [isOpen, isAuthenticated, userId]);

  // Save messages to storage whenever messages change
  useEffect(() => {
    if (messages.length > 0 && isAuthenticated && userId) {
      // Filter out loading messages before saving
      const messagesToSave = messages.filter((msg) => !msg.isLoading);
      saveChatHistory(messagesToSave, userId);
    }
  }, [messages, isAuthenticated, userId]);

  const loadStoredChatHistory = async () => {
    if (!userId) return;

    setIsLoadingHistory(true);
    try {
      const storedMessages = await loadChatHistory(userId);
      setMessages(storedMessages);

      // Scroll to bottom after loading
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: false });
      }, 100);
    } catch (error) {
      console.error("Error loading stored chat history:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleIngredientSuggestion = () => {
    setShowIngredientSelector(true);
    setSelectedIngredients([]);
  };

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleGetSuggestions = async () => {
    if (selectedIngredients.length === 0) {
      Alert.alert("Thông báo", "Vui lòng chọn ít nhất 1 nguyên liệu");
      return;
    }

    setIsLoadingSuggestions(true);
    setShowIngredientSelector(false);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: `Gợi ý công thức từ nguyên liệu: ${selectedIngredients.join(
        ", "
      )}`,
      isUser: true,
      timestamp: new Date(),
    };

    const loadingMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      message: "Đang tìm kiếm công thức phù hợp...",
      isUser: false,
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);

    try {
      const suggestions = await getRecipeSuggestions(selectedIngredients);

      const suggestionMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        message:
          suggestions.items.length > 0
            ? `Tôi tìm thấy ${suggestions.totalElements} công thức phù hợp với nguyên liệu của bạn:`
            : "Xin lỗi, tôi không tìm thấy công thức nào phù hợp với nguyên liệu này.",
        isUser: false,
        timestamp: new Date(),
        suggestions: suggestions.items,
      };

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessage.id ? suggestionMessage : msg
        )
      );
    } catch (error) {
      console.error("Error getting suggestions:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessage.id
            ? {
                ...msg,
                message:
                  "Xin lỗi, đã xảy ra lỗi khi tìm kiếm công thức. Vui lòng thử lại sau.",
                isLoading: false,
              }
            : msg
        )
      );
    } finally {
      setIsLoadingSuggestions(false);
      setSelectedIngredients([]);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleRecipePress = (recipeId: number) => {
    onToggle(); // Close AI chat
    navigation?.navigate("RecipeDetail", { recipeId });
  };

  const handleClearHistory = () => {
    Alert.alert(
      "Xóa lịch sử chat",
      "Bạn có chắc muốn xóa toàn bộ lịch sử trò chuyện?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            try {
              await clearChatHistory(userId);
              await loadStoredChatHistory(); // Reload with welcome message
            } catch (error) {
              console.error("Error clearing chat history:", error);
            }
          },
        },
      ]
    );
  };

  const formatTime = (prepareTime: number, cookTime: number) => {
    const total = prepareTime + cookTime;
    return total < 60
      ? `${total} phút`
      : `${Math.floor(total / 60)}h ${total % 60}m`;
  };

  const formatDifficulty = (difficulty: string) => {
    switch (difficulty?.toUpperCase()) {
      case "EASY":
        return { text: "Dễ", color: "#4CAF50" };
      case "MEDIUM":
        return { text: "Trung bình", color: "#FF9800" };
      case "HARD":
        return { text: "Khó", color: "#F44336" };
      default:
        return { text: "Trung bình", color: "#FF9800" };
    }
  };

  const handleButtonPress = () => {
    if (!isAuthenticated) {
      Alert.alert(
        "Yêu cầu đăng nhập",
        "Vui lòng đăng nhập để sử dụng AI trợ lý",
        [
          { text: "Hủy", style: "cancel" },
          { text: "Đăng nhập", onPress: () => navigation?.navigate("Login") },
        ]
      );
      return;
    }

    // Animation effect
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onToggle();
  };

  const isRecipeGenerationRequest = (message: string): boolean => {
    const keywords = [
      "tạo công thức",
      "tạo món",
      "hướng dẫn nấu",
      "cách làm",
      "làm món",
      "nấu món",
      "hãy tạo",
    ];
    return keywords.some((keyword) =>
      message.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  // Extract dish name from message
  const extractDishName = (message: string): string => {
    // Remove common prefixes
    let dishName = message
      .toLowerCase()
      .replace(
        /^(hãy tạo|tạo công thức|cách làm|hướng dẫn nấu|làm món|nấu món)\s+(giúp tôi\s+)?(cho tôi\s+)?(món\s+)?/i,
        ""
      )
      .trim();

    return dishName || message;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputMessage.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    const loadingMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      message: "",
      isUser: false,
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    const currentInput = inputMessage.trim();
    setInputMessage("");
    setIsLoading(true);

    try {
      // Send to /cookinote/ai/chat
      const aiResponse = await sendAIChatMessage(currentInput);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessage.id
            ? { ...msg, message: aiResponse, isLoading: false }
            : msg
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessage.id
            ? {
                ...msg,
                message:
                  "Xin lỗi, tôi không thể trả lời ngay bây giờ. Vui lòng thử lại sau.",
                isLoading: false,
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleCreateAIRecipe = async () => {
    if (!dishNameInput.trim()) {
      Alert.alert("Thông báo", "Vui lòng nhập tên món ăn");
      return;
    }

    setIsGeneratingRecipe(true);
    setShowAIRecipeCreator(false);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: `Tạo công thức cho món: ${dishNameInput.trim()}`,
      isUser: true,
      timestamp: new Date(),
    };

    const loadingMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      message: "",
      isUser: false,
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    const dishName = dishNameInput.trim();
    setDishNameInput("");

    try {
      const generatedRecipe = await generateRecipe(dishName);

      if (generatedRecipe) {
        const recipeMessage: ChatMessage = {
          id: loadingMessage.id,
          message: `Tôi đã tạo công thức cho "${generatedRecipe.title}". Hãy xem chi tiết bên dưới:`,
          isUser: false,
          timestamp: new Date(),
          isLoading: false,
          generatedRecipe,
        };

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === loadingMessage.id ? recipeMessage : msg
          )
        );
      } else {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === loadingMessage.id
              ? {
                  ...msg,
                  message:
                    "Xin lỗi, tôi không thể tạo công thức này. Vui lòng thử lại sau.",
                  isLoading: false,
                }
              : msg
          )
        );
      }
    } catch (error) {
      console.error("Error generating recipe:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessage.id
            ? {
                ...msg,
                message:
                  "Xin lỗi, đã xảy ra lỗi khi tạo công thức. Vui lòng thử lại sau.",
                isLoading: false,
              }
            : msg
        )
      );
    } finally {
      setIsGeneratingRecipe(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleSaveRecipe = async (recipe: AIGeneratedRecipe) => {
    const privacyText = isAdminMode ? "công khai" : "riêng tư";

    Alert.alert(
      "Lưu công thức",
      `Bạn có muốn lưu công thức này vào danh sách ${privacyText} của mình?`,
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Lưu",
          onPress: async () => {
            setIsSavingRecipe(true);
            try {
              const result = await saveAIRecipe(recipe, isAdminMode);

              if (result.success) {
                Alert.alert(
                  "Thành công",
                  result.message || "Đã lưu công thức thành công!",
                  [
                    {
                      text: "Xem công thức",
                      onPress: () => {
                        if (result.recipeId) {
                          onToggle(); // Close AI chat
                          navigation?.navigate("RecipeDetail", {
                            recipeId: result.recipeId,
                          });
                        }
                      },
                    },
                    {
                      text: "Đóng",
                      style: "cancel",
                    },
                  ]
                );
              } else {
                Alert.alert("Lỗi", result.message || "Không thể lưu công thức");
              }
            } catch (error) {
              console.error("Error in handleSaveRecipe:", error);
              Alert.alert("Lỗi", "Đã xảy ra lỗi khi lưu công thức");
            } finally {
              setIsSavingRecipe(false);
            }
          },
        },
      ]
    );
  };

  // Add new component to render generated recipe
  const renderGeneratedRecipe = (recipe: AIGeneratedRecipe) => (
    <View style={floatingStyles.generatedRecipeContainer}>
      {/* Recipe Header */}
      <View style={floatingStyles.generatedRecipeHeader}>
        <Text style={floatingStyles.generatedRecipeTitle}>{recipe.title}</Text>
        <Text style={floatingStyles.generatedRecipeDescription}>
          {recipe.description}
        </Text>
      </View>

      {/* Recipe Meta Info */}
      <View style={floatingStyles.generatedRecipeMeta}>
        <View style={floatingStyles.metaItem}>
          <Text style={floatingStyles.metaIcon}>⏱️</Text>
          <Text style={floatingStyles.metaText}>
            {recipe.prepareTime + recipe.cookTime} phút
          </Text>
        </View>
        <View
          style={[
            floatingStyles.difficultyBadge,
            { backgroundColor: formatDifficulty(recipe.difficulty).color },
          ]}
        >
          <Text style={floatingStyles.difficultyText}>
            {formatDifficulty(recipe.difficulty).text}
          </Text>
        </View>
      </View>

      {/* Ingredients */}
      <View style={floatingStyles.generatedRecipeSection}>
        <Text style={floatingStyles.generatedSectionTitle}>
          🥄 Nguyên liệu ({recipe.ingredients.length})
        </Text>
        {recipe.ingredients.map((ingredient, index) => (
          <View key={index} style={floatingStyles.ingredientRow}>
            <Text style={floatingStyles.ingredientBullet}>•</Text>
            <Text style={floatingStyles.ingredientText}>
              {ingredient.name}: {ingredient.quantity}
            </Text>
          </View>
        ))}
      </View>

      {/* Steps */}
      <View style={floatingStyles.generatedRecipeSection}>
        <Text style={floatingStyles.generatedSectionTitle}>
          👨‍🍳 Các bước thực hiện ({recipe.steps.length})
        </Text>
        {recipe.steps.map((step) => (
          <View key={step.stepNo} style={floatingStyles.stepContainer}>
            <View style={floatingStyles.stepHeader}>
              <Text style={floatingStyles.stepNumber}>Bước {step.stepNo}</Text>
              {step.suggestedTime && (
                <Text style={floatingStyles.stepTime}>
                  ⏱️ {step.suggestedTime} phút
                </Text>
              )}
            </View>
            <Text style={floatingStyles.stepContent}>{step.content}</Text>
            {step.tips && (
              <View style={floatingStyles.stepTips}>
                <Text style={floatingStyles.stepTipsIcon}>💡</Text>
                <Text style={floatingStyles.stepTipsText}>{step.tips}</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Action Button */}
      <TouchableOpacity
        style={[
          floatingStyles.saveRecipeButton,
          isSavingRecipe && floatingStyles.disabledButton,
        ]}
        onPress={() => handleSaveRecipe(recipe)}
        disabled={isSavingRecipe}
      >
        {isSavingRecipe ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <ActivityIndicator size="small" color="#FFFFFF" />
            <Text style={floatingStyles.saveRecipeButtonText}>Đang lưu...</Text>
          </View>
        ) : (
          <Text style={floatingStyles.saveRecipeButtonText}>
            💾 Lưu {isAdminMode ? "(Công khai)" : "(Riêng tư)"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );

  const renderChatMessage = (message: ChatMessage) => (
    <View
      key={message.id}
      style={[
        floatingStyles.messageContainer,
        message.isUser ? floatingStyles.userMessage : floatingStyles.aiMessage,
      ]}
    >
      {message.isLoading ? (
        <View style={floatingStyles.loadingMessage}>
          <ActivityIndicator size="small" color="#FF6B35" />
          <Text style={floatingStyles.loadingMessageText}>
            AI đang suy nghĩ...
          </Text>
        </View>
      ) : (
        <>
          <Text
            style={[
              floatingStyles.messageText,
              message.isUser
                ? floatingStyles.userMessageText
                : floatingStyles.aiMessageText,
            ]}
          >
            {message.message}
          </Text>

          {/* Generated Recipe */}
          {message.generatedRecipe &&
            renderGeneratedRecipe(message.generatedRecipe)}

          {/* Recipe Suggestions */}
          {message.suggestions && message.suggestions.length > 0 && (
            <View style={floatingStyles.suggestionsContainer}>
              {message.suggestions.map(renderRecipeSuggestion)}
            </View>
          )}

          <Text style={floatingStyles.messageTime}>
            {message.timestamp.toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </>
      )}
    </View>
  );

  const renderRecipeSuggestion = (suggestion: RecipeSuggestion) => (
    <TouchableOpacity
      key={suggestion.recipe.id}
      style={floatingStyles.suggestionCard}
      onPress={() => handleRecipePress(suggestion.recipe.id)}
    >
      <Image
        source={{
          uri:
            suggestion.recipe.imageUrl ||
            "https://www.google.com/imgres?q=food&imgurl=https%3A%2F%2Fila.edu.vn%2Fwp-content%2Fuploads%2F2025%2F07%2Fila-food-co-dem-duoc-khong-1.jpg&imgrefurl=https%3A%2F%2Fila.edu.vn%2Ffood-co-dem-duoc-khong&docid=XHjsoZ9hRvVoTM&tbnid=SB4KQTeByE68kM&vet=12ahUKEwjj08Xi7siQAxXgcWwGHY4AKRMQM3oECCcQAA..i&w=885&h=588&hcb=2&ved=2ahUKEwjj08Xi7siQAxXgcWwGHY4AKRMQM3oECCcQAA",
        }}
        style={floatingStyles.suggestionImage}
        defaultSource={{
          uri: "https://www.google.com/imgres?q=food&imgurl=https%3A%2F%2Fila.edu.vn%2Fwp-content%2Fuploads%2F2025%2F07%2Fila-food-co-dem-duoc-khong-1.jpg&imgrefurl=https%3A%2F%2Fila.edu.vn%2Ffood-co-dem-duoc-khong&docid=XHjsoZ9hRvVoTM&tbnid=SB4KQTeByE68kM&vet=12ahUKEwjj08Xi7siQAxXgcWwGHY4AKRMQM3oECCcQAA..i&w=885&h=588&hcb=2&ved=2ahUKEwjj08Xi7siQAxXgcWwGHY4AKRMQM3oECCcQAA",
        }}
      />
      <View style={floatingStyles.suggestionInfo}>
        <Text style={floatingStyles.suggestionTitle} numberOfLines={2}>
          {suggestion.recipe.title}
        </Text>
        <Text style={floatingStyles.suggestionJustification} numberOfLines={2}>
          {suggestion.justification}
        </Text>
        <View style={floatingStyles.suggestionMeta}>
          <Text style={floatingStyles.suggestionTime}>
            ⏱️{" "}
            {formatTime(
              suggestion.recipe.prepareTime,
              suggestion.recipe.cookTime
            )}
          </Text>
          <Text
            style={[
              floatingStyles.suggestionDifficulty,
              { color: formatDifficulty(suggestion.recipe.difficulty).color },
            ]}
          >
            {formatDifficulty(suggestion.recipe.difficulty).text}
          </Text>
        </View>
        <Text style={floatingStyles.suggestionScore}>
          🎯 Độ phù hợp: {suggestion.overallMatchScore.toFixed(1)}/10
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderIngredientSelector = () => (
    <Modal
      visible={showIngredientSelector}
      transparent={true}
      animationType="slide"
    >
      <View style={floatingStyles.ingredientModalOverlay}>
        <View style={floatingStyles.ingredientModal}>
          <View style={floatingStyles.ingredientHeader}>
            <Text style={floatingStyles.ingredientTitle}>
              Chọn nguyên liệu có sẵn
            </Text>
            <TouchableOpacity onPress={() => setShowIngredientSelector(false)}>
              <Text style={floatingStyles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={floatingStyles.ingredientSubtitle}>
            Đã chọn: {selectedIngredients.length} nguyên liệu
          </Text>

          <ScrollView style={floatingStyles.ingredientList}>
            <View style={floatingStyles.ingredientGrid}>
              {commonIngredients.map((ingredient) => (
                <TouchableOpacity
                  key={ingredient}
                  style={[
                    floatingStyles.ingredientChip,
                    selectedIngredients.includes(ingredient) &&
                      floatingStyles.ingredientChipSelected,
                  ]}
                  onPress={() => toggleIngredient(ingredient)}
                >
                  <Text
                    style={[
                      floatingStyles.ingredientChipText,
                      selectedIngredients.includes(ingredient) &&
                        floatingStyles.ingredientChipTextSelected,
                    ]}
                  >
                    {ingredient}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View style={floatingStyles.ingredientActions}>
            <TouchableOpacity
              style={floatingStyles.cancelButton}
              onPress={() => setShowIngredientSelector(false)}
            >
              <Text style={floatingStyles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                floatingStyles.getSuggestionsButton,
                selectedIngredients.length === 0 &&
                  floatingStyles.disabledButton,
              ]}
              onPress={handleGetSuggestions}
              disabled={
                selectedIngredients.length === 0 || isLoadingSuggestions
              }
            >
              {isLoadingSuggestions ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={floatingStyles.getSuggestionsButtonText}>
                  Tìm công thức ({selectedIngredients.length})
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderAIChatModal = () => (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="slide"
      onRequestClose={onToggle}
    >
      <KeyboardAvoidingView
        style={floatingStyles.modalOverlay}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={floatingStyles.aiChatModal}>
          {/* Header */}
          <View style={floatingStyles.modalHeader}>
            <Text style={floatingStyles.modalTitle}>🤖 AI Trợ lý nấu ăn</Text>
            <View style={floatingStyles.headerActions}>
              <TouchableOpacity
                onPress={handleClearHistory}
                style={floatingStyles.clearHistoryButton}
              >
                <Text style={floatingStyles.clearHistoryText}>🗑️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onToggle}>
                <Text style={floatingStyles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={floatingStyles.quickActions}>
            <TouchableOpacity
              style={floatingStyles.quickActionButton}
              onPress={handleIngredientSuggestion}
            >
              <Text style={floatingStyles.quickActionText}>
                🥄 Gợi ý từ nguyên liệu
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={floatingStyles.quickActionButton}
              onPress={() => setShowAIRecipeCreator(true)}
            >
              <Text style={floatingStyles.quickActionText}>
                ✨ Tạo công thức bằng AI
              </Text>
            </TouchableOpacity>
          </View>

          {/* Chat Messages */}
          <ScrollView
            ref={scrollViewRef}
            style={floatingStyles.chatContent}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: true })
            }
          >
            {isLoadingHistory ? (
              <View style={floatingStyles.loadingHistoryContainer}>
                <ActivityIndicator size="large" color="#FF6B35" />
                <Text style={floatingStyles.loadingHistoryText}>
                  Đang tải lịch sử chat...
                </Text>
              </View>
            ) : (
              messages.map(renderChatMessage)
            )}
          </ScrollView>

          {/* Chat Input */}
          <View style={floatingStyles.chatInputContainer}>
            <TextInput
              style={floatingStyles.chatInput}
              placeholder="Nhập câu hỏi về nấu ăn..."
              value={inputMessage}
              onChangeText={setInputMessage}
              placeholderTextColor="#999"
              multiline
              maxLength={500}
              onSubmitEditing={handleSendMessage}
              returnKeyType="send"
            />
            <TouchableOpacity
              style={[
                floatingStyles.sendButton,
                (!inputMessage.trim() || isLoading) &&
                  floatingStyles.sendButtonDisabled,
              ]}
              onPress={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={floatingStyles.sendButtonText}>📤</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Ingredient Selector Modal */}
      {renderIngredientSelector()}

      {/* AI Recipe Creator Modal */}
    {renderAIRecipeCreatorModal()}
    </Modal>
  );

  const renderAIRecipeCreatorModal = () => (
  <Modal
    visible={showAIRecipeCreator}
    transparent={true}
    animationType="fade"
  >
    <View style={floatingStyles.ingredientModalOverlay}>
      <View style={floatingStyles.ingredientModal}>
        <View style={floatingStyles.ingredientHeader}>
          <Text style={floatingStyles.ingredientTitle}>
            ✨ Tạo công thức bằng AI
          </Text>
          <TouchableOpacity onPress={() => setShowAIRecipeCreator(false)}>
            <Text style={floatingStyles.closeButton}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={{ padding: 20 }}>
          <Text style={floatingStyles.ingredientSubtitle}>
            Nhập tên món ăn bạn muốn tạo công thức
          </Text>

          <TextInput
            style={floatingStyles.dishNameInput}
            placeholder="Ví dụ: Phở bò, Bánh xèo, Cơm tấm..."
            value={dishNameInput}
            onChangeText={setDishNameInput}
            placeholderTextColor="#999"
            autoFocus={true}
            maxLength={100}
          />

          <Text style={floatingStyles.dishNameHint}>
            💡 Mẹo: Tên món càng chi tiết càng tốt (ví dụ: "Phở bò Nam Định")
          </Text>
        </View>

        <View style={floatingStyles.ingredientActions}>
          <TouchableOpacity
            style={floatingStyles.cancelButton}
            onPress={() => {
              setShowAIRecipeCreator(false);
              setDishNameInput("");
            }}
          >
            <Text style={floatingStyles.cancelButtonText}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              floatingStyles.getSuggestionsButton,
              !dishNameInput.trim() && floatingStyles.disabledButton,
            ]}
            onPress={handleCreateAIRecipe}
            disabled={!dishNameInput.trim() || isGeneratingRecipe}
          >
            {isGeneratingRecipe ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={floatingStyles.getSuggestionsButtonText}>
                Tạo công thức ✨
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

  return (
    <>
      <Animated.View
        style={[
          floatingStyles.floatingButton,
          floatingStyles.aiChatButton,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <TouchableOpacity onPress={handleButtonPress}>
          <Text style={floatingStyles.buttonIcon}>🤖</Text>
        </TouchableOpacity>
      </Animated.View>
      {renderAIChatModal()}
    </>
  );
};

export default AIChatButton;
