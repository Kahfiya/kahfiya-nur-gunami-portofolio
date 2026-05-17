"use client";

import React, { useRef, useState, useCallback } from "react";

interface Position { x: number; y: number; }

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, [isFocused]);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={() => { setIsFocused(true); setOpacity(1); }}
      onBlur={() => { setIsFocused(false); setOpacity(0); }}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden ${className}`}
      style={{ isolation: "isolate" }}
    >
      {/* Children rendered first */}
      {children}

      {/* Spotlight overlay on top of children */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-in-out"
        style={{
          opacity,
          zIndex: 10,
          background: `radial-gradient(circle 300px at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
          mixBlendMode: "overlay",
        }}
        aria-hidden="true"
      />

      {/* Border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
        style={{
          opacity: opacity * 0.5,
          zIndex: 11,
          boxShadow: `inset 0 0 0 1px ${spotlightColor}`,
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default SpotlightCard;
