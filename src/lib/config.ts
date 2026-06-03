// ───────────────────────────────────────────────────────────
//  DATOS DE LA FLORERÍA  —  edita aquí, todo el sitio se actualiza
// ───────────────────────────────────────────────────────────

export const site = {
  name: "Raíz Floral",
  tagline: "Flores con intención, hechas a mano desde la raíz.",
  intro:
    "Cada arreglo nace de flores frescas de temporada, trabajadas a mano con cuidado. Explora el catálogo y cotiza por WhatsApp.",

  // Número de WhatsApp en formato internacional, SIN signos ni espacios.
  // México: 52 + lada + número.  Ej: 52 477 140 7875 → "524771407875"
  whatsapp: "524451586866",
  phoneDisplay: "+52 4451586866",

  instagram: "https://www.instagram.com/raizfloral/",
  instagramHandle: "@raizfloral",

  address: "Álvaro Obregón 215, Roma Norte, 06700 Ciudad de México, CDMX.",
  mapsUrl: "https://maps.google.com/?q=Álvaro+Obregón+215,+Roma+Norte,+Ciudad+de+México",
  city: "Ciudad de México",
  hours: "Lunes a sábado · 10:00 a.m. – 6:00 p.m.",

  about:
    "Raíz Floral nació de la convicción de que las flores deben tener historia. Trabajamos con flores de temporada, seleccionadas con cuidado, para crear arreglos que se sienten auténticos. Cada pieza es diferente, como lo son los momentos que celebran.",
};

// Mensaje que se manda por WhatsApp al cotizar.
// {nombre} y {precio} se reemplazan con los datos del arreglo.
export const whatsappTemplate =
  'Hola Raíz Floral 🌿 Me interesa cotizar el arreglo "{nombre}" ({precio}). ¿Me podrías dar más información?';

export const whatsappGeneral =
  "Hola Raíz Floral 🌿 Me gustaría más información sobre sus arreglos florales.";
