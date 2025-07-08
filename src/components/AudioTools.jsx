import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, Volume2, Play, Pause, Square, Download, Loader2, AlertCircle } from 'lucide-react';
import { validateInput, logError, getUserFriendlyMessage } from '../utils/errorHandler';

const AudioTools = ({ onGenerate, loading }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [ttsText, setTtsText] = useState('');
  const [voice, setVoice] = useState('default');
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'hi-IN'; // Hindi by default

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(prev => prev + finalTranscript + ' ');
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError('Speech recognition failed. Please try again.');
        setIsRecording(false);
      };
    }
  }, []);

  const startRecording = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      // Start speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } catch (error) {
      logError(error, { context: 'startRecording' });
      setError('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const downloadAudio = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sahayak-recording-${Date.now()}.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const generateTTS = async () => {
    const validation = validateInput(ttsText, { 
      required: true, 
      maxLength: 1000 
    });

    if (!validation.isValid) {
      setError(validation.errors[0]);
      return;
    }

    try {
      setError(null);
      setIsProcessing(true);

      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(ttsText);
        utterance.lang = voice === 'hindi' ? 'hi-IN' : 'en-US';
        utterance.rate = 0.8;
        utterance.pitch = 1;

        utterance.onend = () => {
          setIsProcessing(false);
        };

        utterance.onerror = (event) => {
          console.error('TTS error:', event.error);
          setError('Text-to-speech failed. Please try again.');
          setIsProcessing(false);
        };

        speechSynthesis.speak(utterance);
      } else {
        throw new Error('Text-to-speech not supported in this browser');
      }
    } catch (error) {
      logError(error, { context: 'generateTTS' });
      setError(getUserFriendlyMessage(error));
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!transcript.trim()) {
      setError('Please record some audio first');
      return;
    }
    
    onGenerate('audio', {
      transcript,
      audioBlob,
      voice
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
    recordButton: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      border: 'none',
      background: isRecording 
        ? 'linear-gradient(135deg, #ef4444, #dc2626)' 
        : 'linear-gradient(135deg, #06b6d4, #0891b2)',
      color: 'white',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
      margin: '0 auto'
    },
    input: {
      width: '100%',
      padding: '1rem',
      border: '2px solid #e2e8f0',
      borderRadius: '16px',
      fontSize: '1rem',
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
      background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
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
    errorAlert: {
      background: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid rgba(239, 68, 68, 0.2)',
      borderRadius: '12px',
      padding: '1rem',
      color: '#dc2626',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1rem'
    }
  };

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{
          padding: '12px',
          background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
          borderRadius: '16px',
          boxShadow: '0 8px 20px rgba(6, 182, 212, 0.3)'
        }}>
          <Mic style={{ width: '24px', height: '24px', color: 'white' }} />
        </div>
        <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#1e293b' }}>
          Audio Tools
        </h3>
      </div>

      {error && (
        <div style={styles.errorAlert}>
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {/* Voice Recording Section */}
      <div style={styles.section}>
        <h4 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>
          Voice Recording
        </h4>
        
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <motion.button
            onClick={isRecording ? stopRecording : startRecording}
            style={styles.recordButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={isRecording ? { scale: [1, 1.1, 1] } : {}}
            transition={isRecording ? { repeat: Infinity, duration: 1 } : {}}
          >
            {isRecording ? <Square size={32} /> : <Mic size={32} />}
          </motion.button>
          
          <p style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
            {isRecording ? 'Recording... Click to stop' : 'Click to start recording'}
          </p>
        </div>

        {audioUrl && (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={playAudio} style={styles.button}>
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            
            <button onClick={downloadAudio} style={styles.button}>
              <Download size={16} />
              Download
            </button>
          </div>
        )}

        {audioUrl && (
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
            style={{ display: 'none' }}
          />
        )}

        {transcript && (
          <div style={{ marginTop: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Transcript:
            </label>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              style={styles.textarea}
              placeholder="Your speech will appear here..."
            />
          </div>
        )}
      </div>

      {/* Text-to-Speech Section */}
      <div style={styles.section}>
        <h4 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>
          Text-to-Speech
        </h4>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Text to Convert:
          </label>
          <textarea
            value={ttsText}
            onChange={(e) => setTtsText(e.target.value)}
            placeholder="Enter text to convert to speech..."
            style={styles.textarea}
            maxLength={1000}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <select
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
            style={{ ...styles.input, width: 'auto', minWidth: '150px' }}
          >
            <option value="default">Default Voice</option>
            <option value="hindi">Hindi Voice</option>
            <option value="english">English Voice</option>
          </select>

          <button
            onClick={generateTTS}
            disabled={isProcessing || !ttsText.trim()}
            style={{
              ...styles.button,
              opacity: isProcessing || !ttsText.trim() ? 0.6 : 1
            }}
          >
            {isProcessing ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Speaking...
              </>
            ) : (
              <>
                <Volume2 size={16} />
                Speak Text
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generate Content Button */}
      {transcript && (
        <motion.button
          onClick={handleSubmit}
          disabled={loading || !transcript.trim()}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
            color: 'white',
            border: 'none',
            padding: '1.25rem 2rem',
            borderRadius: '16px',
            fontSize: '1.1rem',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            opacity: loading || !transcript.trim() ? 0.6 : 1
          }}
          whileHover={{ scale: loading || !transcript.trim() ? 1 : 1.02 }}
          whileTap={{ scale: loading || !transcript.trim() ? 1 : 0.98 }}
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Processing audio...
            </>
          ) : (
            <>
              <Mic size={20} />
              Generate Content from Audio
            </>
          )}
        </motion.button>
      )}
    </div>
  );
};

export default AudioTools;