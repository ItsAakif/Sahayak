import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Loader2 } from 'lucide-react';

const WorksheetGenerator = ({ onGenerate, loading }) => {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('mixed');
  const [worksheetType, setWorksheetType] = useState('practice');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject || !topic) return;
    
    onGenerate('worksheet', {
      subject,
      topic,
      difficulty,
      worksheetType
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
    button: {
      width: '100%',
      background: 'linear-gradient(135deg, #10b981, #059669)',
      color: 'white',
      border: 'none',
      padding: '1.25rem 2rem',
      borderRadius: '16px',
      fontSize: '1.1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      boxSizing: 'border-box'
    }
  };

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{
          padding: '12px',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          borderRadius: '16px',
          boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)'
        }}>
          <FileText style={{ width: '24px', height: '24px', color: 'white' }} />
        </div>
        <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#1e293b' }}>
          Multi-Level Worksheet Generator
        </h3>
      </div>
      
      <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
        Create 3-difficulty level worksheets for multi-grade classrooms
      </p>

      <form onSubmit={handleSubmit}>
        <div style={styles.formGrid}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#1e293b' }}>
              Subject
            </label>
            <select value={subject} onChange={(e) => setSubject(e.target.value)} style={styles.input} required>
              <option value="">Select Subject</option>
              <option value="mathematics">Mathematics</option>
              <option value="hindi">Hindi</option>
              <option value="english">English</option>
              <option value="science">Science</option>
              <option value="social-studies">Social Studies</option>
              <option value="environmental-studies">Environmental Studies</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#1e293b' }}>
              Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Addition, Subtraction, Animals"
              style={styles.input}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#1e293b' }}>
              Difficulty Level
            </label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} style={styles.input}>
              <option value="mixed">Mixed Levels (Beginner to Advanced)</option>
              <option value="beginner">Beginner Only</option>
              <option value="intermediate">Intermediate Only</option>
              <option value="advanced">Advanced Only</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#1e293b' }}>
              Worksheet Type
            </label>
            <select value={worksheetType} onChange={(e) => setWorksheetType(e.target.value)} style={styles.input}>
              <option value="practice">Practice Exercises</option>
              <option value="assessment">Assessment/Test</option>
              <option value="homework">Homework Assignment</option>
              <option value="review">Review/Revision</option>
            </select>
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={loading || !subject || !topic}
          style={{
            ...styles.button,
            opacity: loading || !subject || !topic ? 0.6 : 1
          }}
          whileHover={{ scale: loading || !subject || !topic ? 1 : 1.02 }}
          whileTap={{ scale: loading || !subject || !topic ? 1 : 0.98 }}
        >
          {loading ? (
            <>
              <Loader2 style={{ width: '20px', height: '20px' }} className="animate-spin" />
              Creating worksheet...
            </>
          ) : (
            <>
              <FileText style={{ width: '20px', height: '20px' }} />
              Generate Worksheet
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default WorksheetGenerator;