"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Props {
  /** Texto del label (—) arriba del título */
  label?: string;
  /** Contenido del título — puede ser string o JSX */
  children: React.ReactNode;
  /** Clase extra para el h2 */
  className?: string;
  /** Retraso de inicio en ms */
  delay?: number;
}

export default function GSAPScrollTitle({
  label,
  children,
  className = "",
  delay = 0,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 82%",
          once: true,
        },
        delay: delay / 1000,
      });

      if (label) {
        tl.from(".gsap-label", {
          opacity: 0,
          y: 10,
          duration: 0.5,
          ease: "power2.out",
        });
      }

      // Cada línea del título sube desde abajo del overflow-hidden
      tl.from(
        ".gsap-title-line",
        {
          yPercent: 110,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
        },
        label ? "-=0.25" : 0
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      {label && (
        <p className="gsap-label dash-label text-center text-olive">{label}</p>
      )}
      <div
        className={`mt-5 overflow-hidden text-center font-display text-5xl text-olive sm:text-6xl lg:text-7xl ${className}`}
      >
        <div className="gsap-title-line">{children}</div>
      </div>
    </div>
  );
}
