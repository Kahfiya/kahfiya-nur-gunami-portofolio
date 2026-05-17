"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useClickSound } from "@/hooks/useClickSound";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const playSound = useClickSound();

  const handleEN = () => {
    if (language !== "en") playSound("lang-en");
    setLanguage("en");
  };

  const handleID = () => {
    if (language !== "id") playSound("lang-id");
    setLanguage("id");
  };

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={handleEN}
        className={[
          "px-2 py-1 text-xs font-sans font-medium transition-colors duration-200",
          language === "en"
            ? "text-neutral-900"
            : "text-neutral-400 hover:text-neutral-700",
        ].join(" ")}
        aria-label="Switch to English"
        aria-pressed={language === "en"}
      >
        EN
      </button>
      <span className="text-neutral-200 text-xs">/</span>
      <button
        type="button"
        onClick={handleID}
        className={[
          "px-2 py-1 text-xs font-sans font-medium transition-colors duration-200",
          language === "id"
            ? "text-neutral-900"
            : "text-neutral-400 hover:text-neutral-700",
        ].join(" ")}
        aria-label="Switch to Indonesian"
        aria-pressed={language === "id"}
      >
        ID
      </button>
    </div>
  );
}
