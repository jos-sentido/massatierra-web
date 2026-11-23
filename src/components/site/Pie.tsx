"use client";

import { CONTACTO, MENU } from "./mapa";

/*
 * Pie de página: el «subsuelo» del sitio.
 * Arriba corre la línea de terreno con su achurado; debajo, los estratos en línea fina.
 * Contenido: marca, navegación completa, contacto y la franja legal, rematada como el
 * cuadro de datos de un plano.
 *
 * La razón social no se muestra hasta que el cliente la confirme (decisiones.md §2).
 */

const COLUMNAS = ["Soluciones", "Cumplimiento", "Tecnología", "Recursos"];

export default function Pie({ demo = false }: { demo?: boolean }) {
  const ir = (e: React.MouseEvent) => {
    if (demo) e.preventDefault();
  };
  const enlace =
    "inline-flex min-h-9 items-center text-[14px] text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange";
  const sueltos = MENU.filter((s) => !COLUMNAS.includes(s.titulo));

  return (
    <footer className="relative isolate overflow-hidden bg-[#040910] text-white">
      {/* Línea de terreno y estratos */}
      <svg
        aria-hidden
        viewBox="0 0 1600 420"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full w-full"
      >
        <g
          fill="none"
          stroke="#8fa6c7"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity="0.1"
        >
          <path
            vectorEffect="non-scaling-stroke"
            d="M0 90 C240 70 420 112 700 92 S1180 74 1600 98"
          />
          <path
            vectorEffect="non-scaling-stroke"
            d="M0 170 C300 148 520 192 820 170 S1300 150 1600 178"
          />
          <path
            vectorEffect="non-scaling-stroke"
            d="M0 250 C260 232 560 270 880 248 S1340 228 1600 258"
          />
          <path
            vectorEffect="non-scaling-stroke"
            d="M0 330 C340 312 600 350 940 328 S1380 308 1600 338"
          />
        </g>
      </svg>
      <div aria-hidden className="relative h-5 border-t border-[#c9d6e8]/45">
        <svg
          viewBox="0 0 1600 20"
          preserveAspectRatio="xMidYMin slice"
          className="absolute inset-0 h-full w-full"
        >
          <path
            d={[60, 300, 540, 780, 1020, 1260, 1500]
              .map(
                (x) =>
                  `M${x} 0 l-10 12 M${x + 7} 0 l-10 12 M${x + 14} 0 l-10 12 M${x - 8} 14 h20`,
              )
              .join(" ")}
            fill="none"
            stroke="#8fa6c7"
            strokeWidth="1"
            opacity="0.45"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-10 pt-14">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          {/* Marca y contacto */}
          <div>
            <p className="text-3xl font-black italic leading-none tracking-tight">
              Massatierra
              <sup className="ml-px align-super text-[11px] font-semibold not-italic">
                ®
              </sup>
            </p>
            <p className="mt-2 text-white/60">
              Tecnología para su tranquilidad
            </p>

            <dl className="relative mt-8 space-y-4 border-l-2 border-[#b8733f]/60 pl-5 text-[14px]">
              <div>
                <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/45">
                  Conmutador
                </dt>
                <dd>
                  <a
                    href={`tel:${CONTACTO.conmutador.replace(/\s/g, "")}`}
                    className={enlace}
                  >
                    {CONTACTO.conmutador}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/45">
                  WhatsApp
                </dt>
                <dd>
                  <a
                    href={`https://wa.me/${CONTACTO.whatsapp.replace(/\D/g, "")}`}
                    onClick={ir}
                    className={enlace}
                  >
                    {CONTACTO.whatsapp}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/45">
                  Correo
                </dt>
                {CONTACTO.correos.map((c) => (
                  <dd key={c}>
                    <a href={`mailto:${c}`} className={enlace}>
                      {c}
                    </a>
                  </dd>
                ))}
              </div>
              <div>
                <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/45">
                  Oficina matriz
                </dt>
                <dd className="pt-1 text-white/70">
                  {CONTACTO.direccion.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                  <span className="mt-1 block text-white/50">
                    {CONTACTO.horario}
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          {/* Navegación completa */}
          <nav
            aria-label="Mapa del sitio"
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4"
          >
            {COLUMNAS.map((nombre) => {
              const s = MENU.find((m) => m.titulo === nombre)!;
              return (
                <div key={nombre}>
                  <a
                    href={s.href}
                    onClick={ir}
                    className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#d9955f] hover:text-orange"
                  >
                    {s.titulo}
                  </a>
                  <ul className="mt-3">
                    {s.hijos?.map((h) => (
                      <li key={h.titulo}>
                        <a href={h.href} onClick={ir} className={enlace}>
                          {h.titulo}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            <div className="col-span-2 sm:col-span-4">
              <ul className="flex flex-wrap gap-x-8 gap-y-1 border-t border-white/10 pt-5">
                {sueltos.map((s) => (
                  <li key={s.titulo}>
                    <a
                      href={s.href}
                      onClick={ir}
                      className={`${enlace} font-medium text-white/85`}
                    >
                      {s.titulo}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="/contacto"
                    onClick={ir}
                    className={`${enlace} font-medium text-white/85`}
                  >
                    Contacto
                  </a>
                </li>
                <li>
                  <a
                    href="/contacto/soporte"
                    onClick={ir}
                    className={`${enlace} font-medium text-white/85`}
                  >
                    Soporte técnico
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Franja legal: cuadro de datos del plano */}
        <div className="mt-14 grid border border-white/12 font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/55 sm:grid-cols-[1fr_auto_auto_auto]">
          <p className="border-b border-white/12 px-4 py-3 sm:border-b-0 sm:border-r">
            © 2026 Massatierra
          </p>
          <p className="border-b border-white/12 px-4 py-3 sm:border-b-0 sm:border-r">
            Oficinas · {CONTACTO.oficinas.join(" · ")}
          </p>
          <a
            href="/aviso-de-privacidad"
            onClick={ir}
            className="border-b border-white/12 px-4 py-3 transition-colors hover:text-white sm:border-b-0 sm:border-r"
          >
            Aviso de privacidad
          </a>
          <a
            href="/terminos-de-garantia"
            onClick={ir}
            className="px-4 py-3 transition-colors hover:text-white"
          >
            Términos de garantía
          </a>
        </div>
      </div>
    </footer>
  );
}
