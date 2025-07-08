import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Eye, EyeOff, Check, AlertCircle, ExternalLink } from 'lucide-react';

const ApiKeyModal = ({ 
  showModal, 
  onClose, 
  onSave, 
  currentApiKey, 
  selectedModel, 
  onModelChange,
  validateApiKey 
}) => {
  const [tempApiKey, setTempApiKey] = useState(currentApiKey || '');
  const [tempModel, setTempModel] = useState(selectedModel);
  const [showKey, setShowKey] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const handleSave = async () => {
    setValidationError('');
    setIsValidating(true);

    // Validate API key format
    const validation = validateApiKey(tempApiKey);
    if (!validation.isValid) {
      setValidationError(validation.error);
      setIsValidating(false);
      return;
    }

    try {
      await onSave(tempApiKey, tempModel);
      onClose();
    } catch (error) {
      setValidationError(error.message || 'Failed to configure API key');
    } finally {
      setIsValidating(false);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  if (!showModal) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(24px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 'clamp(0.5rem, 2vw, 1rem)'
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        style={{
          background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.95), rgba(51, 65, 85, 0.9))',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          borderRadius: 'clamp(16px, 4vw, 24px)',
          padding: 'clamp(1rem, 4vw, 2rem)',
          maxWidth: 'min(500px, 95vw)',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
          color: '#f8fafc'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{
            padding: '12px',
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            borderRadius: '16px',
            boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)'
          }}>
            <Settings style={{ width: '24px', height: '24px', color: 'white' }} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>
            Configure Sahayak AI
          </h2>
        </div>

        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: '1.6' }}>
          Configure your Google Gemini API key to access all AI-powered educational features.
        </p>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.75rem', 
            fontWeight: '600',
            color: '#f1f5f9'
          }}>
            Google Gemini API Key
          </label>
          
          <div style={{ position: 'relative' }}>
            <input
              type={showKey ? 'text' : 'password'}
              value={tempApiKey}
              onChange={(e) => {
                setTempApiKey(e.target.value);
                setValidationError('');
              }}
              placeholder="AIza..."
              style={{
                width: '100%',
                padding: '1rem 3rem 1rem 1rem',
                border: `2px solid ${validationError ? '#ef4444' : '#475569'}`,
                borderRadius: '12px',
                fontSize: '1rem',
                background: 'rgba(15, 23, 42, 0.8)',
                color: '#f8fafc',
                fontFamily: 'monospace',
                boxSizing: 'border-box'
              }}
            />
            
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '0.25rem'
              }}
            >
              {showKey ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {validationError && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '0.5rem',
              color: '#ef4444',
              fontSize: '0.875rem'
            }}>
              <AlertCircle size={16} />
              {validationError}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.75rem', 
            fontWeight: '600',
            color: '#f1f5f9'
          }}>
            AI Model
          </label>
          
          <select
            value={tempModel}
            onChange={(e) => setTempModel(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem',
              border: '2px solid #475569',
              borderRadius: '12px',
              fontSize: '1rem',
              background: 'rgba(15, 23, 42, 0.8)',
              color: '#f8fafc',
              boxSizing: 'border-box'
            }}
          >
            <optgroup label="Newest Models (2025)">
              <option value="gemini-2.5-flash">Gemini 2.5 Flash (FREE - Newest & Fastest)</option>
              <option value="gemini-2.5-pro">Gemini 2.5 Pro (PAID - Most Advanced)</option>
              <option value="gemini-2.0-flash-exp">Gemini 2.0 Flash Experimental (FREE - Latest)</option>
              <option value="gemini-2.0-flash-thinking-exp">Gemini 2.0 Flash Thinking (FREE - Reasoning)</option>
            </optgroup>
            <optgroup label="Experimental Models (2024-2025)">
              <option value="gemini-exp-1206">Gemini Experimental 1206 (FREE - Advanced)</option>
              <option value="gemini-exp-1121">Gemini Experimental 1121 (FREE - Enhanced)</option>
              <option value="gemini-exp-1114">Gemini Experimental 1114 (FREE - Multimodal)</option>
              <option value="gemini-thinking-exp-1219">Gemini Thinking Experimental (FREE - Deep Reasoning)</option>
            </optgroup>
            <optgroup label="Recommended Models">
              <option value="gemini-1.5-flash">Gemini 1.5 Flash (FREE - Fast & Efficient)</option>
              <option value="gemini-1.5-flash-8b">Gemini 1.5 Flash-8B (FREE - Cost-Effective)</option>
              <option value="gemini-1.5-pro">Gemini 1.5 Pro (PAID - Most Capable)</option>
            </optgroup>
            <optgroup label="Specialized Models">
              <option value="gemini-1.5-flash-002">Gemini 1.5 Flash-002 (FREE - Optimized)</option>
              <option value="gemini-1.5-pro-002">Gemini 1.5 Pro-002 (PAID - Enhanced)</option>
              <option value="gemini-1.5-pro-exp-0827">Gemini 1.5 Pro Experimental (FREE)</option>
              <option value="gemini-1.5-flash-001">Gemini 1.5 Flash-001 (FREE - Stable)</option>
              <option value="gemini-1.5-pro-001">Gemini 1.5 Pro-001 (PAID - Stable Pro)</option>
            </optgroup>
            <optgroup label="Mobile & Lightweight">
              <option value="gemini-1.5-flash-8b-001">Gemini 1.5 Flash-8B-001 (FREE - Mobile)</option>
              <option value="gemini-nano-001">Gemini Nano-001 (FREE - Ultra Light)</option>
              <option value="gemini-nano">Gemini Nano (FREE - Edge Computing)</option>
            </optgroup>
            <optgroup label="Legacy Models">
              <option value="gemini-1.0-pro">Gemini 1.0 Pro (FREE - Stable)</option>
              <option value="gemini-1.0-pro-001">Gemini 1.0 Pro-001 (FREE - Original)</option>
              <option value="gemini-1.0-pro-latest">Gemini 1.0 Pro Latest (FREE - Updated)</option>
              <option value="gemini-pro">Gemini Pro (FREE - Legacy)</option>
              <option value="gemini-pro-vision">Gemini Pro Vision (FREE - Legacy Vision)</option>
            </optgroup>
          </select>
        </div>

        <div style={{
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.2)',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1rem'
        }}>
          <p style={{ fontSize: '0.875rem', color: '#4ade80', margin: '0 0 0.5rem 0', fontWeight: '600' }}>
            <strong>20+ Free Models Available!</strong>
          </p>
          <p style={{ fontSize: '0.75rem', color: '#86efac', margin: 0, lineHeight: '1.4' }}>
            Including Gemini 2.5 Flash, 2.0 Flash, and all experimental models. Only Pro models require payment.
          </p>
        </div>

        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '2rem'
        }}>
          <p style={{ fontSize: '0.875rem', color: '#93c5fd', margin: 0 }}>
            <strong>Need an API key?</strong> Get one free from Google AI Studio.
          </p>
          <a
            href="https://makersuite.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#60a5fa',
              textDecoration: 'none',
              fontSize: '0.875rem',
              marginTop: '0.5rem'
            }}
          >
            Get API Key <ExternalLink size={14} />
          </a>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleSave}
            disabled={isValidating || !tempApiKey.trim()}
            style={{
              flex: 1,
              minWidth: '120px',
              background: tempApiKey.trim() 
                ? 'linear-gradient(135deg, #10b981, #059669)' 
                : 'rgba(107, 114, 128, 0.5)',
              color: 'white',
              border: 'none',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: tempApiKey.trim() ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
          >
            {isValidating ? (
              <>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Validating...
              </>
            ) : (
              <>
                <Check size={18} />
                Save & Continue
              </>
            )}
          </button>

          <button
            onClick={handleSkip}
            style={{
              flex: 1,
              minWidth: '120px',
              background: 'rgba(71, 85, 105, 0.8)',
              color: '#e2e8f0',
              border: '1px solid rgba(148, 163, 184, 0.3)',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Cancel
          </button>
        </div>

        <p style={{ 
          fontSize: '0.75rem', 
          color: '#64748b', 
          textAlign: 'center', 
          marginTop: '1rem',
          margin: '1rem 0 0 0'
        }}>
          Your API key is stored locally and never transmitted to our servers
        </p>
      </motion.div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
};

export default ApiKeyModal;