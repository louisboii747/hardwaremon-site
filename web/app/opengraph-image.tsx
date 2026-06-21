import { ImageResponse } from "next/og";

export const alt = "HardwareMon — see what your computer is actually doing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#050607",
          color: "#f6f7f8",
          fontFamily: "sans-serif",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 620,
            height: 620,
            right: -160,
            top: -220,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(49,211,223,.35), rgba(5,6,7,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            left: 120,
            bottom: -360,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(160,87,255,.26), rgba(5,6,7,0) 70%)",
          }}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24 }}>
            <div
              style={{
                width: 42,
                height: 42,
                border: "1px solid rgba(255,255,255,.25)",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#7ef9ff",
              }}
            >
              H
            </div>
            HardwareMon
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                color: "#7ef9ff",
                textTransform: "uppercase",
                letterSpacing: 6,
                fontSize: 18,
                marginBottom: 22,
              }}
            >
              Open-source system monitoring
            </div>
            <div
              style={{
                display: "flex",
                maxWidth: 920,
                fontSize: 76,
                lineHeight: 0.95,
                letterSpacing: -4,
                fontWeight: 600,
              }}
            >
              See what your computer is doing.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 28,
              color: "rgba(255,255,255,.58)",
              fontSize: 20,
            }}
          >
            <span>Windows + Linux</span>
            <span>Live telemetry</span>
            <span>Historical analytics</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
