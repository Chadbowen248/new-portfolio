import { useState } from "react";
import "./style.css";

const MoviePosterSearch = () => {
  const [error, setError] = useState(null);
  const [searchString, setSearchString] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [step, setStep] = useState(0);
  const [searchResults, setSearchResults] = useState([]);

  const formatDate = (dateToFormat) => {
    const date = dateToFormat;
    const arr = date.split("-");
    return `${arr[1]}/${arr[2]}/${arr[0]}`;
  };

  const getPoster = () => {
    fetch(
      `http://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchString}`
    )
      .then((res) => res.json())
      .then(({ results }) => {
        const transformData = results.map(
          ({ title, id, overview, release_date, poster_path }) => ({
            title,
            id,
            overview,
            releaseDate: formatDate(release_date),
            poster_path,
          })
        );
        setSearchResults(transformData);
        setError(false);
        setStep(0);
        setIsLoaded(true);
      })
      .catch((_err) => setError(true));
  };
  return (
    <div className="poster-search-container">
      <h1>Search for Posters</h1>
      <form
      className="poster-search-grid"
        onSubmit={(e) => {
          e.preventDefault();
          getPoster();
        }}
      >
      <div className="search-controls">
        <label htmlFor="movie-search">Search</label>
        <input
          type="text"
          name="movie-search"
          value={searchString}
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
        />
        </div>
        <button type="submit" className="search-controls__button">
          Search
        </button>
      </form>
      {error && <h1>Sorry, something went wrong.</h1>}

      {isLoaded && !error && (
        <div className="search-display">
          <div className="search-display-section">
            <ul>
              <li className="result-meta-item">
                <strong>Title:</strong>{" "}
                {searchResults[step].title || "data not available"}
              </li>
              <li className="result-meta-item">
                Release Date:{" "}
                {searchResults[step].releaseDate || "data not available"}
              </li>
              <li className="result-meta-item">
                Overview: {searchResults[step].overview || "data not available"}
              </li>
            </ul>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/original${searchResults[step]?.poster_path}`}
                alt="movie poster"
                className="search-display__image"
              />
              <div className="search-results-controls">
                <button
                  tydivpe="button"
                  className={step === 0 ? "hidden" : "search-controls__button"}
                  onClick={() => setStep((state) => state - 1)}
                >
                  Back
                </button>
                <button
                  type="button"
                  className={
                    step === searchResults.length - 1
                      ? "hidden"
                      : "search-controls__button"
                  }
                  onClick={() => setStep((state) => state + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviePosterSearch;
