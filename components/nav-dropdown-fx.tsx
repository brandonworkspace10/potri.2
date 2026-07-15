"use client";

import { useEffect } from "react";

/**
 * Feeds `--mx` (cursor x within the hovered row) to the team dropdown so each
 * row's accent line can grow outward from where the pointer entered.
 * Renders nothing — one delegated listener covers every row.
 */
export function NavDropdownFx() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const row = target?.closest?.(".dd-item") as HTMLElement | null;
      if (!row) return;
      const rect = row.getBoundingClientRect();
      // clamp so the line never starts flush against the rounded corners
      const x = Math.min(Math.max(e.clientX - rect.left, 16), rect.width - 16);
      row.style.setProperty("--mx", `${x}px`);
    };

    document.addEventListener("pointermove", onMove, true);
    return () => document.removeEventListener("pointermove", onMove, true);
  }, []);

  return null;
}
