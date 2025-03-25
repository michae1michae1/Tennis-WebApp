'use client';

import { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

type ToastType = 'success' | 'error';

interface ToastProps {
  type: ToastType;
  message: string;
  isVisible: boolean;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

export default function Toast({
  type,
  message,
  isVisible,
  onClose,
  autoClose = true,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isVisible && autoClose) {
      timer = setTimeout(() => {
        onClose();
      }, duration);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, autoClose, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div 
        className={`flex items-center px-4 py-3 rounded-lg shadow-lg text-white ${
          type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`}
      >
        <div className="mr-3">
          {type === 'success' ? (
            <CheckCircle size={20} />
          ) : (
            <XCircle size={20} />
          )}
        </div>
        <p className="font-medium">{message}</p>
        <button 
          onClick={onClose}
          className="ml-4 text-white hover:text-white/80 focus:outline-none"
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
} 