// types/auth.ts
import * as z from "zod";

// Define the schema for signup form validation
export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  financialInfo: z.string().min(1, "Financial info is required"),
  style: z.string().min(1, "Style preference is required"),
  size: z.string().min(1, "Size preference is required"),
  price: z.number().min(1, "Price preference is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});

// Define the schema for login form validation
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});

// Export the inferred types for the form values
export type SignupFormValues = z.infer<typeof signupSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;

// Define the props interface for the LoginModal component
export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSignUp: boolean;
}

// Define the props interface for the SignupForm component
export interface SignupFormProps {
  onSubmit: (data: SignupFormValues) => void;
}

// Define the props interface for the LoginForm component
export interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => void;
}
