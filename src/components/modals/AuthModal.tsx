import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Star } from "lucide-react";
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

type SideBarProps = {
  isSignUp: boolean;
};
const SideBar = ({ isSignUp }: SideBarProps) => {
  return (
    <div className="flex flex-col items-center justify-between px-3 lg:p-6 text-white max-w-full">
      <div className="flex flex-col items-center">
        <img
          src="/images/logo/logo-transparent@2x.png"
          alt="Pick a Pad"
          className="hidden md:block w-36 mb-3 hover:scale-105 transition-transform duration-300"
        />
        <h3 className="hidden md:block text-xl font-bold mb-1 text-center bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
          {isSignUp ? "Join Our Community" : "Welcome Back!"}
        </h3>
        <p className="hidden md:block text-center lg:mb-6 text-gray-300 leading-relaxed text-sm">
          {isSignUp
            ? "Find your perfect pad and enjoy exclusive benefits as a Pad Person."
            : "Continue your journey to find the perfect living space."}
        </p>

        <div className="lg:space-y-4 grid grid-cols-3 md:block gap-2 md:gap-0 text-xs md:text-base md:w-full">
          <div className="flex items-center gap-4 bg-blue-900/30 p-2 rounded-xl backdrop-blur-sm hover:bg-blue-900/40 transition-colors">
            <div className="bg-blue-600 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-2 md:size-4"
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
            <h4 className="font-semibold text-blue-200">
              Self touring options
            </h4>
          </div>
          <div className="flex items-center gap-4 bg-blue-900/30 p-2 rounded-xl backdrop-blur-sm hover:bg-blue-900/40 transition-colors">
            <div className="bg-blue-500 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-2 md:size-4"
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
            <span className="font-semibold text-blue-200 text-md">
              Reduced rent opportunities
            </span>
          </div>
          <div className="flex items-center gap-4 bg-blue-900/30 p-2 rounded-xl backdrop-blur-sm hover:bg-blue-900/40 transition-colors">
            <div className="bg-blue-500 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-2 md:size-4"
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
            <span className="font-semibold text-blue-200 text-md">
              Instant leasing process
            </span>
          </div>
        </div>
      </div>

      <div className="text-sm lg:text-base w-full mt-6 lg:mt-8">
        <h4 className="text-md font-semibold mb-3 text-blue-200">
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
              <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/40 p-3 px-4 rounded-xl backdrop-blur-sm">
                <div className="flex mb-1 lg:mb-1.5 gap-1">
                  {[...Array(stars)].map((_, index) => (
                    <Star
                      key={index}
                      className="size-3 lg:size-4 text-yellow-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-xs lg:text-sm italic text-gray-300 mb-2 line-clamp-5">
                  {quote}
                </p>
                <p className="text-[10px] lg:text-xs text-blue-300 font-medium">
                  {name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

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
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/40 z-50 !border-none animate-in fade-in duration-300">
      <div
        className={`${
          isSignUp ? "max-h-[850px]" : "max-h-[780px]"
        } relative w-[95%] lg:w-full max-w-4xl lg:max-h-[680px] min-h-[500px] h-screen rounded-2xl shadow-2xl overflow-hidden flex scale-in-center`}
      >
        <div className="hidden w-2/5 md:flex bg-gradient-to-br from-blue-950 to-gray-900">
          <SideBar isSignUp={isSignUp} />
        </div>
        <div className="w-full md:w-3/5 flex flex-col items-center bg-gradient-to-br from-gray-900 to-blue-900 md:p-6 relative">
          <Button
            variant="ghost"
            onClick={onClose}
            className="absolute top-1 right-1 text-gray-400 hover:text-white hover:bg-gray-800/10 rounded-full transition-colors"
            disabled={isSubmitting}
          >
            <X className="size-5" />
          </Button>

          <img
            src="/images/logo/logo-transparent@2x.png"
            alt="Pick a Pad Logo"
            className="w-28 md:hidden md:w-36 mb-3 hover:scale-105 transition-transform duration-300 pt-6"
          />

          <div className={`text-center ${isSignUp ? "mb-3" : "my-2 lg:my-4"}`}>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent mb-2">
              {isSignUp ? "Join Now" : "Already a Pad Person?"}
            </h2>
            <p className="text-sm md:text-base text-gray-400">
              {isSignUp
                ? "Let find your perfect match"
                : "Continue your smart home search"}
            </p>
          </div>

          <Card className="w-full max-w-md bg-gray-900/50 border-gray-800 backdrop-blur-sm">
            <CardContent>
              {isSignUp ? (
                <SignupForm onSubmit={handleSignupSubmit} />
              ) : (
                <LoginForm onSubmit={handleLoginSubmit} />
              )}
            </CardContent>
          </Card>

          <div className="text-sm lg:text-base flex items-center justify-center mt-2 lg:mt-3">
            <span className="text-gray-400">
              {isSignUp ? "Already have an account?" : "New to Pick A Pad?"}
            </span>
            <Button
              variant="link"
              className="text-blue-400 hover:text-blue-300 transition-colors"
              onClick={toggleSignUp}
              disabled={isSubmitting}
            >
              {isSignUp ? "Sign In" : "Create Account"}
            </Button>
          </div>

          {!isSignUp && (
            <div className="flex justify-between mt-5 md:mt-10 relative w-full h-16 lg:h-20">
              <div className="absolute left-5 lg:left-2 top-0 group hover:scale-120 bg-blue-600 hover:bg-blue-700 rounded-md transition-all duration-300 text-white text-center w-32 h-10 lg:h-16 overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                  <span className="font-medium transition-all duration-300 group-hover:text-md">
                    Qualified
                  </span>
                  <div className="absolute opacity-0 group-hover:opacity-100 text-xs transform translate-y-8 group-hover:translate-y-5 transition-all duration-300">
                    Check Apartments!
                  </div>
                </div>
              </div>

              <div className="absolute right-5 lg:right-2 top-0 group hover:scale-120 bg-blue-800 hover:bg-blue-900 rounded-md transition-all duration-300 text-white text-center w-44 h-10 lg:h-16 overflow-hidden">
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

          <div className="md:hidden w-full mt-6">
            <SideBar isSignUp={isSignUp} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
