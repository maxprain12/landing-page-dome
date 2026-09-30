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
  return pinned
    ? (index.releases.find((entry) => entry.version === pinned) ?? null)
    : (index.releases.find((entry) => entry.channels.includes("latest")) ??
        null);
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

function pick(
  entry: Release,
  platform: string,
  kind: string,
  arch?: "arm64" | "other",
): Asset | undefined {
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
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function inlineMarkdown(value: string): string {
  return value
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
      '<a href="$2" rel="noopener">$1</a>',
    )
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
    if (paragraph.length)
      html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
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

type DownloadCard = {
  platform: string;
  kind: string;
  arch?: "arm64" | "other";
  label: string;
  blurb: string;
};
function applyDownload(entry: Release | null) {
  const version = document.querySelector("[data-live-version]");
  if (version) version.textContent = entry?.version ?? "";
  const date = document.querySelector("[data-live-date]");
  if (date && entry) {
    date.setAttribute("datetime", entry.date);
    date.textContent = new Date(entry.date).toLocaleDateString(
      document.documentElement.lang === "en" ? "en-US" : "es-ES",
      { day: "numeric", month: "short", year: "numeric" },
    );
  }
  const changelog = document.querySelector<HTMLAnchorElement>(
    "[data-live-changelog-link]",
  );
  if (changelog && entry) changelog.hash = `v${entry.version}`;
  const available: string[] = [];
  for (const panel of document.querySelectorAll<HTMLElement>(
    "[data-platform]",
  )) {
    const cards = JSON.parse(panel.dataset.cards ?? "[]") as DownloadCard[];
    const choices = entry
      ? cards.flatMap((card) => {
          const asset = pick(entry, card.platform, card.kind, card.arch);
          return asset ? [{ card, asset }] : [];
        })
      : [];
    const primary = choices[0];
    const tab = document.querySelector<HTMLButtonElement>(
      `[data-tab="${panel.dataset.platform}"]`,
    );
    if (tab) tab.hidden = !primary;
    panel.hidden = true;
    if (!primary) continue;
    available.push(panel.dataset.platform!);
    const set = (selector: string, value: string) => {
      const node = panel.querySelector(selector);
      if (node) node.textContent = value;
    };
    set("[data-download-title]", primary.card.label);
    set("[data-download-blurb]", primary.card.blurb);
    set("[data-size]", formatSize(primary.asset.size));
    set("[data-sha]", primary.asset.sha512);
    set("[data-file]", primary.asset.name);
    const link = panel.querySelector<HTMLAnchorElement>("[data-download]");
    if (link) link.href = primary.asset.url;
    const also = panel.querySelector<HTMLElement>("[data-also]");
    if (also) {
      also.replaceChildren();
      also.hidden = choices.length < 2;
      if (choices.length > 1) {
        also.append(`${also.dataset.alsoLabel}: `);
        for (const choice of choices.slice(1)) {
          const anchor = document.createElement("a");
          anchor.href = choice.asset.url;
          anchor.rel = "noopener";
          anchor.textContent = choice.card.label;
          also.append(anchor);
        }
      }
    }
  }
  const empty = document.querySelector<HTMLElement>("[data-download-empty]");
  if (empty) empty.hidden = available.length > 0;
  const raw = (
    (navigator as Navigator & { userAgentData?: { platform?: string } })
      .userAgentData?.platform ?? navigator.platform
  ).toLowerCase();
  const preferred = raw.includes("win")
    ? "win"
    : raw.includes("linux")
      ? "linux"
      : "mac";
  const tabs = [...document.querySelectorAll<HTMLButtonElement>("[data-tab]")];
  const show = (id: string) => {
    for (const tab of tabs) {
      const on = tab.dataset.tab === id;
      tab.setAttribute("aria-selected", String(on));
      tab.tabIndex = on ? 0 : -1;
    }
    for (const panel of document.querySelectorAll<HTMLElement>(
      "[data-platform]",
    ))
      panel.hidden = panel.dataset.platform !== id;
  };
  if (available.length)
    show(available.includes(preferred) ? preferred : available[0]);
  for (const tab of tabs) {
    tab.onclick = () => show(tab.dataset.tab!);
    tab.onkeydown = (event) => {
      const visible = tabs.filter((button) => !button.hidden);
      const position = visible.indexOf(tab);
      const delta =
        event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
      if (!delta && event.key !== "Home" && event.key !== "End") return;
      event.preventDefault();
      const next =
        visible[
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? visible.length - 1
              : (position + delta + visible.length) % visible.length
        ];
      show(next.dataset.tab!);
      next.focus();
    };
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
  const empty = document.querySelector<HTMLElement>("[data-changelog-empty]");
  if (empty) empty.hidden = articles.length > 0;
}

function isIndex(value: unknown): value is Index {
  if (!value || typeof value !== "object") return false;
  const index = value as Index;
  if (!index.channels || !Array.isArray(index.releases)) return false;
  return index.releases.every(
    (entry) =>
      typeof entry.version === "string" &&
      /^[a-zA-Z0-9.-]+$/.test(entry.version) &&
      typeof entry.date === "string" &&
      Number.isFinite(Date.parse(entry.date)) &&
      Array.isArray(entry.channels) &&
      entry.channels.every((channel) => typeof channel === "string") &&
      typeof entry.notesMarkdown === "string" &&
      Array.isArray(entry.assets) &&
      entry.assets.every(
        (asset) =>
          typeof asset.platform === "string" &&
          typeof asset.kind === "string" &&
          typeof asset.arch === "string" &&
          typeof asset.name === "string" &&
          typeof asset.url === "string" &&
          /^https?:\/\//.test(asset.url) &&
          typeof asset.size === "number" &&
          Number.isFinite(asset.size) &&
          asset.size >= 0 &&
          typeof asset.sha512 === "string",
      ),
  );
}

export async function startLiveReleases(): Promise<void> {
  const root = document.querySelector<HTMLElement>("[data-live-releases]");
  if (!root || root.getAttribute("data-loading") === "true") return;
  root.dataset.loading = "true";
  root.setAttribute("aria-busy", "true");
  const status = root.querySelector<HTMLElement>("[data-release-status]");
  const message = root.querySelector<HTMLElement>("[data-release-message]");
  const skeleton = root.querySelector<HTMLElement>("[data-release-skeleton]");
  const retry = root.querySelector<HTMLButtonElement>("[data-release-retry]");
  if (status) status.hidden = false;
  if (skeleton) skeleton.hidden = false;
  if (retry) retry.hidden = true;
  if (message) message.textContent = message.dataset.loading ?? "";
  try {
    const res = await fetch("/releases-index.json", {
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const index: unknown = await res.json();
    if (!isIndex(index)) throw new Error("Invalid release index");
    applyDownload(latestEntry(index));
    applyChangelog(index);
    root
      .querySelectorAll<HTMLElement>("[data-release-ready]")
      .forEach((node) => {
        node.hidden = node.classList.contains("dl-meta") && !latestEntry(index);
      });
    if (status) status.hidden = true;
    root.dataset.releaseState = "ready";
    // Anchors can only be resolved after the live changelog is rendered.
    if (location.hash)
      document.getElementById(location.hash.slice(1))?.scrollIntoView();
  } catch {
    root.dataset.releaseState = "error";
    if (message) message.textContent = message.dataset.error ?? "";
    if (skeleton) skeleton.hidden = true;
    if (retry) {
      retry.hidden = false;
      retry.onclick = () => {
        void startLiveReleases();
      };
    }
  } finally {
    root.dataset.loading = "false";
    root.setAttribute("aria-busy", "false");
  }
}
