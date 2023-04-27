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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <QuizProvider>
          {" "}
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/quiz" element={<QuizWrapper />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </QuizProvider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
