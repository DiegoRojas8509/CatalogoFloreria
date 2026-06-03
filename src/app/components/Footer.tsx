import { site } from "@/lib/config";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-olive-dark px-5 py-12 text-cream/70 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt={site.name}
            className="h-10 w-auto object-contain brightness-0 invert"
          />
          <p className="eyebrow mt-2 text-[0.58rem] text-sage-light">Florería · {site.city}</p>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="transition hover:text-cream-light">
            Instagram
          </a>
          <a href={`tel:+${site.whatsapp}`} className="transition hover:text-cream-light">
            {site.phoneDisplay}
          </a>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-center text-xs text-cream/40 sm:text-left">
        © {year} {site.name}. Hecho con cariño 🌿
      </p>
    </footer>
  );
}
