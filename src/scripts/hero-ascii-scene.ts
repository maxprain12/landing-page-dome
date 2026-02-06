import * as THREE from "three";

const ASCII_CHARS = " .'`^\",:;Il!i><~+_-?][}{1)(|/\\tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
const COLS = 72;
const ROWS = 42;

export function initHeroAsciiScene(container: HTMLElement): () => void {
  const width = 520;
  const height = 520;
  const glW = COLS;
  const glH = ROWS;

  const glCanvas = document.createElement("canvas");
  glCanvas.width = glW;
  glCanvas.height = glH;
  glCanvas.style.cssText = "position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;";
  container.appendChild(glCanvas);

  const asciiCanvas = document.createElement("canvas");
  asciiCanvas.width = width;
  asciiCanvas.height = height;
  asciiCanvas.style.cssText = "position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;image-rendering:pixelated;";
  container.appendChild(asciiCanvas);

  const renderer = new THREE.WebGLRenderer({
    canvas: glCanvas,
    alpha: true,
    antialias: false,
    preserveDrawingBuffer: true,
  });
  renderer.setSize(glW, glH);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, glW / glH, 0.1, 100);
  camera.position.set(0, 0.8, 2.2);
  camera.lookAt(0, 0, 0);

  const domeGeo = new THREE.SphereGeometry(0.9, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
  const domeMat = new THREE.MeshBasicMaterial({
    color: 0x596037,
    wireframe: true,
  });
  const dome = new THREE.Mesh(domeGeo, domeMat);
  scene.add(dome);

  const gridHelper = new THREE.GridHelper(1.8, 12, 0x596037, 0x2d3018);
  gridHelper.position.y = -0.5;
  scene.add(gridHelper);

  const ctx = asciiCanvas.getContext("2d")!;
  const cellW = width / COLS;
  const cellH = height / ROWS;
  const fontSize = Math.min(cellW, cellH) * 1.1;
  ctx.font = `${fontSize}px "SF Mono", "Consolas", "Monaco", monospace`;
  ctx.textBaseline = "top";

  let raf = 0;
  let time = 0;

  function luminance(r: number, g: number, b: number): number {
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  }

  function render() {
    time += 0.008;
    dome.rotation.y = time;
    gridHelper.rotation.y = time * 0.3;
    renderer.render(scene, camera);

    const imageData = ctx.createImageData(glW, glH);
    const glCtx = renderer.getContext();
    glCtx.readPixels(0, 0, glW, glH, glCtx.RGBA, glCtx.UNSIGNED_BYTE, imageData.data);

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#596037";

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const i = ((ROWS - 1 - row) * glW + col) * 4;
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        const a = imageData.data[i + 3];
        const L = a > 0 ? luminance(r, g, b) : 0;
        const charIndex = Math.min(Math.floor(L * (ASCII_CHARS.length - 1)), ASCII_CHARS.length - 1);
        const ch = ASCII_CHARS[charIndex];
        ctx.fillText(ch, col * cellW, row * cellH);
      }
    }

    raf = requestAnimationFrame(render);
  }

  render();

  return () => {
    cancelAnimationFrame(raf);
    renderer.dispose();
    domeGeo.dispose();
    domeMat.dispose();
    glCanvas.remove();
    asciiCanvas.remove();
  };
}
