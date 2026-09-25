import { releasesSignature } from "../lib/release-signature";

type Asset = {
  platform: string;
  arch: string;
  kind: string;
  name: string;
  url: string;
  size: number;
  sha512: string;
};

type Release = {
  version: string;
  date: string;
  channels: string[];
  notesMarkdown: string;
  assets: Asset[];
};

type Index = {
  channels: { latest?: string; beta?: string };
  releases: Release[];
};

function latestEntry(index: Index): Release | null {
  const pinned = index.channels.latest;
  return index.releases.find((entry) => entry.version === pinned) ?? index.releases[0] ?? null;
}

function formatSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "—";
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"] as const;
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  const digits = value >= 100 ? 0 : value >= 10 ? 1 : 2;
  return `${value.toFixed(digits)} ${units[unit]}`;
}

function pick(entry: Release, platform: string, kind: string, arch?: "arm64" | "other"): Asset | undefined {
  return entry.assets.find((asset) => {
    if (asset.platform !== platform || asset.kind !== kind) return false;
    if (arch === "arm64") return asset.arch === "arm64";
    if (arch === "other") return asset.arch !== "arm64";
    return true;
  });
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function inlineMarkdown(value: string): string {
  return value
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" rel="noopener">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

/** Small subset of what safe-markdown renders at build time: headings, lists, paragraphs, inline code/links/bold. */
function notesToHtml(markdown: string): string {
  const lines = escapeHtml(markdown).split("\n");
  const html: string[] = [];
  let list = false;
  let paragraph: string[] = [];
  const flush = () => {
    if (paragraph.length) html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
    if (list) html.push("</ul>");
    list = false;
  };
  for (const line of lines) {
    const trimmed = line.trim();
    const heading = /^(#{2,4}) (.+)$/.exec(trimmed);
    if (heading) {
      flush();
      const level = heading[1].length;
      html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
    } else if (trimmed.startsWith("- ")) {
      if (paragraph.length) flush();
      if (!list) html.push("<ul>");
      list = true;
      html.push(`<li>${inlineMarkdown(trimmed.slice(2))}</li>`);
    } else if (trimmed === "") {
      flush();
    } else {
      if (list) flush();
      paragraph.push(trimmed);
    }
  }
  flush();
  return html.join("");
}

function applyDownload(entry: Release) {
  const version = document.querySelector("[data-live-version]");
  if (version) version.textContent = entry.version;
  const date = document.querySelector("[data-live-date]");
  if (date) {
    date.setAttribute("datetime", entry.date);
    const locale = document.documentElement.lang === "en" ? "en-US" : "es-ES";
    date.textContent = new Date(entry.date).toLocaleDateString(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  const chosen: Record<string, Asset | undefined> = {
    mac: pick(entry, "mac", "dmg", "arm64"),
    win: pick(entry, "win", "nsis"),
    linux: pick(entry, "linux", "appimage"),
  };
  const extra: Record<string, Asset[]> = {
    mac: [pick(entry, "mac", "dmg", "other")].filter((asset): asset is Asset => Boolean(asset)),
    win: [],
    linux: [pick(entry, "linux", "flatpak")].filter((asset): asset is Asset => Boolean(asset)),
  };
  for (const panel of document.querySelectorAll<HTMLElement>("[data-platform]")) {
    const id = panel.dataset.platform ?? "";
    const asset = chosen[id];
    if (!asset) continue;
    const link = panel.querySelector<HTMLAnchorElement>("[data-download]");
    if (link) link.href = asset.url;
    const size = panel.querySelector("[data-size]");
    if (size) size.textContent = formatSize(asset.size);
    const sha = panel.querySelector("[data-sha]");
    if (sha) sha.textContent = asset.sha512;
    const file = panel.querySelector("[data-file]");
    if (file) file.textContent = asset.name;
    const also = panel.querySelector("[data-also]");
    if (also) {
      const links = [...also.querySelectorAll("a")];
      const items = extra[id] ?? [];
      links.forEach((anchor, index) => {
        const item = items[index];
        if (item) anchor.href = item.url;
      });
    }
  }
}

function channelLabel(list: HTMLElement, channel: string): string {
  if (channel === "latest") return list.dataset.labelLatest ?? channel;
  if (channel === "beta") return list.dataset.labelBeta ?? channel;
  return channel;
}

/** Mirrors the markup ChangelogView.astro renders at build time. */
function applyChangelog(index: Index) {
  const list = document.querySelector<HTMLElement>("[data-live-changelog]");
  if (!list) return;
  if (list.dataset.signature === releasesSignature(index.releases)) return;
  const locale = document.documentElement.lang === "en" ? "en-US" : "es-ES";
  const articles = index.releases.map((entry) => {
    const article = document.createElement("article");
    article.className = "cl-item";
    article.id = `v${entry.version}`;
    const time = document.createElement("time");
    time.className = "cl-date";
    time.dateTime = entry.date;
    time.textContent = new Date(entry.date).toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const body = document.createElement("div");
    const header = document.createElement("header");
    header.className = "cl-head";
    const title = document.createElement("h2");
    const mark = document.createElement("img");
    mark.src = "/assets/many.png";
    mark.alt = "";
    mark.width = 32;
    mark.height = 32;
    title.append(mark, document.createTextNode(entry.version));
    header.append(title);
    const badges = document.createElement("div");
    badges.className = "cl-badges";
    for (const channel of entry.channels) {
      const badge = document.createElement("span");
      badge.className = channel === "beta" ? "cl-badge is-beta" : "cl-badge";
      badge.textContent = channelLabel(list, channel);
      badges.append(badge);
    }
    body.append(header, badges);
    const notesHtml = notesToHtml(entry.notesMarkdown);
    if (notesHtml) {
      const notes = document.createElement("div");
      notes.className = "cl-notes prose";
      notes.innerHTML = notesHtml;
      body.append(notes);
    }
    article.append(time, body);
    return article;
  });
  list.replaceChildren(...articles);
}

export async function startLiveReleases(): Promise<void> {
  try {
    const res = await fetch("/releases-index.json", { cache: "no-store" });
    if (!res.ok) return;
    const index = (await res.json()) as Index;
    const entry = latestEntry(index);
    if (!entry) return;
    applyDownload(entry);
    applyChangelog(index);
  } catch {
    /* The baked snapshot stays on screen. */
  }
}
