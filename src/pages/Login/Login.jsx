import React, { useRef, useState } from "react";
import "./Login.css";
import netflix_logo from "../../assets/logo.png";
import { checkValidData } from "../../utils/validate";
import { login, signup } from "../../utils/firebase";
import netflix_spinner from "../../assets/netflix_spinner.gif";
import { Link } from "react-router-dom";

const Login = () => {
  const [errMsg, setErrMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const email = useRef();
  const password = useRef();

  const handleButtonClick = async (event) => {
    // validate the form data
    event.preventDefault();
    const message = checkValidData(email.current.value, password.current.value);
    setErrMsg(message);
    if (message) return;
    // login logic
    setLoading(true);
    await login(email.current.value, password.current.value);
    setLoading(false);
  };

  return loading ? (
    <div className="login-spinner">
      <img src={netflix_spinner} alt="spinner" />
    </div>
  ) : (
    <div className="h-screen w-full hero-bg">
      <header className="signup-header">
        <Link to={"/"}>
          <img
            src={netflix_logo}
            alt="netflix logo"
            className="signup-header-img"
          />
        </Link>
      </header>

      <div className="signup-form-container">
        <div className="signup-form-box">
          <h1>Sign In</h1>
          <form className="signup-form">
            <div className="form-email">
              <label htmlFor="email">Email</label>
              <input
                ref={email}
                type="email"
                placeholder="you@example.com"
                id="email"
              />
            </div>
            <div className="form-password">
              <label htmlFor="password">Password</label>
              <input
                ref={password}
                type="password"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                id="password"
              />
            </div>
            <span className="error-msg">{errMsg}</span>
            <div className="form-btn-container">
              <button
                onClick={handleButtonClick}
                type="submit"
                className="form-btn"
              >
                Sign In
              </button>
            </div>
            <div className="form-help">
              <div className="remember">
                <input type="checkbox" />
                <label htmlFor="">Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          </form>
          <div className="form-switch">
            <p>
              New to Netflix? <Link to={"/signup"}>Sign Up Now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
