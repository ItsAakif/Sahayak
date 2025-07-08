import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gamepad2, 
  Trophy, 
  Star, 
  Play, 
  RotateCcw, 
  Target,
  Brain,
  Calculator,
  BookOpen,
  Globe
} from 'lucide-react';

const InteractiveGames = ({ onGenerate, loading }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameState, setGameState] = useState({});
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const gameCategories = [
    {
      id: 'math',
      name: 'Math Games',
      icon: Calculator,
      color: '#3b82f6',
      games: [
        { id: 'addition', name: 'Addition Practice', difficulty: 'easy' },
        { id: 'subtraction', name: 'Subtraction Fun', difficulty: 'easy' },
        { id: 'multiplication', name: 'Times Tables', difficulty: 'medium' },
        { id: 'counting', name: 'Number Counting', difficulty: 'easy' }
      ]
    },
    {
      id: 'language',
      name: 'Language Games',
      icon: BookOpen,
      color: '#10b981',
      games: [
        { id: 'vocabulary', name: 'Word Building', difficulty: 'medium' },
        { id: 'spelling', name: 'Spelling Bee', difficulty: 'medium' },
        { id: 'matching', name: 'Word Matching', difficulty: 'easy' },
        { id: 'rhymes', name: 'Rhyme Time', difficulty: 'easy' }
      ]
    },
    {
      id: 'science',
      name: 'Science Games',
      icon: Brain,
      color: '#8b5cf6',
      games: [
        { id: 'animals', name: 'Animal Quiz', difficulty: 'easy' },
        { id: 'plants', name: 'Plant Identification', difficulty: 'medium' },
        { id: 'body', name: 'Human Body', difficulty: 'medium' },
        { id: 'weather', name: 'Weather Patterns', difficulty: 'easy' }
      ]
    },
    {
      id: 'geography',
      name: 'Geography Games',
      icon: Globe,
      color: '#f59e0b',
      games: [
        { id: 'states', name: 'Indian States', difficulty: 'medium' },
        { id: 'capitals', name: 'State Capitals', difficulty: 'hard' },
        { id: 'rivers', name: 'Rivers & Mountains', difficulty: 'medium' },
        { id: 'flags', name: 'Country Flags', difficulty: 'easy' }
      ]
    }
  ];

  // Math Game Logic
  const MathGame = ({ gameType }) => {
    const [question, setQuestion] = useState({});
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [streak, setStreak] = useState(0);

    const generateQuestion = () => {
      let newQuestion = {};
      
      switch (gameType) {
        case 'addition':
          const a = Math.floor(Math.random() * (level * 10)) + 1;
          const b = Math.floor(Math.random() * (level * 10)) + 1;
          newQuestion = {
            text: `${a} + ${b} = ?`,
            answer: a + b,
            type: 'addition'
          };
          break;
          
        case 'subtraction':
          const x = Math.floor(Math.random() * (level * 10)) + level * 5;
          const y = Math.floor(Math.random() * x) + 1;
          newQuestion = {
            text: `${x} - ${y} = ?`,
            answer: x - y,
            type: 'subtraction'
          };
          break;
          
        case 'multiplication':
          const m = Math.floor(Math.random() * (level + 5)) + 1;
          const n = Math.floor(Math.random() * 10) + 1;
          newQuestion = {
            text: `${m} × ${n} = ?`,
            answer: m * n,
            type: 'multiplication'
          };
          break;
          
        case 'counting':
          const count = Math.floor(Math.random() * (level * 5)) + 1;
          newQuestion = {
            text: `Count the stars: ${'⭐'.repeat(count)}`,
            answer: count,
            type: 'counting'
          };
          break;
      }
      
      setQuestion(newQuestion);
      setUserAnswer('');
      setFeedback('');
    };

    const checkAnswer = () => {
      const isCorrect = parseInt(userAnswer) === question.answer;
      
      if (isCorrect) {
        setScore(prev => prev + (level * 10));
        setStreak(prev => prev + 1);
        setFeedback('🎉 Correct! Well done!');
        
        if (streak > 0 && streak % 5 === 0) {
          setLevel(prev => prev + 1);
          setFeedback('🎉 Level Up! Great job!');
        }
      } else {
        setStreak(0);
        setFeedback(`❌ Not quite. The answer is ${question.answer}. Try again!`);
      }
      
      setTimeout(() => {
        generateQuestion();
      }, 2000);
    };

    useEffect(() => {
      generateQuestion();
    }, [gameType, level]);

    return (
      <div style={styles.gameArea}>
        <div style={styles.gameStats}>
          <div style={styles.statItem}>
            <Trophy style={{ width: '20px', height: '20px' }} />
            <span>Score: {score}</span>
          </div>
          <div style={styles.statItem}>
            <Target style={{ width: '20px', height: '20px' }} />
            <span>Level: {level}</span>
          </div>
          <div style={styles.statItem}>
            <Star style={{ width: '20px', height: '20px' }} />
            <span>Streak: {streak}</span>
          </div>
        </div>

        <motion.div
          style={styles.questionCard}
          key={question.text}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h3 style={styles.questionText}>{question.text}</h3>
          
          <div style={styles.answerSection}>
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Your answer"
              style={styles.answerInput}
              onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
            />
            <button
              onClick={checkAnswer}
              disabled={!userAnswer}
              style={{
                ...styles.submitBtn,
                opacity: !userAnswer ? 0.5 : 1
              }}
            >
              Check Answer
            </button>
          </div>

          {feedback && (
            <motion.div
              style={styles.feedback}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {feedback}
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  };

  // Language Game Logic
  const LanguageGame = ({ gameType }) => {
    const [currentWord, setCurrentWord] = useState('');
    const [options, setOptions] = useState([]);
    const [feedback, setFeedback] = useState('');

    const vocabularyWords = [
      { word: 'पेड़', meaning: 'Tree', image: '🌳' },
      { word: 'पानी', meaning: 'Water', image: '💧' },
      { word: 'सूरज', meaning: 'Sun', image: '☀️' },
      { word: 'चाँद', meaning: 'Moon', image: '🌙' },
      { word: 'फूल', meaning: 'Flower', image: '🌸' },
      { word: 'पक्षी', meaning: 'Bird', image: '🐦' },
      { word: 'मछली', meaning: 'Fish', image: '🐟' },
      { word: 'घर', meaning: 'House', image: '🏠' }
    ];

    const generateLanguageQuestion = () => {
      const randomWord = vocabularyWords[Math.floor(Math.random() * vocabularyWords.length)];
      const wrongOptions = vocabularyWords
        .filter(w => w.word !== randomWord.word)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      
      const allOptions = [randomWord, ...wrongOptions].sort(() => 0.5 - Math.random());
      
      setCurrentWord(randomWord);
      setOptions(allOptions);
      setFeedback('');
    };

    const checkLanguageAnswer = (selectedOption) => {
      if (selectedOption.word === currentWord.word) {
        setScore(prev => prev + 15);
        setFeedback('🎉 Correct! Great job!');
      } else {
        setFeedback(`❌ Not quite. The correct answer is "${currentWord.meaning}"`);
      }
      
      setTimeout(() => {
        generateLanguageQuestion();
      }, 2000);
    };

    useEffect(() => {
      generateLanguageQuestion();
    }, [gameType]);

    return (
      <div style={styles.gameArea}>
        <div style={styles.gameStats}>
          <div style={styles.statItem}>
            <Trophy style={{ width: '20px', height: '20px' }} />
            <span>Score: {score}</span>
          </div>
        </div>

        <motion.div
          style={styles.questionCard}
          key={currentWord.word}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div style={styles.wordDisplay}>
            <div style={styles.wordEmoji}>{currentWord.image}</div>
            <h3 style={styles.questionText}>What does "{currentWord.word}" mean?</h3>
          </div>
          
          <div style={styles.optionsGrid}>
            {options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => checkLanguageAnswer(option)}
                style={styles.optionBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {option.meaning}
              </motion.button>
            ))}
          </div>

          {feedback && (
            <motion.div
              style={styles.feedback}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {feedback}
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  };

  const startGame = (category, game) => {
    setSelectedGame({ category, game });
    setIsPlaying(true);
    setScore(0);
    setLevel(1);
    setGameState({});
  };

  const resetGame = () => {
    setSelectedGame(null);
    setIsPlaying(false);
    setScore(0);
    setLevel(1);
    setGameState({});
  };

  const renderGame = () => {
    if (!selectedGame) return null;

    const { category, game } = selectedGame;

    if (category.id === 'math') {
      return <MathGame gameType={game.id} />;
    } else if (category.id === 'language') {
      return <LanguageGame gameType={game.id} />;
    }

    return (
      <div style={styles.comingSoon}>
        <h3>🚧 Coming Soon!</h3>
        <p>This game is under development. Check back soon!</p>
      </div>
    );
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
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '2rem'
    },
    headerIcon: {
      padding: '12px',
      background: 'linear-gradient(135deg, #ec4899, #be185d)',
      borderRadius: '16px',
      boxShadow: '0 8px 20px rgba(236, 72, 153, 0.3)'
    },
    categoriesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    categoryCard: {
      background: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '16px',
      padding: '1.5rem',
      border: '1px solid rgba(148, 163, 184, 0.1)',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    categoryHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '1rem'
    },
    categoryIcon: {
      padding: '8px',
      borderRadius: '8px',
      color: 'white'
    },
    gamesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: '0.75rem'
    },
    gameBtn: {
      background: 'rgba(255, 255, 255, 0.9)',
      border: '1px solid rgba(148, 163, 184, 0.2)',
      borderRadius: '8px',
      padding: '0.75rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textAlign: 'center'
    },
    gameArea: {
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '16px',
      padding: '2rem',
      marginTop: '2rem'
    },
    gameStats: {
      display: 'flex',
      gap: '2rem',
      marginBottom: '2rem',
      flexWrap: 'wrap'
    },
    statItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'rgba(59, 130, 246, 0.1)',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#3b82f6'
    },
    questionCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      textAlign: 'center'
    },
    questionText: {
      fontSize: '1.5rem',
      fontWeight: '700',
      marginBottom: '1.5rem',
      color: '#1e293b'
    },
    answerSection: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    answerInput: {
      padding: '1rem',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '1.25rem',
      textAlign: 'center',
      width: '150px',
      fontWeight: '600'
    },
    submitBtn: {
      background: 'linear-gradient(135deg, #10b981, #059669)',
      color: 'white',
      border: 'none',
      padding: '1rem 2rem',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer'
    },
    feedback: {
      marginTop: '1.5rem',
      padding: '1rem',
      borderRadius: '12px',
      background: 'rgba(16, 185, 129, 0.1)',
      fontSize: '1.1rem',
      fontWeight: '600'
    },
    wordDisplay: {
      marginBottom: '2rem'
    },
    wordEmoji: {
      fontSize: '4rem',
      marginBottom: '1rem'
    },
    optionsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1rem',
      marginBottom: '1.5rem'
    },
    optionBtn: {
      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      color: 'white',
      border: 'none',
      padding: '1rem',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer'
    },
    backBtn: {
      background: 'linear-gradient(135deg, #6b7280, #4b5563)',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '12px',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    comingSoon: {
      textAlign: 'center',
      padding: '3rem',
      color: '#64748b'
    }
  };

  if (isPlaying && selectedGame) {
    return (
      <div style={styles.container}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>
            {selectedGame.game.name}
          </h3>
          <button onClick={resetGame} style={styles.backBtn}>
            <RotateCcw style={{ width: '16px', height: '16px' }} />
            Back to Games
          </button>
        </div>
        
        {renderGame()}
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerIcon}>
          <Gamepad2 style={{ width: '24px', height: '24px', color: 'white' }} />
        </div>
        <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#1e293b' }}>
          Interactive Educational Games
        </h3>
      </div>
      
      <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
        Learn through play! Choose from math, language, science, and geography games.
      </p>

      <div style={styles.categoriesGrid}>
        {gameCategories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.id}
              style={styles.categoryCard}
              whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)' }}
            >
              <div style={styles.categoryHeader}>
                <div style={{ ...styles.categoryIcon, background: category.color }}>
                  <Icon style={{ width: '20px', height: '20px' }} />
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0 }}>
                  {category.name}
                </h4>
              </div>
              
              <div style={styles.gamesGrid}>
                {category.games.map((game) => (
                  <motion.button
                    key={game.id}
                    onClick={() => startGame(category, game)}
                    style={styles.gameBtn}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play style={{ width: '16px', height: '16px', marginBottom: '0.25rem' }} />
                    <div>{game.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {game.difficulty}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default InteractiveGames;