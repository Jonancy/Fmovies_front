import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getMovie,
  getMovieCredits,
  getMovieVideos,
  getSimilarMovies,
} from "@/lib/tmdb";
import {
  backdropUrl,
  formatRuntime,
  posterUrl,
  profileUrl,
  releaseYear,
} from "@/lib/images";
import MovieRow from "@/components/movie-row";
import ScoreRing from "@/components/score-ring";
import TrailerPlayer from "@/components/trailer-player";

function formatMoney(value: number) {
  if (!value) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3.5 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10 backdrop-blur-sm transition-colors hover:bg-white/[0.07]">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-600/15 text-blue-400 ring-1 ring-blue-500/25">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
          {label}
        </p>
        <p className="truncate text-sm font-bold text-neutral-100">{value}</p>
      </div>
    </div>
  );
}

const ICONS = {
  calendar: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
      className="size-5"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  ),
  clock: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
      className="size-5"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-5">
      <path d="M12 2l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.02l-5.88 3.09 1.12-6.55L2.48 8.92l6.58-.96L12 2z" />
    </svg>
  ),
  users: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="size-5"
    >
      <path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" />
      <circle cx="10" cy="7" r="4" />
      <path d="M21 21v-2a4 4 0 00-3-3.87M15.5 3.13a4 4 0 010 7.75" />
    </svg>
  ),
};

export async function generateMetadata({
  params,
}: PageProps<"/movie/[id]">): Promise<Metadata> {
  const { id } = await params;
  try {
    const movie = await getMovie(id);
    return {
      title: movie.title,
      description: movie.overview,
      openGraph: {
        title: movie.title,
        description: movie.overview,
        images: backdropUrl(movie.backdrop_path, "w1280")
          ? [backdropUrl(movie.backdrop_path, "w1280")!]
          : undefined,
      },
    };
  } catch {
    return { title: "Movie Not Found" };
  }
}

export default async function MoviePage({ params }: PageProps<"/movie/[id]">) {
  const { id } = await params;

  let movie;
  try {
    movie = await getMovie(id);
  } catch {
    notFound();
  }

  const [credits, videos, similar] = await Promise.all([
    getMovieCredits(id),
    getMovieVideos(id),
    getSimilarMovies(id),
  ]);

  const trailers = videos.results
    .filter(
      (video) =>
        video.site === "YouTube" && video.type === "Trailer" && video.official,
    )
    .sort((a, b) => a.published_at.localeCompare(b.published_at))
    .map((video) => ({ id: video.id, key: video.key, name: video.name }));

  const backdrop = backdropUrl(movie.backdrop_path, "w1280");
  const poster = posterUrl(movie.poster_path, "w500");
  const year = releaseYear(movie.release_date);
  const runtime = formatRuntime(movie.runtime);
  const cast = credits.cast.slice(0, 12);
  const director = credits.crew.find((member) => member.job === "Director");
  const writers = credits.crew
    .filter((member) => member.job === "Writer" || member.job === "Screenplay")
    .slice(0, 3);
  const budget = formatMoney(movie.budget);
  const revenue = formatMoney(movie.revenue);
  const language = movie.spoken_languages[0]?.english_name;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: movie.title,
    description: movie.overview,
    image: backdropUrl(movie.backdrop_path, "original") ?? undefined,
    datePublished: movie.release_date,
    genre: movie.genres.map((genre) => genre.name),
    ...(movie.vote_count > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: movie.vote_average,
        bestRating: 10,
        ratingCount: movie.vote_count,
      },
    }),
  };

  return (
    <div className="pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative">
        {backdrop && (
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={backdrop}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-transparent to-neutral-950/40" />
          </div>
        )}

        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 md:pt-20 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:gap-10">
            <div className="w-44 shrink-0 self-center sm:w-52 md:self-start">
              <div className="group relative aspect-[2/3] overflow-hidden rounded-2xl bg-neutral-900 shadow-2xl shadow-black/60 ring-1 ring-white/15 transition-transform duration-500 hover:-translate-y-2 hover:ring-blue-400/40 md:hover:scale-[1.02]">
                {poster ? (
                  <Image
                    src={poster}
                    alt={movie.title}
                    fill
                    priority
                    sizes="(min-width: 768px) 208px, 176px"
                    className="object-cover"
                  />
                ) : (
                  <span className="grid h-full place-items-center text-xs text-neutral-500">
                    No poster available
                  </span>
                )}
              </div>

              {trailers.length > 0 && (
                <a
                  href="#trailers"
                  className="mt-4 hidden items-center justify-center gap-2 rounded-full bg-white/5 px-4 py-2.5 text-xs font-semibold text-neutral-300 ring-1 ring-white/10 backdrop-blur transition-colors hover:bg-white/10 hover:text-white md:flex"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                    className="size-3.5 text-blue-400"
                  >
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                  Play Trailer
                </a>
              )}
            </div>

            <div className="min-w-0 flex-1 text-center md:text-left">
              {movie.tagline && (
                <p className="hero-enter mb-3 text-sm font-medium italic text-blue-300/90">
                  &ldquo;{movie.tagline}&rdquo;
                </p>
              )}
              <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight drop-shadow-xl sm:text-4xl lg:text-5xl">
                {movie.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:justify-start">
                <ScoreRing vote={movie.vote_average} />
                <div className="text-sm">
                  <p className="font-bold text-neutral-200">
                    {movie.vote_count.toLocaleString()} votes
                  </p>
                  <p className="text-neutral-500">TMDB rating</p>
                </div>
                <span className="hidden h-8 w-px bg-white/10 sm:block" />
                <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-300">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/10">
                    {year ?? "TBA"}
                  </span>
                  {runtime && (
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/10">
                      {runtime}
                    </span>
                  )}
                  <span className="rounded-full bg-blue-600/20 px-3 py-1 text-xs font-bold text-blue-300 ring-1 ring-blue-500/30">
                    HD
                  </span>
                </div>
              </div>

              {movie.genres.length > 0 && (
                <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
                  {movie.genres.map((genre) => (
                    <Link
                      key={genre.id}
                      href={`/genre/${genre.id}`}
                      className="rounded-full bg-white/5 px-3.5 py-1.5 text-xs font-medium text-neutral-300 ring-1 ring-white/10 backdrop-blur-sm transition-all hover:bg-blue-600 hover:text-white hover:ring-blue-500"
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              )}

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <button
                  type="button"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-blue-600 py-3 pl-4 pr-7 text-sm font-bold text-white shadow-xl shadow-blue-600/40 ring-1 ring-blue-400/50 transition-all hover:scale-[1.03] hover:bg-blue-500 active:scale-100"
                >
                  <span className="grid size-8 place-items-center rounded-full bg-white/20 transition-colors group-hover:bg-white/30">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                      className="size-4"
                    >
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                  </span>
                  Watch Now
                </button>
                {trailers.length > 0 && (
                  <a
                    href="#trailers"
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
                      className="size-4 text-blue-400"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M10 9.5l5 2.5-5 2.5v-5z" />
                    </svg>
                    Trailer
                  </a>
                )}
              </div>

              {movie.overview && (
                <div className="mx-auto mt-8 max-w-3xl md:mx-0">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                    Storyline
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-neutral-300 sm:text-base">
                    {movie.overview}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            label="Release"
            value={movie.release_date || "TBA"}
            icon={ICONS.calendar}
          />
          {runtime && <StatCard label="Runtime" value={runtime} icon={ICONS.clock} />}
          <StatCard
            label="Rating"
            value={`${movie.vote_average.toFixed(1)}/10`}
            icon={ICONS.star}
          />
          <StatCard
            label="Votes"
            value={movie.vote_count.toLocaleString()}
            icon={ICONS.users}
          />
        </div>
      </div>

      {(director || writers.length > 0 || budget || revenue || language) && (
        <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Production Facts
            </h2>
            <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
              {director && (
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                    Director
                  </dt>
                  <dd className="mt-0.5 truncate text-sm font-semibold text-neutral-200">
                    {director.name}
                  </dd>
                </div>
              )}
              {writers.length > 0 && (
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                    Writers
                  </dt>
                  <dd className="mt-0.5 truncate text-sm font-semibold text-neutral-200">
                    {writers.map((writer) => writer.name).join(", ")}
                  </dd>
                </div>
              )}
              {language && (
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                    Language
                  </dt>
                  <dd className="mt-0.5 truncate text-sm font-semibold text-neutral-200">
                    {language}
                  </dd>
                </div>
              )}
              {budget && (
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                    Budget
                  </dt>
                  <dd className="mt-0.5 truncate text-sm font-semibold text-neutral-200">
                    {budget}
                  </dd>
                </div>
              )}
              {revenue && (
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                    Revenue
                  </dt>
                  <dd className="mt-0.5 truncate text-sm font-semibold text-neutral-200">
                    {revenue}
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                  Status
                </dt>
                <dd className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-neutral-200">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  {movie.status}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}

      {trailers.length > 0 && (
        <section
          id="trailers"
          className="mx-auto mt-12 max-w-7xl scroll-mt-24 px-4 sm:px-6 lg:px-8"
        >
          <TrailerPlayer trailers={trailers} />
        </section>
      )}

      {cast.length > 0 && (
        <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 flex items-baseline gap-2.5 text-xl font-bold tracking-tight sm:text-2xl">
            Top Billed Cast
            <span className="rounded-full bg-blue-600/15 px-2.5 py-0.5 text-xs font-semibold text-blue-400 ring-1 ring-blue-500/25">
              {cast.length}
            </span>
          </h2>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
            {cast.map((member) => {
              const profile = profileUrl(member.profile_path, "w185");
              return (
                <div
                  key={member.id}
                  className="group/cast w-28 shrink-0 rounded-xl bg-white/[0.03] p-2.5 ring-1 ring-white/10 transition-colors hover:bg-white/[0.06] hover:ring-blue-400/30"
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-900">
                    {profile ? (
                      <Image
                        src={profile}
                        alt={member.name}
                        fill
                        sizes="112px"
                        className="object-cover transition-transform duration-500 group-hover/cast:scale-105"
                      />
                    ) : (
                      <span className="grid h-full place-items-center text-2xl font-bold text-neutral-600">
                        {member.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 line-clamp-1 text-sm font-medium">
                    {member.name}
                  </p>
                  <p className="line-clamp-1 text-xs text-neutral-500">
                    {member.character}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        {similar.results.length > 0 ? (
          <MovieRow
            title="More Like This"
            movies={similar.results.slice(0, 12)}
          />
        ) : (
          <div className="rounded-xl bg-neutral-900 p-6 text-center text-neutral-400 ring-1 ring-white/5">
            No similar movies found.{" "}
            <Link href="/" className="text-blue-400 hover:underline">
              Back to home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
