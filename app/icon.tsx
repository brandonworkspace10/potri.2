import { ImageResponse } from "next/og";

/** Browser-tab favicon: the wordmark's "p." on the brand surface. */
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
          color: "#f5f6f7",
          fontSize: 34,
          fontWeight: 700,
          fontFamily: "sans-serif",
          // optical centre: the period pulls the pair right, nudge back
          paddingBottom: 5,
          paddingRight: 2,
        }}
      >
        p<span style={{ color: "#ff8a34" }}>.</span>
      </div>
    ),
    size,
  );
}
