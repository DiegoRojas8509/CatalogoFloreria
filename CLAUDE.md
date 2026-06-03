# CLAUDE.md — CatalogoFloreria (Template Genérico)

Contexto del proyecto para asistentes de IA (Claude Code y similares) y para
cualquier persona que retome el código. Escrito en español; términos técnicos,
rutas y comandos se mantienen tal cual.

---

## 1. Qué es esto

**Template genérico de catálogo digital para florerías.** Funciona como un
**portafolio / catálogo digital autogestionable**: los visitantes navegan los arreglos
florales, los buscan y filtran, abren un detalle y **cotizan por WhatsApp**.
El dueño administra el contenido desde un panel Sanity sin tocar código.

La instalación actual usa **Raíz Floral** como marca ficticia de demostración
para mostrar el producto a clientes potenciales.

- **No** es e-commerce: no hay carrito, pagos ni cuentas de usuario.
- La acción de conversión principal es **WhatsApp**.
- Idioma del sitio: **español (es-MX)**. Precios en **MXN**.
- Objetivo de costo: **$0/mes** en plan gratuito.

---

## 2. Stack

| Capa | Tecnología | Notas |
|---|---|---|
| Framework | Next.js 14 (App Router) + React 18 + TypeScript | Exportación estática (`output: "export"`) |
| Estilos | TailwindCSS 3 | Tokens de marca en `tailwind.config.ts` |
| Contenido + Panel + Imágenes | Sanity v3 | Studio = panel de admin; CDN de imágenes con optimización |
| Hosting público | Cloudflare Pages | Gratis, uso comercial permitido, ancho de banda ilimitado |
| Conversión | WhatsApp (`wa.me` deep links) | Mensaje prellenado |

**Por qué este stack:** Sanity no se pausa por inactividad (Supabase gratis sí)
y trae el panel hecho; Cloudflare permite uso comercial gratis (Vercel Hobby no).

---

## 3. Comandos

```bash
npm install            # instalar dependencias (primera vez)
npm run dev            # sitio público en http://localhost:3000
npm run studio         # panel de administración en http://localhost:3333
npm run build          # genera el sitio estático en ./out  (para publicar)
npm run studio:deploy  # publica el panel en https://<studioHost>.sanity.studio
npm run seed           # carga 9 arreglos de ejemplo en Sanity (requiere token)
```

---

## 4. Arquitectura y flujo de datos

1. **Exportación estática** (`next.config.mjs` → `output: "export"`).
   No hay servidor → **no usar** API routes, Server Actions, ISR ni rutas dinámicas.

2. **Los datos se leen en el cliente** desde el CDN público de Sanity.
   Un cambio publicado aparece al recargar, sin recompilar.

3. **Fallback a datos de ejemplo.** Sin `NEXT_PUBLIC_SANITY_PROJECT_ID`,
   el sitio muestra `src/lib/sampleData.ts`.

4. **El Studio se despliega aparte** con `sanity deploy`. No está embebido en
   la app Next (rompería la exportación estática).

5. **El detalle es un modal**, compartible vía `?arreglo=<slug>`.

6. **Imágenes:** `<img>` con URLs del CDN de Sanity via `urlForImage()`.
   `images.unoptimized` activado (no hay servidor).

```
Sanity (contenido)
   │  GROQ (CDN de lectura)
   ▼
src/lib/data.ts  ── si NO hay projectId ──▶  src/lib/sampleData.ts
   │  getArrangements() / getCategories()
   ▼
src/app/components/Catalog.tsx  ("use client", fetch on mount)
   │  estado: búsqueda, filtro de categoría, modal seleccionado
   ▼
ArrangementCard → ArrangementModal → whatsappLink()
```

---

## 5. Estructura de archivos

```
catalogo-general/
├─ next.config.mjs
├─ tailwind.config.ts       # ⭐ paleta de marca, fuentes, animaciones + keyframes GSAP
├─ sanity.config.ts         # project ID hardcodeado (necesario para Studio)
├─ sanity.cli.ts            # studioHost
├─ .env.local               # variables de entorno (no subir a git)
│
├─ sanity/schemaTypes/
│  ├─ arrangement.ts
│  └─ category.ts
│
├─ scripts/seed.ts
│
└─ src/
   ├─ sanity/client.ts + image.ts
   ├─ lib/
   │  ├─ config.ts          # ⭐ datos de la florería (nombre, WhatsApp…)
   │  ├─ types.ts
   │  ├─ whatsapp.ts
   │  ├─ sampleData.ts      # arreglos/categorías de ejemplo (fallback)
   │  └─ data.ts
   └─ app/
      ├─ layout.tsx          # incluye <Cursor />
      ├─ globals.css         # ⭐ variables CSS, .curtain-wrap, .dash-label, cursor, etc.
      ├─ page.tsx
      └─ components/
         ├─ SiteHeader.tsx
         ├─ Hero.tsx          # componente original (no usado en page.tsx)
         ├─ GSAPHero.tsx      # ⭐ Hero activo — timeline GSAP entrada + parallax scroll
         ├─ GSAPScrollTitle.tsx  # ⭐ título de sección con curtain reveal al scroll
         ├─ Cursor.tsx        # cursor magnético personalizado (pointer: fine only)
         ├─ Catalog.tsx       # ⭐ núcleo
         ├─ ArrangementCard.tsx  # clip-path wipe + accent line en hover
         ├─ ArrangementModal.tsx
         ├─ About.tsx         # client component con GSAP ScrollTrigger
         ├─ Contact.tsx
         ├─ Footer.tsx
         ├─ FloatingWhatsApp.tsx  # con pulse ring
         ├─ Reveal.tsx        # fallback CSS reveal (variant: "default" | "clip")
         └─ Placeholder.tsx
```

⭐ = archivos que se editan con más frecuencia.

---

## 6. Modelo de datos

**Arrangement:** `name`, `slug`, `image`, `price`, `priceLabel`, `category`,
`shortDescription`, `flowers[]`, `isFeatured`, `isAvailable`, `order`.

**Category:** `name`, `slug`, `description?`, `order`.

---

## 7. Convenciones

- **Idioma:** contenido visible y comentarios en **español**.
- **Alias:** `@/...` → `src/`.
- **TypeScript estricto.** `npx tsc --noEmit` debe pasar limpio.
- **Sin `next/image`:** usar `<img>` + `urlForImage()`.
- **Accesibilidad:** `prefers-reduced-motion` en `globals.css`.
- **GSAP:** usar `useGSAP` (de `@gsap/react`), nunca `useEffect` para animaciones GSAP.
  Registrar plugins antes de usarlos (`gsap.registerPlugin(useGSAP, ScrollTrigger)`).
  ScrollTrigger con `once: true` para animaciones de entrada de una sola vez.
- **Cursor personalizado:** activo solo en `pointer: fine`; usa lerp con `requestAnimationFrame`.

---

## 8. Identidad visual — Raíz Floral (demo)

**Paleta** (`tailwind.config.ts` + `globals.css`):

| Token | Color | Uso |
|---|---|---|
| `olive` | `#5C2E14` (terracota oscuro) | Texto principal, logo, botones |
| `olive-dark` | `#3D1D0A` | Hover de botones |
| `olive-soft` | `#8B4A2A` | Texto secundario |
| `sage` | `#2D4A35` (verde botella) | Acento secundario, itálicas |
| `sage-light` | `#4A6B52` | |
| `cream` | `#F9EDD3` (arena cálida) | Fondo principal |
| `cream-light` | `#FDF6EC` | Fondo claro |
| `kraft` | `#D4A068` | Neutro ámbar |
| `peach` | `#C4622D` | Terracota vivo, CTAs secundarios |
| `craspedia` | `#D4943A` | Dorado ámbar |
| `berry` | `#7A2A1A` | Vino oscuro |

**Fuentes:** Fraunces (display/títulos) + Hanken Grotesk (cuerpo/UI).

**Estilo:** editorial minimalista, cálido. Inspirado en Un Jardín pero con
identidad terracota/tierra en lugar de olivo/crema fría.

---

## 9. Variables de entorno

```
NEXT_PUBLIC_SANITY_PROJECT_ID=a53z2c65
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=   # SOLO para seed; borrar después
```

El `projectId` también está hardcodeado en `sanity.config.ts` (línea 6)
porque el Studio deployado no lee `.env.local`.

---

## 10. Despliegue

**Sitio público (Cloudflare Pages):**
- Build command: `npm run build`
- Output directory: `out`
- Variables: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`

**Panel (Sanity Studio):** `npm run studio:deploy`

---

## 11. Adaptar para un cliente nuevo

Cambiar estos **6 archivos**:

1. `src/lib/config.ts` — nombre, WhatsApp, dirección, textos
2. `tailwind.config.ts` — paleta de colores
3. `src/app/globals.css` — variables CSS `:root`
4. `.env.local` — `NEXT_PUBLIC_SANITY_PROJECT_ID`
5. `sanity.config.ts` — `const projectId` (línea 6)
6. `src/lib/sampleData.ts` — datos de ejemplo del demo

Crear un proyecto nuevo en [sanity.io/manage](https://sanity.io/manage) para
cada cliente para aislar sus datos.

---

## 12. Repositorios

- **Este template:** `github.com/DiegoRojas8509/CatalogoFloreria` (rama `main`)
- **Cliente Un Jardín:** `github.com/DiegoRojas8509/UnJardinOriginal` (en `../un-jardin-original/`)

---

## 13. Animaciones — sistema GSAP

Paquetes: `gsap` + `@gsap/react`. 8 skills instaladas en `.claude/skills/`.

**Componentes activos:**
- `GSAPHero.tsx` — Timeline de entrada (label → línea 1 → línea 2 → rule → intro → CTAs → stats). Parallax `scrub: 1.2` en el titular al hacer scroll.
- `GSAPScrollTitle.tsx` — Títulos de sección con curtain reveal (`yPercent: 110 → 0`, `power4.out`) al entrar en viewport. Props: `label`, `children`, `className`, `delay`.
- `About.tsx` — Client component: label fade + cita curtain + rule scaleX + body fade al scroll.
- `ArrangementCard.tsx` — Clip-path wipe en hover (`inset(100% 0 0% 0)` → `inset(0% 0 0% 0)`), accent line scaleX, título cambia a peach.
- `Cursor.tsx` — Cursor magnético personalizado: dot + ring con lerp (`rx += (mx - rx) * 0.1`), solo en `pointer: fine`, respeta `prefers-reduced-motion`.

**Clases CSS clave en `globals.css`:**
- `.curtain-wrap` — `overflow: hidden; display: block` (envuelve texto para curtain reveal)
- `.dash-label` — estilo em-dash, tracking 0.2em, opacity 0.45
- `.section-rule` — divisor de 1px
- `.btn-editorial` / `.btn-editorial-solid` — CTAs cuadrados, uppercase, sin redondeo
- `.has-custom-cursor` + `.cursor-dot` + `.cursor-ring` — cursor personalizado

---

## 14. MCP configurados (`~/.claude/mcp.json`)

- **21st-magic** — `npx @21st-dev/magic@latest` para generación de componentes UI.
- **stitch** — Proxy stdio (`~/.claude/stitch-proxy.mjs`) → `https://stitch.googleapis.com/mcp` con `X-Goog-Api-Key`. Requiere reinicio de Claude Code para activarse.

---

## 15. Estado actual (junio 2026)

- Rebrand completo a **Raíz Floral** (marca demo) con paleta terracota/verde botella.
- Sanity conectado: Project ID `a53z2c65`, dataset `production`.
- GSAP implementado en Hero, títulos de sección, About, cards y cursor.
- Estilo editorial inspirado en studiomondine.com — curtain reveals, parallax, clip-path wipes.
- `npx tsc --noEmit` pasa limpio.
- Stitch MCP configurado; requiere reinicio para cargar el servidor.
- Pendiente: más animaciones con Stitch + GSAP ScrollTrigger en cards al scroll.
