import { changelogUrl, links } from "./landing";
import { localizePath, type Dictionary, type Locale } from "../i18n";
import { comparisons, comparisonPath } from "./comparisons";

export type NavItem = {
  href: string;
  label: string;
  external?: boolean;
  description?: string;
  mark?: string;
  icon?: string;
  tone?: string;
};

export type NavColumn = {
  heading: string;
  headingHref?: string;
  variant?: "audience";
  items: NavItem[];
};

export type NavMenu = {
  id: "resources" | "product" | "connectors";
  label: string;
  columns: NavColumn[];
};

export function accountUrl(): string {
  return import.meta.env.PUBLIC_DOME_ACCOUNT_URL || links.login;
}

export function navMenus(locale: Locale, copy: Dictionary): NavMenu[] {
  const path = (value: string) => localizePath(value, locale);
  const catalog = path("/complementos");

  return [
    {
      id: "resources",
      label: copy.nav.resources,
      columns: [
        {
          heading: copy.nav.exploreCol,
          items: [
            { href: path("/blog"), label: copy.nav.blog },
            { href: path("/manual"), label: copy.nav.manuals },
            { href: path("/sobre-nosotros"), label: copy.nav.about },
            { href: changelogUrl(locale), label: copy.nav.updates },
          ],
        },
        {
          heading: copy.nav.addOnsCol,
          headingHref: catalog,
          items: [
            { href: path("/extension"), label: copy.nav.extension },
            { href: path("/many-agents"), label: copy.nav.manyAgents },
          ],
        },
        {
          heading: copy.nav.accessCol,
          items: [
            { href: accountUrl(), label: copy.nav.login },
            { href: path("/contact"), label: copy.nav.contact },
          ],
        },
      ],
    },
    {
      id: "product",
      label: copy.nav.product,
      columns: [
        {
          heading: copy.nav.audienceCol,
          variant: "audience",
          items: [
            { href: path("/para/estudiantes"), label: copy.nav.students },
            { href: path("/para/marketing"), label: copy.nav.marketing },
            { href: path("/para/equipos"), label: copy.nav.teams },
          ],
        },
        {
          heading: copy.nav.servicesCol,
          items: [
            { href: path("/funciones/editor"), label: copy.nav.notesDocs },
            { href: path("/funciones/learning"), label: copy.nav.studyLearning },
            { href: path("/para/equipos"), label: copy.nav.teamManagement },
            { href: path("/funciones/workflows"), label: copy.nav.automations },
            { href: path("/funciones/library"), label: copy.nav.librarySearch },
          ],
        },
        {
          heading: copy.nav.addOnsCol,
          headingHref: catalog,
          items: [
            { href: path("/funciones/integrations"), label: copy.nav.integrations },
            { href: path("/companion"), label: copy.nav.mobileApp },
            { href: path("/many-agents"), label: copy.nav.manyAgents },
          ],
        },
      ],
    },
    {
      id: "connectors",
      label: copy.nav.connectors,
      columns: [
        { heading: locale === "es" ? "Documentos y proyectos" : "Docs and projects", items: [0, 2, 4, 6].map((index) => comparisons[index]).map((item) => ({ href: comparisonPath(item.slug, locale), label: `vs ${item.name}`, description: item.locales[locale].teaser, mark: item.mark, icon: item.icon, tone: item.tone })) },
        { heading: locale === "es" ? "Creación y notas" : "Creation and notes", items: [1, 3, 5, 7].map((index) => comparisons[index]).map((item) => ({ href: comparisonPath(item.slug, locale), label: `vs ${item.name}`, description: item.locales[locale].teaser, mark: item.mark, icon: item.icon, tone: item.tone })) },
      ],
    },
  ];
}
