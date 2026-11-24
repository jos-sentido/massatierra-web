"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { MENU, type Seccion } from "./mapa";

/*
 * Menú del sitio.
 * - Sobre el hero es transparente; al bajar se vuelve una barra sólida con filo de cobre.
 * - Escritorio: cada sección con subpáginas abre un panel tipo hoja de plano, al pasar el
 *   cursor, con clic o con teclado. Un conductor de cobre marca la sección abierta.
 * - Celular: botón de menú que abre una hoja a pantalla completa con secciones desplegables.
 * - El botón principal «Solicitar diagnóstico» está siempre a la vista.
 *
 * `demo`: en la vitrina los enlaces no navegan (las páginas aún no existen).
 */

function Marca() {
  return (
    <span className="text-[22px] font-black italic leading-none tracking-tight text-white">
      Massatierra
      <sup className="ml-px align-super text-[9px] font-semibold not-italic">
        ®
      </sup>
    </span>
  );
}

function Nodo({ on }: { on?: boolean }) {
  return (
    <span
      aria-hidden
      className={`h-2.5 w-2.5 shrink-0 rounded-full border-2 transition-colors duration-200 ${
        on
          ? "border-orange bg-orange"
          : "border-[#d9955f]/70 group-hover:border-orange group-hover:bg-orange"
      }`}
    />
  );
}

export default function Encabezado({ demo = false }: { demo?: boolean }) {
  const [abierta, setAbierta] = useState<string | null>(null);
  const [solido, setSolido] = useState(false);
  const [movil, setMovil] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const panelId = useId();

  useEffect(() => {
    const alScroll = () => setSolido(window.scrollY > 24);
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    const alTecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAbierta(null);
        setMovil(false);
      }
    };
    window.addEventListener("keydown", alTecla);
    return () => {
      window.removeEventListener("scroll", alScroll);
      window.removeEventListener("keydown", alTecla);
    };
  }, []);

  // El menú de celular bloquea el scroll del fondo mientras está abierto.
  useEffect(() => {
    document.documentElement.style.overflow = movil ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [movil]);

  const ir = (e: React.MouseEvent) => {
    if (demo) e.preventDefault();
    setAbierta(null);
    setMovil(false);
  };

  const seccion = MENU.find((s) => s.titulo === abierta);
  const fondo = solido || abierta || movil;

  return (
    <header
      ref={ref}
      onMouseLeave={() => setAbierta(null)}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        fondo
          ? "border-b border-[#d9955f]/35 bg-[#050d1c]/95 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      {fondo && (
        <span
          aria-hidden
          className="energia-filo pointer-events-none absolute inset-x-0 -bottom-px h-px"
        />
      )}
      <div className="mx-auto flex h-[68px] max-w-7xl items-center gap-5 px-6">
        <Link
          href="/"
          onClick={ir}
          aria-label="Massatierra, inicio"
          className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
        >
          <Marca />
        </Link>

        {/* Escritorio */}
        <nav aria-label="Principal" className="hidden flex-1 lg:block">
          <ul className="flex items-center justify-center gap-1">
            {MENU.map((s) => {
              const on = abierta === s.titulo;
              const clase = `relative flex h-[68px] cursor-pointer items-center gap-1.5 px-3 text-[14px] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-orange ${
                on ? "text-white" : "text-white/75 hover:text-white"
              }`;
              // Conductor: marca la sección abierta
              const conductor = (
                <span
                  aria-hidden
                  className={`absolute inset-x-3 bottom-[-1px] h-[2px] origin-left bg-orange shadow-[0_0_10px_1px_rgba(242,107,29,.7)] transition-transform duration-300 motion-reduce:transition-none ${
                    on ? "scale-x-100" : "scale-x-0"
                  }`}
                >
                  {on && (
                    <span className="energia-h absolute inset-x-0 -top-[2px] h-[6px]" />
                  )}
                </span>
              );
              return (
                <li
                  key={s.titulo}
                  onMouseEnter={() => setAbierta(s.hijos ? s.titulo : null)}
                >
                  {s.hijos ? (
                    <button
                      type="button"
                      aria-expanded={on}
                      aria-controls={panelId}
                      onClick={() => setAbierta(on ? null : s.titulo)}
                      className={clase}
                    >
                      {s.titulo}
                      <svg
                        viewBox="0 0 10 10"
                        aria-hidden
                        className={`h-2.5 w-2.5 transition-transform duration-200 ${on ? "rotate-180 text-orange" : "text-white/45"}`}
                      >
                        <path
                          d="M1.5 3.5 L5 7 L8.5 3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {conductor}
                    </button>
                  ) : (
                    <a href={s.href} onClick={ir} className={clase}>
                      {s.titulo}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-4 lg:ml-0">
          <a
            href="/contacto/soporte"
            onClick={ir}
            className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-white/60 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange xl:block"
          >
            Soporte
          </a>
          <a
            href="/contacto"
            onClick={ir}
            className="hidden min-h-11 items-center whitespace-nowrap rounded-[10px] bg-orange px-4 text-[14px] font-bold text-[#1a0d05] transition-transform duration-200 hover:-translate-y-px active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:inline-flex"
          >
            Solicitar diagnóstico
          </a>
          {/* Celular */}
          <button
            type="button"
            aria-expanded={movil}
            aria-label={movil ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMovil((v) => !v)}
            className="grid h-11 w-11 cursor-pointer place-items-center border border-white/20 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange lg:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              {movil ? (
                <path d="M6 6 L18 18 M18 6 L6 18" />
              ) : (
                <path d="M4 8 H20 M4 16 H14" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Panel de sección (escritorio) */}
      <div
        id={panelId}
        hidden={!seccion}
        className="hidden border-t border-white/10 lg:block"
      >
        {seccion && <Panel seccion={seccion} ir={ir} />}
      </div>

      {/* Hoja de menú (celular) */}
      {movil && (
        <div className="h-[calc(100dvh-68px)] overflow-y-auto border-t border-white/10 bg-[#050d1c] lg:hidden">
          <nav aria-label="Principal" className="px-6 pb-8 pt-2">
            {MENU.map((s) =>
              s.hijos ? (
                <details
                  key={s.titulo}
                  className="group border-b border-white/10"
                >
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between text-lg font-semibold text-white [&::-webkit-details-marker]:hidden">
                    {s.titulo}
                    <svg
                      viewBox="0 0 10 10"
                      aria-hidden
                      className="h-3 w-3 text-[#d9955f] transition-transform duration-200 group-open:rotate-180"
                    >
                      <path
                        d="M1.5 3.5 L5 7 L8.5 3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </summary>
                  <ul className="relative mb-4 ml-1 border-l-2 border-[#b8733f]/60 pl-5">
                    {s.hijos.map((h) => (
                      <li key={h.titulo}>
                        <a
                          href={h.href}
                          onClick={ir}
                          className="flex min-h-11 items-center text-[15px] text-white/80"
                        >
                          {h.titulo}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <a
                  key={s.titulo}
                  href={s.href}
                  onClick={ir}
                  className="flex min-h-14 items-center border-b border-white/10 text-lg font-semibold text-white"
                >
                  {s.titulo}
                </a>
              ),
            )}
            <a
              href="/contacto"
              onClick={ir}
              className="mt-6 flex min-h-12 items-center justify-center rounded-[10px] bg-orange text-[15px] font-bold text-[#1a0d05]"
            >
              Solicitar diagnóstico
            </a>
            <a
              href="/contacto/soporte"
              onClick={ir}
              className="mt-3 flex min-h-12 items-center justify-center border border-white/25 font-mono text-xs uppercase tracking-[0.14em] text-white/80"
            >
              Soporte técnico
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Panel({
  seccion,
  ir,
}: {
  seccion: Seccion;
  ir: (e: React.MouseEvent) => void;
}) {
  const hijos = seccion.hijos ?? [];
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-[0.8fr_2fr] gap-10 px-6 py-8">
      <div className="border-r border-white/10 pr-8">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/45">
          Sección
        </p>
        <p className="mt-1 text-2xl font-bold tracking-tight text-white">
          {seccion.titulo}
        </p>
        {seccion.resumen && (
          <p className="mt-2 text-sm text-white/65">{seccion.resumen}</p>
        )}
        <a
          href={seccion.href}
          onClick={ir}
          className="mt-5 inline-flex min-h-11 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-orange underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
        >
          Ver {seccion.titulo.toLowerCase()} <span aria-hidden>→</span>
        </a>
      </div>
      {/* Derivaciones: cada subpágina sale de la barra de cobre */}
      <ul
        className={`relative grid content-start gap-x-8 ${hijos.length > 4 ? "grid-cols-3" : "grid-cols-2"}`}
      >
        {hijos.map((h) => (
          <li key={h.titulo} className="border-b border-white/10">
            <a
              href={h.href}
              onClick={ir}
              className="group relative flex min-h-[58px] items-center gap-3 py-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-px h-[2px] origin-left scale-x-0 bg-orange transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
              />
              <Nodo />
              <span>
                <span className="block text-[15px] font-medium text-white/90 transition-colors group-hover:text-white">
                  {h.titulo}
                </span>
                {h.nota && (
                  <span className="block text-[13px] text-white/50">
                    {h.nota}
                  </span>
                )}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
