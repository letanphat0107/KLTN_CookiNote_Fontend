import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User, AuthState, LoginCredentials } from "../types";
import { AuthStorage } from "../utils/authStorage";

// Mock API service - sẽ thay thế bằng real API sau
const mockAuthService = {
  async login(
    credentials: LoginCredentials
  ): Promise<{ user: User; token: string }> {
    // Delay để simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Hardcoded validation theo yêu cầu
    if (credentials.email === "p" && credentials.password === "1") {
      const user: User = {
        userId: 1,
        email: "phat123@cookinote.com",
        password: "", // không trả về password
        authProvider: "local",
        avatarUrl: "https://i.pinimg.com/736x/6b/43/47/6b43478d2362f5e6ba3457abc8adcb06.jpg",
        createdAt: new Date().toISOString(),
        displayName: "Phat Developer",
        emailVerified: true,
        enabled: true,
        username: "phat123",
        role: "user",
      };

      const token = `mock_token_${Date.now()}_${user.userId}`;
      return { user, token };
    } else {
      throw new Error("Tên đăng nhập hoặc mật khẩu không đúng");
    }
  },
};

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async thunks
export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async (_, { rejectWithValue }) => {
    try {
      const { token, user, timestamp } = await AuthStorage.getAuthData();

      if (token && user && AuthStorage.isTokenValid(timestamp)) {
        console.log("✅ Valid token found, auto-login successful");
        const remainingDays = AuthStorage.getTokenRemainingDays(timestamp);
        console.log(`🕒 Token expires in ${remainingDays} days`);

        return { user, token, isAuthenticated: true };
      } else {
        console.log("❌ No valid token found");
        // Xóa data cũ nếu token hết hạn
        if (token) {
          await AuthStorage.clearAuthData();
        }
        return { user: null, token: null, isAuthenticated: false };
      }
    } catch (error) {
      console.error("❌ Error checking auth status:", error);
      return rejectWithValue("Failed to check authentication status");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      console.log("🔐 Attempting login for:", credentials.email);
      const { user, token } = await mockAuthService.login(credentials);

      // Lưu vào AsyncStorage
      await AuthStorage.saveAuthData(token, user);

      console.log("✅ Login successful for user:", user.displayName);
      return { user, token };
    } catch (error) {
      console.error("❌ Login failed:", error);
      const message =
        error instanceof Error ? error.message : "Đăng nhập thất bại";
      return rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      console.log("🚪 Logging out user...");
      await AuthStorage.clearAuthData();
      console.log("✅ Logout successful");
      return null;
    } catch (error) {
      console.error("❌ Logout failed:", error);
      return rejectWithValue("Failed to logout");
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Check Auth Status
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string;
      })

      // Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string;
      })

      // Logout User
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setLoading } = authSlice.actions;
export default authSlice.reducer;
