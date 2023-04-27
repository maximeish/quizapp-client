import React, { useState, useContext } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import {
  StyledForm,
  StyledInput,
  StyledButton,
  StyledAlert,
  StyledLabel,
  StyledTitle,
  Div,
  FormWrapper,
  FormTextWrapper,
} from "../components/formComponents";

import { PuffLoader } from "react-spinners";
import getAll from "../utils/getAllQuizzes";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordInvalid, setPasswordInvalid] = React.useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);

  const emailEntered = (e) => {
    setEmail(e.target.value);
  };

  const passwordEntered = (e) => {
    setPassword(e.target.value);
  };

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://quizz-app.herokuapp.com/v1/auth/login",
        {
          email,
          password,
        }
      );

      console.log("logged in", res.data);
      localStorage.setItem("auth-token", res.data.tokens.access.token);
      localStorage.setItem("user-data", JSON.stringify(res.data.user));
      localStorage.setItem("refresh-token", res.data.tokens.refresh.token);
      setUserData({
        token: res.data.tokens,
        user: res.data.user,
      });

      const q = await axios.get(
        "https://quizz-app.herokuapp.com/v1/quiz/category",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
          },
        }
      );

      localStorage.setItem("quizzes", JSON.stringify(q.data));

      navigate("/quiz");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <FormWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <StyledTitle>QUIZ APP</StyledTitle>
        <StyledLabel>Email:</StyledLabel>
        <StyledInput
          type="text"
          value={email}
          onChange={(e) => emailEntered(e)}
        />
        <StyledLabel invalid={passwordInvalid}>Password:</StyledLabel>
        <StyledInput
          type="password"
          value={password}
          onChange={(e) => passwordEntered(e)}
        />
        {passwordInvalid && <StyledAlert>Password is invalid.</StyledAlert>}
        <Div>
          <StyledButton type="submit" disabled={!password || !email}>
            Log in
          </StyledButton>
          <PuffLoader color="#36d7b7" loading={loading} />
        </Div>
      </StyledForm>
      <FormTextWrapper>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </FormTextWrapper>
    </FormWrapper>
  );
}

export default Login;
