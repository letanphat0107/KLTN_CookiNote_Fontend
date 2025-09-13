import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types";

const AUTH_TOKEN_KEY = "auth_token";
const USER_DATA_KEY = "user_data";
const LOGIN_TIMESTAMP_KEY = "login_timestamp";

export const AuthStorage = {
  /**
   * Lưu thông tin đăng nhập khi login thành công
   */
  async saveAuthData(token: string, user: User): Promise<void> {
    try {
      const timestamp = Date.now().toString();
      await AsyncStorage.multiSet([
        [AUTH_TOKEN_KEY, token],
        [USER_DATA_KEY, JSON.stringify(user)],
        [LOGIN_TIMESTAMP_KEY, timestamp],
      ]);
      console.log("✅ Auth data saved successfully");
    } catch (error) {
      console.error("❌ Error saving auth data:", error);
      throw new Error("Failed to save authentication data");
    }
  },

  /**
   * Lấy thông tin đăng nhập từ storage
   */
  async getAuthData(): Promise<{
    token: string | null;
    user: User | null;
    timestamp: number | null;
  }> {
    try {
      const [token, userData, timestampStr] = await AsyncStorage.multiGet([
        AUTH_TOKEN_KEY,
        USER_DATA_KEY,
        LOGIN_TIMESTAMP_KEY,
      ]);

      const tokenValue = token[1];
      const userValue = userData[1];
      const timestampValue = timestampStr[1];

      return {
        token: tokenValue,
        user: userValue ? JSON.parse(userValue) : null,
        timestamp: timestampValue ? parseInt(timestampValue, 10) : null,
      };
    } catch (error) {
      console.error("❌ Error getting auth data:", error);
      return { token: null, user: null, timestamp: null };
    }
  },

  /**
   * Xóa tất cả thông tin đăng nhập khi logout
   */
  async clearAuthData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        AUTH_TOKEN_KEY,
        USER_DATA_KEY,
        LOGIN_TIMESTAMP_KEY,
      ]);
      console.log("✅ Auth data cleared successfully");
    } catch (error) {
      console.error("❌ Error clearing auth data:", error);
      throw new Error("Failed to clear authentication data");
    }
  },

  /**
   * Kiểm tra token có còn hạn không (30 ngày)
   */
  isTokenValid(timestamp: number | null): boolean {
    if (!timestamp) return false;

    const currentTime = Date.now();
    const tokenAge = currentTime - timestamp;
    const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 ngày in milliseconds

    return tokenAge < maxAge;
  },

  /**
   * Lấy thời gian còn lại của token (tính bằng ngày)
   */
  getTokenRemainingDays(timestamp: number | null): number {
    if (!timestamp) return 0;

    const currentTime = Date.now();
    const tokenAge = currentTime - timestamp;
    const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 ngày
    const remainingTime = maxAge - tokenAge;

    return Math.max(0, Math.floor(remainingTime / (24 * 60 * 60 * 1000)));
  },
};
