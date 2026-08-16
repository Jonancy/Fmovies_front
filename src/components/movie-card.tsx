import Image from "next/image";
import Link from "next/link";
import type { Movie } from "@/types/tmdb";
import { posterUrl, releaseYear } from "@/lib/images";
import { ratingColor } from "@/components/rating-badge";

export default function MovieCard({
  movie,
  priority = false,
  rank,
}: {
  movie: Movie;
  priority?: boolean;
  rank?: number;
}) {
  const poster = posterUrl(movie.poster_path, "w342");
  const year = releaseYear(movie.release_date);
  const hasRank = typeof rank === "number";

  return (
    <div
      className={`group/card flex shrink-0 items-end ${
        hasRank ? "w-44 sm:w-48" : "w-36 sm:w-40"
      }`}
    >
      {hasRank && (
        <span
          aria-hidden
          className="-mr-4 select-none pb-1 font-black leading-[0.8] text-transparent transition-colors duration-300 group-hover/card:text-white/20 [-webkit-text-stroke:2px_#404040] group-hover/card:[-webkit-text-stroke:2px_#3b82f6] sm:-mr-5"
          style={{ fontSize: "5.5rem" }}
        >
          {rank}
        </span>
      )}

      <div className={hasRank ? "w-32 shrink-0 sm:w-36" : "w-full"}>
        <Link
          href={`/movie/${movie.id}`}
          className="relative block aspect-[2/3] overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-white/10 transition-all duration-300 group-hover/card:scale-[1.02] group-hover/card:shadow-2xl group-hover/card:shadow-blue-950/60 group-hover/card:ring-blue-400/50"
        >
          {poster ? (
            <Image
              src={poster}
              alt={movie.title}
              fill
              priority={priority}
              sizes="(min-width: 640px) 160px, 128px"
              className="object-cover transition-transform duration-500 group-hover/card:scale-110"
            />
          ) : (
            <span className="grid h-full place-items-center px-2 text-center text-xs text-neutral-500">
              No poster available
            </span>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />

          <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-center gap-2 pb-3 opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-lg shadow-blue-600/40">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
                className="size-3"
              >
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
              Watch
            </span>
          </div>

          {movie.vote_average > 0 && (
            <span className="absolute right-1.5 top-1.5 inline-flex items-center gap-1 rounded-md bg-neutral-950/80 px-1.5 py-0.5 text-xs font-semibold backdrop-blur-sm">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
                className={`size-2.5 ${ratingColor(movie.vote_average)}`}
              >
                <path d="M12 2l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.02l-5.88 3.09 1.12-6.55L2.48 8.92l6.58-.96L12 2z" />
              </svg>
              <span className={ratingColor(movie.vote_average)}>
                {movie.vote_average.toFixed(1)}
              </span>
            </span>
          )}
        </Link>

        <div className="mt-2 px-0.5">
          <Link
            href={`/movie/${movie.id}`}
            className="line-clamp-1 min-w-0 text-sm font-medium leading-snug text-neutral-200 transition-colors group-hover/card:text-blue-400"
            title={movie.title}
          >
            {movie.title}
          </Link>
          <p className="mt-0.5 text-xs text-neutral-500">{year ?? "TBA"}</p>
        </div>
      </div>
    </div>
  );
}
