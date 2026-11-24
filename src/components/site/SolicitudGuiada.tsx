"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ElectricBorder from "@/components/ElectricBorder";
import { Ficha } from "@/components/site/Rotulo";
import {
  CAMPO,
  CAMPO_ON,
  Esquinas,
  NECESIDADES,
} from "@/components/site/Solicitud";
import {
  alternar,
  CANALES,
  CON_LEVANTAMIENTO as SI_LEVANTAMIENTO,
  ETAPAS,
  LEVANTAMIENTO,
  ORIENTACION,
  PLAZO,
  REVISO,
  SECTORES,
} from "@/components/site/solicitud-datos";

/*
 * Solicitud guiada: el mismo formulario de diagnóstico, una pregunta a la vez.
 *
 * No es un bot ni un chat libre: es un guion fijo de preguntas con opciones y
 * campos. Lo que gana frente al formulario es la ramificación: quien ya tiene un
 * levantamiento responde dos preguntas más (quién revisó y si hay plazo); quien
 * no, nunca las ve. Al final se muestra la hoja llenada para revisarla.
 *
 * Cada respuesta se puede cambiar; al hacerlo se descarta lo que venía después,
 * porque el camino puede ser otro. En la vitrina no envía nada.
 */

type Respuestas = Record<string, string>;

type Paso = {
  id: string;
  /** Rótulo corto para la hoja de resumen. */
  rotulo: string;
  pregunta: string;
  ayuda?: string;
  tipo: "opciones" | "varias" | "texto" | "datos" | "contacto";
  opciones?: string[];
  conIconos?: boolean;
  placeholder?: string;
  /** Solo se pregunta si se cumple. */
  cuando?: (r: Respuestas) => boolean;
};

const CON_LEVANTAMIENTO = (r: Respuestas) => r.levantamiento === SI_LEVANTAMIENTO;

const PASOS: Paso[] = [
  {
    id: "necesidad",
    rotulo: "Necesidad",
    pregunta: "¿Qué necesita proteger o resolver?",
    ayuda: "Puede elegir varias.",
    tipo: "varias",
    opciones: NECESIDADES.map((n) => n.titulo),
    conIconos: true,
  },
  {
    id: "levantamiento",
    rotulo: "Levantamiento",
    pregunta: "¿Ya le entregaron un levantamiento o dictamen de su instalación?",
    ayuda:
      "Es el documento que deja una revisión de cumplimiento, con las observaciones por corregir.",
    tipo: "opciones",
    opciones: LEVANTAMIENTO,
  },
  {
    id: "reviso",
    rotulo: "Lo revisó",
    pregunta: "¿Quién hizo la revisión?",
    tipo: "opciones",
    opciones: REVISO,
    cuando: CON_LEVANTAMIENTO,
  },
  {
    id: "plazo",
    rotulo: "Plazo",
    pregunta: "¿Le dieron un plazo para corregir las observaciones?",
    tipo: "opciones",
    opciones: PLAZO,
    cuando: CON_LEVANTAMIENTO,
  },
  {
    id: "sector",
    rotulo: "Instalación",
    pregunta: "¿Qué tipo de instalación es?",
    tipo: "opciones",
    opciones: SECTORES,
  },
  {
    id: "etapa",
    rotulo: "Etapa",
    pregunta: "¿En qué etapa está?",
    tipo: "opciones",
    opciones: ETAPAS,
  },
  {
    id: "ciudad",
    rotulo: "Ciudad",
    pregunta: "¿En qué ciudad está la instalación?",
    tipo: "texto",
    placeholder: "Ciudad y estado",
  },
  {
    id: "persona",
    rotulo: "Contacto",
    pregunta: "¿Con quién tenemos el gusto?",
    tipo: "datos",
  },
  {
    id: "telefono",
    rotulo: "Teléfono",
    pregunta: "¿A qué número le contactamos?",
    tipo: "contacto",
    opciones: CANALES,
  },
];

function Icono({ titulo }: { titulo: string }) {
  const n = NECESIDADES.find((x) => x.titulo === titulo);
  if (!n) return null;
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden
      className="h-6 w-6 shrink-0 text-[#8fa6c7] transition-colors group-hover:text-[#b9c8de]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {n.trazo}
    </svg>
  );
}

const ENTRADA =
  "block h-11 w-full border border-[#2b4063] bg-[#0f1e36] px-3 text-base text-white outline-none transition-colors placeholder:text-white/30 hover:border-[#41597f] focus:border-orange/70 focus:bg-[#142742]";

const BOTON =
  "min-h-11 cursor-pointer rounded-[10px] bg-orange px-5 text-[15px] font-bold text-[#1a0d05] transition-[transform,opacity] duration-200 hover:-translate-y-px active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export default function SolicitudGuiada() {
  const [resp, setResp] = useState<Respuestas>({});
  const [enviado, setEnviado] = useState(false);
  const hilo = useRef<HTMLDivElement>(null);
  const actual = useRef<HTMLDivElement>(null);

  /* El camino depende de lo respondido: se recalcula en cada respuesta. */
  const camino = useMemo(() => PASOS.filter((p) => !p.cuando || p.cuando(resp)), [resp]);
  const hechos = camino.filter((p) => resp[p.id] !== undefined);
  const pendiente = camino.find((p) => resp[p.id] === undefined);
  const total = camino.length;

  const montado = useRef(false);
  useEffect(() => {
    // Al cargar la página no se toca nada: solo cuando el visitante ya responde.
    if (!montado.current) {
      montado.current = true;
      return;
    }
    const h = hilo.current;
    if (h) h.scrollTo({ top: h.scrollHeight, behavior: "smooth" });
    // El foco va al primer control de la pregunta nueva, sin mover la página.
    const primero = actual.current?.querySelector<HTMLElement>("button, input");
    primero?.focus({ preventScroll: true });
  }, [hechos.length, enviado]);

  const responder = (id: string, valor: string) => setResp((r) => ({ ...r, [id]: valor }));

  /** Cambiar una respuesta descarta las posteriores: el camino puede ser otro. */
  const cambiar = (id: string) => {
    const i = PASOS.findIndex((p) => p.id === id);
    const quedan = PASOS.slice(0, i).map((p) => p.id);
    setResp((r) => Object.fromEntries(Object.entries(r).filter(([k]) => quedan.includes(k))));
  };

  const reiniciar = () => {
    setResp({});
    setEnviado(false);
  };

  return (
    <div className="relative border border-white/12 bg-[#07101f]">
      <Esquinas />

      {/* Cabecera: avance por el conductor */}
      <div className="border-b border-white/12 px-5 py-3">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/50">
              Massatierra · Solicitud guiada
            </p>
            <p className="mt-0.5 font-mono text-sm uppercase tracking-[0.14em] text-white">
              Diagnóstico
            </p>
          </div>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/45" aria-live="polite">
            {pendiente ? `Pregunta ${hechos.length + 1} de ${total}` : "Revise su solicitud"}
          </p>
        </div>
        <span aria-hidden className="relative mt-3 block h-[2px] w-full bg-[#b8733f]/30">
          <span
            className="absolute inset-y-0 left-0 bg-orange shadow-[0_0_10px_1px_rgba(242,107,29,.7)] transition-[width] duration-500 motion-reduce:transition-none"
            style={{ width: `${(pendiente ? hechos.length / total : 1) * 100}%` }}
          />
        </span>
      </div>

      {enviado ? (
        <div role="status" className="guiada-entra px-6 py-14 text-center">
          <svg viewBox="0 0 32 32" className="mx-auto h-10 w-10 text-orange" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M16 4 V14 M6 14 H26 M10 20 H22 M13.5 26 H18.5" />
          </svg>
          <p className="mt-5 text-lg font-semibold">Solicitud recibida</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-white/70">
            Esta hoja es una demostración: no se envió ningún dato.
          </p>
          <button
            type="button"
            onClick={reiniciar}
            className="mt-6 min-h-11 cursor-pointer border border-white/25 px-5 font-mono text-xs uppercase tracking-[0.14em] text-white/80 transition-colors hover:border-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          >
            Volver a empezar
          </button>
        </div>
      ) : (
        <div ref={hilo} className="max-h-[560px] overflow-y-auto overflow-x-hidden overscroll-contain px-5 py-5 [scrollbar-color:#2b4063_transparent] [scrollbar-width:thin]" aria-live="polite">
          {/* Lo ya respondido: pregunta tenue y respuesta registrada */}
          <ol className="space-y-4">
            {hechos.map((p) => (
              <li key={p.id} className="grid gap-2">
                <p className="text-sm text-white/50">{p.pregunta}</p>
                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => cambiar(p.id)}
                    className="cursor-pointer font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/40 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                    aria-label={`Cambiar la respuesta: ${p.pregunta}`}
                  >
                    Cambiar
                  </button>
                  <span className="border border-orange/60 bg-orange/[0.10] px-3.5 py-2 text-[15px] text-white">
                    {resp[p.id]}
                  </span>
                </div>
              </li>
            ))}
          </ol>

          {/* La pregunta en curso */}
          {pendiente ? (
            <div key={pendiente.id} ref={actual} className={`guiada-entra ${hechos.length ? "mt-6 border-t border-white/10 pt-5" : ""}`}>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#9fb3d1]">Massatierra</p>
              <p className="mt-1.5 text-lg font-semibold leading-snug text-white">{pendiente.pregunta}</p>
              {pendiente.ayuda && <p className="mt-1.5 text-sm text-white/60">{pendiente.ayuda}</p>}
              <div className="mt-4">
                <Entrada paso={pendiente} responder={responder} />
              </div>
            </div>
          ) : (
            <div ref={actual} className="guiada-entra mt-6 border-t border-white/10 pt-5">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#9fb3d1]">Su solicitud</p>
              <p className="mt-1.5 text-lg font-semibold text-white">Esto es lo que recibirá el especialista.</p>
              <div className="mt-4">
                <Ficha renglones={hechos.map((p) => [p.rotulo, resp[p.id]] as [string, string])} />
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 px-1 pb-3">
                <button
                  type="button"
                  onClick={reiniciar}
                  className="min-h-11 cursor-pointer font-mono text-xs uppercase tracking-[0.14em] text-white/65 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
                >
                  Empezar de nuevo
                </button>
                <ElectricBorder color="#f26b1d" glowColor="#f26b1d" borderRadius={12} thickness={2} speed={1} chaos={0.5}>
                  <button type="button" onClick={() => setEnviado(true)} className={`${BOTON} min-h-12 rounded-[12px] px-6`}>
                    Solicitar diagnóstico
                  </button>
                </ElectricBorder>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* Controles de la pregunta en curso, según su tipo. */
function Entrada({ paso, responder }: { paso: Paso; responder: (id: string, valor: string) => void }) {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [canal, setCanal] = useState("WhatsApp");
  const [elegidas, setElegidas] = useState<string[]>([]);

  if (paso.tipo === "varias") {
    return (
      <div className="grid gap-3">
        <div className="grid gap-2 sm:grid-cols-2">
          {paso.opciones!.map((o) => {
            const on = elegidas.includes(o);
            return (
              <button
                key={o}
                type="button"
                aria-pressed={on}
                onClick={() => setElegidas((l) => alternar(l, o))}
                className={`group flex min-h-12 cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-[15px] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${
                  on ? `${CAMPO_ON} text-white` : `${CAMPO} text-white/85 hover:text-white`
                } ${o === ORIENTACION ? "sm:col-span-2" : ""}`}
              >
                {paso.conIconos && <Icono titulo={o} />}
                <span>{o}</span>
                <span
                  aria-hidden
                  className={`ml-auto h-3.5 w-3.5 shrink-0 rounded-[3px] border-2 transition-all duration-200 ${
                    on
                      ? "border-orange bg-orange shadow-[0_0_10px_2px_rgba(242,107,29,.7)]"
                      : "border-[#6c84a8]"
                  }`}
                />
              </button>
            );
          })}
        </div>
        <div className="flex items-center justify-end gap-3">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/45">
            {elegidas.length ? `${elegidas.length} elegida${elegidas.length > 1 ? "s" : ""}` : "Elija al menos una"}
          </span>
          <button type="button" disabled={!elegidas.length} onClick={() => responder(paso.id, elegidas.join(" + "))} className={BOTON}>
            Continuar
          </button>
        </div>
      </div>
    );
  }

  if (paso.tipo === "opciones") {
    const anchas = (paso.opciones?.length ?? 0) > 3;
    return (
      <div className={`grid gap-2 ${anchas ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
        {paso.opciones!.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => responder(paso.id, o)}
            className={`group flex min-h-12 cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-[15px] text-white/85 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${CAMPO}`}
          >
            {paso.conIconos && <Icono titulo={o} />}
            {o}
          </button>
        ))}
      </div>
    );
  }

  if (paso.tipo === "texto") {
    const ok = a.trim().length >= 2;
    return (
      <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); if (ok) responder(paso.id, a.trim()); }}>
        <input aria-label={paso.pregunta} value={a} onChange={(e) => setA(e.target.value)} placeholder={paso.placeholder} className={ENTRADA} />
        <button type="submit" disabled={!ok} className={BOTON}>Siguiente</button>
      </form>
    );
  }

  if (paso.tipo === "datos") {
    const ok = a.trim().length >= 2;
    return (
      <form className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]" onSubmit={(e) => { e.preventDefault(); if (ok) responder(paso.id, b.trim() ? `${a.trim()} · ${b.trim()}` : a.trim()); }}>
        <input aria-label="Nombre" autoComplete="name" value={a} onChange={(e) => setA(e.target.value)} placeholder="Nombre" className={ENTRADA} />
        <input aria-label="Empresa (opcional)" autoComplete="organization" value={b} onChange={(e) => setB(e.target.value)} placeholder="Empresa (opcional)" className={ENTRADA} />
        <button type="submit" disabled={!ok} className={BOTON}>Siguiente</button>
      </form>
    );
  }

  // contacto: número y por dónde prefiere que le busquen
  const digitos = a.replace(/\D/g, "").length;
  const ok = digitos >= 10;
  return (
    <form className="grid gap-3" onSubmit={(e) => { e.preventDefault(); if (ok) responder(paso.id, `${a.trim()} · por ${canal}`); }}>
      <div className="flex gap-2">
        <input aria-label="Teléfono" type="tel" autoComplete="tel" inputMode="tel" value={a} onChange={(e) => setA(e.target.value)} placeholder="10 dígitos" className={ENTRADA} />
        <button type="submit" disabled={!ok} className={BOTON}>Listo</button>
      </div>
      <div className="flex flex-wrap items-center gap-2" role="radiogroup" aria-label="Prefiere que le contactemos por">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/50">Prefiere</span>
        {paso.opciones!.map((o) => (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={canal === o}
            onClick={() => setCanal(o)}
            className={`min-h-10 cursor-pointer px-4 text-sm text-white/85 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${canal === o ? CAMPO_ON : CAMPO}`}
          >
            {o}
          </button>
        ))}
      </div>
      <p className="text-xs text-white/45">Al continuar acepta el Aviso de privacidad.</p>
    </form>
  );
}
