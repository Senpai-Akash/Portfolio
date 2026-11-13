"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// Carefully calibrated character density ramp from lowest to highest optical density
const DENSITY_RAMP = " .,:;irsXA253hMHGS#9B&@";

interface AsciiParticle {
  x0: number; // Home grid X
  y0: number; // Home grid Y
  x: number;  // Dynamic X
  y: number;  // Dynamic Y
  vx: number; // Velocity X
  vy: number; // Velocity Y
  baseChar: string;
  char: string;
  lum: number; // 0 to 1
  baseColor: string;
  highlightColor: string;
}

interface AsciiPortraitProps {
  imageSrc?: string;
  className?: string;
}

export function AsciiPortrait({
  imageSrc = "/images/akash-portrait.png",
  className = "",
}: AsciiPortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);
  const isVisibleRef = useRef(true);

  // Mouse interaction state in ref to avoid re-renders during 60FPS loop
  const mouseRef = useRef({
    x: -9999,
    y: -9999,
    prevX: -9999,
    prevY: -9999,
    speed: 0,
    isHovered: false,
    radius: 130,
  });

  const particlesRef = useRef<AsciiParticle[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const imgDataRef = useRef<HTMLImageElement | null>(null);

  // Piecewise tonal mapping to extract rich facial detail from skin and shadow ranges
  const mapTones = useCallback((rawLum: number): number => {
    if (rawLum < 0.20) {
      // Shadows (hair, dark suit): gentle separation
      return (rawLum / 0.20) * 0.22;
    } else if (rawLum < 0.72) {
      // Facial midtones (eyes, eyelids, nose contours, lips, cheekbones): expanded dynamic range!
      return 0.22 + ((rawLum - 0.20) / 0.52) * 0.56;
    } else {
      // High specular highlights (forehead, nose tip, shirt collar): clean compression
      return 0.78 + ((rawLum - 0.72) / 0.28) * 0.22;
    }
  }, []);

  // Build the high-resolution particle grid from the source image
  const buildGrid = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const img = imgDataRef.current;
    if (!container || !canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const width = container.clientWidth;
    const height = container.clientHeight || Math.round(width * 1.25);

    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    // Adaptive columns: fewer on mobile to avoid performance issues
    // 50 cols on small mobile, 70 on large mobile, 105 tablet, 155 desktop
    let cols = 145;
    if (width < 400) {
      cols = 50;
    } else if (width < 500) {
      cols = 65;
    } else if (width < 640) {
      cols = 105;
    } else if (width >= 700) {
      cols = 155;
    }

    // Monospace aspect ratio (width-to-height is approx 0.55)
    const charAspect = 0.55;
    const cellWidth = width / cols;
    const cellHeight = cellWidth / charAspect;
    const rows = Math.floor(height / cellHeight);

    // Offscreen canvas for fast pixel sampling
    const offCanvas = document.createElement("canvas");
    offCanvas.width = cols;
    offCanvas.height = rows;
    const offCtx = offCanvas.getContext("2d", { willReadFrequently: true });
    if (!offCtx) return;

    // Preserve natural portrait proportions without squishing or stretching
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const gridAspect = width / height;

    let srcW = img.naturalWidth;
    let srcH = img.naturalHeight;
    let srcX = 0;
    let srcY = 0;

    if (imgAspect > gridAspect) {
      srcW = img.naturalHeight * gridAspect;
      srcX = (img.naturalWidth - srcW) / 2;
    } else {
      srcH = img.naturalWidth / gridAspect;
      srcY = 0; // Anchor to top so the face and hair are never cropped
    }

    offCtx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, cols, rows);
    const pixelData = offCtx.getImageData(0, 0, cols, rows).data;

    const newParticles: AsciiParticle[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = (r * cols + c) * 4;
        const red = pixelData[idx];
        const green = pixelData[idx + 1];
        const blue = pixelData[idx + 2];
        const alpha = pixelData[idx + 3];

        // Transparent background in the source cut-out is skipped
        if (alpha < 35) continue;

        // Calculate luminance with tone mapping curve
        const rawLum = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
        const lum = mapTones(rawLum);

        // Map to character density ramp
        const rampIdx = Math.floor(lum * DENSITY_RAMP.length);
        const char = DENSITY_RAMP[Math.min(DENSITY_RAMP.length - 1, Math.max(0, rampIdx))];

        // Cell center coordinates
        const x = c * cellWidth + cellWidth / 2;
        const y = r * cellHeight + cellHeight / 2;

        // Portfolio color mapping:
        let baseColor: string;
        // Accent red detection for lapel badge:
        if (red > 120 && red > green * 1.5 && red > blue * 1.8) {
          baseColor = "rgba(239, 68, 68, 0.95)"; // lapel badge accent
        } else if (lum < 0.22) {
          baseColor = "rgba(15, 76, 117, 0.75)"; // deep navy shadow
        } else if (lum < 0.52) {
          baseColor = "rgba(50, 130, 184, 0.9)"; // electric accent
        } else if (lum < 0.78) {
          baseColor = "rgba(187, 225, 250, 0.95)"; // highlight
        } else {
          baseColor = "rgba(255, 255, 255, 1.0)"; // pure white specular
        }

        const highlightColor = "rgba(187, 225, 250, 1.0)";

        newParticles.push({
          x0: x,
          y0: y,
          x,
          y,
          vx: 0,
          vy: 0,
          baseChar: char,
          char,
          lum,
          baseColor,
          highlightColor,
        });
      }
    }

    particlesRef.current = newParticles;
    mouseRef.current.radius = width < 500 ? 95 : 135;
    setIsReady(true);
  }, [mapTones]);

  // Preload and sample image with font readiness check
  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imgDataRef.current = img;
      if (document.fonts?.ready) {
        document.fonts.ready.then(() => buildGrid());
      } else {
        buildGrid();
      }
    };

    const handleResize = () => {
      buildGrid();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [imageSrc, buildGrid]);

  // Pause animation when component scrolls out of view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Main animation, physics & render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const startTime = performance.now();

    const render = (time: number) => {
      // Skip rendering when scrolled out of view — saves CPU/battery on mobile
      if (!isVisibleRef.current) {
        animFrameIdRef.current = requestAnimationFrame(render);
        return;
      }

      const elapsed = (time - startTime) * 0.001;

      const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const mouseRadius = mouse.radius;
      const mouseRadiusSq = mouseRadius * mouseRadius;

      // Crisp monospace typography matched to cell size
      const isLarge = width >= 600;
      const fontSize = isLarge ? Math.max(6.5, Math.min(8.5, width / 95)) : Math.max(5.5, Math.min(7.5, width / 75));
      ctx.font = `600 ${fontSize}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const hasMouse = mouse.isHovered && mouse.x >= 0 && mouse.y >= 0;

      // Update cursor speed
      if (hasMouse) {
        const mdx = mouse.x - mouse.prevX;
        const mdy = mouse.y - mouse.prevY;
        mouse.speed = Math.min(Math.sqrt(mdx * mdx + mdy * mdy), 35);
        mouse.prevX = mouse.x;
        mouse.prevY = mouse.y;
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // ─── 1. MOUSE ATTRACTION / REPULSION & RIPPLE WAVE ───
        if (hasMouse) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouseRadiusSq && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const norm = dist / mouseRadius; // 0 (cursor center) to 1 (outer edge)

            // Dynamic repulsion with cursor speed boost
            const speedBoost = 1.0 + mouse.speed * 0.06;
            const repelPower = (1 - norm) * (1 - norm) * 8.5 * speedBoost;

            // Fluid ripple wave disturbance propagating outward
            const wave = Math.sin(dist * 0.12 - elapsed * 9) * (1 - norm) * 3.0;

            const nx = dx / dist;
            const ny = dy / dist;

            p.vx += nx * (repelPower + wave);
            p.vy += ny * (repelPower + wave);

            // Subtle matrix shimmer near cursor
            if (norm < 0.45 && Math.random() < 0.08) {
              const rampIdx = Math.floor(Math.random() * DENSITY_RAMP.length);
              p.char = DENSITY_RAMP[rampIdx];
            }
          }
        }

        // ─── 2. ELASTIC SPRING RETURN TO HOME ORIGIN ───
        const dxHome = p.x0 - p.x;
        const dyHome = p.y0 - p.y;

        p.vx += dxHome * 0.088;
        p.vy += dyHome * 0.088;
        p.vx *= 0.82;
        p.vy *= 0.82;

        p.x += p.vx;
        p.y += p.vy;

        // Reset glyph back to baseChar
        if (p.char !== p.baseChar && Math.random() < 0.06) {
          p.char = p.baseChar;
        }

        // ─── 3. IDLE ORGANIC BREATHING & MICRO-SHIMMER ───
        // Very subtle micro-flow so portrait feels alive at rest
        const idleX = Math.sin(elapsed * 1.2 + p.y0 * 0.012) * 0.6;
        const idleY = Math.cos(elapsed * 1.4 + p.x0 * 0.012) * 0.45;

        // Subtle ambient micro-flicker on 0.25% of characters
        if (Math.random() < 0.0025) {
          const offset = Math.random() > 0.5 ? 1 : -1;
          const curIdx = DENSITY_RAMP.indexOf(p.baseChar);
          if (curIdx !== -1) {
            const newIdx = Math.max(0, Math.min(DENSITY_RAMP.length - 1, curIdx + offset));
            p.char = DENSITY_RAMP[newIdx];
          }
        }

        // ─── 4. COLOR ILLUMINATION ON DISPLACEMENT ───
        const distFromHome = Math.sqrt(dxHome * dxHome + dyHome * dyHome);
        let color = p.baseColor;

        if (distFromHome > 2.0) {
          // Glows with highlight accent when scattered / disturbed
          color = p.highlightColor;
        }

        // ─── 5. DRAW TEXT GLYPH ───
        ctx.fillStyle = color;
        ctx.fillText(p.char, p.x + idleX, p.y + idleY);
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  // Desktop mouse handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const curX = e.clientX - rect.left;
    const curY = e.clientY - rect.top;
    if (mouseRef.current.prevX === -9999) {
      mouseRef.current.prevX = curX;
      mouseRef.current.prevY = curY;
    }
    mouseRef.current.x = curX;
    mouseRef.current.y = curY;
    mouseRef.current.isHovered = true;
  };

  const handleMouseEnter = () => {
    mouseRef.current.isHovered = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.isHovered = false;
    mouseRef.current.x = -9999;
    mouseRef.current.y = -9999;
    mouseRef.current.prevX = -9999;
    mouseRef.current.prevY = -9999;
    mouseRef.current.speed = 0;
  };

  // Mobile / touch handlers
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || e.touches.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    const curX = e.touches[0].clientX - rect.left;
    const curY = e.touches[0].clientY - rect.top;
    if (mouseRef.current.prevX === -9999) {
      mouseRef.current.prevX = curX;
      mouseRef.current.prevY = curY;
    }
    mouseRef.current.x = curX;
    mouseRef.current.y = curY;
    mouseRef.current.isHovered = true;
  };

  const handleTouchEnd = () => {
    mouseRef.current.isHovered = false;
    mouseRef.current.x = -9999;
    mouseRef.current.y = -9999;
    mouseRef.current.prevX = -9999;
    mouseRef.current.prevY = -9999;
    mouseRef.current.speed = 0;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full h-full flex items-center justify-center cursor-crosshair select-none ${className}`}
      style={{ touchAction: "pan-y" }}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full transition-opacity duration-700 pointer-events-auto [mask-image:linear-gradient(to_bottom,black_75%,transparent_98%)] [-webkit-mask-image:linear-gradient(to_bottom,black_75%,transparent_98%)]"
        style={{
          opacity: isReady ? 1 : 0,
        }}
      />

      {/* Fallback loader during sampling */}
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center text-accent/60 font-mono text-xs animate-pulse">
          <span>&gt; compiling_highres_ascii_matrix...</span>
        </div>
      )}
    </div>
  );
}
