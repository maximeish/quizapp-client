import React, { useContext, useState } from "react";
import { QuizContext } from "../../context/QuizContext";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const Box = ({ current, next }) => {
  const { score, quizzes, correct, setCorrect, setExit, setScore } =
    useContext(QuizContext);
  console.log("quizzes available", quizzes);
  const [ans, setAns] = useState("");
  const Save = styled.div`
    height: 40px;
    border-radius: 5px;
    background: #ebb02d;
    font-weight: bold;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1em;
    cursor: pointer;
  `;

  const Exit = styled.div`
    height: 40px;
    border-radius: 5px;
    background: #ff5d5d;
    font-weight: bold;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1em;
    cursor: pointer;
    opacity: 0.7;
  `;

  const Wrapper = styled.div`
    width: 100%;
    height: auto;
    padding: 1em;
  `;

  const Buttons = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  `;

  const Answers = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin: 2em 0;
  `;

  const Ans = styled.div`
    cursor: pointer;
    font-weight: bold;
  `;

  const saveHandler = async () => {
    quizzes[current].answers.filter((a) => {
      if (a.isCorrect === ans) {
        setScore(score + 1);
        console.log("correct");
      } else {
        console.log("wrong");
      }
    });
    // if (quizzes[current].answers === ans) {
    //   setCorrect(correct + 1);
    // }
    setAns(false);
    if (current + 1 === quizzes.length) {
      setExit(true);
    } else {
      next(current + 1);
    }
  };
  return (
    <Wrapper>
      <div>
        {current + 1}. {quizzes[current].questionText}
      </div>
      <Answers
        onClick={() => {
          quizzes[current].answers.forEach((a) => {
            if (a.isCorrect) {
              toast.info("Correct answer is " + a.answerText, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          });
        }}
      >
        <Ans onClick={() => setAns(quizzes[current].answers[0].isCorrect)}>
          {quizzes[current].answers[0].answerText}
        </Ans>
        <Ans onClick={() => setAns(quizzes[current].answers[1].isCorrect)}>
          {quizzes[current].answers[1].answerText}
        </Ans>
        <Ans onClick={() => setAns(quizzes[current].answers[2].isCorrect)}>
          {quizzes[current].answers[2].answerText}
        </Ans>
        <Ans onClick={() => setAns(quizzes[current].answers[3].isCorrect)}>
          {quizzes[current].answers[3].answerText}
        </Ans>
      </Answers>
      <Buttons>
        <Save onClick={saveHandler}>Save & Next</Save>
        <Exit onClick={() => setExit(true)}>Close</Exit>
      </Buttons>
    </Wrapper>
  );
};

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  return <Box current={current} next={setCurrent} />;
}
