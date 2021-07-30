import { useState } from "react";
import {PosterImage,
  SearchResultsControls,
  PosterSearchGrid,
  SearchControlButtonBack,
  SearchControlButtonNext,
  SearchDisplay,
  SearchDisplaySection,
  Input} from "./MoviePosterSearchStyles"

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
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchString}`
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
    <div>
      <h1>Search for Posters</h1>
      <PosterSearchGrid
        onSubmit={(e) => {
          e.preventDefault();
          getPoster();
        }}
      >
        <div>
          <label htmlFor="movie-search">Search</label>
          <Input
            type="text"
            name="movie-search"
            value={searchString}
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
          />
        </div>
        <button type="submit">
          Search
        </button>
      </PosterSearchGrid>
      {error && <h1>Sorry, something went wrong.</h1>}

      {isLoaded && !error && (
        <SearchDisplay>
          <SearchDisplaySection>
            <ul>
              <li>
                <strong>Title:</strong>{" "}
                {searchResults[step].title || "data not available"}
              </li>
              <li>
                Release Date:{" "}
                {searchResults[step].releaseDate || "data not available"}
              </li>
              <li>
                Overview: {searchResults[step].overview || "data not available"}
              </li>
            </ul>
            <div>
              <PosterImage
                src={`https://image.tmdb.org/t/p/original${searchResults[step]?.poster_path}`}
                alt="movie poster"
              />
              <SearchResultsControls>
                <SearchControlButtonBack
                  step={step}
                  type="button"
                  onClick={() => setStep((state) => state - 1)}
                >
                  Back
                </SearchControlButtonBack>
                <SearchControlButtonNext
                  searchResults={searchResults}
                  step={step}
                  type="button"
                  onClick={() => setStep((state) => state + 1)}
                >
                  Next
                </SearchControlButtonNext>
              </SearchResultsControls>
            </div>
          </SearchDisplaySection>
        </SearchDisplay>
      )}
    </div>
  );
};

export default MoviePosterSearch;
