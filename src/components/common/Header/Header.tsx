import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Nav } from './Nav';
import { MobileNav } from './MobileNav';

interface HeaderProps {
  parentClass?: string;
}

const Header: React.FC<HeaderProps> = ({ parentClass = 'main-header header-fixed fixed-header' }) => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="header"
      className={`${parentClass} ${isFixed ? 'z-100 fixed top-0 left-0 w-full bg-white shadow-md' : ''} px-4`}
    >

      <div className="bg-white text-black py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                alt="logo"
                width={166}
                height={48}
                src="/images/logo/logo@2x.png"
                className="transition-transform duration-300 ease-in-out transform hover:scale-105"
              />
            </Link>
            <Nav />
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="lg" className='rounded-full' onClick={() => console.log('open login modal')}>
              Sign In
            </Button>
          </div>
        </div>
      </div>

      <div
        className="mobile-nav-toggler block lg:hidden"
        onClick={() => document.body.classList.add('mobile-menu-visible')}
      >
        <span className="block w-6 h-0.5 bg-white mb-2" />
        <span className="block w-6 h-0.5 bg-white mb-2" />
        <span className="block w-6 h-0.5 bg-white" />
      </div>

      <div
        className="mobile-menu fixed top-0 right-0 bottom-0 left-0 bg-gray-800 bg-opacity-50 hidden"
        onClick={() => document.body.classList.remove('mobile-menu-visible')}
      >
        <nav className="bg-white p-6 w-72">
          <MobileNav />
          <div className="mt-8">
            <Button variant="outline" size="sm" className="w-full mb-4">
              Login
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
