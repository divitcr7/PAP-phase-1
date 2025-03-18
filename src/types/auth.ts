import { LoginFormValues, SignupFormValues } from "@/schemas/Auth";

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
