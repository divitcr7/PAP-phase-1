import { LoginFormValues, SignupFormValues } from "@/schemas/Auth";

export interface User {
  id: string;
  name: string;
  email: string;
  user_type: "master_agent" | "agent" | "customer";
  avatar?: string;
}

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSignUp: boolean;
}

export interface SignupFormProps {
  onSubmit: (data: SignupFormValues) => void;
}

export interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => void;
}
