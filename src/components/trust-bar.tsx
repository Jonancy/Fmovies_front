const TRUST_ITEMS = [
  {
    title: "100,000+ Titles",
    description: "Movies across every genre",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="size-6"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" />
      </svg>
    ),
  },
  {
    title: "HD Quality",
    description: "Crisp trailers & imagery",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="size-6"
      >
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M10 9.5l4 2.5-4 2.5v-5z" />
        <path d="M6 10v4M6 12h2" />
      </svg>
    ),
  },
  {
    title: "Always Free",
    description: "No account, no paywall",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="size-6"
      >
        <path d="M20 12V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h14" />
        <path d="M17 14l-1.5 2h3L17 18" />
      </svg>
    ),
  },
  {
    title: "Updated Daily",
    description: "Fresh releases & trends",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="size-6"
      >
        <path d="M21 12a9 9 0 11-2.64-6.36L21 8" />
        <path d="M21 3v5h-5" />
      </svg>
    ),
  },
] as const;

export default function TrustBar() {
  return (
    <section aria-label="Why FMovies" className="border-t border-white/5">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        {TRUST_ITEMS.map((item) => (
          <div key={item.title} className="flex items-start gap-3.5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue-600/15 text-blue-400 ring-1 ring-blue-500/25">
              {item.icon}
            </span>
            <div>
              <p className="text-sm font-bold text-neutral-100">{item.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-neutral-500">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
