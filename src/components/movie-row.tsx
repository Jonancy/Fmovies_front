"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Movie } from "@/types/tmdb";
import MovieCard from "@/components/movie-card";

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
      className={`absolute top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-neutral-950/70 p-2.5 text-white opacity-0 ring-1 ring-white/15 backdrop-blur transition-all duration-300 focus:opacity-100 group-hover/row:opacity-100 md:block ${
        direction === "left" ? "-left-4" : "-right-4"
      } ${
        disabled
          ? "pointer-events-none opacity-0"
          : "hover:scale-110 hover:bg-blue-600 hover:ring-blue-500"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="size-4"
      >
        {direction === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  );
}

export default function MovieRow({
  id,
  title,
  movies,
  moreHref,
  ranked = false,
}: {
  id?: string;
  title: string;
  movies: Movie[];
  moreHref?: string;
  ranked?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(
      el.scrollLeft + el.clientWidth < el.scrollWidth - 8,
    );
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollByCards = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  if (movies.length === 0) return null;

  return (
    <section id={id} className="group/row scroll-mt-20">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="flex items-baseline gap-2.5 text-xl font-bold tracking-tight sm:text-2xl">
          {title}
          <span className="rounded-full bg-blue-600/15 px-2.5 py-0.5 text-xs font-semibold text-blue-400 ring-1 ring-blue-500/25">
            {movies.length}
          </span>
        </h2>
        {moreHref && (
          <Link
            href={moreHref}
            className="group/more inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
          >
            View more
            <span className="rounded-full p-1 ring-1 ring-white/10 transition-all group-hover/more:bg-blue-600 group-hover/more:ring-blue-500">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="size-3 transition-transform group-hover/more:translate-x-0.5"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        )}
      </div>

      <div className="relative">
        <ArrowButton
          direction="left"
          onClick={() => scrollByCards(-1)}
          disabled={!canScrollLeft}
        />
        <ArrowButton
          direction="right"
          onClick={() => scrollByCards(1)}
          disabled={!canScrollRight}
        />

        <div
          ref={scrollRef}
          className="no-scrollbar flex snap-x gap-4 overflow-x-auto scroll-smooth pb-2 [scroll-padding-left:1rem] sm:gap-5"
        >
          {movies.map((movie, index) => (
            <div key={movie.id} className="snap-start">
              <MovieCard
                movie={movie}
                priority={index < 4}
                rank={ranked ? index + 1 : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
