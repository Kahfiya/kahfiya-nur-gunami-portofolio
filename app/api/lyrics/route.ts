import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "";
  const artist = searchParams.get("artist") ?? "";

  try {
    const res = await fetch(
      `https://lrclib.net/api/get?track_name=${encodeURIComponent(title)}&artist_name=${encodeURIComponent(artist)}`,
      {
        headers: { "User-Agent": "portfolio-music-player/1.0" },
        next: { revalidate: 86400 }, // cache 24h on server
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    const data = await res.json();
    return NextResponse.json({
      syncedLyrics: data.syncedLyrics ?? null,
      plainLyrics: data.plainLyrics ?? null,
    });
  } catch {
    return NextResponse.json({ error: "fetch failed" }, { status: 500 });
  }
}
