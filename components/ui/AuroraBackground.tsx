"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  pulseSpeed: number;
  pulseOffset: number;
  colorIndex: number;
}

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  hue: number;
}

// ─── Canvas Layer ─────────────────────────────────────────────────────────────

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const orbsRef = useRef<Orb[]>([]);
  const rafRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Accent palette: amber → orange → warm-red
    const COLORS = [
      [249, 115, 22],   // orange-500
      [251, 146, 60],   // orange-400
      [253, 186, 116],  // orange-300
      [245, 158, 11],   // amber-500
      [217, 119, 6],    // amber-600
    ];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init();
    };

    const init = () => {
      // ── Particles ──
      particlesRef.current = [];
      const count = Math.min(
        Math.floor((canvas.width * canvas.height) / 6000),
        60  // reduced from 120
      );
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,  // reduced from 0.4
          vy: (Math.random() - 0.5) * 0.25,  // reduced from 0.4
          size: Math.random() * 2.5 + 0.5,
          opacity: Math.random() * 0.6 + 0.15,
          pulseSpeed: Math.random() * 0.02 + 0.005,
          pulseOffset: Math.random() * Math.PI * 2,
          colorIndex: Math.floor(Math.random() * COLORS.length),
        });
      }

      // ── Floating orbs ──
      orbsRef.current = [];
      const orbCount = 3;  // reduced from 5
      for (let i = 0; i < orbCount; i++) {
        orbsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          radius: Math.random() * 180 + 80,
          opacity: Math.random() * 0.12 + 0.04,
          hue: Math.random() * 30 + 20, // 20–50 = amber/orange range
        });
      }
    };

    const draw = (now: number) => {
      rafRef.current = requestAnimationFrame(draw);

      // Throttle to ~30fps (33ms per frame)
      if (now - lastFrameTimeRef.current < 33) return;
      lastFrameTimeRef.current = now;

      timeRef.current += 0.016;
      const t = timeRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const REPEL_RADIUS = 140;
      const REPEL_FORCE = 0.06;

      // ── Draw orbs ──
      orbsRef.current.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Soft bounce
        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius;
        if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius;
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius;

        const pulse = Math.sin(t * 0.4 + orb.hue) * 0.3 + 0.7;
        const grad = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, orb.radius
        );
        grad.addColorStop(0, `hsla(${orb.hue}, 90%, 65%, ${orb.opacity * pulse})`);
        grad.addColorStop(0.5, `hsla(${orb.hue + 10}, 85%, 60%, ${orb.opacity * pulse * 0.5})`);
        grad.addColorStop(1, `hsla(${orb.hue + 20}, 80%, 55%, 0)`);

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // ── Draw particles ──
      particlesRef.current.forEach((p) => {
        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0) {
          const factor = (1 - dist / REPEL_RADIUS) * REPEL_FORCE;
          p.x += (dx / dist) * factor * 80;
          p.y += (dy / dist) * factor * 80;
        }

        // Pulsing opacity
        const pulsedOpacity =
          p.opacity * (0.7 + 0.3 * Math.sin(t * p.pulseSpeed * 60 + p.pulseOffset));

        const [r, g, b] = COLORS[p.colorIndex];

        // Core dot only — skip glow radial gradient to reduce draw calls
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${pulsedOpacity})`;
        ctx.fill();
      });

      // ── Draw connecting lines ──
      const pts = particlesRef.current;
      const LINE_DIST = 70;  // reduced from 90 to cut line draw calls
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = dx * dx + dy * dy;
          if (d < LINE_DIST * LINE_DIST) {
            const dist = Math.sqrt(d);
            const alpha = (1 - dist / LINE_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(249, 115, 22, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    resize();
    rafRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ willChange: "transform" }}
      aria-hidden="true"
    />
  );
}

// ─── Aurora Background ────────────────────────────────────────────────────────

export default function AuroraBackground() {
  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-accent-50 to-orange-50/60" />

      {/* Slow-drifting aurora blobs */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(253,186,116,0.25) 0%, rgba(249,115,22,0.08) 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 60, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-[70vw] h-[70vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(245,158,11,0.2) 0%, rgba(251,146,60,0.07) 50%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />

      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[50vw] h-[50vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(254,215,170,0.18) 0%, rgba(249,115,22,0.05) 60%, transparent 80%)",
          filter: "blur(50px)",
        }}
        animate={{
          x: [0, 40, -60, 20, 0],
          y: [0, -60, 20, 40, 0],
          scale: [1, 1.2, 0.85, 1.05, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 10 }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(249,115,22,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249,115,22,1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Top vignette to blend with content */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background-primary to-transparent" />
    </div>
  );
}
