import React, { useEffect, useRef, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  API_OPTIONS,
  ORIGINAL_IMG_BASE_URL,
  SMALL_IMG_BASE_URL,
} from "../../utils/constants";
import Navbar from "../../components/Navbar/Navbar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactPlayer from "react-player/youtube";
import PlayerPageSkeleton from "../../components/ShimmerUI/PlayerPageSkeleton";

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const Player = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [trailers, setTrailers] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const [similarContent, setSimilarContent] = useState([]);

  const sliderRef = useRef(null);

  useEffect(() => {
    // Fetching data for trailer
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      API_OPTIONS
    )
      .then((res) => res.json())
      .then((res) => {
        const trailerData = res.results.filter(
          (video) => video.type === "Trailer"
        );
        setTrailers(trailerData);
      })
      .catch((err) => {
        console.error(err);
        setTrailers([]);
      });
  }, [id]);

  useEffect(() => {
    // Fetching data for similarcontent
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US`,
      API_OPTIONS
    )
      .then((res) => res.json())
      .then((res) => {
        setSimilarContent(res.results);
      })
      .catch((err) => {
        console.error(err);
        setSimilarContent([]);
      });
  }, [id]);

  useEffect(() => {
    // Fetching data for movie details
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      API_OPTIONS
    )
      .then((res) => res.json())
      .then((res) => {
        setContent(res);
      })
      .catch((err) => {
        console.error(err);
        setContent(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleNext = () => {
    if (currentTrailerIdx < trailers.length - 1) {
      setCurrentTrailerIdx(currentTrailerIdx + 1);
    }
  };
  const handlePrev = () => {
    if (currentTrailerIdx > 0) {
      setCurrentTrailerIdx(currentTrailerIdx - 1);
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  if (loading)
    return (
      <div className="loading-container">
        <PlayerPageSkeleton />
      </div>
    );

  if (!content) {
    return (
      <div className="contentnotfound-container">
        <div className="contentnotfound">
          <Navbar />
          <div className="contentnotfound-txt">
            <h2>Content not found 😢</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="player">
        <div
          className="back-icon-container"
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            className="back-icon-arrow"
            src={back_arrow_icon}
            alt="backicon"
          />
          <span>back to home</span>
        </div>
        <div className="player-container">
          {trailers.length > 0 && (
            <div className="video-buttons">
              <button
                className={`prevBtn ${
                  currentTrailerIdx === 0 ? "prevBtn-disable" : ""
                }`}
                disabled={currentTrailerIdx === 0}
                onClick={handlePrev}
              >
                <FaChevronLeft size={24} />
              </button>

              <button
                className={`nextBtn ${
                  currentTrailerIdx === trailers.length - 1
                    ? "nextBtn-disable"
                    : ""
                }`}
                disabled={currentTrailerIdx === trailers.length - 1}
                onClick={handleNext}
              >
                <FaChevronRight size={24} />
              </button>
            </div>
          )}

          <div className="video-player">
            {trailers.length > 0 && (
              <ReactPlayer
                controls={true}
                width={"100%"}
                height={"70vh"}
                className="react-player"
                url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
              />
            )}

            {trailers.length === 0 && (
              <h2 className="fallback-videotxt-h2">
                No trailers available for{" "}
                <span className="fallback-videotxt-span">{content?.title}</span>{" "}
                😢
              </h2>
            )}
          </div>

          {/* Movie Details */}
          <div className="movie-details-container">
            <div className="movie-detail">
              <h2>{content?.title}</h2>
              <p className="sub-txt">
                {formatDate(content?.release_date)} |{" "}
                {content?.adult ? (
                  <span className="adult-text">18+</span>
                ) : (
                  <span className="non-adult-text">PG-13</span>
                )}
              </p>
              <p className="overview-txt">{content?.overview}</p>
            </div>

            <img
              src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
              alt="movie poster"
              className="movie-poster"
            />
          </div>

          {/* Similar Content */}
          {similarContent.length > 0 && (
            <div className="similarContent-container">
              <h3>Similar Movies</h3>

              <div className="similarContent-slider" ref={sliderRef}>
                {similarContent.map((content) => {
                  if (content.poster_path === null) return null;
                  return (
                    <Link key={content.id} to={`/player/${content.id}`}>
                      <img
                        src={SMALL_IMG_BASE_URL + content.poster_path}
                        alt="movie poster"
                      />
                      <h4>{content.title}</h4>
                    </Link>
                  );
                })}

                <FaChevronRight
                  className="slider-FaChevronRight"
                  onClick={scrollRight}
                />
                <FaChevronLeft
                  className="slider-FaChevronLeft"
                  onClick={scrollLeft}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Player;
