import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovie } from '../../services/Movies/movies';

export default function MovieDetails() {
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
    <div>
      {movieData ? (
        <div>
          <h1>{movieData.title}</h1>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
