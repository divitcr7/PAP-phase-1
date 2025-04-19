import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Nav } from "./Nav";
import { MobileNav } from "./MobileNav";
import { Menu, User, Settings, LogOut } from "lucide-react";
import AuthModal from "@/components/modals/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import Headroom from "react-headroom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  parentClass?: string;
}

const Header: React.FC<HeaderProps> = ({
  parentClass = "main-header header-fixed fixed-header",
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { user, isAuthenticated, handleLogout } = useAuth();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  const headerContent = (
    <div className="bg-white text-black py-4 w-full">
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
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full p-0 focus:ring-0 focus:ring-offset-0 hover:bg-transparent"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={user?.avatar || ""}
                      alt={user?.name || ""}
                    />
                    <AvatarFallback className="bg-blue-500 hover:bg-blue-700 text-white">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="outline"
              size="lg"
              className="rounded-full"
              onClick={() => setShowLogin(!showLogin)}
            >
              Sign In
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="size-7 mr-3" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Headroom
        style={{
          zIndex: 50,
          transition: "all .5s ease-in-out",
        }}
        pinStart={60}
      >
        <header id="header" className={`${parentClass} w-full shadow-md`}>
          {headerContent}
        </header>
      </Headroom>

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
          } overflow-y-auto max-h-screen`}
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
    </>
  );
};

export default Header;
