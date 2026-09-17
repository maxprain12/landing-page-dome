import type { Locale } from "../i18n";
import { AUTHOR_EMAIL, AUTHOR_NAME, SITE_NAME, absoluteUrl } from "./site";

interface Person {
  "@type": "Person";
  name: string;
  email: string;
}

const author: Person = {
  "@type": "Person",
  name: AUTHOR_NAME,
  email: AUTHOR_EMAIL,
};

export function softwareJsonLd(origin: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "DesktopApplication",
    operatingSystem: ["macOS", "Windows", "Linux"],
    description,
    url: origin,
    author,
    license: "https://github.com/maxprain12/dome/blob/main/LICENSE",
    featureList: [
      "Local-first library",
      "People records with history",
      "Many drafts with human approval",
      "Ollama or bring-your-own provider keys",
    ],
  };
}

export function webSiteJsonLd(origin: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: origin,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: origin,
    },
  };
}

export function collectionJsonLd(args: {
  origin: string;
  url: string;
  name: string;
  description: string;
  items: { name: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: args.name,
    description: args.description,
    url: args.url,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: args.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };
}

export function blogPostingJsonLd(args: {
  origin: string;
  url: string;
  title: string;
  description: string;
  image: string;
  locale: Locale;
  publishedAt: Date;
  updatedAt?: Date;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: args.title,
    description: args.description,
    image: absoluteUrl(args.image, args.origin),
    url: args.url,
    inLanguage: args.locale === "es" ? "es-ES" : "en-US",
    datePublished: args.publishedAt.toISOString(),
    dateModified: (args.updatedAt ?? args.publishedAt).toISOString(),
    author,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: args.origin,
    },
  };
}

export function techArticleJsonLd(args: {
  origin: string;
  url: string;
  title: string;
  description: string;
  image: string;
  locale: Locale;
  publishedAt: Date;
  updatedAt?: Date;
  steps?: { name: string; text: string }[];
}) {
  if (args.steps?.length) {
    return {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: args.title,
      description: args.description,
      image: absoluteUrl(args.image, args.origin),
      url: args.url,
      inLanguage: args.locale === "es" ? "es-ES" : "en-US",
      step: args.steps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.name,
        text: step.text,
      })),
    };
  }
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: args.title,
    description: args.description,
    image: absoluteUrl(args.image, args.origin),
    url: args.url,
    inLanguage: args.locale === "es" ? "es-ES" : "en-US",
    datePublished: args.publishedAt.toISOString(),
    dateModified: (args.updatedAt ?? args.publishedAt).toISOString(),
    author,
  };
}

export function contactJsonLd(origin: string, url: string, email: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `${SITE_NAME} — Contact`,
    url,
    description,
    mainEntity: {
      "@type": "Organization",
      name: SITE_NAME,
      url: origin,
      email,
    },
  };
}

export function breadcrumbJsonLd(origin: string, crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path, origin),
    })),
  };
}
