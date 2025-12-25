import React, { useState, useEffect, useCallback } from 'react';
import { Shield, CheckCircle, MousePointer, ArrowDown } from 'lucide-react';
import { getTrafficGuard } from '../services/trafficGuard';

interface TrafficGateProps {
  children: React.ReactNode;
  onVerified?: () => void;
}

/**
 * Traffic Gate Component
 * Shows a simple human verification challenge for Facebook traffic
 * to protect AdSense from bot clicks.
 */
export const TrafficGate: React.FC<TrafficGateProps> = ({ children, onVerified }) => {
  const [isVerified, setIsVerified] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showChallenge, setShowChallenge] = useState(false);
  const [challengeStep, setChallengeStep] = useState(0);
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const guard = getTrafficGuard();
    
    if (!guard) {
      setIsLoading(false);
      return;
    }

    // Check if verification is needed
    const needsVerification = guard.requiresVerification();
    
    if (needsVerification && !guard.isVerifiedHuman()) {
      setIsVerified(false);
      setShowChallenge(true);
      // Randomize target position
      setTargetPosition({
        x: 20 + Math.random() * 60,
        y: 30 + Math.random() * 40
      });
    }

    setIsLoading(false);
  }, []);

  const handleChallengeClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    // Check if click is near target (within 15% radius)
    const distance = Math.sqrt(
      Math.pow(clickX - targetPosition.x, 2) + 
      Math.pow(clickY - targetPosition.y, 2)
    );

    if (distance < 15) {
      setChallengeStep(1);
      
      // Add a small delay then verify
      setTimeout(() => {
        const guard = getTrafficGuard();
        if (guard) {
          guard.verifyHuman();
        }
        setIsVerified(true);
        setShowChallenge(false);
        onVerified?.();
      }, 800);
    }
  }, [targetPosition, onVerified]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse text-slate-400">Loading...</div>
      </div>
    );
  }

  // Verification challenge
  if (!isVerified && showChallenge) {
    return (
      <div className="fixed inset-0 bg-white z-[200] flex items-center justify-center">
        <div className="max-w-md w-full mx-4 text-center">
          {/* Logo */}
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-200">
            <Shield className="text-white" size={32} />
          </div>

          {challengeStep === 0 ? (
            <>
              <h1 className="text-2xl font-black text-slate-900 mb-3">
                Quick Security Check
              </h1>
              <p className="text-slate-500 mb-8 text-sm leading-relaxed">
                To protect our content and ensure the best experience, 
                please click on the target below.
              </p>

              {/* Challenge Area */}
              <div 
                className="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl h-48 cursor-crosshair border-2 border-dashed border-slate-200 mb-6 overflow-hidden"
                onClick={handleChallengeClick}
              >
                {/* Target */}
                <div 
                  className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 transition-all"
                  style={{ left: `${targetPosition.x}%`, top: `${targetPosition.y}%` }}
                >
                  <div className="w-full h-full bg-indigo-600 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-indigo-200">
                    <MousePointer className="text-white" size={20} />
                  </div>
                  <div className="absolute inset-0 bg-indigo-400 rounded-full animate-ping opacity-30"></div>
                </div>

                {/* Instructions */}
                <div className="absolute bottom-3 left-0 right-0 text-center">
                  <span className="text-xs text-slate-400 font-medium flex items-center justify-center gap-1">
                    <ArrowDown size={12} /> Click the target above
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400">
                This helps us maintain quality content and prevent abuse.
              </p>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <CheckCircle className="text-white" size={40} />
              </div>
              <h1 className="text-2xl font-black text-slate-900 mb-3">
                Verified!
              </h1>
              <p className="text-slate-500 text-sm">
                Thank you. Loading your content...
              </p>
            </>
          )}
        </div>

        {/* Honeypot - invisible element that only bots would interact with */}
        <div 
          style={{ 
            position: 'absolute', 
            left: '-9999px', 
            top: '-9999px',
            opacity: 0,
            pointerEvents: 'auto'
          }}
          onClick={() => {
            const guard = getTrafficGuard();
            if (guard) {
              guard.triggerHoneypot();
              guard.logSuspiciousActivity('Honeypot triggered in verification gate');
            }
          }}
          aria-hidden="true"
        >
          <button>Click here to verify</button>
          <a href="#">Skip verification</a>
        </div>
      </div>
    );
  }

  // Verified - show content
  return <>{children}</>;
};

export default TrafficGate;

