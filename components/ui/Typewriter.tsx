"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  words: string[];
  /** ms per character typed */
  typeSpeed?: number;
  /** ms per character deleted */
  deleteSpeed?: number;
  /** ms pause after fully typed */
  pauseAfterType?: number;
  /** ms pause after fully deleted */
  pauseAfterDelete?: number;
  className?: string;
  cursorClassName?: string;
}

export default function Typewriter({
  words,
  typeSpeed = 80,
  deleteSpeed = 45,
  pauseAfterType = 1800,
  pauseAfterDelete = 400,
  className = "",
  cursorClassName = "",
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;
    const current = words[wordIndex % words.length];

    if (isPaused) return;

    const delay = isDeleting
      ? deleteSpeed
      : displayed.length === current.length
      ? pauseAfterType
      : typeSpeed;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayed.length === current.length) {
        // Fully typed — pause then start deleting
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseAfterType);
        return;
      }

      if (isDeleting && displayed.length === 0) {
        // Fully deleted — pause then move to next word
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
        }, pauseAfterDelete);
        return;
      }

      setDisplayed(
        isDeleting
          ? current.slice(0, displayed.length - 1)
          : current.slice(0, displayed.length + 1)
      );
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, isPaused, wordIndex, words, typeSpeed, deleteSpeed, pauseAfterType, pauseAfterDelete]);

  return (
    <span className={className} aria-label={words[wordIndex % words.length]}>
      <span aria-hidden="true">{displayed}</span>
      {/* Blinking cursor */}
      <span
        aria-hidden="true"
        className={`inline-block w-[3px] h-[1em] ml-[2px] align-middle bg-accent-500 animate-pulse ${cursorClassName}`}
      />
    </span>
  );
}
