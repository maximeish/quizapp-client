import React, { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import Card from "../components/QuestionCard";
import Result from "../components/quizPageComponents/Result";
import Start from "../components/quizPageComponents/Start";
import Quiz from "../components/quizPageComponents/Quiz";
import { QuizContext } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'

const Wrapper = styled.div`
height: 88vh;
display: flex;
align-items: center;
justify-content: center;
`

function QuizWrapper() {
  const { userData } = useContext(UserContext);
  console.log("received userData", userData);
  console.log(useContext(QuizContext));
  const { start, exit } = useContext(QuizContext);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) navigate("/");

   
  }, [navigate]);

  return (
    <Wrapper>
    <Card>
      {exit === false ? (
        <>{start === true ? <Quiz /> : <Start />}</>
      ) : (
        <Result />
      )}
    </Card>
    </Wrapper>
  );
}

export default QuizWrapper;
