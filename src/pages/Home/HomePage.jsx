import React, { useEffect, useState } from "react";
import Home from "./Home";
import AuthScreen from "./AuthScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import netflix_spinner from "../../assets/netflix_spinner.gif";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(true);
        navigate("/");
      } else {
        setUser(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="login-spinner">
        <img src={netflix_spinner} alt="spinner" />
      </div>
    );
  }

  return <>{user ? <Home /> : <AuthScreen />}</>;
};

export default HomePage;
