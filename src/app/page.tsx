import {
  getMovieGenres,
  getNowPlaying,
  getPopular,
  getTopRated,
  getTrending,
} from "@/lib/tmdb";
import HeroSlider from "@/components/hero-slider";
import MovieRow from "@/components/movie-row";

export default async function HomePage() {
  const [{ genres }, popular, trending, topRated, nowPlaying] =
    await Promise.all([
      getMovieGenres(),
      getPopular(1),
      getTrending("week"),
      getTopRated(1),
      getNowPlaying(1),
    ]);

  const genreNames = Object.fromEntries(
    genres.map((genre) => [genre.id, genre.name]),
  );

  const heroMovies = popular.results
    .filter((movie) => movie.backdrop_path && movie.overview)
    .slice(0, 5)
    .map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      backdrop_path: movie.backdrop_path,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      release_date: movie.release_date,
      genres: movie.genre_ids
        .slice(0, 3)
        .map((genreId) => genreNames[genreId])
        .filter(Boolean),
    }));

  return (
    <div className="pb-16">
      <HeroSlider movies={heroMovies} />

      <div className="mx-auto mt-6 flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <MovieRow
          id="trending"
          title="Trending This Week"
          movies={trending.results.slice(0, 10)}
          moreHref="/movies/trending"
        />
        <MovieRow
          id="new-releases"
          title="New Releases"
          movies={nowPlaying.results.slice(0, 12)}
          moreHref="/movies/now-playing"
        />
        <MovieRow
          id="top-rated"
          title="Top Rated"
          movies={topRated.results.slice(0, 12)}
          moreHref="/movies/top-rated"
        />
      </div>
    </div>
  );
}
