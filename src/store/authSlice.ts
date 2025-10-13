import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User, Tokens, LoginResponse } from "../types/user";
import { API_CONFIG, API_HEADERS } from "../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "auth_tokens";
const USER_KEY = "user_data";

// Async thunk to check authentication status
export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async (_, { rejectWithValue }) => {
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

      // Check if access token is expired
      const now = Math.floor(Date.now() / 1000);
      const tokenExpiryTime = now + tokens.accessExpiresInSeconds;

      if (tokenExpiryTime <= now) {
        // Token expired, try to refresh or logout
        await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
        return rejectWithValue("Token expired");
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
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      const { tokens } = state.auth;

      if (!tokens) {
        // No tokens, just clear local storage
        await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
        return;
      }

      // Call logout API
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

      // Even if API fails, we still clear local storage
      await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);

      if (!response.ok) {
        console.warn("Logout API failed, but local storage cleared");
      }

      return;
    } catch (error) {
      console.error("Logout error:", error);

      // Clear local storage even if API call fails
      try {
        await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
      } catch (storageError) {
        console.error("Error clearing storage during logout:", storageError);
      }

      return rejectWithValue("Logout failed, but local data cleared");
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
