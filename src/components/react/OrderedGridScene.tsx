import { useEffect, useRef } from "react";

const BRAND_RGB = "89, 96, 55";

interface OrderedGridSceneProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function OrderedGridScene({
  className = "",
  width = 280,
  height = 280,
}: OrderedGridSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    let animationFrameId: number | null = null;
    let time = 0;
    const cols = 8;
    const rows = 6;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.38;

    function animate() {
      ctx.clearRect(0, 0, width, height);
      time += 0.012;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const t = (col / cols + row / rows + time * 0.2) % 1;
          const angle = (col / cols) * Math.PI * 0.9 - Math.PI * 0.45;
          const r = radius * (0.4 + 0.6 * (row / rows));
          const x = centerX + Math.cos(angle) * r;
          const y = centerY - (row / rows) * radius * 0.6 + Math.sin(time) * 2;
          const alpha = 0.4 + 0.35 * (1 - row / rows);
          const size = 1.2 + 0.8 * (row / rows);
          ctx.fillStyle = `rgba(${BRAND_RGB}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.strokeStyle = `rgba(${BRAND_RGB}, 0.25)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radius * 0.95, radius * 0.5, 0, 0, Math.PI * 2);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();
    return () => {
      if (animationFrameId != null) cancelAnimationFrame(animationFrameId);
    };
  }, [width, height]);

  return (
    <div className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} />
    </div>
  );
}
