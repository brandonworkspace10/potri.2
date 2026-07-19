import { ImageResponse } from "next/og";

/** Browser-tab favicon: "T" + the three-agent triangle on the brand surface. */
export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 10,
          paddingRight: 1,
        }}
      >
        <span
          style={{
            color: "#f5f6f7",
            fontSize: 32,
            fontWeight: 700,
            fontFamily: "sans-serif",
            lineHeight: 1,
          }}
        >
          T
        </span>
        <svg
          width="11"
          height="10"
          viewBox="0 0 12 11"
          style={{ alignSelf: "flex-end", marginLeft: 2, marginBottom: 5 }}
        >
          <path d="M6 0 11 10 1 10Z" fill="#ff8a34" />
        </svg>
      </div>
    ),
    size,
  );
}
