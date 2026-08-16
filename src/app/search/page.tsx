import Link from "next/link";
import type { Metadata } from "next";
import { searchMovies } from "@/lib/tmdb";
import MovieGrid from "@/components/movie-grid";
import Pagination from "@/components/pagination";

export async function generateMetadata({
  searchParams,
}: PageProps<"/search">): Promise<Metadata> {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim() : "";
  return { title: q ? `Search: ${q}` : "Search" };
}

export default async function SearchPage({
  searchParams,
}: PageProps<"/search">) {
  const params = await searchParams;
  const q = (typeof params.q === "string" ? params.q : "").trim();
  const page = Math.max(
    1,
    Math.trunc(Number(typeof params.page === "string" ? params.page : 1)) || 1,
  );

  if (!q) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Find your next watch
        </h1>
        <p className="mt-3 max-w-md text-neutral-400">
          Search thousands of movies by title. Try the search bar above to get
          started.
        </p>
      </div>
    );
  }

  const results = await searchMovies(q, page);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Results for <span className="text-blue-400">&ldquo;{q}&rdquo;</span>
        </h1>
        <p className="text-sm text-neutral-400">
          {results.total_results.toLocaleString()} movie
          {results.total_results === 1 ? "" : "s"} found
        </p>
      </div>

      {results.results.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <p className="text-lg font-semibold">No movies found</p>
          <p className="mt-2 text-sm text-neutral-400">
            Try a different title or check your spelling.
          </p>
          <Link
            href="/"
            className="mt-6 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
          >
            Back to Home
          </Link>
        </div>
      ) : (
        <>
          <MovieGrid movies={results.results} />
          <Pagination
            basePath="/search"
            page={page}
            totalPages={results.total_pages}
            extraParams={{ q }}
          />
        </>
      )}
    </div>
  );
}
