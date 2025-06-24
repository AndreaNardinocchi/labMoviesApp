// Import React core functionality and required hooks
import React, { useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
// Import the function to fetch upcoming movies from the API
import { getUpcomingMovies } from "../api/tmdb-api";
// Import the type definition for a movie object
import { BaseMovieProps } from "../types/interfaces";
import Spinner from "../components/spinner";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

// Define the UpcomingMoviesPage component
const UpcomingMoviesPage: React.FC = () => {
  // Create local state to store fetched movies
  const [movies, setMovies] = useState<BaseMovieProps[]>([]);
  // Create local state to keep track of loading status
  const [loading, setLoading] = useState(true);

  // useEffect runs once when the component mounts (because of the empty [] dependency array)
  useEffect(() => {
    // Define an async function to fetch dataAdd commentMore actions
    const fetchUpcoming = async () => {
      const movies = await getUpcomingMovies(); // Wait for upcoming movies from the API
      setMovies(movies); // Save the movies into stateAdd commentMore actions
      setLoading(false); // Turn off the loading state
    };
    fetchUpcoming(); // Call the async function
  }, []);

  // If data is still loading, show a spinner
  if (loading) return <Spinner />;
  return (
    <PageTemplate
      title="Upcoming Movies" // Page title
      movies={movies} // Pass fetched movies to the template
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

export default UpcomingMoviesPage; // Export the component so it can be used elsewhere
