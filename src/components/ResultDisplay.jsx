import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Download, Eye, Copy, Share2, Check, X } from 'lucide-react';

const ResultDisplay = ({ result, onDownloadPDF, onClear }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Sahayak AI Generated Content',
          text: result
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback to copy
      handleCopy();
    }
  };

  if (!result) return null;

  const styles = {
    container: {
      marginTop: '2rem',
      background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.95), rgba(51, 65, 85, 0.9))',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(148, 163, 184, 0.2)',
      borderRadius: '24px',
      padding: '2rem',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
      color: '#f8fafc'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#f1f5f9',
      margin: 0
    },
    actions: {
      display: 'flex',
      gap: '0.75rem',
      flexWrap: 'wrap'
    },
    actionBtn: {
      background: 'rgba(59, 130, 246, 0.2)',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      borderRadius: '12px',
      padding: '0.75rem 1rem',
      color: '#93c5fd',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease'
    },
    content: {
      background: 'rgba(15, 23, 42, 0.6)',
      borderRadius: '16px',
      padding: '1.5rem',
      border: '1px solid rgba(148, 163, 184, 0.1)',
      maxHeight: '400px',
      overflowY: 'auto',
      fontSize: '0.95rem',
      lineHeight: '1.7'
    },
    previewContent: {
      background: 'rgba(248, 250, 252, 0.98)',
      borderRadius: '16px',
      padding: '1.5rem',
      border: '1px solid rgba(148, 163, 184, 0.2)',
      color: '#1e293b',
      maxHeight: '400px',
      overflowY: 'auto',
      fontSize: '0.95rem',
      lineHeight: '1.7'
    },
    closeBtn: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      background: 'rgba(239, 68, 68, 0.2)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      borderRadius: '8px',
      padding: '0.5rem',
      color: '#fca5a5',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.container}
      >
        <div style={styles.header}>
          <h3 style={styles.title}>Generated Content</h3>
          <div style={styles.actions}>
            <button
              onClick={() => setShowPreview(true)}
              style={styles.actionBtn}
              onMouseOver={(e) => e.target.style.background = 'rgba(59, 130, 246, 0.3)'}
              onMouseOut={(e) => e.target.style.background = 'rgba(59, 130, 246, 0.2)'}
            >
              <Eye size={16} />
              Preview
            </button>
            
            <button
              onClick={handleCopy}
              style={{
                ...styles.actionBtn,
                background: copied ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                borderColor: copied ? 'rgba(16, 185, 129, 0.3)' : 'rgba(59, 130, 246, 0.3)',
                color: copied ? '#6ee7b7' : '#93c5fd'
              }}
              onMouseOver={(e) => {
                if (!copied) {
                  e.target.style.background = 'rgba(59, 130, 246, 0.3)';
                }
              }}
              onMouseOut={(e) => {
                if (!copied) {
                  e.target.style.background = 'rgba(59, 130, 246, 0.2)';
                }
              }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>

            <button
              onClick={handleShare}
              style={styles.actionBtn}
              onMouseOver={(e) => e.target.style.background = 'rgba(59, 130, 246, 0.3)'}
              onMouseOut={(e) => e.target.style.background = 'rgba(59, 130, 246, 0.2)'}
            >
              <Share2 size={16} />
              Share
            </button>

            <button
              onClick={onDownloadPDF}
              style={{
                ...styles.actionBtn,
                background: 'rgba(16, 185, 129, 0.2)',
                borderColor: 'rgba(16, 185, 129, 0.3)',
                color: '#6ee7b7'
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(16, 185, 129, 0.3)'}
              onMouseOut={(e) => e.target.style.background = 'rgba(16, 185, 129, 0.2)'}
            >
              <Download size={16} />
              PDF
            </button>

            <button
              onClick={onClear}
              style={{
                ...styles.actionBtn,
                background: 'rgba(239, 68, 68, 0.2)',
                borderColor: 'rgba(239, 68, 68, 0.3)',
                color: '#fca5a5'
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.3)'}
              onMouseOut={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.2)'}
            >
              <X size={16} />
              Clear
            </button>
          </div>
        </div>

        <div style={styles.content}>
          <pre style={{ 
            whiteSpace: 'pre-wrap', 
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            margin: 0,
            wordWrap: 'break-word',
            overflowWrap: 'break-word'
          }}>
            {result}
          </pre>
        </div>
      </motion.div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
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
              padding: '2rem'
            }}
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                background: 'linear-gradient(145deg, rgba(248, 250, 252, 0.98), rgba(241, 245, 249, 0.95))',
                borderRadius: '24px',
                padding: '2rem',
                maxWidth: '800px',
                width: '100%',
                maxHeight: '80vh',
                overflowY: 'auto',
                position: 'relative',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPreview(false)}
                style={styles.closeBtn}
              >
                <X size={20} />
              </button>

              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                color: '#1e293b', 
                marginBottom: '1.5rem',
                marginTop: 0
              }}>
                Content Preview
              </h3>

              <div style={styles.previewContent}>
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({children}) => <h1 style={{color: '#1e293b', marginTop: '1.5rem', marginBottom: '1rem'}}>{children}</h1>,
                    h2: ({children}) => <h2 style={{color: '#374151', marginTop: '1.25rem', marginBottom: '0.75rem'}}>{children}</h2>,
                    h3: ({children}) => <h3 style={{color: '#4b5563', marginTop: '1rem', marginBottom: '0.5rem'}}>{children}</h3>,
                    p: ({children}) => <p style={{marginBottom: '1rem', lineHeight: '1.7'}}>{children}</p>,
                    ul: ({children}) => <ul style={{marginBottom: '1rem', paddingLeft: '1.5rem'}}>{children}</ul>,
                    ol: ({children}) => <ol style={{marginBottom: '1rem', paddingLeft: '1.5rem'}}>{children}</ol>,
                    li: ({children}) => <li style={{marginBottom: '0.25rem'}}>{children}</li>
                  }}
                >
                  {result}
                </ReactMarkdown>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ResultDisplay;