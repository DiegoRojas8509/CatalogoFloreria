# CLAUDE.md — Un Jardín

Contexto del proyecto para asistentes de IA (Claude Code y similares) y para
cualquier persona que retome el código. Escrito en español; términos técnicos,
rutas y comandos se mantienen tal cual.

---

## 1. Qué es esto

Sitio web de **Un Jardín**, una florería en León, Gto. Funciona como un
**portafolio / catálogo digital**: los visitantes navegan los arreglos
florales, los buscan y filtran, abren un detalle y **cotizan por WhatsApp**.
La dueña administra el contenido (subir, editar, borrar, fotos) desde un panel
sin tocar código.

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
npm run studio:deploy  # publica el panel en https://un-jardin-original.sanity.studio
npm run seed           # carga 9 arreglos de ejemplo en Sanity (requiere token)
```

---

## 4. Arquitectura y flujo de datos

Decisiones clave (importantes antes de cambiar nada):

1. **Exportación estática** (`next.config.mjs` → `output: "export"`).
   El sitio se compila a HTML/CSS/JS planos en `./out` y se sube a Cloudflare.
   **Consecuencia:** no hay servidor → **no usar** API routes, Server Actions,
   ISR ni rutas dinámicas con datos de servidor. Todo lo dinámico se obtiene en
   el cliente.

2. **Los datos se leen en el cliente** desde el **CDN público de lectura de
   Sanity**. Por eso, cuando la dueña publica un cambio, aparece en el sitio
   al recargar **sin necesidad de recompilar**.

3. **Fallback a datos de ejemplo.** Si no hay `NEXT_PUBLIC_SANITY_PROJECT_ID`,
   el sitio muestra `src/lib/sampleData.ts`. Esto permite ver el sitio sin
   configurar Sanity todavía.

4. **El Studio (panel) se despliega aparte** con `sanity deploy`
   (→ `*.sanity.studio`). **No** está embebido en la app Next (embeberlo
   rompería la exportación estática). El repo contiene ambos; se publican en
   dos lugares distintos.

5. **El detalle es un modal**, no una ruta. Es compartible vía
   `?arreglo=<slug>` (funciona en hosting estático).

6. **Imágenes:** se usan `<img>` normales con URLs del CDN de Sanity generadas
   por `urlForImage()`. El optimizador de Next está apagado (`images.unoptimized`)
   porque no hay servidor; el CDN de Sanity hace el resize/WebP.

Flujo resumido:

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
un-jardin/
├─ next.config.mjs          # output: "export", images.unoptimized, trailingSlash
├─ tailwind.config.ts       # ⭐ paleta de marca, fuentes, animaciones
├─ tsconfig.json            # alias "@/*" → "src/*"
├─ sanity.config.ts         # configuración del Studio (panel admin)
├─ sanity.cli.ts            # studioHost: "un-jardin-original" (subdominio .sanity.studio)
├─ .env.local.example       # plantilla de variables de entorno
├─ README.md                # guía paso a paso (instalar, conectar, publicar)
│
├─ sanity/schemaTypes/      # define los campos del panel
│  ├─ index.ts              # registra los tipos
│  ├─ arrangement.ts        # esquema del Arreglo
│  └─ category.ts           # esquema de Categoría
│
├─ scripts/
│  └─ seed.ts               # carga datos de ejemplo en Sanity (opcional)
│
└─ src/
   ├─ sanity/
   │  ├─ client.ts          # cliente de lectura + flag `sanityConfigured`
   │  └─ image.ts           # urlForImage() (builder de imágenes del CDN)
   │
   ├─ lib/
   │  ├─ config.ts          # ⭐ datos de la florería (nombre, WhatsApp, dirección…)
   │  ├─ types.ts           # tipos Arrangement y Category
   │  ├─ whatsapp.ts        # whatsappLink() y formatPrice()
   │  ├─ sampleData.ts      # arreglos/categorías de ejemplo (fallback)
   │  └─ data.ts            # getArrangements() / getCategories() (Sanity o ejemplo)
   │
   └─ app/
      ├─ layout.tsx         # fuentes (Fraunces + Hanken Grotesk), metadata
      ├─ globals.css        # base, tokens CSS, clase .eyebrow, .paper, .reveal
      ├─ page.tsx           # arma la página: Hero → Catalog → About → Contact
      └─ components/
         ├─ SiteHeader.tsx        # encabezado pegajoso + nav ("use client")
         ├─ Hero.tsx              # portada
         ├─ Catalog.tsx          # ⭐ núcleo: datos, búsqueda, filtros, grid, modal ("use client")
         ├─ ArrangementCard.tsx  # tarjeta de la cuadrícula ("use client")
         ├─ ArrangementModal.tsx # detalle + CTA WhatsApp ("use client")
         ├─ Placeholder.tsx      # marcador de marca cuando no hay foto
         ├─ About.tsx            # sección Nosotros
         ├─ Contact.tsx          # dirección, horario, mapa, redes
         ├─ Footer.tsx           # pie de página
         ├─ FloatingWhatsApp.tsx # botón flotante
         └─ Reveal.tsx           # animación al hacer scroll ("use client")
```

⭐ = archivos que se editan con más frecuencia.

---

## 6. Modelo de datos

Definido en `sanity/schemaTypes/` y reflejado en `src/lib/types.ts`.

**Arrangement** (`arrangement`):

| Campo | Tipo | Notas |
|---|---|---|
| `name` | string | obligatorio |
| `slug` | slug | se genera desde `name` |
| `image` | image (hotspot) | foto; opcional (si falta → `Placeholder`) |
| `price` | number | en MXN |
| `priceLabel` | string | opcional, ej. "desde $245" (gana sobre `price`) |
| `category` | reference → category | |
| `shortDescription` | text | |
| `flowers` | string[] (tags) | flores incluidas; alimenta la búsqueda |
| `isFeatured` | boolean | aparece en "Destacados" |
| `isAvailable` | boolean | si es false, se oculta del sitio (la query lo filtra) |
| `order` | number | orden manual (asc) |

**Category** (`category`): `name`, `slug`, `description?`, `order`.

En el front, `data.ts` aplana la referencia a `category: {name, slug}` y
convierte `image` → `imageUrl` (string del CDN) vía `urlForImage()`.

---

## 7. Convenciones

- **Idioma:** todo el contenido visible y los comentarios del código están en
  **español**. Mantenerlo así.
- **Alias de import:** usar `@/...` (mapea a `src/`). Ej: `import { site } from "@/lib/config"`.
- **TypeScript estricto** (`strict: true`). `npx tsc --noEmit` debe pasar limpio.
- **Componentes cliente:** solo los que usan estado/efectos/`window` llevan
  `"use client"` (Catalog, Card, Modal, Header, Reveal). El resto son server
  components estáticos.
- **Sin `next/image`:** usar `<img>` + `urlForImage()`. (El optimizador no
  funciona en export estático.)
- **Accesibilidad:** respetar `prefers-reduced-motion` (ya manejado en
  `globals.css`); botones con `aria-label` cuando solo tienen icono.

### Identidad visual

- **Paleta** (en `tailwind.config.ts`):
  - `olive` `#3C4A2C` (dark `#2E3722`, soft `#5A6A41`) — texto/marca
  - `sage` `#94A07E` (light `#B4BD9F`, dark `#6E7B55`) — secundario
  - `cream` `#F6EFD8` (light `#FBF8F0`, deep `#EFE6C9`) — fondos
  - `kraft` `#D8C6A3` — neutro cálido
  - acentos: `peach` `#E6B391`, `craspedia` `#E2B24A`, `berry` `#C24E3C`
- **Fuentes** (en `layout.tsx`, vía `next/font/google`):
  - Display/títulos: **Fraunces** → `font-display`
  - Cuerpo/UI: **Hanken Grotesk** → `font-body`
- **Estilo:** editorial, cálido, tipo galería. Mucho espacio en crema, fotos
  grandes, títulos en serif, etiquetas en mayúsculas espaciadas (`.eyebrow`).
  Las flores aportan el color; la UI se mantiene en olivo + crema.

---

## 8. Variables de entorno

Archivo `.env.local` (no se sube a git). Plantilla en `.env.local.example`.

```
NEXT_PUBLIC_SANITY_PROJECT_ID=   # ID del proyecto Sanity (público; sin él → datos de ejemplo)
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=              # SOLO para `npm run seed`; borrar después
```

Las `NEXT_PUBLIC_*` se incrustan en el bundle del cliente (es seguro: son de
solo lectura del dataset público). El `SANITY_WRITE_TOKEN` es secreto.

---

## 9. Despliegue

**Sitio público (Cloudflare Pages):**
- Build command: `npm run build`
- Output directory: `out`
- Framework preset: Next.js (Static HTML Export)
- Variables: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`

**Panel (Sanity Studio):** `npm run studio:deploy` → `https://un-jardin-original.sanity.studio`.

> **Nota:** el `projectId` de Sanity está hardcodeado en `sanity.config.ts` (`donxsfze`)
> porque el Studio desplegado no tiene acceso a `.env.local`. Es seguro: es un ID público de solo lectura.

---

## 10. Tareas comunes

- **Cambiar nombre, WhatsApp, dirección, textos:** `src/lib/config.ts`.
- **Cambiar el mensaje de WhatsApp:** `whatsappTemplate` en `config.ts`
  (usa `{nombre}` y `{precio}`).
- **Cambiar colores:** `tailwind.config.ts` (sección `colors`).
- **Cambiar fuentes:** `src/app/layout.tsx`.
- **Agregar un campo nuevo a los arreglos** (ej. `medidas`): tocar **4 lugares**
  1. `sanity/schemaTypes/arrangement.ts` (el campo en el panel)
  2. `src/lib/data.ts` (agregarlo a la query GROQ)
  3. `src/lib/types.ts` (el tipo)
  4. `src/lib/sampleData.ts` + la UI donde se muestre (Card/Modal)
- **Agregar una sección a la página:** crear componente en `components/` e
  incluirlo en `src/app/page.tsx`.
- **Reemplazar el logo de texto por imagen:** `src/app/components/SiteHeader.tsx`
  (y `Footer.tsx`).

---

## 11. Cosas a tener en cuenta (gotchas)

- **`next/font` descarga las fuentes en tiempo de build** desde Google Fonts.
  El entorno de compilación necesita internet (Cloudflare lo tiene). Un build
  totalmente offline fallará al traer Fraunces / Hanken Grotesk; no es un bug
  del código.
- **Export estático = sin servidor.** No agregar API routes, Server Actions,
  middleware con datos, ni `cookies()/headers()`. Si algo necesita lógica de
  servidor, replantear (probablemente moverlo al cliente o a Sanity).
- **Slugs y deep links:** el modal lee/escribe `?arreglo=<slug>` con
  `history.replaceState`. Si cambian los slugs, los enlaces viejos dejan de
  abrir ese arreglo (degradan a la galería, sin romperse).
- **`isAvailable: false`** oculta el arreglo (la query lo filtra) sin borrarlo.
- **No commitear `.env.local`** (ya está en `.gitignore`).
- **El seed usa `createOrReplace`** con IDs fijos (`arr-<slug>`, `cat-<slug>`):
  volver a correrlo sobrescribe, no duplica.

---

## 12. Estado actual (mayo 2026)

- **Sanity conectado**: Project ID `donxsfze`, dataset `production`. Fotos y
  arreglos reales ya cargados desde el panel.
- **Sitio en producción**: `https://unjardin-pao.pages.dev` (Cloudflare Pages).
  La rama `main-unjardin` es la rama de producción; hacer push ahí dispara el deploy.
- **Studio publicado**: `https://un-jardin-original.sanity.studio`.
- **Grid del catálogo** (`Catalog.tsx`) usa `buildGridConfig()` que adapta columnas
  según cantidad de cards e `isMobile` (detectado en cliente con resize listener):
  - Pocas cards → grid regular que llena el espacio sin huecos
  - Muchas cards (>4 móvil / >8 desktop) → 2 filas + scroll horizontal
- **Hero** usa `bg-cream` para diferenciarse visualmente de la sección Destacados
  que usa `.paper` (`bg-cream-light`).
- `npx tsc --noEmit` y `npm run build` pasan sin errores.
