// src/hooks/useAuthenticatedFetch.ts
import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { refreshTokens, localLogout } from "../store/authSlice";
import { API_HEADERS } from "../config/api";

export const useAuthenticatedFetch = () => {
  const { tokens } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const authenticatedFetch = useCallback(
    async (url: string, options: RequestInit = {}) => {
      if (!tokens) {
        throw new Error("No authentication tokens available");
      }

      const makeRequest = async (accessToken: string) => {
        return fetch(url, {
          ...options,
          headers: {
            ...API_HEADERS,
            ...options.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        });
      };

      try {
        // Make initial request
        let response = await makeRequest(tokens.accessToken);

        // If unauthorized, try refresh
        if (response.status === 401) {
          console.log("Access token expired, refreshing...");

          try {
            const newTokens = await dispatch(refreshTokens()).unwrap();
            response = await makeRequest(newTokens.accessToken);
          } catch (refreshError) {
            console.error("Refresh failed, logging out:", refreshError);
            dispatch(localLogout());
            throw new Error("Session expired, please login again");
          }
        }

        return response;
      } catch (error) {
        console.error("Authenticated fetch failed:", error);
        throw error;
      }
    },
    [tokens, dispatch]
  );

  return { authenticatedFetch };
};
