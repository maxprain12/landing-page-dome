import { ANALYTICS_HOSTS, CONSENT_KEY, CONSENT_VERSION, GA_ID, GTM_ID } from "../lib/analytics";

interface Decision {
  analytics: boolean;
  at: string;
  v: number;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

const root = document.documentElement;
let loaded = false;

function readConsent(): Decision | null {
  try {
    const raw = JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "null") as Decision | null;
    return raw && typeof raw.analytics === "boolean" && raw.v === CONSENT_VERSION ? raw : null;
  } catch {
    return null;
  }
}

function writeConsent(decision: Decision) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(decision));
  } catch {
    /* storage unavailable: the banner asks again next time */
  }
}

function gtag(..._args: unknown[]) {
  // Tag Manager reads the `arguments` object gtag pushes, not an array.
  (window.dataLayer ??= []).push(arguments);
}

function startAnalytics() {
  if (!ANALYTICS_HOSTS.includes(location.hostname)) return;
  window[`ga-disable-${GA_ID}`] = false;
  if (loaded) {
    gtag("consent", "update", { analytics_storage: "granted" });
    return;
  }
  loaded = true;
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    wait_for_update: 500,
  });
  gtag("consent", "update", { analytics_storage: "granted" });
  (window.dataLayer ??= []).push({ "gtm.start": Date.now(), event: "gtm.js" });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.append(script);
}

/** Stops reporting and removes the analytics cookies the site set (on the host and on its parent domain). */
function stopAnalytics() {
  if (loaded) gtag("consent", "update", { analytics_storage: "denied" });
  window[`ga-disable-${GA_ID}`] = true;
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim() ?? "";
    if (!name.startsWith("_ga")) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

function apply(decision: Decision | null) {
  if (decision?.analytics) startAnalytics();
  else stopAnalytics();
}

function setBannerOpen(open: boolean) {
  root.classList.toggle("consent-pending", open);
}

apply(readConsent());

document.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const choice = target?.closest<HTMLElement>("[data-consent-choice]");
  if (choice) {
    const decision: Decision = {
      analytics: choice.dataset.consentChoice === "accept",
      at: new Date().toISOString(),
      v: CONSENT_VERSION,
    };
    writeConsent(decision);
    setBannerOpen(false);
    apply(decision);
    return;
  }
  if (target?.closest("[data-consent-reopen]")) {
    setBannerOpen(true);
    document.querySelector<HTMLElement>("[data-consent-choice='reject']")?.focus();
  }
});
