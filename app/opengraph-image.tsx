import { ImageResponse } from "next/og";

export const alt =
  "Potri — AI employees for real estate investors and wholesalers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const AGENTS = [
  { mono: "A", name: "Andy", role: "Outbound", color: "#ff8a34" },
  { mono: "R", name: "Randy", role: "Inbound 24/7", color: "#4d8dff" },
  { mono: "A", name: "Alyssa", role: "Follow-up", color: "#35c88a" },
];

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0b0d",
          backgroundImage:
            "radial-gradient(80% 60% at 50% -10%, rgba(255,138,52,0.22), rgba(255,138,52,0) 70%)",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 44, fontWeight: 700, color: "#f5f6f7" }}>
          potri<span style={{ color: "#ff8a34" }}>.</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: "#f5f6f7",
              lineHeight: 1.02,
              letterSpacing: -3,
            }}
          >
            Your next deal shouldn&apos;t go to voicemail.
          </div>
          <div style={{ fontSize: 30, color: "#9ba1a9", lineHeight: 1.4 }}>
            Three AI employees for real estate investors — live in six days.
          </div>
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          {AGENTS.map((a) => (
            <div
              key={a.name + a.role}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "16px 26px 16px 16px",
                borderRadius: 16,
                border: "1px solid #24262b",
                backgroundColor: "#16181c",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  backgroundColor: a.color,
                  color: "#0a0b0d",
                  fontSize: 26,
                  fontWeight: 700,
                }}
              >
                {a.mono}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: "#f5f6f7" }}>{a.name}</div>
                <div style={{ fontSize: 18, color: a.color }}>{a.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
