import { createContext, useState, useEffect, ReactNode } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { LoginFormValues, SignupFormValues } from "@/schemas/Auth";
import { User } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginFormValues) => Promise<void>;
  signup: (data: SignupFormValues) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check if token exists in localStorage
        const token = localStorage.getItem("auth_token");

        if (token) {
          // Set the token in axios headers
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;

          // Fetch current user from your API
          const response = await axiosInstance.get("/auth/me");

          if (response.data.success) {
            setUser(response.data.user);
          } else {
            localStorage.removeItem("auth_token");
            delete axiosInstance.defaults.headers.common["Authorization"];
          }
        }
      } catch (error) {
        console.error("Auth verification failed:", error);
        localStorage.removeItem("auth_token");
        delete axiosInstance.defaults.headers.common["Authorization"];
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      // Login through your API
      const response = await axiosInstance.post("/auth/login", data);

      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem("auth_token", token);

        // Set the token in axios headers for future requests
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;

        setUser(response.data.user);
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      // Signup through your API
      const response = await axiosInstance.post("/auth/register", data);

      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem("auth_token", token);

        // Set the token in axios headers for future requests
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;

        setUser(response.data.user);
      } else {
        throw new Error(response.data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Logout through your API
      await axiosInstance.post("/auth/logout");

      // Clear local storage and state
      localStorage.removeItem("auth_token");
      delete axiosInstance.defaults.headers.common["Authorization"];
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);

      // Even if the API call fails, clear local state
      localStorage.removeItem("auth_token");
      delete axiosInstance.defaults.headers.common["Authorization"];
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
