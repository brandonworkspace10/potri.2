import { ImageResponse } from "next/og";

/** iOS home-screen icon. iOS applies its own corner mask, so no radius here. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0b0d",
          backgroundImage:
            "radial-gradient(90% 90% at 50% 0%, rgba(255,138,52,0.18), rgba(255,138,52,0) 70%)",
          color: "#f5f6f7",
          fontSize: 118,
          fontWeight: 700,
          fontFamily: "sans-serif",
          paddingBottom: 18,
          paddingRight: 6,
        }}
      >
        t<span style={{ color: "#ff8a34" }}>.</span>
      </div>
    ),
    size,
  );
}
