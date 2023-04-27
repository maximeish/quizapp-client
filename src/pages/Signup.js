import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
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

function Signup() {
  const [name, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordInvalid, ] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const usernameEntered = (e) => {
    setUsername(e.target.value);
  };

  const emailEntered = (e) => {
    setEmail(e.target.value);
  };

  const passwordEntered = (e) => {
    setPassword(e.target.value);
  };

  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://quizz-app.herokuapp.com/v1/auth/register",
        {
          name,
          email,
          password,
        }
      );

      console.log("successfully signed up", res.data.user);
      setUserData({
        user: res.data.user,
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <FormWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <StyledTitle>QUIZ APP</StyledTitle>
        <StyledLabel>Name:</StyledLabel>
        <StyledInput
          type="text"
          value={name}
          onChange={(e) => usernameEntered(e)}
        />

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
          <StyledButton type="submit" disabled={!name || !password || !email}>
            Sign up
          </StyledButton>
          <PuffLoader color="#36d7b7" loading={loading} />
        </Div>
      </StyledForm>
      <FormTextWrapper>
        Already have an account? <Link to="/login">Log in</Link>
      </FormTextWrapper>
    </FormWrapper>
  );
}

export default Signup;
