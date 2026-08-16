import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
      <p
        aria-hidden
        className="pointer-events-none select-none text-[9rem] font-black leading-none tracking-tighter text-white/5 sm:text-[16rem]"
      >
        404
      </p>

      <div className="absolute inset-x-0 top-1/2 -z-10 h-64 bg-blue-600/20 blur-[120px]" />

      <div className="-mt-16 sm:-mt-24">
        <p className="inline-flex items-center gap-2 rounded-full bg-blue-600/10 px-4 py-1.5 text-sm font-medium text-blue-400 ring-1 ring-blue-500/30">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="size-4"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35M8.5 11h5" />
          </svg>
          Scene missing
        </p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          This page could not be found
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral-400 sm:text-base">
          The movie you&rsquo;re looking for might have been removed, renamed,
          or never existed in the first place.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-colors hover:bg-blue-500"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="size-4"
            >
              <path d="M3 10.5L12 3l9 7.5" />
              <path d="M5 9.5V21h14V9.5" />
            </svg>
            Back to Home
          </Link>
          <Link
            href="/movies/popular"
            className="inline-flex items-center gap-2 rounded-full bg-white/5 px-6 py-2.5 text-sm font-semibold text-neutral-200 ring-1 ring-white/10 transition-colors hover:bg-white/10"
          >
            Browse Movies
          </Link>
          <Link
            href="/genres"
            className="inline-flex items-center gap-2 rounded-full bg-white/5 px-6 py-2.5 text-sm font-semibold text-neutral-200 ring-1 ring-white/10 transition-colors hover:bg-white/10"
          >
            Browse Genres
          </Link>
        </div>
      </div>
    </div>
  );
}
