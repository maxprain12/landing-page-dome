// Animaciones sutiles de la landing con GSAP + ScrollTrigger.
//  - El contenido es VISIBLE por defecto en el HTML (SEO / no-JS).
//  - Si el usuario pide menos movimiento, no hacemos nada.
//  - Solo entonces ocultamos el estado inicial y lo revelamos al hacer scroll.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

const EDITIONS = ["pro", "study", "dev"] as const;
const SHOT_ASPECT = 2880 / 1920;
const MOBILE_MQ = "(max-width: 860px)";

let disposeHero: (() => void) | null = null;

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function smoothstep(value: number): number {
  const x = clamp01(value);
  return x * x * (3 - 2 * x);
}

function cssLengthPx(value: string): number {
  const raw = value.trim();
  if (!raw) return 0;
  const n = Number.parseFloat(raw);
  if (!Number.isFinite(n)) return 0;
  if (raw.endsWith("rem")) {
    const rem = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return n * rem;
  }
  return n;
}

function initHeroStory(reduce: boolean): void {
  disposeHero?.();
  disposeHero = null;

  const root = document.querySelector<HTMLElement>("[data-hero-story]");
  if (!root) return;

  const track = root.querySelector<HTMLElement>("[data-story-track]");
  const pin = root.querySelector<HTMLElement>("[data-story-pin]");
  const shell = root.querySelector<HTMLElement>("[data-appshell]");
  if (!track || !pin) return;

  const ac = new AbortController();
  disposeHero = () => {
    ac.abort();
    ScrollTrigger.getById("hero-story")?.kill();
  };

  const tabs = Array.from(pin.querySelectorAll<HTMLButtonElement>("[data-edition-tab]"));
  const items = Array.from(pin.querySelectorAll<HTMLElement>("[data-edition]"));
  const photos = Array.from(pin.querySelectorAll<HTMLElement>("[data-story-photo]"));

  const applyEdition = (id: string) => {
    root.dataset.edition = id;
    items.forEach((item) => {
      const open = item.dataset.edition === id;
      item.toggleAttribute("data-active", open);
      const tab = item.querySelector<HTMLButtonElement>("[data-edition-tab]");
      if (tab) tab.setAttribute("aria-expanded", String(open));
    });
    const tab = tabs.find((btn) => btn.dataset.editionTab === id);
    if (shell && tab?.dataset.view) shell.dataset.view = tab.dataset.view;
    photos.forEach((photo) => {
      photo.toggleAttribute("data-on", photo.dataset.storyPhoto === id);
    });
  };

  const applyPillarShell = () => {
    const pillar = root.dataset.pillar ?? "documentos";
    const pill = root.querySelector<HTMLButtonElement>(`[data-hero-pill="${pillar}"]`);
    if (shell && pill?.dataset.view) shell.dataset.view = pill.dataset.view;
    photos.forEach((photo) => photo.removeAttribute("data-on"));
  };

  const applyPhase = (phase: "peek" | "full" | "editions") => {
    if (root.dataset.phase === phase) return;
    root.dataset.phase = phase;
  };

  let peekCopyH = 0;
  let lastReveal = 0;
  let lastSplit = 0;
  const lockShotSize = () => {
    const copy = root.querySelector<HTMLElement>("[data-hero-copy]");
    const stage = pin.querySelector<HTMLElement>("[data-story-stage]");
    if (!stage) return;
    const visualH = copy?.getBoundingClientRect().height ?? 0;
    if (visualH > peekCopyH) peekCopyH = visualH;
    const pinCs = getComputedStyle(pin);
    const padY = cssLengthPx(pinCs.paddingTop) + cssLengthPx(pinCs.paddingBottom);
    const railW = cssLengthPx(pinCs.getPropertyValue("--rail-w"));
    const reserved = peekCopyH || (copy?.scrollHeight ?? 0) || 96;
    const availH = Math.max(220, pin.clientHeight - padY - reserved - 16);
    const availW = Math.max(220, stage.clientWidth - 56 - (railW + 32));
    let height = availH;
    let width = height * SHOT_ASPECT;
    if (width > availW) {
      width = availW;
      height = width / SHOT_ASPECT;
    }
    pin.style.setProperty("--shot-w", `${Math.round(width)}px`);
    pin.style.setProperty("--shot-h", `${Math.round(height)}px`);
  };

  const stacked = window.matchMedia(MOBILE_MQ).matches;
  if (stacked || reduce) {
    document.documentElement.classList.remove("hero-pin");
    root.style.setProperty("--reveal", "0");
    pin.style.removeProperty("--shot-w");
    pin.style.removeProperty("--shot-h");
    pin.style.removeProperty("padding-top");
    applyPhase("editions");
    applyEdition("pro");
    root.style.setProperty("--split", "1");
    root.style.setProperty("--rail-fill", "1");
    tabs.forEach((tab) => {
      tab.addEventListener(
        "click",
        () => {
          const id = tab.dataset.editionTab;
          if (id) {
            root.style.setProperty("--rail-fill", "1");
            applyEdition(id);
          }
        },
        { signal: ac.signal },
      );
    });
    return;
  }

  document.documentElement.classList.add("hero-pin");
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  window.addEventListener(
    "resize",
    () => {
      lockShotSize();
      ScrollTrigger.refresh();
    },
    { signal: ac.signal },
  );
  let lastEdition = "";
  let lastFill = -1;

  const storyTrigger = ScrollTrigger.create({
    id: "hero-story",
    trigger: pin,
    start: "top 4.75rem",
    end: "+=520%",
    pin: true,
    anticipatePin: 1,
    scrub: 1.15,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      const p = self.progress;
      const reveal = smoothstep(p / 0.28);
      const split = smoothstep((p - 0.34) / 0.14);

      if (Math.abs(reveal - lastReveal) > 0.0008) {
        lastReveal = reveal;
        root.style.setProperty("--reveal", reveal.toFixed(4));
      }
      if (Math.abs(split - lastSplit) > 0.0008) {
        lastSplit = split;
        root.style.setProperty("--split", split.toFixed(4));
      }

      if (p < 0.3) applyPhase("peek");
      else if (p < 0.42) applyPhase("full");
      else applyPhase("editions");

      if (p >= 0.48) {
        const scaled = clamp01((p - 0.48) / 0.52) * 3;
        const slice = Math.min(2, Math.floor(scaled));
        const next = EDITIONS[slice] ?? "pro";
        const fill = Math.max(0.12, scaled - slice);
        if (Math.abs(fill - lastFill) > 0.0008) {
          lastFill = fill;
          root.style.setProperty("--rail-fill", fill.toFixed(4));
        }
        if (lastEdition !== next) {
          lastEdition = next;
          applyEdition(next);
        }
      } else if (lastEdition !== "") {
        lastEdition = "";
        lastFill = 0;
        root.style.setProperty("--rail-fill", "0");
        applyPillarShell();
      }
    },
  });

  const scrollToProgress = (progress: number) => {
    const y = storyTrigger.start + clamp01(progress) * (storyTrigger.end - storyTrigger.start);
    gsap.to(window, {
      scrollTo: { y, autoKill: true },
      duration: 1.05,
      ease: "power3.inOut",
      overwrite: true,
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener(
      "click",
      () => {
        const id = tab.dataset.editionTab;
        if (!id) return;
        scrollToProgress(0.5 + ((index + 0.28) / 3) * 0.5);
      },
      { signal: ac.signal },
    );
  });

  const jumpToEditions = (event?: Event) => {
    event?.preventDefault();
    scrollToProgress(0.52);
  };

  document.querySelectorAll<HTMLAnchorElement>('a[href*="#ediciones"]').forEach((link) => {
    link.addEventListener(
      "click",
      (event) => {
        const url = new URL(link.href, window.location.href);
        if (url.pathname === window.location.pathname || url.hash === "#ediciones") {
          jumpToEditions(event);
        }
      },
      { signal: ac.signal },
    );
  });

  if (window.location.hash === "#ediciones") {
    requestAnimationFrame(() => jumpToEditions());
  }

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
}

function initReveals(): void {
  gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
    gsap.set(el, { opacity: 0, y: 24 });
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () =>
        gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }),
    });
  });

  gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
    const items = gsap.utils.toArray<HTMLElement>(":scope > *", group);
    if (!items.length) return;
    gsap.set(items, { opacity: 0, y: 24 });
    ScrollTrigger.create({
      trigger: group,
      start: "top 88%",
      once: true,
      onEnter: () =>
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
        }),
    });
  });
}

function init(): void {
  const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobileMq = window.matchMedia(MOBILE_MQ);
  const bootHero = () => initHeroStory(reduceMq.matches);
  bootHero();
  mobileMq.addEventListener("change", () => {
    bootHero();
    ScrollTrigger.refresh();
  });
  if (reduceMq.matches) return;

  gsap.registerPlugin(ScrollTrigger);
  initReveals();
  ScrollTrigger.refresh();
}

if (document.readyState !== "loading") init();
else document.addEventListener("DOMContentLoaded", init);
