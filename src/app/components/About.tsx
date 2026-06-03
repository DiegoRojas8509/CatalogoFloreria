"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/config";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.from(".about-label", { opacity: 0, y: 10, duration: 0.5 })
        .from(
          ".about-quote-line",
          { yPercent: 110, duration: 1.1, stagger: 0.15, ease: "power4.out" },
          "-=0.2"
        )
        .from(
          ".about-rule",
          { scaleX: 0, duration: 0.6, transformOrigin: "center", ease: "power2.out" },
          "-=0.5"
        )
        .from(
          ".about-body",
          { opacity: 0, y: 16, duration: 0.7 },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  // Dividir el tagline en palabras para la animación
  const quoteWords = site.tagline.split(" ");

  return (
    <section
      id="nosotros"
      ref={containerRef}
      className="px-6 py-28 text-cream sm:px-10 sm:py-36"
      style={{ background: "linear-gradient(135deg, #3D1D0A 0%, #5C2E14 55%, #4A2010 100%)" }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <span className="about-label inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[0.82rem] font-medium tracking-wide" style={{ background: "rgba(212,148,58,0.15)", color: "#D4943A" }}>
· Nosotros
        </span>

        {/* Cita con word-by-word reveal */}
        <blockquote
          className="mt-8 font-display italic leading-[1.05] text-cream-light"
          style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)" }}
        >
          <span className="curtain-wrap">
            <span className="about-quote-line block">
              &ldquo;{site.tagline}&rdquo;
            </span>
          </span>
        </blockquote>

        <div
          className="about-rule mx-auto mt-10 w-10 border-t"
          style={{ borderColor: "rgba(212,148,58,0.35)" }}
          aria-hidden="true"
        />

        <p className="about-body mx-auto mt-8 max-w-xl text-lg leading-relaxed text-cream/65">
          {site.about}
        </p>

        <a
          href="#contacto"
          className="mt-10 inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm transition"
          style={{ borderColor: "rgba(212,148,58,0.35)", color: "#D4943A" }}
        >
          Contáctanos →
        </a>
      </div>
    </section>
  );
}
