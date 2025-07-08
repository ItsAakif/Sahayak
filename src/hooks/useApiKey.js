import { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Secure API key management hook
export const useApiKey = () => {
  const [apiKey, setApiKey] = useState('');
  const [genAI, setGenAI] = useState(null);
  const [isConfigured, setIsConfigured] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gemini-1.5-flash');

  // Initialize API key from environment or localStorage
  useEffect(() => {
    const initializeApiKey = () => {
      // Check for environment variable first (more secure)
      const envApiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (envApiKey && envApiKey !== 'your_gemini_api_key_here' && envApiKey.trim() !== '') {
        console.log('Using environment API key');
        setApiKey(envApiKey);
        initializeAI(envApiKey);
        return;
      }

      // Fallback to localStorage (for development and user-provided keys)
      const savedKey = localStorage.getItem('sahayak_api_key');
      if (savedKey && savedKey.trim() !== '') {
        console.log('Using saved API key from localStorage');
        setApiKey(savedKey);
        initializeAI(savedKey);
      } else {
        console.log('No API key found, showing modal');
        setShowApiModal(true);
      }
    };

    initializeApiKey();
  }, []);

  // Initialize Google AI instance
  const initializeAI = (key) => {
    try {
      if (!key || key.trim() === '') {
        throw new Error('API key is required');
      }

      const ai = new GoogleGenerativeAI(key);
      setGenAI(ai);
      setIsConfigured(true);
      setShowApiModal(false);
    } catch (error) {
      console.error('Error initializing Gemini AI:', error);
      setIsConfigured(false);
      setGenAI(null);
      // Clear invalid key from localStorage
      localStorage.removeItem('sahayak_api_key');
    }
  };

  // Update API key
  const updateApiKey = (newKey) => {
    setApiKey(newKey);
    
    if (newKey && newKey.trim()) {
      // Only save to localStorage if not from environment
      if (!import.meta.env.VITE_GEMINI_API_KEY) {
        localStorage.setItem('sahayak_api_key', newKey);
      }
      initializeAI(newKey);
    } else {
      localStorage.removeItem('sahayak_api_key');
      setIsConfigured(false);
      setGenAI(null);
      setShowApiModal(true);
    }
  };

  // Clear API key (logout functionality)
  const clearApiKey = () => {
    setApiKey('');
    setGenAI(null);
    setIsConfigured(false);
    setShowApiModal(true);
    localStorage.removeItem('sahayak_api_key');
  };

  // Enhanced API key validation
  const validateApiKey = (key) => {
    if (!key || typeof key !== 'string') {
      return { isValid: false, error: 'API key is required' };
    }

    const trimmedKey = key.trim();
    
    if (trimmedKey.length < 20) {
      return { isValid: false, error: 'API key appears to be too short (minimum 20 characters)' };
    }

    if (trimmedKey.length > 100) {
      return { isValid: false, error: 'API key appears to be too long (maximum 100 characters)' };
    }

    if (!trimmedKey.startsWith('AIza')) {
      return { isValid: false, error: 'Invalid Google API key format. Must start with "AIza"' };
    }

    // Check for valid characters (alphanumeric, hyphens, underscores)
    if (!/^[A-Za-z0-9_-]+$/.test(trimmedKey)) {
      return { isValid: false, error: 'API key contains invalid characters' };
    }

    return { isValid: true, error: null };
  };

  return {
    apiKey,
    genAI,
    isConfigured,
    showApiModal,
    selectedModel,
    setShowApiModal,
    setSelectedModel,
    updateApiKey,
    clearApiKey,
    validateApiKey
  };
};

export default useApiKey;