// User and authentication types
export interface User {
  userId: number;
  email: string;
  password?: string;
  authProvider?: string;
  avatarUrl?: string;
  createdAt?: string;
  displayName: string;
  emailVerified?: boolean;
  enabled?: boolean;
  username?: string;
  passwordChangedAt?: string;
  role?: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  accessExpiresInSeconds: number;
  refreshExpiresInSeconds: number;
}

export interface LoginResponse {
  code: number;
  message: string;
  data: {
    userId: number;
    email: string;
    displayName: string;
    tokens: Tokens;
  };
}

export interface AuthState {
  user: User | null;
  tokens: Tokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  display_name: string;
  name: string;
}
