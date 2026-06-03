import { site } from "@/lib/config";
import { whatsappLink } from "@/lib/whatsapp";

const MARQUEE_ITEMS = [
  "Rosas", "Peonías", "Girasoles", "Tulipanes", "Lavanda",
  "Orquídeas", "Lisianthus", "Eucalipto", "Ranúnculos",
  "Crisantemos", "Hortensias", "Alstroemerias", "Dalia", "Protea", "Gypsophila",
];

export default function Hero() {
  return (
    <section id="top" className="bg-cream-light">

      {/* Cuerpo principal */}
      <div className="mx-auto max-w-5xl px-6 pb-20 pt-24 text-center sm:px-10 sm:pt-32 sm:pb-24">

        {/* Etiqueta */}
        <div className="overflow-hidden">
          <p
            className="dash-label text-olive animate-text-curtain"
            style={{ animationDelay: "0.05s" }}
          >
            — Florería · {site.city}
          </p>
        </div>

        {/* Titular: cada línea con curtain reveal */}
        <h1
          className="mt-10 font-display leading-[0.9] text-olive"
          style={{ fontSize: "clamp(3.4rem, 8.5vw, 8.5rem)" }}
        >
          <span className="curtain-wrap">
            <span
              className="block animate-text-curtain"
              style={{ animationDelay: "0.18s" }}
            >
              Flores con
            </span>
          </span>
          <span className="curtain-wrap">
            <em
              className="block text-sage animate-text-curtain"
              style={{ animationDelay: "0.38s" }}
            >
              intención.
            </em>
          </span>
        </h1>

        {/* Línea decorativa — se "dibuja" desde el centro */}
        <div
          className="mx-auto mt-12 w-12 border-t border-olive/20 origin-center animate-line-grow"
          style={{ animationDelay: "0.55s" }}
          aria-hidden="true"
        />

        {/* Intro */}
        <p
          className="mx-auto mt-8 max-w-lg text-lg leading-relaxed text-olive/60 animate-fade-up"
          style={{ animationDelay: "0.62s" }}
        >
          {site.intro}
        </p>

        {/* CTAs */}
        <div
          className="mt-10 flex flex-col items-center justify-center gap-3 animate-fade-up sm:flex-row"
          style={{ animationDelay: "0.72s" }}
        >
          <a href="#catalogo" className="btn-editorial-solid">
            Ver el catálogo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-editorial"
          >
            Cotizar por WhatsApp
          </a>
        </div>
      </div>

      {/* Stats */}
      <div
        className="border-t border-olive/10 py-4 animate-fade-in"
        style={{ animationDelay: "0.82s" }}
      >
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-1 px-6 text-[0.68rem] uppercase tracking-[0.25em] text-olive/30">
          <span>Diseño a mano</span>
          <span aria-hidden="true">·</span>
          <span>Flores de temporada</span>
          <span aria-hidden="true">·</span>
          <span>Entrega en CDMX</span>
        </div>
      </div>

      {/* Doble marquee — direcciones opuestas */}
      <div
        className="animate-fade-in overflow-hidden border-t border-olive/10 bg-cream-deep"
        style={{ animationDelay: "0.9s" }}
        aria-hidden="true"
      >
        {/* Fila 1 → izquierda */}
        <div className="flex animate-marquee whitespace-nowrap border-b border-olive/5 py-2.5">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="mx-5 text-xs uppercase tracking-[0.28em] text-olive font-medium">
              {item}
              <span className="ml-5 text-kraft">✦</span>
            </span>
          ))}
        </div>
        {/* Fila 2 → derecha */}
        <div className="flex animate-marquee-reverse whitespace-nowrap py-2.5">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="mx-5 text-xs uppercase tracking-[0.28em] text-olive/50 font-medium">
              {item}
              <span className="ml-5 text-sage/40">·</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
