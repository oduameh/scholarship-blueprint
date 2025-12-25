
import { GoogleGenAI, Type } from "@google/genai";

// Error types for graceful handling
export interface GeminiError {
  type: 'API_KEY_MISSING' | 'RATE_LIMIT' | 'NETWORK_ERROR' | 'UNKNOWN';
  message: string;
}

// Check for API key presence
const apiKey = process.env.API_KEY || '';
const isApiKeyConfigured = apiKey.length > 0;

const ai = isApiKeyConfigured ? new GoogleGenAI({ apiKey }) : null;

// Helper to detect rate limit errors
const isRateLimitError = (error: unknown): boolean => {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return message.includes('rate limit') || 
           message.includes('quota') || 
           message.includes('429') ||
           message.includes('too many requests');
  }
  return false;
};

// Helper to detect network errors
const isNetworkError = (error: unknown): boolean => {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return message.includes('network') || 
           message.includes('fetch') || 
           message.includes('connection') ||
           message.includes('timeout');
  }
  return false;
};

export const generateBlogTopic = async (category: string): Promise<{ title: string; excerpt: string } | GeminiError | null> => {
  // Gracefully handle missing API key
  if (!isApiKeyConfigured || !ai) {
    console.warn('[Gemini Service] API key not configured. AI features disabled.');
    return {
      type: 'API_KEY_MISSING',
      message: 'AI generation requires an API key. Please configure your Gemini API key in environment variables.'
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a high-authority scholarship blueprint title and a competitive meta-description for the category: ${category}. 
      Use active voice. Target keywords: "Fully Funded", "Stipend", "2025/2026". 
      The title must sound like an editorial guide from a top-tier education journal.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            excerpt: { type: Type.STRING }
          },
          required: ["title", "excerpt"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("[Gemini Service] Error generating topic:", error);
    
    if (isRateLimitError(error)) {
      return {
        type: 'RATE_LIMIT',
        message: 'AI service rate limit reached. Please wait a few minutes before trying again.'
      };
    }
    
    if (isNetworkError(error)) {
      return {
        type: 'NETWORK_ERROR',
        message: 'Network error. Please check your internet connection and try again.'
      };
    }
    
    return {
      type: 'UNKNOWN',
      message: 'An unexpected error occurred. Please try again later.'
    };
  }
};

export const generateFullPost = async (title: string, category: string): Promise<string | GeminiError | null> => {
  // Gracefully handle missing API key
  if (!isApiKeyConfigured || !ai) {
    console.warn('[Gemini Service] API key not configured. AI features disabled.');
    return {
      type: 'API_KEY_MISSING',
      message: 'AI generation requires an API key. Please configure your Gemini API key in environment variables.'
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Act as a senior academic advisor. Write a 1,200-word Scholarship Blueprint for "${title}".
      
      Structure requirements (CRITICAL):
      1. Introduction: Hook the reader with the prestige and value of the award.
      2. Eligibility Criteria & Academic Thresholds: Be specific about GPAs and test scores.
      3. Full Financial Coverage: Use bullet points to list tuition, stipend, travel, and insurance.
      4. Essential Document Checklist: Provide a list of items required for a successful application.
      5. The Winning Application Timeline: Outline the months and phases of applying.
      6. Expert Success Strategy: Provide 3-4 insider tips (e.g., aligning with SDGs, networking with alumni).
      
      Formatting:
      - Use '### ' for major section headings.
      - Use bullet points ( - ) for lists.
      - Maintain a professional, authoritative, and encouraging tone.
      - Focus on SEO keywords related to ${category}.
      - Reference the 2025/2026 academic intake cycle throughout.`,
    });
    return response.text;
  } catch (error) {
    console.error("[Gemini Service] Error generating full post:", error);
    
    if (isRateLimitError(error)) {
      return {
        type: 'RATE_LIMIT',
        message: 'AI service rate limit reached. Please wait a few minutes before trying again.'
      };
    }
    
    if (isNetworkError(error)) {
      return {
        type: 'NETWORK_ERROR',
        message: 'Network error. Please check your internet connection and try again.'
      };
    }
    
    return {
      type: 'UNKNOWN',
      message: 'An unexpected error occurred. Please try again later.'
    };
  }
};

// Helper to check if result is an error
export const isGeminiError = (result: unknown): result is GeminiError => {
  return typeof result === 'object' && result !== null && 'type' in result && 'message' in result;
};
