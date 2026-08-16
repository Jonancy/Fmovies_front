import MovieGridSkeleton from "@/components/movie-grid-skeleton";

export default function CategoryLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <MovieGridSkeleton />
    </div>
  );
}
