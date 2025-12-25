/**
 * Traffic Guard Service
 * Protects AdSense revenue by detecting and filtering bot traffic,
 * especially from Facebook ad campaigns.
 */

// Suspicious behavior patterns
interface TrafficMetrics {
  sessionStart: number;
  pageViews: number;
  scrollDepth: number;
  mouseMovements: number;
  clicks: number;
  timeOnPage: number;
  referrer: string;
  isVerifiedHuman: boolean;
  suspicionScore: number;
}

// Known bot user agent patterns
const BOT_USER_AGENTS = [
  'bot', 'crawler', 'spider', 'scraper', 'curl', 'wget', 'python',
  'headless', 'phantom', 'selenium', 'puppeteer', 'playwright',
  'facebookexternalhit', 'facebot', 'ia_archiver', 'mediapartners'
];

// Facebook referrer patterns (for special handling)
const FACEBOOK_REFERRERS = [
  'facebook.com', 'fb.com', 'fbcdn.net', 'l.facebook.com',
  'lm.facebook.com', 'm.facebook.com', 'web.facebook.com'
];

// Storage keys
const STORAGE_KEY = 'tg_metrics';
const VERIFIED_KEY = 'tg_verified';
const SESSION_KEY = 'tg_session';

class TrafficGuard {
  private metrics: TrafficMetrics;
  private adBlockDetected: boolean = false;
  private honeypotTriggered: boolean = false;

  constructor() {
    this.metrics = this.loadMetrics();
    this.initializeTracking();
  }

  private loadMetrics(): TrafficMetrics {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('[TrafficGuard] Failed to load metrics');
    }

    return {
      sessionStart: Date.now(),
      pageViews: 0,
      scrollDepth: 0,
      mouseMovements: 0,
      clicks: 0,
      timeOnPage: 0,
      referrer: document.referrer || 'direct',
      isVerifiedHuman: localStorage.getItem(VERIFIED_KEY) === 'true',
      suspicionScore: 0
    };
  }

  private saveMetrics(): void {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.metrics));
    } catch (e) {
      // Ignore storage errors
    }
  }

  private initializeTracking(): void {
    if (typeof window === 'undefined') return;

    // Track page views
    this.metrics.pageViews++;

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        this.metrics.scrollDepth = maxScroll;
        this.saveMetrics();
      }
    }, { passive: true });

    // Track mouse movements (sample rate limited)
    let mouseCount = 0;
    window.addEventListener('mousemove', () => {
      mouseCount++;
      if (mouseCount % 10 === 0) {
        this.metrics.mouseMovements++;
        this.saveMetrics();
      }
    }, { passive: true });

    // Track clicks
    window.addEventListener('click', () => {
      this.metrics.clicks++;
      this.saveMetrics();
    }, { passive: true });

    // Track time on page
    setInterval(() => {
      this.metrics.timeOnPage = Math.floor((Date.now() - this.metrics.sessionStart) / 1000);
      this.saveMetrics();
    }, 5000);

    // Initial analysis
    this.analyzeTraffic();
  }

  /**
   * Check if user agent appears to be a bot
   */
  public isBotUserAgent(): boolean {
    const ua = navigator.userAgent.toLowerCase();
    return BOT_USER_AGENTS.some(pattern => ua.includes(pattern));
  }

  /**
   * Check if traffic came from Facebook
   */
  public isFromFacebook(): boolean {
    const referrer = this.metrics.referrer.toLowerCase();
    return FACEBOOK_REFERRERS.some(fb => referrer.includes(fb));
  }

  /**
   * Analyze traffic patterns and calculate suspicion score
   */
  public analyzeTraffic(): number {
    let score = 0;

    // Bot user agent = high suspicion
    if (this.isBotUserAgent()) {
      score += 50;
    }

    // No mouse movement after 10 seconds = suspicious
    if (this.metrics.timeOnPage > 10 && this.metrics.mouseMovements < 3) {
      score += 20;
    }

    // Instant page load to click (< 2 seconds) = suspicious
    if (this.metrics.timeOnPage < 2 && this.metrics.clicks > 0) {
      score += 30;
    }

    // No scroll engagement after 30 seconds = suspicious
    if (this.metrics.timeOnPage > 30 && this.metrics.scrollDepth < 10) {
      score += 15;
    }

    // Too many page views too fast = suspicious
    if (this.metrics.pageViews > 10 && this.metrics.timeOnPage < 60) {
      score += 25;
    }

    // Honeypot triggered = definite bot
    if (this.honeypotTriggered) {
      score += 100;
    }

    // Check for headless browser indicators
    if (this.detectHeadlessBrowser()) {
      score += 40;
    }

    // Check for automation tools
    if (this.detectAutomation()) {
      score += 60;
    }

    this.metrics.suspicionScore = Math.min(100, score);
    this.saveMetrics();

    return this.metrics.suspicionScore;
  }

  /**
   * Detect headless browser characteristics
   */
  private detectHeadlessBrowser(): boolean {
    // Check for missing plugins (headless browsers often have none)
    if (navigator.plugins.length === 0) {
      return true;
    }

    // Check for webdriver flag
    if ((navigator as any).webdriver === true) {
      return true;
    }

    // Check for missing languages
    if (!navigator.languages || navigator.languages.length === 0) {
      return true;
    }

    return false;
  }

  /**
   * Detect automation tools
   */
  private detectAutomation(): boolean {
    const windowKeys = Object.keys(window);
    
    // Common automation tool indicators
    const automationIndicators = [
      '__webdriver_evaluate',
      '__selenium_evaluate', 
      '__webdriver_script_function',
      '__webdriver_script_func',
      '__webdriver_script_fn',
      '__fxdriver_evaluate',
      '__driver_unwrapped',
      '__webdriver_unwrapped',
      '__driver_evaluate',
      '__selenium_unwrapped',
      '__fxdriver_unwrapped',
      '_Selenium_IDE_Recorder',
      '_selenium',
      'calledSelenium',
      '$cdc_',
      '$chrome_asyncScriptInfo',
      '__nightmare',
      '__phantomas',
      'Buffer',
      'emit',
      'spawn',
      'webdriver',
      'domAutomation',
      'domAutomationController'
    ];

    return automationIndicators.some(indicator => 
      windowKeys.includes(indicator) || (window as any)[indicator] !== undefined
    );
  }

  /**
   * Trigger honeypot (called when hidden elements are interacted with)
   */
  public triggerHoneypot(): void {
    this.honeypotTriggered = true;
    this.metrics.suspicionScore = 100;
    this.saveMetrics();
    console.warn('[TrafficGuard] Honeypot triggered - bot detected');
  }

  /**
   * Mark user as verified human (after passing challenge)
   */
  public verifyHuman(): void {
    this.metrics.isVerifiedHuman = true;
    localStorage.setItem(VERIFIED_KEY, 'true');
    this.saveMetrics();
  }

  /**
   * Check if user is verified human
   */
  public isVerifiedHuman(): boolean {
    return this.metrics.isVerifiedHuman;
  }

  /**
   * Should we show ads to this user?
   * Returns false if high suspicion of bot traffic
   */
  public shouldShowAds(): boolean {
    this.analyzeTraffic();

    // Never show ads to detected bots
    if (this.metrics.suspicionScore >= 50) {
      return false;
    }

    // Require verification for Facebook traffic
    if (this.isFromFacebook() && !this.metrics.isVerifiedHuman) {
      // Allow if user has engaged naturally for > 15 seconds
      if (this.metrics.timeOnPage > 15 && this.metrics.scrollDepth > 20 && this.metrics.mouseMovements > 5) {
        return true;
      }
      return false;
    }

    return true;
  }

  /**
   * Should we require human verification?
   */
  public requiresVerification(): boolean {
    // Already verified
    if (this.metrics.isVerifiedHuman) {
      return false;
    }

    // Facebook traffic should be verified
    if (this.isFromFacebook()) {
      return true;
    }

    // High suspicion traffic
    if (this.metrics.suspicionScore >= 30) {
      return true;
    }

    return false;
  }

  /**
   * Get current metrics for analytics
   */
  public getMetrics(): TrafficMetrics {
    return { ...this.metrics };
  }

  /**
   * Log suspicious activity for review
   */
  public logSuspiciousActivity(reason: string): void {
    const log = {
      timestamp: new Date().toISOString(),
      reason,
      metrics: this.metrics,
      userAgent: navigator.userAgent,
      referrer: document.referrer
    };
    
    // Store in localStorage for admin review
    try {
      const existingLogs = JSON.parse(localStorage.getItem('tg_suspicious_logs') || '[]');
      existingLogs.push(log);
      // Keep last 50 logs
      if (existingLogs.length > 50) {
        existingLogs.shift();
      }
      localStorage.setItem('tg_suspicious_logs', JSON.stringify(existingLogs));
    } catch (e) {
      // Ignore storage errors
    }

    console.warn('[TrafficGuard] Suspicious activity:', reason, log);
  }
}

// Singleton instance
let trafficGuardInstance: TrafficGuard | null = null;

export const getTrafficGuard = (): TrafficGuard => {
  if (!trafficGuardInstance && typeof window !== 'undefined') {
    trafficGuardInstance = new TrafficGuard();
  }
  return trafficGuardInstance as TrafficGuard;
};

export type { TrafficMetrics };

