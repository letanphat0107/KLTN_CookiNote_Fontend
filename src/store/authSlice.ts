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
      const storedUser: User = JSON.parse(userString);

      console.log("Validating access token with server...");

      // Validate access token with server
      const response = await fetch(
        `${API_CONFIG.BASE_URL}/cookinote/user/me`,
        {
          method: "GET",
          headers: {
            ...API_HEADERS,
            Authorization: `Bearer ${tokens.accessToken}`,
          },
        }
      );

      const result = await response.json();
      console.log("Token validation response:", result);

      if (response.ok && result.code === 200) {
        // Token is valid, update user data with server response
        const serverUser: User = {
          userId: result.data.userId,
          email: result.data.email,
          displayName: result.data.displayName,
          role: result.data.role,
          // Keep stored data for fields not returned by server
          username: storedUser.username,
          avatarUrl: storedUser.avatarUrl,
        };

        // Update stored user data with latest from server
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(serverUser));

        return { user: serverUser, tokens };
      } else if (response.status === 401 || result.code === 401) {
        // Access token expired, try to refresh
        console.log("Access token expired, attempting refresh...");

        try {
          const refreshResult = await dispatch(refreshTokens()).unwrap();

          // Retry validation with new token
          const retryResponse = await fetch(
            `${API_CONFIG.BASE_URL}/cookinote/user/me`,
            {
              method: "GET",
              headers: {
                ...API_HEADERS,
                Authorization: `Bearer ${refreshResult.accessToken}`,
              },
            }
          );

          const retryResult = await retryResponse.json();

          if (retryResponse.ok && retryResult.code === 200) {
            const serverUser: User = {
              userId: retryResult.data.userId,
              email: retryResult.data.email,
              displayName: retryResult.data.displayName,
              role: retryResult.data.role,
              username: storedUser.username,
              avatarUrl: storedUser.avatarUrl,
            };

            await AsyncStorage.setItem(USER_KEY, JSON.stringify(serverUser));
            return { user: serverUser, tokens: refreshResult };
          } else {
            throw new Error("Token validation failed after refresh");
          }
        } catch (refreshError) {
          // Clear expired data
          await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
          return rejectWithValue("Token refresh failed - please login again");
        }
      } else {
        // Other server error
        await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
        return rejectWithValue(
          `Server error: ${result.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error checking auth status:", error);

      // Network error - clear stored data to be safe
      try {
        await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
      } catch (storageError) {
        console.error("Error clearing storage:", storageError);
      }

      return rejectWithValue("Network error - please login again");
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

      console.log("Refreshing tokens...: ", tokens.refreshToken);

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
      const { userId, username, email, displayName, avatarUrl, tokens, role } =
        action.payload;

      state.user = {
        userId,
        username,
        email,
        displayName,
        avatarUrl,
        role,
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
          role,
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
