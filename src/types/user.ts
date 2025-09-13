// User and authentication types
export interface User {
  user_id: number;
  email: string;
  password: string;
  auth_provider: string;
  avatar_url?: string;
  created_at: string;
  display_name: string;
  email_verified: boolean;
  enabled: boolean;
  name: string;
  password_changed_at?: string;
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
