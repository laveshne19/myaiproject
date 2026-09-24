import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import { site } from "@/lib/site";

export const dynamic = "force-static";
export const alt = site.fullName;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function productImageDataUri() {
  const file = readFileSync(join(process.cwd(), "public", "recolx-tap-device.png"));
  return `data:image/png;base64,${file.toString("base64")}`;
}

export default async function Image() {
  const productImage = productImageDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "radial-gradient(circle at 15% 18%, #241a0c 0%, #07070a 62%)",
          color: "#f6f5f2",
          fontFamily: "sans-serif",
          padding: "0 70px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 620 }}>
          <div
            style={{
              display: "flex",
              width: 72,
              height: 72,
              borderRadius: 36,
              background: "#e8a655",
              marginBottom: 32,
            }}
          />
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
            {site.name}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#a3a2ac", marginTop: 16 }}>
            {site.tagline}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#e8a655", marginTop: 24, fontWeight: 600 }}>
            ₹{site.price.display} · GPT-5.2 powered
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={productImage}
          alt=""
          width={440}
          height={520}
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    { ...size }
  );
}
