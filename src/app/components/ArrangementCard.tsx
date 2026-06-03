"use client";

import type { Arrangement } from "@/lib/types";
import { formatPrice } from "@/lib/whatsapp";
import Placeholder from "./Placeholder";

export default function ArrangementCard({
  arrangement,
  onOpen,
  index = 0,
}: {
  arrangement: Arrangement;
  onOpen: (a: Arrangement) => void;
  index?: number;
}) {
  return (
    <button
      onClick={() => onOpen(arrangement)}
      className="group block w-full text-left stagger-item focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50"
      aria-label={`Ver ${arrangement.name}`}
      style={{ "--si": Math.min(index, 7) } as React.CSSProperties}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl2 bg-cream-deep">
        {arrangement.imageUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={arrangement.imageUrl}
            alt={arrangement.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          />
        ) : (
          <Placeholder name={arrangement.name} />
        )}

        {arrangement.isFeatured && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-cream-light/90 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-olive backdrop-blur">
            Destacado
          </span>
        )}

        {/* Overlay con clip-path wipe desde abajo */}
        <span
          className="
            absolute inset-0 flex items-end justify-center pb-5
            bg-gradient-to-t from-olive/70 via-olive/20 to-transparent
            [clip-path:inset(100%_0_0%_0)]
            group-hover:[clip-path:inset(0%_0_0%_0)]
            [transition:clip-path_0.55s_cubic-bezier(0.16,1,0.3,1)]
          "
        >
          <span className="flex items-center gap-1.5 rounded-full bg-cream-light px-5 py-2 text-xs font-medium text-olive shadow-sm">
            Ver detalle
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </span>

        {/* Línea acento verde que se "dibuja" desde la izquierda al hover */}
        <span
          className="
            absolute inset-x-0 bottom-0 h-[2.5px] origin-left bg-sage
            scale-x-0 group-hover:scale-x-100
            transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]
          "
          aria-hidden="true"
        />
      </div>

      <div className="mt-3.5 flex items-baseline justify-between gap-3 px-0.5">
        <h3 className="font-display text-lg leading-tight text-olive transition-colors duration-300 group-hover:text-peach">
          {arrangement.name}
        </h3>
        <span className="shrink-0 text-sm font-medium text-sage-dark transition-colors duration-300 group-hover:text-sage">
          {formatPrice(arrangement)}
        </span>
      </div>

      {arrangement.category && (
        <p className="mt-0.5 overflow-hidden px-0.5 text-xs uppercase tracking-[0.18em] text-sage-light">
          <span className="block transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
            {arrangement.category.name}
          </span>
        </p>
      )}
    </button>
  );
}
