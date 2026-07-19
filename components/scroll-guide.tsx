"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll guide. A single triangle (the same mark from the logo/badge) that
 * glides to sit just left of whichever section headline is nearest your reading
 * line as you scroll — marking the most valuable line so it isn't skipped.
 * It smoothly follows (lerp) so it "comes with you." Desktop only, hidden at the
 * very top (the hero badge owns that), and skipped for reduced-motion. Purely
 * decorative (aria-hidden), so it never affects content, SEO or a11y.
 */
export function ScrollGuide() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const GAP = 24; // gap to the left of the headline
    const TRI = 15; // triangle size (px)

    let heads: HTMLElement[] = [];
    const collect = () => {
      heads = Array.from(document.querySelectorAll<HTMLElement>("main h2"));
    };
    collect();

    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      raf = 0,
      seeded = false,
      shown = false;

    const loop = () => {
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      el.style.transform = `translate(${cx}px, ${cy}px)`;
      raf =
        Math.abs(tx - cx) > 0.4 || Math.abs(ty - cy) > 0.4
          ? requestAnimationFrame(loop)
          : 0;
    };
    const run = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const setShown = (v: boolean) => {
      if (v === shown) return;
      shown = v;
      el.style.opacity = v ? "1" : "0";
    };

    const measure = () => {
      const vh = window.innerHeight;
      const past = window.scrollY > vh * 0.55; // let the hero/badge own the top
      if (window.innerWidth < 1024 || !past || heads.length === 0) {
        setShown(false);
        return;
      }

      const focus = vh * 0.4; // the reading line
      let active: HTMLElement | null = null;
      let best = Infinity;
      for (const h of heads) {
        const r = h.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        const c = r.top + Math.min(r.height / 2, 22);
        const d = Math.abs(c - focus);
        if (d < best) {
          best = d;
          active = h;
        }
      }
      if (!active) {
        setShown(false);
        return;
      }

      const r = active.getBoundingClientRect();
      tx = Math.max(12, r.left - GAP);
      ty = r.top + Math.min(r.height / 2, 22) - TRI / 2;
      if (!seeded) {
        cx = tx;
        cy = ty;
        seeded = true;
      }
      setShown(true);
      run();
    };

    let scheduled = false;
    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        measure();
      });
    };
    const onResize = () => {
      collect();
      measure();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // catch anchor jumps / late layout
    const t = window.setTimeout(measure, 120);
    measure();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(t);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 12 11"
      fill="#ff8a34"
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
      style={{
        width: 15,
        height: 14,
        opacity: 0,
        transition: "opacity 0.3s ease",
        willChange: "transform",
      }}
    >
      <path d="M6 0 11 10 1 10Z" />
    </svg>
  );
}
