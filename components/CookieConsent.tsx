
import React, { useState, useEffect } from 'react';
import { Cookie, Shield, ExternalLink } from 'lucide-react';

// Cookie consent types for GDPR compliance
type ConsentLevel = 'all' | 'essential' | 'none' | null;

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Delay showing to improve UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (level: ConsentLevel) => {
    localStorage.setItem('cookie_consent', level || 'none');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    
    // If user declines advertising cookies, set a flag for ad components
    if (level === 'essential' || level === 'none') {
      localStorage.setItem('ads_personalization', 'false');
    } else {
      localStorage.setItem('ads_personalization', 'true');
    }
    
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-3 md:p-6">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-2xl rounded-2xl overflow-hidden">
        {/* Main Banner */}
        <div className="p-5 md:p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
              <Cookie className="text-indigo-600" size={20} />
            </div>
            <div className="flex-grow">
              <h4 className="font-bold text-gray-900 mb-2 text-lg">Cookie Preferences</h4>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                We use cookies and similar technologies to improve your browsing experience, personalize content, and display relevant advertisements through Google AdSense. 
                You can choose to accept all cookies or customize your preferences.
              </p>
              
              {/* Quick Links */}
              <div className="flex flex-wrap gap-4 text-xs mb-4">
                <a 
                  href="/#/privacy" 
                  className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                  Privacy Policy <ExternalLink size={10} />
                </a>
                <a 
                  href="https://policies.google.com/technologies/partner-sites" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                  How Google uses data <ExternalLink size={10} />
                </a>
                <button 
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-gray-500 hover:text-gray-700 underline"
                >
                  {showDetails ? 'Hide details' : 'Cookie details'}
                </button>
              </div>

              {/* Cookie Details (Expandable) */}
              {showDetails && (
                <div className="bg-gray-50 rounded-xl p-4 mb-4 text-sm space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 shrink-0"></div>
                    <div>
                      <p className="font-semibold text-gray-900">Essential Cookies</p>
                      <p className="text-gray-500 text-xs">Required for the website to function. Cannot be disabled.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0"></div>
                    <div>
                      <p className="font-semibold text-gray-900">Analytics Cookies</p>
                      <p className="text-gray-500 text-xs">Help us understand how visitors use our site to improve it.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 shrink-0"></div>
                    <div>
                      <p className="font-semibold text-gray-900">Advertising Cookies (Google AdSense)</p>
                      <p className="text-gray-500 text-xs">Used to display personalized ads based on your interests. You can opt out via <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">Google Ads Settings</a>.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button 
              onClick={() => handleConsent('essential')}
              className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all order-2 sm:order-1"
            >
              Essential Only
            </button>
            <button 
              onClick={() => handleConsent('all')}
              className="flex-grow px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 order-1 sm:order-2"
            >
              <Shield size={16} /> Accept All Cookies
            </button>
          </div>
        </div>

        {/* GDPR Notice */}
        <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
          <p className="text-[10px] text-gray-400 text-center">
            By clicking "Accept All", you agree to the storing of cookies on your device for advertising and analytics purposes. 
            You can withdraw consent at any time by clearing your browser cookies. 
            See our <a href="/#/privacy" className="underline">Privacy Policy</a> for GDPR rights.
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Hook to check if user has consented to advertising cookies
 */
export const useAdConsent = (): boolean => {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    const adsPersonalization = localStorage.getItem('ads_personalization');
    setHasConsent(consent === 'all' || adsPersonalization === 'true');
  }, []);

  return hasConsent;
};
