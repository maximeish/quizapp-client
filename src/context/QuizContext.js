import React, { useState } from "react";
import { createContext } from "react";
const QuizContext = createContext();

export default function QuizProvider(props) {
  const [qs, setQuizzes] = useState(
    JSON.parse(localStorage.getItem("quizzes"))
  );

  const [start, setStart] = useState(false);
  const [exit, setExit] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [score, setScore] = useState(0);
  return (
    <QuizContext.Provider
      value={{
        start,
        exit,
        setStart,
        setExit,
        quizzes: qs || [],
        setQuizzes,
        correct,
        setCorrect,
        score,
        setScore,
      }}
    >
      {props.children}
    </QuizContext.Provider>
  );
}

export { QuizContext };
