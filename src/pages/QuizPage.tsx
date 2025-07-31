import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { generateQuestions } from "../services/geminiApi";
import ProgressBar from "../components/ProgressBar";

const loadingMessages = [
  "Curating quiz for you…",
  "Almost there…",
  "Loading magic…",
  "Hang tight!",
  "Final touches…",
];

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, setQuestions, submitAnswer, nextQuestion } = useQuiz();
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0);

  // Cycle loading messages
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingIndex((i) => (i + 1) % loadingMessages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const questions = await generateQuestions(state.subject, state.level);
        setQuestions(questions);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load questions:", error);
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
        navigate("/results");
      } else {
        nextQuestion();
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={loadingIndex}
            className="text-2xl text-gray-100 font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {loadingMessages[loadingIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  if (state.questions.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-center text-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-red-400">
            Failed to load questions
          </h2>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 border border-red-500 text-red-400 rounded-lg hover:bg-red-900/30 transition"
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
    <div className="min-h-screen bg-neutral-950 text-gray-100 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <ProgressBar
          current={state.currentQuestion + 1}
          total={state.questions.length}
        />

        <motion.div
          className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-md"
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
            <h2 className="text-2xl font-bold mb-4">
              Question {state.currentQuestion + 1}
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              {currentQ.question}
            </p>
          </motion.div>

          <div className="grid gap-4">
            <AnimatePresence>
              {currentQ.options.map((option, index) => {
                let base =
                  "w-full p-4 text-left rounded-xl border transition-all duration-300 ";
                let style = "";

                if (showResult) {
                  if (index === currentQ.correctAnswer) {
                    style = "bg-green-900/20 border-green-500 text-green-300";
                  } else if (
                    index === selectedAnswer &&
                    index !== currentQ.correctAnswer
                  ) {
                    style = "bg-red-900/20 border-red-500 text-red-300";
                  } else {
                    style = "bg-neutral-800 border-neutral-700 text-gray-400";
                  }
                } else {
                  style =
                    "bg-neutral-800 border-neutral-700 hover:border-blue-500 hover:bg-neutral-700 cursor-pointer";
                }

                return (
                  <motion.button
                    key={index}
                    className={base + style}
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
              className="mt-6 p-4 rounded-xl bg-neutral-800 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p>
                {selectedAnswer === currentQ.correctAnswer ? (
                  <span className="text-green-400">Correct! </span>
                ) : (
                  <span className="text-red-400">Incorrect </span>
                )}
              </p>
              {currentQ.explanation && (
                <p className="mt-2 text-gray-400">{currentQ.explanation}</p>
              )}
            </motion.div>
          )}
        </motion.div>

        <div className="text-center mt-6 text-sm text-gray-400">
          Score: {state.score}/
          {state.currentQuestion + (selectedAnswer !== null ? 1 : 0)}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
