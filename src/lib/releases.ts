import { z } from "astro/zod";
import snapshot from "../data/releases.snapshot.json";

const DEFAULT_INDEX_URL = "https://dl.dowi.es/index.json";
const FETCH_TIMEOUT_MS = 10_000;

const releaseAssetSchema = z.object({
  platform: z.string(),
  arch: z.string(),
  kind: z.string(),
  name: z.string(),
  url: z.url(),
  size: z.number().nonnegative(),
  sha512: z.string(),
});

const releaseEntrySchema = z.object({
  version: z.string().min(1),
  date: z.string().min(1),
  channels: z.array(z.string()),
  stagingPercentage: z.number(),
  notesMarkdown: z.string(),
  assets: z.array(releaseAssetSchema),
});

const releaseIndexSchema = z.object({
  schemaVersion: z.literal(1),
  channels: z.object({
    latest: z.string().optional(),
    beta: z.string().optional(),
  }),
  releases: z.array(releaseEntrySchema),
});

export type ReleaseAsset = z.infer<typeof releaseAssetSchema>;
export type ReleaseEntry = z.infer<typeof releaseEntrySchema>;
export type ReleaseIndex = z.infer<typeof releaseIndexSchema>;
export type ReleaseChannel = "latest" | "beta";
export type PlatformGroup = "mac" | "win" | "linux";

let cached: ReleaseIndex | null = null;

function emptyIndex(): ReleaseIndex {
  return releaseIndexSchema.parse(snapshot);
}

export async function getReleaseIndex(): Promise<ReleaseIndex> {
  if (cached) return cached;

  const url = import.meta.env.PUBLIC_RELEASES_INDEX_URL ?? DEFAULT_INDEX_URL;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const json: unknown = await res.json();
    cached = releaseIndexSchema.parse(json);
    return cached;
  } catch (err) {
    console.warn("[releases] falling back to snapshot index:", err);
    cached = emptyIndex();
    return cached;
  }
}

export async function getLatest(channel: ReleaseChannel = "latest"): Promise<ReleaseEntry | null> {
  const index = await getReleaseIndex();
  const pinned = index.channels[channel];
  if (pinned) {
    const match = index.releases.find((entry) => entry.version === pinned);
    if (match) return match;
  }
  return index.releases.find((entry) => entry.channels.includes(channel)) ?? null;
}

export function assetsByPlatform(entry: ReleaseEntry): Record<PlatformGroup, ReleaseAsset[]> {
  const groups: Record<PlatformGroup, ReleaseAsset[]> = { mac: [], win: [], linux: [] };
  for (const asset of entry.assets) {
    const platform = asset.platform.toLowerCase();
    if (platform === "mac" || platform === "macos" || platform === "darwin") {
      groups.mac.push(asset);
    } else if (platform === "win" || platform === "windows") {
      groups.win.push(asset);
    } else if (platform === "linux") {
      groups.linux.push(asset);
    }
  }
  return groups;
}

export function formatSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "—";
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB", "TB"] as const;
  let value = bytes / 1024;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  const digits = value >= 100 ? 0 : value >= 10 ? 1 : 2;
  return `${value.toFixed(digits)} ${units[unitIndex]}`;
}

export function findPlatformAsset(
  entry: ReleaseEntry,
  opts: { platform: PlatformGroup; arch?: string; kind?: string },
): ReleaseAsset | undefined {
  const list = assetsByPlatform(entry)[opts.platform];
  return list.find((asset) => {
    if (opts.arch && asset.arch.toLowerCase() !== opts.arch.toLowerCase()) return false;
    if (opts.kind && asset.kind.toLowerCase() !== opts.kind.toLowerCase()) return false;
    return true;
  });
}
