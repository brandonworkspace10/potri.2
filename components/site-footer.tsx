import Link from "next/link";
import { BOOKING_URL } from "@/lib/config";
import { Container, Wordmark } from "./ui";

const LINKS = [
  { label: "The team", href: "/#team" },
  { label: "Andy — AI outbound caller", href: "/andy" },
  { label: "Randy — 24/7 AI receptionist", href: "/randy" },
  { label: "Alyssa — follow-up & ops", href: "/alyssa" },
  { label: "Calculator", href: "/#calculator" },
  { label: "Pricing", href: "/#pricing" },
  { label: "The math", href: "/#math" },
  { label: "Integrations", href: "/#integrations" },
  { label: "Deployment", href: "/#deployment" },
  { label: "FAQ", href: "/#faq" },
  { label: "AI vs human cold caller", href: "/ai-vs-human-cold-caller" },
  { label: "Book a call", href: BOOKING_URL },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-subtle bg-elevated py-14">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[380px]">
            <Wordmark />
            <p className="mt-4 text-[14px] leading-[1.6] text-dim">
              AI employees for real estate investors &amp; wholesalers. English + Spanish.
              Deployed in under six days.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-3 md:grid-cols-2">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-subtle pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px] text-dim">
            © {new Date().getFullYear()} Potri. All rights reserved.
          </p>
          <div className="flex gap-5 text-[12.5px]">
            <Link href="/es" className="text-dim transition-colors hover:text-ink">
              Español
            </Link>
            <Link href="/privacy" className="text-dim transition-colors hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="text-dim transition-colors hover:text-ink">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
