import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
/*
 * Rótulo de sección y ficha técnica, en lenguaje de plano.
 *
 * Rotulo: en vez de «02 · TECNOLOGÍA», cada sección lleva el símbolo de diagrama
 * eléctrico que le corresponde, dentro de un marco con esquinas de registro, y una
 * línea de cota que remata el nombre.
 *
 * Ficha: en vez de una lista con rayitas, renglones de ficha técnica (propiedad ·····
 * valor) derivados de una barra de cobre, como las derivaciones de una barra de tierra.
 */

export type Simbolo =
  "descarga" | "bobina" | "resistencia" | "barra" | "tierra";

const TRAZOS: Record<Simbolo, React.ReactNode> = {
  // Descarga atmosférica: rayo que termina en tierra
  descarga: <path d="M17 4 L10 15 H16 L11 23 M7 26 H15 M9 29 H13" />,
  // Bobina: el electrodo magneto activo
  bobina: (
    <path d="M3 18 H7 A3.2 4.5 0 0 1 13.4 18 A3.2 4.5 0 0 1 19.8 18 A3.2 4.5 0 0 1 26.2 18 H29 M7 23 H26" />
  ),
  // Resistencia: lo que se mide
  resistencia: <path d="M2 16 H7 L9 10 L13 22 L17 10 L21 22 L23 16 H30" />,
  // Barra con derivaciones: muchas instalaciones, una tierra
  barra: (
    <>
      <path d="M4 10 H28 M9 10 V22 M16 10 V22 M23 10 V22" />
      <circle cx="9" cy="24" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="16" cy="24" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="23" cy="24" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  // Puesta a tierra
  tierra: <path d="M16 4 V14 M6 14 H26 M10 20 H22 M13.5 26 H18.5" />,
};

export function Rotulo({
  simbolo,
  children,
}: {
  simbolo: Simbolo;
  children: React.ReactNode;
}) {
  return (
    <p className="flex items-center gap-3 text-white/70">
      <span
        aria-hidden
        className="relative grid h-9 w-9 shrink-0 place-items-center text-orange"
      >
        {/* Esquinas de registro */}
        <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-[#d9955f]/70" />
        <span className="absolute right-0 top-0 h-2 w-2 border-r border-t border-[#d9955f]/70" />
        <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#d9955f]/70" />
        <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-[#d9955f]/70" />
        <svg
          viewBox="0 0 32 32"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {TRAZOS[simbolo]}
        </svg>
      </span>
      <span className="font-mono text-xs uppercase tracking-[0.18em]">
        {children}
      </span>
      {/* Línea de cota que remata el rótulo */}
      <span aria-hidden className="relative h-px w-16 bg-[#d9955f]/50 sm:w-24">
        <span className="absolute -top-[3px] right-0 h-[7px] w-px bg-[#d9955f]/70" />
        <span className="absolute -top-[3px] left-0 h-[7px] w-px rotate-45 bg-[#d9955f]/70" />
      </span>
    </p>
  );
}

export function Ficha({
  renglones,
}: {
  /** El tercer elemento, opcional, es un ícono: va dentro del nodo de la barra. */
  renglones: [propiedad: string, valor: string, icono?: IconSvgElement][];
}) {
  const conIconos = renglones.some((r) => r[2]);
  return (
    <dl className={`relative ${conIconos ? "pl-12" : "pl-7"}`}>
      {/* Barra de cobre de la que deriva cada renglón */}
      <span
        aria-hidden
        className={`absolute bottom-3 top-3 w-[2px] rounded-full bg-[#b8733f]/70 ${
          conIconos ? "left-[13px]" : "left-[5px]"
        }`}
      />
      {renglones.map(([propiedad, valor, icono]) => (
        <div
          key={propiedad}
          className="relative flex items-baseline gap-3 py-2.5"
        >
          <span
            aria-hidden
            className={`absolute top-1/2 flex -translate-y-1/2 items-center ${
              conIconos ? "-left-12" : "-left-7"
            }`}
          >
            {conIconos ? (
              <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#d9955f] bg-[#050d1c] text-[#e0a06a]">
                {icono && (
                  <HugeiconsIcon icon={icono} size={14} strokeWidth={1.8} />
                )}
              </span>
            ) : (
              <span className="h-3 w-3 rounded-full border-2 border-[#d9955f] bg-[#050d1c]" />
            )}
            <span className="h-px w-3 bg-[#d9955f]/70" />
          </span>
          <dt className="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">
            {propiedad}
          </dt>
          <span
            aria-hidden
            className="h-px min-w-6 flex-1 translate-y-[-3px] border-b border-dotted border-white/25"
          />
          <dd className="text-right text-[15px] font-medium text-white">
            {valor}
          </dd>
        </div>
      ))}
    </dl>
  );
}
