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
  sendAIChatMessage,
  getRecipeSuggestions,
  RecipeSuggestion,
} from "../../services/aiChatService";
import {
  saveChatHistory,
  loadChatHistory,
  clearChatHistory,
} from "../../services/chatStorageService";

interface AIChatButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  navigation?: any;
}

interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
  isLoading?: boolean;
  suggestions?: RecipeSuggestion[];
}

const AIChatButton: React.FC<AIChatButtonProps> = ({
  isOpen,
  onToggle,
  navigation,
}) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showIngredientSelector, setShowIngredientSelector] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

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
    if (isOpen && isAuthenticated) {
      loadStoredChatHistory();
    }
  }, [isOpen, isAuthenticated]);

  // Save messages to storage whenever messages change
  useEffect(() => {
    if (messages.length > 0 && isAuthenticated) {
      // Filter out loading messages before saving
      const messagesToSave = messages.filter((msg) => !msg.isLoading);
      saveChatHistory(messagesToSave);
    }
  }, [messages, isAuthenticated]);

  const loadStoredChatHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const storedMessages = await loadChatHistory();
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
    setInputMessage("");
    setIsLoading(true);

    try {
      const aiResponse = await sendAIChatMessage(inputMessage.trim());

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
      // Scroll to bottom
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
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
              await clearChatHistory();
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
