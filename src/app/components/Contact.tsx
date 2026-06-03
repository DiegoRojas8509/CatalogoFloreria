import { site } from "@/lib/config";
import { whatsappLink } from "@/lib/whatsapp";
import GSAPScrollTitle from "./GSAPScrollTitle";

export default function Contact() {
  return (
    <section id="contacto" className="bg-cream px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <hr className="section-rule mb-16" />
        <GSAPScrollTitle label="— Contacto">Visítanos</GSAPScrollTitle>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <div className="space-y-7">
            <ContactRow label="Dirección" value={site.address} href={site.mapsUrl} />
            <ContactRow label="Horario" value={site.hours} />
            <ContactRow label="Teléfono" value={site.phoneDisplay} href={`tel:+${site.whatsapp}`} />
            <ContactRow label="Instagram" value={site.instagramHandle} href={site.instagram} />
          </div>

          <div className="flex h-full flex-col justify-center rounded-xl2 bg-olive p-9 text-center text-cream">
            <h3 className="font-display text-3xl text-cream-light">
              ¿Lista tu cotización?
            </h3>
            <p className="mt-3 text-cream/75">
              Mándanos un mensaje y con gusto te ayudamos a elegir el arreglo perfecto.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center justify-center gap-2.5 rounded-full bg-cream-light px-7 py-4 font-medium text-olive transition hover:bg-cream"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
              </svg>
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="border-b border-sage/25 pb-5">
      <p className="eyebrow text-sage-dark">{label}</p>
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="mt-2 block text-lg leading-snug text-olive transition hover:text-sage-dark"
        >
          {value}
        </a>
      ) : (
        <p className="mt-2 text-lg leading-snug text-olive">{value}</p>
      )}
    </div>
  );
}
