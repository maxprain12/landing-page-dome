export const SITE_NAME = "Dome";
export const DEFAULT_OG_IMAGE = "/social.png";
export const AUTHOR_NAME = "Alder Velasquez";
export const AUTHOR_EMAIL = "alder.velasquezobando@gmail.com";

export function siteOrigin(site?: URL | string | undefined): string {
  if (typeof site === "string" && site) return site.replace(/\/$/, "");
  if (site instanceof URL) return site.origin;
  return "https://dome.dowi.es";
}

export function absoluteUrl(path: string, origin: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${clean}`;
}
