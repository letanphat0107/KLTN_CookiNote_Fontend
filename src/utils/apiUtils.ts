// src/utils/apiUtils.ts
import { store } from "../store/store";
import { refreshTokens, localLogout } from "../store/authSlice";
import { API_CONFIG, API_HEADERS } from "../config/api";

// Enhanced fetch with automatic token refresh
export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const state = store.getState();
  const { tokens } = state.auth;

  if (!tokens) {
    throw new Error("No authentication tokens available");
  }

  // Prepare headers with authorization
  const headers = {
    ...API_HEADERS,
    ...options.headers,
    Authorization: `Bearer ${tokens.accessToken}`,
  };

  try {
    // Make the initial request
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // If unauthorized, try to refresh token
    if (response.status === 401) {
      console.log("Received 401, attempting token refresh...");

      try {
        // Refresh tokens
        const refreshResult = await store.dispatch(refreshTokens()).unwrap();

        // Retry the original request with new token
        const newHeaders = {
          ...headers,
          Authorization: `Bearer ${refreshResult.accessToken}`,
        };

        const retryResponse = await fetch(url, {
          ...options,
          headers: newHeaders,
        });

        return retryResponse;
      } catch (refreshError) {

        // Refresh failed, logout user
        store.dispatch(localLogout());
        throw new Error("Session expired, please login again");
      }
    }

    return response;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

// Helper function to check if token needs refresh
export const shouldRefreshToken = (tokens: any) => {
  if (!tokens) return false;

  const now = Math.floor(Date.now() / 1000);
  const tokenExpiryTime = now + tokens.accessExpiresInSeconds;
  const bufferTime = 5 * 60; // 5 minutes buffer

  return tokenExpiryTime <= now + bufferTime;
};
