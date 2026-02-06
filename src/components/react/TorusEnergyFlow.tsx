import React, { useEffect, useRef } from 'react';

// themes: return is motion, yielding is way, being from non-being
// visualization: Energy flows in eternal cycles, yielding and returning to its source

// Constants
const CANVAS_SIZE = 550;
const MAJOR_RADIUS = 120;
const TUBE_RADIUS = 100;
const MAJOR_SEGMENTS = 50;
const MINOR_SEGMENTS = 30;
const POLOIDAL_LINES = 8;
const TOROIDAL_LINES = 6;
const LINE_POINTS = 100;
const TWO_PI = Math.PI * 2;

interface TorusEnergyFlowProps {
  transparent?: boolean;
  className?: string;
  width?: number;
  height?: number;
}

const TorusEnergyFlow = ({ transparent = true, className = '', width = CANVAS_SIZE, height = CANVAS_SIZE }: TorusEnergyFlowProps) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(Math.PI);
  const nodesRef = useRef(null);
  const flowLinesRef = useRef(null);
  const sinCosTableRef = useRef(null);
  
  // Initialize sin/cos lookup tables
  const initTrigTables = () => {
    if (sinCosTableRef.current) return;
    
    const tableSize = 628; // 2π * 100
    const sinTable = new Float32Array(tableSize);
    const cosTable = new Float32Array(tableSize);
    
    for (let i = 0; i < tableSize; i++) {
      const angle = (i / 100);
      sinTable[i] = Math.sin(angle);
      cosTable[i] = Math.cos(angle);
    }
    
    sinCosTableRef.current = { sin: sinTable, cos: cosTable };
  };
  
  // Fast trig lookups
  const fastSin = (angle) => {
    const index = Math.floor((angle % TWO_PI) * 100) % 628;
    return sinCosTableRef.current.sin[index];
  };
  
  const fastCos = (angle) => {
    const index = Math.floor((angle % TWO_PI) * 100) % 628;
    return sinCosTableRef.current.cos[index];
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    let animationFrameId = null;
    
    // Initialize canvas and context
    const size = Math.min(width, height, CANVAS_SIZE);
    if (!ctxRef.current) {
      canvas.width = size;
      canvas.height = size;
      ctxRef.current = canvas.getContext('2d', {
        alpha: transparent
      });
    }
    const ctx = ctxRef.current;
    
    // Initialize trig tables
    initTrigTables();
    
    // Initialize nodes with TypedArrays if not already created
    if (!nodesRef.current) {
      const nodeCount = MAJOR_SEGMENTS * MINOR_SEGMENTS;
      const nodes = {
        positions: new Float32Array(nodeCount * 3), // x, y, z
        original: new Float32Array(nodeCount * 3), // originalX, originalY, originalZ
        velocity: new Float32Array(nodeCount * 3), // vx, vy, vz
        params: new Float32Array(nodeCount * 3), // u, v, disperseTime
        dispersing: new Uint8Array(nodeCount) // boolean flag
      };
      
      // Create form where being emerges from non-being
      let idx = 0;
      for (let i = 0; i < MAJOR_SEGMENTS; i++) {
        const u = (i / MAJOR_SEGMENTS) * TWO_PI;
        
        for (let j = 0; j < MINOR_SEGMENTS; j++) {
          const v = (j / MINOR_SEGMENTS) * TWO_PI;
          
          const x = (MAJOR_RADIUS + TUBE_RADIUS * fastCos(v)) * fastCos(u);
          const y = (MAJOR_RADIUS + TUBE_RADIUS * fastCos(v)) * fastSin(u);
          const z = TUBE_RADIUS * fastSin(v);
          
          const posOffset = idx * 3;
          nodes.positions[posOffset] = x;
          nodes.positions[posOffset + 1] = y;
          nodes.positions[posOffset + 2] = z;
          
          nodes.original[posOffset] = x;
          nodes.original[posOffset + 1] = y;
          nodes.original[posOffset + 2] = z;
          
          nodes.params[posOffset] = u;
          nodes.params[posOffset + 1] = v;
          nodes.params[posOffset + 2] = 0; // disperseTime
          
          idx++;
        }
      }
      
      nodesRef.current = nodes;
    }
    
    // Initialize flow lines with TypedArrays if not already created
    if (!flowLinesRef.current) {
      const totalLines = POLOIDAL_LINES + TOROIDAL_LINES;
      const pointsPerLine = LINE_POINTS + 1;
      
      const flowLines = {
        points: new Float32Array(totalLines * pointsPerLine * 3), // x, y, z
        progress: new Float32Array(totalLines * pointsPerLine),
        metadata: []
      };
      
      let lineIdx = 0;
      
      // Poloidal lines
      for (let i = 0; i < POLOIDAL_LINES; i++) {
        const u = (i / POLOIDAL_LINES) * TWO_PI;
        flowLines.metadata.push({
          type: 'poloidal',
          offset: i / POLOIDAL_LINES,
          color: transparent ? 'rgba(255, 255, 255, 0.25)' : 'rgba(80, 80, 80, 0.3)',
          startIdx: lineIdx * pointsPerLine
        });
        
        for (let j = 0; j <= LINE_POINTS; j++) {
          const v = (j / LINE_POINTS) * TWO_PI;
          const pointIdx = (lineIdx * pointsPerLine + j) * 3;
          
          flowLines.points[pointIdx] = (MAJOR_RADIUS + TUBE_RADIUS * fastCos(v)) * fastCos(u);
          flowLines.points[pointIdx + 1] = (MAJOR_RADIUS + TUBE_RADIUS * fastCos(v)) * fastSin(u);
          flowLines.points[pointIdx + 2] = TUBE_RADIUS * fastSin(v);
          
          flowLines.progress[lineIdx * pointsPerLine + j] = j / LINE_POINTS;
        }
        lineIdx++;
      }
      
      // Toroidal lines
      for (let i = 0; i < TOROIDAL_LINES; i++) {
        const v = (i / TOROIDAL_LINES) * TWO_PI;
        flowLines.metadata.push({
          type: 'toroidal',
          offset: i / TOROIDAL_LINES,
          color: transparent ? 'rgba(255, 255, 255, 0.35)' : 'rgba(120, 120, 120, 0.3)',
          startIdx: lineIdx * pointsPerLine
        });
        
        for (let j = 0; j <= LINE_POINTS; j++) {
          const u = (j / LINE_POINTS) * TWO_PI;
          const pointIdx = (lineIdx * pointsPerLine + j) * 3;
          
          flowLines.points[pointIdx] = (MAJOR_RADIUS + TUBE_RADIUS * fastCos(v)) * fastCos(u);
          flowLines.points[pointIdx + 1] = (MAJOR_RADIUS + TUBE_RADIUS * fastCos(v)) * fastSin(u);
          flowLines.points[pointIdx + 2] = TUBE_RADIUS * fastSin(v);
          
          flowLines.progress[lineIdx * pointsPerLine + j] = j / LINE_POINTS;
        }
        lineIdx++;
      }
      
      flowLinesRef.current = flowLines;
    }
    
    // Pre-allocate arrays for projected points
    const projectedPoints = new Float32Array(MAJOR_SEGMENTS * MINOR_SEGMENTS * 4); // x, y, z, scale
    const projectedArrows = new Float32Array(12 * 4); // x, y, z, angle
    
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { 
        x: e.clientX - rect.left,
        y: e.clientY - rect.top 
      };
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    
    // Optimized 3D projection using TypedArrays
    function project3DPoint(x, y, z, rotationX, rotationY, outArray, outIndex) {
      const sinRotX = fastSin(rotationX);
      const cosRotX = fastCos(rotationX);
      const sinRotY = fastSin(rotationY);
      const cosRotY = fastCos(rotationY);
      
      const rotatedY = y * cosRotX - z * sinRotX;
      const rotatedZ = y * sinRotX + z * cosRotX;
      
      const rotatedX = x * cosRotY + rotatedZ * sinRotY;
      const finalZ = -x * sinRotY + rotatedZ * cosRotY;
      
      const scale = 500 / (500 + finalZ);
      
      const halfSize = canvas.width / 2;
      outArray[outIndex] = rotatedX * scale + halfSize;
      outArray[outIndex + 1] = rotatedY * scale + halfSize;
      outArray[outIndex + 2] = finalZ;
      outArray[outIndex + 3] = scale;
    }
    
    function animate() {
      const time = timeRef.current;
      const nodes = nodesRef.current;
      const flowLines = flowLinesRef.current;
      
      // Clear (transparent or solid)
      const cw = ctx.canvas.width;
      const ch = ctx.canvas.height;
      if (transparent) {
        ctx.clearRect(0, 0, cw, ch);
      } else {
        ctx.fillStyle = '#F0EEE6';
        ctx.fillRect(0, 0, cw, ch);
      }
      
      const rotationX = Math.PI * 0.3;
      const rotationY = time;
      
      // Project all nodes first
      const nodeCount = MAJOR_SEGMENTS * MINOR_SEGMENTS;
      for (let i = 0; i < nodeCount; i++) {
        const posOffset = i * 3;
        project3DPoint(
          nodes.positions[posOffset],
          nodes.positions[posOffset + 1],
          nodes.positions[posOffset + 2],
          rotationX,
          rotationY,
          projectedPoints,
          i * 4
        );
      }
      
      // Update nodes for mouse interaction
      const candidateNodes = [];
      for (let i = 0; i < nodeCount; i++) {
        if (!nodes.dispersing[i]) {
          const projOffset = i * 4;
          const distanceToMouse = Math.hypot(
            projectedPoints[projOffset] - mouseRef.current.x,
            projectedPoints[projOffset + 1] - mouseRef.current.y
          );
          
          if (distanceToMouse < 60) {
            candidateNodes.push({ index: i, distance: distanceToMouse });
          }
        }
      }
      
      // Handle node dispersion
      candidateNodes.sort((a, b) => a.distance - b.distance);
      candidateNodes.slice(0, 5).forEach(({ index }) => {
        const posOffset = index * 3;
        const paramOffset = index * 3;
        
        nodes.dispersing[index] = 1;
        nodes.params[paramOffset + 2] = 0; // Reset disperseTime
        
        const u = nodes.params[paramOffset];
        const v = nodes.params[paramOffset + 1];
        
        // Calculate normal using fast trig
        const normalX = fastCos(u) * fastCos(v);
        const normalY = fastSin(u) * fastCos(v);
        const normalZ = fastSin(v);
        
        nodes.velocity[posOffset] = normalX * 3;
        nodes.velocity[posOffset + 1] = normalY * 3;
        nodes.velocity[posOffset + 2] = normalZ * 3;
      });
      
      // Update dispersing nodes
      for (let i = 0; i < nodeCount; i++) {
        if (nodes.dispersing[i]) {
          const posOffset = i * 3;
          const paramOffset = i * 3;
          
          nodes.params[paramOffset + 2] += 0.02; // Increment disperseTime
          
          nodes.positions[posOffset] += nodes.velocity[posOffset];
          nodes.positions[posOffset + 1] += nodes.velocity[posOffset + 1];
          nodes.positions[posOffset + 2] += nodes.velocity[posOffset + 2];
          
          nodes.velocity[posOffset] *= 0.96;
          nodes.velocity[posOffset + 1] *= 0.96;
          nodes.velocity[posOffset + 2] *= 0.96;
          
          if (nodes.params[paramOffset + 2] > 4) {
            nodes.dispersing[i] = 0;
            nodes.positions[posOffset] = nodes.original[posOffset];
            nodes.positions[posOffset + 1] = nodes.original[posOffset + 1];
            nodes.positions[posOffset + 2] = nodes.original[posOffset + 2];
            nodes.velocity[posOffset] = 0;
            nodes.velocity[posOffset + 1] = 0;
            nodes.velocity[posOffset + 2] = 0;
          }
        }
      }
      
      // Draw paths of eternal return
      flowLines.metadata.forEach((line, lineIndex) => {
        const animOffset = (time * 0.5 + line.offset) % 1;
        const startIdx = line.startIdx;
        const pointCount = LINE_POINTS + 1;
        
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([5, 10]);
        ctx.beginPath();
        
        for (let i = 0; i < pointCount; i++) {
          const pointIdx = (startIdx + i) * 3;
          project3DPoint(
            flowLines.points[pointIdx],
            flowLines.points[pointIdx + 1],
            flowLines.points[pointIdx + 2],
            rotationX,
            rotationY,
            projectedPoints,
            i * 4
          );
          
          if (i === 0) {
            ctx.moveTo(projectedPoints[0], projectedPoints[1]);
          } else {
            ctx.lineTo(projectedPoints[i * 4], projectedPoints[i * 4 + 1]);
          }
        }
        
        if (line.type === 'toroidal') {
          ctx.closePath();
        }
        
        ctx.stroke();
        ctx.setLineDash([]);
      });
      
      // Draw flow direction arrows
      const arrowTime = time * 2;
      for (let i = 0; i < 12; i++) {
        const t = (i / 12 + arrowTime * 0.1) % 1;
        const u = t * TWO_PI;
        const v = Math.PI;
        
        const x = (MAJOR_RADIUS + TUBE_RADIUS * fastCos(v)) * fastCos(u);
        const y = (MAJOR_RADIUS + TUBE_RADIUS * fastCos(v)) * fastSin(u);
        const z = TUBE_RADIUS * fastSin(v);
        
        project3DPoint(x, y, z, rotationX, rotationY, projectedArrows, i * 4);
        
        const tangentU = -(MAJOR_RADIUS + TUBE_RADIUS * fastCos(v)) * fastSin(u);
        const tangentV = -(MAJOR_RADIUS + TUBE_RADIUS * fastCos(v)) * fastCos(u);
        
        project3DPoint(
          x + tangentU * 0.1,
          y + tangentV * 0.1,
          z,
          rotationX,
          rotationY,
          projectedPoints,
          0
        );
        
        const angle = Math.atan2(
          projectedPoints[1] - projectedArrows[i * 4 + 1],
          projectedPoints[0] - projectedArrows[i * 4]
        );
        
        projectedArrows[i * 4 + 3] = angle;
      }
      
      // Draw arrows
      ctx.fillStyle = transparent ? 'rgba(255, 255, 255, 0.5)' : 'rgba(100, 100, 100, 0.6)';
      for (let i = 0; i < 12; i++) {
        const idx = i * 4;
        ctx.save();
        ctx.translate(projectedArrows[idx], projectedArrows[idx + 1]);
        ctx.rotate(projectedArrows[idx + 3]);
        
        ctx.beginPath();
        ctx.moveTo(5, 0);
        ctx.lineTo(-5, -3);
        ctx.lineTo(-5, 3);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
      }
      
      // Sort and draw nodes
      const indices = new Uint16Array(nodeCount);
      for (let i = 0; i < nodeCount; i++) indices[i] = i;
      
      indices.sort((a, b) => {
        return projectedPoints[b * 4 + 2] - projectedPoints[a * 4 + 2];
      });
      
      for (let i = 0; i < nodeCount; i++) {
        const nodeIdx = indices[i];
        const projOffset = nodeIdx * 4;
        const scale = projectedPoints[projOffset + 3];
        
        const alpha = nodes.dispersing[nodeIdx] ? 
          0.3 * scale * (1 - nodes.params[nodeIdx * 3 + 2] / 4) : 
          0.7 * scale;
        
        const size = 0.8 + 0.3 * scale;
        const shade = transparent ? (200 + Math.floor(scale * 55)) : (50 + Math.floor(scale * 30));
        
        ctx.fillStyle = transparent 
          ? `rgba(255, 255, 255, ${alpha * 0.9})` 
          : `rgba(${shade}, ${shade}, ${shade}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(
          projectedPoints[projOffset],
          projectedPoints[projOffset + 1],
          size,
          0,
          TWO_PI
        );
        ctx.fill();
      }
      
      // Draw central void
      ctx.strokeStyle = transparent ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, 30, 0, TWO_PI);
      ctx.stroke();
      
      timeRef.current += 0.001; // Reduced from 0.002 for slower animation
      animationFrameId = requestAnimationFrame(animate);
    }
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      
      canvas.removeEventListener('mousemove', handleMouseMove);
      
      // Clear canvas context
      if (ctxRef.current && canvasRef.current) {
        const c = canvasRef.current;
        ctxRef.current.clearRect(0, 0, c.width, c.height);
      }
      
      // Clear refs to prevent memory leaks
      nodesRef.current = null;
      flowLinesRef.current = null;
      sinCosTableRef.current = null;
      ctxRef.current = null;
    };
  }, []);
  
  return (
    <div 
      className={className}
      style={{ 
        margin: 0,
        background: transparent ? 'transparent' : '#F0EEE6',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: height,
        minWidth: width,
        minHeight: height
      }}
      aria-hidden="true"
    >
      <canvas 
        ref={canvasRef} 
        style={{ display: 'block', maxWidth: '100%', maxHeight: '100%' }}
      />
    </div>
  );
};

export default TorusEnergyFlow;