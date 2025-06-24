// Import React core functionality
import React from "react";
import PageTemplate from "../components/templateMovieListPage";
// Import the function to fetch upcoming movies from the API
import { getUpcomingMovies } from "../api/tmdb-api";
// Import the type definition for a movie object
import { BaseMovieProps } from "../types/interfaces";
import Spinner from "../components/spinner";
// React Query hook for data fetching and caching
import { useQuery } from "react-query";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

// Define the UpcomingMoviesPage component using the React.FC (FunctionComponent) type
const UpcomingMoviesPage: React.FC = () => {
  /**
   * useQuery is a React Query hook used to fetch data and manage its state (loading, error, success).
   * It takes two main arguments:
   * - A unique query key (used internally for caching, refetching, etc.)
   * - A function that returns a promise (i.e., an async function that fetches data)
   *
   * It returns an object containing:
   * - `data`: the fetched data (in this case, an array of BaseMovieProps or undefined while loading)
   * - `isLoading`: a boolean indicating if the data is currently being fetched
   * - `isError`: a boolean indicating if an error occurred
   * - `error`: the actual error object if isError is true
   */
  const {
    data: movies, // Rename `data` to `movies` for clarity
    isLoading, // Indicates whether the query is in a loading state
    isError, // Indicates whether the query encountered an error
    error, // The error object returned (if any)
  } = useQuery<BaseMovieProps[]>(
    ["upcomingMovies"], // Query key — unique identifier for caching/fetching this query | It's just a unique identifier used by React Query we add ourself
    getUpcomingMovies // Function to fetch the data
  );

  // Show a spinner while loading
  if (isLoading) return <Spinner />;

  // Optional: Handle error state
  if (isError)
    return <p>Error fetching upcoming movies: {(error as Error).message}</p>;

  return (
    <PageTemplate
      title="Upcoming Movies"
      /**
       * It passes the list of movies to display.
       * If movies is truthy (i.e., data has been loaded and is available),
       * it will be passed as-is. If movies is falsy
       * (i.e., still undefined or null during loading),
       * then it will pass an empty array [] instead.
       */
      movies={movies || []}
      action={() => (
        <PlaylistAddIcon
          style={{
            marginLeft: "4%",
            marginRight: "4%",
            verticalAlign: "middle",
            fontSize: "30px",
          }}
        />
      )}
    />
  );
};

export default UpcomingMoviesPage;
