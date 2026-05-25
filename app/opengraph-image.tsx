import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export const alt = "Kahfiya Nur Gunami | Fullstack Developer & Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fafafa 0%, #fff7ed 50%, #fafafa 100%)",
          padding: "80px",
          fontFamily: "Georgia, serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circle */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "200px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#171717",
            letterSpacing: "0.1em",
            marginBottom: "48px",
          }}
        >
          K.N.G
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: "700",
            color: "#171717",
            lineHeight: 1.1,
            marginBottom: "24px",
          }}
        >
          Kahfiya Nur Gunami
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: "28px",
            color: "#f97316",
            fontWeight: "400",
            marginBottom: "40px",
          }}
        >
          Fullstack Developer &amp; Designer
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: "12px" }}>
          {["Next.js", "TypeScript", "UI/UX", "Framer Motion"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 20px",
                borderRadius: "999px",
                background: "rgba(249,115,22,0.1)",
                border: "1px solid rgba(249,115,22,0.3)",
                color: "#ea580c",
                fontSize: "16px",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Bottom line */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "80px",
            right: "80px",
            height: "1px",
            background: "rgba(249,115,22,0.2)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            left: "80px",
            fontSize: "16px",
            color: "#a3a3a3",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          portofolio.kahfiya.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
