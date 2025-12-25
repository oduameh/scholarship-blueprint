/**
 * AdSense Configuration Service
 * Centralized configuration for Google AdSense integration
 * 
 * IMPORTANT: Replace the placeholder slot IDs with your actual AdSense slot IDs
 * To get slot IDs:
 * 1. Go to AdSense Dashboard (https://www.google.com/adsense)
 * 2. Click "Ads" in the sidebar
 * 3. Click "By ad unit"
 * 4. Create new ad units for each placement type
 * 5. Copy the data-ad-slot value from the generated code
 */

// Your AdSense Publisher ID
export const ADSENSE_PUBLISHER_ID = 'ca-pub-9012240625310684';

// Ad Unit Slot IDs - REPLACE THESE WITH YOUR ACTUAL SLOT IDs
export const AD_SLOTS = {
  // Horizontal banner at top of page (728x90 or responsive)
  leaderboard: 'REPLACE_WITH_LEADERBOARD_SLOT_ID',
  
  // Vertical ad in sidebar (300x600 or responsive)
  sidebar: 'REPLACE_WITH_SIDEBAR_SLOT_ID',
  
  // In-article ad between content sections (responsive)
  content: 'REPLACE_WITH_CONTENT_SLOT_ID',
  
  // Multiplex/Matched content ad (native recommendations)
  multiplex: 'REPLACE_WITH_MULTIPLEX_SLOT_ID',
  
  // In-feed ad (blends with article listings)
  infeed: 'REPLACE_WITH_INFEED_SLOT_ID',
  
  // Anchor/Sticky ad (bottom of screen - Auto ads handle this)
  anchor: 'REPLACE_WITH_ANCHOR_SLOT_ID',
};

// Ad placement rules for compliance
export const AD_PLACEMENT_RULES = {
  // Minimum content words before showing in-content ads
  minWordsBeforeAd: 300,
  
  // Maximum ads per page (AdSense allows up to 3 content ads + auto ads)
  maxAdsPerPage: 3,
  
  // Minimum spacing between ads (in pixels)
  minAdSpacing: 500,
  
  // Pages where ads should not appear
  noAdPages: ['/privacy', '/terms', '/admin'],
  
  // Delay before showing ads (allows content to load first)
  adLoadDelay: 1000,
};

// AdSense compliance checklist
export const ADSENSE_COMPLIANCE = {
  // Required policies
  policies: {
    privacyPolicy: true,     // ✓ Privacy.tsx exists
    termsOfService: true,    // ✓ Terms.tsx exists
    cookieConsent: true,     // ✓ CookieConsent.tsx exists
    adsLabel: true,          // ✓ "Advertisement" label on all ads
    adsTxt: true,            // ✓ ads.txt configured
    validContent: true,      // ✓ Original educational content
    noClickIncentive: true,  // ✓ No "click here" or reward for clicks
    noExcessiveAds: true,    // ✓ Content-to-ad ratio maintained
  },
  
  // Content requirements
  content: {
    minWordsPerPage: 500,    // Minimum content length
    originalContent: true,   // Not copied/scraped
    familyFriendly: true,    // No adult content
    noHateSpeech: true,      // No discriminatory content
    noViolence: true,        // No violent content
    noIllegalContent: true,  // Legal content only
  },
  
  // Technical requirements
  technical: {
    mobileResponsive: true,  // Works on mobile devices
    pageLoadSpeed: true,     // Fast loading pages
    noPopups: true,          // No popup/popunder ads
    noAutoPlay: true,        // No auto-playing media with sound
    httpsEnabled: true,      // HTTPS recommended
  }
};

/**
 * Check if ads should be shown on current page
 */
export const shouldShowAdsOnPage = (pathname: string): boolean => {
  // Don't show ads on excluded pages
  if (AD_PLACEMENT_RULES.noAdPages.some(page => pathname.includes(page))) {
    return false;
  }
  return true;
};

/**
 * Get appropriate ad format for placement type
 */
export const getAdFormat = (type: keyof typeof AD_SLOTS): string => {
  switch (type) {
    case 'leaderboard':
      return 'horizontal';
    case 'sidebar':
      return 'vertical';
    case 'content':
      return 'rectangle';
    case 'multiplex':
      return 'autorelaxed';
    case 'infeed':
      return 'fluid';
    default:
      return 'auto';
  }
};

/**
 * Initialize AdSense on page load
 * Call this once in your app initialization
 */
export const initializeAdSense = (): void => {
  if (typeof window === 'undefined') return;
  
  // Ensure adsbygoogle array exists
  (window as any).adsbygoogle = (window as any).adsbygoogle || [];
  
  console.log('[AdSense] Initialized with publisher ID:', ADSENSE_PUBLISHER_ID);
};

/**
 * Push ad to render
 * Call this after mounting ad component
 */
export const pushAd = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
  } catch (error) {
    console.error('[AdSense] Error pushing ad:', error);
  }
};

/**
 * AdSense Auto-ads configuration
 * Auto-ads are enabled via the script in index.html
 * These settings can be configured in AdSense dashboard:
 * - In-page ads (auto-placed)
 * - Anchor ads (sticky bottom)
 * - Vignette ads (between page loads)
 * - Side rail ads (on wide screens)
 */
export const AUTO_ADS_CONFIG = {
  enabled: true,
  inPageAds: true,
  anchorAds: true,
  vignetteAds: false,  // Can be intrusive, disabled by default
  sideRailAds: true,
};

// Export helper for checking if running in development
export const isDevMode = (): boolean => {
  return process.env.NODE_ENV === 'development';
};

