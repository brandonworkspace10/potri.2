import type { Metadata } from "next";
import Link from "next/link";
import { DottedSurface } from "@/components/dotted-surface";
import { Container, PrimaryButton, SecondaryButton, Wordmark } from "@/components/ui";
import { AGENTS } from "@/lib/agents";
import { BOOKING_URL, SITE_URL, TEAM_PRICE } from "@/lib/config";

const TITLE = "Empleados de IA para Inversionistas de Bienes Raíces";
const DESCRIPTION =
  "Tres empleados de IA para inversionistas y mayoristas: Andy llama y califica vendedores, Randy contesta cada llamada 24/7, Alyssa da seguimiento. Inglés y español. En vivo en menos de seis días.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/es",
    languages: { en: "/", es: "/es" },
  },
  openGraph: {
    title: `${TITLE} | Potri`,
    description: DESCRIPTION,
    url: `${SITE_URL}/es`,
    locale: "es_US",
    type: "website",
  },
};

/** Everything on this page translates content that exists on the English site. */
const EQUIPO = [
  {
    id: "andy",
    rol: "Salientes · Adquisiciones",
    desc: "Trabaja tu lista de vendedores todo el día. Califica cada prospecto con los cinco pilares — motivación, urgencia, condición, precio y razón de venta — y agenda a los calificados directo en tu calendario.",
    vivo: "En vivo en 2–4 días",
    precio: "Desde $1,600/mes",
  },
  {
    id: "randy",
    rol: "Entrantes · Recepción",
    desc: "Contesta cada llamada que entra — incluida la de las 11 de la noche que habrías perdido. Responde preguntas de la propiedad, captura los datos del vendedor y califica igual que Andy, a cualquier hora.",
    vivo: "En vivo en 1–3 días",
    precio: "Desde $1,200/mes",
  },
  {
    id: "alyssa",
    rol: "Back office · Seguimiento",
    desc: "La que tu competencia no tiene. Secuencias de seguimiento por correo y SMS, organización del CRM — construida a la medida de cómo opera tu negocio.",
    vivo: "En vivo en <7 días",
    precio: "Desde $1,500/mes",
  },
];

const COMPARACION: [string, string, string][] = [
  ["Costo mensual", "~$5,000+ (hora + comisión)", "$5,200 fijo, los tres agentes"],
  ["Cobertura", "40 hrs/semana", "168 hrs/semana"],
  ["Alcance", "Solo llamadas salientes", "Salientes + entrantes + seguimiento"],
  ["Fuera de horario", "Directo al buzón de voz", "Contestada, siempre"],
];

const DIAS = [
  ["Día 1", "Llamada de alcance: mapeamos tus fuentes de leads, tu CRM, tu calendario y cómo calificas un negocio."],
  ["Días 2–3", "Construcción y entrenamiento: los agentes se configuran con tus preguntas, tu guion y tu voz."],
  ["Días 4–5", "Llamadas de prueba: escuchas a los agentes en vivo y apruebas antes de que se marque a un solo prospecto real."],
  ["Día 6", "En vivo: Andy llama, Randy contesta, Alyssa da seguimiento. Tú cierras."],
];

const PREGUNTAS = [
  {
    q: "¿Qué es Potri?",
    a: "Potri es un equipo de tres empleados de IA para inversionistas y mayoristas de bienes raíces. Andy hace llamadas salientes y califica vendedores. Randy contesta cada llamada entrante, las 24 horas. Alyssa lleva el seguimiento y la operación. Puedes contratar uno o los tres.",
  },
  {
    q: "¿Los agentes hablan español?",
    a: "Sí. Cada agente es completamente bilingüe — inglés y español en cada llamada. Un vendedor hispanohablante recibe la misma calificación y la misma calidad de conversación que cualquier otro.",
  },
  {
    q: "¿Qué tan rápido puedo estar en vivo?",
    a: "En menos de seis días. El día uno es una llamada de alcance; los días dos y tres son construcción y entrenamiento; los días cuatro y cinco escuchas llamadas de prueba y las apruebas; el día seis los agentes están trabajando.",
  },
  {
    q: "¿Cuánto cuesta Potri?",
    a: "Andy cuesta $1,600–$2,500 al mes según volumen y complejidad del guion. Randy cuesta $1,200–$1,800 según volumen entrante e integraciones. Alyssa cuesta $1,500–$6,000 y se define en consulta. El equipo completo cuesta $5,200 al mes, tarifa fija. El precio final se confirma en la llamada de alcance.",
  },
  {
    q: "¿Se llama a un prospecto real antes de que yo apruebe?",
    a: "No. En los días cuatro y cinco escuchas a los agentes en llamadas de prueba y los apruebas antes de que se marque un solo lead real.",
  },
  {
    q: "¿Tengo que cambiar mi CRM o mis herramientas?",
    a: "No. Potri se construye alrededor del software que ya usas — tu CRM, tu calendario, tu marcador. En la llamada de alcance mapeamos tu configuración exacta y los agentes se adaptan a ella.",
  },
];

export default function EsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/es`,
        name: `${TITLE} | Potri`,
        inLanguage: "es",
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/es#faq`,
        inLanguage: "es",
        mainEntity: PREGUNTAS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      {/* the root layout owns <html lang="en">; correct it before paint for this page */}
      <script
        dangerouslySetInnerHTML={{ __html: `document.documentElement.lang = "es";` }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Spanish chrome — a half-translated English nav would be worse than a simple one */}
      <header className="sticky top-0 z-50 border-b border-subtle bg-base/90 backdrop-blur-sm sm:bg-base/80 sm:backdrop-blur-xl">
        <Container>
          <nav className="flex h-[72px] items-center justify-between gap-6">
            <Link href="/es" aria-label="Potri inicio">
              <Wordmark />
            </Link>
            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                href="/"
                className="text-sm font-medium text-muted transition-colors hover:text-ink"
              >
                English
              </Link>
              <Link
                href={BOOKING_URL}
                className="rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold tracking-[-0.01em] text-base transition-colors hover:bg-white"
              >
                Agenda una llamada
              </Link>
            </div>
          </nav>
        </Container>
      </header>

      <main className="flex-1">
        {/* hero */}
        <section className="relative overflow-hidden">
          <DottedSurface placeholderSrc="/hero-field.webp" />
          <Container className="relative">
            <div className="flex flex-col items-center pb-12 pt-10 text-center sm:pb-20 sm:pt-20">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-subtle bg-card px-3 py-2 sm:px-3.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span className="whitespace-nowrap font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-muted sm:text-[11px] sm:tracking-[0.4em]">
                  Empleados de IA para bienes raíces
                </span>
              </div>
              <h1 className="mt-6 max-w-[900px] text-[32px] font-bold leading-[1.02] tracking-[-0.04em] text-ink sm:mt-7 sm:text-[54px] lg:text-[68px]">
                Tu próximo negocio no debería terminar en el{" "}
                <span className="text-brand">buzón de voz</span>.
              </h1>
              <p className="mt-5 max-w-[700px] text-[16px] leading-[1.6] text-muted sm:mt-7 sm:text-[18px]">
                Potri son tres empleados de IA para inversionistas y mayoristas de bienes
                raíces. Andy llama y califica a tus vendedores. Randy contesta cada
                llamada entrante, 24/7. Alyssa se encarga del seguimiento. En vivo en
                menos de seis días, por más o menos lo que hoy te cuesta un solo
                llamador.
              </p>
              <div className="mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row">
                <PrimaryButton href={BOOKING_URL}>Agenda una llamada</PrimaryButton>
                <SecondaryButton href="#equipo">Conoce al equipo</SecondaryButton>
              </div>
              <p className="mt-6 text-[13px] text-dim">
                Inglés y español en cada llamada · Apruebas cada guion · En vivo en menos
                de seis días
              </p>
            </div>
          </Container>
        </section>

        {/* team */}
        <section id="equipo" className="scroll-mt-20 border-y border-subtle bg-elevated py-12 sm:py-20">
          <Container>
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.5em] text-brand">
                El equipo
              </p>
              <h2 className="max-w-3xl text-[27px] font-bold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[42px]">
                Tres empleados. Un objetivo.
              </h2>
              <p className="max-w-[660px] text-[15px] leading-[1.6] text-dim sm:text-[17px]">
                Los nombres son puestos de trabajo. Di “Andy” y hablas de llamadas
                salientes. Di “Randy” y son las entrantes. Di “Alyssa” y es el
                seguimiento.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:mt-14 lg:grid-cols-3">
              {EQUIPO.map((e) => {
                const a = AGENTS.find((x) => x.id === e.id)!;
                return (
                  <article
                    key={e.id}
                    className="flex flex-col rounded-2xl border border-subtle bg-card p-5 sm:p-8"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl text-[20px] font-semibold text-base ${a.tile}`}
                        aria-hidden
                      >
                        {a.mono}
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-[23px] font-semibold tracking-[-0.025em] text-ink">
                          {a.name}
                        </h3>
                        <p
                          className={`font-mono text-[9.5px] font-medium uppercase tracking-[0.24em] ${a.accent}`}
                        >
                          {e.rol}
                        </p>
                      </div>
                    </div>
                    <p className="mt-5 text-[14.5px] leading-[1.6] text-dim">{e.desc}</p>
                    <div className="mt-auto pt-6">
                      <div className="flex items-center justify-between gap-4 border-t border-subtle pt-5">
                        <span className="text-[13px] text-dim">{e.vivo}</span>
                        <span className="text-[15px] font-semibold tracking-[-0.01em] text-ink">
                          {e.precio}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </Container>
        </section>

        {/* comparison */}
        <section className="py-12 sm:py-20">
          <Container>
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.5em] text-brand">
                Las cuentas
              </p>
              <h2 className="max-w-3xl text-[27px] font-bold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[42px]">
                Un llamador humano vs. el equipo Potri
              </h2>
            </div>
            <div className="mx-auto mt-10 flex max-w-[860px] flex-col gap-3">
              {COMPARACION.map(([m, h, p]) => (
                <div key={m} className="rounded-2xl border border-subtle bg-card p-5">
                  <p className="text-[13px] font-medium text-muted">{m}</p>
                  <div className="mt-3.5 grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-dim">
                        Un humano
                      </p>
                      <p className="mt-2 text-[13.5px] leading-[1.4] text-dim">{h}</p>
                    </div>
                    <div className="border-l border-subtle pl-4">
                      <p className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-brand">
                        Equipo Potri
                      </p>
                      <p className="mt-2 text-[13.5px] font-semibold leading-[1.4] text-ink">
                        {p}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-[720px] text-center text-[14px] leading-[1.6] text-dim">
              El equipo completo — Andy + Randy + Alyssa — cuesta{" "}
              <span className="font-semibold text-brand">
                ${TEAM_PRICE.toLocaleString("en-US")}/mes fijo
              </span>
              , contra $4,300–$10,300 por separado. Sin descuentos en agentes
              individuales; el precio final se confirma en la llamada de alcance.
            </p>
          </Container>
        </section>

        {/* deployment */}
        <section className="border-y border-subtle bg-elevated py-12 sm:py-20">
          <Container>
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.5em] text-brand">
                Implementación
              </p>
              <h2 className="max-w-3xl text-[27px] font-bold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[42px]">
                Firmado el lunes. Trabajando el sábado.
              </h2>
            </div>
            <ol className="mx-auto mt-10 grid max-w-[1100px] gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {DIAS.map(([dia, desc]) => (
                <li key={dia} className="rounded-2xl border border-subtle bg-card p-6">
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-brand">
                    {dia}
                  </p>
                  <p className="mt-3 text-[14px] leading-[1.6] text-dim">{desc}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* faq */}
        <section className="py-12 sm:py-20">
          <Container>
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.5em] text-brand">
                Preguntas
              </p>
              <h2 className="max-w-3xl text-[27px] font-bold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[42px]">
                Lo que todos preguntan antes de empezar
              </h2>
            </div>
            <div className="mx-auto mt-10 max-w-[860px] overflow-hidden rounded-2xl border border-subtle bg-elevated">
              {PREGUNTAS.map((f, i) => (
                <details
                  key={f.q}
                  name="potri-faq-es"
                  className={`group ${i > 0 ? "border-t border-subtle" : ""}`}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 transition-colors hover:bg-card sm:gap-6 sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-[16px] font-semibold tracking-[-0.015em] text-ink">
                      {f.q}
                    </h3>
                    <span
                      aria-hidden
                      className="shrink-0 text-[18px] leading-none text-dim transition-[rotate,color] duration-200 group-open:rotate-45 group-open:text-brand"
                    >
                      +
                    </span>
                  </summary>
                  <p className="px-5 pb-6 text-[14px] leading-[1.65] text-dim sm:px-7 sm:pb-7 sm:pr-16">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        {/* cta */}
        <section className="border-t border-subtle bg-elevated py-16 sm:py-24">
          <Container>
            <div className="flex flex-col items-center text-center">
              <h2 className="max-w-[820px] text-[28px] font-bold leading-[1.08] tracking-[-0.035em] text-ink sm:text-[44px]">
                Cada llamada sin contestar es un negocio
                <br className="hidden sm:block" /> para{" "}
                <span className="text-brand">otro inversionista</span>.
              </h2>
              <p className="mt-6 max-w-[600px] text-[16px] leading-[1.6] text-muted">
                Una llamada de alcance mapea tus fuentes de leads, tu CRM y cómo
                calificas un negocio. Seis días después, Andy, Randy y Alyssa están
                trabajando.
              </p>
              <div className="mt-8">
                <PrimaryButton href={BOOKING_URL}>Agenda una llamada</PrimaryButton>
              </div>
            </div>
          </Container>
        </section>
      </main>

      {/* Spanish footer strip */}
      <footer className="mt-auto border-t border-subtle bg-elevated py-10">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <Wordmark />
              <p className="mt-2 text-[13px] text-dim">
                Empleados de IA para inversionistas de bienes raíces · Inglés y español
              </p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              <Link href="/" className="hover:text-ink">English</Link>
              <Link href="/privacy" className="hover:text-ink">Privacidad</Link>
              <Link href="/terms" className="hover:text-ink">Términos</Link>
            </div>
          </div>
          <p className="mt-8 border-t border-subtle pt-5 text-[12.5px] text-dim">
            © {new Date().getFullYear()} Potri. Todos los derechos reservados.
          </p>
        </Container>
      </footer>
    </>
  );
}
