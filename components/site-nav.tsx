import Link from "next/link";
import { BOOKING_URL } from "@/lib/config";
import { Container, Wordmark } from "./ui";

const LINKS = [
  { label: "The team", href: "#team" },
  { label: "Calculator", href: "#calculator" },
  { label: "Pricing", href: "#pricing" },
  { label: "The math", href: "#math" },
  { label: "Deployment", href: "#deployment" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-subtle bg-base/80 backdrop-blur-xl">
      <Container>
        <nav className="flex h-[72px] items-center justify-between gap-6">
          <Link href="/" aria-label="Potri home" className="shrink-0">
            <Wordmark />
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
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
