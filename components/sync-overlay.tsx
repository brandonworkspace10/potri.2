"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Wordmark } from "./ui";

/**
 * First-impression overlay. The three agents (Andy / Randy / Alyssa) circle
 * each other as coloured dots, their roles come online, the dots lock into a
 * triangle — then that triangle morphs into the topri▲ logo before the overlay
 * fades to the page (where the same logo sits in the nav). Plays once per
 * browser session (sessionStorage-gated); skipped for prefers-reduced-motion.
 * The real page is already in the DOM underneath — this is a purely visual cover.
 */
const AGENTS = [
  { role: "Outbound", color: "var(--color-andy)", deg: 0 },
  { role: "Inbound", color: "var(--color-randy)", deg: 120 },
  { role: "Follow-up", color: "var(--color-alyssa)", deg: 240 },
];

const SEEN_KEY = "topri_synced";

export function SyncOverlay() {
  const [show, setShow] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const [locked, setLocked] = useState(false);
  const [morph, setMorph] = useState(false);
  const [leaving, setLeaving] = useState(false);
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
    const push = (fn: () => void, ms: number) =>
      timers.current.push(window.setTimeout(fn, ms));

    push(() => setRevealed(1), 350);
    push(() => setRevealed(2), 650);
    push(() => setRevealed(3), 950);
    push(() => setLocked(true), 1350); // dots freeze, triangle draws
    push(() => setMorph(true), 1950); // triangle → topri▲ logo
    push(() => setLeaving(true), 2800); // fade to the page
    push(() => setShow(false), 3300);

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden
      onClick={() => setLeaving(true)}
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center gap-9 bg-base transition-opacity duration-500 ease-out ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* stage: the triangle cluster cross-fades into the logo in the same spot */}
      <div className="relative flex h-[120px] w-[240px] items-center justify-center">
        {/* triangle cluster — shrinks and fades out on morph */}
        <div
          className={`absolute transition-all duration-[600ms] ease-out ${
            morph ? "scale-[0.34] opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <div className={`sync-orbit-wrap ${locked ? "is-locked" : ""}`}>
            <div className={`sync-orbit ${locked ? "is-locked" : ""}`}>
              {/* triangle edges (each in its pair's colours), drawn in on lock.
                  Vertices sit on the r=36 ring at 0deg / 120deg / 240deg. */}
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

        {/* logo — scales in from the triangle's place on morph */}
        <div
          className={`absolute transition-all duration-[600ms] ease-out ${
            morph ? "scale-100 opacity-100" : "scale-[1.7] opacity-0"
          }`}
        >
          <Wordmark className="text-[30px]" />
        </div>
      </div>

      {/* roles + caption — present while the team assembles, gone once it's the logo */}
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
  );
}
