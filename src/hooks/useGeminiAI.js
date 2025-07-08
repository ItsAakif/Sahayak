import { useState, useCallback } from 'react';

// Rate limiting and API call management
export const useGeminiAI = (genAI, selectedModel) => {
  const [loading, setLoading] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const [error, setError] = useState(null);

  // Rate limiting configuration
  const RATE_LIMIT_DELAY = 1000; // 1 second between requests
  const MAX_RETRIES = 2;

  const callGeminiOptimized = useCallback(async (prompt, imageData = null, maxRetries = MAX_RETRIES) => {
    if (!genAI) {
      throw new Error('Gemini AI not initialized. Please configure your API key.');
    }

    setLoading(true);
    setError(null);

    try {
      // Rate limiting
      const now = Date.now();
      const timeSinceLastRequest = now - lastRequestTime;
      
      if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
        const delay = RATE_LIMIT_DELAY - timeSinceLastRequest;
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      // Choose model based on whether we have image data
      const modelName = imageData ? 'gemini-1.5-flash' : selectedModel;
      const model = genAI.getGenerativeModel({ model: modelName });
      
      let result;
      if (imageData) {
        // For image analysis, send both prompt and image
        result = await model.generateContent([prompt, imageData]);
      } else {
        // For text-only, send just the prompt
        result = await model.generateContent(prompt);
      }
      
      const response = await result.response;
      const text = response.text();

      // Update tracking
      setRequestCount(prev => prev + 1);
      setLastRequestTime(Date.now());
      setLoading(false);

      return text;
    } catch (error) {
      console.error('Gemini API Error:', error);
      
      // Handle specific error types
      if (error.message?.includes('API_KEY_INVALID')) {
        setError('Invalid API key. Please check your configuration.');
        setLoading(false);
        throw new Error('Invalid API key. Please reconfigure your Gemini API key.');
      }
      
      if (error.message?.includes('QUOTA_EXCEEDED')) {
        setError('API quota exceeded. Please try again later.');
        setLoading(false);
        throw new Error('API quota exceeded. Please try again later or check your billing.');
      }

      // Retry logic for transient errors
      if (maxRetries > 0 && !error.message?.includes('API_KEY_INVALID')) {
        console.log(`Retrying request... (${MAX_RETRIES - maxRetries + 1}/${MAX_RETRIES})`);
        await new Promise(resolve => setTimeout(resolve, 2000 * (MAX_RETRIES - maxRetries + 1)));
        return callGeminiOptimized(prompt, imageData, maxRetries - 1);
      }

      setError(error.message || 'An unexpected error occurred');
      setLoading(false);
      throw error;
    }
  }, [genAI, selectedModel, lastRequestTime]);

  // Clear error state
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Get usage statistics
  const getUsageStats = useCallback(() => {
    return {
      requestCount,
      lastRequestTime: lastRequestTime ? new Date(lastRequestTime) : null,
      isRateLimited: Date.now() - lastRequestTime < RATE_LIMIT_DELAY
    };
  }, [requestCount, lastRequestTime]);

  return {
    callGeminiOptimized,
    loading,
    error,
    clearError,
    getUsageStats
  };
};

export default useGeminiAI;