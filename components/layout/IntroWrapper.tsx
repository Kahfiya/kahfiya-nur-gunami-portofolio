"use client";

import { useState, useCallback } from "react";
import IntroLoader from "@/components/ui/IntroLoader";

export default function IntroWrapper({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);

  const handleComplete = useCallback(() => setDone(true), []);

  return (
    <>
      {!done && <IntroLoader onComplete={handleComplete} />}
      <div
        style={{
          opacity: done ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: done ? "auto" : "none",
        }}
      >
        {children}
      </div>
    </>
  );
}
