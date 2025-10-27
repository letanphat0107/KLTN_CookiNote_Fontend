// src/services/aiChatService.ts
import { API_CONFIG } from "../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Helper function to get access token
const getAccessToken = async (): Promise<string | null> => {
  try {
    const tokens = await AsyncStorage.getItem("auth_tokens");
    if (tokens) {
      const parsedTokens = JSON.parse(tokens);
      return parsedTokens.accessToken;
    }
    return null;
  } catch (error) {
    console.error("Error getting access token:", error);
    return null;
  }
};

// Helper function to create auth headers
const createAuthHeaders = async (): Promise<Record<string, string>> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const accessToken = await getAccessToken();
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return headers;
};

interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
}

// Send message to AI
export const sendAIChatMessage = async (message: string): Promise<string> => {
  try {
    const headers = await createAuthHeaders();
    const response = await fetch(`${API_CONFIG.BASE_URL}/cookinote/ai/chat`, {
      method: "POST",
      headers,
      body: JSON.stringify({ message }),
      
    });

    const result = await response.json();

    if (response.ok && result.code === 200) {
      return (
        result.data?.response || "Xin lỗi, tôi không thể trả lời câu hỏi này."
      );
    } else {
      console.error("Failed to send AI chat message:", result.message);
      return "Xin lỗi, đã xảy ra lỗi khi xử lý câu hỏi của bạn.";
    }
  } catch (error) {
    console.error("Error sending AI chat message:", error);
    return "Xin lỗi, không thể kết nối đến AI. Vui lòng thử lại sau.";
  }
};

// Get chat history
export const getChatHistory = async (): Promise<ChatMessage[]> => {
  try {
    const headers = await createAuthHeaders();
    const response = await fetch(
      `${API_CONFIG.BASE_URL}/cookinote/ai/chat/history`,
      {
        method: "GET",
        headers,
        
      }
    );

    const result = await response.json();

    if (response.ok && result.code === 200) {
      return result.data?.messages || [];
    } else {
      console.error("Failed to get chat history:", result.message);
      return [];
    }
  } catch (error) {
    console.error("Error getting chat history:", error);
    return [];
  }
};
