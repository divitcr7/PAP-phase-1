import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Nav } from "./Nav";
import { MobileNav } from "./MobileNav";
import { Menu } from "lucide-react";
import AuthModal from "@/components/modals/AuthModal";

interface HeaderProps {
  parentClass?: string;
}

const Header: React.FC<HeaderProps> = ({
  parentClass = "main-header header-fixed fixed-header",
}) => {
  const [isFixed, setIsFixed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"; // Disable background scroll
    } else {
      document.body.style.overflow = ""; // Enable scrolling when menu closes
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      id="header"
      className={`${parentClass} ${
        isFixed ? "z-50 fixed top-0 left-0 w-full bg-white shadow-md" : ""
      } px-4`}
    >
      <div className="bg-white text-black py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center">
              <img
                alt="logo"
                width={166}
                height={48}
                src="/images/logo/logo@2x.png"
                className="transition-transform duration-300 ease-in-out transform hover:scale-105"
              />
            </Link>
            <div className="hidden lg:block">
              <Nav />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full"
              onClick={() => setShowLogin(!showLogin)}
            >
              Sign In
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {/* Scrollable Mobile Menu */}
        <div
          className={`bg-white h-full w-72 p-6 transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } overflow-y-auto max-h-screen`} // Enables scrolling
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="flex items-center">
              <img
                alt="logo"
                width={120}
                height={35}
                src="/images/logo/logo@2x.png"
              />
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ✕
            </Button>
          </div>
          <MobileNav />
        </div>
      </div>

      <AuthModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        isSignUp={false}
      />
    </header>
  );
};

export default Header;
