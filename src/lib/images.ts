const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export type PosterSize = "w185" | "w342" | "w500" | "original";
export type BackdropSize = "w780" | "w1280" | "original";
export type ProfileSize = "w185" | "h632" | "original";

export function posterUrl(path: string | null, size: PosterSize = "w500") {
  return path ? `${IMAGE_BASE_URL}/${size}${path}` : null;
}

export function backdropUrl(path: string | null, size: BackdropSize = "w1280") {
  return path ? `${IMAGE_BASE_URL}/${size}${path}` : null;
}

export function profileUrl(path: string | null, size: ProfileSize = "w185") {
  return path ? `${IMAGE_BASE_URL}/${size}${path}` : null;
}

export function releaseYear(date: string | undefined | null) {
  if (!date) return null;
  const year = date.slice(0, 4);
  return year.length === 4 ? year : null;
}

export function formatRuntime(minutes: number | null | undefined) {
  if (!minutes) return null;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return hours > 0 ? `${hours}h ${rest}m` : `${rest}m`;
}
