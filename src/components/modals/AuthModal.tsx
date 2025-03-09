import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import LoginForm from "../forms/LoginForm";
import SignupForm from "../forms/SignupForm";
import {
  LoginModalProps,
  LoginFormValues,
  SignupFormValues,
} from "@/types/auth";

const AuthModal = ({
  isOpen,
  onClose,
  isSignUp: isSignUpProp,
}: LoginModalProps) => {
  const [isSignUp, setIsSignUp] = useState(isSignUpProp);

  if (!isOpen) return null;

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const handleLoginSubmit = (data: LoginFormValues) => {
    console.log("Login Data:", data);
  };

  const handleSignupSubmit = (data: SignupFormValues) => {
    console.log("Sign Up Data:", data);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/5 z-50">
      <div
        className={`relative w-full max-w-3xl max-h-[650px] min-h-[500px] h-screen rounded-lg shadow-lg overflow-hidden border flex`}
      >
        <div className="hidden md:block w-1/3">
          <img
            src={
              isSignUp
                ? "/images/banner/banner-account2.jpg"
                : "/images/banner/banner-account1.jpg"
            }
            alt="Banner"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full md:w-2/3 flex flex-col items-center bg-blue-100 p-6 relative">
          <Button
            variant="ghost"
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 hover:bg-gray-500 rounded-full py-5"
          >
            <X className="size-5" />
          </Button>

          <h2
            className={`text-3xl font-semibold text-blue-700 my-4`}
          >
            {isSignUp ? "Join Now" : "Already a Pad Person?"}
          </h2>
          <h3 className="text-xl text-blue-600 mb-3">
            {isSignUp ? "Sign up" : "Sign in"}
          </h3>

          <Card
            className={`w-full p-4 md:max-w-2xl py-8`}
          >
            <CardContent>
              {isSignUp ? (
                <SignupForm onSubmit={handleSignupSubmit} />
              ) : (
                <LoginForm onSubmit={handleLoginSubmit} />
              )}
            </CardContent>
          </Card>

          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-md font-semibold text-blue-700">
              {isSignUp ? "Already a Pad Person?" : "Not yet, Join Now"}
            </span>
            <Button
              variant="link"
              className="text-blue-600 p-0 text-lg"
              onClick={toggleSignUp}
            >
              {isSignUp ? "Back to Login" : "Sign Up"}
            </Button>
          </div>

          {!isSignUp && (
            <div className="flex justify-between mt-4 md:mt-10 relative w-full h-24">
              <div className="absolute left-2 top-0 group hover:scale-120 bg-blue-500 hover:bg-blue-600 rounded-md transition-all duration-300 text-white text-center w-32 h-16 overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                  <span className="font-medium transition-all duration-300 group-hover:text-md">
                    Qualified
                  </span>
                  <div className="absolute opacity-0 group-hover:opacity-100 text-xs transform translate-y-8 group-hover:translate-y-5 transition-all duration-300">
                    Check Apartments!
                  </div>
                </div>
              </div>

              <div className="absolute right-2 top-0 group hover:scale-120 bg-blue-400 hover:bg-blue-600 rounded-md transition-all duration-300 text-white text-center w-44 h-16 overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                  <span className="font-medium transition-all duration-300 group-hover:text-md">
                    Non-qualified
                  </span>
                  <div className="absolute opacity-0 group-hover:opacity-100 text-xs transform translate-y-8 group-hover:translate-y-5 transition-all duration-300">
                    Get Credit Help!
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
