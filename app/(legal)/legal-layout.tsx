import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Container } from "@/components/ui";

export function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="border-b border-subtle">
          <Container>
            <div className="py-12 sm:py-16">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.5em] text-brand">
                {eyebrow}
              </p>
              <h1 className="mt-4 text-[30px] font-bold tracking-[-0.03em] text-ink sm:text-[38px]">
                {title}
              </h1>
              <p className="mt-3 text-[13px] text-dim">Last updated: {updated}</p>
            </div>
          </Container>
        </section>
        <section className="py-12 sm:py-16">
          <Container>
            <div className="prose-legal max-w-[760px]">{children}</div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

export function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-9">
      <h2 className="text-[19px] font-semibold tracking-[-0.02em] text-ink">{title}</h2>
      <div className="mt-3 flex flex-col gap-3 text-[14.5px] leading-[1.7] text-dim">
        {children}
      </div>
    </div>
  );
}
