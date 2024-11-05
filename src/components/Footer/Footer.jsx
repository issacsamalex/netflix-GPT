import React from "react";
import "./Footer.css";
import youtube_icon from "../../assets/youtube_icon.png";
import twitter_icon from "../../assets/twitter_icon.png";
import instagram_icon from "../../assets/instagram_icon.png";
import facebook_icon from "../../assets/facebook_icon.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-icons">
        <img src={youtube_icon} alt="yticon" />
        <img src={twitter_icon} alt="twittericon" />
        <img src={instagram_icon} alt="instagramicon" />
        <img src={facebook_icon} alt="facebookicon" />
      </div>
      <ul>
        <li>Audio Description</li>
        <li>Help Center</li>
        <li>Gift Cards</li>
        <li>Media Centre</li>
        <li>Investor Relations</li>
        <li>Jobs</li>
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Legal Notice</li>
        <li>Cookie Preference</li>
        <li>Corporate Information</li>
        <li>Contact Us</li>
      </ul>
      <p className="copyright-text">
        Built by
        <a
          href="https://github.com/issacsamalex"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          Issac Sam Alex
        </a>
        . The source code is available on{" "}
        <a
          href="https://github.com/issacsamalex"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </p>
    </div>
  );
};

export default Footer;
