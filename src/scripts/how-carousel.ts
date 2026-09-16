type TrackState = {
  target: number;
  current: number;
  raf: number;
};

type HowWindow = Window & { __domeHowAbort?: AbortController };

const root = window as HowWindow;
root.__domeHowAbort?.abort();
const ac = new AbortController();
root.__domeHowAbort = ac;
bindHowCarousel(ac.signal);

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function bindHowCarousel(signal: AbortSignal): void {
  const states = new WeakMap<HTMLElement, TrackState>();
  const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let wheelTimer = 0;

  const maxScroll = (track: HTMLElement) => Math.max(0, track.scrollWidth - track.clientWidth);
  const step = (track: HTMLElement) => {
    const card = track.querySelector<HTMLElement>(".how-card");
    if (!card) return 320;
    const styles = getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "16") || 16;
    return card.getBoundingClientRect().width + gap;
  };
  const stateOf = (track: HTMLElement) => {
    const existing = states.get(track);
    if (existing) return existing;
    const created: TrackState = { target: track.scrollLeft, current: track.scrollLeft, raf: 0 };
    states.set(track, created);
    return created;
  };
  const sync = (track: HTMLElement) => {
    const section = track.closest("section");
    const prev = section?.querySelector<HTMLButtonElement>("[data-how-prev]");
    const next = section?.querySelector<HTMLButtonElement>("[data-how-next]");
    if (!prev || !next) return;
    const st = stateOf(track);
    const max = maxScroll(track);
    prev.disabled = st.target <= 2;
    next.disabled = max > 2 && st.target >= max - 2;
  };
  const tick = (track: HTMLElement) => {
    const st = stateOf(track);
    st.raf = 0;
    st.current += (st.target - st.current) * (reduce() ? 1 : 0.18);
    if (Math.abs(st.target - st.current) < 0.4) st.current = st.target;
    track.scrollLeft = st.current;
    if (st.current !== st.target) st.raf = requestAnimationFrame(() => tick(track));
    sync(track);
  };
  const goTo = (track: HTMLElement, value: number) => {
    const st = stateOf(track);
    st.target = clamp(value, 0, maxScroll(track));
    if (reduce()) {
      st.current = st.target;
      track.scrollLeft = st.current;
      sync(track);
      return;
    }
    if (!st.raf) st.raf = requestAnimationFrame(() => tick(track));
  };
  const snap = (track: HTMLElement) => {
    const st = stateOf(track);
    goTo(track, Math.round(st.target / step(track)) * step(track));
  };
  const trackFrom = (node: Element | null) =>
    node?.closest("section")?.querySelector<HTMLElement>("[data-how-track]") ?? null;

  document.addEventListener(
    "click",
    (event) => {
      const button = (event.target as HTMLElement | null)?.closest("button");
      if (!button) return;
      const track = trackFrom(button);
      if (!track) return;
      if (button.hasAttribute("data-how-next")) goTo(track, stateOf(track).target + step(track));
      if (button.hasAttribute("data-how-prev")) goTo(track, stateOf(track).target - step(track));
    },
    { signal },
  );

  document.addEventListener(
    "wheel",
    (event) => {
      const track = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-how-track]");
      if (!track || event.ctrlKey) return;
      const raw = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (raw === 0) return;
      const dx = event.deltaMode === 1 ? raw * 16 : raw;
      const st = stateOf(track);
      const atStart = st.target <= 0 && dx < 0;
      const atEnd = st.target >= maxScroll(track) && dx > 0;
      if (atStart || atEnd) return;
      event.preventDefault();
      goTo(track, st.target + dx);
      window.clearTimeout(wheelTimer);
      wheelTimer = window.setTimeout(() => snap(track), 140);
    },
    { passive: false, signal },
  );

  document.addEventListener(
    "pointerdown",
    (event) => {
      if (event.button !== 0) return;
      const track = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-how-track]");
      if (!track) return;
      const st = stateOf(track);
      st.current = track.scrollLeft;
      st.target = st.current;
      track.dataset.howDrag = String(event.clientX);
      track.setPointerCapture(event.pointerId);
      track.classList.add("is-dragging");
    },
    { signal },
  );

  document.addEventListener(
    "pointermove",
    (event) => {
      const track = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-how-track]");
      if (!track || track.dataset.howDrag === undefined) return;
      const lastX = Number(track.dataset.howDrag);
      const st = stateOf(track);
      goTo(track, st.target + (lastX - event.clientX));
      st.current = st.target;
      track.scrollLeft = st.current;
      track.dataset.howDrag = String(event.clientX);
    },
    { signal },
  );

  const endDrag = (event: PointerEvent) => {
    const track = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-how-track]");
    if (!track || track.dataset.howDrag === undefined) return;
    delete track.dataset.howDrag;
    track.classList.remove("is-dragging");
    snap(track);
  };
  document.addEventListener("pointerup", endDrag, { signal });
  document.addEventListener("pointercancel", endDrag, { signal });

  window.addEventListener(
    "resize",
    () => {
      document.querySelectorAll<HTMLElement>("[data-how-track]").forEach((track) => {
        const st = stateOf(track);
        st.target = clamp(track.scrollLeft, 0, maxScroll(track));
        st.current = st.target;
        track.scrollLeft = st.current;
        sync(track);
      });
    },
    { signal },
  );
}
