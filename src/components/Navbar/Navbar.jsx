import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { logout } from "../../utils/firebase";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);

  const isSearchPage = location.pathname === "/search";

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarOpacity = Math.min(scrollPosition / 500, 1);

  return (
    <div
      ref={navRef}
      className="navbar"
      style={{
        background: `linear-gradient(to bottom,rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, ${navbarOpacity}) 100%)`,
        transition: "background 0.3s ease-in-out",
      }}
    >
      <div className="navbar-left">
        <img src={logo} alt="brand-logo" />
        <ul>
          <li>Home</li>
          <li>Tv Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        {!isSearchPage && (
          <div className="search-icon" onClick={() => navigate("/search")}>
            <img src={search_icon} alt="search_icon" className="icons" />
            <p>Search movies</p>
          </div>
        )}
        <img src={bell_icon} alt="bell_icon" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="bell_icon" className="profile" />
          <img src={caret_icon} alt="bell_icon" />
          <div className="dropdown">
            <p onClick={logout}>Sign Out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
