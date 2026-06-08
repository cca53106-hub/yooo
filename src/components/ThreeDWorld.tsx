import React, { useEffect, useRef, useState } from "react";

interface Node3D {
  x: number;
  y: number;
  z: number;
  ox: number; // original X
  oy: number; // original Y
  oz: number; // original Z
}

export default function ThreeDWorld() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 }); // current X, Y and target X, Y for smooth interpolation
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Trigger double check after a quick timeout for layout shifts
    const t = setTimeout(handleResize, 150);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set high DPI canvas backing store if needed, or stick to normal size for great performance
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Create a 3D Grid mesh of nodes
    const cols = 22;
    const rows = 14;
    const nodes: Node3D[] = [];
    const spacingX = 140;
    const spacingZ = 140;
    
    // Grid coordinates centered at origin
    const startX = -((cols - 1) * spacingX) / 2;
    const startZ = -((rows - 1) * spacingZ) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = startX + c * spacingX;
        const z = startZ + r * spacingZ;
        // Generate a subtle landscape or plane height
        const y = 80;
        nodes.push({ x, y, z, ox: x, oy: y, oz: z });
      }
    }

    // Floating backup particles for space ambiance
    const particles: { x: number; y: number; z: number; size: number; color: string }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 2000,
        y: -(Math.random() * 400 + 100), // float above the grid
        z: (Math.random() - 0.5) * 2000,
        size: Math.random() * 1.5 + 0.5,
        color: Math.random() > 0.4 ? "rgba(6, 182, 212, " + (Math.random() * 0.4 + 0.1) + ")" : "rgba(112, 117, 255, " + (Math.random() * 0.4 + 0.1) + ")",
      });
    }

    let angleX = 0.38; // Initial pitch rotation (skew angle)
    let angleY = -0.15; // Initial yaw rotation (orbit angle)
    let time = 0;
    let animationId: number;

    const render = () => {
      // Clear with dark ambient gradient trace
      ctx.fillStyle = "#05060b";
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      ctx.save();
      
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;
      
      // Perspective projection parameters
      const fov = 480; // focal length of system camera
      const cameraYOffset = -180; // tilt camera down slightly

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.05;

      // Map mouse controls to subtle orbit variance
      const curAngleX = angleX + mouseRef.current.y * 0.15;
      const curAngleY = angleY + mouseRef.current.x * 0.25;

      time += 0.015;

      // Pre-compute basic trigonometry values for 3D rotation matrix
      const cosX = Math.cos(curAngleX);
      const sinX = Math.sin(curAngleX);
      const cosY = Math.cos(curAngleY);
      const sinY = Math.sin(curAngleY);

      // Utility projection function
      const project = (x3d: number, y3d: number, z3d: number) => {
        // Rotate around Y-axis (Yaw)
        let x1 = x3d * cosY - z3d * sinY;
        let z1 = x3d * sinY + z3d * cosY;

        // Rotate around X-axis (Pitch)
        let y2 = y3d * cosX - z1 * sinX;
        let z2 = y3d * sinX + z1 * cosX;

        // Camera Depth offset (translate coordinate along camera line of sight)
        const depth = z2 + 850;

        if (depth <= 10) return null;

        const screenX = (x1 * fov) / depth + centerX;
        const screenY = ((y2 + cameraYOffset) * fov) / depth + centerY;

        return { x: screenX, y: screenY, depth };
      };

      // Draw floating space particles
      particles.forEach((p) => {
        // Passive slight orbital shift
        const offsetZ = p.z + Math.sin(time + p.x) * 5;
        const proj = project(p.x, p.y, offsetZ);
        if (proj) {
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, p.size * (900 / proj.depth), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
      });

      // Warp the 3D grid height using wave harmonics
      const gridCoords: { x: number; y: number; active: boolean }[] = [];

      nodes.forEach((n) => {
        // Calculate distances for ripple waves
        const distFromCenter = Math.sqrt(n.ox * n.ox + n.oz * n.oz) * 0.003;
        // Harmonic waves generating gorgeous topological peaks and valleys
        const ripple = Math.sin(distFromCenter * 3 - time * 1.8) * 45 + Math.cos(n.ox * 0.002 + time) * 20;
        
        // Push actual modified height coordinate
        n.y = n.oy + ripple;

        const proj = project(n.x, n.y, n.z);
        if (proj) {
          gridCoords.push({ x: proj.x, y: proj.y, active: true });
        } else {
          gridCoords.push({ x: 0, y: 0, active: false });
        }
      });

      // Render the 3D wireframe mesh connection lines (topography grid)
      ctx.lineWidth = 0.8;
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const selfIdx = r * cols + c;
          const selfProj = gridCoords[selfIdx];
          
          if (!selfProj || !selfProj.active) continue;

          // Compute wireframe density and coordinate alpha based on depth or position
          const depthMultiplier = Math.min(Math.max((cols - c) / cols, 0.2), 1.0);
          
          // Draw connecting segment to right neighbor
          if (c < cols - 1) {
            const rightIdx = selfIdx + 1;
            const rightProj = gridCoords[rightIdx];
            if (rightProj && rightProj.active) {
              const gradient = ctx.createLinearGradient(selfProj.x, selfProj.y, rightProj.x, rightProj.y);
              
              const pulsePercent = (Math.sin(time * 2 + (c * 0.2) + r * 0.3) + 1) / 2;
              const opacity = Math.max(0.04, (1 - (r / rows)) * 0.28) * (1 - (Math.abs(c - cols/2) / (cols/2)) * 0.5);
              
              // Custom neon gold/purple transition colors
              const mainColor = pulsePercent > 0.7 
                ? `rgba(6, 182, 212, ${opacity * 1.5})` 
                : `rgba(112, 117, 255, ${opacity})`;
              const altColor = `rgba(223, 194, 153, ${opacity * 0.5})`;
              
              gradient.addColorStop(0, mainColor);
              gradient.addColorStop(1, altColor);
              
              ctx.beginPath();
              ctx.moveTo(selfProj.x, selfProj.y);
              ctx.lineTo(rightProj.x, rightProj.y);
              ctx.strokeStyle = gradient;
              ctx.stroke();
            }
          }

          // Draw connecting segment to bottom neighbor
          if (r < rows - 1) {
            const bottomIdx = selfIdx + cols;
            const bottomProj = gridCoords[bottomIdx];
            if (bottomProj && bottomProj.active) {
              const gradient = ctx.createLinearGradient(selfProj.x, selfProj.y, bottomProj.x, bottomProj.y);
              
              const opacity = Math.max(0.04, (1 - (r / rows)) * 0.28) * (1 - (Math.abs(c - cols/2) / (cols/2)) * 0.5);
              const mainBg = `rgba(112, 117, 255, ${opacity * 0.7})`;
              const accentBg = `rgba(6, 182, 212, ${opacity * 0.9})`;

              gradient.addColorStop(0, mainBg);
              gradient.addColorStop(1, accentBg);

              ctx.beginPath();
              ctx.moveTo(selfProj.x, selfProj.y);
              ctx.lineTo(bottomProj.x, bottomProj.y);
              ctx.strokeStyle = gradient;
              ctx.stroke();
            }
          }

          // Draw futuristic tiny micro-circuits / grid junction nodes
          if (r % 2 === 0 && c % 2 === 0) {
            const pulseRate = Math.sin(time * 3 + c * 0.5 + r * 0.8);
            const size = pulseRate > 0.85 ? 2.5 : 1.2;
            const opacity = pulseRate > 0.85 ? 0.9 : 0.3;
            
            ctx.beginPath();
            ctx.arc(selfProj.x, selfProj.y, size, 0, Math.PI * 2);
            ctx.fillStyle = pulseRate > 0.85 ? "rgba(6, 182, 212, " + opacity + ")" : "rgba(223, 194, 153, " + opacity + ")";
            ctx.shadowBlur = pulseRate > 0.85 ? 12 : 0;
            ctx.shadowColor = "#06b6d4";
            ctx.fill();
            ctx.shadowBlur = 0; // Restore standard grid shadow state
          }
        }
      }

      ctx.restore();

      animationId = requestAnimationFrame(render);
    };

    render();

    // Log coordinates inside document scope when cursor moves
    const handleMouseMove = (e: MouseEvent) => {
      const xNorm = (e.clientX / window.innerWidth) * 2 - 1; // -1 to +1
      const yNorm = (e.clientY / window.innerHeight) * 2 - 1; // -1 to +1
      mouseRef.current.tx = xNorm;
      mouseRef.current.ty = yNorm;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [dimensions]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-[#05060b]"
      id="3d-mesh-canvas-container"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none opacity-50"
        style={{ mixBlendMode: "screen" }}
      />
      {/* Super dark ambient vignette covers overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05060b] via-transparent to-[#050610] pointer-events-none z-0"></div>
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#05060b] to-transparent pointer-events-none z-0"></div>
    </div>
  );
}
