"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface PixelatedCanvasProps {
  src: string;
  width?: number;
  height?: number;
  cellSize?: number;
  dotScale?: number;
  shape?: "circle" | "square";
  backgroundColor?: string;
  dropoutStrength?: number;
  interactive?: boolean;
  distortionStrength?: number;
  distortionRadius?: number;
  distortionMode?: "swirl" | "ripple" | "push";
  followSpeed?: number;
  jitterStrength?: number;
  jitterSpeed?: number;
  sampleAverage?: boolean;
  tintColor?: string;
  tintStrength?: number;
  className?: string;
}

export function PixelatedCanvas({
  src,
  width = 400,
  height = 500,
  cellSize = 4,
  dotScale = 0.85,
  shape = "circle",
  backgroundColor = "#fafafa",
  dropoutStrength = 0.2,
  interactive = true,
  distortionStrength = 3,
  distortionRadius = 80,
  distortionMode = "push",
  followSpeed = 0.15,
  jitterStrength = 0,
  jitterSpeed = 3,
  sampleAverage = false,
  tintColor = "#f97316",
  tintStrength = 0.08,
  className,
}: PixelatedCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageDataRef = useRef<ImageData | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const smoothMouseRef = useRef({ x: -9999, y: -9999 });
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);
  const lastFrameRef = useRef(0);

  const loadImage = useCallback(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const ctx = offscreen.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, width, height);
      imageDataRef.current = ctx.getImageData(0, 0, width, height);
    };
    img.src = src;
  }, [src, width, height]);

  const getPixel = useCallback(
    (data: Uint8ClampedArray, x: number, y: number) => {
      const i = (Math.round(y) * width + Math.round(x)) * 4;
      return [data[i], data[i + 1], data[i + 2], data[i + 3]];
    },
    [width]
  );

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageDataRef.current) {
      animFrameRef.current = requestAnimationFrame(draw);
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Throttle to ~15fps (66ms per frame)
    const now = performance.now();
    if (now - lastFrameRef.current < 66) {
      animFrameRef.current = requestAnimationFrame(draw);
      return;
    }
    lastFrameRef.current = now;

    timeRef.current += 0.016 * jitterSpeed;
    const t = timeRef.current;

    // Smooth mouse follow
    smoothMouseRef.current.x +=
      (mouseRef.current.x - smoothMouseRef.current.x) * followSpeed;
    smoothMouseRef.current.y +=
      (mouseRef.current.y - smoothMouseRef.current.y) * followSpeed;

    const { data } = imageDataRef.current;
    const cols = Math.ceil(width / cellSize);
    const rows = Math.ceil(height / cellSize);

    // Parse tint
    const tr = parseInt(tintColor.slice(1, 3), 16);
    const tg = parseInt(tintColor.slice(3, 5), 16);
    const tb = parseInt(tintColor.slice(5, 7), 16);

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cx = col * cellSize + cellSize / 2;
        const cy = row * cellSize + cellSize / 2;

        // Jitter
        const jx = Math.sin(col * 0.8 + t) * jitterStrength;
        const jy = Math.cos(row * 0.8 + t) * jitterStrength;

        // Distortion
        let dx = 0;
        let dy = 0;
        if (interactive) {
          const mx = smoothMouseRef.current.x;
          const my = smoothMouseRef.current.y;
          const dist = Math.hypot(cx - mx, cy - my);
          if (dist < distortionRadius) {
            const factor = (1 - dist / distortionRadius) * distortionStrength;
            if (distortionMode === "push") {
              dx = ((cx - mx) / dist) * factor * 8;
              dy = ((cy - my) / dist) * factor * 8;
            } else if (distortionMode === "swirl") {
              const angle = Math.atan2(cy - my, cx - mx) + factor * 0.5;
              dx = Math.cos(angle) * factor * 6;
              dy = Math.sin(angle) * factor * 6;
            } else if (distortionMode === "ripple") {
              const wave = Math.sin(dist * 0.2 - t * 3) * factor * 5;
              dx = ((cx - mx) / dist) * wave;
              dy = ((cy - my) / dist) * wave;
            }
          }
        }

        const sx = Math.min(Math.max(cx + jx + dx, 0), width - 1);
        const sy = Math.min(Math.max(cy + jy + dy, 0), height - 1);

        let [r, g, b, a] = sampleAverage
          ? (() => {
              let sr = 0, sg = 0, sb = 0, sa = 0, count = 0;
              for (let oy = -1; oy <= 1; oy++) {
                for (let ox = -1; ox <= 1; ox++) {
                  const [pr, pg, pb, pa] = getPixel(data, sx + ox, sy + oy);
                  sr += pr; sg += pg; sb += pb; sa += pa; count++;
                }
              }
              return [sr / count, sg / count, sb / count, sa / count];
            })()
          : getPixel(data, sx, sy);

        if (a < 10) continue;
        if (dropoutStrength > 0 && Math.random() < dropoutStrength * 0.3) continue;

        // Apply tint
        r = r * (1 - tintStrength) + tr * tintStrength;
        g = g * (1 - tintStrength) + tg * tintStrength;
        b = b * (1 - tintStrength) + tb * tintStrength;

        const radius = (cellSize / 2) * dotScale;
        ctx.fillStyle = `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
        ctx.beginPath();
        if (shape === "circle") {
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        } else {
          ctx.rect(cx - radius, cy - radius, radius * 2, radius * 2);
        }
        ctx.fill();
      }
    }

    animFrameRef.current = requestAnimationFrame(draw);
  }, [
    width, height, cellSize, dotScale, shape, backgroundColor,
    dropoutStrength, interactive, distortionStrength, distortionRadius,
    distortionMode, followSpeed, jitterStrength, jitterSpeed,
    sampleAverage, tintColor, tintStrength, getPixel,
  ]);

  useEffect(() => {
    loadImage();
  }, [loadImage]);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [draw]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!interactive) return;
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const scaleX = width / rect.width;
      const scaleY = height / rect.height;
      mouseRef.current = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    },
    [interactive, width, height]
  );

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("cursor-crosshair", className)}
      style={{ width: "100%", height: "auto", willChange: "transform" }}
    />
  );
}
