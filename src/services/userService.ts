// src/services/userService.ts
import {
  API_URLS,
  createAuthHeaders,
  createFormDataHeaders,
} from "../config/api";
import { fetchWithAuth } from "../utils/apiHelper";

export interface UpdateDisplayNameRequest {
  displayName: string;
}

export interface EmailChangeRequest {
  newEmail: string;
}

export interface EmailVerifyChangeRequest {
  newEmail: string;
  otp: string;
}

export interface UserProfileResponse {
  code: number;
  message: string;
  data?: any;
  timestamp?: string;
  path?: string;
}

export class UserService {
  // Update display name
  static async updateDisplayName(
    displayName: string,
    accessToken: string
  ): Promise<UserProfileResponse> {
    try {
      const response = await fetchWithAuth(API_URLS.UPDATE_DISPLAY_NAME, {
        method: "PATCH",
        body: JSON.stringify({ displayName }),
      },true, false);

      return response.json();
    } catch (error) {
      console.error("Update display name error:", error);
      throw error;
    }
  }

  // Change avatar
  static async changeAvatar(
    imageUri: string,
  ): Promise<UserProfileResponse> {
    try {
      const formData = new FormData();


      const filename = imageUri.split("/").pop() || "avatar.jpg";
      const match = /\.(\w+)$/.exec(filename);
      const fileType = match ? `image/${match[1]}` : "image/jpeg";

      formData.append("file", {
        uri: imageUri,
        type: fileType,
        name: filename,
      } as any);

      const response = await fetchWithAuth(API_URLS.CHANGE_AVATAR, {
        method: "PUT",
        body: formData,
      },true, true);

      return response.json();
    } catch (error) {
      console.error("Change avatar error:", error);
      throw error;
    }
  }

  // Request email change (send OTP)
  static async requestEmailChange(
    newEmail: string,
    accessToken: string
  ): Promise<UserProfileResponse> {
    const response = await fetch(API_URLS.EMAIL_CHANGE_REQUEST, {
      method: "POST",
      headers: createAuthHeaders(accessToken),
      body: JSON.stringify({ newEmail }),
    });
    return response.json();
  }

  // Resend email change OTP
  static async resendEmailChangeOTP(
    newEmail: string,
    accessToken: string
  ): Promise<UserProfileResponse> {
    const response = await fetch(API_URLS.EMAIL_RESEND_OTP, {
      method: "POST",
      headers: createAuthHeaders(accessToken),
      body: JSON.stringify({ newEmail }),
    });
    return response.json();
  }

  // Verify email change with OTP
  static async verifyEmailChange(
    newEmail: string,
    otp: string,
    accessToken: string
  ): Promise<UserProfileResponse> {
    const response = await fetch(API_URLS.EMAIL_VERIFY_CHANGE, {
      method: "POST",
      headers: createAuthHeaders(accessToken),
      body: JSON.stringify({ newEmail, otp }),
    });
    return response.json();
  }

  // Alternative avatar upload with base64
  static async changeAvatarBase64(
    base64Image: string,
    accessToken: string
  ): Promise<UserProfileResponse> {
    const response = await fetch(API_URLS.CHANGE_AVATAR, {
      method: "PUT",
      headers: createAuthHeaders(accessToken),
      body: JSON.stringify({ avatar: base64Image }),
    });
    return response.json();
  }

  // Get user profile
  static async getUserProfile(
    accessToken: string
  ): Promise<UserProfileResponse> {
    const response = await fetch(API_URLS.USER_ME, {
      method: "GET",
      headers: createAuthHeaders(accessToken),
    });
    return response.json();
  }
}
