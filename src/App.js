import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Reset from "./pages/Reset";
import Home from "./pages/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import UserContext from "./context/UserContext";
import QuizProvider from "./context/QuizContext";
import NavBar from "./components/NavBar";
import QuizWrapper from "./pages/QuizWrapper";

function App() {
  const d = JSON.parse(localStorage.getItem("user-data"));
  const t = localStorage.getItem("auth-token");

  const [userData, setUserData] = useState({
    token: t,
    user: d,
  });

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <NavBar />
        <QuizProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/quiz" element={<QuizWrapper />} />
          </Routes>
        </QuizProvider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
