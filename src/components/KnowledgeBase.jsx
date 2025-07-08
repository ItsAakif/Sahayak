import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Loader2, HelpCircle } from 'lucide-react';

const KnowledgeBase = ({ onGenerate, loading }) => {
  const [question, setQuestion] = useState('');
  const [context, setContext] = useState('general');
  const [answerStyle, setAnswerStyle] = useState('simple');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    onGenerate('knowledge', {
      question,
      context,
      answerStyle
    });
  };

  const commonQuestions = [
    "Why do plants need water?",
    "How do birds fly?",
    "What causes rain?",
    "Why is the sky blue?",
    "How do we get milk from cows?",
    "What are the seasons?",
    "Why do we need to eat vegetables?",
    "How does a seed grow into a plant?"
  ];

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
      background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      color: 'white',
      border: 'none',
      padding: '1.25rem 2rem',
      borderRadius: '16px',
      fontSize: '1.1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      boxSizing: 'border-box'
    },
    quickQuestion: {
      background: 'rgba(139, 92, 246, 0.1)',
      border: '1px solid rgba(139, 92, 246, 0.2)',
      borderRadius: '8px',
      padding: '0.5rem 0.75rem',
      fontSize: '0.875rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      color: '#7c3aed',
      fontWeight: '500'
    }
  };

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{
          padding: '12px',
          background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
          borderRadius: '16px',
          boxShadow: '0 8px 20px rgba(139, 92, 246, 0.3)'
        }}>
          <Brain style={{ width: '24px', height: '24px', color: 'white' }} />
        </div>
        <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#1e293b' }}>
          Student Question Answering
        </h3>
      </div>
      
      <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
        Get simple answers to student questions with local examples
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#1e293b' }}>
            Student Question
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., Why do plants need water? How do birds fly?"
            style={styles.textarea}
            required
          />
        </div>

        {/* Quick Question Suggestions */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#1e293b' }}>
            <HelpCircle style={{ width: '16px', height: '16px', display: 'inline', marginRight: '0.5rem' }} />
            Quick Questions
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {commonQuestions.map((q, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setQuestion(q)}
                style={styles.quickQuestion}
                onMouseOver={(e) => e.target.style.background = 'rgba(139, 92, 246, 0.2)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(139, 92, 246, 0.1)'}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.formGrid}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#1e293b' }}>
              Context/Subject
            </label>
            <select value={context} onChange={(e) => setContext(e.target.value)} style={styles.input}>
              <option value="general">General Knowledge</option>
              <option value="science">Science</option>
              <option value="nature">Nature & Environment</option>
              <option value="social">Social Studies</option>
              <option value="health">Health & Hygiene</option>
              <option value="agriculture">Agriculture & Farming</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#1e293b' }}>
              Answer Style
            </label>
            <select value={answerStyle} onChange={(e) => setAnswerStyle(e.target.value)} style={styles.input}>
              <option value="simple">Simple & Easy</option>
              <option value="detailed">Detailed Explanation</option>
              <option value="story">Story Format</option>
              <option value="examples">With Local Examples</option>
            </select>
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={loading || !question.trim()}
          style={{
            ...styles.button,
            opacity: loading || !question.trim() ? 0.6 : 1
          }}
          whileHover={{ scale: loading || !question.trim() ? 1 : 1.02 }}
          whileTap={{ scale: loading || !question.trim() ? 1 : 0.98 }}
        >
          {loading ? (
            <>
              <Loader2 style={{ width: '20px', height: '20px' }} className="animate-spin" />
              Finding answer...
            </>
          ) : (
            <>
              <Brain style={{ width: '20px', height: '20px' }} />
              Get Answer
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default KnowledgeBase;