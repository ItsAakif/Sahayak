import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ message = 'Loading...', size = 'medium' }) => {
  const sizeClasses = {
    small: { width: '20px', height: '20px' },
    medium: { width: '32px', height: '32px' },
    large: { width: '48px', height: '48px' }
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    color: '#64748b'
  };

  const spinnerStyles = {
    ...sizeClasses[size],
    marginBottom: '1rem'
  };

  return (
    <motion.div
      style={containerStyles}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        style={spinnerStyles}
      >
        <Loader2 style={{ width: '100%', height: '100%' }} />
      </motion.div>
      <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '500' }}>
        {message}
      </p>
    </motion.div>
  );
};

export default LoadingSpinner;