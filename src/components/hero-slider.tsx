"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { backdropUrl, posterUrl, releaseYear } from "@/lib/images";

interface HeroMovie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  genres: string[];
}

const AUTOPLAY_MS = 8000;

function formatVotes(count: number) {
  if (count >= 1000) return `${Math.round(count / 1000)}k`;
  return String(count);
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M12 2l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.02l-5.88 3.09 1.12-6.55L2.48 8.92l6.58-.96L12 2z" />
    </svg>
  );
}

export default function HeroSlider({ movies }: { movies: HeroMovie[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const total = movies.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + total) % total),
    [total],
  );

  useEffect(() => {
    if (paused || total <= 1) return;
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [next, paused, total]);

  if (total === 0) return null;

  const movie = movies[index];
  const poster = posterUrl(movie.poster_path, "w500");
  const year = releaseYear(movie.release_date);

  return (
    <section
      className="relative h-[76vh] min-h-[540px] w-full touch-pan-y overflow-hidden sm:h-[82vh]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const delta = event.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 48) {
          if (delta < 0) next();
          else prev();
        }
        touchStartX.current = null;
      }}
      aria-roledescription="carousel"
      aria-label="Featured movies"
    >
      {movies.map((m, i) => {
        const bg = backdropUrl(m.backdrop_path, "original");
        const active = i === index;
        return (
          <div
            key={m.id}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${
              active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={!active}
          >
            {bg && (
              <Image
                src={bg}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className={`object-cover transition-transform duration-[8000ms] ease-out ${
                  active ? "scale-105" : "scale-100"
                }`}
              />
            )}
          </div>
        );
      })}

      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-neutral-950/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/60 to-neutral-950/10" />

      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent pb-8 pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div key={movie.id} className="relative">
            {poster && (
              <div className="hero-enter absolute -top-36 right-0 hidden aspect-[2/3] w-44 overflow-hidden rounded-2xl shadow-2xl shadow-black/60 ring-1 ring-white/15 lg:block xl:w-52">
                <Image
                  src={poster}
                  alt={movie.title}
                  fill
                  sizes="208px"
                  className="object-cover"
                />
              </div>
            )}

            <div className="max-w-2xl">
              <div className="hero-enter mb-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-600/30">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                    className="size-3"
                  >
                    <path d="M12 2l1.9 5.7L19.6 9l-4.6 3.7L16.4 19 12 15.9 7.6 19l1.4-6.3L4.4 9l5.7-1.3L12 2z" />
                  </svg>
                  Featured
                </span>
                {movie.genres.slice(0, 3).map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-neutral-200 ring-1 ring-white/15 backdrop-blur-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <h1 className="hero-enter hero-enter-stagger-1 text-3xl font-extrabold leading-[1.1] tracking-tight drop-shadow-xl sm:text-5xl lg:text-6xl">
                {movie.title}
              </h1>

              <div className="hero-enter hero-enter-stagger-2 mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-300">
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  <StarIcon className="size-4 text-amber-400" />
                  <span
                    className={
                      movie.vote_average >= 7
                        ? "text-emerald-400"
                        : movie.vote_average >= 5.5
                          ? "text-amber-400"
                          : "text-rose-400"
                    }
                  >
                    {movie.vote_average > 0
                      ? movie.vote_average.toFixed(1)
                      : "N/A"}
                  </span>
                  <span className="font-normal text-neutral-500">
                    ({formatVotes(movie.vote_count)} votes)
                  </span>
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-neutral-600 sm:block" />
                <span>{year ?? "TBA"}</span>
                <span className="hidden h-1 w-1 rounded-full bg-neutral-600 sm:block" />
                <span className="inline-flex items-center gap-1">
                  <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-neutral-300 ring-1 ring-white/15">
                    HD
                  </span>
                  <span className="text-xs text-neutral-400">
                    Subtitles available
                  </span>
                </span>
              </div>

              <p className="hero-enter hero-enter-stagger-3 mt-4 line-clamp-2 max-w-xl text-sm leading-relaxed text-neutral-300 drop-shadow sm:line-clamp-3 sm:text-base">
                {movie.overview}
              </p>

              <div className="hero-enter hero-enter-stagger-4 mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href={`/movie/${movie.id}`}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-blue-600 py-3 pl-5 pr-7 text-sm font-bold text-white shadow-xl shadow-blue-600/40 ring-1 ring-blue-400/50 transition-all hover:scale-[1.03] hover:bg-blue-500 active:scale-100"
                >
                  <span className="grid size-7 place-items-center rounded-full bg-white/20 transition-colors group-hover:bg-white/30">
                    <PlayIcon className="size-3.5" />
                  </span>
                  Watch Now
                </Link>
                <Link
                  href={`/movie/${movie.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-white/20"
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
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 11v5M12 8h.01" />
                  </svg>
                  More Info
                </Link>
              </div>
            </div>
          </div>

          {total > 1 && (
            <div className="mt-8 flex items-center gap-2.5">
              {movies.map((m, i) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}: ${m.title}`}
                  aria-current={i === index}
                  className={`h-1.5 overflow-hidden rounded-full transition-all duration-300 ${
                    i === index ? "w-12 bg-white/25" : "w-5 bg-white/25 hover:bg-white/40"
                  }`}
                >
                  {i === index && (
                    <span
                      key={`${m.id}-${paused}`}
                      className="block h-full rounded-full bg-blue-400"
                      style={{
                        animation: `hero-progress ${AUTOPLAY_MS}ms linear forwards`,
                        animationPlayState: paused ? "paused" : "running",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="group absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-neutral-950/40 p-3 text-white ring-1 ring-white/15 backdrop-blur transition-all hover:scale-110 hover:bg-neutral-950/70 sm:block"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="size-5 transition-transform group-hover:-translate-x-0.5"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="group absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-neutral-950/40 p-3 text-white ring-1 ring-white/15 backdrop-blur transition-all hover:scale-110 hover:bg-neutral-950/70 sm:block"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="size-5 transition-transform group-hover:translate-x-0.5"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </>
      )}
    </section>
  );
}
