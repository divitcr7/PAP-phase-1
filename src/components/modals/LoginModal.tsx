import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { X, Eye, EyeOff } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSignUp: boolean;
}

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});

const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  financialInfo: z.string().min(1, "Financial info is required"),
  style: z.string().min(1, "Style preference is required"),
  size: z.string().min(1, "Size preference is required"),
  price: z.string().min(1, "Price preference is required"),
});

const LoginModal = ({ isOpen, onClose, isSignUp }: LoginModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(isSignUp ? signupSchema : loginSchema),
    defaultValues: isSignUp
      ? {
          name: "",
          email: "",
          address: "",
          financialInfo: "",
          style: "",
          size: "",
          price: "",
        }
      : {
          email: "",
          password: "",
        },
  });

  if (!isOpen) return null;

  const onSubmit = (data: any) => {
    console.log(isSignUp ? "Sign Up Data:" : "Login Data:", data);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/5 z-50">
      <div className="relative w-full max-w-3xl max-h-[650px] min-h-[500px] h-screen rounded-lg shadow-lg overflow-hidden border flex">
        {/* Image Section */}
        <div className="hidden md:block w-1/3">
          <img
            src={
              isSignUp
                ? "/images/banner/banner-signup.jpg"
                : "/images/banner/banner-account1.jpg"
            }
            alt="Banner"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-2/3 flex flex-col items-center bg-blue-100 p-6 relative">
          <Button
            variant="ghost"
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 hover:bg-gray-500 rounded-full py-5"
          >
            <X className="size-5" />
          </Button>

          <h2 className="text-2xl font-semibold text-blue-700 my-4">
            {isSignUp ? "Join Now" : "Already a Pad Person?"}
          </h2>
          <h3 className="text-xl text-blue-600 mb-3">
            {isSignUp ? "Sign up:" : "Sign in:"}
          </h3>

          <Card className="w-full max-w-md p-4 py-8">
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  {Object.keys(form.getValues()).map((field) => (
                    <FormField
                      key={field}
                      control={form.control}
                      name={field as keyof any}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {field.name.charAt(0).toUpperCase() +
                              field.name.slice(1)}
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                type={
                                  field.name === "password" && !showPassword
                                    ? "password"
                                    : "text"
                                }
                                placeholder={`Enter ${field.name}`}
                              />
                              {field.name === "password" &&
                                form.watch("password")?.length > 1  && (
                                  <Button
                                    type="button"
                                    variant={"ghost"}
                                    className="absolute right-1 top-0 text-gray-500"
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                  >
                                    {showPassword ? <EyeOff /> : <Eye />}
                                  </Button>
                                )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {isSignUp ? "Sign Up" : "Login"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4 mt-4 md:gap-28">
            <div className="bg-blue-300 px-8 py-4 rounded-md transition-all hover:py-10 hover:bg-blue-800 text-white text-center relative group">
              Qualified
              <div className="absolute left-0 right-0 opacity-0 group-hover:opacity-100 text-sm mt-2">
                Check Apartments
              </div>
            </div>
            <div className="bg-blue-200 px-8 py-4 rounded-md transition-all hover:py-10 hover:bg-blue-600 text-white text-center relative group">
              Non-qualified
              <div className="absolute left-0 right-0 opacity-0 group-hover:opacity-100 text-sm mt-2">
                Loan
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-4 md:gap-28">
            <div className="bg-blue-300 px-8 py-4 rounded-md transition-all hover:py-10 hover:bg-blue-800 text-white text-center">
              Qualified
              <div className="hidden hover:block">Check Apartments</div>
            </div>
            <div className="bg-blue-200 px-8 py-4 rounded-md transition-all hover:py-10 hover:bg-blue-600 text-white text-center">
              Non-qualified
              <div className="hidden hover:block">Get Credit Help</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
