"use client";

import { useState } from "react";
import { BOOKING_URL, LEAD_ENDPOINT } from "@/lib/config";

/**
 * "Get My Custom ROI Report" lead capture at the end of the calculator.
 * POSTs { email, context } to LEAD_ENDPOINT when it's configured. Until an
 * endpoint is set it never fakes a success — it sends the visitor to the
 * booking flow, where the custom report is walked through on the audit.
 */
export function RoiLeadForm({ context }: { context: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!LEAD_ENDPOINT) {
      // No endpoint wired yet: don't pretend to capture. Route to booking.
      window.location.href = BOOKING_URL;
      return;
    }

    setState("sending");
    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, context }),
      });
      if (!res.ok) throw new Error("bad status");
      setState("done");
    } catch {
      setState("idle");
      setError("Something went wrong. Try again, or just book the audit.");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-2xl border border-brand/40 bg-card p-6 text-[14px] leading-[1.6] text-muted">
        <span className="font-semibold text-ink">Your report is on the way.</span> Check
        your inbox — we&apos;ll bring the full breakdown to your free lead-flow audit.
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-subtle bg-card p-6 sm:p-7"
    >
      <p className="text-[15px] font-semibold text-ink">Get my custom ROI report</p>
      <p className="mt-1.5 text-[13px] leading-[1.55] text-dim">
        Your numbers, broken down and sent to your inbox — plus a plan for the exact
        agents that clear it.
      </p>
      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Email address"
          className="min-w-0 flex-1 rounded-lg border border-subtle bg-base px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-dim focus:border-brand"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="shrink-0 rounded-lg bg-brand px-5 py-3 text-[14px] font-semibold text-base transition-colors hover:bg-white disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Get My Custom ROI Report"}
        </button>
      </div>
      {error ? <p className="mt-2.5 text-[12.5px] text-brand">{error}</p> : null}
    </form>
  );
}
