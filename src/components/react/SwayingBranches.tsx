import React from 'react';

// Themes: simplicity through non-action, natural unfolding, letting things take their course
// Visualization: A tree that grows through simple rules — Dome's knowledge tree

interface SwayingBranchesProps {
  width?: number;
  height?: number;
  transparent?: boolean;
  className?: string;
}

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 320;

const SwayingBranches = ({ 
  width = DEFAULT_WIDTH, 
  height = DEFAULT_HEIGHT, 
  transparent = true,
  className = ''
}: SwayingBranchesProps) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(devicePixelRatio, devicePixelRatio);
    
    // L-system parameters
    // Using a slightly simpler rule set to create larger, more visible structures
    const axiom = "X";
    const rules = {
      "X": "F-[[X]+X]+F[+FX]-X",
      "F": "FF"
    };
    
    const generateLSystem = (
      start: string,
      iterations: number,
      customRules: Record<string, string> = rules
    ): string => {
      let result = start;
      for (let i = 0; i < iterations; i++) {
        let nextGen = "";
        for (let j = 0; j < result.length; j++) {
          const current = result[j];
          nextGen += customRules[current] ?? current;
        }
        result = nextGen;
      }
      return result;
    };
    
    // Pre-compute L-systems to avoid regenerating during animation
    // Using larger length values to make the visualization bigger
    // Create more complex final stage with a different rule
    const finalRule = {
      "X": "F-[[X]+X]+F[+FX]-X+[F+X][-X]",  // Added balanced branching on right side
      "F": "FF"
    };

    const precomputedSystems = [
      {
        config: { iterations: 3, angleDelta: Math.PI / 7, length: 25 },
        system: generateLSystem(axiom, 3)
      },
      {
        config: { iterations: 4, angleDelta: Math.PI / 7, length: 21 },
        system: generateLSystem(axiom, 4)
      },
      {
        // Final stage uses more complex rule and slightly different angle
        config: { iterations: 5, angleDelta: Math.PI / 8, length: 17 },
        system: generateLSystem(axiom, 5, finalRule)  // Pass the complex rule
      }
    ];
    
    // Animation variables
    let time = 0;
    let currentSystemIndex = 0;
    let transitionFactor = 0;
    let isTransitioning = false;
    let growthComplete = false;
    let animationFrameId: number | undefined;
    let swayFactor = 0.4;
    
    const scaleLength = Math.min(width, height) / 500;
    
    // Draw the L-system (use container dimensions)
    const drawLSystem = (systemData: typeof precomputedSystems[0], alpha = 1) => {
      const { config, system } = systemData;
      const { angleDelta, length } = config;
      const segLength = length * scaleLength;
      
      let x = width / 2;
      let y = height * 0.98;
      
      let baseAngle = -Math.PI / 2 + (Math.sin(time * 0.2) * swayFactor);
      
      const stack: { x: number; y: number; angle: number }[] = [];
      
      for (let i = 0; i < system.length; i++) {
        const command = system[i];
        
        switch(command) {
          case 'F':
            const x2 = x + segLength * Math.cos(baseAngle);
            const y2 = y + segLength * Math.sin(baseAngle);
            
            const transparency = (0.2 - (i / system.length) * 0.08) * alpha;
            const strokeColor = transparent 
              ? `rgba(89, 96, 55, ${transparency * 0.9})` 
              : `rgba(51, 51, 51, ${transparency})`;
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 2; // Slightly thicker lines for zoomed view
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            
            x = x2;
            y = y2;
            break;
            
          case '+': // Turn right
            baseAngle += angleDelta + (Math.sin(time * 0.2 + i * 0.01) * 0.05); // More noticeable variation
            break;
            
          case '-': // Turn left
            baseAngle -= angleDelta + (Math.sin(time * 0.2 + i * 0.01) * 0.05); // More noticeable variation
            break;
            
          case '[': // Save state
            stack.push({ x, y, angle: baseAngle });
            break;
            
          case ']': // Restore state
            const state = stack.pop();
            if (state) {
              ({ x, y, baseAngle } = { ...state, baseAngle: state.angle });
              
              // Add a smaller dot at branching points with lighter opacity
              const dotAlpha = 0.1 * alpha;
              if (dotAlpha > 0.01) {
                ctx.fillStyle = transparent 
                  ? `rgba(89, 96, 55, ${dotAlpha * 0.9})` 
                  : `rgba(51, 51, 51, ${dotAlpha})`;
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2); // Smaller dots (2px radius)
                ctx.fill();
              }
            }
            break;
        }
      }
    };
    
    const animate = () => {
      if (transparent) {
        ctx.clearRect(0, 0, width, height);
      } else {
        ctx.fillStyle = "#F0EEE6";
        ctx.fillRect(0, 0, width, height);
      }
      
      time += 0.008; // Even slower time increment for smoother swaying
      
      if (!growthComplete) {
        if (isTransitioning) {
          // Increment transition factor with smooth easing
          transitionFactor += 0.02; // Slower, more elegant transition
          
          if (transitionFactor >= 1) {
            isTransitioning = false;
            transitionFactor = 0;
            currentSystemIndex++;
            
            // Check if we've reached the final stage
            if (currentSystemIndex >= precomputedSystems.length - 1) {
              growthComplete = true;
              currentSystemIndex = precomputedSystems.length - 1;
            }
          } else {
            // Draw fading out system with easing
            const easeOut = 1 - Math.pow(1 - transitionFactor, 3); // Cubic ease out
            drawLSystem(precomputedSystems[currentSystemIndex], 1 - easeOut);
            
            // Draw fading in system with easing
            const nextIndex = Math.min(currentSystemIndex + 1, precomputedSystems.length - 1);
            drawLSystem(precomputedSystems[nextIndex], easeOut);
          }
        } else {
          // Draw current system
          drawLSystem(precomputedSystems[currentSystemIndex]);
          
          // Start next transition after 1 second
          if (time % 1 < 0.016) { // Approximately one frame at 60fps
            isTransitioning = true;
          }
        }
      } else {
        // Just draw final form and sway
        drawLSystem(precomputedSystems[precomputedSystems.length - 1]);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    return () => {
      if (animationFrameId != null) cancelAnimationFrame(animationFrameId);
      if (ctx) ctx.clearRect(0, 0, width, height);
    };
  }, [width, height, transparent]);

  return (
    <div 
      className={className}
      style={{ 
        width,
        height,
        background: transparent ? 'transparent' : '#F0EEE6',
        overflow: 'hidden',
        position: 'relative'
      }}
      aria-hidden="true"
    >
      <canvas 
        ref={canvasRef} 
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default SwayingBranches;