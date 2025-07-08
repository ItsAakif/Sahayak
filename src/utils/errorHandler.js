// Robust error handling utilities
export class AppError extends Error {
  constructor(message, code = 'UNKNOWN_ERROR', statusCode = 500) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export class APIError extends AppError {
  constructor(message, code = 'API_ERROR') {
    super(message, code, 500);
    this.name = 'APIError';
  }
}

export class ValidationError extends AppError {
  constructor(message, field = null) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
    this.field = field;
  }
}

export class NetworkError extends AppError {
  constructor(message = 'Network connection failed') {
    super(message, 'NETWORK_ERROR', 503);
    this.name = 'NetworkError';
  }
}

// Error handler for API calls
export const handleAPIError = (error) => {
  console.error('API Error:', error);
  
  if (error.message?.includes('API_KEY_INVALID')) {
    throw new APIError('Invalid API key. Please check your configuration.', 'INVALID_API_KEY');
  }
  
  if (error.message?.includes('QUOTA_EXCEEDED')) {
    throw new APIError('API quota exceeded. Please try again later.', 'QUOTA_EXCEEDED');
  }
  
  if (error.message?.includes('RATE_LIMIT')) {
    throw new APIError('Rate limit exceeded. Please wait before making another request.', 'RATE_LIMIT');
  }
  
  if (error.name === 'NetworkError' || error.code === 'NETWORK_ERROR') {
    throw new NetworkError('Unable to connect to AI service. Please check your internet connection.');
  }
  
  // Generic API error
  throw new APIError(error.message || 'An unexpected error occurred while processing your request.');
};

// Error handler for validation
export const validateInput = (value, rules = {}) => {
  const errors = [];
  
  if (rules.required && (!value || value.trim() === '')) {
    errors.push('This field is required');
  }
  
  if (rules.minLength && value && value.length < rules.minLength) {
    errors.push(`Minimum length is ${rules.minLength} characters`);
  }
  
  if (rules.maxLength && value && value.length > rules.maxLength) {
    errors.push(`Maximum length is ${rules.maxLength} characters`);
  }
  
  if (rules.pattern && value && !rules.pattern.test(value)) {
    errors.push(rules.patternMessage || 'Invalid format');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Safe async function wrapper
export const safeAsync = (asyncFn) => {
  return async (...args) => {
    try {
      return await asyncFn(...args);
    } catch (error) {
      console.error('Async operation failed:', error);
      throw handleAPIError(error);
    }
  };
};

// Retry mechanism for failed operations
export const retryOperation = async (operation, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      // Don't retry for certain error types
      if (error.code === 'INVALID_API_KEY' || error.code === 'VALIDATION_ERROR') {
        throw error;
      }
      
      if (attempt === maxRetries) {
        break;
      }
      
      console.warn(`Operation failed (attempt ${attempt}/${maxRetries}):`, error.message);
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
  
  throw lastError;
};

// Error logging utility
export const logError = (error, context = {}) => {
  const errorInfo = {
    timestamp: new Date().toISOString(),
    message: error.message,
    name: error.name,
    code: error.code,
    stack: error.stack,
    context
  };
  
  // In production, this would send to a logging service
  console.error('Error logged:', errorInfo);
  
  // Store in localStorage for debugging (development only)
  if (process.env.NODE_ENV === 'development') {
    try {
      const existingLogs = JSON.parse(localStorage.getItem('sahayak_error_logs') || '[]');
      existingLogs.push(errorInfo);
      
      // Keep only last 50 errors
      if (existingLogs.length > 50) {
        existingLogs.splice(0, existingLogs.length - 50);
      }
      
      localStorage.setItem('sahayak_error_logs', JSON.stringify(existingLogs));
    } catch (e) {
      console.warn('Failed to store error log:', e);
    }
  }
};

// User-friendly error messages
export const getUserFriendlyMessage = (error) => {
  const errorMessages = {
    'INVALID_API_KEY': 'Please check your API key configuration and try again.',
    'QUOTA_EXCEEDED': 'You have reached your API usage limit. Please try again later or upgrade your plan.',
    'RATE_LIMIT': 'Too many requests. Please wait a moment before trying again.',
    'NETWORK_ERROR': 'Unable to connect to the service. Please check your internet connection.',
    'VALIDATION_ERROR': 'Please check your input and try again.',
    'UNKNOWN_ERROR': 'Something went wrong. Please try again or contact support if the problem persists.'
  };
  
  return errorMessages[error.code] || errorMessages['UNKNOWN_ERROR'];
};

export default {
  AppError,
  APIError,
  ValidationError,
  NetworkError,
  handleAPIError,
  validateInput,
  safeAsync,
  retryOperation,
  logError,
  getUserFriendlyMessage
};