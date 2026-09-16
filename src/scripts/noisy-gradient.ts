function mountGrain(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const patternSize = Number(canvas.dataset.patternSize ?? 90);
  const patternAlpha = Number(canvas.dataset.patternAlpha ?? 42);
  const intensity = Number(canvas.dataset.intensity ?? 1);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const refresh = reduce ? 0 : Number(canvas.dataset.refresh ?? 2);

  const patternCanvas = document.createElement("canvas");
  patternCanvas.width = patternSize;
  patternCanvas.height = patternSize;
  const patternCtx = patternCanvas.getContext("2d");
  if (!patternCtx) return;

  const patternData = patternCtx.createImageData(patternSize, patternSize);
  let cssW = 0;
  let cssH = 0;
  let frame = 0;
  let raf = 0;

  const resize = () => {
    const dpr = window.devicePixelRatio || 1;
    const parent = canvas.parentElement;
    const rect = parent?.getBoundingClientRect();
    cssW = rect?.width ?? window.innerWidth;
    cssH = rect?.height ?? window.innerHeight;
    canvas.width = Math.max(1, Math.floor(cssW * dpr));
    canvas.height = Math.max(1, Math.floor(cssH * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    updatePattern();
    draw();
  };

  const updatePattern = () => {
    const data = patternData.data;
    for (let i = 0; i < data.length; i += 4) {
      const value = Math.random() * 255 * intensity;
      data[i] = value;
      data[i + 1] = value;
      data[i + 2] = value;
      data[i + 3] = patternAlpha;
    }
    patternCtx.putImageData(patternData, 0, 0);
  };

  const draw = () => {
    if (cssW === 0 || cssH === 0) return;
    ctx.clearRect(0, 0, cssW, cssH);
    const fillPattern = ctx.createPattern(patternCanvas, "repeat");
    if (!fillPattern) return;
    ctx.fillStyle = fillPattern;
    ctx.fillRect(0, 0, cssW, cssH);
  };

  const loop = () => {
    if (cssW > 0 && cssH > 0 && frame % refresh === 0) {
      updatePattern();
      draw();
    }
    frame += 1;
    raf = window.requestAnimationFrame(loop);
  };

  window.addEventListener("resize", resize);
  const ro = new ResizeObserver(resize);
  if (canvas.parentElement) ro.observe(canvas.parentElement);
  resize();
  if (refresh > 0) loop();

  const cleanup = () => {
    window.removeEventListener("resize", resize);
    ro.disconnect();
    window.cancelAnimationFrame(raf);
  };
  window.addEventListener("pagehide", cleanup, { once: true });
}

function mountNoisyGradients(): void {
  document.querySelectorAll<HTMLCanvasElement>("[data-noisy-grain]").forEach(mountGrain);
}

mountNoisyGradients();
