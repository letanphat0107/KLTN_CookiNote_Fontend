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
} from "react-native";
import { floatingStyles } from "./styles";
import { useAppSelector } from "../../store/hooks";
import {
  sendAIChatMessage,
  getChatHistory,
} from "../../services/aiChatService";

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
  const scrollViewRef = useRef<ScrollView>(null);

  // Animation
  const scaleAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadChatHistory();
    }
  }, [isOpen, isAuthenticated]);

  const loadChatHistory = async () => {
    try {
      const history = await getChatHistory();
      setMessages(history);
    } catch (error) {
      console.error("Error loading chat history:", error);
      // Initialize with welcome message
      setMessages([
        {
          id: "1",
          message:
            "Chào bạn! Tôi là AI trợ lý nấu ăn. Bạn có câu hỏi gì về nấu ăn không?",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
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
            <TouchableOpacity onPress={onToggle}>
              <Text style={floatingStyles.closeButton}>✕</Text>
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
            {messages.map(renderChatMessage)}
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
