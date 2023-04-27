import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import NavBar from "../components/NavBar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Div } from "../components/formComponents";

const NotLoggedIn = styled.div`
  width: 100%;
  height: 80px;
  padding: 1em 2em;
  list-style: none;
`;

function Home() {
  console.log("in Home component");
  const { userData } = useContext(UserContext);
  console.log("received user data", userData);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) navigate("/quiz");
  }, []);

  return (
    <Div>
      <NotLoggedIn>
        Quiz App helps you learn by providing you questions to work on in different categories. <br /><br />
        Not logged in. <Link to="/login">Log in</Link>
      </NotLoggedIn>
    </Div>
  );
}

export default Home;
