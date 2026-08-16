export function ratingColor(vote: number) {
  if (vote >= 7) return "text-emerald-400";
  if (vote >= 5.5) return "text-amber-400";
  return "text-rose-400";
}

export default function RatingBadge({ vote }: { vote: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-neutral-950/80 px-1.5 py-0.5 text-xs font-semibold backdrop-blur-sm">
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        className={`size-3 ${ratingColor(vote)}`}
      >
        <path d="M12 2l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.02l-5.88 3.09 1.12-6.55L2.48 8.92l6.58-.96L12 2z" />
      </svg>
      <span className={ratingColor(vote)}>
        {vote > 0 ? vote.toFixed(1) : "N/A"}
      </span>
    </span>
  );
}
