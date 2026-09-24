// Enlaces y flags de producto. El copy vive en src/i18n.

import { localizePath, type Locale } from "../i18n";

const providerUrl = "https://dome-provider.dowi.es";

export const links = {
  releases: "/download",
  github: "https://github.com/maxprain12/dome",
  docs: "https://github.com/maxprain12/dome#readme",
  changelog: "/changelog",
  license: "https://github.com/maxprain12/dome/blob/main/LICENSE",
  login: import.meta.env.PUBLIC_DOME_ACCOUNT_URL || `${providerUrl}/login`,
  register: `${providerUrl}/register`,
  email: "alder.velasquezobando@gmail.com",
};

export function downloadUrl(locale: Locale): string {
  return localizePath("/download", locale);
}

export function changelogUrl(locale: Locale): string {
  return localizePath("/changelog", locale);
}

export const flags = {
  showPricing: false,
};

export const brand = {
  name: "Dome",
  logo: "/assets/many.png",
  many: "/assets/many.png",
};

export interface NavLink {
  label: string;
  href: string;
}

export interface Plan {
  id: "dome_free" | "dome_starter" | "dome_cloud" | "dome_max";
  name: string;
  priceUsd: number;
  tagline: string;
  features: string[];
  cta: NavLink;
  highlighted?: boolean;
}

/** Copy provisional — no publicar hasta flags.showPricing. El plan destacado no se llama Pro. */
export const plans: Plan[] = [
  {
    id: "dome_free",
    name: "Free",
    priceUsd: 0,
    tagline: "Aplicación local y proveedor propio.",
    features: ["Aplicación de escritorio", "Biblioteca local", "Ollama o tus API keys"],
    cta: { label: "Descargar", href: links.releases },
  },
  {
    id: "dome_starter",
    name: "Starter",
    priceUsd: 9,
    tagline: "Créditos Dome y sync básico.",
    features: ["Créditos Dome", "Sincronización básica", "2 GB en la nube"],
    cta: { label: "Starter", href: `${links.register}?plan=dome_starter` },
  },
  {
    id: "dome_cloud",
    name: "Cloud",
    priceUsd: 19,
    tagline: "Más créditos y servicios cloud.",
    features: ["Más créditos", "Sincronización", "Servicios cloud", "10 GB"],
    cta: { label: "Cloud", href: `${links.register}?plan=dome_pro` },
    highlighted: true,
  },
  {
    id: "dome_max",
    name: "Max",
    priceUsd: 49,
    tagline: "Límites altos y modelos disponibles.",
    features: ["Más créditos", "Todo lo de Cloud", "Modelos disponibles", "50 GB"],
    cta: { label: "Max", href: `${links.register}?plan=dome_max` },
  },
];
