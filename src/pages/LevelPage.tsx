import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { Zap, Target, Trophy } from 'lucide-react';

const levels = [
  {
    id: 'beginner',
    name: 'Beginner',
    icon: Zap,
    description: 'New to the subject',
    color: 'from-green-400 to-emerald-600',
    difficulty: 'Easy questions to build confidence',
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
    icon: Target,
    description: 'Some experience',
    color: 'from-yellow-400 to-orange-600',
    difficulty: 'Moderate challenge level',
  },
  {
    id: 'expert',
    name: 'Expert',
    icon: Trophy,
    description: 'Advanced knowledge',
    color: 'from-red-400 to-pink-600',
    difficulty: 'Complex questions for experts',
  },
];

const LevelPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, setLevel } = useQuiz();

  const handleLevelSelect = (levelId: string) => {
    setLevel(levelId);
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        className="max-w-4xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Choose Your Level
          </h1>
          <p className="text-lg text-gray-600 capitalize">
            Selected Subject: <span className="font-semibold text-purple-600">{state.subject.replace('-', ' ')}</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {levels.map((level, index) => {
            const IconComponent = level.icon;
            return (
              <motion.div
                key={level.id}
                className={`bg-gradient-to-br ${level.color} rounded-2xl p-6 text-white cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                onClick={() => handleLevelSelect(level.id)}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <motion.div
                    className="p-4 bg-white bg-opacity-20 rounded-full"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent size={48} />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{level.name}</h3>
                    <p className="text-white text-opacity-90 mb-2">{level.description}</p>
                    <p className="text-sm text-white text-opacity-75">{level.difficulty}</p>
                  </div>
                  <motion.div
                    className="mt-4 px-6 py-2 bg-white bg-opacity-20 rounded-full text-sm font-semibold"
                    whileHover={{ bg: "rgba(255,255,255,0.3)" }}
                  >
                    Select Level
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button
            onClick={() => navigate('/')}
            className="text-purple-600 hover:text-purple-800 transition-colors duration-200"
          >
            ← Back to subjects
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LevelPage;