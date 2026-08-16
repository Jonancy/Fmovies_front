import "server-only";

import type {
  Credits,
  Genre,
  Movie,
  MovieDetails,
  Paginated,
  TimeWindow,
  TvShow,
  Video,
} from "@/types/tmdb";

const BASE_URL = "https://api.themoviedb.org/3";

/**
 * Every TMDB call goes through here, so the API key stays on the server and
 * never reaches the browser bundle.
 */
async function tmdb<T>(
  path: string,
  params: Record<string, string | number> = {},
  revalidate = 60 * 60,
): Promise<T> {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    throw new Error(
      "TMDB_API_KEY is not set. Add it to .env.local before starting the app.",
    );
  }

  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("api_key", apiKey);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }

  const res = await fetch(url, { next: { revalidate } });

  if (!res.ok) {
    throw new Error(
      `TMDB request failed: ${res.status} ${res.statusText} (${path})`,
    );
  }

  return res.json() as Promise<T>;
}

export function getNowPlaying(page = 1) {
  return tmdb<Paginated<Movie>>("/movie/now_playing", { page });
}

export function getPopular(page = 1) {
  return tmdb<Paginated<Movie>>("/movie/popular", { page });
}

export function getTopRated(page = 1) {
  return tmdb<Paginated<Movie>>("/movie/top_rated", { page });
}

export function getUpcoming(page = 1) {
  return tmdb<Paginated<Movie>>("/movie/upcoming", { page });
}

export function getTrending(timeWindow: TimeWindow = "day", page = 1) {
  return tmdb<Paginated<Movie>>(`/trending/movie/${timeWindow}`, { page });
}

export function getPopularTvShows(page = 1) {
  return tmdb<Paginated<TvShow>>("/tv/popular", { page });
}

export function getMovie(id: number | string) {
  return tmdb<MovieDetails>(`/movie/${id}`);
}

export function getMovieCredits(id: number | string) {
  return tmdb<Credits>(`/movie/${id}/credits`);
}

export function getMovieVideos(id: number | string) {
  return tmdb<{ results: Video[] }>(`/movie/${id}/videos`);
}

export function getSimilarMovies(id: number | string, page = 1) {
  return tmdb<Paginated<Movie>>(`/movie/${id}/similar`, { page });
}

export function searchMovies(query: string, page = 1) {
  // Searches change often enough that a short cache window fits better.
  return tmdb<Paginated<Movie>>("/search/movie", { query, page }, 60 * 5);
}

export function getMovieGenres() {
  return tmdb<{ genres: Genre[] }>("/genre/movie/list");
}

export function discoverMovies(
  params: { genre?: number | string; page?: number; sortBy?: string } = {},
) {
  const { genre, page = 1, sortBy = "popularity.desc" } = params;
  return tmdb<Paginated<Movie>>(
    "/discover/movie",
    genre !== undefined ? { with_genres: genre, page, sort_by: sortBy } : { page, sort_by: sortBy },
  );
}
