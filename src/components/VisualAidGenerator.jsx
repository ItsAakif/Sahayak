import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Loader2, Lightbulb } from 'lucide-react';

const VisualAidGenerator = ({ onGenerate, loading }) => {
  const [drawingTopic, setDrawingTopic] = useState('');
  const [subject, setSubject] = useState('');
  const [complexity, setComplexity] = useState('simple');
  const [boardType, setBoardType] = useState('blackboard');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!drawingTopic.trim()) return;
    
    onGenerate('visual', {
      drawingTopic,
      subject,
      complexity,
      boardType
    });
  };

  const quickTopics = [
    "Tree", "Human body", "Solar system", "Water cycle", 
    "Plant parts", "Animal life cycle", "House", "Family",
    "Geometric shapes", "Number line", "Clock", "Map of India"
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
    button: {
      width: '100%',
      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
      color: 'white',
      border: 'none',
      padding: '1.25rem 2rem',
      borderRadius: '16px',
      fontSize: '1.1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 10px 30px rgba(245, 158, 11, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      boxSizing: 'border-box'
    },
    quickTopic: {
      background: 'rgba(245, 158, 11, 0.1)',
      border: '1px solid rgba(245, 158, 11, 0.2)',
      borderRadius: '8px',
      padding: '0.5rem 0.75rem',
      fontSize: '0.875rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      color: '#d97706',
      fontWeight: '500'
    }
  };

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{
          padding: '12px',
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          borderRadius: '16px',
          boxShadow: '0 8px 20px rgba(245, 158, 11, 0.3)'
        }}>
          <Palette style={{ width: '24px', height: '24px', color: 'white' }} />
        </div>
        <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#1e293b' }}>
          Blackboard Drawing Guide
        </h3>
      </div>
      
      <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
        Get step-by-step instructions for drawing on blackboard
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#1e293b' }}>
            What to Draw
          </label>
          <input
            type="text"
            value={drawingTopic}
            onChange={(e) => setDrawingTopic(e.target.value)}
            placeholder="e.g., Tree, Human body, Solar system"
            style={styles.input}
            required
          />
        </div>

        {/* Quick Topic Suggestions */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#1e293b' }}>
            <Lightbulb style={{ width: '16px', height: '16px', display: 'inline', marginRight: '0.5rem' }} />
            Quick Topics
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {quickTopics.map((topic, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setDrawingTopic(topic)}
                style={styles.quickTopic}
                onMouseOver={(e) => e.target.style.background = 'rgba(245, 158, 11, 0.2)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(245, 158, 11, 0.1)'}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.formGrid}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#1e293b' }}>
              Subject Context
            </label>
            <select value={subject} onChange={(e) => setSubject(e.target.value)} style={styles.input}>
              <option value="">General Drawing</option>
              <option value="science">Science</option>
              <option value="mathematics">Mathematics</option>
              <option value="social-studies">Social Studies</option>
              <option value="art">Art & Craft</option>
              <option value="environmental-studies">Environmental Studies</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#1e293b' }}>
              Complexity Level
            </label>
            <select value={complexity} onChange={(e) => setComplexity(e.target.value)} style={styles.input}>
              <option value="simple">Simple (Basic shapes)</option>
              <option value="moderate">Moderate (Some details)</option>
              <option value="detailed">Detailed (Advanced)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#1e293b' }}>
              Board Type
            </label>
            <select value={boardType} onChange={(e) => setBoardType(e.target.value)} style={styles.input}>
              <option value="blackboard">Blackboard (Chalk)</option>
              <option value="whiteboard">Whiteboard (Marker)</option>
              <option value="paper">Paper (Pencil/Pen)</option>
            </select>
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={loading || !drawingTopic.trim()}
          style={{
            ...styles.button,
            opacity: loading || !drawingTopic.trim() ? 0.6 : 1
          }}
          whileHover={{ scale: loading || !drawingTopic.trim() ? 1 : 1.02 }}
          whileTap={{ scale: loading || !drawingTopic.trim() ? 1 : 0.98 }}
        >
          {loading ? (
            <>
              <Loader2 style={{ width: '20px', height: '20px' }} className="animate-spin" />
              Creating guide...
            </>
          ) : (
            <>
              <Palette style={{ width: '20px', height: '20px' }} />
              Get Drawing Steps
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default VisualAidGenerator;