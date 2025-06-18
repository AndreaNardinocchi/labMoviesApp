import React, { useState, useEffect } from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import { MovieDetailsProps } from "../types/interfaces";
import { getMovie } from "../api/tmdb-api";
import PageTemplate from "../components/templateMoviePage";

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetailsProps>();

  useEffect(() => {
    getMovie(id ?? "").then((movie) => {
      setMovie(movie);
    });
  }, [id]);

  /**
   * A common source of errors with React apps
   * is a component/page renders before the data it needs is retrieved from
   * the backend API - the initial rendering happens before the useEffect hook completes.
   * This scenario applies to MovieDetailsPage. The solution is to have a condition
   * test in the TSX code that checks the availability of the API data.
   * If available, it displays it, otherwise an appropriate message displays.
   * In the above code, the ternary operator performs the condition test.
   *    movie ? display data : display message
   * */

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            {/* The effect of the code is the children prop of TemplateMoviePage is bound to: */}
            <MovieDetails {...movie} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MovieDetailsPage;
