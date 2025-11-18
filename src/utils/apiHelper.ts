import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_CONFIG, API_HEADERS } from "../config/api";
import { store } from "../store";
import { refreshTokens, localLogout } from "../store/authSlice";

const TOKEN_KEY = "auth_tokens";

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {},
  retry: boolean = true,
  isFormData: boolean = false
): Promise<Response> => {
  try {
    // Get current access token
    const tokensString = await AsyncStorage.getItem(TOKEN_KEY);
    if (!tokensString) {
      throw new Error("No access token");
    }

    const tokens = JSON.parse(tokensString);

    // Prepare headers
    let headers: any = {
      ...options.headers,
      Authorization: `Bearer ${tokens.accessToken}`,
    };

    // Only add Content-Type for non-FormData requests
    if (!isFormData) {
      headers = {
        ...API_HEADERS,
        ...headers,
      };
    }

    console.log("Fetch with auth:", {
      url,
      method: options.method,
      isFormData,
      hasBody: !!options.body,
      headers: isFormData ? { Authorization: "Bearer ***" } : headers,
    });

    // Make request
    const response = await fetch(url, {
      ...options,
      headers,
    });

    console.log("Response status:", response.status);

    // If unauthorized and retry is enabled, try to refresh token
    if (response.status === 401 && retry) {
      console.log("Access token expired, refreshing...");

      try {
        // Refresh tokens
        const result = await store.dispatch(refreshTokens()).unwrap();

        console.log("Tokens refreshed successfully, retrying request...");

        // Retry request with new token
        let retryHeaders: any = {
          ...options.headers,
          Authorization: `Bearer ${result.accessToken}`,
        };

        if (!isFormData) {
          retryHeaders = {
            ...API_HEADERS,
            ...retryHeaders,
          };
        }

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
