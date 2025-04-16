import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { SignupFormProps } from "@/types/auth";
import { SignupFormValues, signupSchema } from "@/schemas/Auth";

const SignupForm = ({ onSubmit }: SignupFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "customer",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="text-gray-300 mb-2">Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter Name"
                  className="rounded-full h-12 px-4"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300 mb-2">Email</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="email" 
                  placeholder="Enter Email" 
                  className="rounded-full h-12 px-4"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300 mb-2">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    className="rounded-full h-12 px-4"
                    onChange={(e) => {
                      field.onChange(e);
                      if (e.target.value.length === 0) {
                        setShowPassword(false);
                      }
                    }}
                  />
                  {field.value.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="absolute right-1 top-0 text-gray-500 h-12"
                      onClick={() => setShowPassword(!showPassword)}
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300 mb-2">Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="rounded-full h-12 px-4"
                    onChange={(e) => {
                      field.onChange(e);
                      if (e.target.value.length === 0) {
                        setShowConfirmPassword(false);
                      }
                    }}
                  />
                  {field.value.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="absolute right-1 top-0 text-gray-500 h-12"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </Button>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-full h-12"
        >
          Sign Up
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
