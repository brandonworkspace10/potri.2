import Link from "next/link";
import type { CSSProperties } from "react";
import { AGENTS } from "@/lib/agents";
import { BOOKING_URL } from "@/lib/config";
import { MobileMenu } from "./mobile-menu";
import { NavDropdownFx } from "./nav-dropdown-fx";
import { Container, Wordmark } from "./ui";

const LINKS = [
  { label: "Calculator", href: "/#calculator" },
  { label: "Pricing", href: "/#pricing" },
  { label: "The math", href: "/#math" },
  { label: "Deployment", href: "/#deployment" },
  { label: "FAQ", href: "/#faq" },
];

function Chevron() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden
      // Tailwind v4 maps rotate-* to the CSS `rotate` property, not `transform`
      className="mt-px transition-[rotate] duration-200 ease-out group-hover:rotate-180 group-focus-within:rotate-180"
    >
      <path
        d="M2 3.75 5 6.75 8 3.75"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TeamMenu() {
  return (
    <li className="team-dd group relative">
      <Link
        href="/#team"
        className="nav-tab flex items-center gap-1.5 py-2 text-sm font-medium text-muted transition-colors hover:text-ink group-hover:text-ink group-focus-within:text-ink"
      >
        The team
        <Chevron />
      </Link>

      {/* pt-3 bridges the gap so the pointer never leaves the group on its way down */}
      <div
        // Tailwind v4 maps translate-* to the CSS `translate` property, so the
        // transition must name `translate` — transitioning `transform` animates nothing.
        className={[
          "invisible absolute left-1/2 top-full z-50 -translate-x-1/2 translate-y-2 pt-3 opacity-0",
          "transition-[opacity,translate,visibility] duration-200 ease-out",
          "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
          "group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100",
        ].join(" ")}
      >
        <div className="w-[312px] rounded-2xl border border-subtle bg-card p-2 shadow-2xl shadow-black/70">
          {AGENTS.map((a) => (
            <Link
              key={a.id}
              href={`/${a.id}`}
              // --dd-accent colours this row's growing line with the agent's own hue
              style={{ "--dd-accent": `var(${a.accentVar})` } as CSSProperties}
              className="dd-row dd-item flex items-center gap-3 rounded-lg px-2.5 pb-3 pt-2.5 focus-visible:outline-none"
            >
              <span
                className={`flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-lg text-[13px] font-semibold text-base ${a.tile}`}
                aria-hidden
              >
                {a.mono}
              </span>

              <span className="flex min-w-0 flex-col gap-[3px]">
                <span className="text-[13px] font-semibold leading-none tracking-[-0.01em] text-ink">
                  {a.name}
                </span>
                <span
                  className={`font-mono text-[8.5px] font-medium uppercase leading-none tracking-[0.2em] ${a.accent}`}
                >
                  {a.role}
                </span>
                <span className="text-[11.5px] leading-[1.3] text-dim">{a.blurb}</span>
              </span>
            </Link>
          ))}

          <div className="dd-row mt-1.5 border-t border-subtle px-3 pb-1 pt-3">
            <Link
              href="/#team"
              className="flex items-center gap-1.5 text-[12.5px] font-medium text-brand transition-colors hover:text-ink"
            >
              See the full team
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-subtle bg-base/90 backdrop-blur-sm sm:bg-base/80 sm:backdrop-blur-xl">
      <NavDropdownFx />
      <Container>
        <nav className="flex h-[72px] items-center justify-between gap-6">
          <Link href="/" aria-label="Potri home" className="shrink-0">
            <Wordmark />
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            <TeamMenu />
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="nav-tab block py-2 text-sm font-medium text-muted transition-colors hover:text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href={BOOKING_URL}
              className="hidden rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold tracking-[-0.01em] text-base transition-colors hover:bg-white sm:block"
            >
              Book a scoping call
            </Link>
            <MobileMenu />
          </div>
        </nav>
      </Container>
    </header>
  );
}
