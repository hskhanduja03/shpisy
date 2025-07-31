import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QuizProvider, useQuiz } from "./context/QuizContext";
import HomePage from "./pages/HomePage";
import LevelPage from "./pages/LevelPage";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./services/ProtectedRoute";
const AppRoutes = () => {
  const { state } = useQuiz();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />

      <Route
        path="/level"
        element={
          <ProtectedRoute condition={state.subject !== ""} redirectTo="/home">
            <LevelPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/quiz"
        element={
          <ProtectedRoute
            condition={state.level !== "" && state.subject !== ""}
            redirectTo="/home"
          >
            <QuizPage />
          </ProtectedRoute>
        }
      />

      <Route path="/results" element={<ResultsPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <QuizProvider>
      <Router>
        <AppRoutes />
      </Router>
    </QuizProvider>
  );
}

export default App;
