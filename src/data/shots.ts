import { existsSync } from "node:fs";
import { join } from "node:path";
import type { ShellView } from "../components/appshell";

const publicDir = join(process.cwd(), "public");
const packDir = "dome-recursos-landing";

export type ShotScene = "library" | "many" | "study" | "social";
export type ShotFormat = "screen" | "composition" | "detail";

const VIEW_SCENE: Record<ShellView, ShotScene> = {
  library: "library",
  person: "social",
  models: "library",
  draft: "many",
  approval: "many",
  channels: "many",
  study: "study",
  dev: "many",
};

const FALLBACK_STEM: Record<ShotScene, string> = {
  library: "pro",
  many: "pro",
  study: "learn",
  social: "social",
};

// These are captures from the real Dome Electron renderer (2800 × 1800).
// The landing keeps the same source for screen, composition and detail so
// every crop shows the actual sidebar, tabs, Many panel and typography.
export const SHOT_SIZE = { width: 2800, height: 1800 } as const;
export const COMPOSITION_SIZE = { width: 2800, height: 1800 } as const;
export const DETAIL_SIZE = { width: 2800, height: 1800 } as const;

function publicUrl(rel: string): string | null {
  if (existsSync(join(publicDir, rel))) return `/${rel}`;
  return null;
}

function packFile(scene: ShotScene, format: ShotFormat): string {
  const stem = `${packDir}/dome-${scene}-${format}-light-es-primary-landscape`;
  if (existsSync(join(publicDir, `${stem}.webp`))) return `${stem}.webp`;
  return `${stem}.png`;
}

function fallbackFile(scene: ShotScene): string | null {
  const stem = FALLBACK_STEM[scene];
  for (const ext of ["png", "webp", "jpg"] as const) {
    const hit = publicUrl(`${stem}.${ext}`) ?? publicUrl(`assets/${stem}.${ext}`);
    if (hit) return hit;
  }
  return null;
}

export function shotForScene(scene: ShotScene, format: ShotFormat = "screen"): string | null {
  return publicUrl(packFile(scene, format)) ?? (format === "screen" ? fallbackFile(scene) : null);
}

export function shotForView(view: ShellView, format: ShotFormat = "screen"): string | null {
  return shotForScene(VIEW_SCENE[view], format);
}

/** Real capture for a product page (`public/products/<product>-hero.webp|png`); null until one is added. */
export function productShot(product: "companion" | "extension"): string | null {
  return publicUrl(`products/${product}-hero.webp`) ?? publicUrl(`products/${product}-hero.png`);
}

export const shots: Record<ShotScene, Record<ShotFormat, string | null>> = {
  library: {
    screen: shotForScene("library", "screen"),
    composition: shotForScene("library", "composition"),
    detail: shotForScene("library", "detail"),
  },
  many: {
    screen: shotForScene("many", "screen"),
    composition: shotForScene("many", "composition"),
    detail: shotForScene("many", "detail"),
  },
  study: {
    screen: shotForScene("study", "screen"),
    composition: shotForScene("study", "composition"),
    detail: shotForScene("study", "detail"),
  },
  social: {
    screen: shotForScene("social", "screen"),
    composition: shotForScene("social", "composition"),
    detail: shotForScene("social", "detail"),
  },
};

export function shotsByView(format: ShotFormat = "screen"): Record<ShellView, string | null> {
  return {
    library: shotForView("library", format),
    person: shotForView("person", format),
    draft: shotForView("draft", format),
    approval: shotForView("approval", format),
    channels: shotForView("channels", format),
    models: shotForView("models", format),
    study: shotForView("study", format),
    dev: shotForView("dev", format),
  };
}

export function sizeForFormat(format: ShotFormat): { width: number; height: number } {
  switch (format) {
    case "screen":
      return SHOT_SIZE;
    case "composition":
      return COMPOSITION_SIZE;
    case "detail":
      return DETAIL_SIZE;
    default: {
      const _exhaustive: never = format;
      return _exhaustive;
    }
  }
}
