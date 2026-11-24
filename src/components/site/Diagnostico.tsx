"use client";

import { useState } from "react";
import Solicitud from "@/components/site/Solicitud";
import SolicitudGuiada from "@/components/site/SolicitudGuiada";

/*
 * La solicitud de diagnóstico en dos formatos, con los mismos datos:
 * guiada (una pregunta a la vez, con ramificación) o formulario (todo a la vista).
 * El visitante elige; la guiada va primero porque pide menos a la vez.
 */
export default function Diagnostico() {
  const [modo, setModo] = useState<"guiada" | "formulario">("guiada");
  return (
    <div>
      <div
        role="radiogroup"
        aria-label="Formato de la solicitud"
        className="mb-3 inline-flex border border-white/12 bg-[#07101f] p-1"
      >
        {(
          [
            ["guiada", "Guiada"],
            ["formulario", "Formulario"],
          ] as const
        ).map(([valor, texto]) => (
          <button
            key={valor}
            type="button"
            role="radio"
            aria-checked={modo === valor}
            onClick={() => setModo(valor)}
            className={`min-h-9 cursor-pointer px-4 font-mono text-[10.5px] uppercase tracking-[0.16em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${
              modo === valor
                ? "bg-orange/15 text-white shadow-[inset_0_-2px_0_var(--orange)]"
                : "text-white/50 hover:text-white"
            }`}
          >
            {texto}
          </button>
        ))}
      </div>
      {modo === "guiada" ? <SolicitudGuiada /> : <Solicitud />}
    </div>
  );
}
