"use client";

import { useEffect } from "react";
import type { Arrangement } from "@/lib/types";
import { formatPrice, whatsappLink } from "@/lib/whatsapp";
import Placeholder from "./Placeholder";

export default function ArrangementModal({
  arrangement,
  onClose,
}: {
  arrangement: Arrangement | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!arrangement) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [arrangement, onClose]);

  if (!arrangement) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-olive/50 p-0 backdrop-blur-sm animate-fade-in sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={arrangement.name}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-xl2 bg-cream-light shadow-2xl animate-slide-up sm:animate-scale-in sm:rounded-xl2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-cream-light/90 text-olive shadow-sm transition hover:bg-cream-deep"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="grid gap-0 md:grid-cols-2">
          <div className="aspect-[4/5] w-full overflow-hidden bg-cream-deep md:aspect-auto md:min-h-full">
            {arrangement.imageUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={arrangement.imageUrl}
                alt={arrangement.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <Placeholder name={arrangement.name} />
            )}
          </div>

          <div className="flex flex-col p-7 sm:p-9">
            {arrangement.category && (
              <p className="eyebrow text-sage-dark">{arrangement.category.name}</p>
            )}
            <h2 className="mt-2 font-display text-3xl leading-tight text-olive">
              {arrangement.name}
            </h2>
            <p className="mt-3 text-2xl font-medium text-sage-dark">
              {formatPrice(arrangement)}
            </p>

            {arrangement.shortDescription && (
              <p className="mt-5 leading-relaxed text-olive/80">
                {arrangement.shortDescription}
              </p>
            )}

            {arrangement.flowers && arrangement.flowers.length > 0 && (
              <div className="mt-6">
                <p className="eyebrow text-olive/50">Flores incluidas</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {arrangement.flowers.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-sage/40 bg-cream px-3 py-1 text-sm text-olive/80"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <a
              href={whatsappLink(arrangement)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2.5 rounded-full bg-olive px-7 py-4 font-medium text-cream-light transition hover:bg-olive-dark"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
              </svg>
              Cotizar por WhatsApp
            </a>
            <p className="mt-3 text-center text-xs text-olive/45">
              Te abrimos WhatsApp con el mensaje listo para enviar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
