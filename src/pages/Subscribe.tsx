import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Home, Key, Coins, Gift } from "lucide-react";
import BGSliderImage from "/images/slider/slider-1.jpg";
import LoginModal from "@/components/modals/LoginModal";
import { useState } from "react";

const Subscribe = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  return (
    <section
      className="relative text-white min-h-screen h-screen flex flex-col justify-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${BGSliderImage})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-black/40 z-0"></div>
      <div className="absolute left-0 top-1/4 h-32 w-2 bg-blue-600"></div>

      <div className="absolute top-10 left-5">
        <img
          alt="logo"
          width={200}
          src="/images/logo/logo-transparent@2x.png"
          className="transition-transform duration-300 ease-in-out transform hover:scale-105"
        />
      </div>

      <div className="absolute top-8 right-4 text-white">
        <img
          alt="logo"
          width={200}
          src="images/slider/graplic-slider-2.png"
          className="transition-transform duration-300 ease-in-out transform hover:scale-105"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-8 flex flex-col h-full justify-center">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-white md:mt-6">
            Welcome Home
          </h1>
          <div className="text-4xl md:text-6xl md:mt-10 max-w-4xl mx-auto font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 mb-6 md:mb-10">
            Find Your Perfect Pad Today!
          </div>
          <div className="max-w-2xl mx-auto text-lg">
            <p className="mb-6 text-gray-200">
              Pick a Pad is the modern way to rent an apartment and save money.
              Join thousands of satisfied renters who found their dream home
              with us.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:mx-4 lg:mx-20 lg:grid-cols-4 gap-4 lg:gap-8 mb-8">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
            <div className="bg-blue-600 p-2 rounded-full">
              <Home className="h-5 w-5" />
            </div>
            <span>Self touring</span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
            <div className="bg-blue-600 p-2 rounded-full">
              <Key className="h-5 w-5" />
            </div>
            <span>Instant Leasing</span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
            <div className="bg-blue-600 p-2 rounded-full">
              <Coins className="h-5 w-5" />
            </div>
            <span>Reduced rent</span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
            <div className="bg-blue-600 p-2 rounded-full">
              <Gift className="h-5 w-5" />
            </div>
            <span>$ back when you sign</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10 mb-8 md:mx-20 md:mt-8">
          <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-0 shadow-xl overflow-hidden group hover:shadow-blue-500/20 transition-all duration-300">
            <CardContent className="p-6 relative">
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
                  asChild
                  variant="secondary"
                  className="bg-white text-blue-700 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
                >
                  <a className="hover:text-lg transition-all duration-200">
                    Login
                  </a>
                </Button>
                <Button
                  onClick={() => setShowSignup(!showSignup)}
                  asChild
                  variant="outline"
                  className="border-white text-black hover:bg-white/20 transform hover:scale-105 transition-all duration-200"
                >
                  <a className="hover:text-lg transition-all duration-200">
                    Sign-up
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-0 shadow-xl overflow-hidden group hover:shadow-gray-500/20 transition-all duration-300">
            <CardContent className="p-6 relative">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">Guests</h2>
              <p className="text-gray-300 mb-6 max-w-md">
                Not ready to commit? Explore our properties and experience the
                Pick a Pad difference without signing up.
              </p>
              <Button
                asChild
                variant="secondary"
                className="bg-white text-gray-800 hover:bg-gray-100 group-hover:translate-x-1 transition-transform relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gray-800 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
              >
                <Link to="/try" className="flex items-center">
                  Give It a Try! <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        isSignUp={false}
      />
      <LoginModal
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        isSignUp={true}
      />
    </section>
  );
};

export default Subscribe;
