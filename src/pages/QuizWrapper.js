import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import Card from "../components/QuestionCard";
import axios from "axios";
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
  const [questions, setQuestions] = useState([]);
  console.log(useContext(QuizContext));
  const { start, exit } = useContext(QuizContext);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) navigate("/");

    async function fetchQuestions() {
      // const res = await axios.get(`questions/user/${userData.user.id}`, {
      //   headers: { "x-auth-token": userData.token },
      // });
      // console.log(res.data);
      // res.data.map((question) =>
      //   setQuestions((Q) => [...Q, Object.values(question)])
      // );
    }
    fetchQuestions();
  }, []);

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
