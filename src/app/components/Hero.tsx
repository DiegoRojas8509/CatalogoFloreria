import { site } from "@/lib/config";
import { whatsappLink } from "@/lib/whatsapp";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-cream">
      <div className="mx-auto max-w-5xl px-5 pb-24 pt-20 text-center sm:px-8 sm:pb-32 sm:pt-28">
        <p className="eyebrow text-sage-dark animate-fade-in" style={{ animationDelay: "0.05s" }}>
          Florería · {site.city}
        </p>

        <h1
          className="mx-auto mt-6 max-w-3xl font-display text-5xl leading-[1.05] text-olive animate-fade-up sm:text-7xl"
          style={{ animationDelay: "0.12s" }}
        >
          Flores que dicen
          <span className="block italic text-sage-dark">lo simple y lo bonito</span>
        </h1>

        <p
          className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-olive/70 animate-fade-up"
          style={{ animationDelay: "0.24s" }}
        >
          {site.intro}
        </p>

        <div
          className="mt-10 flex flex-col items-center justify-center gap-3 animate-fade-up sm:flex-row"
          style={{ animationDelay: "0.34s" }}
        >
          <a
            href="#catalogo"
            className="w-full rounded-full bg-olive px-8 py-4 font-medium text-cream-light transition hover:bg-olive-dark sm:w-auto"
          >
            Ver el catálogo
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full border border-olive/30 px-8 py-4 font-medium text-olive transition hover:border-olive hover:bg-cream sm:w-auto"
          >
            Escríbenos por WhatsApp
          </a>
        </div>
      </div>

      {/* Acentos botánicos sutiles */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-10 top-10 h-40 w-40 rounded-full bg-sage/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-10 bottom-0 h-52 w-52 rounded-full bg-kraft/20 blur-3xl" />
    </section>
  );
}
