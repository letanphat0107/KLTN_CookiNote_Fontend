import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User, Tokens, LoginResponse } from "../types/user";
import { API_CONFIG, API_HEADERS } from "../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "auth_tokens";
const USER_KEY = "user_data";

// Async thunk to check authentication status
export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      // Get tokens and user data from AsyncStorage
      const [tokensString, userString] = await Promise.all([
        AsyncStorage.getItem(TOKEN_KEY),
        AsyncStorage.getItem(USER_KEY),
      ]);

      if (!tokensString || !userString) {
        return rejectWithValue("No stored authentication data");
      }

      const tokens: Tokens = JSON.parse(tokensString);
      const user: User = JSON.parse(userString);

      // Check if access token is expired (with 5 minute buffer)
      const now = Math.floor(Date.now() / 1000);
      const tokenExpiryTime = now + tokens.accessExpiresInSeconds;
      const bufferTime = 5 * 60; // 5 minutes buffer

      if (tokenExpiryTime <= now + bufferTime) {
        console.log(
          "Access token expired or expiring soon, attempting refresh..."
        );

        try {
          // Try to refresh the token
          const refreshResult = await dispatch(refreshTokens()).unwrap();

          // Update tokens with new ones
          const updatedTokens = refreshResult;

          return { user, tokens: updatedTokens };
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          // Clear expired data
          await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
          return rejectWithValue("Token refresh failed");
        }
      }

      return { user, tokens };
    } catch (error) {
      console.error("Error checking auth status:", error);
      return rejectWithValue("Error checking authentication status");
    }
  }
);

// Async thunk for logout API
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      const state = getState() as { auth: AuthState };
      const { tokens } = state.auth;

      if (!tokens) {
        await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
        return;
      }

      // Use fetchWithAuth to handle token refresh if needed
      try {
        const response = await fetch(
          `${API_CONFIG.BASE_URL}/cookinote/auth/logout`,
          {
            method: "POST",
            headers: {
              ...API_HEADERS,
              Authorization: `Bearer ${tokens.accessToken}`,
            },
            body: JSON.stringify({
              refreshToken: tokens.refreshToken,
            }),
          }
        );

        console.log("Logout API response status:", response.status);
      } catch (apiError) {
        console.warn("Logout API call failed:", apiError);
        // Continue with local logout even if API fails
      }

      // Always clear local storage
      await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
      return;
    } catch (error) {
      console.error("Logout error:", error);

      try {
        await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
      } catch (storageError) {
        console.error("Error clearing storage during logout:", storageError);
      }

      return rejectWithValue("Logout failed, but local data cleared");
    }
  }
);

// Async thunk for refresh token
export const refreshTokens = createAsyncThunk(
  "auth/refreshTokens",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      const { tokens } = state.auth;

      if (!tokens || !tokens.refreshToken) {
        return rejectWithValue("No refresh token available");
      }

      console.log("Refreshing tokens...");

      const response = await fetch(
        `${API_CONFIG.BASE_URL}/cookinote/auth/refresh`,
        {
          method: "POST",
          headers: API_HEADERS,
          body: JSON.stringify({
            refreshToken: tokens.refreshToken,
          }),
        }
      );

      const result = await response.json();
      console.log("Refresh token response:", result);

      if (!response.ok) {
        // Refresh token is invalid or expired
        return rejectWithValue(result.message || "Refresh token expired");
      }

      // Assuming the response structure is similar to login
      const newTokens = result.data?.tokens || result.tokens;

      if (!newTokens) {
        return rejectWithValue("Invalid refresh response format");
      }

      return newTokens;
    } catch (error) {
      console.error("Refresh token error:", error);
      return rejectWithValue("Network error during token refresh");
    }
  }
);

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: true, // Start with loading true
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<LoginResponse["data"]>) => {
      const { userId, username, email, displayName, avatarUrl, tokens } =
        action.payload;

      state.user = {
        userId,
        username,
        email,
        displayName,
        avatarUrl,
      };
      state.tokens = tokens;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;

      // Save to AsyncStorage
      AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
      AsyncStorage.setItem(
        USER_KEY,
        JSON.stringify({
          userId,
          username,
          email,
          displayName,
          avatarUrl,
        })
      );
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isAuthenticated = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    // Local logout (without API call)
    localLogout: (state) => {
      state.user = null;
      state.tokens = null;
      state.isAuthenticated = false;
      state.error = null;
      state.isLoading = false;

      // Clear AsyncStorage
      AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
    },
    updateTokens: (state, action: PayloadAction<Tokens>) => {
      state.tokens = action.payload;

      // Update AsyncStorage
      AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        const { user, tokens } = action.payload;
        state.user = user;
        state.tokens = tokens;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.user = null;
        state.tokens = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      })
      // Logout API cases
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.tokens = null;
        state.isAuthenticated = false;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        // Even if logout API fails, we clear the local state
        state.user = null;
        state.tokens = null;
        state.isAuthenticated = false;
        state.error = null;
        state.isLoading = false;
      })
      // Refresh token cases
      .addCase(refreshTokens.pending, (state) => {
        // Don't set loading to true for refresh, it's background operation
        console.log("Refreshing tokens...");
      })
      .addCase(refreshTokens.fulfilled, (state, action) => {
        const newTokens = action.payload;
        state.tokens = newTokens;
        state.error = null;

        // Update AsyncStorage with new tokens
        AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(newTokens));

        console.log("Tokens refreshed successfully");
      })
      .addCase(refreshTokens.rejected, (state, action) => {
        console.error("Token refresh failed:", action.payload);
        // Don't clear state here, let the calling function handle it
        state.error = action.payload as string;
      });
  },
});

export const {
  setLoading,
  loginSuccess,
  loginFailure,
  clearError,
  localLogout,
  updateTokens,
} = authSlice.actions;

export default authSlice.reducer;
