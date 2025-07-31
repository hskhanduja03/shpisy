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
} from "lucide-react";

const subjects = [
  {
    id: "biology",
    name: "Biology",
    icon: BookOpen,
    description: "Life sciences and living organisms",
    color: "from-green-400 to-emerald-600",
  },
  {
    id: "mathematics",
    name: "Mathematics",
    icon: Calculator,
    description: "Numbers, equations, and problem solving",
    color: "from-blue-400 to-indigo-600",
  },
  {
    id: "general-knowledge",
    name: "General Knowledge",
    icon: Globe,
    description: "World facts and current affairs",
    color: "from-purple-400 to-pink-600",
  },
  {
    id: "physics",
    name: "Physics",
    icon: Atom,
    description: "The laws that govern matter and energy",
    color: "from-yellow-400 to-red-500",
  },
  {
    id: "computer-science",
    name: "Computer Science",
    icon: Code,
    description: "Technology, programming, and computing",
    color: "from-gray-400 to-blue-500",
  },
  {
    id: "history",
    name: "History",
    icon: Landmark,
    description: "Past events and civilizations",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "psychology",
    name: "Psychology",
    icon: Brain,
    description: "Human mind and behavior",
    color: "from-pink-400 to-rose-600",
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: FlaskConical,
    description: "Substances, reactions, and compounds",
    color: "from-cyan-400 to-blue-600",
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-cyan-100 flex items-center justify-center p-4">
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
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Quiz
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Master
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Test your knowledge with AI-generated questions tailored to your
            expertise level
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {subjects.map((subject, index) => {
            const IconComponent = subject.icon;
            return (
              <motion.div
                key={subject.id}
                className={`bg-gradient-to-br ${subject.color} rounded-2xl p-6 text-white cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                onClick={() => handleSubjectSelect(subject.id)}
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
                    <h3 className="text-2xl font-bold mb-2">{subject.name}</h3>
                    <p className="text-white text-opacity-90">
                      {subject.description}
                    </p>
                  </div>
                  <motion.div
                    className="mt-4 px-6 py-2 bg-white bg-opacity-20 rounded-full text-sm font-semibold"
                    whileHover={{ bg: "rgba(255,255,255,0.3)" }}
                  >
                    Start Quiz
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-gray-500 text-sm">
            Powered by AI • Adaptive Learning • Real-time Results
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;
