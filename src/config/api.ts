// src/config/api.ts
export const API_CONFIG = {
  BASE_URL: "http://192.168.60.110:8386",
  ENDPOINTS: {
    AUTH: {
      REGISTER: "/cookinote/auth/register",
      VERIFY_OTP: "/cookinote/auth/verify-otp",
      RESEND_OTP: "/cookinote/auth/resend-otp",
      LOGIN: "/cookinote/auth/login",
      LOGOUT: "/cookinote/auth/logout", // Add this
    },
  },
};

export const API_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
