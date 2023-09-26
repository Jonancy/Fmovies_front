import React, { useEffect, useState } from "react";
import { getMovie } from "../services/Movies/movies";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import ForVideo from "../features/watchMovies/components/forMovie";
import MovieDetails from "../features/watchMovies/components/movieDetails";
import Comments from "../features/watchMovies/comments/comments";
import SuggestedMovies from "../features/movies/suggestionMovies";

export default function Movies() {
  const { id } = useParams(); // Destructure the id from useParams()

  const [movieData, setMovieData] = useState(null); // Use state to store the movie data

  const fetchMovieDetails = async () => {
    try {
      const response = await getMovie(id);
      setMovieData(response.data); // Store the movie data in state
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  return (
  <>
    <div className="bg-neutral-950 text-white">
      {movieData ? (
        <>
        <ForVideo movieImage={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}/>
        <MovieDetails
          movieImage={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
          movieTitle={movieData.original_title}
          type={movieData.type}
          country={movieData.production_countries.name}
          genre={movieData.genres.name}
          release={movieData.release_date}
          director={movieData.director}
          prod={movieData.production_companies.name}
          cast={movieData.cast}
          tags={movieData.tagline}
        />
        </>
      ) : (
        <p>Loading...</p>
      )}
      <div className=" lg:flex xl:flex-col  justify-between">
        <Comments />
        <SuggestedMovies />
      </div>
    </div>
  </>
  );
}
