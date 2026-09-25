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
  return [
    {
      id: "product",
      label: copy.nav.product,
      columns: [
        {
          heading: copy.nav.productCol,
          items: [
            { href: hash(locale, "#como-funciona"), label: copy.nav.how, hint: copy.nav.howHint },
            { href: hash(locale, "#ediciones"), label: copy.nav.editions, hint: copy.nav.editionsHint },
            { href: hash(locale, "#confianza"), label: copy.nav.trust, hint: copy.nav.trustHint },
            { href: localizePath("/local-first", locale), label: copy.footer.localFirst, hint: copy.nav.localFirstHint },
          ],
        },
        {
          heading: copy.nav.editionsCol,
          items: [
            { href: localizePath("/pro", locale), label: copy.footer.pro, hint: copy.nav.proHint },
            { href: localizePath("/study", locale), label: copy.footer.study, hint: copy.nav.studyHint },
            { href: localizePath("/dev", locale), label: copy.footer.dev, hint: copy.nav.devHint },
          ],
        },
        {
          heading: copy.nav.appsCol,
          items: [
            { href: localizePath("/companion", locale), label: copy.nav.companion, hint: copy.nav.companionHint },
            { href: localizePath("/extension", locale), label: copy.nav.extension, hint: copy.nav.extensionHint },
          ],
        },
      ],
    },
    {
      id: "resources",
      label: copy.nav.resources,
      columns: [
        {
          heading: copy.nav.learnCol,
          items: [
            { href: localizePath("/blog", locale), label: copy.nav.blog, hint: copy.nav.blogHint },
            { href: localizePath("/manual", locale), label: copy.nav.manuals, hint: copy.nav.manualsHint },
            { href: hash(locale, "#faq"), label: copy.nav.faq, hint: copy.nav.faqHint },
          ],
        },
        {
          heading: copy.nav.projectCol,
          items: [
            { href: changelogUrl(locale), label: copy.footer.changelog, hint: copy.nav.changelogHint },
          ],
        },
      ],
    },
  ];
}

export function navDirectLinks(locale: Locale, copy: Dictionary): NavItem[] {
  return [
    { href: localizePath("/pricing", locale), label: copy.nav.pricing },
    { href: localizePath("/contact", locale), label: copy.nav.contact },
  ];
}
