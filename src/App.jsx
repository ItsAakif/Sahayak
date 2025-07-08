import React, { useState, useCallback, Suspense, lazy, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ErrorBoundary, Header, Footer, Navigation, LoadingSpinner } from './components';
import { useApiKey } from './hooks/useApiKey';
import { useGeminiAI } from './hooks/useGeminiAI';
import { generateStyledPDF } from './utils/pdfGenerator';
// Demo content removed - API key required for all features
import { logError, getUserFriendlyMessage } from './utils/errorHandler';
import { initializePerformanceOptimizations } from './utils/performance';

// Helper function to convert blob to base64
const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(',')[1]; // Remove data:image/jpeg;base64, prefix
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// Lazy load components for code splitting
const ApiKeyModal = lazy(() => import('./components/ApiKeyModal'));
const ContentGenerator = lazy(() => import('./components/ContentGenerator'));
const WorksheetGenerator = lazy(() => import('./components/WorksheetGenerator'));
const KnowledgeBase = lazy(() => import('./components/KnowledgeBase'));
const VisualAidGenerator = lazy(() => import('./components/VisualAidGenerator'));
const AudioTools = lazy(() => import('./components/AudioTools'));
const CameraTools = lazy(() => import('./components/CameraTools'));
const LessonPlanner = lazy(() => import('./components/LessonPlanner'));
const InteractiveGames = lazy(() => import('./components/InteractiveGames'));
const ResultDisplay = lazy(() => import('./components/ResultDisplay'));

const App = () => {
  // State management
  const [activeFeature, setActiveFeature] = useState('content');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Custom hooks for API and AI management
  const {
    apiKey,
    genAI,
    isConfigured,
    showApiModal,
    selectedModel,
    setShowApiModal,
    setSelectedModel,
    updateApiKey,
    clearApiKey,
    validateApiKey
  } = useApiKey();

  const {
    callGeminiOptimized,
    loading,
    error: aiError,
    clearError,
    getUsageStats
  } = useGeminiAI(genAI, selectedModel);

  // Initialize performance optimizations
  useEffect(() => {
    initializePerformanceOptimizations();
  }, []);

  // Handle content generation with robust error handling
  const handleGenerate = useCallback(async (featureType, params) => {
    setError(null);
    setResult(null);
    clearError();

    try {
      let prompt = '';
      let imageData = null;
      
      // Build prompts based on feature type
      switch (featureType) {
        case 'content':
          prompt = buildContentPrompt(params);
          break;
        case 'worksheet':
          prompt = buildWorksheetPrompt(params);
          break;
        case 'knowledge':
          prompt = buildKnowledgePrompt(params);
          break;
        case 'visual':
          prompt = buildVisualPrompt(params);
          break;
        case 'audio':
          prompt = buildAudioPrompt(params);
          break;
        case 'camera':
          prompt = buildCameraPrompt(params);
          // Handle image data for camera feature
          if (params.imageBlob) {
            imageData = {
              inlineData: {
                data: await blobToBase64(params.imageBlob),
                mimeType: params.imageBlob.type
              }
            };
          }
          break;
        case 'lesson':
          prompt = buildLessonPrompt(params);
          break;
        case 'games':
          prompt = buildGamesPrompt(params);
          break;
        default:
          throw new Error(`Unknown feature type: ${featureType}`);
      }

      let generatedContent;

      if (!isConfigured) {
        throw new Error('Please configure your Google Gemini API key to use AI features.');
      } else {
        // Use actual AI generation with optional image data
        generatedContent = await callGeminiOptimized(prompt, imageData);
      }

      setResult(generatedContent);
      
      // Log successful generation
      console.log(`Content generated successfully for ${featureType}`);
      
    } catch (error) {
      logError(error, { 
        context: 'handleGenerate', 
        featureType, 
        params: JSON.stringify(params) 
      });
      
      const friendlyMessage = getUserFriendlyMessage(error);
      setError(friendlyMessage);
      
      // No fallback - show error to user
    }
  }, [isConfigured, callGeminiOptimized, clearError]);

  // Handle PDF download with error handling
  const handleDownloadPDF = useCallback(() => {
    if (!result) {
      setError('No content available to download');
      return;
    }

    try {
      generateStyledPDF(result, activeFeature, {
        filename: `sahayak-${activeFeature}-${Date.now()}`
      });
    } catch (error) {
      logError(error, { context: 'handleDownloadPDF' });
      setError('Failed to generate PDF. Please try again.');
    }
  }, [result, activeFeature]);

  // Handle API key configuration
  const handleApiKeySave = useCallback(async (newApiKey, newModel) => {
    try {
      if (newApiKey) {
        const validation = validateApiKey(newApiKey);
        if (!validation.isValid) {
          throw new Error(validation.error);
        }
      }
      
      updateApiKey(newApiKey);
      setSelectedModel(newModel);
      setError(null);
      
    } catch (error) {
      logError(error, { context: 'handleApiKeySave' });
      throw error; // Re-throw to be handled by the modal
    }
  }, [updateApiKey, setSelectedModel, validateApiKey]);

  // Clear results and errors
  const handleClear = useCallback(() => {
    setResult(null);
    setError(null);
    clearError();
  }, [clearError]);

  // Feature change handler
  const handleFeatureChange = useCallback((feature) => {
    setActiveFeature(feature);
    setError(null);
    clearError();
  }, [clearError]);

  // Render active feature component with Suspense
  const renderActiveFeature = () => {
    const commonProps = {
      onGenerate: handleGenerate,
      loading
    };

    const FeatureComponent = () => {
      switch (activeFeature) {
        case 'content':
          return <ContentGenerator {...commonProps} />;
        case 'worksheet':
          return <WorksheetGenerator {...commonProps} />;
        case 'knowledge':
          return <KnowledgeBase {...commonProps} />;
        case 'visual':
          return <VisualAidGenerator {...commonProps} />;
        case 'audio':
          return <AudioTools {...commonProps} />;
        case 'camera':
          return <CameraTools {...commonProps} />;
        case 'lesson':
          return <LessonPlanner {...commonProps} />;
        case 'games':
          return <InteractiveGames {...commonProps} />;
        default:
          return <ContentGenerator {...commonProps} />;
      }
    };

    return (
      <Suspense fallback={<LoadingSpinner message={`Loading ${activeFeature} tools...`} />}>
        <FeatureComponent />
      </Suspense>
    );
  };

  // Get usage statistics
  const usageStats = getUsageStats();

  return (
    <ErrorBoundary>
      <div style={styles.app}>
        <div style={styles.backgroundOverlay} />
        
        <div style={styles.container}>
          <Header 
            onSettingsClick={() => setShowApiModal(true)}
            isConfigured={isConfigured}
            requestCount={usageStats.requestCount}
          />

          <Navigation 
            activeFeature={activeFeature}
            onFeatureChange={handleFeatureChange}
          />

          <AnimatePresence mode="wait">
            {showApiModal && (
              <Suspense fallback={<LoadingSpinner message="Loading settings..." />}>
                <ApiKeyModal
                  showModal={showApiModal}
                  onClose={() => setShowApiModal(false)}
                  onSave={handleApiKeySave}
                  currentApiKey={apiKey}
                  selectedModel={selectedModel}
                  onModelChange={setSelectedModel}
                  validateApiKey={validateApiKey}
                />
              </Suspense>
            )}
          </AnimatePresence>

          <motion.main style={styles.content}>
            <div style={styles.contentInner}>
              {/* Error Display */}
              {(error || aiError) && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={styles.errorAlert}
                >
                  <div style={styles.errorContent}>
                    <strong>Error:</strong> {error || aiError}
                  </div>
                  <button
                    onClick={() => {
                      setError(null);
                      clearError();
                    }}
                    style={styles.errorCloseBtn}
                  >
                    ×
                  </button>
                </motion.div>
              )}

              {/* Feature Component */}
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderActiveFeature()}
              </motion.div>

              {/* Result Display */}
              {result && (
                <Suspense fallback={<LoadingSpinner message="Loading results..." />}>
                  <ResultDisplay
                    result={result}
                    onDownloadPDF={handleDownloadPDF}
                    onClear={handleClear}
                  />
                </Suspense>
              )}

              {/* API Key Required Notice */}
              {!isConfigured && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={styles.demoNotice}
                >
                  <div style={styles.demoContent}>
                    <h4>API Key Required</h4>
                    <p>
                      Configure your Google Gemini API key to start using Sahayak's AI-powered educational features.
                    </p>
                    <button
                      onClick={() => setShowApiModal(true)}
                      style={styles.configureBtn}
                    >
                      Configure API Key
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.main>

          <Footer />
        </div>
      </div>
    </ErrorBoundary>
  );
};

// Prompt building functions
const buildContentPrompt = (params) => {
  const { prompt, language, gradeLevel, topic, contentSize } = params;
  return `Create educational content in ${language} for Grade ${gradeLevel} students.
Topic: ${topic}
Request: ${prompt}
Size: ${contentSize}
Requirements: Cultural context, moral values, age-appropriate language, engaging narrative.
Format: Use markdown with proper headings and structure.`;
};

const buildWorksheetPrompt = (params) => {
  const { subject, topic, difficulty, worksheetType } = params;
  return `Create a ${difficulty} level ${worksheetType} worksheet for ${subject} - ${topic}.
Include multiple difficulty levels for multi-grade classrooms.
Format: Clear instructions, progressive difficulty, answer key suggestions.
Make it suitable for rural classroom settings.`;
};

const buildKnowledgePrompt = (params) => {
  const { question, context, answerStyle } = params;
  return `Answer this student question in ${answerStyle} style: "${question}"
Context: ${context}
Requirements: Use local examples, simple language, culturally relevant explanations.
Include practical applications and encourage curiosity.`;
};

const buildVisualPrompt = (params) => {
  const { drawingTopic, subject, complexity, boardType } = params;
  return `Create step-by-step drawing instructions for: ${drawingTopic}
Subject context: ${subject}
Complexity: ${complexity}
Board type: ${boardType}
Format: Clear numbered steps, materials needed, teaching tips.
Make it suitable for rural classroom with limited resources.`;
};

const buildAudioPrompt = (params) => {
  const { transcript, voice } = params;
  return `Based on this audio transcript, create educational content: "${transcript}"
Voice preference: ${voice}
Requirements: Expand the spoken content into structured learning material.
Include discussion points and follow-up activities.`;
};

const buildCameraPrompt = (params) => {
  const { imageDescription, analysisType, customPrompt, prompt, imageName } = params;
  
  // Enhanced prompt for image analysis
  if (prompt) {
    return `${prompt}

Image Context: ${imageDescription || imageName || 'Educational image uploaded by teacher'}

IMPORTANT INSTRUCTIONS:
- If the image contains TEXT (Hindi/English poems, stories, lessons, etc.), please TRANSCRIBE the text first, then provide the requested analysis type
- For "Generate Questions" requests: Create specific questions about the actual content shown, including Hindi questions if the text is in Hindi
- For "Describe" requests: Provide detailed educational analysis of the content
- For "Story" requests: Create stories based on the themes or content shown
- For "Lesson Plan" requests: Create comprehensive lesson plans using the actual content
- Provide content suitable for rural classroom settings with limited resources
- Include cultural context and local examples where relevant
- Format the response clearly with headings and bullet points
- FOCUS ON THE SPECIFIC ANALYSIS TYPE REQUESTED, not general educational activities

Please provide the specific type of educational content requested by the teacher.`;
  }
  
  // Fallback to original format
  return `Based on this image analysis: "${imageDescription}"
Analysis type: ${analysisType}
Create educational content that uses visual elements for learning.
Include observation activities and discussion questions.`;
};

const buildLessonPrompt = (params) => {
  const { subject, topic, duration, gradeLevel, objectives } = params;
  return `Create a comprehensive lesson plan for ${subject} - ${topic}
Grade Level: ${gradeLevel}
Duration: ${duration}
Learning Objectives: ${objectives}
Requirements: Include warm-up activities, main content, practice exercises, and assessment.
Format: Structured lesson plan with clear timing and activities suitable for rural classrooms.`;
};

const buildGamesPrompt = (params) => {
  const { gameType, subject, difficulty, playerCount } = params;
  return `Create an interactive educational game: ${gameType}
Subject: ${subject}
Difficulty: ${difficulty}
Players: ${playerCount}
Requirements: Include game rules, scoring system, educational objectives, and materials needed.
Make it suitable for classroom use with minimal resources.`;
};

// Enhanced Responsive Styles
const styles = {
  app: {
    minHeight: '100vh',
    width: '100vw',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    color: '#f8fafc',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden'
  },
  backgroundOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(34, 197, 94, 0.05) 0%, transparent 50%)
    `,
    pointerEvents: 'none',
    zIndex: 0
  },
  container: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    padding: 'clamp(1rem, 4vw, 2rem) clamp(0.5rem, 2vw, 1rem)',
    width: '100%',
    flex: 1
  },
  contentInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    padding: '0 clamp(0.5rem, 2vw, 1rem)'
  },
  errorAlert: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    borderRadius: '16px',
    padding: 'clamp(0.75rem, 2vw, 1rem)',
    marginBottom: 'clamp(1rem, 3vw, 2rem)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    color: '#fca5a5',
    flexDirection: 'column',
    gap: '0.5rem',
    '@media (min-width: 768px)': {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 0
    }
  },
  errorContent: {
    flex: 1,
    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    lineHeight: 1.5
  },
  errorCloseBtn: {
    background: 'none',
    border: 'none',
    color: '#fca5a5',
    fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
    cursor: 'pointer',
    padding: '0.25rem',
    marginLeft: 0,
    alignSelf: 'flex-end',
    minHeight: '44px',
    minWidth: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease',
    '@media (min-width: 768px)': {
      marginLeft: '1rem',
      alignSelf: 'center'
    }
  },
  demoNotice: {
    marginTop: 'clamp(1rem, 3vw, 2rem)',
    background: 'rgba(59, 130, 246, 0.1)',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    borderRadius: '16px',
    padding: 'clamp(1rem, 4vw, 2rem)',
    textAlign: 'center'
  },
  demoContent: {
    maxWidth: '500px',
    margin: '0 auto'
  },
  configureBtn: {
    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    color: 'white',
    border: 'none',
    padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem)',
    borderRadius: '12px',
    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '1rem',
    minHeight: '44px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '@media (hover: hover)': {
      ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)'
      }
    }
  }
};

export default App;