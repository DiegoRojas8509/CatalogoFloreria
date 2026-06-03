"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/config";
import { whatsappLink } from "@/lib/whatsapp";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MARQUEE_ITEMS = [
  "Rosas", "Peonías", "Girasoles", "Tulipanes", "Lavanda",
  "Orquídeas", "Lisianthus", "Eucalipto", "Ranúnculos",
  "Crisantemos", "Hortensias", "Alstroemerias", "Dalia", "Protea", "Gypsophila",
];

export default function GSAPHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      // 1. Timeline de entrada al cargar la página
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-label", {
        yPercent: 120,
        duration: 0.7,
        delay: 0.1,
      })
        .from(
          ".hero-line-1",
          { yPercent: 110, duration: 1.1 },
          "-=0.4"
        )
        .from(
          ".hero-line-2",
          { yPercent: 110, duration: 1.1 },
          "-=0.85"
        )
        .from(
          ".hero-rule",
          { scaleX: 0, duration: 0.7, transformOrigin: "center" },
          "-=0.5"
        )
        .from(
          ".hero-intro",
          { opacity: 0, y: 18, duration: 0.7 },
          "-=0.4"
        )
        .from(
          ".hero-cta",
          { opacity: 0, y: 14, stagger: 0.1, duration: 0.6 },
          "-=0.35"
        )
        .from(
          ".hero-stats",
          { opacity: 0, duration: 0.5 },
          "-=0.3"
        );

      // 2. Parallax del headline al hacer scroll
      gsap.to(headlineRef.current, {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="top" ref={containerRef} className="bg-cream-light overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 pb-20 pt-24 text-center sm:px-10 sm:pt-32 sm:pb-24">

        {/* Etiqueta */}
        <div className="overflow-hidden">
          <p className="hero-label dash-label text-olive">
            — Florería · {site.city}
          </p>
        </div>

        {/* Titular con parallax */}
        <h1
          ref={headlineRef}
          className="mt-10 font-display leading-[0.9] text-olive"
          style={{ fontSize: "clamp(3.4rem, 8.5vw, 8.5rem)" }}
        >
          <span className="curtain-wrap">
            <span className="block hero-line-1">Flores con</span>
          </span>
          <span className="curtain-wrap">
            <em className="block text-sage hero-line-2">intención.</em>
          </span>
        </h1>

        {/* Línea decorativa */}
        <div
          className="hero-rule mx-auto mt-12 w-12 border-t border-olive/20"
          aria-hidden="true"
        />

        {/* Intro */}
        <p className="hero-intro mx-auto mt-8 max-w-lg text-lg leading-relaxed text-olive/60">
          {site.intro}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#catalogo" className="hero-cta btn-editorial-solid">
            Ver el catálogo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta btn-editorial"
          >
            Cotizar por WhatsApp
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="hero-stats border-t border-olive/10 py-4">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-1 px-6 text-[0.68rem] uppercase tracking-[0.25em] text-olive/30">
          <span>Diseño a mano</span>
          <span aria-hidden="true">·</span>
          <span>Flores de temporada</span>
          <span aria-hidden="true">·</span>
          <span>Entrega en CDMX</span>
        </div>
      </div>

      {/* Doble marquee */}
      <div className="overflow-hidden border-t border-olive/10 bg-cream-deep" aria-hidden="true">
        <div className="flex animate-marquee whitespace-nowrap border-b border-olive/5 py-2.5">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="mx-5 text-xs uppercase tracking-[0.28em] text-olive font-medium">
              {item}<span className="ml-5 text-kraft">✦</span>
            </span>
          ))}
        </div>
        <div className="flex animate-marquee-reverse whitespace-nowrap py-2.5">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="mx-5 text-xs uppercase tracking-[0.28em] text-olive/50 font-medium">
              {item}<span className="ml-5 text-sage/40">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
