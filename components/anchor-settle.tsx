"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * content-visibility:auto sections report estimated heights until first render,
 * so a scroll to #pricing computes its offset against estimates, then the
 * sections above render at real size and the target drifts. This waits for the
 * scroll to quiet down, then snaps the drift away — instant, so at most it
 * reads as the page settling, not a second scroll.
 */
export function AnchorSettle() {
  const pathname = usePathname();

  useEffect(() => {
    let raf = 0;
    let timer = 0;

    const settle = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;

      let lastY = -1;
      let quiet = 0;
      const tick = () => {
        const y = window.scrollY;
        quiet = Math.abs(y - lastY) < 1 ? quiet + 1 : 0;
        lastY = y;
        if (quiet >= 3) {
          // scroll has stopped — remove any drift the estimates caused
          const top = target.getBoundingClientRect().top;
          const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
          if (Math.abs(top - margin) > 24) {
            target.scrollIntoView({ behavior: "auto", block: "start" });
          }
          return;
        }
        raf = requestAnimationFrame(tick);
      };
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    // Next's Link navigates hash targets via pushState, which never fires
    // hashchange — catch the clicks themselves for the same-page case.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href*='#']");
      if (!a) return;
      const url = new URL((a as HTMLAnchorElement).href, window.location.href);
      if (url.pathname === window.location.pathname && url.hash) {
        window.setTimeout(settle, 60);
      }
    };

    // covers direct loads with a hash, and cross-page navigations
    timer = window.setTimeout(settle, 80);
    window.addEventListener("hashchange", settle);
    document.addEventListener("click", onClick, true);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", settle);
      document.removeEventListener("click", onClick, true);
    };
  }, [pathname]);

  return null;
}
