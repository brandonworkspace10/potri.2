import { FAQS } from "@/lib/faq";
import { Container, SectionHeading } from "./ui";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Questions"
          title="Everything investors ask before day one"
        />

        <div className="mx-auto mt-13 max-w-[860px] overflow-hidden rounded-2xl border border-subtle bg-elevated">
          {FAQS.map((f, i) => (
            <details
              key={f.q}
              name="potri-faq"
              className={`group ${i > 0 ? "border-t border-subtle" : ""}`}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-7 py-6 transition-colors hover:bg-card [&::-webkit-details-marker]:hidden">
                <h3 className="text-[16.5px] font-semibold tracking-[-0.015em] text-ink">
                  {f.q}
                </h3>
                <span
                  aria-hidden
                  className="shrink-0 text-[18px] leading-none text-dim transition-[rotate,color] duration-200 group-open:rotate-45 group-open:text-brand"
                >
                  +
                </span>
              </summary>
              <p className="px-7 pb-7 pr-16 text-[14.5px] leading-[1.65] text-dim">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
