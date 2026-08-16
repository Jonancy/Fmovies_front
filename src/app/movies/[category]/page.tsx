import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getNowPlaying,
  getPopular,
  getTopRated,
  getTrending,
  getUpcoming,
} from "@/lib/tmdb";
import type { Paginated, Movie } from "@/types/tmdb";
import MovieGrid from "@/components/movie-grid";
import Pagination from "@/components/pagination";

const CATEGORIES = {
  trending: {
    title: "Trending This Week",
    description: "The most watched movies right now.",
    fetchPage: (page: number) => getTrending("week", page),
  },
  popular: {
    title: "Popular Movies",
    description: "What everyone is watching right now.",
    fetchPage: (page: number) => getPopular(page),
  },
  "top-rated": {
    title: "Top Rated Movies",
    description: "The highest rated movies of all time.",
    fetchPage: (page: number) => getTopRated(page),
  },
  "now-playing": {
    title: "New Releases",
    description: "Movies currently in theaters.",
    fetchPage: (page: number) => getNowPlaying(page),
  },
  upcoming: {
    title: "Upcoming Movies",
    description: "Movies heading to a screen near you soon.",
    fetchPage: (page: number) => getUpcoming(page),
  },
} as const satisfies Record<
  string,
  {
    title: string;
    description: string;
    fetchPage: (page: number) => Promise<Paginated<Movie>>;
  }
>;

type Category = keyof typeof CATEGORIES;

export function generateStaticParams() {
  return (Object.keys(CATEGORIES) as Category[]).map((category) => ({
    category,
  }));
}

function parseCategory(category: string): Category | null {
  return category in CATEGORIES ? (category as Category) : null;
}

export async function generateMetadata({
  params,
}: PageProps<"/movies/[category]">): Promise<Metadata> {
  const { category } = await params;
  const config = parseCategory(category);
  if (!config) return { title: "Movies" };
  return {
    title: CATEGORIES[config].title,
    description: CATEGORIES[config].description,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps<"/movies/[category]">) {
  const { category } = await params;
  const key = parseCategory(category);
  if (!key) notFound();

  const sp = await searchParams;
  const page = Math.max(
    1,
    Math.trunc(Number(typeof sp.page === "string" ? sp.page : 1)) || 1,
  );

  const movies = await CATEGORIES[key].fetchPage(page);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {CATEGORIES[key].title}
        </h1>
        <p className="text-sm text-neutral-400">
          Page {page.toLocaleString()} of{" "}
          {Math.min(movies.total_pages, 500).toLocaleString()}
        </p>
      </div>

      <MovieGrid movies={movies.results} />

      <Pagination
        basePath={`/movies/${key}`}
        page={page}
        totalPages={movies.total_pages}
      />
    </div>
  );
}
