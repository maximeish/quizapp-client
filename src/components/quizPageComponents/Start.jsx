import React, { useContext } from "react";
import { QuizContext } from "../../context/QuizContext";
import styled from "styled-components";
import { StyledTitle } from "../formComponents";
import axios from "axios";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 2em;
`;

const Text = styled.div`
  margin-bottom: 1em;
`;

const Header = styled.header`
  font-weight: bold;
  font-size: large;
  opacity: 0.7;
  letter-spacing: 0.5px;
  margin-bottom: 1em;
`;

const List = styled.ul``;

const Li = styled.li`
  margin: 0.5em 0;
  cursor: pointer;
  font-size: large;
  letter-spacing: 0.5px;
  font-weight: 500;
  color: darkblue;
  opacity: 0.8;
`;

export default function Start() {
  const { setStart } = useContext(QuizContext);
  const quizzes = JSON.parse(localStorage.getItem("quizzes"));

  const startQuiz = async (id) => {
    await axios.get(
      `https://quizz-app.herokuapp.com/v1/quiz/category/${id}/quizzez`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        },
      }
    );
    setStart(true);
  };

  return (
    <Wrapper>
      <StyledTitle>Welcome to Quiz App</StyledTitle>
      <Header>Instructions</Header>
      <List>
        <li>In this quizz you will be presented random questions to answer</li>
        <li>
          Your score will be saved after finishing the quiz and you can view it
          next time you log in
        </li>
      </List>

      <Header>Question categories</Header>
      <Text>
        Below are the categories you can choose from, of the questions to be
        doing in the quiz. Select a category to start.
      </Text>
      <List>
        {quizzes.map((q) => (
          <Li
            onClick={() => {
              startQuiz(q.id);
            }}
            id={q.id}
          >
            {q.title}
          </Li>
        ))}
      </List>
    </Wrapper>
  );
}
