// src/hooks/useTokenValidation.ts
import { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { checkAuthStatus, localLogout } from '../store/authSlice';
import { Alert } from 'react-native';

export const useTokenValidation = () => {
  const { tokens } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const validateToken = useCallback(async () => {
    try {
      await dispatch(checkAuthStatus()).unwrap();
      return true;
    } catch (error) {
      console.error('Token validation failed:', error);
      
      // Show alert and logout
      Alert.alert(
        "Phiên đăng nhập hết hạn",
        "Vui lòng đăng nhập lại để tiếp tục sử dụng ứng dụng.",
        [
          {
            text: "Đăng nhập lại",
            onPress: () => {
              dispatch(localLogout());
            },
          },
        ]
      );
      
      return false;
    }
  }, [dispatch]);

  const isTokenExpired = useCallback(() => {
    if (!tokens) return true;
    
    const now = Math.floor(Date.now() / 1000);
    const tokenExpiryTime = now + tokens.accessExpiresInSeconds;
    
    return tokenExpiryTime <= now;
  }, [tokens]);

  return {
    validateToken,
    isTokenExpired,
  };
};