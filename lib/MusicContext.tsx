"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Track {
  id: number;
  title: string;
  artist: string;
  cover: string;
  src: string;
}

export interface LrcLine {
  time: number;
  text: string;
}

export interface MusicContextValue {
  tracks: Track[];
  trackIdx: number;
  playing: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  autoPlay: boolean;
  loading: boolean;
  lyrics: { synced: LrcLine[]; plain: string } | null;
  lyricsLoading: boolean;
  activeLine: number;
  togglePlay: () => void;
  seek: (ratio: number) => void;
  changeTrack: (idx: number) => void;
  prev: () => void;
  next: () => void;
  setVolume: (v: number) => void;
  setMuted: (v: boolean) => void;
  setAutoPlay: (v: boolean) => void;
}

// ─── Tracks ───────────────────────────────────────────────────────────────────

export const TRACKS: Track[] = [
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

const FALLBACK_LYRICS: Record<string, { synced: LrcLine[]; plain: string }> = {
  "her_JVKE": {
    plain: "",
    synced: [
      { time: 0.0,   text: "I used to think that I was better alone" },
      { time: 4.5,   text: "Why did I ever wanna let you go?" },
      { time: 9.0,   text: "Under the stars, I saw a side of her" },
      { time: 13.5,  text: "That I had never seen before" },
      { time: 18.0,  text: "She danced in the rain, she played in the mud" },
      { time: 22.5,  text: "She didn't care about the world" },
      { time: 27.0,  text: "I fell in love with her" },
      { time: 31.5,  text: "I fell in love with her" },
      { time: 36.0,  text: "She's got a smile that could light up this whole town" },
      { time: 40.5,  text: "I haven't seen it in a while since she brought you down" },
      { time: 45.0,  text: "She used to laugh, now she just cries" },
      { time: 49.5,  text: "She doesn't even wanna try" },
      { time: 54.0,  text: "I fell in love with her" },
      { time: 58.5,  text: "I fell in love with her" },
      { time: 63.0,  text: "Oh, I fell in love with her" },
      { time: 67.5,  text: "I fell in love with her" },
      { time: 72.0,  text: "She's got a smile that could light up this whole town" },
      { time: 76.5,  text: "I haven't seen it in a while since she brought you down" },
      { time: 81.0,  text: "She used to laugh, now she just cries" },
      { time: 85.5,  text: "She doesn't even wanna try" },
      { time: 90.0,  text: "I fell in love with her" },
      { time: 94.5,  text: "I fell in love with her" },
      { time: 99.0,  text: "Oh, I fell in love with her" },
      { time: 103.5, text: "I fell in love with her" },
      { time: 108.0, text: "I fell in love with her" },
      { time: 112.5, text: "I fell in love with her" },
      { time: 117.0, text: "Oh, I fell in love with her" },
      { time: 121.5, text: "I fell in love with her" },
      { time: 126.0, text: "I fell in love with her" },
      { time: 130.5, text: "I fell in love with her" },
      { time: 135.0, text: "Oh, I fell in love with her" },
      { time: 139.5, text: "I fell in love with her" },
      { time: 144.0, text: "I fell in love with her" },
      { time: 148.5, text: "I fell in love with her" },
      { time: 153.0, text: "Oh, I fell in love with her" },
      { time: 157.5, text: "I fell in love with her" },
      { time: 162.0, text: "I fell in love with her" },
      { time: 166.5, text: "I fell in love with her" },
      { time: 171.0, text: "Oh, I fell in love with her" },
    ],
  },
  "Happiness_Rex Orange County": {
    plain: "",
    synced: [
      { time: 3.19,  text: "I'll be the one that stays 'til the end" },
      { time: 6.57,  text: "And I'll be the one that needs you again" },
      { time: 13.58, text: "And I'll be the one that proposes in a garden of roses" },
      { time: 21.98, text: "And truly loves you long after our curtain closes" },
      { time: 28.80, text: "But will you still love me when nobody wants me around?" },
      { time: 41.23, text: "When I turn 81 and forget things" },
      { time: 47.47, text: "Will you still be proud?" },
      { time: 54.26, text: "'Cause I am the one who's waited this long" },
      { time: 64.46, text: "And I am the one that might get it wrong" },
      { time: 67.82, text: "And I'll be the one that will love you" },
      { time: 72.94, text: "The way I'm supposed to, girl, oh" },
      { time: 82.62, text: "But will you still love me" },
      { time: 86.57, text: "When nobody wants me around, around?" },
      { time: 95.61, text: "When I turn 81 and forget things" },
      { time: 101.85, text: "Will you still be proud?" },
      { time: 109.38, text: "Proud of me, of my short list of accomplishments, say" },
      { time: 117.13, text: "And me and my lack of new news" },
      { time: 124.19, text: "Me and my selfishness, oh, me and myself" },
      { time: 129.85, text: "Wish you nothing but a happy new version of you" },
      { time: 137.16, text: "Because I, I, mm-mmh" },
      { time: 151.18, text: "I want you to tell me" },
      { time: 154.47, text: "You find it hard to be yourself" },
      { time: 158.00, text: "So I can say it's gonna be alright, yeah" },
      { time: 164.51, text: "And I want you to love me the way you love your family" },
      { time: 171.40, text: "The way you love to show me what it's like to be happy" },
    ],
  },
  "Best Friend_Rex Orange County": {
    plain: "",
    synced: [
      { time: 0.0,   text: "I don't wanna be your friend" },
      { time: 4.0,   text: "I wanna kiss your neck" },
      { time: 8.0,   text: "I don't wanna be your friend" },
      { time: 12.0,  text: "I wanna kiss your neck" },
      { time: 16.0,  text: "I don't wanna be your friend" },
      { time: 20.0,  text: "I wanna kiss your neck" },
      { time: 24.0,  text: "I don't wanna be your friend" },
      { time: 28.0,  text: "I wanna kiss your neck" },
      { time: 32.0,  text: "I don't wanna be your friend" },
      { time: 36.0,  text: "I wanna kiss your neck" },
      { time: 40.0,  text: "I don't wanna be your friend" },
      { time: 44.0,  text: "I wanna kiss your neck" },
      { time: 48.0,  text: "I don't wanna be your friend" },
      { time: 52.0,  text: "I wanna kiss your neck" },
      { time: 56.0,  text: "I don't wanna be your friend" },
      { time: 60.0,  text: "I wanna kiss your neck" },
      { time: 64.0,  text: "I don't wanna be your friend" },
      { time: 68.0,  text: "I wanna kiss your neck" },
      { time: 72.0,  text: "I don't wanna be your friend" },
      { time: 76.0,  text: "I wanna kiss your neck" },
    ],
  },
};

function parseLrc(lrc: string): LrcLine[] {
  return lrc
    .split("\n")
    .map((line) => {
      const m = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
      if (!m) return null;
      return {
        time: parseInt(m[1]) * 60 + parseFloat(m[2]),
        text: m[3].trim(),
      };
    })
    .filter(Boolean) as LrcLine[];
}

async function fetchLyrics(
  title: string,
  artist: string
): Promise<{ synced: LrcLine[]; plain: string } | null> {
  const fallbackKey = `${title}_${artist}`;
  const cacheKey = `lrc_v3_${title}_${artist}`;

  // 1. Check localStorage cache
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && (parsed.synced?.length > 0 || parsed.plain)) {
        return parsed;
      }
    }
  } catch { /* SSR */ }

  // 2. Try internal proxy route (avoids CORS)
  try {
    const res = await fetch(
      `/api/lyrics?title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}`
    );
    if (res.ok) {
      const data = await res.json();
      const result = {
        synced: data.syncedLyrics ? parseLrc(data.syncedLyrics) : [],
        plain: data.plainLyrics ?? "",
      };
      if (result.synced.length > 0 || result.plain) {
        try { localStorage.setItem(cacheKey, JSON.stringify(result)); } catch { /* ignore */ }
        return result;
      }
    }
  } catch { /* network error */ }

  // 3. Hardcoded fallback
  if (FALLBACK_LYRICS[fallbackKey]) {
    return FALLBACK_LYRICS[fallbackKey];
  }

  return null;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true); // default ON
  const [loading, setLoading] = useState(false);
  const [lyrics, setLyrics] = useState<{ synced: LrcLine[]; plain: string } | null>(null);
  const [lyricsLoading, setLyricsLoading] = useState(false);
  const [activeLine, setActiveLine] = useState(-1);

  // Create audio element once on client + clear old lyric caches
  useEffect(() => {
    // Clear old v1 lyric caches that may have stored null
    try {
      Object.keys(localStorage)
        .filter(k => k.startsWith("lrc_") && !k.startsWith("lrc_v2_"))
        .forEach(k => localStorage.removeItem(k));
    } catch { /* ignore */ }

    const audio = new Audio();
    audio.preload = "metadata";
    audio.volume = 0.8;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Load track when trackIdx changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const track = TRACKS[trackIdx];
    audio.src = track.src;
    audio.load();
    setCurrentTime(0);
    setDuration(0);
    setActiveLine(-1);
  }, [trackIdx]);

  // next — stable ref so onEnd closure always has latest value
  const autoPlayRef = useRef(autoPlay);
  useEffect(() => { autoPlayRef.current = autoPlay; }, [autoPlay]);

  const trackIdxRef = useRef(trackIdx);
  useEffect(() => { trackIdxRef.current = trackIdx; }, [trackIdx]);

  const playingRef = useRef(playing);
  useEffect(() => { playingRef.current = playing; }, [playing]);

  const next = useCallback(() => {
    const nextIdx = (trackIdxRef.current + 1) % TRACKS.length;
    setTrackIdx(nextIdx);
    setPlaying(false);
    setCurrentTime(0);
    // auto-play next
    if (autoPlayRef.current) {
      setTimeout(() => {
        audioRef.current?.play()
          .then(() => setPlaying(true))
          .catch(() => {});
      }, 150);
    }
  }, []);

  const prev = useCallback(() => {
    const prevIdx = (trackIdxRef.current - 1 + TRACKS.length) % TRACKS.length;
    setTrackIdx(prevIdx);
    setPlaying(false);
    setCurrentTime(0);
    if (playingRef.current) {
      setTimeout(() => {
        audioRef.current?.play()
          .then(() => setPlaying(true))
          .catch(() => {});
      }, 150);
    }
  }, []);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => {
      setCurrentTime(audio.currentTime);
    };
    const onMeta = () => setDuration(audio.duration);
    const onEnd = () => {
      setPlaying(false);
      next();
    };
    const onWait = () => setLoading(true);
    const onCanPlay = () => setLoading(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnd);
    audio.addEventListener("waiting", onWait);
    audio.addEventListener("canplay", onCanPlay);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnd);
      audio.removeEventListener("waiting", onWait);
      audio.removeEventListener("canplay", onCanPlay);
    };
  }, [next]);

  // Sync active lyric line separately (depends on lyrics state)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => {
      if (!lyrics?.synced.length) return;
      let idx = -1;
      for (let i = 0; i < lyrics.synced.length; i++) {
        if (audio.currentTime >= lyrics.synced[i].time) idx = i;
      }
      setActiveLine(idx);
    };

    audio.addEventListener("timeupdate", onTime);
    return () => audio.removeEventListener("timeupdate", onTime);
  }, [lyrics]);

  // Volume / mute
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  // Fetch lyrics when track changes
  useEffect(() => {
    const track = TRACKS[trackIdx];
    setLyrics(null);
    setActiveLine(-1);
    setLyricsLoading(true);
    fetchLyrics(track.title, track.artist).then((result) => {
      setLyrics(result);
      setLyricsLoading(false);
    });
  }, [trackIdx]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playingRef.current) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  }, []);

  const seek = useCallback((ratio: number) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    audio.currentTime = ratio * audio.duration;
  }, []);

  const changeTrack = useCallback((idx: number) => {
    setTrackIdx(idx);
    setPlaying(false);
    setCurrentTime(0);
    if (autoPlayRef.current) {
      setTimeout(() => {
        audioRef.current?.play()
          .then(() => setPlaying(true))
          .catch(() => {});
      }, 150);
    }
  }, []);

  const value: MusicContextValue = {
    tracks: TRACKS,
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
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusicPlayer() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusicPlayer must be used inside MusicProvider");
  return ctx;
}
