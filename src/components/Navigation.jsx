import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  FileText, 
  Brain, 
  Palette, 
  Camera,
  Mic,
  Calendar,
  Gamepad2 
} from 'lucide-react';

const Navigation = ({ activeFeature, onFeatureChange }) => {
  const features = [
    {
      id: 'content',
      name: 'Story Generator',
      icon: Sparkles,
      description: 'Create educational stories and content',
      color: '#3b82f6',
      available: true
    },
    {
      id: 'worksheet',
      name: 'Worksheets',
      icon: FileText,
      description: 'Multi-level practice worksheets',
      color: '#10b981',
      available: true
    },
    {
      id: 'knowledge',
      name: 'Q&A Assistant',
      icon: Brain,
      description: 'Answer student questions',
      color: '#8b5cf6',
      available: true
    },
    {
      id: 'visual',
      name: 'Drawing Guide',
      icon: Palette,
      description: 'Blackboard drawing instructions',
      color: '#f59e0b',
      available: true
    },
    {
      id: 'camera',
      name: 'Visual Analysis',
      icon: Camera,
      description: 'Analyze images and create content',
      color: '#ef4444',
      available: true
    },
    {
      id: 'audio',
      name: 'Audio Tools',
      icon: Mic,
      description: 'Text-to-speech and voice input',
      color: '#06b6d4',
      available: true
    },
    {
      id: 'lesson',
      name: 'Lesson Planner',
      icon: Calendar,
      description: 'Plan and organize lessons',
      color: '#84cc16',
      available: true
    },
    {
      id: 'games',
      name: 'Interactive Games',
      icon: Gamepad2,
      description: 'Educational games and activities',
      color: '#ec4899',
      available: true
    }
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))',
        gap: 'clamp(0.75rem, 2vw, 1rem)',
        padding: 'clamp(1rem, 4vw, 2rem) clamp(0.5rem, 2vw, 1rem)',
        background: 'rgba(30, 41, 59, 0.5)',
        backdropFilter: 'blur(20px)',
        width: '100%',
        '@media (max-width: 768px)': {
          gridTemplateColumns: '1fr',
          gap: '0.75rem',
          padding: '1rem 0.5rem'
        }
      }}
    >
      {features.map((feature, index) => {
        const Icon = feature.icon;
        const isActive = activeFeature === feature.id;
        const isAvailable = feature.available;

        return (
          <motion.button
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onClick={() => isAvailable && onFeatureChange(feature.id)}
            disabled={!isAvailable}
            style={{
              padding: 'clamp(1rem, 3vw, 1.5rem) clamp(0.75rem, 2vw, 1rem)',
              borderRadius: 'clamp(12px, 3vw, 20px)',
              background: isActive 
                ? `linear-gradient(145deg, ${feature.color}, ${feature.color}dd)`
                : isAvailable 
                  ? 'linear-gradient(145deg, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.9))'
                  : 'linear-gradient(145deg, rgba(148, 163, 184, 0.3), rgba(100, 116, 139, 0.2))',
              color: isActive ? 'white' : isAvailable ? '#1e293b' : '#64748b',
              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              fontWeight: '700',
              cursor: isAvailable ? 'pointer' : 'not-allowed',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: isActive 
                ? `0 20px 40px ${feature.color}40`
                : '0 4px 20px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'clamp(0.5rem, 2vw, 0.75rem)',
              border: isActive 
                ? `1px solid ${feature.color}80`
                : '1px solid rgba(148, 163, 184, 0.2)',
              position: 'relative',
              overflow: 'hidden',
              width: '100%',
              minHeight: 'clamp(120px, 20vw, 160px)',
              transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
              opacity: isAvailable ? 1 : 0.6,
              minWidth: 0 // Prevents flex item from overflowing
            }}
            whileHover={isAvailable ? { 
              scale: 1.02, 
              boxShadow: `0 25px 50px ${feature.color}30` 
            } : {}}
            whileTap={isAvailable ? { scale: 0.98 } : {}}
          >
            {/* Coming Soon Badge */}
            {feature.comingSoon && (
              <div style={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.5rem',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: 'white',
                fontSize: '0.625rem',
                fontWeight: '600',
                padding: '0.25rem 0.5rem',
                borderRadius: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Soon
              </div>
            )}

            <div style={{
              padding: '1rem',
              background: isActive 
                ? 'rgba(255, 255, 255, 0.2)'
                : `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)`,
              borderRadius: '16px',
              boxShadow: `0 8px 20px ${feature.color}30`
            }}>
              <Icon style={{ 
                width: '24px', 
                height: '24px', 
                color: isActive ? 'white' : 'white'
              }} />
            </div>

            <div>
              <div style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                {feature.name}
              </div>
              <div style={{ 
                fontSize: '0.875rem', 
                opacity: 0.8,
                lineHeight: '1.4'
              }}>
                {feature.description}
              </div>
            </div>

            {/* Active indicator */}
            {isActive && (
              <motion.div
                layoutId="activeIndicator"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'white',
                  borderRadius: '3px 3px 0 0'
                }}
              />
            )}
          </motion.button>
        );
      })}
    </motion.nav>
  );
};

export default Navigation;