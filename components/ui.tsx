import Link from "next/link";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1312px] px-6 md:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.5em] text-brand">
      {children}
    </p>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`text-[22px] font-bold tracking-[-0.04em] text-ink ${className}`}>
      potri<span className="text-brand">.</span>
    </span>
  );
}

export function PrimaryButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-[9px] bg-ink px-6 py-3.5 text-[15px] font-semibold tracking-[-0.01em] text-base transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${className}`}
    >
      {children}
    </Link>
  );
}

export function SecondaryButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-[9px] border border-strong bg-card px-6 py-3.5 text-[15px] font-semibold tracking-[-0.01em] text-ink transition-colors hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${className}`}
    >
      {children}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "center" | "left";
}) {
  const isCenter = align === "center";
  return (
    <div className={`flex flex-col gap-4 ${isCenter ? "items-center text-center" : "items-start"}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="max-w-3xl text-[34px] font-bold leading-[1.06] tracking-[-0.035em] text-ink sm:text-[42px] lg:text-[48px]">
        {title}
      </h2>
      {sub ? (
        <p className={`max-w-[660px] text-[17px] leading-[1.6] text-dim ${isCenter ? "" : "max-w-[440px]"}`}>
          {sub}
        </p>
      ) : null}
    </div>
  );
}
