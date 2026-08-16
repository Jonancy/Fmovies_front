import type { Movie } from "@/types/tmdb";
import MovieCard from "@/components/movie-card";

export default function MovieGrid({ movies }: { movies: Movie[] }) {
  return (
    <div className="mt-8 flex flex-wrap gap-4">
      {movies.map((movie, index) => (
        <MovieCard key={movie.id} movie={movie} priority={index < 8} />
      ))}
    </div>
  );
}
