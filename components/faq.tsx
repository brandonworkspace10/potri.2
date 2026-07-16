import { FAQS } from "@/lib/faq";
import { Container, SectionHeading } from "./ui";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 py-12 sm:py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Questions"
          title="Everything investors ask before day one"
        />

        <div className="mx-auto mt-10 sm:mt-13 max-w-[860px] overflow-hidden rounded-2xl border border-subtle bg-elevated">
          {FAQS.map((f, i) => (
            <details
              key={f.q}
              name="potri-faq"
              className={`group ${i > 0 ? "border-t border-subtle" : ""}`}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 transition-colors hover:bg-card sm:gap-6 sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
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
              <p className="px-5 pb-6 text-[14px] leading-[1.65] text-dim sm:px-7 sm:pb-7 sm:pr-16 sm:text-[14.5px]">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
