import React from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import hero_title from "../../assets/hero_title.png";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        {/* <img src={hero_banner} alt="herobanner" className="banner-img" /> */}
        <iframe
          className="banner-video"
          src="https://www.youtube.com/embed/80dqOwAOhbo?playlist=80dqOwAOhbo&loop=1&autoplay=1&controls=0&showinfo=0&mute=1"
          title="YouTube video player"
          frameBorder="0"
        ></iframe>
        <div className="hero-caption">
          <img src={hero_title} alt="captionimage" className="caption-img" />
          <p>
            Discovering his ties to a secret ancient order, a young man living
            in modern Istanbul embarks on a quest to save the city from an
            immortal enemy.
          </p>
          <TitleCards />
        </div>
      </div>
      <div className="more-cards">
        <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
        <TitleCards title={"Only on Netflix"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"upcoming"} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
