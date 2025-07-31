import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { generateQuestions } from '../services/geminiApi';
import LoadingSpinner from '../components/LoadingSpinner';
import ProgressBar from '../components/ProgressBar';

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, setQuestions, submitAnswer, nextQuestion } = useQuiz();
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const questions = await generateQuestions(state.subject, state.level);
        setQuestions(questions);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load questions:', error);
        setLoading(false);
      }
    };

    if (state.questions.length === 0) {
      loadQuestions();
    } else {
      setLoading(false);
    }
  }, [state.subject, state.level, state.questions.length, setQuestions]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    setTimeout(() => {
      submitAnswer(answerIndex);
      
      if (state.currentQuestion + 1 >= state.questions.length) {
        navigate('/results');
      } else {
        nextQuestion();
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 2000);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (state.questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Failed to load questions</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const currentQ = state.questions[state.currentQuestion];
  if (!currentQ) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <ProgressBar current={state.currentQuestion + 1} total={state.questions.length} />
        
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Question {state.currentQuestion + 1}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {currentQ.question}
            </p>
          </motion.div>

          <div className="grid gap-4">
            <AnimatePresence>
              {currentQ.options.map((option, index) => {
                let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ";
                
                if (showResult) {
                  if (index === currentQ.correctAnswer) {
                    buttonClass += "bg-green-100 border-green-500 text-green-800";
                  } else if (index === selectedAnswer && index !== currentQ.correctAnswer) {
                    buttonClass += "bg-red-100 border-red-500 text-red-800";
                  } else {
                    buttonClass += "bg-gray-100 border-gray-300 text-gray-600";
                  }
                } else {
                  buttonClass += "bg-white border-gray-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer";
                }

                return (
                  <motion.button
                    key={index}
                    className={buttonClass}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                    whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                  >
                    <span className="font-medium">
                      {String.fromCharCode(65 + index)}. {option}
                    </span>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          {showResult && (
            <motion.div
              className="mt-6 p-4 bg-blue-50 rounded-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-blue-800">
                {selectedAnswer === currentQ.correctAnswer ? "Correct! 🎉" : "Incorrect 😔"}
              </p>
              {currentQ.explanation && (
                <p className="text-blue-700 mt-2 text-sm">
                  {currentQ.explanation}
                </p>
              )}
            </motion.div>
          )}
        </motion.div>

        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Score: {state.score}/{state.currentQuestion + (selectedAnswer !== null ? 1 : 0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;