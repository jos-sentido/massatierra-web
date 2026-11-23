"use client";

import { useState } from "react";

export type Sector = {
  titulo: string;
  texto: string;
  /** Áreas de aplicación, tal como las describe el material del cliente. */
  areas: string[];
  imagen: string;
  alt: string;
};

/**
 * Sectores como una sola instalación conectada a tierra.
 * Cada panel es una instalación protegida; el activo se abre y su «bajante» de cobre
 * se enciende hasta la barra de tierra común que corre por debajo de todos.
 * Escritorio: paneles horizontales que se abren al pasar el cursor o con el teclado.
 * Celular: lista vertical que se abre al tocar.
 */
export default function Sectores({ sectores }: { sectores: Sector[] }) {
  const [activo, setActivo] = useState(0);

  return (
    <div>
      <div className="flex flex-col gap-2 md:h-[520px] md:flex-row md:gap-3">
        {sectores.map((s, i) => {
          const abierto = i === activo;
          return (
            <button
              key={s.titulo}
              type="button"
              aria-expanded={abierto}
              onMouseEnter={() => setActivo(i)}
              onFocus={() => setActivo(i)}
              onClick={() => setActivo(i)}
              className={`group relative isolate min-w-0 cursor-pointer overflow-hidden rounded-2xl border text-left outline-none transition-[flex-grow,height,border-color] duration-500 ease-[cubic-bezier(.3,.7,.2,1)] focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#050d1c] motion-reduce:transition-none md:h-full md:basis-0 ${
                abierto
                  ? "h-[380px] border-orange/70 md:grow-[5]"
                  : "h-[68px] border-white/10 md:grow"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.imagen}
                alt={s.alt}
                loading="lazy"
                className={`absolute inset-0 -z-20 h-full w-full object-cover transition-[filter,transform] duration-700 motion-reduce:transition-none ${
                  abierto
                    ? "scale-100 saturate-100"
                    : "scale-105 brightness-[0.55] saturate-[0.35]"
                }`}
              />
              <div
                className={`absolute inset-0 -z-10 transition-opacity duration-500 ${
                  abierto
                    ? "bg-gradient-to-t from-[#050d1c] via-[#050d1c]/55 to-transparent"
                    : "bg-[#050d1c]/45"
                }`}
              />

              {/* Número y título cuando está cerrado (vertical en escritorio) */}
              <div
                className={`absolute inset-0 flex items-center gap-4 px-5 transition-opacity duration-300 md:flex-col md:items-center md:justify-center md:px-0 md:py-6 ${
                  abierto ? "pointer-events-none opacity-0" : "opacity-100"
                }`}
              >
                <span className="text-sm font-semibold text-white/90 md:rotate-180 md:whitespace-nowrap md:[writing-mode:vertical-rl]">
                  {s.titulo}
                </span>
                <span
                  aria-hidden
                  className="absolute bottom-6 hidden h-2 w-2 rounded-full bg-white/30 md:block"
                />
              </div>

              {/* Contenido cuando está abierto */}
              <div
                className={`absolute inset-x-0 bottom-0 p-6 transition-[opacity,transform] duration-500 motion-reduce:transition-none md:p-8 ${
                  abierto
                    ? "translate-y-0 opacity-100 delay-150"
                    : "pointer-events-none translate-y-3 opacity-0"
                }`}
              >
                <h3 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
                  {s.titulo}
                </h3>
                <p className="mt-2 max-w-md text-sm text-white/80 md:text-base">
                  {s.texto}
                </p>
                <ul className="mt-4 flex max-w-xl flex-wrap gap-2">
                  {s.areas.map((a) => (
                    <li
                      key={a}
                      className="rounded-full border border-white/20 bg-[#050d1c]/60 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-white/80"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bajante: el cobre que conecta esta instalación con la barra de tierra */}
              <span
                aria-hidden
                className={`absolute bottom-0 left-1/2 hidden w-[3px] -translate-x-1/2 rounded-t-full bg-gradient-to-b from-transparent to-orange transition-[height,opacity] duration-500 md:block ${
                  abierto
                    ? "h-10 opacity-100 shadow-[0_0_12px_2px_rgba(242,107,29,.7)]"
                    : "h-4 opacity-40"
                }`}
              >
                {abierto && (
                  <span className="energia-v absolute inset-y-0 -left-[1.5px] w-[6px]" />
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Barra de tierra común (solo escritorio): un pulso viaja hasta el sector activo */}
      <div aria-hidden className="relative mt-3 hidden h-[150px] md:block">
        <div className="absolute inset-x-0 top-0 h-[2px] rounded-full bg-[#b8733f]/55" />
        <div
          className="absolute top-0 h-[2px] overflow-visible rounded-full bg-orange shadow-[0_0_14px_3px_rgba(242,107,29,.75)] transition-[left,width] duration-500 ease-[cubic-bezier(.3,.7,.2,1)] motion-reduce:transition-none"
          style={barra(activo, sectores.length)}
        >
          <span
            className={`energia-h absolute inset-x-0 -top-[2px] h-[6px] ${haciaIzquierda(activo, sectores.length) ? "energia-inv" : ""}`}
          />
        </div>
        {/* Electrodo: mismo trazo que el del hero. Los anillos pulsan al cambiar de sector. */}
        <svg
          viewBox="0 0 520 150"
          className="absolute left-1/2 top-0 h-[150px] w-[520px] -translate-x-1/2 overflow-visible"
          fill="none"
        >
          {/* Disipación en reposo */}
          <g stroke="#d9955f" strokeWidth="1" opacity="0.28">
            <ellipse cx="260" cy="112" rx="60" ry="14" />
            <ellipse cx="260" cy="112" rx="125" ry="26" />
            <ellipse cx="260" cy="112" rx="195" ry="36" />
            <ellipse cx="260" cy="112" rx="258" ry="44" />
          </g>
          {/* Disipación activa */}
          <g
            key={activo}
            stroke="#ff9a4d"
            strokeWidth="1.5"
            className="sectores-pulso"
          >
            <ellipse cx="260" cy="112" rx="258" ry="44" />
            <ellipse cx="260" cy="112" rx="258" ry="44" />
            <ellipse cx="260" cy="112" rx="258" ry="44" />
          </g>
          {/* Conexión a la barra */}
          <path d="M260 0 V30" stroke="#d9955f" strokeWidth="1.6" />
          <path
            d="M254 12 H266 M254 22 H266"
            stroke="#d9955f"
            strokeWidth="1.1"
            opacity="0.8"
          />
          {/* Cabeza */}
          <rect x="251" y="30" width="18" height="17" rx="2" fill="#2a6fd6" />
          <path
            d="M251 36 H269"
            stroke="#0b1f3a"
            strokeWidth="1"
            opacity="0.5"
          />
          {/* Patas y cono de cobre */}
          <path
            d="M238 47 H282 M240 47 L257 104 M280 47 L263 104 M260 47 V104"
            stroke="#d9955f"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path d="M252 104 H268 L260 124 Z" fill="#d9955f" />
        </svg>
      </div>
    </div>
  );
}

/** El sector activo queda a la derecha del electrodo: la energía viaja hacia la izquierda. */
function haciaIzquierda(activo: number, n: number) {
  return ((activo + 2.5) / (n - 1 + 5)) * 100 > 50;
}

/** Tramo encendido de la barra: del centro (tierra) al centro del panel activo. */
function barra(activo: number, n: number): React.CSSProperties {
  // Anchos relativos: el activo crece 5, los demás 1 (igual que flex-grow).
  const total = n - 1 + 5;
  const inicio = activo; // paneles previos, de ancho 1
  const centro = ((inicio + 2.5) / total) * 100;
  const a = Math.min(centro, 50);
  const b = Math.max(centro, 50);
  return { left: `${a}%`, width: `${Math.max(b - a, 0.6)}%` };
}
