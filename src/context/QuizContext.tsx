import React, { createContext, useContext, useReducer } from 'react';
import { QuizState, Question } from '../types';

interface QuizContextType {
  state: QuizState;
  setSubject: (subject: string) => void;
  setLevel: (level: string) => void;
  setQuestions: (questions: Question[]) => void;
  nextQuestion: () => void;
  submitAnswer: (answer: number) => void;
  resetQuiz: () => void;
}

const initialState: QuizState = {
  subject: '',
  level: '',
  questions: [],
  currentQuestion: 0,
  answers: [],
  score: 0,
  completed: false,
};

type QuizAction =
  | { type: 'SET_SUBJECT'; payload: string }
  | { type: 'SET_LEVEL'; payload: string }
  | { type: 'SET_QUESTIONS'; payload: Question[] }
  | { type: 'NEXT_QUESTION' }
  | { type: 'SUBMIT_ANSWER'; payload: number }
  | { type: 'RESET_QUIZ' };

const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case 'SET_SUBJECT':
      return { ...state, subject: action.payload };
    case 'SET_LEVEL':
      return { ...state, level: action.payload };
    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload };
    case 'SUBMIT_ANSWER':
      const newAnswers = [...state.answers, action.payload];
      const isCorrect = state.questions[state.currentQuestion]?.correctAnswer === action.payload;
      const newScore = isCorrect ? state.score + 1 : state.score;
      
      return {
        ...state,
        answers: newAnswers,
        score: newScore,
      };
    case 'NEXT_QUESTION':
      const nextIndex = state.currentQuestion + 1;
      return {
        ...state,
        currentQuestion: nextIndex,
        completed: nextIndex >= state.questions.length,
      };
    case 'RESET_QUIZ':
      return initialState;
    default:
      return state;
  }
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const setSubject = (subject: string) => dispatch({ type: 'SET_SUBJECT', payload: subject });
  const setLevel = (level: string) => dispatch({ type: 'SET_LEVEL', payload: level });
  const setQuestions = (questions: Question[]) => dispatch({ type: 'SET_QUESTIONS', payload: questions });
  const nextQuestion = () => dispatch({ type: 'NEXT_QUESTION' });
  const submitAnswer = (answer: number) => dispatch({ type: 'SUBMIT_ANSWER', payload: answer });
  const resetQuiz = () => dispatch({ type: 'RESET_QUIZ' });

  return (
    <QuizContext.Provider value={{
      state,
      setSubject,
      setLevel,
      setQuestions,
      nextQuestion,
      submitAnswer,
      resetQuiz,
    }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};