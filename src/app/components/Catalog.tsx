"use client";

import { useEffect, useRef, useMemo, useState, useCallback } from "react";
import type { Arrangement, Category } from "@/lib/types";
import { getArrangements, getCategories } from "@/lib/data";
import ArrangementCard from "./ArrangementCard";
import ArrangementModal from "./ArrangementModal";
import GSAPScrollTitle from "./GSAPScrollTitle";


export default function Catalog() {
  const [arrangements, setArrangements] = useState<Arrangement[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("todos");
  const [selected, setSelected] = useState<Arrangement | null>(null);

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
        <section id="destacados" className="bg-cream-light py-20 sm:py-28">
          <div className="mx-auto max-w-6xl sm:px-8">

            {/* ── MOBILE ── título + scroll horizontal 2 filas con peek */}
            <div className="sm:hidden">
              <div className="px-5">
                <p className="dash-label text-olive">— Selección de la casa</p>
                <h2 className="mt-4 font-display text-5xl text-olive">Destacados</h2>
              </div>
              <div className="mt-8 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div
                  className="grid grid-rows-2 grid-flow-col gap-4 pl-5 pr-10"
                  style={{ gridAutoColumns: "calc(50vw - 28px)" }}
                >
                  {featured.map((a, idx) => (
                    <div key={a._id} className="snap-start">
                      <ArrangementCard arrangement={a} onOpen={openArrangement} index={idx} showFeaturedBadge={false} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── DESKTOP ── título vertical sticky + grid con scroll */}
            <div className="hidden sm:flex sm:items-start sm:gap-10">
              <div className="flex shrink-0 w-12 justify-center sticky top-24 self-start pt-2">
                <h2
                  className="font-display text-[2.8rem] text-olive"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.05em" }}
                >
                  Destacados
                </h2>
              </div>
              <div className="flex-1 min-w-0">
                <ScrollableGrid colWidth="calc(25% - 12px)" bgFrom="#FDF6EC">
                  {featured.map((a, idx) => (
                    <div key={a._id} className="snap-start">
                      <ArrangementCard arrangement={a} onOpen={openArrangement} index={idx} showFeaturedBadge={false} />
                    </div>
                  ))}
                </ScrollableGrid>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* Catálogo completo + búsqueda + filtros */}
      <section id="catalogo" className="bg-cream px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
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
            ) : (
              <>
                {/* Mobile — 2 filas, scroll horizontal con peek */}
                <div className="sm:hidden -mx-5 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <div
                    className="grid grid-rows-2 grid-flow-col gap-4 pl-5 pr-10"
                    style={{ gridAutoColumns: "calc(50vw - 28px)" }}
                  >
                    {filtered.map((a, idx) => (
                      <div key={a._id} className="snap-start">
                        <ArrangementCard arrangement={a} onOpen={openArrangement} index={idx} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop — 2 filas con scroll horizontal si excede */}
                <div className="hidden sm:block">
                  <ScrollableGrid colWidth="calc(25% - 12px)" bgFrom="#F9EDD3">
                    {filtered.map((a, idx) => (
                      <div key={a._id} className="snap-start">
                        <ArrangementCard arrangement={a} onOpen={openArrangement} index={idx} />
                      </div>
                    ))}
                  </ScrollableGrid>
                </div>
              </>
            )}
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

function ScrollableGrid({
  children,
  colWidth,
  bgFrom,
}: {
  children: React.ReactNode;
  colWidth: string;
  bgFrom: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const check = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollRight(el.scrollWidth - el.scrollLeft - el.clientWidth > 8);
  }, []);

  useEffect(() => {
    check();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      el.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [check, children]);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div
          className="grid grid-rows-2 grid-flow-col gap-4"
          style={{ gridAutoColumns: colWidth }}
        >
          {children}
        </div>
      </div>

      {/* Indicador de scroll derecho */}
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 w-28 transition-opacity duration-300 ${canScrollRight ? "opacity-100" : "opacity-0"}`}
        style={{ background: `linear-gradient(to left, ${bgFrom} 30%, transparent)` }}
      />
      <button
        onClick={() => scrollRef.current?.scrollBy({ left: scrollRef.current.clientWidth * 0.75, behavior: "smooth" })}
        className={`absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-cream-light shadow-md text-olive transition-all duration-300 hover:bg-olive hover:text-cream-light ${canScrollRight ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-label="Ver más"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
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
