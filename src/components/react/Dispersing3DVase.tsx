import { useEffect, useRef } from "react";

const DEFAULT_SIZE = 550;

interface Node {
  originalX: number;
  originalY: number;
  originalZ: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  dispersing: boolean;
  disperseTime: number;
}

interface Dispersing3DVaseProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function Dispersing3DVase({
  className = "",
  width = DEFAULT_SIZE,
  height = DEFAULT_SIZE,
}: Dispersing3DVaseProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: width / 2, y: height / 2 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    let time = 0;
    const nodes: Node[] = [];
    let animationFrameId: number | null = null;

    const vaseHeightPoints = 60;
    const vaseRadialPoints = 50;

    for (let i = 0; i < vaseHeightPoints; i++) {
      const t = i / vaseHeightPoints;
      const y = (t - 0.5) * 400;

      let radius = 50;
      if (t < 0.05) {
        radius = 80 * (1 + (0.05 - t) * 4);
      } else if (t < 0.15) {
        radius = 80 - (t - 0.05) * 300;
      } else if (t < 0.4) {
        radius = 50 + Math.sin(((t - 0.15) * Math.PI) / 0.25) * 60;
      } else if (t < 0.75) {
        radius = 110 - Math.cos(((t - 0.4) * Math.PI) / 0.35) * 30;
      } else if (t < 0.9) {
        radius = 80 - (t - 0.75) * 200;
      } else {
        radius = 50 + (t - 0.9) * 100;
      }

      for (let j = 0; j < vaseRadialPoints; j++) {
        const angle = (j / vaseRadialPoints) * Math.PI * 2;
        nodes.push({
          originalX: Math.cos(angle) * radius,
          originalY: y,
          originalZ: Math.sin(angle) * radius,
          x: Math.cos(angle) * radius,
          y,
          z: Math.sin(angle) * radius,
          vx: 0,
          vy: 0,
          vz: 0,
          dispersing: false,
          disperseTime: 0,
        });
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    function project3DPoint(
      x: number,
      y: number,
      z: number,
      rotationX: number
    ) {
      const rotatedY = y * Math.cos(rotationX) - z * Math.sin(rotationX);
      const rotatedZ = y * Math.sin(rotationX) + z * Math.cos(rotationX);
      const scale = 400 / (400 + rotatedZ);
      return {
        x: x * scale + canvas.width / 2,
        y: rotatedY * scale + canvas.height / 2,
        z: rotatedZ,
        scale,
      };
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      time += 0.005;
      const rotationX = time * 0.15;

      const candidateNodes: { node: Node; distance: number }[] = [];
      nodes.forEach((node) => {
        const projected = project3DPoint(node.x, node.y, node.z, rotationX);
        const distanceToMouse = Math.hypot(
          projected.x - mouseRef.current.x,
          projected.y - mouseRef.current.y
        );
        if (distanceToMouse < 120 && !node.dispersing) {
          candidateNodes.push({ node, distance: distanceToMouse });
        }
      });

      candidateNodes.sort((a, b) => a.distance - b.distance);
      candidateNodes.slice(0, 5).forEach(({ node }) => {
        node.dispersing = true;
        node.disperseTime = 0;
        const disperseAngle = Math.atan2(node.z, node.x);
        const disperseY = node.y / 200;
        node.vx = Math.cos(disperseAngle) * 1.5;
        node.vy = disperseY * 1;
        node.vz = Math.sin(disperseAngle) * 1.5;
      });

      nodes.forEach((node) => {
        if (node.dispersing) {
          node.disperseTime += 0.01;
          node.x += node.vx;
          node.y += node.vy;
          node.z += node.vz;
          node.vy += 0.04;
          node.vx *= 0.96;
          node.vy *= 0.96;
          node.vz *= 0.96;
          if (
            node.disperseTime > 4 ||
            Math.abs(node.x) > 300 ||
            Math.abs(node.z) > 300
          ) {
            node.dispersing = false;
            node.x = node.originalX;
            node.y = node.originalY;
            node.z = node.originalZ;
            node.vx = 0;
            node.vy = 0;
            node.vz = 0;
          }
        }
      });

      const sortedNodes = [...nodes].sort((a, b) => {
        const projectedA = project3DPoint(a.x, a.y, a.z, rotationX);
        const projectedB = project3DPoint(b.x, b.y, b.z, rotationX);
        return projectedB.z - projectedA.z;
      });

      sortedNodes.forEach((node) => {
        const projected = project3DPoint(node.x, node.y, node.z, rotationX);
        const alpha = node.dispersing
          ? 0.35 * projected.scale * (1 - node.disperseTime / 5)
          : 0.55 * projected.scale;
        const size = 0.5 + 0.25 * projected.scale;
        ctx.fillStyle = `rgba(89, 96, 55, ${alpha})`;
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationFrameId != null) cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [width, height]);

  return (
    <div className={className} aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer"
        style={{ display: "block" }}
      />
    </div>
  );
}
