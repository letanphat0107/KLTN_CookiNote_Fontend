import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_CONFIG, API_HEADERS } from "../config/api";
import { store } from "../store";
import { refreshTokens, localLogout } from "../store/authSlice";

const TOKEN_KEY = "auth_tokens";

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {},
  retry: boolean = true
): Promise<Response> => {
  try {
    // Get current access token
    const tokensString = await AsyncStorage.getItem(TOKEN_KEY);
    if (!tokensString) {
      throw new Error("No access token");
    }

    const tokens = JSON.parse(tokensString);

    // Add authorization header
    const headers = {
      ...API_HEADERS,
      ...options.headers,
      Authorization: `Bearer ${tokens.accessToken}`,
    };

    // Make request
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // If unauthorized and retry is enabled, try to refresh token
    if (
      (response.status === 401 ||
        (response.headers.get("content-type")?.includes("application/json") &&
          (await response.clone().json()).code === 401)) &&
      retry
    ) {
      console.log("Access token expired, refreshing...");

      try {
        // Refresh tokens
        const result = await store.dispatch(refreshTokens()).unwrap();

        // Retry request with new token
        const retryHeaders = {
          ...API_HEADERS,
          ...options.headers,
          Authorization: `Bearer ${result.accessToken}`,
        };

        return await fetch(url, {
          ...options,
          headers: retryHeaders,
        });
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Logout user
        store.dispatch(localLogout());
        throw new Error("Session expired, please login again");
      }
    }

    return response;
  } catch (error) {
    console.error("Fetch with auth error:", error);
    throw error;
  }
};
