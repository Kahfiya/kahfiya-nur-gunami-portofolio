"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  drift: number;      // horizontal drift speed
  driftAngle: number; // current drift phase
  driftAmp: number;   // drift amplitude
}

const PARTICLE_COUNT = 38;
const COLOR = "249, 115, 22"; // accent-500 rgb

function createParticle(canvasWidth: number, canvasHeight: number, fromTop = false): Particle {
  return {
    x: Math.random() * canvasWidth,
    y: fromTop ? Math.random() * -canvasHeight : Math.random() * canvasHeight,
    size: Math.random() * 2.2 + 0.6,
    speed: Math.random() * 0.6 + 0.25,
    opacity: Math.random() * 0.35 + 0.08,
    drift: (Math.random() - 0.5) * 0.4,
    driftAngle: Math.random() * Math.PI * 2,
    driftAmp: Math.random() * 18 + 6,
  };
}

export default function ParticleRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width  = window.innerWidth;
    let height = window.innerHeight;
    let raf: number;

    const resize = () => {
      width  = window.innerWidth;
      height = window.innerHeight;
      canvas.width  = width;
      canvas.height = height;
    };

    resize();

    // Init particles spread across full page height
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(width, height, false)
    );

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        // Gentle sine drift
        p.driftAngle += 0.008;
        p.x += Math.sin(p.driftAngle) * p.driftAmp * 0.012 + p.drift;
        p.y += p.speed;

        // Reset when off screen
        if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
          p.opacity = Math.random() * 0.35 + 0.08;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw glowing dot
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
        grd.addColorStop(0,   `rgba(${COLOR}, ${p.opacity})`);
        grd.addColorStop(0.5, `rgba(${COLOR}, ${p.opacity * 0.4})`);
        grd.addColorStop(1,   `rgba(${COLOR}, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Solid core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLOR}, ${Math.min(p.opacity * 2.5, 0.7)})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(document.body);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9998,
        // Only visible on light bg pages — on dark hero it blends naturally
      }}
    />
  );
}
