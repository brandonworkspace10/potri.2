"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Dithering } from "@paper-design/shaders-react";

/** Linear RGB mix between two hex colours. */
function mix(a: string, b: string, t: number): string {
  const p = (h: string) => parseInt(h.replace("#", "").padEnd(6, "0").slice(0, 6), 16);
  const ai = p(a);
  const bi = p(b);
  const ch = (shift: number) => {
    const av = (ai >> shift) & 0xff;
    const bv = (bi >> shift) & 0xff;
    return Math.round(av + (bv - av) * t);
  };
  const [r, g, bl] = [ch(16), ch(8), ch(0)];
  return `#${((1 << 24) + (r << 16) + (g << 8) + bl).toString(16).slice(1)}`;
}

/**
 * Dithered shader backdrop for an agent hero, tinted with that agent's colour.
 *
 * Scoped to its positioned parent — not a page-wide fixed layer — and deliberately
 * dark-only: this site has no light theme, so there is nothing to switch on.
 */
export function AgentShaderBg({
  accentVar,
  intensity = 0.45,
  parallax = true,
}: {
  /** design token holding the agent's colour, e.g. "--color-andy" */
  accentVar: string;
  intensity?: number;
  parallax?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Fall back to brand amber until the token resolves on the client.
  const [accent, setAccent] = useState("#ff8a34");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const token = getComputedStyle(document.documentElement)
      .getPropertyValue(accentVar)
      .trim();
    if (token.startsWith("#")) setAccent(token);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, [accentVar]);

  const config = useMemo(() => {
    const t = Math.max(0, Math.min(1, intensity));
    return {
      // a dark wash of the agent's own hue, not a fixed gold
      front: mix("#0a0b0d", accent, 0.1 + t * 0.2),
      speed: reduced ? 0 : 0.18 + t * 0.26,
      px: Math.round(2 + t * 2),
      scale: 1.05 + t * 0.15,
      glow: `radial-gradient(60% 45% at 55% 30%, ${mix("#0a0b0d", accent, 0.45)}2b, transparent 70%)`,
    };
  }, [accent, intensity, reduced]);

  useEffect(() => {
    if (!parallax || reduced) return;
    const root = ref.current;
    if (!root) return;
    const strength = 8;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      root.style.setProperty("--parallax-x", `${(-x * strength).toFixed(2)}px`);
      root.style.setProperty("--parallax-y", `${(-y * strength).toFixed(2)}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [parallax, reduced]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-55"
        style={{
          translate: parallax
            ? "var(--parallax-x, 0px) var(--parallax-y, 0px)"
            : undefined,
          willChange: parallax ? "translate" : undefined,
        }}
      >
        <Dithering
          colorBack="#00000000"
          colorFront={config.front}
          speed={config.speed}
          shape="wave"
          type="4x4"
          pxSize={config.px}
          scale={config.scale}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* agent-tinted glow */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: config.glow, mixBlendMode: "screen" }}
      />

      {/* vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* film grain — note the filter closes with </filter>; the original closed
          with </fe>, which is malformed and renders no grain at all */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.25' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.11'/%3E%3C/svg%3E\")",
          backgroundSize: "cover",
          mixBlendMode: "screen",
        }}
      />

      {/* Scrim. The copy sits left, so weight the darkness there — a dithered
          field directly behind body text costs more legibility than it buys. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, var(--color-base) 0%, color-mix(in srgb, var(--color-base) 82%, transparent) 38%, transparent 78%)",
        }}
      />

      {/* settle the shader into the page rather than cutting it off at the border */}
      <div
        className="absolute inset-x-0 bottom-0 h-48"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-base))" }}
      />
    </div>
  );
}
