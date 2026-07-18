import type { Metadata } from "next";
import * as React from "react";

// At runtime `react` resolves to Next's vendored canary, which exports
// ViewTransition; stable @types/react doesn't declare it yet.
const ViewTransition = (
  React as unknown as {
    ViewTransition: React.ComponentType<{ children: React.ReactNode }>;
  }
).ViewTransition;
import { Geist, Geist_Mono } from "next/font/google";
import { AnchorSettle } from "@/components/anchor-settle";
import { SITE_URL } from "@/lib/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "Stop Building AI, Start Deploying It";
const DESCRIPTION =
  "Get relief from operational gaps. Deploy pre-trained AI employees for cold calling, 24/7 reception, and custom follow-up. Live in 6 days. Book your free lead-flow audit.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${TITLE} | AI Employees for Real Estate | Topri`,
    template: "%s | Topri",
  },
  description: DESCRIPTION,
  keywords: [
    "AI cold caller for real estate",
    "AI acquisitions caller",
    "AI receptionist for real estate investors",
    "real estate wholesaling automation",
    "seller lead qualification",
    "AI phone agent for wholesalers",
    "bilingual AI caller",
    "real estate follow-up automation",
  ],
  alternates: { canonical: "/", languages: { en: "/", es: "/es" } },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Topri",
    title: TITLE,
    description:
      "Stop fighting with complex tools and unreliable callers. Deploy pre-trained AI employees — cold calling, 24/7 reception and custom follow-up — into your business in under six days. You handle the contracts, we handle the rest.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Stop building your own AI. Deploy pre-trained AI employees for real estate — outbound, inbound and follow-up. Live in under six days.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-base text-ink">
        <AnchorSettle />
        <ViewTransition>{children}</ViewTransition>
      </body>
    </html>
  );
}
