"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Popular", href: "/movies/popular" },
  { label: "Top Rated", href: "/movies/top-rated" },
  { label: "New Releases", href: "/movies/now-playing" },
  { label: "Genres", href: "/genres" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
      className={className}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function SearchBox({ autoFocus = false }: { autoFocus?: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (
        event.key === "/" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey &&
        document.activeElement?.tagName !== "INPUT"
      ) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <form action="/search" className="w-full sm:w-auto">
      <label className="group relative block">
        <span className="sr-only">Search movies</span>
        <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-500 transition-colors group-focus-within:text-blue-400" />
        <input
          ref={inputRef}
          type="search"
          name="q"
          placeholder="Search movies..."
          autoComplete="off"
          autoFocus={autoFocus}
          className="w-full rounded-full border border-white/10 bg-white/5 py-2 pl-10 pr-12 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none transition-all focus:border-blue-500/60 focus:bg-white/10 focus:ring-2 focus:ring-blue-500/20 sm:w-64 lg:w-72"
        />
        <kbd className="pointer-events-none absolute right-3.5 top-1/2 hidden -translate-y-1/2 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-semibold text-neutral-500 lg:block">
          /
        </kbd>
      </label>
    </form>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-neutral-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:gap-8 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-sm font-black text-white shadow-lg shadow-blue-600/25 transition-transform group-hover:scale-105">
            F
          </span>
          <span className="hidden text-lg font-bold tracking-tight min-[420px]:inline">
            F<span className="text-blue-400">Movies</span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 text-sm font-medium lg:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-full px-3.5 py-2 transition-colors ${
                  active
                    ? "text-white"
                    : "text-neutral-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-3.5 -bottom-px h-0.5 rounded-full bg-blue-500 transition-all duration-300 ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0 lg:justify-end">
          <div className="hidden sm:block">
            <SearchBox />
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full text-neutral-300 ring-1 ring-white/10 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden
              className={`size-5 transition-transform duration-300 ${
                menuOpen ? "rotate-90" : ""
              }`}
            >
              {menuOpen ? (
                <>
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <div className="space-y-1 border-t border-white/5 px-4 py-4 sm:px-6">
            <div className="pb-2 sm:hidden">
              <SearchBox autoFocus={menuOpen} />
            </div>
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    active
                      ? "bg-blue-600/15 text-blue-400 ring-1 ring-blue-500/30"
                      : "text-neutral-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                    className="size-4 opacity-40"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
