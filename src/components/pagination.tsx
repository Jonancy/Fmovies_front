import Link from "next/link";

interface PaginationProps {
  basePath: string;
  page: number;
  totalPages: number;
  extraParams?: Record<string, string>;
}

function buildHref(
  basePath: string,
  extraParams: Record<string, string>,
  page: number,
) {
  const search = new URLSearchParams({ ...extraParams, page: String(page) });
  return `${basePath}?${search.toString()}`;
}

export default function Pagination({
  basePath,
  page,
  totalPages,
  extraParams = {},
}: PaginationProps) {
  const pages = Math.min(totalPages, 500);
  if (pages <= 1) return null;

  const hasPrev = page > 1;
  const hasNext = page < pages;

  return (
    <nav
      className="mt-12 flex items-center justify-center gap-3"
      aria-label="Pagination"
    >
      {hasPrev ? (
        <Link
          href={buildHref(basePath, extraParams, page - 1)}
          className="rounded-full bg-white/5 px-5 py-2 text-sm font-medium text-neutral-200 ring-1 ring-white/10 transition-colors hover:bg-white/10"
        >
          Previous
        </Link>
      ) : (
        <span className="cursor-not-allowed rounded-full bg-white/5 px-5 py-2 text-sm font-medium text-neutral-600 ring-1 ring-white/5">
          Previous
        </span>
      )}
      <span className="text-sm text-neutral-400">
        Page {page.toLocaleString()} of {pages.toLocaleString()}
      </span>
      {hasNext ? (
        <Link
          href={buildHref(basePath, extraParams, page + 1)}
          className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
        >
          Next
        </Link>
      ) : (
        <span className="cursor-not-allowed rounded-full bg-white/5 px-5 py-2 text-sm font-medium text-neutral-600 ring-1 ring-white/5">
          Next
        </span>
      )}
    </nav>
  );
}
