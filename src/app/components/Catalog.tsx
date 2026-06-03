"use client";

import { useEffect, useMemo, useState } from "react";
import type { Arrangement, Category } from "@/lib/types";
import { getArrangements, getCategories } from "@/lib/data";
import ArrangementCard from "./ArrangementCard";
import ArrangementModal from "./ArrangementModal";
import GSAPScrollTitle from "./GSAPScrollTitle";

type GridConfig = {
  className: string;
  style: React.CSSProperties;
  itemClass: string;
};

function buildGridConfig(count: number, isMobile: boolean): GridConfig {
  const maxCols = isMobile ? 2 : 4;
  const maxVisible = maxCols * 2; // 2 filas máximo antes de scroll
  const GAP = 1.25; // gap-5 en rem

  if (count > maxVisible) {
    // Scroll horizontal: columnas fijas de tamaño exacto
    const autoColWidth = `calc(${100 / maxCols}% - ${(GAP * (maxCols - 1)) / maxCols}rem)`;
    return {
      className:
        "grid grid-rows-2 grid-flow-col gap-5 overflow-x-auto pb-4 snap-x snap-mandatory [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
      style: { gridAutoColumns: autoColWidth },
      itemClass: "snap-start",
    };
  }

  // Sin scroll: columnas calculadas para llenar el espacio sin huecos grandes
  let cols: number;
  if (count <= maxCols) {
    cols = count; // fila única, tantas columnas como items
  } else {
    cols = Math.ceil(count / 2); // distribuye en 2 filas
  }

  return {
    className: "grid gap-5",
    style: { gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` },
    itemClass: "",
  };
}

export default function Catalog() {
  const [arrangements, setArrangements] = useState<Arrangement[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("todos");
  const [selected, setSelected] = useState<Arrangement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    let active = true;
    Promise.all([getArrangements(), getCategories()]).then(([arr, cats]) => {
      if (!active) return;
      setArrangements(arr);
      setCategories(cats);
      setLoading(false);
      // Abrir un arreglo si la URL trae ?arreglo=...
      const params = new URLSearchParams(window.location.search);
      const slug = params.get("arreglo");
      if (slug) {
        const found = arr.find((a) => a.slug === slug);
        if (found) setSelected(found);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const featured = useMemo(
    () => arrangements.filter((a) => a.isFeatured),
    [arrangements]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return arrangements.filter((a) => {
      const matchesCat =
        activeCat === "todos" || a.category?.slug === activeCat;
      if (!matchesCat) return false;
      if (!q) return true;
      const haystack = [
        a.name,
        a.category?.name ?? "",
        a.shortDescription ?? "",
        ...(a.flowers ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [arrangements, query, activeCat]);

  const isBrowsing = query.trim() !== "" || activeCat !== "todos";

  function openArrangement(a: Arrangement) {
    setSelected(a);
    const url = new URL(window.location.href);
    url.searchParams.set("arreglo", a.slug);
    window.history.replaceState({}, "", url);
  }

  function closeModal() {
    setSelected(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("arreglo");
    window.history.replaceState({}, "", url);
  }

  return (
    <>
      {/* Destacados */}
      {!loading && featured.length > 0 && (
        <section id="destacados" className="bg-cream-light px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <GSAPScrollTitle label="— Selección de la casa">
              Destacados
            </GSAPScrollTitle>
            <div className="mt-12 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {featured.map((a, idx) => (
                <div
                  key={a._id}
                  className="w-[calc(25%-0.9375rem)] min-w-[220px] shrink-0 snap-start"
                >
                  <ArrangementCard arrangement={a} onOpen={openArrangement} index={idx} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Catálogo completo + búsqueda + filtros */}
      <section id="catalogo" className="bg-cream px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <hr className="section-rule mb-20" />
          <GSAPScrollTitle label="— Nuestro catálogo">
            Todos los arreglos
          </GSAPScrollTitle>

          {/* Buscador */}
          <div className="mx-auto mt-10 max-w-md">
            <div className="relative">
              <svg
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sage"
                width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                id="buscar-arreglos"
                name="buscar-arreglos"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por flor, nombre o categoría…"
                aria-label="Buscar arreglos"
                className="w-full rounded-full border border-sage/40 bg-cream-light py-3.5 pl-11 pr-4 text-olive placeholder:text-olive/40 outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/30"
              />
            </div>
          </div>

          {/* Filtros por categoría */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            <FilterPill
              label="Todos"
              active={activeCat === "todos"}
              onClick={() => setActiveCat("todos")}
            />
            {categories.map((c) => (
              <FilterPill
                key={c._id}
                label={c.name}
                active={activeCat === c.slug}
                onClick={() => setActiveCat(c.slug)}
              />
            ))}
          </div>

          {/* Cuadrícula */}
          <div className="mt-12">
            {loading ? (
              <SkeletonGrid />
            ) : filtered.length === 0 ? (
              <p className="py-16 text-center text-olive/50">
                No encontramos arreglos con esa búsqueda. Intenta con otra palabra.
              </p>
            ) : (() => {
                const cfg = buildGridConfig(filtered.length, isMobile);
                return (
                  <div className={cfg.className} style={cfg.style}>
                    {filtered.map((a, idx) => (
                      <div key={a._id} className={cfg.itemClass}>
                        <ArrangementCard arrangement={a} onOpen={openArrangement} index={idx} />
                      </div>
                    ))}
                  </div>
                );
              })()}
          </div>
        </div>
      </section>

      <ArrangementModal arrangement={selected} onClose={closeModal} />
    </>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-olive text-cream-light scale-[1.03] shadow-sm shadow-olive/20"
          : "border border-sage/40 text-olive/70 hover:border-sage hover:text-olive hover:scale-[1.02]"
      }`}
    >
      {label}
    </button>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 80}ms` }}>
          <div className="aspect-[4/5] w-full rounded-xl2 bg-cream-deep" />
          <div className="mt-3.5 h-4 w-3/4 rounded-full bg-cream-deep" />
          <div className="mt-2 h-3 w-1/3 rounded-full bg-cream-deep" />
        </div>
      ))}
    </div>
  );
}
