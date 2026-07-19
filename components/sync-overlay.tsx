"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Wordmark } from "./ui";

/**
 * First-impression overlay. Three agents circle each other as coloured dots,
 * their roles come online, the dots lock into a triangle, that triangle morphs
 * into the topri▲ logo and flies to the nav — then the logo's own triangle
 * swings down and lands on the hero badge (the mark left of "AI employees…").
 * Plays once per session (sessionStorage-gated); skipped for reduced-motion.
 * The real page is already in the DOM underneath — this is a visual cover.
 */
const AGENTS = [
  { role: "Outbound", color: "var(--color-andy)", deg: 0 },
  { role: "Inbound", color: "var(--color-randy)", deg: 120 },
  { role: "Follow-up", color: "var(--color-alyssa)", deg: 240 },
];

const SEEN_KEY = "topri_synced";
const TRI_BOX = 12; // base size (px) of the swinging triangle before scaling

export function SyncOverlay() {
  const [show, setShow] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const [locked, setLocked] = useState(false);
  const [morph, setMorph] = useState(false);
  const [flyTransform, setFlyTransform] = useState<string | null>(null);
  const [leaving, setLeaving] = useState(false);
  const [swinging, setSwinging] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const swingRef = useRef<SVGSVGElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      seen = false;
    }
    if (reduced || seen) return;

    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* private mode — play once, don't persist */
    }

    setShow(true);
    // hold the hero badge's triangle hidden until the swing lands on it
    document.documentElement.classList.add("intro-playing");

    const push = (fn: () => void, ms: number) =>
      timers.current.push(window.setTimeout(fn, ms));

    // fly the settled logo onto the real nav logo (measured at runtime)
    const flyToNav = () => {
      const el = logoRef.current;
      const target = document.querySelector(".sync-logo-target");
      if (!el || !target) return;
      const s = el.getBoundingClientRect();
      const t = target.getBoundingClientRect();
      const dx = t.left + t.width / 2 - (s.left + s.width / 2);
      const dy = t.top + t.height / 2 - (s.top + s.height / 2);
      const scale = t.width / s.width;
      setFlyTransform(`translate(${dx}px, ${dy}px) scale(${scale})`);
    };

    push(() => setRevealed(1), 300);
    push(() => setRevealed(2), 550);
    push(() => setRevealed(3), 800);
    push(() => setLocked(true), 1150); // dots freeze, triangle draws
    push(() => setMorph(true), 1550); // triangle → topri▲ logo (centered)
    push(flyToNav, 2150); // logo flies into the nav slot
    push(() => setLeaving(true), 2700); // background fades as it lands
    push(() => setSwinging(true), 3050); // triangle swings from nav → badge
    push(() => setShow(false), 3250); // overlay is gone; swing continues

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  // when the swinging triangle mounts, arc it from the nav logo down to the badge
  useEffect(() => {
    if (!swinging) return;
    const el = swingRef.current;
    const navTri = document.querySelector(".sync-logo-target svg");
    const badge = document.querySelector(".badge-mark");
    const root = document.documentElement;

    const reveal = () => {
      root.classList.remove("intro-playing");
      root.classList.add("intro-done");
    };

    if (!el || !navTri || !badge) {
      reveal();
      setSwinging(false);
      return;
    }

    const s = navTri.getBoundingClientRect();
    const b = badge.getBoundingClientRect();
    const sx = s.left + s.width / 2;
    const sy = s.top + s.height / 2;
    const ex = b.left + b.width / 2;
    const ey = b.top + b.height / 2;
    const startScale = s.width / TRI_BOX;
    const endScale = b.width / TRI_BOX;
    const at = (cx: number, cy: number) =>
      `translate(${cx - TRI_BOX / 2}px, ${cy - TRI_BOX / 2}px)`;
    // gentle curve straight into the badge — the control point stays ABOVE the
    // destination so it never dips past it toward the headline (no bounce).
    const midX = sx + (ex - sx) * 0.5;
    const midY = sy + (ey - sy) * 0.3;

    const anim = el.animate(
      [
        { transform: `${at(sx, sy)} rotate(-14deg) scale(${startScale})`, opacity: 1, offset: 0 },
        {
          transform: `${at(midX, midY)} rotate(-5deg) scale(${(startScale + endScale) / 2})`,
          opacity: 1,
          offset: 0.5,
        },
        { transform: `${at(ex, ey)} rotate(0deg) scale(${endScale})`, opacity: 1, offset: 1 },
      ],
      // slow, readable drop — it's guiding the eye down to the first line of copy
      { duration: 1050, easing: "cubic-bezier(0.33, 0, 0.2, 1)", fill: "forwards" },
    );

    anim.onfinish = () => {
      // the triangle has relocated to the badge as the eye-guide; leave the nav
      // mark off (it "took off" from next to topri and didn't come back)
      reveal();
      window.setTimeout(() => setSwinging(false), 60);
    };

    return () => anim.cancel();
  }, [swinging]);

  if (!show && !swinging) return null;

  return (
    <>
      {show ? (
        <div
          aria-hidden
          onClick={() => setLeaving(true)}
          className={`fixed inset-0 z-[200] flex flex-col items-center justify-center gap-9 bg-base transition-opacity duration-500 ease-out ${
            leaving ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          {/* stage: the triangle cluster cross-fades into the logo in place */}
          <div className="relative flex h-[120px] w-[240px] items-center justify-center">
            {/* triangle cluster — shrinks and fades out on morph */}
            <div
              className={`absolute transition-all duration-[600ms] ease-out ${
                morph ? "scale-[0.34] opacity-0" : "scale-100 opacity-100"
              }`}
            >
              <div className={`sync-orbit-wrap ${locked ? "is-locked" : ""}`}>
                <div className={`sync-orbit ${locked ? "is-locked" : ""}`}>
                  {/* triangle edges (each in its pair's colours), drawn in on lock. */}
                  <svg className="sync-tri" viewBox="0 0 112 112" fill="none" aria-hidden>
                    <defs>
                      <linearGradient id="sync-e0" x1="92" y1="56" x2="38" y2="87.18" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#ff8a34" />
                        <stop offset="1" stopColor="#4d8dff" />
                      </linearGradient>
                      <linearGradient id="sync-e1" x1="38" y1="87.18" x2="38" y2="24.82" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#4d8dff" />
                        <stop offset="1" stopColor="#35c88a" />
                      </linearGradient>
                      <linearGradient id="sync-e2" x1="38" y1="24.82" x2="92" y2="56" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#35c88a" />
                        <stop offset="1" stopColor="#ff8a34" />
                      </linearGradient>
                    </defs>
                    <line x1="92" y1="56" x2="38" y2="87.18" stroke="url(#sync-e0)" />
                    <line x1="38" y1="87.18" x2="38" y2="24.82" stroke="url(#sync-e1)" />
                    <line x1="38" y1="24.82" x2="92" y2="56" stroke="url(#sync-e2)" />
                  </svg>

                  {AGENTS.map((a) => (
                    <span
                      key={a.role}
                      className="sync-orb"
                      style={{
                        background: a.color,
                        transform: `rotate(${a.deg}deg) translateX(36px)`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* logo — scales in from the triangle's place, then flies to the nav */}
            <div
              ref={logoRef}
              className="morph-logo absolute"
              style={{
                transformOrigin: "center center",
                transform: flyTransform ?? (morph ? "scale(1)" : "scale(1.7)"),
                opacity: morph ? 1 : 0,
                transition:
                  "transform 640ms cubic-bezier(0.5, 0, 0.2, 1), opacity 460ms ease-out",
              }}
            >
              <Wordmark className="text-[30px]" />
            </div>
          </div>

          {/* roles + caption — gone once it's the logo */}
          <div
            className={`flex flex-col items-center gap-3 transition-opacity duration-300 ${
              morph ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.1em]">
              {AGENTS.map((a, i) => (
                <Fragment key={a.role}>
                  {i > 0 ? <span className="text-dim/60">·</span> : null}
                  <span
                    className="transition-all duration-500"
                    style={{
                      color: i < revealed ? a.color : "var(--color-dim)",
                      opacity: i < revealed ? 1 : 0.4,
                    }}
                  >
                    {a.role}
                  </span>
                </Fragment>
              ))}
            </div>

            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.34em] text-dim">
              Deploying your team
            </p>
          </div>
        </div>
      ) : null}

      {/* the logo's triangle, swinging down from the nav onto the hero badge */}
      {swinging ? (
        <svg
          ref={swingRef}
          viewBox="0 0 12 11"
          fill="#ff8a34"
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[210]"
          style={{
            width: TRI_BOX,
            height: TRI_BOX,
            opacity: 0,
            transformOrigin: "center center",
            willChange: "transform, opacity",
          }}
        >
          <path d="M6 0 11 10 1 10Z" />
        </svg>
      ) : null}
    </>
  );
}
