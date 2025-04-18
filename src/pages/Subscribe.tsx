import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Brain, Key, Coins, Gift } from "lucide-react";
import BGSliderImage from "/images/slider/slider-1.jpg";
import AuthModal from "@/components/modals/AuthModal";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const Subscribe = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { isAuthenticated, user } = useAuth();

  return (
    <section
      className="relative text-white min-h-screen flex flex-col justify-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${BGSliderImage})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-black/40 z-0"></div>

      {/* Animated accent line */}
      <div className="absolute left-0 top-1/4 h-32 w-2 bg-gradient-to-b from-blue-400 to-blue-600"></div>

      {/* <div className="absolute top-10 left-5">
        <img
          alt="logo"
          width={200}
          src="/images/logo/logo-transparent@2x.png"
          className="transition-transform duration-300 ease-in-out transform hover:scale-105"
        />
      </div> */}
      <div className="absolute top-8 right-4 text-white">
        <img
          alt="AI Graphic"
          width={200}
          src="images/slider/graplic-slider-2.png"
          className="transition-transform duration-300 ease-in-out transform hover:scale-105"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-8 flex flex-col h-full justify-center">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-white mt-10">
            Welcome Home
          </h1>
          <div className="text-4xl md:text-6xl md:mt-10 max-w-4xl mx-auto font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent mb-6 md:mb-10 animate-gradient">
            Find Your Perfect Pad Today!
          </div>
          <div className="max-w-2xl mx-auto text-lg">
            <p className="mb-6 text-gray-200">
              Experience the future of rental hunting with our AI-driven
              platform. Join thousands of satisfied renters who found their
              dream home with us.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:mx-4 lg:mx-20 lg:grid-cols-4 gap-4 lg:gap-8 mb-8">
          <div className="flex items-center gap-3 bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm p-4 rounded-xl border border-blue-700/20 hover:border-blue-500/40 transition-all duration-300 group">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Brain className="h-5 w-5" />
            </div>
            <span className="group-hover:text-blue-400 transition-colors">
              Self touring
            </span>
          </div>
          <div className="flex items-center gap-3 bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm p-4 rounded-xl border border-blue-700/20 hover:border-blue-500/40 transition-all duration-300 group">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Key className="h-5 w-5" />
            </div>
            <span className="group-hover:text-blue-400 transition-colors">
              Instant Leasing
            </span>
          </div>
          <div className="flex items-center gap-3 bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm p-4 rounded-xl border border-blue-700/20 hover:border-blue-500/40 transition-all duration-300 group">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Coins className="h-5 w-5" />
            </div>
            <span className="group-hover:text-blue-400 transition-colors">
              Reduced rent
            </span>
          </div>
          <div className="flex items-center gap-3 bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm p-4 rounded-xl border border-blue-700/20 hover:border-blue-500/40 transition-all duration-300 group">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Gift className="h-5 w-5" />
            </div>
            <span className="group-hover:text-blue-400 transition-colors">
              $50 back when you sign
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10 mb-8 md:mx-20 md:mt-8">
          {!isAuthenticated ? (
            <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-0 shadow-xl overflow-hidden group hover:shadow-blue-500/20 transition-all duration-300">
              <CardContent className="p-6 relative">
                <div className="absolute -right-12 -top-12 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl group-hover:bg-blue-400/30 transition-all duration-500"></div>
                <h2 className="text-2xl font-bold mb-4 text-blue-200">
                  Pad People
                </h2>
                <p className="text-blue-100 mb-6 max-w-md">
                  Join our community of Pad People and enjoy exclusive benefits,
                  reduced rent, and a seamless renting experience.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => setShowLogin(!showLogin)}
                    className="bg-white text-blue-700 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-white/20"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => setShowSignup(!showSignup)}
                    variant="outline"
                    className="border-2 border-white text-black hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
                  >
                    Sign-up
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-0 shadow-xl overflow-hidden group hover:shadow-blue-500/20 transition-all duration-300">
              <CardContent className="p-6 relative">
                <div className="absolute -right-12 -top-12 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl group-hover:bg-blue-400/30 transition-all duration-500"></div>
                <h2 className="text-2xl font-bold mb-4 text-blue-200">
                  Welcome Back, {user?.name}!
                </h2>
                <p className="text-blue-100 mb-6 max-w-md">
                  Continue exploring AI-matched properties and find your perfect
                  pad today.
                </p>
                <Button
                  asChild
                  className="bg-white text-blue-700 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-white/20"
                >
                  <Link to="/properties" className="flex items-center gap-2">
                    Browse Properties
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-0 shadow-xl overflow-hidden group hover:shadow-gray-500/20 transition-all duration-300">
            <CardContent className="p-6 relative">
              <div className="absolute -right-12 -top-12 w-24 h-24 bg-gray-600/20 rounded-full blur-2xl group-hover:bg-gray-600/30 transition-all duration-500"></div>
              <h2 className="text-2xl font-bold mb-4 text-blue-400">Guests</h2>
              <p className="text-gray-300 mb-6 max-w-md">
                Not ready to commit? Explore our properties and experience the
                Pick a Pad difference without signing up.
              </p>
              <Button
                asChild
                className="bg-white text-gray-800 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 hover:shadow-lg group"
              >
                <Link to="/properties" className="flex items-center gap-2">
                  Give It a Try!
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <AuthModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        isSignUp={false}
      />
      <AuthModal
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        isSignUp={true}
      />
    </section>
  );
};

export default Subscribe;
