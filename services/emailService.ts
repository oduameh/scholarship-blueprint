/**
 * Email Collection Service
 * Stores newsletter subscribers and contact form submissions in localStorage
 * 
 * For production, you should integrate with:
 * - Email services: Mailchimp, ConvertKit, SendGrid
 * - Form backends: Formspree, Netlify Forms, or your own API
 */

// Types
export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  source: 'homepage' | 'footer' | 'popup';
  status: 'active' | 'unsubscribed';
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  inquiryType: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'read' | 'replied';
}

// Storage keys
const SUBSCRIBERS_KEY = 'sb_newsletter_subscribers';
const CONTACTS_KEY = 'sb_contact_submissions';

/**
 * Newsletter Subscribers
 */
export const subscribeToNewsletter = (email: string, source: NewsletterSubscriber['source'] = 'homepage'): { success: boolean; message: string } => {
  try {
    const subscribers = getNewsletterSubscribers();
    
    // Check if already subscribed
    const existing = subscribers.find(s => s.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      if (existing.status === 'unsubscribed') {
        // Resubscribe
        existing.status = 'active';
        existing.subscribedAt = new Date().toISOString();
        localStorage.setItem(SUBSCRIBERS_KEY, JSON.stringify(subscribers));
        return { success: true, message: 'Welcome back! You have been re-subscribed.' };
      }
      return { success: false, message: 'This email is already subscribed.' };
    }

    // Add new subscriber
    const newSubscriber: NewsletterSubscriber = {
      id: Date.now().toString(),
      email: email.toLowerCase().trim(),
      subscribedAt: new Date().toISOString(),
      source,
      status: 'active'
    };

    subscribers.push(newSubscriber);
    localStorage.setItem(SUBSCRIBERS_KEY, JSON.stringify(subscribers));

    return { success: true, message: 'Successfully subscribed! Check your inbox for updates.' };
  } catch (error) {
    console.error('[EmailService] Subscribe error:', error);
    return { success: false, message: 'An error occurred. Please try again.' };
  }
};

export const getNewsletterSubscribers = (): NewsletterSubscriber[] => {
  try {
    const stored = localStorage.getItem(SUBSCRIBERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const getActiveSubscribers = (): NewsletterSubscriber[] => {
  return getNewsletterSubscribers().filter(s => s.status === 'active');
};

export const unsubscribeEmail = (email: string): boolean => {
  try {
    const subscribers = getNewsletterSubscribers();
    const subscriber = subscribers.find(s => s.email.toLowerCase() === email.toLowerCase());
    if (subscriber) {
      subscriber.status = 'unsubscribed';
      localStorage.setItem(SUBSCRIBERS_KEY, JSON.stringify(subscribers));
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

export const deleteSubscriber = (id: string): boolean => {
  try {
    const subscribers = getNewsletterSubscribers();
    const filtered = subscribers.filter(s => s.id !== id);
    localStorage.setItem(SUBSCRIBERS_KEY, JSON.stringify(filtered));
    return true;
  } catch {
    return false;
  }
};

export const exportSubscribersCSV = (): string => {
  const subscribers = getActiveSubscribers();
  const headers = 'Email,Subscribed At,Source\n';
  const rows = subscribers.map(s => `${s.email},${s.subscribedAt},${s.source}`).join('\n');
  return headers + rows;
};

/**
 * Contact Form Submissions
 */
export const submitContactForm = (
  name: string,
  email: string,
  inquiryType: string,
  message: string
): { success: boolean; message: string } => {
  try {
    const submissions = getContactSubmissions();

    const newSubmission: ContactSubmission = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      inquiryType,
      message: message.trim(),
      submittedAt: new Date().toISOString(),
      status: 'new'
    };

    submissions.unshift(newSubmission); // Add to beginning
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(submissions));

    return { success: true, message: 'Your message has been received. We will respond within 48 hours.' };
  } catch (error) {
    console.error('[EmailService] Contact submit error:', error);
    return { success: false, message: 'An error occurred. Please try again.' };
  }
};

export const getContactSubmissions = (): ContactSubmission[] => {
  try {
    const stored = localStorage.getItem(CONTACTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const markContactAsRead = (id: string): boolean => {
  try {
    const submissions = getContactSubmissions();
    const submission = submissions.find(s => s.id === id);
    if (submission) {
      submission.status = 'read';
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(submissions));
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

export const markContactAsReplied = (id: string): boolean => {
  try {
    const submissions = getContactSubmissions();
    const submission = submissions.find(s => s.id === id);
    if (submission) {
      submission.status = 'replied';
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(submissions));
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

export const deleteContactSubmission = (id: string): boolean => {
  try {
    const submissions = getContactSubmissions();
    const filtered = submissions.filter(s => s.id !== id);
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(filtered));
    return true;
  } catch {
    return false;
  }
};

export const getUnreadContactCount = (): number => {
  return getContactSubmissions().filter(s => s.status === 'new').length;
};

/**
 * Stats for Admin Dashboard
 */
export const getEmailStats = () => {
  const subscribers = getNewsletterSubscribers();
  const contacts = getContactSubmissions();

  return {
    totalSubscribers: subscribers.length,
    activeSubscribers: subscribers.filter(s => s.status === 'active').length,
    totalContacts: contacts.length,
    unreadContacts: contacts.filter(s => s.status === 'new').length,
    subscribersThisWeek: subscribers.filter(s => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(s.subscribedAt) > weekAgo;
    }).length
  };
};

