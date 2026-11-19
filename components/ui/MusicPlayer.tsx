"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMusicPlayer, TRACKS } from "@/lib/MusicContext";

// ─── Equalizer Visualizer ─────────────────────────────────────────────────────

function Equalizer({ playing }: { playing: boolean }) {
  const bars = [14, 18, 10, 16, 12];

  return (
    <div className="flex items-end gap-[2px] h-3.5" aria-hidden="true">
      {bars.map((maxH, i) => (
        <motion.div
          key={i}
          className="w-[2.5px] rounded-full bg-accent-500"
          animate={
            playing
              ? { height: ["3px", `${maxH}px`, "4px", `${Math.max(5, maxH - 4)}px`, "3px"] }
              : { height: "3px" }
          }
          transition={{
            duration: 0.75 + i * 0.1,
            repeat: Infinity,
            delay: i * 0.12,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── MusicPlayer Component ───────────────────────────────────────────────────

export default function MusicPlayer() {
  const {
    trackIdx,
    playing,
    currentTime,
    duration,
    volume,
    muted,
    autoPlay,
    loading,
    lyrics,
    lyricsLoading,
    activeLine,
    togglePlay,
    seek,
    changeTrack,
    prev,
    next,
    setVolume,
    setMuted,
    setAutoPlay,
  } = useMusicPlayer();

  const progressRef = useRef<HTMLDivElement>(null);
  const lyricsRef = useRef<HTMLDivElement>(null);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);

  const track = TRACKS[trackIdx];

  const fmt = (s: number) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !duration) return;
    const rect = progressRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    seek(ratio);
  };

  // Auto-scroll active lyric line smoothly
  useEffect(() => {
    if (!lyricsRef.current || activeLine < 0) return;
    const container = lyricsRef.current;
    const el = container.children[activeLine] as HTMLElement;
    if (!el) return;
    const containerMid = container.clientHeight / 2;
    const targetTop = el.offsetTop - containerMid + el.clientHeight / 2;
    container.scrollTo({ top: targetTop, behavior: "smooth" });
  }, [activeLine]);

  // Keyboard shortcuts (Space = Play/Pause, Esc = close drawer)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === "Escape") {
        setShowLyrics(false);
        setShowPlaylist(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [togglePlay]);

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="relative max-w-[460px] w-full"
      role="region"
      aria-label="Music Player"
    >
      {/* ── Main Audio Deck ── */}
      <div className="relative rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-primary)]/90 backdrop-blur-xl shadow-[0_12px_36px_rgba(249,115,22,0.08),0_2px_8px_rgba(0,0,0,0.04)] p-5 space-y-4 overflow-hidden transition-all duration-300">
        
        {/* Subtle orange ambient glow in top-right corner */}
        <div
          className="absolute -top-12 -right-12 w-48 h-48 pointer-events-none rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)",
          }}
        />

        {/* ── Top Row: Vinyl Disc + Track Info + Auto Badge ── */}
        <div className="relative z-10 flex items-center gap-4">
          
          {/* Realistic Vinyl Record */}
          <div className="relative shrink-0 w-[68px] h-[68px]">
            {/* Vinyl Body */}
            <motion.div
              className="w-full h-full rounded-full overflow-hidden relative shadow-[0_8px_20px_rgba(0,0,0,0.22)] border-2 border-neutral-900 bg-neutral-950 flex items-center justify-center cursor-pointer"
              onClick={togglePlay}
              animate={playing ? { rotate: 360 } : { rotate: 0 }}
              transition={
                playing
                  ? { duration: 5, repeat: Infinity, ease: "linear" }
                  : { duration: 0.6, ease: "easeOut" }
              }
              title={playing ? "Click to pause" : "Click to play"}
            >
              {/* Concentric Vinyl Grooves texture */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background:
                    "repeating-radial-gradient(circle, transparent 0, transparent 2px, rgba(255,255,255,0.04) 3px, transparent 4px)",
                }}
              />
              
              {/* Metallic Sheen Angle reflection */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background:
                    "conic-gradient(from 45deg, transparent 0deg, rgba(255,255,255,0.08) 60deg, transparent 120deg, rgba(255,255,255,0.08) 240deg, transparent 300deg)",
                }}
              />

              {/* Center Album Artwork Label */}
              <div className="relative w-7 h-7 rounded-full overflow-hidden shadow-inner border border-neutral-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={track.cover}
                  alt={track.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Spindle hole */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-2 h-2 rounded-full bg-[var(--color-bg-primary)] ring-1 ring-neutral-700 shadow-inner" />
              </div>
            </motion.div>
          </div>

          {/* Track Details */}
          <div className="flex-1 min-w-0">
            {/* Header pill: Clean SVG wave + text + equalizer */}
            <div className="flex items-center gap-2 mb-1">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-accent-500/25 bg-accent-500/10">
                <svg
                  className="w-3 h-3 text-accent-500 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v20M17 5v14M7 9v6M22 10v4M2 11v2" />
                </svg>
                <span className="text-[10px] uppercase tracking-wider text-accent-500 font-bold font-sans">
                  Now Playing
                </span>
              </div>
              {playing && <Equalizer playing={playing} />}
              {loading && (
                <span className="text-[10px] text-[var(--color-text-secondary)] opacity-70 animate-pulse">
                  loading…
                </span>
              )}
            </div>

            {/* Song Title & Artist */}
            <h3 className="font-serif text-lg font-bold text-[var(--color-text-primary)] truncate leading-tight tracking-tight">
              {track.title}
            </h3>
            <p className="font-sans text-xs text-[var(--color-text-secondary)] font-medium truncate mt-0.5">
              {track.artist}
            </p>
          </div>

          {/* Auto-play toggle button */}
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`text-[10px] font-sans font-bold tracking-wider px-2.5 py-1 rounded-full border transition-all duration-200 shrink-0 ${
              autoPlay
                ? "bg-accent-500 text-white border-accent-500 shadow-sm shadow-accent-500/25"
                : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:border-accent-500/40"
            }`}
            aria-label={`Auto-play ${autoPlay ? "on" : "off"}`}
            title="Auto-play next track"
          >
            AUTO
          </button>
        </div>

        {/* ── Progress Bar & Timestamp ── */}
        <div className="space-y-1.5 relative z-10 pt-1">
          <div
            ref={progressRef}
            className="h-2 bg-[var(--color-bg-secondary)] rounded-full cursor-pointer group relative overflow-hidden transition-all duration-200 hover:h-2.5 border border-[var(--color-border)]/40"
            onClick={handleProgressClick}
            role="slider"
            aria-label="Seek track position"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {/* Active filled track */}
            <div
              className="relative h-full rounded-full bg-gradient-to-r from-orange-500 via-accent-500 to-amber-400 transition-all duration-100 shadow-[0_0_10px_rgba(249,115,22,0.35)]"
              style={{ width: `${progress}%` }}
            >
              {/* Subtle light shimmer */}
              <div className="absolute inset-0 bg-white/20 rounded-full" />
            </div>
          </div>

          {/* Time indicators */}
          <div className="flex justify-between font-mono text-[10px] text-[var(--color-text-secondary)] opacity-80 select-none px-0.5">
            <span>{fmt(currentTime)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>

        {/* ── Control Deck ── */}
        <div className="relative z-10 flex items-center justify-between pt-1">
          
          {/* Previous Track */}
          <button
            onClick={prev}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-transparent hover:border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-accent-500 transition-all duration-200 active:scale-90"
            aria-label="Previous track"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
            </svg>
          </button>

          {/* Play/Pause Button (Tactile Orange Centerpiece) */}
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-accent-600 via-accent-500 to-amber-400 text-white flex items-center justify-center shadow-[0_6px_20px_rgba(249,115,22,0.4)] hover:shadow-[0_8px_26px_rgba(249,115,22,0.55)] hover:scale-105 active:scale-95 transition-all duration-200"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 translate-x-0.5">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Next Track */}
          <button
            onClick={next}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-transparent hover:border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-accent-500 transition-all duration-200 active:scale-90"
            aria-label="Next track"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z" />
            </svg>
          </button>

          {/* Volume Control */}
          <div className="flex items-center gap-2 pl-1">
            <button
              onClick={() => setMuted(!muted)}
              className="text-[var(--color-text-secondary)] hover:text-accent-500 transition-colors duration-200"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted || volume === 0 ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              onChange={(e) => {
                setVolume(+e.target.value);
                setMuted(false);
              }}
              className="w-14 h-1 accent-orange-500 cursor-pointer hidden sm:block rounded-full bg-[var(--color-border)]"
              aria-label="Volume slider"
            />
          </div>

          {/* Lyrics Drawer Toggle Button (Clean Vector Mic/Music Sheet) */}
          <button
            onClick={() => {
              setShowLyrics((v) => !v);
              setShowPlaylist(false);
            }}
            className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-200 ${
              showLyrics
                ? "bg-accent-500 text-white border-accent-500 shadow-sm"
                : "border-transparent hover:border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-accent-500"
            }`}
            aria-label="Toggle Lyrics"
            aria-expanded={showLyrics}
            title="Synchronized Lyrics"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" fill={showLyrics ? "currentColor" : "none"} />
              <circle cx="18" cy="16" r="3" fill={showLyrics ? "currentColor" : "none"} />
            </svg>
          </button>

          {/* Playlist Drawer Toggle Button (Clean Vector Playlist) */}
          <button
            onClick={() => {
              setShowPlaylist((v) => !v);
              setShowLyrics(false);
            }}
            className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-200 ${
              showPlaylist
                ? "bg-accent-500 text-white border-accent-500 shadow-sm"
                : "border-transparent hover:border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-accent-500"
            }`}
            aria-label="Toggle Playlist"
            aria-expanded={showPlaylist}
            title="Queue / Playlist"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" strokeWidth="3" />
              <line x1="3" y1="12" x2="3.01" y2="12" strokeWidth="3" />
              <line x1="3" y1="18" x2="3.01" y2="18" strokeWidth="3" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Playlist Drawer ── */}
      <AnimatePresence>
        {showPlaylist && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mt-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-primary)]/95 backdrop-blur-xl shadow-xl overflow-hidden divide-y divide-[var(--color-border)]/40"
          >
            <div className="px-4 py-2.5 bg-[var(--color-bg-secondary)]/50 flex items-center justify-between">
              <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                Up Next ({TRACKS.length} Tracks)
              </span>
              <button
                onClick={() => setShowPlaylist(false)}
                className="text-[var(--color-text-secondary)] hover:text-accent-500 transition-colors"
                aria-label="Close playlist"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            {TRACKS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => {
                  changeTrack(i);
                  setShowPlaylist(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 group ${
                  i === trackIdx
                    ? "border-l-4 border-accent-500 bg-accent-500/10 text-accent-500"
                    : "border-l-4 border-transparent hover:bg-accent-500/5 text-[var(--color-text-primary)]"
                }`}
                aria-current={i === trackIdx}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.cover}
                  alt={t.title}
                  className="w-10 h-10 rounded-xl object-cover shadow-sm shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-sans text-sm font-semibold truncate ${
                      i === trackIdx
                        ? "text-accent-500"
                        : "text-[var(--color-text-primary)] group-hover:text-accent-500"
                    }`}
                  >
                    {t.title}
                  </p>
                  <p className="font-sans text-xs text-[var(--color-text-secondary)] opacity-80 truncate">
                    {t.artist}
                  </p>
                </div>
                {i === trackIdx && playing && <Equalizer playing={playing} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Synchronized Karaoke Lyrics Drawer ── */}
      <AnimatePresence>
        {showLyrics && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mt-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-primary)]/95 backdrop-blur-xl shadow-xl p-4.5"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-2">
                <span className="text-accent-500 text-xs">✦</span>
                <p className="font-sans text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider">
                  Lyrics · <span className="text-accent-500">{track.title}</span>
                </p>
              </div>
              <button
                onClick={() => setShowLyrics(false)}
                className="text-[var(--color-text-secondary)] hover:text-accent-500 transition-colors p-1"
                aria-label="Close lyrics"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Lyrics Kinetic Scroll */}
            <div
              ref={lyricsRef}
              className="max-h-56 overflow-y-auto overscroll-contain pr-1 space-y-1.5 scrollbar-thin"
            >
              {lyricsLoading ? (
                <p className="font-sans text-xs text-[var(--color-text-secondary)] animate-pulse text-center py-6">
                  Loading lyrics…
                </p>
              ) : lyrics?.synced && lyrics.synced.length > 0 ? (
                lyrics.synced.map((line, i) => (
                  <p
                    key={i}
                    className={`font-sans text-xs leading-relaxed transition-all duration-300 px-2 py-1 rounded-lg ${
                      i === activeLine
                        ? "text-accent-500 font-bold scale-[1.02] origin-left bg-accent-500/10 shadow-sm"
                        : "text-[var(--color-text-secondary)] opacity-60 hover:opacity-100"
                    }`}
                  >
                    {line.text || "\u00A0"}
                  </p>
                ))
              ) : lyrics?.plain ? (
                lyrics.plain.split("\n").map((line, i) => (
                  <p
                    key={i}
                    className={`font-sans text-xs leading-relaxed px-2 py-0.5 ${
                      line === ""
                        ? "mb-2"
                        : "text-[var(--color-text-secondary)]"
                    }`}
                  >
                    {line || "\u00A0"}
                  </p>
                ))
              ) : (
                <p className="font-sans text-xs text-[var(--color-text-secondary)] italic text-center py-6 opacity-70">
                  No lyrics available for this track.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
