// src/components/SessionManager.tsx
import React, { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { checkAuthStatus } from "../store/authSlice";

const SessionManager: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      // When app comes to foreground and user is authenticated
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active" &&
        isAuthenticated
      ) {
        console.log("App came to foreground, validating session...");
        dispatch(checkAuthStatus());
      }

      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription?.remove();
    };
  }, [dispatch, isAuthenticated]);

  return <>{children}</>;
};

export default SessionManager;
