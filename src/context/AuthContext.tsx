import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axiosInstance from "@/lib/axiosInstance";
import { LoginFormValues, SignupFormValues } from "@/schemas/Auth";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginFormValues) => Promise<void>;
  signup: (data: SignupFormValues) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuthStatus = async () => {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("auth_token");

      if (storedUser && token) {
        try {
          // Verify token with backend
          const response = await axiosInstance.get("/auth/verify");
          if (response.status === 200) {
            setUser(JSON.parse(storedUser));
          } else {
            // Token invalid, clear storage
            localStorage.removeItem("user");
            localStorage.removeItem("auth_token");
          }
        } catch (error) {
          console.error("Auth verification failed:", error);
          localStorage.removeItem("user");
          localStorage.removeItem("auth_token");
        }
      }

      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/auth/login", data);
      const { user, token } = response.data;

      // Store user and token
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("auth_token", token);

      setUser(user);
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
      const response = await axiosInstance.post("/auth/register", data);
      const { user, token } = response.data;

      // Store user and token
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("auth_token", token);

      setUser(user);
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("auth_token");
    setUser(null);
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
