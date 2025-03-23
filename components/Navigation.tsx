'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data', error);
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    // Remove user from localStorage
    localStorage.removeItem('currentUser');
    setUser(null);
    router.push('/');
  };

  return (
    <nav className="bg-primary text-white py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Tennis Tournament App
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link href="/tournaments" className="hover:text-secondary transition-colors">
            Tournaments
          </Link>
          <Link href="/players" className="hover:text-secondary transition-colors">
            Players
          </Link>
          <Link href="/about" className="hover:text-secondary transition-colors">
            About
          </Link>

          {isLoading ? (
            // Show placeholder while loading
            <div className="h-8 w-20 animate-pulse bg-white/20 rounded"></div>
          ) : user ? (
            // User is logged in
            <div className="flex items-center space-x-4">
              <span className="text-sm">
                Hi, {user.name.split(' ')[0]}
              </span>
              <button 
                onClick={handleLogout}
                className="hover:text-secondary transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            // User is not logged in
            <>
              <Link href="/login" className="hover:text-secondary transition-colors">
                Login
              </Link>
              <Link href="/signup" className="bg-white text-primary px-4 py-1 rounded hover:bg-secondary hover:text-text transition-colors">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
} 