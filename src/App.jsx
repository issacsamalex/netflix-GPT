import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./utils/firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Player from "./pages/Player/Player";
import Search from "./pages/Search/Search";
import HomePage from "./pages/Home/HomePage";
import Signup from "./pages/Signup/Signup";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigate("/");
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
