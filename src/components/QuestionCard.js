import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import styled from "styled-components";

const QuestionCard = styled.div`
  height: auto;
  width: 60vw;
  border-radius: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

function Card(props) {
  const [count, setCount] = useState("0");
  const { userData } = useContext(UserContext);

  return <QuestionCard>{props.children}</QuestionCard>;
}

export default Card;
