import { changelogUrl, links } from "./landing";
import { localeHome, localizePath, type Dictionary, type Locale } from "../i18n";

export type NavItem = {
  href: string;
  label: string;
  hint?: string;
  external?: boolean;
};

export type NavColumn = {
  heading: string;
  items: NavItem[];
};

export type NavMenu = {
  id: "product" | "resources";
  label: string;
  columns: NavColumn[];
};

export function accountUrl(): string {
  return import.meta.env.PUBLIC_DOME_ACCOUNT_URL || links.login;
}

function hash(locale: Locale, id: string): string {
  const home = localeHome(locale);
  const base = home === "/" ? "" : home.replace(/\/$/, "");
  return `${base}/${id}`;
}

export function navMenus(locale: Locale, copy: Dictionary): NavMenu[] {
  return [{ id: "resources", label: copy.nav.resources, columns: [{ heading: copy.nav.learnCol, items: [
    { href: localizePath("/blog", locale), label: copy.nav.blog },
    { href: changelogUrl(locale), label: copy.footer.changelog },
    { href: localizePath("/contact", locale), label: copy.nav.contact },
  ] }] }];
}

export function navDirectLinks(locale: Locale, copy: Dictionary): NavItem[] {
  return [
    { href: localizePath("/funciones", locale), label: locale === "es" ? "Funciones" : "Features" },
    { href: localizePath("/complementos", locale), label: locale === "es" ? "Complementos" : "Add-ons" },
    { href: localizePath("/extension", locale), label: copy.nav.extension },
    { href: localizePath("/companion", locale), label: locale === "es" ? "App móvil" : "Mobile app" },
    { href: localizePath("/manual", locale), label: copy.nav.manuals },
  ];
}
