import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import { site } from "@/lib/config";
import Cursor from "./components/Cursor";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} · Florería en ${site.city}`,
  description: site.tagline,
  openGraph: {
    title: `${site.name} · Florería`,
    description: site.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX" className={`${display.variable} ${body.variable}`}>
      <body>
        <Cursor />
        {children}
      </body>
    </html>
  );
}
