import {
  createContext,
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
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginFormValues) => Promise<void>;
  signup: (data: SignupFormValues) => Promise<void>;
  logout: () => void;
  tempLogin: (email: string, password: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {

      const demoUser = localStorage.getItem("demo_user");
      if (demoUser) {
        setUser(JSON.parse(demoUser));
      }

      const token = localStorage.getItem("auth_token");
      if (token) {
        try {
          // Set the token in axios headers
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;
          const response = await axiosInstance.get("/auth/me");
          if (response.data.success) {
            setUser(response.data.user);
          } else {
            localStorage.removeItem("auth_token");
          }
        } catch (error) {
          console.error("Auth verification failed:", error);
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
      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem("auth_token", token);

        // Set the token in axios headers for future requests
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;

        setUser(response.data.user);
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
      const response = await axiosInstance.post("/auth/register", data);
      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem("auth_token", token);

        // Set the token in axios headers for future requests
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;

        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

    const tempLogin = (email: string, password: string) => {
      // Check if credentials match our demo account
      if (email === "test@test.com" && password === "12345678") {
        const demoUser = {
          id: "demo-123",
          name: "Alex Johnson",
          email: "test@test.com",
          avatar: "/images/avatar/default-avatar.png", // Use a default avatar image
        };

        // Store in localStorage for persistence
        localStorage.setItem("demo_user", JSON.stringify(demoUser));
        localStorage.setItem("auth_token", "demo-token-123");

        // Update state
        setUser(demoUser);
        return true;
      }
      return false;
    };


    const logout = () => {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("demo_user");
      delete axiosInstance.defaults.headers.common["Authorization"];
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
        tempLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
