// Import React core functionality and required hooksAdd commentMore actions
import React, { useEffect, useState, useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
// Import the function to fetch upcoming movies from the API
import { getUpcomingMovies } from "../api/tmdb-api";
// Import the type definition for a movie object
import { BaseMovieProps } from "../types/interfaces";
import Spinner from "../components/spinner";
// Import the MoviesContext, which stores the list of favourite movie IDs
import { MoviesContext } from "../contexts/moviesContext";
import AddToFavourites from "../components/cardIcons/addToFavourites";

// Define the UpcomingMoviesPage component
const UpcomingMoviesPage: React.FC = () => {
  // Access the list of favourite movie IDs from the contextAdd commentMore actions
  const { favourites: favouriteIds } = useContext(MoviesContext);
  // Create local state to store fetched moviesAdd commentMore actions
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
      title="Upcoming Movies" // Page titleAdd commentMore actions
      movies={movies} // Pass fetched movies to the template
      action={
        (
          movie // Define an action (a button/icon) to show on each movie card
        ) =>
          !favouriteIds.includes(movie.id) ? ( // If the movie is not already in favourites
            <AddToFavourites {...movie} /> // Show "Add to Favourites" button
          ) : null // Otherwise, show nothing
      }
    />
  );
};

export default UpcomingMoviesPage; // Export the component so it can be used elsewhere
