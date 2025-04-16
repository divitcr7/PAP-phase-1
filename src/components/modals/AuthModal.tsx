import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import LoginForm from "../forms/LoginForm";
import SignupForm from "../forms/SignupForm";
import { LoginModalProps } from "@/types/auth";
import { LoginFormValues, SignupFormValues } from "@/schemas/Auth";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { testimonialData } from "@/data/testimonials";
import "swiper/css";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/lib/toast";

const AuthModal = ({
  isOpen,
  onClose,
  isSignUp: isSignUpProp,
}: LoginModalProps) => {
  const [isSignUp, setIsSignUp] = useState(isSignUpProp);
  const { handleLogin, handleSignup, error, isSubmitting } = useAuth();

  if (!isOpen) return null;

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const handleLoginSubmit = async (data: LoginFormValues) => {
    const success = await handleLogin(data);
    if (success) {
      toast.success("Login successful", {
        description: "Welcome back to Pick A Pad!",
      });
      onClose();
    } else if (error) {
      toast.error("Login failed", {
        description: error,
      });
    }
  };

  const handleSignupSubmit = async (data: SignupFormValues) => {
    const success = await handleSignup(data);
    if (success) {
      toast.success("Signup successful", {
        description: "Welcome to Pick A Pad!",
      });
      onClose();
    } else if (error) {
      toast.error("Signup Failed", {
        description: error,
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/5 z-50">
      <div
        className={`relative w-full max-w-3xl max-h-[650px] min-h-[500px] h-screen rounded-lg shadow-lg overflow-hidden border flex`}
      >
        <div className="hidden w-2/5 bg-gradient-to-b from-blue-300 to-blue-400 md:flex flex-col items-center justify-between p-6 text-white">
          <div className="flex flex-col items-center">
            <img
              src="/images/logo/logo-transparent@2x.png"
              alt="Pick a Pad Logo"
              className="w-36 mb-6"
            />
            <h3 className="text-2xl font-bold mb-4 text-center text-black/70">
              {isSignUp ? "Join Our Community" : "Welcome Back!"}
            </h3>
            <p className="text-center mb-6">
              {isSignUp
                ? "Find your perfect pad and enjoy exclusive benefits as a Pad Person."
                : "Continue your journey to find the perfect living space."}
            </p>
            <div className="space-y-4 w-full">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm">Self touring options</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm">Reduced rent opportunities</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm">Instant leasing process</span>
              </div>
            </div>
          </div>

          {/* Testimonials Carousel */}
          <div className="mt-20 w-full">
            <h4 className="text-lg font-semibold mb-3 text-gray-200">
              What Pad People Say
            </h4>
            <Swiper
              className="w-full"
              slidesPerView={1}
              loop={true}
              spaceBetween={20}
              modules={[Autoplay]}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
            >
              {testimonialData.slice(0, 3).map(({ id, quote, name, stars }) => (
                <SwiperSlide key={id}>
                  <div className="bg-blue-500/70 p-4 rounded-lg">
                    {/* Stars */}
                    <div className="flex mb-2">
                      {[...Array(stars)].map((_, index) => (
                        <svg
                          key={index}
                          className="w-4 h-4 text-yellow-500 fill-yellow-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>

                    {/* Quote - shortened for modal */}
                    <p className="text-sm italic text-gray-200 mb-2">
                      "
                      {quote.length > 100
                        ? quote.substring(0, 150) + "..."
                        : quote}
                      "
                    </p>

                    {/* Author */}
                    <p className="text-xs text-gray-300 font-medium">{name}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="w-full md:w-3/5 flex flex-col items-center bg-gradient-to-r from-blue-200 to-blue-300 p-6 relative">
          <Button
            variant="ghost"
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 hover:bg-gray-500 rounded-full py-5"
            disabled={isSubmitting}
          >
            <X className="size-5" />
          </Button>

          <h2 className={`text-3xl font-semibold text-blue-700 my-4`}>
            {isSignUp ? "Join Now" : "Already a Pad Person?"}
          </h2>
          <h3 className="text-xl text-blue-600 mb-3">
            {isSignUp ? "Sign up" : "Sign in"}
          </h3>

          <Card className={`w-full p-4 md:max-w-2xl py-8`}>
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
              disabled={isSubmitting}
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
