'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { registerForTournament, isUserRegistered, cancelRegistration } from '../utils/registrationUtils';
import Toast from './Toast';

interface RegistrationButtonProps {
  tournamentId: string;
}

export default function RegistrationButton({ tournamentId }: RegistrationButtonProps) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [popupAnimation, setPopupAnimation] = useState('');
  
  // Toast notification state
  const [toast, setToast] = useState<{
    type: 'success' | 'error';
    message: string;
    visible: boolean;
  }>({
    type: 'success',
    message: '',
    visible: false,
  });
  
  // Using state to track registration status that can be updated
  const [isRegistered, setIsRegistered] = useState(false);
  
  // Ref for the popup content
  const popupRef = useRef<HTMLDivElement>(null);
  
  // Check if user is already registered for this tournament when component loads or user changes
  useEffect(() => {
    if (user) {
      const registrationStatus = isUserRegistered(tournamentId, user.id);
      setIsRegistered(registrationStatus);
    } else {
      setIsRegistered(false);
    }
  }, [tournamentId, user]);

  // Handle clicking outside the popup
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        closePopup();
      }
    }

    // Add event listener when popup is shown
    if (showAuthPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAuthPopup]);

  // Set animation when popup visibility changes
  useEffect(() => {
    if (showAuthPopup) {
      setPopupAnimation('animate-scale-in');
    }
  }, [showAuthPopup]);

  const handleRegistration = () => {
    // If not authenticated, show popup
    if (!isAuthenticated) {
      setShowAuthPopup(true);
      return;
    }
    
    // If already registered, handle cancellation
    if (isRegistered) {
      handleCancellation();
      return;
    }
    
    // Register for tournament
    setIsRegistering(true);
    
    try {
      const result = registerForTournament(tournamentId, user!);
      
      if (result) {
        setIsRegistered(true);
        showToast('success', 'Successfully registered for tournament');
        // Force refresh after a short delay
        setTimeout(() => {
          router.refresh();
        }, 1000);
      } else {
        showToast('error', 'Failed to register for tournament. You may already be registered.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      showToast('error', 'An error occurred during registration. Please try again.');
    } finally {
      setIsRegistering(false);
    }
  };
  
  const handleCancellation = () => {
    if (!user) return;
    
    setIsRegistering(true);
    
    try {
      const result = cancelRegistration(tournamentId, user.id);
      
      if (result) {
        setIsRegistered(false);
        showToast('success', 'Successfully cancelled registration');
        // Force refresh after a short delay
        setTimeout(() => {
          router.refresh();
        }, 1000);
      } else {
        showToast('error', 'Failed to cancel registration.');
      }
    } catch (err) {
      console.error('Cancellation error:', err);
      showToast('error', 'An error occurred while cancelling. Please try again.');
    } finally {
      setIsRegistering(false);
    }
  };

  const handleLogin = () => {
    localStorage.setItem('redirectAfterLogin', window.location.pathname);
    router.push('/login');
  };

  const handleSignup = () => {
    localStorage.setItem('redirectAfterLogin', window.location.pathname);
    router.push('/signup');
  };

  const closePopup = () => {
    setPopupAnimation('animate-scale-out');
    
    // Wait for animation to finish before hiding popup
    setTimeout(() => {
      setShowAuthPopup(false);
      setPopupAnimation('');
    }, 200);
  };

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({
      type,
      message,
      visible: true,
    });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  return (
    <div>
      <button
        onClick={handleRegistration}
        disabled={isRegistering}
        className={`w-full text-center flex justify-center items-center ${
          isRegistered
            ? 'btn btn-secondary' // Yellow/secondary button for cancellation
            : 'btn btn-primary' // Green/primary button for registration
        }`}
      >
        {isRegistering
          ? 'Processing...'
          : isRegistered
          ? 'Cancel Registration'
          : 'Register for Tournament'}
      </button>

      {/* Toast notification */}
      <Toast
        type={toast.type}
        message={toast.message}
        isVisible={toast.visible}
        onClose={hideToast}
      />

      {/* Auth popup */}
      {showAuthPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div 
            ref={popupRef} 
            className={`bg-white rounded-lg p-6 max-w-md w-full mx-4 ${popupAnimation} transform transition-all duration-200 shadow-xl`}
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-primary">Sign in Required</h3>
              <p className="text-gray-600 mt-2">
                You need to be signed in to register for this tournament.
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={handleLogin}
                className="btn btn-primary w-full"
              >
                Sign In
              </button>
              
              <button
                onClick={handleSignup}
                className="btn btn-outline w-full"
              >
                Create Account
              </button>
              
              <button
                onClick={closePopup}
                className="btn btn-ghost w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 