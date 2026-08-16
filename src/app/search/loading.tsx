export default function SearchLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="h-8 w-64 animate-pulse rounded-lg bg-white/5" />
      <div className="mt-8 flex flex-wrap gap-4">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="w-36 shrink-0 sm:w-40">
            <div className="aspect-[2/3] animate-pulse rounded-xl bg-white/5" />
            <div className="mt-2 h-3.5 w-3/4 animate-pulse rounded bg-white/5" />
            <div className="mt-1.5 h-3 w-1/2 animate-pulse rounded bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
