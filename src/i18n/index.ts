import { en } from "./en";
import { es } from "./es";
import type { Dictionary, Locale } from "./types";

export type { Dictionary, Locale } from "./types";

export const locales: Locale[] = ["es", "en"];
export const defaultLocale: Locale = "es";

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function isLocale(value: string): value is Locale {
  return value === "es" || value === "en";
}

export function t(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function localizePath(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const normalized = clean === "/" ? "/" : clean.replace(/\/+$/, "");
  if (locale === defaultLocale) return normalized;
  if (normalized === "/") return `/${locale}/`;
  return `/${locale}${normalized}`;
}

export function stripLocalePrefix(pathname: string): string {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  if (normalized === "/en") return "/";
  if (normalized.startsWith("/en/")) {
    const rest = normalized.slice(3);
    return rest || "/";
  }
  return normalized;
}

export function alternatePath(pathname: string, target: Locale): string {
  return localizePath(stripLocalePrefix(pathname), target);
}

export function localeFromPath(pathname: string): Locale {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  if (normalized === "/en" || normalized.startsWith("/en/")) return "en";
  return "es";
}

export function localeHome(locale: Locale): string {
  return localizePath("/", locale);
}
