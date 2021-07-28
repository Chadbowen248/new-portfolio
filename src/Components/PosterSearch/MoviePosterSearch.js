import { useState } from "react";
import "./style.css";

const MoviePosterSearch = () => {
  const [error, setError] = useState(null);
  const [searchString, setSearchString] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [step, setStep] = useState(0)
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
        setIsLoaded(true)
      });
  };
  return (
    <div className="poster-search-container">
      <h1>Search for Posters</h1>
      <div className="search-controls">
        <input
            type="text"
            value={searchString}
            onChange={(e) => {
            setSearchString(e.target.value);
            }}
        />
        <button className="search-controls__button" type="button" onClick={getPoster}>
            Search
        </button>
        <button className="search-controls__button" onClick={() => setStep(state => state + 1)}>Next</button>
      </div>
      {isLoaded && <div className="search-display">
        <ul>
            <li>Title: {searchResults[step]?.title}</li>
            <li>Overview: {searchResults[step]?.overview}</li>
            <li>Release Date: {searchResults[step]?.releaseDate}</li>
        </ul>
        <img src={`https://image.tmdb.org/t/p/original${searchResults[step]?.poster_path}`} alt="movie poster"/>
      </div>}
    </div>
  );
};

export default MoviePosterSearch;
