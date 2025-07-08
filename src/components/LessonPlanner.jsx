import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, BookOpen, Users, Target, Plus, Save, Download } from 'lucide-react';

const LessonPlanner = ({ onGenerate, loading }) => {
  const [lessonData, setLessonData] = useState({
    title: '',
    subject: '',
    grade: '',
    duration: '45',
    objectives: [''],
    activities: [''],
    materials: [''],
    assessment: ''
  });

  const [savedLessons, setSavedLessons] = useState([]);

  const addField = (fieldName) => {
    setLessonData(prev => ({
      ...prev,
      [fieldName]: [...prev[fieldName], '']
    }));
  };

  const updateField = (fieldName, index, value) => {
    setLessonData(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].map((item, i) => i === index ? value : item)
    }));
  };

  const removeField = (fieldName, index) => {
    setLessonData(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!lessonData.title || !lessonData.subject) return;
    
    onGenerate('lesson', lessonData);
  };

  const saveLessonPlan = () => {
    const newLesson = {
      ...lessonData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setSavedLessons(prev => [...prev, newLesson]);
    
    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('sahayak_lessons') || '[]');
    localStorage.setItem('sahayak_lessons', JSON.stringify([...existing, newLesson]));
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
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    section: {
      background: 'rgba(255, 255, 255, 0.7)',
      borderRadius: '16px',
      padding: '1.5rem',
      border: '1px solid rgba(148, 163, 184, 0.1)'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '0.875rem',
      background: 'rgba(255, 255, 255, 0.9)',
      color: '#1e293b',
      boxSizing: 'border-box'
    },
    textarea: {
      width: '100%',
      padding: '0.75rem',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '0.875rem',
      background: 'rgba(255, 255, 255, 0.9)',
      color: '#1e293b',
      boxSizing: 'border-box',
      resize: 'vertical',
      minHeight: '80px'
    },
    button: {
      background: 'linear-gradient(135deg, #84cc16, #65a30d)',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '12px',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease'
    },
    addButton: {
      background: 'rgba(59, 130, 246, 0.1)',
      border: '1px solid rgba(59, 130, 246, 0.2)',
      color: '#3b82f6',
      padding: '0.5rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.75rem',
      fontWeight: '600'
    },
    fieldGroup: {
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
      marginBottom: '0.5rem'
    }
  };

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{
          padding: '12px',
          background: 'linear-gradient(135deg, #84cc16, #65a30d)',
          borderRadius: '16px',
          boxShadow: '0 8px 20px rgba(132, 204, 22, 0.3)'
        }}>
          <Calendar style={{ width: '24px', height: '24px', color: 'white' }} />
        </div>
        <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#1e293b' }}>
          Lesson Planner
        </h3>
      </div>
      
      <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
        Create structured lesson plans with objectives, activities, and assessments
      </p>

      <form onSubmit={handleSubmit}>
        <div style={styles.grid}>
          {/* Basic Information */}
          <div style={styles.section}>
            <h4 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>
              Basic Information
            </h4>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Lesson Title
              </label>
              <input
                type="text"
                value={lessonData.title}
                onChange={(e) => setLessonData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Introduction to Fractions"
                style={styles.input}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Subject
                </label>
                <select
                  value={lessonData.subject}
                  onChange={(e) => setLessonData(prev => ({ ...prev, subject: e.target.value }))}
                  style={styles.input}
                  required
                >
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
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Grade Level
                </label>
                <select
                  value={lessonData.grade}
                  onChange={(e) => setLessonData(prev => ({ ...prev, grade: e.target.value }))}
                  style={styles.input}
                  required
                >
                  <option value="">Select Grade</option>
                  <option value="3">Grade 3</option>
                  <option value="4">Grade 4</option>
                  <option value="5">Grade 5</option>
                  <option value="mixed">Mixed Grades</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Duration (minutes)
              </label>
              <input
                type="number"
                value={lessonData.duration}
                onChange={(e) => setLessonData(prev => ({ ...prev, duration: e.target.value }))}
                min="15"
                max="120"
                style={styles.input}
              />
            </div>
          </div>

          {/* Learning Objectives */}
          <div style={styles.section}>
            <h4 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>
              <Target style={{ width: '20px', height: '20px', display: 'inline', marginRight: '0.5rem' }} />
              Learning Objectives
            </h4>
            
            {lessonData.objectives.map((objective, index) => (
              <div key={index} style={styles.fieldGroup}>
                <input
                  type="text"
                  value={objective}
                  onChange={(e) => updateField('objectives', index, e.target.value)}
                  placeholder="Students will be able to..."
                  style={{ ...styles.input, flex: 1 }}
                />
                {lessonData.objectives.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeField('objectives', index)}
                    style={{ ...styles.addButton, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => addField('objectives')}
              style={styles.addButton}
            >
              <Plus size={14} /> Add Objective
            </button>
          </div>

          {/* Activities */}
          <div style={styles.section}>
            <h4 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>
              <Users style={{ width: '20px', height: '20px', display: 'inline', marginRight: '0.5rem' }} />
              Learning Activities
            </h4>
            
            {lessonData.activities.map((activity, index) => (
              <div key={index} style={styles.fieldGroup}>
                <textarea
                  value={activity}
                  onChange={(e) => updateField('activities', index, e.target.value)}
                  placeholder="Describe the learning activity..."
                  style={{ ...styles.textarea, flex: 1, minHeight: '60px' }}
                />
                {lessonData.activities.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeField('activities', index)}
                    style={{ ...styles.addButton, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => addField('activities')}
              style={styles.addButton}
            >
              <Plus size={14} /> Add Activity
            </button>
          </div>

          {/* Materials */}
          <div style={styles.section}>
            <h4 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>
              <BookOpen style={{ width: '20px', height: '20px', display: 'inline', marginRight: '0.5rem' }} />
              Required Materials
            </h4>
            
            {lessonData.materials.map((material, index) => (
              <div key={index} style={styles.fieldGroup}>
                <input
                  type="text"
                  value={material}
                  onChange={(e) => updateField('materials', index, e.target.value)}
                  placeholder="e.g., Blackboard, chalk, worksheets..."
                  style={{ ...styles.input, flex: 1 }}
                />
                {lessonData.materials.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeField('materials', index)}
                    style={{ ...styles.addButton, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => addField('materials')}
              style={styles.addButton}
            >
              <Plus size={14} /> Add Material
            </button>
          </div>

          {/* Assessment */}
          <div style={styles.section}>
            <h4 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>
              Assessment Method
            </h4>
            
            <textarea
              value={lessonData.assessment}
              onChange={(e) => setLessonData(prev => ({ ...prev, assessment: e.target.value }))}
              placeholder="How will you assess student learning? (e.g., oral questions, worksheet, observation...)"
              style={styles.textarea}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <motion.button
            type="submit"
            disabled={loading || !lessonData.title || !lessonData.subject}
            style={{
              ...styles.button,
              opacity: loading || !lessonData.title || !lessonData.subject ? 0.6 : 1,
              flex: 1,
              minWidth: '200px'
            }}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? (
              <>
                <Clock style={{ width: '18px', height: '18px' }} className="animate-spin" />
                Generating lesson plan...
              </>
            ) : (
              <>
                <Calendar style={{ width: '18px', height: '18px' }} />
                Generate Detailed Lesson Plan
              </>
            )}
          </motion.button>

          <button
            type="button"
            onClick={saveLessonPlan}
            disabled={!lessonData.title}
            style={{
              ...styles.button,
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              opacity: !lessonData.title ? 0.6 : 1
            }}
          >
            <Save style={{ width: '18px', height: '18px' }} />
            Save Plan
          </button>
        </div>
      </form>
    </div>
  );
};

export default LessonPlanner;