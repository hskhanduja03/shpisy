import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { Zap, Target, Trophy, LucideIcon } from "lucide-react";

type Level = {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  difficulty: string;
};

const levels: Level[] = [
  {
    id: "beginner",
    name: "Beginner",
    icon: Zap,
    description: "New to the subject",
    difficulty: "Easy questions to build confidence",
  },
  {
    id: "intermediate",
    name: "Intermediate",
    icon: Target,
    description: "Some experience",
    difficulty: "Moderate challenge level",
  },
  {
    id: "expert",
    name: "Expert",
    icon: Trophy,
    description: "Advanced knowledge",
    difficulty: "Complex questions for experts",
  },
];

const LevelPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, setLevel } = useQuiz();

  const handleLevelSelect = (levelId: string) => {
    setLevel(levelId);
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6">
      <motion.div
        className="max-w-4xl w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-100">
            Choose Your Level
          </h1>
          <p className="text-gray-400 text-lg">
            Selected Subject:{" "}
            <span className="font-semibold text-white">
              {state.subject.replace("-", " ")}
            </span>
          </p>
        </motion.div>

        {/* Level Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {levels.map((level, index) => {
            const Icon = level.icon;
            return (
              <motion.button
                key={level.id}
                onClick={() => handleLevelSelect(level.id)}
                className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl p-6 text-left shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex flex-col items-start space-y-4">
                  <div className="p-3 bg-neutral-800 rounded-full">
                    <Icon size={28} className="text-gray-200" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {level.name}
                  </h3>
                  <p className="text-sm text-gray-400">{level.description}</p>
                  <p className="text-sm text-gray-500">{level.difficulty}</p>
                  <span className="text-sm text-gray-500 underline mt-2">
                    Select Level
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <button
            onClick={() => navigate("/")}
            className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
          >
            ← Back to subjects
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LevelPage;
