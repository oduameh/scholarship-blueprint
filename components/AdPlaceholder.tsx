
import React, { useState, useEffect, useRef } from 'react';
import { getTrafficGuard } from '../services/trafficGuard';

/**
 * AdSense Configuration
 * ======================
 * Publisher ID: ca-pub-9012240625310684
 * 
 * IMPORTANT: You must create ad units in your AdSense dashboard and 
 * replace the slot IDs below with your actual ad slot IDs.
 * 
 * To create ad units:
 * 1. Go to https://www.google.com/adsense
 * 2. Navigate to Ads > By ad unit > Display ads
 * 3. Create units for each placement type
 * 4. Copy the data-ad-slot value and paste below
 */

const ADSENSE_CLIENT = 'ca-pub-9012240625310684';

// ⚠️ REPLACE THESE WITH YOUR ACTUAL AD SLOT IDs FROM ADSENSE DASHBOARD
const AD_SLOTS: Record<string, string> = {
  leaderboard: '',  // Create a "Display ads" unit, choose "Horizontal"
  sidebar: '',      // Create a "Display ads" unit, choose "Vertical" 
  content: '',      // Create a "In-article" or "Display ads" unit
  multiplex: '',    // Create a "Multiplex ads" unit (if available)
  infeed: ''        // Create a "In-feed ads" unit
};

// Check if slot IDs are configured
const isSlotConfigured = (type: string): boolean => {
  return AD_SLOTS[type] !== undefined && AD_SLOTS[type] !== '' && AD_SLOTS[type].length > 5;
};

interface AdPlaceholderProps {
  type: 'sidebar' | 'leaderboard' | 'content';
  className?: string;
}

// Declare adsbygoogle for TypeScript
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ type, className = '' }) => {
  const [shouldShow, setShouldShow] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [adError, setAdError] = useState(false);
  const adRef = useRef<HTMLModElement>(null);
  const isAdPushed = useRef(false);

  // Check if this ad type has a configured slot ID
  const hasValidSlot = isSlotConfigured(type);

  useEffect(() => {
    // Delay ad check to allow traffic analysis
    const timer = setTimeout(() => {
      const guard = getTrafficGuard();
      
      // Check cookie consent for ads
      const adsConsent = localStorage.getItem('ads_personalization');
      const cookieConsent = localStorage.getItem('cookie_consent');
      
      if (guard) {
        const canShow = guard.shouldShowAds();
        setShouldShow(canShow);
        
        if (!canShow) {
          guard.logSuspiciousActivity(`Ad blocked for ${type} placement - suspicion score: ${guard.getMetrics().suspicionScore}`);
        }
      } else {
        // Show ads if consent given or not yet decided (implied consent in some jurisdictions)
        setShouldShow(cookieConsent !== 'essential' && cookieConsent !== 'none');
      }
      setIsChecking(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [type]);

  // Initialize AdSense when ad should show
  useEffect(() => {
    if (!shouldShow || isChecking || isAdPushed.current || !hasValidSlot) return;

    try {
      if (typeof window !== 'undefined' && adRef.current) {
        // Ensure adsbygoogle array exists
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        isAdPushed.current = true;
      }
    } catch (error) {
      console.error('[AdSense] Error initializing ad:', error);
      setAdError(true);
    }
  }, [shouldShow, isChecking, hasValidSlot]);

  // Get container styles based on ad type
  const getContainerStyles = () => {
    switch (type) {
      case 'leaderboard': 
        return 'min-h-[90px] md:min-h-[100px] w-full';
      case 'sidebar': 
        return 'min-h-[250px] w-full';
      case 'content': 
        return 'min-h-[250px] w-full';
      default: 
        return 'min-h-[100px] w-full';
    }
  };

  // Don't render anything for bots (prevents ad impressions)
  if (!isChecking && !shouldShow) {
    return null;
  }

  // Show loading state while checking
  if (isChecking) {
    return (
      <div className={`bg-gray-50/30 rounded-xl ${getContainerStyles()} ${className}`} 
           aria-hidden="true" 
      />
    );
  }

  // If slot is not configured, show placeholder (for development)
  if (!hasValidSlot) {
    return (
      <div className={`ad-container ${className}`}>
        <div className="text-center mb-1">
          <span className="text-[9px] uppercase tracking-[0.2em] text-gray-300 font-medium">
            Advertisement
          </span>
        </div>
        <div className={`bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center ${getContainerStyles()}`}>
          <div className="text-center p-4">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Ad Placeholder</p>
            <p className="text-[9px] text-gray-300">Configure slot ID in AdPlaceholder.tsx</p>
          </div>
        </div>
      </div>
    );
  }

  // Show fallback if ad error
  if (adError) {
    return (
      <div className={`bg-gray-50 rounded-xl ${getContainerStyles()} ${className}`} 
           aria-hidden="true" 
      />
    );
  }

  return (
    <div className={`ad-container ${className}`}>
      {/* AdSense Compliance: Clear "Advertisement" label */}
      <div className="text-center mb-1">
        <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-medium">
          Advertisement
        </span>
      </div>
      
      {/* AdSense Ad Unit */}
      <div className={`bg-gray-50/30 rounded-xl overflow-hidden ${getContainerStyles()}`}>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ 
            display: 'block',
            width: '100%',
            minHeight: type === 'leaderboard' ? '90px' : '250px',
            backgroundColor: 'transparent'
          }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={AD_SLOTS[type]}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};

/**
 * Multiplex Ad Component - For "Recommended Content" style native ads
 * Note: Multiplex ads require approval from Google
 */
export const MultiplexAd: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [shouldShow, setShouldShow] = useState(false);
  const adRef = useRef<HTMLModElement>(null);
  const isAdPushed = useRef(false);

  const hasValidSlot = isSlotConfigured('multiplex');

  useEffect(() => {
    const timer = setTimeout(() => {
      const guard = getTrafficGuard();
      const cookieConsent = localStorage.getItem('cookie_consent');
      setShouldShow(
        (!guard || guard.shouldShowAds()) && 
        cookieConsent !== 'essential' && 
        cookieConsent !== 'none'
      );
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!shouldShow || isAdPushed.current || !hasValidSlot) return;
    try {
      if (typeof window !== 'undefined' && adRef.current) {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        isAdPushed.current = true;
      }
    } catch (error) {
      console.error('[AdSense] Multiplex error:', error);
    }
  }, [shouldShow, hasValidSlot]);

  if (!shouldShow || !hasValidSlot) return null;

  return (
    <div className={`multiplex-ad-container ${className}`}>
      <div className="text-center mb-2">
        <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-medium">
          Recommended For You
        </span>
      </div>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={AD_SLOTS.multiplex}
        data-ad-format="autorelaxed"
      />
    </div>
  );
};

/**
 * In-Feed Ad Component - For ads within article lists
 * Blends naturally with content feeds
 */
export const InFeedAd: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [shouldShow, setShouldShow] = useState(false);
  const adRef = useRef<HTMLModElement>(null);
  const isAdPushed = useRef(false);

  const hasValidSlot = isSlotConfigured('infeed');

  useEffect(() => {
    const timer = setTimeout(() => {
      const guard = getTrafficGuard();
      const cookieConsent = localStorage.getItem('cookie_consent');
      setShouldShow(
        (!guard || guard.shouldShowAds()) && 
        cookieConsent !== 'essential' && 
        cookieConsent !== 'none'
      );
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!shouldShow || isAdPushed.current || !hasValidSlot) return;
    try {
      if (typeof window !== 'undefined' && adRef.current) {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        isAdPushed.current = true;
      }
    } catch (error) {
      console.error('[AdSense] In-feed error:', error);
    }
  }, [shouldShow, hasValidSlot]);

  if (!shouldShow || !hasValidSlot) return null;

  return (
    <div className={`in-feed-ad ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={AD_SLOTS.infeed}
        data-ad-format="fluid"
      />
    </div>
  );
};

/**
 * Export slot configuration for admin panel
 */
export const getAdSlotStatus = () => {
  return {
    leaderboard: isSlotConfigured('leaderboard'),
    sidebar: isSlotConfigured('sidebar'),
    content: isSlotConfigured('content'),
    multiplex: isSlotConfigured('multiplex'),
    infeed: isSlotConfigured('infeed'),
    publisherId: ADSENSE_CLIENT
  };
};
