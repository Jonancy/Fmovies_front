"use client";

import { useState } from "react";

export interface Trailer {
  id: string;
  key: string;
  name: string;
}

export default function TrailerPlayer({ trailers }: { trailers: Trailer[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = trailers[activeIndex];

  if (!active) return null;

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
        Trailers
      </h2>

      <div className="overflow-hidden rounded-xl bg-black ring-1 ring-white/10">
        <div className="aspect-video">
          <iframe
            key={active.key}
            src={`https://www.youtube-nocookie.com/embed/${active.key}?rel=0`}
            title={active.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full"
            loading="lazy"
          />
        </div>
      </div>

      {trailers.length > 1 && (
        <div className="no-scrollbar -mx-4 mt-4 flex gap-3 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {trailers.map((trailer, index) => (
            <button
              key={trailer.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-current={index === activeIndex}
              className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium ring-1 transition-colors ${
                index === activeIndex
                  ? "bg-blue-600 text-white ring-blue-500"
                  : "bg-white/5 text-neutral-300 ring-white/10 hover:bg-white/10"
              }`}
            >
              <span className="mr-1.5 inline-flex items-center gap-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                  className="size-3"
                >
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
                {index + 1}
              </span>
              <span className="max-w-48 truncate align-middle">
                {trailer.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
