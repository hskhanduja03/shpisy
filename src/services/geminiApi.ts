// frontend/utils/generateQuestions.ts
import { Question } from "../types";

export const generateQuestions = async (
  subject: string,
  level: string
): Promise<Question[]> => {
  try {
    const res = await fetch("http://localhost:5000/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, level }),
    });

    if (!res.ok) throw new Error("API call failed");

    const questions: Question[] = await res.json();
    return questions;
  } catch (error) {
    console.error("Failed to generate questions:", error);
    throw new Error("Could not generate quiz questions.");
  }
};
