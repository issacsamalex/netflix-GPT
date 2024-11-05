import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";
import { API_OPTIONS } from "../../utils/constants";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TitleCards = (props) => {
  const { title, category } = props;
  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      API_OPTIONS
    )
      .then((res) => res.json())
      .then((res) => {
        const shuffledResults = res.results.sort(() => Math.random() - 0.5);
        setApiData(shuffledResults);
      })
      .catch((err) => console.error(err));
  }, [category]);

  const scrollLeft = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollBy({
        left: -cardsRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollBy({
        left: cardsRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} key={index}>
            <div className="card-movie" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                alt="cardimage"
                className="card-movie-img"
              />
            </div>
            <p>
              {card.original_title.length > 17
                ? `${card.original_title.slice(0, 17)}...`
                : card.original_title}
            </p>
          </Link>
        ))}

        <FaChevronRight
          className="slider-FaChevronRight"
          onClick={scrollRight}
        />
        <FaChevronLeft className="slider-FaChevronLeft" onClick={scrollLeft} />
      </div>
    </div>
  );
};

export default TitleCards;
