import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User, Tokens, LoginResponse } from "../types/user";
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
      const { userId, email, displayName, tokens } = action.payload;

      state.user = {
        userId,
        email,
        displayName,
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
          email,
          displayName,
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
    logout: (state) => {
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
      });
  },
});

export const {
  setLoading,
  loginSuccess,
  loginFailure,
  clearError,
  logout,
  updateTokens,
} = authSlice.actions;

export default authSlice.reducer;
