import Link from "next/link";

const BROWSE_LINKS = [
  { label: "Popular", href: "/movies/popular" },
  { label: "Top Rated", href: "/movies/top-rated" },
  { label: "New Releases", href: "/movies/now-playing" },
  { label: "Trending", href: "/movies/trending" },
  { label: "Upcoming", href: "/movies/upcoming" },
  { label: "Genres", href: "/genres" },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-sm font-black text-white shadow-lg shadow-blue-600/25 transition-transform group-hover:scale-105">
                F
              </span>
              <span className="text-lg font-bold tracking-tight">
                F<span className="text-blue-400">Movies</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              Discover trending movies, top-rated classics, and the latest
              releases — all in one beautiful place. Find where to watch
              trailers, explore casts, and build your next watchlist.
            </p>

            <form
              action="/search"
              className="mt-5 flex max-w-xs overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10 transition-colors focus-within:ring-blue-500/50"
            >
              <label htmlFor="footer-search" className="sr-only">
                Search movies
              </label>
              <input
                id="footer-search"
                type="search"
                name="q"
                placeholder="Find a movie..."
                autoComplete="off"
                className="w-full bg-transparent px-4 py-2.5 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none"
              />
              <button
                type="submit"
                aria-label="Search"
                className="grid w-11 shrink-0 place-items-center bg-blue-600 text-white transition-colors hover:bg-blue-500"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden
                  className="size-4"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:gap-16">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                Browse
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {BROWSE_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-neutral-400 transition-colors hover:text-blue-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                Discover
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link
                    href="/search"
                    className="text-neutral-400 transition-colors hover:text-blue-400"
                  >
                    Search
                  </Link>
                </li>
                <li>
                  <Link
                    href="/genres"
                    className="text-neutral-400 transition-colors hover:text-blue-400"
                  >
                    All Genres
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                Get Started
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-neutral-400">
                Start exploring now — no sign-up needed.
              </p>
              <Link
                href="/movies/popular"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.03] hover:bg-blue-500"
              >
                Browse Movies
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="size-3.5"
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/5 pt-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} FMovies. All rights reserved.
          </p>
          <p className="text-xs text-neutral-500">
            Data &amp; images by{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-neutral-400 underline decoration-neutral-700 underline-offset-2 transition-colors hover:text-blue-400"
            >
              TMDB
            </a>
            . This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </p>
        </div>
      </div>
    </footer>
  );
}
