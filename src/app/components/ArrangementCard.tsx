"use client";

import type { Arrangement } from "@/lib/types";
import { formatPrice } from "@/lib/whatsapp";
import Placeholder from "./Placeholder";

export default function ArrangementCard({
  arrangement,
  onOpen,
  index = 0,
  showFeaturedBadge = true,
}: {
  arrangement: Arrangement;
  onOpen: (a: Arrangement) => void;
  index?: number;
  showFeaturedBadge?: boolean;
}) {
  return (
    <button
      onClick={() => onOpen(arrangement)}
      className="group block w-full text-left stagger-item focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50"
      aria-label={`Ver ${arrangement.name}`}
      style={{ "--si": Math.min(index, 7) } as React.CSSProperties}
    >
      <div className="overflow-hidden rounded-xl2 bg-cream-light shadow-sm transition-shadow duration-300 group-hover:shadow-md">
        {/* Imagen */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-cream-deep">
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

          {showFeaturedBadge && arrangement.isFeatured && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-sage/80 px-2.5 py-1 text-[0.6rem] font-medium text-cream-light backdrop-blur">
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

        </div>

        {/* Info del arreglo */}
        <div className="px-4 py-3.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg leading-tight text-olive transition-colors duration-300 group-hover:text-peach">
              {arrangement.name}
            </h3>
            <span className="shrink-0 text-sm font-semibold text-sage transition-colors duration-300 group-hover:text-sage-dark">
              {formatPrice(arrangement)}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between">
            {arrangement.category ? (
              <p className="text-xs uppercase tracking-[0.15em] text-sage/60">
                {arrangement.category.name}
              </p>
            ) : <span />}
            <p className="text-xs font-medium text-olive/50 transition-colors duration-300 group-hover:text-peach">
              Ver detalle →
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}
