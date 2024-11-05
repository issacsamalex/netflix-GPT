import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import netflix_logo from "../../assets/logo.png";
import "./Signup.css";
import { checkValidData } from "../../utils/validate";
import { signup } from "../../utils/firebase";
import netflix_spinner from "../../assets/netflix_spinner.gif";

const Signup = () => {
  const [errMsg, setErrMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const { searchParams } = new URL(document.location);
  const emailValue = searchParams.get("email");
  console.log(emailValue);

  const name = useRef("raju");
  const email = useRef(emailValue || "");
  const password = useRef();

  const handleButtonClick = async (event) => {
    // validate the form data
    event.preventDefault();
    const message = checkValidData(email.current.value, password.current.value);
    setErrMsg(message);
    if (message) return;

    // signup logic
    setLoading(true);
    await signup(
      name.current.value,
      email.current.value,
      password.current.value
    );
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
          <h1>Sign Up</h1>
          <form action="" className="signup-form">
            <div className="form-email">
              <label htmlFor="email">Email</label>
              <input
                ref={email}
                defaultValue={email.current}
                type="email"
                placeholder="you@example.com"
                id="email"
              />
            </div>
            <div className="form-username">
              <label htmlFor="username">Username</label>
              <input
                ref={name}
                type="text"
                placeholder="johndoe"
                id="username"
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
                Sign Up
              </button>
            </div>
          </form>
          <div className="form-switch">
            <p>
              Already have account? <Link to={"/login"}>Sign In Now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
