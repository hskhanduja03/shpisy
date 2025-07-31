import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { Trophy, RefreshCw, Home, Eye } from 'lucide-react';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, resetQuiz } = useQuiz();
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const percentage = Math.round((state.score / state.questions.length) * 100);
  
  const getGrade = (score: number) => {
    if (score >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 70) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (score >= 60) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { grade: 'D', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const { grade, color, bg } = getGrade(percentage);

  const handleCardFlip = (questionId: number) => {
    const newFlipped = new Set(flippedCards);
    if (newFlipped.has(questionId)) {
      newFlipped.delete(questionId);
    } else {
      newFlipped.add(questionId);
    }
    setFlippedCards(newFlipped);
  };

  const handleRestart = () => {
    resetQuiz();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-4">
      <div className="max-w-6xl mx-auto pt-8">
        {/* Results Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className={`inline-flex items-center justify-center w-24 h-24 ${bg} rounded-full mb-4`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Trophy className={`w-12 h-12 ${color}`} />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Quiz Complete!</h1>
          <p className="text-xl text-gray-600 mb-4">
            Subject: <span className="font-semibold capitalize">{state.subject.replace('-', ' ')}</span> • 
            Level: <span className="font-semibold capitalize">{state.level}</span>
          </p>
          
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">{state.score}/{state.questions.length}</div>
              <div className="text-sm text-gray-600">Correct Answers</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${color}`}>{percentage}%</div>
              <div className="text-sm text-gray-600">Score</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${color}`}>{grade}</div>
              <div className="text-sm text-gray-600">Grade</div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex justify-center space-x-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            onClick={handleRestart}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <RefreshCw size={20} />
            <span>Take Another Quiz</span>
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            <Home size={20} />
            <span>Home</span>
          </button>
        </motion.div>

        {/* Question Review */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center justify-center mb-6">
            <Eye className="w-5 h-5 text-gray-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Review Answers</h2>
            <p className="text-sm text-gray-500 ml-4">Click cards to see explanations</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.questions.map((question, index) => {
              const isCorrect = state.answers[index] === question.correctAnswer;
              const isFlipped = flippedCards.has(question.id);
              
              return (
                <motion.div
                  key={question.id}
                  className="relative h-64 cursor-pointer"
                  onClick={() => handleCardFlip(question.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  style={{ perspective: '1000px' }}
                >
                  <motion.div
                    className="relative w-full h-full rounded-xl shadow-lg transform-style-preserve-3d"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Front of card */}
                    <div className={`absolute inset-0 backface-hidden rounded-xl p-4 ${isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-sm font-medium text-gray-600">Q{index + 1}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-800 mb-4 line-clamp-3">
                        {question.question}
                      </p>
                      <div className="space-y-2">
                        <div className={`text-xs p-2 rounded ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                          Your answer: {question.options[state.answers[index]]}
                        </div>
                        {!isCorrect && (
                          <div className="text-xs p-2 bg-green-100 rounded">
                            Correct: {question.options[question.correctAnswer]}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Back of card */}
                    <div className="absolute inset-0 backface-hidden rounded-xl p-4 bg-blue-50 border-2 border-blue-200" style={{ transform: 'rotateY(180deg)' }}>
                      <div className="flex items-center mb-3">
                        <span className="text-sm font-medium text-blue-600">Explanation</span>
                      </div>
                      <p className="text-sm text-gray-800 leading-relaxed">
                        {question.explanation || 'No explanation available for this question.'}
                      </p>
                      <div className="mt-4 text-xs text-blue-600">
                        Click to flip back
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsPage;