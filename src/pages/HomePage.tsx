import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import {
  BookOpen,
  Calculator,
  Globe,
  Atom,
  Brain,
  Landmark,
  Code,
  FlaskConical,
  LucideIcon,
} from "lucide-react";

type Subject = {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
};

const subjects: Subject[] = [
  {
    id: "biology",
    name: "Biology",
    icon: BookOpen,
    description: "Life sciences and living organisms",
  },
  {
    id: "mathematics",
    name: "Mathematics",
    icon: Calculator,
    description: "Numbers, equations, and problem solving",
  },
  {
    id: "general-knowledge",
    name: "General Knowledge",
    icon: Globe,
    description: "World facts and current affairs",
  },
  {
    id: "physics",
    name: "Physics",
    icon: Atom,
    description: "The laws that govern matter and energy",
  },
  {
    id: "computer-science",
    name: "Computer Science",
    icon: Code,
    description: "Technology, programming, and computing",
  },
  {
    id: "history",
    name: "History",
    icon: Landmark,
    description: "Past events and civilizations",
  },
  {
    id: "psychology",
    name: "Psychology",
    icon: Brain,
    description: "Human mind and behavior",
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: FlaskConical,
    description: "Substances, reactions, and compounds",
  },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setSubject } = useQuiz();

  const handleSubjectSelect = (subjectId: string) => {
    setSubject(subjectId);
    navigate("/level");
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6">
      <motion.div
        className="max-w-5xl w-full"
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
            Quiz
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white ml-2">
              Master
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Test your knowledge with AI-generated questions tailored to your
            expertise.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {subjects.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <motion.button
                key={subject.id}
                onClick={() => handleSubjectSelect(subject.id)}
                className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex flex-col items-start space-y-4">
                  <div className="p-3 bg-neutral-800 rounded-full">
                    <Icon size={28} className="text-gray-200" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {subject.name}
                  </h3>
                  <p className="text-sm text-gray-400">{subject.description}</p>
                  <span className="text-sm text-gray-500 underline mt-2">
                    Start Quiz
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <p className="text-gray-500 text-sm">
            Powered by AI • Minimal UI • Real-time Scoring
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;
