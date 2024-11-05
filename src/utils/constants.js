export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_KEY,
  },
};

export const ORIGINAL_IMG_BASE_URL = "https://image.tmdb.org/t/p/original";
export const SMALL_IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
