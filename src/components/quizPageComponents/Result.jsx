import React, { useContext } from "react";
import { QuizContext } from "../../context/QuizContext";
import styled from "styled-components";

export default function Result() {
  const { score, setExit, setStart, quizzes } = useContext(QuizContext);
  const playAgain = () => {
    setExit(false);
    setStart(false);
  };

  const Answers = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin: 2em 0;
  `;

  const Save = styled.div`
    height: 40px;
    border-radius: 5px;
    background: lightgreen;
    font-weight: bold;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1em;
    cursor: pointer;
  `;
  const Wrapper = styled.div`
    width: 100%;
    height: auto;
    padding: 1em;
  `;

  return (
    <Wrapper>
      <Answers>
        <h2>
          {score} replied out of {quizzes.length}
        </h2>
        <Save
          onClick={playAgain}
          className="border border-orange-500 p-3 text-2xl rounded"
        >
          Play again
        </Save>
      </Answers>
    </Wrapper>
  );
}
