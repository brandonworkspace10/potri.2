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
          paddingRight: 4,
        }}
      >
        <span
          style={{
            color: "#f5f6f7",
            fontSize: 112,
            fontWeight: 700,
            fontFamily: "sans-serif",
            lineHeight: 1,
          }}
        >
          T
        </span>
        <svg
          width="38"
          height="34"
          viewBox="0 0 12 11"
          style={{ alignSelf: "flex-end", marginLeft: 7, marginBottom: 20 }}
        >
          <path d="M6 0 11 10 1 10Z" fill="#ff8a34" />
        </svg>
      </div>
    ),
    size,
  );
}
