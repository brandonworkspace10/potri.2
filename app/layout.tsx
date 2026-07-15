import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Potri — AI employees for real estate investors & wholesalers",
  description:
    "Three specialized AI agents — outbound, inbound, and back office — deployed in under six days, for roughly the cost of one human hire. Fluent English and Spanish on every call.",
  openGraph: {
    title: "Potri — AI employees for real estate investors & wholesalers",
    description:
      "Andy dials and qualifies your seller leads. Randy answers every inbound call 24/7. Alyssa runs your follow-up. The full team for $5,200/mo.",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
