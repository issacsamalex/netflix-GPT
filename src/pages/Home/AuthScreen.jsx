import React, { useState } from "react";
import "./AuthScreen.css";
import { Link, useNavigate } from "react-router-dom";
import netflixlogo from "../../assets/logo.png";
import { FaChevronRight } from "react-icons/fa";
import Tvimg from "../../assets/tv.png";
import Tvvideo from "../../assets/hero_vid.m4v";
import Strangerimglg from "../../assets/stranger-things-lg.png";
import Strangerimgsm from "../../assets/stranger-things-sm.png";
import Downloadicon from "../../assets/download-icon.gif";
import Devicepile from "../../assets/device-pile.png";
import Videodevices from "../../assets/video-devices.m4v";
import Kidsimg from "../../assets/kids.png";
import Footer from "../../components/Footer/Footer";

const AuthScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    navigate("/signup?email=" + email);
  };

  return (
    <>
      <div className="hero-bg">
        {/* Navbar */}
        <header className="header">
          <img src={netflixlogo} alt="netflix logo" />
          <Link to={"/login"} className="login-link">
            Sign In
          </Link>
        </header>

        {/* Hero section */}
        <div className="hero-section">
          <h1>Unlimited movies, TV shows, and more</h1>
          <p>Watch anywhere. Cancel anytime.</p>
          <p>
            Ready to watch? Enter your email to create or restart your
            membership
          </p>

          <form onSubmit={handleFormSubmit} className="hero-form">
            <input
              type="email"
              placeholder="Email address"
              className="form-input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button type="submit" className="home-form-btn">
              Get Started <FaChevronRight className="btn-chevron" />
            </button>
          </form>
        </div>

        {/* separator */}
        <div className="separator-div" aria-hidden="true" />

        {/* 1st section */}
        <div className="fea-first-section">
          <div className="fea-first-container">
            {/* Left side */}
            <div className="fea-first-left">
              <h2>Enjoy on your TV</h2>
              <p>
                Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
                Blu-ray players, and more.
              </p>
            </div>
            {/* Right side */}
            <div className="fea-first-right">
              <img src={Tvimg} alt="Tvimage" />
              <video playsInline autoPlay={true} muted loop>
                <source src={Tvvideo} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        {/* separator */}
        <div className="separator-div" aria-hidden="true" />

        {/* 2nd section */}
        <div className="fea-second-section">
          <div className="fea-second-container">
            {/* Left side */}
            <div className="fea-second-left">
              <div>
                <img
                  src={Strangerimglg}
                  alt="featureimages"
                  className="fea-second-lft-img"
                />
                <div className="fea-second-lft-container">
                  <img
                    src={Strangerimgsm}
                    alt="featureimages"
                    className="fea-second-lft-img-sm"
                  />
                  <div className="fea-second-lft-bottom-container">
                    <div className="fea-second-lft-txt-container">
                      <span className="fea-second-lft-txt-1">
                        Stranger Things
                      </span>
                      <span className="fea-second-lft-txt-2">
                        Downloading...
                      </span>
                    </div>
                    <img
                      src={Downloadicon}
                      alt="downloadicon"
                      className="fea-second-lft-downloadicon"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Right side */}
            <div className="fea-second-right">
              <h2>Download your shows to watch offline</h2>
              <p>
                Save your favorites easily and always have somthing to watch
              </p>
            </div>
          </div>
        </div>

        {/* separator */}
        <div className="separator-div" aria-hidden="true" />

        {/* 3rd section */}
        <div className="fea-third-section">
          <div className="fea-third-container">
            {/* Left side */}
            <div className="fea-third-left">
              <h2>Watch everywhere</h2>
              <p>
                Stream unlimited movies and TV shows on your phone, tablet,
                laptop, and TV.
              </p>
            </div>
            {/* Right side */}
            <div className="fea-third-right">
              <img src={Devicepile} alt="Tvimage" />
              <video playsInline autoPlay={true} muted loop>
                <source src={Videodevices} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        {/* separator */}
        <div className="separator-div" aria-hidden="true" />

        {/* 4th section */}
        <div className="fea-fourth-section">
          <div className="fea-fourth-container">
            {/* Left side */}
            <div className="fea-fourth-left">
              <img src={Kidsimg} alt="featureimage" />
            </div>
            {/* Right side */}
            <div className="fea-fourth-right">
              <h2>Create profiles for kids</h2>
              <p>
                Send kids on adventures with their favourite characters in a
                space made just for them - free with your membership
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthScreen;
