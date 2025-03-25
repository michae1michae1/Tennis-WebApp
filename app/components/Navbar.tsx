'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuth();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/tournaments', label: 'Tournaments' },
    { href: '/players', label: 'Players' },
    { href: '/about', label: 'About' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-primary text-white py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Tennis Tournament App
        </Link>
        
        <div className="hidden sm:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-secondary transition-colors ${
                pathname === link.href
                  ? 'font-semibold'
                  : ''
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="ml-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">
                  Hi, {user?.name.split(' ')[0]}
                </span>
                <button 
                  onClick={logout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 border border-white/20 hover:bg-white/20 transition-colors text-sm"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  href="/login" 
                  className="border border-white text-white px-4 py-1 rounded hover:bg-white/10 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-white text-primary px-4 py-1 rounded hover:bg-secondary hover:text-text transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-secondary hover:bg-primary-dark"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu, toggle classes based on menu state */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2 rounded-md text-base font-medium hover:text-secondary ${
                pathname === link.href
                  ? 'bg-primary-dark'
                  : 'hover:bg-primary-dark'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-primary-dark px-5">
          {isAuthenticated ? (
            <div className="flex flex-col space-y-3">
              <div className="text-base font-medium">Hi, {user?.name.split(' ')[0]}</div>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 border border-white/20 hover:bg-white/20 transition-colors text-sm w-full justify-center"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                href="/login"
                className="block border border-white text-white px-4 py-1.5 rounded hover:bg-white/10 transition-colors text-center"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block bg-white text-primary px-4 py-1.5 rounded hover:bg-secondary hover:text-text transition-colors text-center"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 