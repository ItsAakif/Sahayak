import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Image, Loader2, X, RotateCcw, Download } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

const CameraTools = ({ onGenerate, loading }) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCamera, setIsCamera] = useState(false);
  const [analysisType, setAnalysisType] = useState('describe');
  const [customPrompt, setCustomPrompt] = useState('');
  const [stream, setStream] = useState(null);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Start Camera
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use back camera on mobile
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setIsCamera(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Could not access camera. Please check permissions or try uploading an image instead.');
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCamera(false);
    }
  };

  // Capture Photo
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      
      canvas.toBlob((blob) => {
        setCapturedImage({
          blob,
          url: URL.createObjectURL(blob),
          name: `capture_${Date.now()}.jpg`
        });
        stopCamera();
      }, 'image/jpeg', 0.8);
    }
  };

  // File Drop Handler
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('image/')) {
      setCapturedImage({
        blob: file,
        url: URL.createObjectURL(file),
        name: file.name
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
    },
    multiple: false
  });

  // Generate Content from Image
  const handleAnalyzeImage = () => {
    if (!capturedImage) return;

    let prompt = '';
    switch (analysisType) {
      case 'describe':
        prompt = 'Analyze this image and describe its educational content in detail. If it contains text (like poems, stories, or lessons), transcribe and explain the content. If it shows objects, people, or scenes, describe what students can learn from it. Include cultural and educational context.';
        break;
      case 'questions':
        prompt = 'Based on this image content, generate 5-7 specific educational questions that teachers can ask students. If the image contains Hindi text (poems, stories, lessons), create questions in both Hindi and English about comprehension, meaning, themes, and vocabulary. If it shows visual content, create observation and analysis questions. Focus on the specific content shown in the image.';
        break;
      case 'story':
        prompt = 'Create an educational story based on this image. If the image contains existing text (like a poem or story), expand on its themes and create related educational content. If it shows visual content, create a story that incorporates the elements shown.';
        break;
      case 'lesson':
        prompt = 'Create a comprehensive lesson plan based on this image. If it contains text (poems, stories, lessons), create activities for reading comprehension, vocabulary, and discussion. If it shows visual content, create observation and analysis activities. Include learning objectives suitable for rural classroom settings.';
        break;
      case 'custom':
        prompt = customPrompt || 'Analyze this image for educational content, including any text or visual elements present.';
        break;
      default:
        prompt = 'Analyze this image for educational purposes, including any text content, visual elements, and learning opportunities.';
    }

    // Generate content based on image analysis
    onGenerate('camera', {
      imageDescription: `Uploaded image: ${capturedImage.name}`,
      analysisType: analysisType,
      customPrompt: customPrompt,
      prompt: prompt,
      imageName: capturedImage.name,
      imageBlob: capturedImage.blob // Pass the actual image blob for AI analysis
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
    section: {
      marginBottom: '2rem',
      padding: '1.5rem',
      background: 'rgba(255, 255, 255, 0.5)',
      borderRadius: '16px',
      border: '1px solid rgba(148, 163, 184, 0.1)'
    },
    button: {
      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
      color: 'white',
      border: 'none',
      padding: '1rem 1.5rem',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease'
    },
    input: {
      width: '100%',
      padding: '1rem',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '1rem',
      background: 'rgba(255, 255, 255, 0.9)',
      color: '#1e293b',
      boxSizing: 'border-box'
    },
    dropzone: {
      border: `2px dashed ${isDragActive ? '#3b82f6' : '#cbd5e1'}`,
      borderRadius: '16px',
      padding: '2rem',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      background: isDragActive ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.5)'
    },
    video: {
      width: '100%',
      maxWidth: '400px',
      borderRadius: '12px',
      background: '#000'
    },
    imagePreview: {
      width: '100%',
      maxWidth: '400px',
      borderRadius: '12px',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)'
    }
  };

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{
          padding: '12px',
          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
          borderRadius: '16px',
          boxShadow: '0 8px 20px rgba(239, 68, 68, 0.3)'
        }}>
          <Camera style={{ width: '24px', height: '24px', color: 'white' }} />
        </div>
        <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#1e293b' }}>
          Visual Analysis Tools
        </h3>
      </div>

      {/* Camera Section */}
      <div style={styles.section}>
        <h4 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>
          Capture Image
        </h4>

        {!isCamera && !capturedImage && (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={startCamera}
              style={{
                ...styles.button,
                margin: '0 auto 1rem',
                background: 'linear-gradient(135deg, #10b981, #059669)'
              }}
            >
              <Camera size={20} />
              Start Camera
            </button>
          </div>
        )}

        {isCamera && (
          <div style={{ textAlign: 'center' }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={styles.video}
            />
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button onClick={capturePhoto} style={styles.button}>
                <Camera size={16} />
                Capture
              </button>
              <button 
                onClick={stopCamera} 
                style={{
                  ...styles.button,
                  background: 'linear-gradient(135deg, #6b7280, #4b5563)'
                }}
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          </div>
        )}

        {capturedImage && (
          <div style={{ textAlign: 'center' }}>
            <img
              src={capturedImage.url}
              alt="Captured"
              style={styles.imagePreview}
            />
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setCapturedImage(null);
                  startCamera();
                }}
                style={{
                  ...styles.button,
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
                }}
              >
                <RotateCcw size={16} />
                Retake
              </button>
              <a
                href={capturedImage.url}
                download={capturedImage.name}
                style={{
                  ...styles.button,
                  textDecoration: 'none',
                  background: 'linear-gradient(135deg, #06b6d4, #0891b2)'
                }}
              >
                <Download size={16} />
                Download
              </a>
              <button
                onClick={() => setCapturedImage(null)}
                style={{
                  ...styles.button,
                  background: 'linear-gradient(135deg, #6b7280, #4b5563)'
                }}
              >
                <X size={16} />
                Remove
              </button>
            </div>
          </div>
        )}
      </div>

      {/* File Upload Section */}
      {!capturedImage && (
        <div style={styles.section}>
          <h4 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>
            Upload Image
          </h4>

          <div {...getRootProps()} style={styles.dropzone}>
            <input {...getInputProps()} />
            <Upload style={{ width: '48px', height: '48px', color: '#64748b', margin: '0 auto 1rem' }} />
            {isDragActive ? (
              <p style={{ color: '#3b82f6', fontWeight: '600' }}>Drop the image here...</p>
            ) : (
              <div>
                <p style={{ color: '#64748b', marginBottom: '0.5rem' }}>
                  Drag & drop an image here, or click to select
                </p>
                <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                  Supports: JPG, PNG, GIF, BMP, WebP
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Analysis Options */}
      {capturedImage && (
        <div style={styles.section}>
          <h4 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>
            Analysis Options
          </h4>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Analysis Type
            </label>
            <select
              value={analysisType}
              onChange={(e) => setAnalysisType(e.target.value)}
              style={styles.input}
            >
              <option value="describe">Describe Image</option>
              <option value="questions">Generate Questions</option>
              <option value="story">Create Story</option>
              <option value="lesson">Lesson Plan</option>
              <option value="custom">Custom Analysis</option>
            </select>
          </div>

          {analysisType === 'custom' && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Custom Prompt
              </label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="What would you like to know about this image?"
                style={{
                  ...styles.input,
                  minHeight: '100px',
                  resize: 'vertical'
                }}
              />
            </div>
          )}

          <button
            onClick={handleAnalyzeImage}
            disabled={loading || (analysisType === 'custom' && !customPrompt.trim())}
            style={{
              ...styles.button,
              width: '100%',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              opacity: loading || (analysisType === 'custom' && !customPrompt.trim()) ? 0.6 : 1
            }}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Image size={16} />
                Analyze Image
              </>
            )}
          </button>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default CameraTools;