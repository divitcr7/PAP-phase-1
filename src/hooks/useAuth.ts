import { useState } from "react";
import { useAuth as useAuthContext } from "@/context/useAuthContext";
import { LoginFormValues, SignupFormValues } from "@/schemas/Auth";
import { AxiosError } from "axios";

interface ErrorResponse {
  message?: string;
  data?: {
    message?: string;
  };
}

export const useAuth = () => {
  const { login, signup, logout, user, isAuthenticated, isLoading } = useAuthContext();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (data: LoginFormValues) => {
    setError(null);
    setIsSubmitting(true);
    try {
      await login(data);
      return true;
    } catch (err: unknown) {
      const axiosError = err as AxiosError<ErrorResponse>;
      setError(
        axiosError.response?.data?.message || "Login failed. Please try again."
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (data: SignupFormValues) => {
    setError(null);
    setIsSubmitting(true);
    try {
      await signup(data);
      return true;
    } catch (err: unknown) {
      const axiosError = err as AxiosError<ErrorResponse>;
      setError(
        axiosError.response?.data?.message || "Signup failed. Please try again."
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return {
    handleLogin,
    handleSignup,
    handleLogout,
    error,
    isSubmitting,
    user,
    isAuthenticated,
    isLoading,
  };
};
