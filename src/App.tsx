import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import HomePage from './pages/HomePage';
import LevelPage from './pages/LevelPage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <QuizProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/level" element={<LevelPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </Router>
    </QuizProvider>
  );
}

export default App;