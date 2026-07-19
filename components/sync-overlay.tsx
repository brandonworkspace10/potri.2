"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Wordmark } from "./ui";

/**
 * First-impression overlay: the three agents (Andy / Randy / Alyssa) as
 * coloured orbs circling each other, then their roles come online one by one.
 * Plays once per browser session (sessionStorage-gated), ~2s, then fades to the
 * page. Skipped entirely for prefers-reduced-motion. The real page is already
 * in the DOM underneath — this is a purely visual cover.
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

    push(() => setRevealed(1), 450);
    push(() => setRevealed(2), 800);
    push(() => setRevealed(3), 1150);
    // once all three are online, lock the triangle and pulse, then fade
    push(() => setLocked(true), 1550);
    push(() => setLeaving(true), 2350);
    push(() => setShow(false), 2850);

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
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center gap-10 bg-base transition-opacity duration-500 ease-out ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* three agents circling each other, then locking into a triangle */}
      <div className={`sync-orbit-wrap ${locked ? "is-locked" : ""}`}>
        <div className={`sync-orbit ${locked ? "is-locked" : ""}`}>
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

      <div className="flex flex-col items-center gap-3.5">
        <Wordmark className="text-[26px]" />

        {/* roles come online one at a time, each in its agent's colour */}
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
