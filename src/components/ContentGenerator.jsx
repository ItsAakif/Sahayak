import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';

const ContentGenerator = ({ onGenerate, loading }) => {
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('hindi');
  const [gradeLevel, setGradeLevel] = useState(4);
  const [topic, setTopic] = useState('general');
  const [contentSize, setContentSize] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    onGenerate('content', {
      prompt,
      language,
      gradeLevel,
      topic,
      contentSize
    });
  };

  const styles = {
    container: {
      background: 'linear-gradient(145deg, rgba(248, 250, 252, 0.98), rgba(241, 245, 249, 0.95))',
      borderRadius: '24px',
      padding: '2rem',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(148, 163, 184, 0.2)',
      color: '#1e293b'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    input: {
      width: '100%',
      padding: '1rem',
      border: '2px solid #e2e8f0',
      borderRadius: '16px',
      fontSize: '1rem',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      background: 'rgba(255, 255, 255, 0.9)',
      color: '#1e293b',
      fontFamily: 'inherit',
      boxSizing: 'border-box',
      fontWeight: '500'
    },
    textarea: {
      width: '100%',
      padding: '1rem',
      border: '2px solid #e2e8f0',
      borderRadius: '16px',
      fontSize: '1rem',
      background: 'rgba(255, 255, 255, 0.9)',
      color: '#1e293b',
      fontFamily: 'inherit',
      boxSizing: 'border-box',
      fontWeight: '500',
      resize: 'vertical',
      minHeight: '100px'
    },
    button: {
      width: '100%',
      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      color: 'white',
      border: 'none',
      padding: '1.25rem 2rem',
      borderRadius: '16px',
      fontSize: '1.1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      boxSizing: 'border-box'
    },
    sizeToggle: {
      display: 'flex',
      background: 'rgba(226, 232, 240, 0.3)',
      borderRadius: '12px',
      padding: '4px',
      gap: '2px',
      width: '100%'
    },
    sizeToggleBtn: {
      flex: 1,
      padding: '8px 12px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s',
      background: 'transparent',
      color: '#64748b'
    },
    sizeToggleBtnActive: {
      background: 'white',
      color: '#1e293b',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }
  };

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{
          padding: '12px',
          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          borderRadius: '16px',
          boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)'
        }}>
          <Sparkles style={{ width: '24px', height: '24px', color: 'white' }} />
        </div>
        <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#1e293b' }}>
          Educational Content Generator
        </h3>
      </div>
      
      <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
        Create engaging stories and educational content for rural students
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#1e293b' }}>
            What would you like to create?
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A story about a farmer who learns about sustainable farming practices..."
            style={styles.textarea}
            required
          />
        </div>

        <div style={styles.formGrid}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#1e293b' }}>
              Language
            </label>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)} 
              style={styles.input}
            >
              <option value="hindi">Hindi (हिंदी)</option>
              <option value="english">English</option>
              <option value="mixed">Mixed (Hindi + English)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#1e293b' }}>
              Content Size
            </label>
            <div style={styles.sizeToggle}>
              {['short', 'medium', 'long'].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setContentSize(size)}
                  style={{
                    ...styles.sizeToggleBtn,
                    ...(contentSize === size ? styles.sizeToggleBtnActive : {})
                  }}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#1e293b' }}>
              Topic Category
            </label>
            <select value={topic} onChange={(e) => setTopic(e.target.value)} style={styles.input}>
              <option value="general">General Story</option>
              <option value="environment">Environment & Nature</option>
              <option value="festivals">Festivals & Traditions</option>
              <option value="agriculture">Agriculture & Farming</option>
              <option value="values">Social Values & Ethics</option>
              <option value="science">Science & Discovery</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#1e293b' }}>
              Grade Level
            </label>
            <select value={gradeLevel} onChange={(e) => setGradeLevel(Number(e.target.value))} style={styles.input}>
              <option value={3}>Grade 3 (Age 8-9)</option>
              <option value={4}>Grade 4 (Age 9-10)</option>
              <option value={5}>Grade 5 (Age 10-11)</option>
            </select>
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={loading || !prompt.trim()}
          style={{
            ...styles.button,
            opacity: loading || !prompt.trim() ? 0.6 : 1
          }}
          whileHover={{ scale: loading || !prompt.trim() ? 1 : 1.02 }}
          whileTap={{ scale: loading || !prompt.trim() ? 1 : 0.98 }}
        >
          {loading ? (
            <>
              <Loader2 style={{ width: '20px', height: '20px' }} className="animate-spin" />
              Generating {contentSize} story...
            </>
          ) : (
            <>
              <Sparkles style={{ width: '20px', height: '20px' }} />
              Generate {contentSize.charAt(0).toUpperCase() + contentSize.slice(1)} Story
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default ContentGenerator;