// User and authentication types
export interface User {
  userId: number;
  email: string;
  password: string;
  authProvider: string;
  avatarUrl?: string;
  createdAt: string;
  displayName: string;
  emailVerified: boolean;
  enabled: boolean;
  username: string;
  passwordChangedAt?: string;
  role: string;
}

export interface EmailOtp {
  id: number;
  email_otp: string;
  attempts: number;
  code_hash: string;
  created_at: string;
  expires_at: string;
  max_attempts: number;
  purpose: string;
  user_id: number;
}

export interface AuthState {
  user: User | null;
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
