"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./Preloader";

export default function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!done && <Preloader key="preloader" onComplete={() => setDone(true)} />}
      </AnimatePresence>
      {children}
    </>
  );
}
