import { ratingColor } from "@/components/rating-badge";

export default function ScoreRing({
  vote,
  size = 64,
}: {
  vote: number;
  size?: number;
}) {
  const score = Math.max(0, Math.min(10, vote));
  const percent = score * 10;
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const dash = (percent / 100) * circumference;
  const color =
    score >= 7 ? "#34d399" : score >= 5.5 ? "#fbbf24" : "#fb7185";

  return (
    <div
      className="relative inline-grid shrink-0 place-items-center rounded-full bg-neutral-950/80 ring-1 ring-white/10"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Rated ${score.toFixed(1)} out of 10`}
    >
      <svg
        viewBox="0 0 100 100"
        aria-hidden
        className="absolute inset-0 -rotate-90"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
        />
      </svg>
      <span
        className={`text-sm font-extrabold ${ratingColor(score)}`}
        style={{ fontSize: size / 3.4 }}
      >
        {score > 0 ? score.toFixed(1) : "N/A"}
      </span>
    </div>
  );
}
