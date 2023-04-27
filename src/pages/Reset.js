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
  FormWrapper,
  FormTextWrapper,
} from "../components/formComponents";

function Reset() {
  const [email, setEmail] = useState();
  const history = useNavigate();
  const { setUserData } = useContext(UserContext);

  const emailEntered = (e) => {
    setEmail(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/auth/reset", {
        email,
      });
      setUserData({
        token: res.data.token,
        user: res.data.user,
      });

      localStorage.setItem("auth-token", res.data.user.tokens.access.token);
      //   history.push("/");
      console.log("go to change password");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <FormWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="email"
          value={email}
          onChange={(e) => emailEntered(e)}
        />
        <StyledButton type="submit" disabled={!email}>
          Reset
        </StyledButton>
      </StyledForm>
    </FormWrapper>
  );
}

export default Reset;
