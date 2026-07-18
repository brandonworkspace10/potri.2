"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AGENTS } from "@/lib/agents";
import { BOOKING_URL } from "@/lib/config";
import { Wordmark } from "./ui";

const LINKS = [
  { label: "Calculator", href: "/#calculator" },
  { label: "Pricing", href: "/#pricing" },
  { label: "The math", href: "/#math" },
  { label: "Integrations", href: "/#integrations" },
  { label: "Deployment", href: "/#deployment" },
  { label: "FAQ", href: "/#faq" },
  { label: "AI vs human", href: "/ai-vs-human-cold-caller" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  // Lock the page behind the panel, and hand focus in and back out again.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const opener = triggerRef.current;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      // keep Tab inside the panel while it owns the screen
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    // The click that opened the panel is still resolving its own focus, and it
    // wins against anything we do on this tick or the next frame. Hand focus
    // over once that has settled — the panel is fully focusable by then.
    const focusTimer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("a[href], button")?.focus();
    }, 60);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, [open]);

  // Rotating to landscape can cross the lg breakpoint and strand an open panel
  // whose trigger no longer exists.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="-mr-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-ink lg:hidden"
      >
        <span className="relative block h-4 w-5" aria-hidden>
          {/* Tailwind v4 maps translate/rotate to their own CSS properties */}
          <span
            className={`absolute left-0 top-[5px] h-[1.5px] w-5 rounded-full bg-ink transition-[translate,rotate] duration-200 ease-out ${
              open ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-[11px] h-[1.5px] w-5 rounded-full bg-ink transition-[translate,rotate] duration-200 ease-out ${
              open ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {/* The header carries backdrop-blur, and a backdrop-filter makes an element
          the containing block for its fixed-position descendants — inset-0 would
          resolve to the 72px header box, not the viewport. Portal past it.
          Kept mounted so it can transition both ways; `invisible` also drops it
          out of the tab order and the a11y tree while closed. */}
      {mounted &&
        createPortal(
          <div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className={`fixed inset-0 z-[60] flex flex-col bg-base transition-[opacity,visibility] duration-200 ease-out lg:hidden ${
              open ? "visible opacity-100" : "invisible opacity-0"
            }`}
          >
            <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-subtle px-6">
              <Link href="/" onClick={close} aria-label="Topri home">
                <Wordmark />
              </Link>
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-lg text-2xl leading-none text-muted"
              >
                <span aria-hidden>×</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-7">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-dim">
                The team
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {AGENTS.map((a) => (
                  <li key={a.id}>
                    <Link
                      href={`/${a.id}`}
                      onClick={close}
                      className="flex items-center gap-3.5 rounded-2xl border border-subtle bg-card p-4"
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-[17px] font-semibold text-base ${a.tile}`}
                        aria-hidden
                      >
                        {a.mono}
                      </span>
                      <span className="flex min-w-0 flex-col gap-1">
                        <span
                          className={`text-[15px] font-semibold tracking-[-0.02em] ${a.accent}`}
                        >
                          {a.role}
                        </span>
                        <span className="text-[12.5px] leading-[1.35] text-dim">
                          {a.blurb}
                        </span>
                      </span>
                      <span
                        className="ml-auto shrink-0 pl-2 text-dim"
                        aria-hidden
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-subtle pt-6">
                <ul className="flex flex-col">
                  {LINKS.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={close}
                        className="flex items-center justify-between border-b border-subtle py-4 text-[17px] font-medium text-ink"
                      >
                        {l.label}
                        <span className="text-dim" aria-hidden>
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="shrink-0 border-t border-subtle p-6">
              <Link
                href={BOOKING_URL}
                onClick={close}
                className="flex w-full items-center justify-center rounded-[10px] bg-ink px-6 py-4 text-[15px] font-semibold tracking-[-0.01em] text-base"
              >
                Book a scoping call
              </Link>
              <p className="mt-3.5 text-center text-[12.5px] text-dim">
                English + Spanish · Live in under six days
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
