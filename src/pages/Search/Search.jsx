import React, { useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Search.css";
import openai from "../../utils/openai";
import { API_OPTIONS } from "../../utils/constants";
import { FaLanguage, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [movieResults, setMovieResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Search movie from TMDB
  const fetchMovie = async (movie) => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          movie +
          "&include_adult=false&language=en-US&page=1&region=india",
        API_OPTIONS
      );
      const json = await data.json();

      // Check if the API response contains results
      if (!json.results) {
        return [];
      }
      const filteredMovies = json.results.filter(
        (currentMovie) =>
          currentMovie.title.toLowerCase() === movie.toLowerCase() &&
          currentMovie.poster_path !== null
      );
      return filteredMovies;
    } catch (error) {
      console.error("Error fetching movie:", error);
      return [];
    }
  };

  const handleSearchClick = async () => {
    if (!searchQuery.trim()) return; // prevents empty search
    setLoading(true);
    setHasSearched(true);
    try {
      // Make an API call to GPT API and get Movie search results
      const gptQuery =
        "Act as a Movie Recommendation system and suggest some movies for the query :" +
        searchQuery +
        ". only give me names of 10 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholav, Don, Golmaal, Koi Mil Gaya. If query is specifying a single movie name, give that specific movie name";

      const gptResponse = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

      console.log(gptResponse.choices[0].message?.content);
      const gptMovies = gptResponse.choices[0].message?.content.split(", ");

      // For each movie - search using TMDB Api
      const promiseArray = gptMovies.map((movie) => fetchMovie(movie));
      const movieResults = await Promise.all(promiseArray);
      console.log(movieResults);
      setMovieResults(movieResults);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Flatten the nested movie arrays before rendering
  const flattenedMovies = movieResults.flat();

  return (
    <>
      <Navbar />
      <div className="search-page">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="What would you like to watch today?"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <button
            className={`search-btn ${!searchQuery.trim() ? "disabled" : ""}`}
            onClick={handleSearchClick}
            disabled={!searchQuery.trim()}
          >
            Search
          </button>
        </div>

        {loading ? (
          <div className="movies-grid">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="movie-card shimmer">
                <div className="shimmer-img"></div>
                <div className="shimmer-title"></div>
                <div className="shimmer-language"></div>
              </div>
            ))}
          </div>
        ) : hasSearched && flattenedMovies.length === 0 ? (
          <p className="no-results-message">
            No movies found. Please try a different search!
          </p>
        ) : (
          <div className="movies-grid">
            {flattenedMovies.map((movie) => (
              <Link to={`/player/${movie.id}`} key={movie.id}>
                <div key={movie.id} className="movie-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  {movie.release_date && (
                    <div className="release-year-badge">
                      {movie.release_date.split("-")[0]}
                    </div>
                  )}
                  <h3>{movie.title}</h3>
                  <div className="card-bottom">
                    <div className="rating">
                      <FaStar className="rating-star" />
                      <span>{movie.vote_average}</span>
                    </div>
                    <div className="movie-language">
                      <FaLanguage className="lang-logo" />
                      <strong>{movie.original_language.toUpperCase()}</strong>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
