"use client";

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./ui";

/**
 * First-impression "System Syncing" overlay. Plays once per browser session
 * (sessionStorage-gated so it never nags on internal navigation), reveals the
 * three agents coming online, then fades out after ~2s. Skipped entirely for
 * prefers-reduced-motion. The real page is already in the DOM underneath — this
 * is a purely visual cover, so it never blocks content or crawlers.
 */
const STEPS = [
  { label: "[ANDY_SYNCED]", cls: "text-andy" },
  { label: "[RANDY_ONLINE]", cls: "text-randy" },
  { label: "[CRM_MAPPED]", cls: "text-alyssa" },
];

const SEEN_KEY = "topri_synced";

export function SyncOverlay() {
  // Start hidden; an effect decides whether to play. This keeps SSR/first paint
  // identical and avoids a flash for returning/reduced-motion visitors.
  const [show, setShow] = useState(false);
  const [revealed, setRevealed] = useState(0);
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
      /* private mode — play this once, don't persist */
    }

    setShow(true);
    const push = (fn: () => void, ms: number) =>
      timers.current.push(window.setTimeout(fn, ms));

    push(() => setRevealed(1), 350);
    push(() => setRevealed(2), 750);
    push(() => setRevealed(3), 1150);
    push(() => setLeaving(true), 1850);
    push(() => setShow(false), 2300);

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
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8 bg-base transition-opacity duration-500 ease-out ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="animate-pulse">
        <Wordmark className="text-[30px]" />
      </div>

      <div className="flex w-[220px] flex-col gap-2">
        {STEPS.map((s, i) => (
          <div
            key={s.label}
            className={`flex items-center justify-between font-mono text-[12px] tracking-[0.04em] transition-all duration-300 ${
              i < revealed ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
            }`}
          >
            <span className={s.cls}>{s.label}</span>
            <span className="text-alyssa">{i < revealed ? "✓" : ""}</span>
          </div>
        ))}
      </div>

      <div className="h-[2px] w-[220px] overflow-hidden rounded-full bg-subtle">
        <div
          className="h-full bg-brand transition-[width] duration-[1600ms] ease-out"
          style={{ width: revealed >= 3 ? "100%" : `${(revealed / 3) * 100}%` }}
        />
      </div>

      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-dim">
        System syncing
      </p>
    </div>
  );
}
