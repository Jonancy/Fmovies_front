import type { Metadata } from "next";
import Link from "next/link";
import { getMovieGenres } from "@/lib/tmdb";

export const metadata: Metadata = {
  title: "Browse by Genre",
  description: "Browse thousands of movies by genre.",
};

export default async function GenresPage() {
  const { genres } = await getMovieGenres();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Browse by Genre
      </h1>
      <p className="mt-2 text-sm text-neutral-400">
        Pick a genre to discover movies.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {genres.map((genre) => (
          <Link
            key={genre.id}
            href={`/genre/${genre.id}`}
            className="group flex items-center justify-between rounded-xl bg-white/5 p-5 ring-1 ring-white/10 transition-colors hover:bg-blue-600 hover:ring-blue-500"
          >
            <span className="font-bold group-hover:text-white">
              {genre.name}
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="size-4 text-neutral-500 transition-all group-hover:translate-x-0.5 group-hover:text-white"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
