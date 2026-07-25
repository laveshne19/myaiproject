import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const dynamic = "force-static";
export const alt = site.fullName;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 50% 18%, #241a0c 0%, #07070a 62%)",
          color: "#f6f5f2",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 132,
            height: 132,
            borderRadius: 66,
            background: "#e8a655",
            marginBottom: 40,
          }}
        />
        <div style={{ display: "flex", fontSize: 96, fontWeight: 700, letterSpacing: -3 }}>
          {site.name}
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#a3a2ac", marginTop: 18 }}>
          {site.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
