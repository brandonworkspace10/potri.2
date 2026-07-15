import Link from "next/link";
import { AGENTS } from "@/lib/agents";
import { BOOKING_URL } from "@/lib/config";
import { Container, Wordmark } from "./ui";

const LINKS = [
  { label: "Calculator", href: "#calculator" },
  { label: "Pricing", href: "#pricing" },
  { label: "The math", href: "#math" },
  { label: "Deployment", href: "#deployment" },
];

function Chevron() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden
      className="mt-px transition-transform duration-200 ease-out group-hover:rotate-180 group-focus-within:rotate-180"
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
    <li className="group relative">
      <Link
        href="#team"
        className="flex items-center gap-1.5 py-2 text-sm font-medium text-muted transition-colors hover:text-ink group-hover:text-ink group-focus-within:text-ink"
      >
        The team
        <Chevron />
      </Link>

      {/* pt-3 bridges the gap so the pointer never leaves the group on its way down */}
      <div
        className={[
          "invisible absolute left-1/2 top-full z-50 -translate-x-1/2 translate-y-1 pt-3 opacity-0",
          "transition-[opacity,transform,visibility] duration-200 ease-out",
          "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
          "group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100",
        ].join(" ")}
      >
        <div className="w-[336px] rounded-2xl border border-subtle bg-card p-2 shadow-2xl shadow-black/70">
          {AGENTS.map((a) => (
            <Link
              key={a.id}
              href={`#${a.id}`}
              className="flex items-center gap-3.5 rounded-xl p-3 transition-colors hover:bg-raised focus-visible:bg-raised focus-visible:outline-none"
            >
              <span
                className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] text-[16px] font-semibold text-base ${a.tile}`}
                aria-hidden
              >
                {a.mono}
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-[14.5px] font-semibold tracking-[-0.01em] text-ink">
                  {a.name}
                </span>
                <span
                  className={`font-mono text-[9px] font-medium uppercase tracking-[0.22em] ${a.accent}`}
                >
                  {a.role}
                </span>
              </span>
            </Link>
          ))}

          <div className="mt-1 border-t border-subtle px-3 pb-1 pt-3">
            <Link
              href="#team"
              className="flex items-center gap-1.5 text-[12.5px] font-medium text-dim transition-colors hover:text-ink"
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
    <header className="sticky top-0 z-50 border-b border-subtle bg-base/80 backdrop-blur-xl">
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
                  className="text-sm font-medium text-muted transition-colors hover:text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={BOOKING_URL}
            className="shrink-0 rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold tracking-[-0.01em] text-base transition-colors hover:bg-white"
          >
            Book a scoping call
          </Link>
        </nav>
      </Container>
    </header>
  );
}
