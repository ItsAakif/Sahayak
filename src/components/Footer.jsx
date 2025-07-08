import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Users, Heart, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer 
      style={{ 
        textAlign: 'center', 
        padding: '3rem 1rem 2rem',
        background: 'rgba(30, 41, 59, 0.3)',
        backdropFilter: 'blur(20px)',
        width: '100%',
        borderTop: '1px solid rgba(148, 163, 184, 0.1)',
        marginTop: 'auto'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      {/* Main Footer Content */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: '3rem', 
        flexWrap: 'wrap', 
        color: 'rgba(248, 250, 252, 0.8)',
        fontSize: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            padding: '8px',
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            borderRadius: '8px'
          }}>
            <Zap style={{ width: '16px', height: '16px', color: 'white' }} />
          </div>
          <span>Powered by Google Gemini</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            padding: '8px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            borderRadius: '8px'
          }}>
            <Users style={{ width: '16px', height: '16px', color: 'white' }} />
          </div>
          <span>Built for Rural Education</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            padding: '8px',
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            borderRadius: '8px'
          }}>
            <Heart style={{ width: '16px', height: '16px', color: 'white' }} />
          </div>
          <span>Made with Love in India</span>
        </div>
      </div>

      {/* Links Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        flexWrap: 'wrap',
        marginBottom: '2rem'
      }}>
        <a
          href="https://github.com/sahayak-ai"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'rgba(248, 250, 252, 0.6)',
            textDecoration: 'none',
            fontSize: '0.875rem',
            transition: 'color 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.color = 'rgba(248, 250, 252, 0.9)'}
          onMouseOut={(e) => e.target.style.color = 'rgba(248, 250, 252, 0.6)'}
        >
          <Github size={16} />
          GitHub
        </a>

        <a
          href="mailto:support@sahayak.ai"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'rgba(248, 250, 252, 0.6)',
            textDecoration: 'none',
            fontSize: '0.875rem',
            transition: 'color 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.color = 'rgba(248, 250, 252, 0.9)'}
          onMouseOut={(e) => e.target.style.color = 'rgba(248, 250, 252, 0.6)'}
        >
          <Mail size={16} />
          Support
        </a>
      </div>

      {/* Mission Statement */}
      <div style={{
        maxWidth: '600px',
        margin: '0 auto 2rem',
        padding: '1.5rem',
        background: 'rgba(59, 130, 246, 0.1)',
        border: '1px solid rgba(59, 130, 246, 0.2)',
        borderRadius: '16px',
        color: 'rgba(248, 250, 252, 0.8)',
        fontSize: '0.95rem',
        lineHeight: '1.6'
      }}>
        <p style={{ margin: 0, fontStyle: 'italic' }}>
          "Empowering rural teachers with AI to create engaging, culturally relevant educational content 
          that bridges the digital divide and enhances learning outcomes for every child."
        </p>
      </div>

      {/* Copyright */}
      <div style={{
        borderTop: '1px solid rgba(148, 163, 184, 0.1)',
        paddingTop: '1.5rem',
        color: 'rgba(248, 250, 252, 0.5)',
        fontSize: '0.875rem'
      }}>
        <p style={{ margin: 0 }}>
          © 2024 Sahayak AI. All rights reserved. | 
          <span style={{ margin: '0 0.5rem' }}>•</span>
          Version 1.0.0 | 
          <span style={{ margin: '0 0.5rem' }}>•</span>
          <a 
            href="/privacy" 
            style={{ color: 'inherit', textDecoration: 'none' }}
            onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
            onMouseOut={(e) => e.target.style.textDecoration = 'none'}
          >
            Privacy Policy
          </a>
        </p>
      </div>

      {/* Feature Status Indicators */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
        marginTop: '1rem',
        fontSize: '0.75rem',
        color: 'rgba(248, 250, 252, 0.4)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></div>
          Content Generation
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></div>
          Worksheet Creation
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></div>
          Q&A Assistant
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b' }}></div>
          Audio Features (Coming Soon)
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;