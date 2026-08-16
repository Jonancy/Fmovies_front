import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { discoverMovies, getMovieGenres } from "@/lib/tmdb";
import MovieGrid from "@/components/movie-grid";
import Pagination from "@/components/pagination";

export async function generateMetadata({
  params,
}: PageProps<"/genre/[id]">): Promise<Metadata> {
  const { id } = await params;
  const genreId = Number(id);
  if (!Number.isInteger(genreId) || genreId <= 0) return { title: "Genre" };
  const { genres } = await getMovieGenres();
  const genre = genres.find((g) => g.id === genreId);
  return {
    title: genre ? `${genre.name} Movies` : "Genre",
    description: genre
      ? `Discover the most popular ${genre.name.toLowerCase()} movies.`
      : undefined,
  };
}

export default async function GenrePage({
  params,
  searchParams,
}: PageProps<"/genre/[id]">) {
  const { id } = await params;
  const genreId = Number(id);
  if (!Number.isInteger(genreId) || genreId <= 0) notFound();

  const sp = await searchParams;
  const page = Math.max(
    1,
    Math.trunc(Number(typeof sp.page === "string" ? sp.page : 1)) || 1,
  );

  const [{ genres }, movies] = await Promise.all([
    getMovieGenres(),
    discoverMovies({ genre: genreId, page }),
  ]);

  const genre = genres.find((g) => g.id === genreId);
  if (!genre) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-medium text-neutral-400">
        <Link href="/genres" className="transition-colors hover:text-white">
          Genres
        </Link>
      </p>
      <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {genre.name}{" "}
          <span className="text-blue-400">Movies</span>
        </h1>
        <p className="text-sm text-neutral-400">
          {movies.total_results.toLocaleString()} movie
          {movies.total_results === 1 ? "" : "s"}
        </p>
      </div>

      <MovieGrid movies={movies.results} />

      <Pagination
        basePath={`/genre/${genreId}`}
        page={page}
        totalPages={movies.total_pages}
      />
    </div>
  );
}
