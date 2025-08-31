import React, { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';

interface AgeVerificationModalProps {
  isOpen: boolean;
}

export const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({ isOpen }) => {
  const { setAgeVerified } = useGameStore();

  // Handle ESC key to close modal (dismiss with No)
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleAgeVerification(false);
      }
    };

    // Handle Enter key to select Yes
    const handleEnter = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleAgeVerification(true);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleEnter);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleEnter);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAgeVerification = (verified: boolean) => {
    setAgeVerified(verified);
  };

  return (
    <div 
      className="fixed inset-0 z-50"
      style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #000000 100%)',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem'
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-verification-title"
      aria-describedby="age-verification-description"
    >
      {/* Blurred romantic background overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C084FC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          filter: 'blur(1px)',
          width: '100%',
          height: '100%'
        }}
      />

      {/* Modal Content - Perfectly Centered */}
      <div 
        className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl animate-scale-in"
        style={{
          borderRadius: '16px',
          padding: '3.5rem 3rem',
          maxWidth: '32rem',
          width: '100%',
          maxHeight: '90vh',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          position: 'relative',
          zIndex: 10,
          margin: 'auto',
          display: 'block'
        }}
      >
        {/* Title */}
        <h1 
          id="age-verification-title"
          className="text-center font-bold mb-10"
          style={{
            fontSize: '28px',
            color: '#C084FC',
            letterSpacing: '0.025em',
            fontWeight: '700'
          }}
        >
          For Couples 18+
        </h1>

        {/* Body Content */}
        <div className="space-y-8 mb-12">
          <p 
            id="age-verification-description"
            className="text-center"
            style={{
              fontSize: '16px',
              lineHeight: '1.5',
              color: '#E5E7EB'
            }}
          >
            Get ready for a playful, intimate journey designed just for couples. This experience may include mature themes and is meant for adults 18+ in committed relationships.
          </p>

          <p 
            className="text-center font-medium"
            style={{
              fontSize: '16px',
              color: '#E5E7EB'
            }}
          >
            Please confirm you are 18 or older to continue.
          </p>
        </div>

        {/* Buttons */}
        {!useGameStore.getState().ageVerified && (
          <div className="space-y-5">
            {/* Yes Button */}
            <button
              onClick={() => handleAgeVerification(true)}
              className="w-full text-white font-semibold py-5 px-8 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
              style={{
                background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
                borderRadius: '9999px',
                fontSize: '18px',
                fontWeight: '600',
                boxShadow: '0 4px 14px 0 rgba(168, 85, 247, 0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 25px 0 rgba(168, 85, 247, 0.6)';
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 14px 0 rgba(168, 85, 247, 0.4)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
              aria-label="Confirm you are 18 or older"
            >
              ✨ I'm 18+, Let's Go ✨
            </button>

            {/* No Button - More Visible */}
            <button
              onClick={() => handleAgeVerification(false)}
              className="w-full text-white font-semibold py-5 px-8 border-2 border-red-400 transition-all duration-300 hover:scale-105 hover:bg-red-500/30 hover:border-red-300 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-500/50"
              style={{
                borderRadius: '9999px',
                fontSize: '18px',
                fontWeight: '600',
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#FFFFFF',
                borderColor: '#F87171'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.25)';
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
              aria-label="Indicate you are under 18"
            >
              ❌ I'm Under 18
            </button>
          </div>
        )}

        {/* Access Denied State */}
        {useGameStore.getState().ageVerified === false && (
          <div 
            className="text-center p-6 bg-red-900/20 border border-red-500/30 animate-scale-in"
            style={{ borderRadius: '16px' }}
          >
            <div className="text-4xl mb-4">🚫</div>
            <h3 className="text-xl font-bold text-red-400 mb-3">Access Restricted</h3>
            <p className="text-gray-300 mb-4" style={{ lineHeight: '1.5' }}>
              This intimate experience is exclusively for adults 18 and older.
            </p>
            <p className="text-gray-400 text-sm">
              Please return when you meet the age requirement for this mature content.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-gray-500" style={{ lineHeight: '1.4' }}>
            By continuing, you confirm that you are of legal age and consent to mature content designed for couples in committed relationships.
          </p>
        </div>
      </div>
    </div>
  );
}; 