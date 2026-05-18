"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Track {
  id: number;
  title: string;
  artist: string;
  cover: string;
  src: string;
}

const TRACKS: Track[] = [
  {
    id: 1,
    title: "Her",
    artist: "JVKE",
    cover: "/Audio/Cover/her.jpg",
    src: "/Audio/her - JVKE.mp3",
  },
  {
    id: 2,
    title: "Happiness",
    artist: "Rex Orange County",
    cover: "/Audio/Cover/Happiness.jpg",
    src: "/Audio/Happiness - Rex Orange County.mp3",
  },
  {
    id: 3,
    title: "Best Friend",
    artist: "Rex Orange County",
    cover: "/Audio/Cover/Best Friend.jpg",
    src: "/Audio/Best Friend - Rex Orange County.mp3",
  },
];

// ─── LRC parser ───────────────────────────────────────────────────────────────

interface LrcLine { time: number; text: string; }

function parseLrc(lrc: string): LrcLine[] {
  return lrc.split("\n")
    .map(line => {
      const m = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
      if (!m) return null;
      return { time: parseInt(m[1]) * 60 + parseFloat(m[2]), text: m[3].trim() };
    })
    .filter(Boolean) as LrcLine[];
}

async function fetchLyrics(title: string, artist: string): Promise<{ synced: LrcLine[]; plain: string } | null> {
  const key = `lrc_${title}_${artist}`;
  const cached = localStorage.getItem(key);
  if (cached) return JSON.parse(cached);

  try {
    const res = await fetch(
      `https://lrclib.net/api/get?track_name=${encodeURIComponent(title)}&artist_name=${encodeURIComponent(artist)}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    const result = {
      synced: data.syncedLyrics ? parseLrc(data.syncedLyrics) : [],
      plain: data.plainLyrics ?? "",
    };
    localStorage.setItem(key, JSON.stringify(result));
    return result;
  } catch {
    return null;
  }
}

function Equalizer({ playing }: { playing: boolean }) {
  return (
    <div className="flex items-end gap-[2px] h-4" aria-hidden="true">
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-accent-500"
          animate={playing ? { height: ["4px", "16px", "6px", "14px", "4px"] } : { height: "4px" }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const lyricsRef = useRef<HTMLDivElement>(null);
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lyrics, setLyrics] = useState<{ synced: LrcLine[]; plain: string } | null>(null);
  const [lyricsLoading, setLyricsLoading] = useState(false);
  const [activeLine, setActiveLine] = useState(-1);

  const track = TRACKS[trackIdx];
  const hasSrc = !!track.src;

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const togglePlay = useCallback(() => {
    if (!hasSrc) { setUnavailable(true); return; }
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().then(() => setPlaying(true)).catch(() => setUnavailable(true)); }
  }, [playing, hasSrc]);

  const seek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current || !duration) return;
    const rect = progressRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioRef.current.currentTime = ratio * duration;
  }, [duration]);

  const changeTrack = (idx: number) => {
    setTrackIdx(idx);
    setPlaying(false);
    setCurrentTime(0);
    setUnavailable(false);
    if (autoPlay && TRACKS[idx].src) setTimeout(() => audioRef.current?.play().then(() => setPlaying(true)), 100);
  };

  const prev = () => changeTrack((trackIdx - 1 + TRACKS.length) % TRACKS.length);
  const next = () => changeTrack((trackIdx + 1) % TRACKS.length);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => {
      setCurrentTime(a.currentTime);
      // sync lyrics
      if (lyrics?.synced.length) {
        let idx = -1;
        for (let i = 0; i < lyrics.synced.length; i++) {
          if (a.currentTime >= lyrics.synced[i].time) idx = i;
        }
        setActiveLine(idx);
      }
    };
    const onMeta = () => setDuration(a.duration);
    const onEnd = () => { setPlaying(false); if (autoPlay) next(); };
    const onWait = () => setLoading(true);
    const onCanPlay = () => setLoading(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    a.addEventListener("waiting", onWait);
    a.addEventListener("canplay", onCanPlay);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
      a.removeEventListener("waiting", onWait);
      a.removeEventListener("canplay", onCanPlay);
    };
  }, [autoPlay, lyrics]);

  // Fetch lyrics when track changes
  useEffect(() => {
    setLyrics(null);
    setActiveLine(-1);
    setLyricsLoading(true);
    fetchLyrics(track.title, track.artist).then(result => {
      setLyrics(result);
      setLyricsLoading(false);
    });
  }, [trackIdx]);

  // Auto-scroll active lyric line
  useEffect(() => {
    if (!lyricsRef.current || activeLine < 0) return;
    const el = lyricsRef.current.children[activeLine] as HTMLElement;
    el?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [activeLine]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = muted ? 0 : volume;
  }, [volume, muted]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === " ") { e.preventDefault(); togglePlay(); }
      if (e.key === "ArrowRight" && audioRef.current) audioRef.current.currentTime = Math.min(duration, currentTime + 5);
      if (e.key === "ArrowLeft" && audioRef.current) audioRef.current.currentTime = Math.max(0, currentTime - 5);
      if (e.key === "ArrowUp") setVolume(v => Math.min(1, v + 0.1));
      if (e.key === "ArrowDown") setVolume(v => Math.max(0, v - 0.1));
      if (e.key === "Escape") { setShowLyrics(false); setShowPlaylist(false); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [togglePlay, duration, currentTime]);

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative max-w-[450px] w-full" role="region" aria-label="Music Player">
      {hasSrc && <audio ref={audioRef} src={track.src} preload="metadata" />}

      {/* Main card */}
      <div className="rounded-2xl border border-orange-100 bg-white/80 backdrop-blur-md shadow-[0_4px_24px_rgba(249,115,22,0.12)] p-4 space-y-3">

        {/* Top row */}
        <div className="flex items-center gap-3">
          {/* Album art — vinyl disc */}
          <div className="relative shrink-0 w-16 h-16">
            <motion.div
              className="w-16 h-16 rounded-full overflow-hidden shadow-lg ring-4 ring-neutral-900 ring-offset-2 ring-offset-white"
              animate={playing ? { rotate: 360 } : { rotate: 0 }}
              transition={playing ? { duration: 6, repeat: Infinity, ease: "linear" } : { duration: 0.4 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={track.cover} alt={track.title} className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
            {/* Center hole */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-3 h-3 rounded-full bg-white ring-1 ring-neutral-300 shadow-inner" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] uppercase tracking-widest text-accent-500 font-semibold font-sans">🎵 Now Playing</span>
              {playing && <Equalizer playing={playing} />}
              {loading && <span className="text-[10px] text-neutral-400">buffering…</span>}
            </div>
            <p className="font-serif text-base font-bold text-neutral-900 truncate leading-tight">{track.title}</p>
            <p className="font-sans text-sm text-neutral-500 truncate">{track.artist}</p>
          </div>

          {/* Auto-play toggle */}
          <button
            onClick={() => setAutoPlay(v => !v)}
            className={`text-[10px] font-sans px-2 py-1 rounded-full border transition-all ${autoPlay ? "bg-accent-500 text-white border-accent-500" : "text-neutral-400 border-neutral-200 hover:border-accent-300"}`}
            aria-label={`Auto-play ${autoPlay ? "on" : "off"}`}
            title="Auto-play"
          >
            AUTO
          </button>
        </div>

        {/* Progress bar */}
        <div className="space-y-1">
          <div
            ref={progressRef}
            className="h-1.5 bg-neutral-100 rounded-full cursor-pointer group"
            onClick={seek}
            role="slider"
            aria-label="Seek"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="relative h-full rounded-full bg-gradient-to-r from-orange-400 to-accent-500 transition-all" style={{ width: `${progress}%` }}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent-500 shadow opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-neutral-400 font-sans">
            <span>{fmt(currentTime)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          {/* Prev */}
          <button onClick={prev} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-orange-50 text-neutral-500 hover:text-accent-500 transition-all focus:outline-none focus:ring-2 focus:ring-accent-400" aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
          </button>

          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-accent-600 text-white flex items-center justify-center shadow-[0_4px_12px_rgba(249,115,22,0.4)] hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-accent-400"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing
              ? <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              : <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M8 5v14l11-7z"/></svg>
            }
          </button>

          {/* Next */}
          <button onClick={next} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-orange-50 text-neutral-500 hover:text-accent-500 transition-all focus:outline-none focus:ring-2 focus:ring-accent-400" aria-label="Next">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z"/></svg>
          </button>

          {/* Volume */}
          <div className="flex items-center gap-1.5">
            <button onClick={() => setMuted(v => !v)} className="text-neutral-400 hover:text-accent-500 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-400 rounded" aria-label={muted ? "Unmute" : "Mute"}>
              {muted || volume === 0
                ? <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18l2 2L21 18.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z"/></svg>
                : <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
              }
            </button>
            <input
              type="range" min={0} max={1} step={0.01} value={muted ? 0 : volume}
              onChange={e => { setVolume(+e.target.value); setMuted(false); }}
              className="w-16 h-1 accent-orange-500 cursor-pointer hidden sm:block"
              aria-label="Volume"
            />
          </div>

          {/* Lyrics */}
          <button
            onClick={() => { setShowLyrics(v => !v); setShowPlaylist(false); }}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-accent-400 text-xs font-bold font-sans ${showLyrics ? "bg-accent-500 text-white" : "text-neutral-400 hover:text-accent-500 hover:bg-orange-50"}`}
            aria-label="Lyrics" aria-expanded={showLyrics}
          >
            ♪
          </button>

          {/* Playlist */}
          <button
            onClick={() => { setShowPlaylist(v => !v); setShowLyrics(false); }}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-accent-400 ${showPlaylist ? "bg-accent-500 text-white" : "text-neutral-400 hover:text-accent-500 hover:bg-orange-50"}`}
            aria-label="Playlist" aria-expanded={showPlaylist}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>
          </button>
        </div>

        {/* Unavailable notice */}
        {unavailable && (
          <p className="text-[11px] text-center text-amber-600 font-sans">⚠️ Song unavailable — add audio file to enable playback</p>
        )}
      </div>

      {/* Playlist panel */}
      <AnimatePresence>
        {showPlaylist && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-2 rounded-2xl border border-orange-100 bg-white/90 backdrop-blur-md shadow-[0_4px_24px_rgba(249,115,22,0.1)] overflow-hidden"
          >
            {TRACKS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => { changeTrack(i); setShowPlaylist(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all hover:bg-orange-50 focus:outline-none focus:bg-orange-50 ${i === trackIdx ? "border-l-2 border-accent-500 bg-orange-50/60" : "border-l-2 border-transparent"}`}
                aria-current={i === trackIdx}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.cover} alt="" className="w-9 h-9 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className={`font-sans text-sm font-medium truncate ${i === trackIdx ? "text-accent-600" : "text-neutral-800"}`}>{t.title}</p>
                  <p className="font-sans text-xs text-neutral-400 truncate">{t.artist}</p>
                </div>
                {i === trackIdx && playing && <Equalizer playing={playing} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lyrics modal */}
      <AnimatePresence>
        {showLyrics && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-2 rounded-2xl border border-orange-100 bg-white/90 backdrop-blur-md shadow-[0_4px_24px_rgba(249,115,22,0.1)] p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="font-sans text-xs font-semibold text-accent-500 uppercase tracking-widest">Lyrics — {track.title}</p>
              <button onClick={() => setShowLyrics(false)} className="text-neutral-400 hover:text-neutral-600 focus:outline-none" aria-label="Close lyrics">✕</button>
            </div>
            <div ref={lyricsRef} className="max-h-48 overflow-y-auto pr-1 space-y-1">
              {lyricsLoading ? (
                <p className="font-sans text-xs text-neutral-400 animate-pulse text-center py-4">Fetching lyrics…</p>
              ) : lyrics?.synced.length ? (
                lyrics.synced.map((line, i) => (
                  <p
                    key={i}
                    className={`font-sans text-xs leading-relaxed transition-all duration-300 ${
                      i === activeLine
                        ? "text-accent-500 font-semibold scale-[1.02] origin-left"
                        : "text-neutral-400"
                    }`}
                  >
                    {line.text || "\u00A0"}
                  </p>
                ))
              ) : lyrics?.plain ? (
                lyrics.plain.split("\n").map((line, i) => (
                  <p key={i} className={`font-sans text-xs leading-relaxed ${line === "" ? "mb-2" : "text-neutral-600"}`}>{line || "\u00A0"}</p>
                ))
              ) : (
                <p className="font-sans text-xs text-neutral-400 italic text-center py-4">No lyrics found.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
