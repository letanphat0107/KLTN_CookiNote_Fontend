// src/services/chatStorageService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
  isLoading?: boolean;
  suggestions?: any[];
}

const CHAT_STORAGE_KEY = "ai_chat_history";

// Save chat messages to local storage
export const saveChatHistory = async (
  messages: ChatMessage[]
): Promise<void> => {
  try {
    const serializedMessages = messages.map((msg) => ({
      ...msg,
      timestamp: msg.timestamp.toISOString(), // Convert Date to string
      isLoading: false, // Don't save loading states
    }));

    await AsyncStorage.setItem(
      CHAT_STORAGE_KEY,
      JSON.stringify(serializedMessages)
    );
    console.log("Chat history saved successfully");
  } catch (error) {
    console.error("Error saving chat history:", error);
  }
};

// Load chat messages from local storage
export const loadChatHistory = async (): Promise<ChatMessage[]> => {
  try {
    const storedMessages = await AsyncStorage.getItem(CHAT_STORAGE_KEY);

    if (!storedMessages) {
      return getDefaultWelcomeMessage();
    }

    const parsedMessages = JSON.parse(storedMessages);

    // Convert timestamp strings back to Date objects
    const messages = parsedMessages.map((msg: any) => ({
      ...msg,
      timestamp: new Date(msg.timestamp),
      isLoading: false,
    }));

    // If no messages or empty, return welcome message
    if (messages.length === 0) {
      return getDefaultWelcomeMessage();
    }

    return messages;
  } catch (error) {
    console.error("Error loading chat history:", error);
    return getDefaultWelcomeMessage();
  }
};

// Clear all chat history
export const clearChatHistory = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(CHAT_STORAGE_KEY);
    console.log("Chat history cleared successfully");
  } catch (error) {
    console.error("Error clearing chat history:", error);
  }
};

// Get default welcome message
const getDefaultWelcomeMessage = (): ChatMessage[] => [
  {
    id: "welcome-" + Date.now(),
    message:
      "Chào bạn! Tôi là AI trợ lý nấu ăn. Bạn có thể:\n\n• Hỏi về cách nấu ăn\n• Xin gợi ý công thức từ nguyên liệu có sẵn\n• Tìm hiểu về dinh dưỡng\n\nBạn cần hỗ trợ gì?",
    isUser: false,
    timestamp: new Date(),
  },
];

// Add single message to existing history
export const addMessageToHistory = async (
  newMessage: ChatMessage
): Promise<void> => {
  try {
    const existingMessages = await loadChatHistory();
    const updatedMessages = [...existingMessages, newMessage];
    await saveChatHistory(updatedMessages);
  } catch (error) {
    console.error("Error adding message to history:", error);
  }
};

// Update specific message in history (for loading states)
export const updateMessageInHistory = async (
  messageId: string,
  updates: Partial<ChatMessage>
): Promise<void> => {
  try {
    const existingMessages = await loadChatHistory();
    const updatedMessages = existingMessages.map((msg) =>
      msg.id === messageId ? { ...msg, ...updates } : msg
    );
    await saveChatHistory(updatedMessages);
  } catch (error) {
    console.error("Error updating message in history:", error);
  }
};
