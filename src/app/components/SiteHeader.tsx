"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/config";
import { whatsappLink } from "@/lib/whatsapp";

const links = [
  { href: "#catalogo", label: "Catálogo" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-400 ${
        scrolled
          ? "border-b border-olive/10 bg-cream-light/92 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">

        {/* Logo */}
        <a href="#top" className="group flex items-center gap-3 leading-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt={site.name}
            className="h-9 w-auto shrink-0 object-contain transition-opacity group-hover:opacity-75 sm:h-10"
          />
          <span>
            <span className="block font-display text-xl tracking-tight text-olive transition-opacity group-hover:opacity-70">
              {site.name}
            </span>
            <span className="dash-label text-[0.6rem] text-olive">Florería artesanal</span>
          </span>
        </a>

        {/* Nav escritorio */}
        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-[0.15em] text-olive/50 transition hover:text-olive"
            >
              {l.label}
            </a>
          ))}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-olive px-4 py-2 text-xs font-medium text-cream-light transition hover:bg-olive-dark"
          >
            WhatsApp
          </a>
        </nav>

        {/* Botón mobile */}
        <a
          href="#catalogo"
          className="text-xs uppercase tracking-[0.15em] text-olive/60 transition hover:text-olive md:hidden"
        >
          Catálogo
        </a>
      </div>
    </header>
  );
}
