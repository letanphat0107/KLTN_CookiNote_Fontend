import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_CONFIG } from "../config/api";
import { fetchWithAuth } from "../utils/apiHelper";
import { DailyMenuResponse } from "../types/recipe";

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

export const getDailySuggestions = async (
  date?: string
): Promise<DailyMenuResponse | null> => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error("No access token");
    }

    const targetDate = date || new Date().toISOString().split("T")[0];
    const url = `${API_CONFIG.BASE_URL}/cookinote/daily-menu?date=${targetDate}`;

    const response = await fetchWithAuth(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result: DailyMenuResponse = await response.json();

    if (result.code === 200) {
      return result;
    }

    return null;
  } catch (error) {
    console.error("Error fetching daily suggestions:", error);
    return null;
  }
};
