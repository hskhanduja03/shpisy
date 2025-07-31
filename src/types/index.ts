export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizState {
  subject: string;
  level: string;
  questions: Question[];
  currentQuestion: number;
  answers: number[];
  score: number;
  completed: boolean;
}

export interface ApiResponse {
  questions: Question[];
}