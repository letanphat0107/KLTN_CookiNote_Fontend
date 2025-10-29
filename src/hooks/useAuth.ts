// src/hooks/useAuth.ts
import { useAppSelector } from "../store/hooks";

export const useAuth = () => {
  const auth = useAppSelector((state) => state.auth);

  return {
    ...auth,
    isLoggedIn: auth.isAuthenticated && auth.user !== null,
    hasRole: (role: string) => auth.user?.role === role,
    isAdmin: auth.user?.role === "ADMIN",
  };
};
