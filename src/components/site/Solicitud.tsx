"use client";

import { useId, useState } from "react";
import ElectricBorder from "@/components/ElectricBorder";
import {
  alternar,
  CANALES,
  CON_LEVANTAMIENTO,
  ETAPAS,
  LEVANTAMIENTO,
  PLAZO,
  REVISO,
  SECTORES,
} from "@/components/site/solicitud-datos";

/*
 * Solicitud de diagnóstico, dibujada como una hoja de plano:
 * marco con esquinas de registro, cabecera tipo cuadro de datos, opciones con símbolo
 * eléctrico, la pregunta del levantamiento y casillas con rótulo.
 * Dos pasos unidos por un conductor: la corriente llega hasta el paso activo.
 *
 * En la vitrina no envía nada: muestra el recorrido y el acabado.
 */

export const NECESIDADES: { id: string; titulo: string; trazo: React.ReactNode }[] = [
  {
    id: "tierra",
    titulo: "Sistema de puesta a tierra",
    trazo: <path d="M16 4 V14 M6 14 H26 M10 20 H22 M13.5 26 H18.5" />,
  },
  {
    id: "pararrayos",
    titulo: "Sistema de pararrayos",
    trazo: <path d="M17 4 L10 15 H16 L11 23 M7 26 H15 M9 29 H13" />,
  },
  {
    id: "estudio",
    titulo: "Estudios y medición",
    trazo: <path d="M2 16 H7 L9 10 L13 22 L17 10 L21 22 L23 16 H30" />,
  },
  {
    id: "ingenieria",
    titulo: "Ingeniería e instalación",
    trazo: (
      <path d="M5 26 V8 H19 L27 16 V26 Z M19 8 V16 H27 M10 21 H22 M10 16 H14" />
    ),
  },
  {
    id: "orientacion",
    titulo: "Orientación para definir la solución",
    trazo: (
      <>
        <circle cx="16" cy="16" r="11" />
        <path d="M16 9 V16 L21 20" />
      </>
    ),
  },
];

/*
 * Superficie de campo: un azul más claro que la hoja y con borde propio, para que
 * todo lo que se llena o se elige se lea como campo de formulario. Al elegir o
 * escribir, el campo pasa a naranja (se «energiza»).
 */
export const CAMPO =
  "border border-[#2b4063] bg-[#0f1e36] hover:border-[#41597f] hover:bg-[#142742]";
export const CAMPO_ON = "border border-orange bg-orange/[0.10]";

export function Esquinas() {
  const c = "absolute h-3 w-3 border-[#d9955f]/80";
  return (
    <>
      <span aria-hidden className={`${c} -left-px -top-px border-l border-t`} />
      <span
        aria-hidden
        className={`${c} -right-px -top-px border-r border-t`}
      />
      <span
        aria-hidden
        className={`${c} -bottom-px -left-px border-b border-l`}
      />
      <span
        aria-hidden
        className={`${c} -bottom-px -right-px border-b border-r`}
      />
    </>
  );
}

function Casilla({
  rotulo,
  ancho = "",
  ...input
}: {
  rotulo: string;
  ancho?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <div
      className={`group relative ${CAMPO} px-4 pb-3 pt-2.5 transition-colors duration-200 focus-within:border-orange/70 focus-within:bg-[#142742] ${ancho}`}
    >
      <label
        htmlFor={id}
        className="block font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#9fb3d1]"
      >
        {rotulo}
      </label>
      <input
        id={id}
        {...input}
        className="mt-1 block h-8 w-full bg-transparent text-base text-white outline-none placeholder:text-white/30"
      />
      {/* La casilla se «energiza» al escribir */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left scale-x-0 bg-orange shadow-[0_0_10px_1px_rgba(242,107,29,.7)] transition-transform duration-300 group-focus-within:scale-x-100 motion-reduce:transition-none"
      />
    </div>
  );
}

/* Nodo del circuito: redondo si se elige una, cuadrado si se pueden elegir varias. */
function Nodo({ on, varias = false }: { on: boolean; varias?: boolean }) {
  return (
    <span
      aria-hidden
      className={`grid h-3.5 w-3.5 shrink-0 place-items-center border-2 transition-all duration-200 ${
        varias ? "rounded-[3px]" : "rounded-full"
      } ${
        on
          ? "border-orange bg-orange shadow-[0_0_10px_2px_rgba(242,107,29,.7)]"
          : "border-[#6c84a8]"
      }`}
    />
  );
}

/* Grupo de opciones de una sola respuesta, con la superficie de campo. */
function Opciones({
  nombre,
  pregunta,
  opciones,
  valor,
  cambiar,
  columnas = "sm:grid-cols-3",
}: {
  nombre: string;
  pregunta: string;
  opciones: string[];
  valor: string | null;
  cambiar: (v: string) => void;
  columnas?: string;
}) {
  return (
    <fieldset>
      <legend className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#9fb3d1]">
        {pregunta}
      </legend>
      <div className={`mt-2 grid gap-2 ${columnas}`}>
        {opciones.map((o) => {
          const on = valor === o;
          return (
            <label
              key={o}
              className={`flex min-h-11 cursor-pointer items-center gap-3 px-3.5 text-[15px] transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-orange ${
                on ? `${CAMPO_ON} text-white` : `${CAMPO} text-white/85`
              }`}
            >
              <input
                type="radio"
                name={nombre}
                className="sr-only"
                checked={on}
                onChange={() => cambiar(o)}
              />
              <Nodo on={on} />
              {o}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function Solicitud() {
  const [paso, setPaso] = useState<1 | 2>(1);
  const [necesidades, setNecesidades] = useState<string[]>([]);
  const [levantamiento, setLevantamiento] = useState<string | null>(null);
  const [reviso, setReviso] = useState<string | null>(null);
  const [plazo, setPlazo] = useState<string | null>(null);
  const [sector, setSector] = useState("");
  const [etapa, setEtapa] = useState<string | null>(null);
  const [canal, setCanal] = useState<string | null>("WhatsApp");
  const [enviado, setEnviado] = useState(false);
  const sectorId = useId();
  const conLevantamiento = levantamiento === CON_LEVANTAMIENTO;

  const elegirLevantamiento = (v: string) => {
    setLevantamiento(v);
    // Si deja de tener levantamiento, lo que se preguntó por él ya no aplica.
    if (v !== CON_LEVANTAMIENTO) {
      setReviso(null);
      setPlazo(null);
    }
  };

  return (
    <div className="relative border border-white/12 bg-[#07101f]">
      <Esquinas />

      {/* Cabecera: cuadro de datos */}
      <div className="grid grid-cols-[1fr_auto] border-b border-white/12">
        <div className="px-5 py-3">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/50">
            Massatierra · Hoja de solicitud
          </p>
          <p className="mt-0.5 font-mono text-sm uppercase tracking-[0.14em] text-white">
            Diagnóstico
          </p>
        </div>
        {/* Conductor entre pasos */}
        <ol
          className="flex items-center gap-0 border-l border-white/12 px-5"
          aria-label="Pasos"
        >
          {[1, 2].map((n) => {
            const activo = paso >= n;
            return (
              <li
                key={n}
                className="flex items-center"
                aria-current={paso === n ? "step" : undefined}
              >
                {n === 2 && (
                  <span
                    aria-hidden
                    className="relative mx-2 h-[2px] w-12 bg-[#b8733f]/40"
                  >
                    <span
                      className={`absolute inset-y-0 left-0 bg-orange shadow-[0_0_10px_1px_rgba(242,107,29,.7)] transition-[width] duration-500 motion-reduce:transition-none ${paso === 2 ? "w-full" : "w-0"}`}
                    />
                  </span>
                )}
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full border font-mono text-xs transition-colors duration-300 ${
                    activo
                      ? "border-orange bg-orange/15 text-white"
                      : "border-white/25 text-white/45"
                  }`}
                >
                  {n}
                </span>
                <span className="sr-only">
                  {n === 1 ? "Qué necesita" : "Su instalación y sus datos"}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {enviado ? (
        <div role="status" className="px-6 py-14 text-center">
          <svg
            viewBox="0 0 32 32"
            className="mx-auto h-10 w-10 text-orange"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <path d="M16 4 V14 M6 14 H26 M10 20 H22 M13.5 26 H18.5" />
          </svg>
          <p className="mt-5 text-lg font-semibold">Solicitud recibida</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-white/70">
            Esta hoja es una demostración: no se envió ningún dato.
          </p>
          <button
            type="button"
            onClick={() => {
              setEnviado(false);
              setPaso(1);
            }}
            className="mt-6 min-h-11 cursor-pointer border border-white/25 px-5 font-mono text-xs uppercase tracking-[0.14em] text-white/80 transition-colors hover:border-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          >
            Volver a empezar
          </button>
        </div>
      ) : paso === 1 ? (
        <div>
          <fieldset>
            <legend className="px-5 pt-4 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/55">
              ¿Qué necesita?{" "}
              <span className="normal-case tracking-normal text-white/40">
                Puede elegir varias
              </span>
            </legend>
            <div className="mt-3 grid gap-2 px-5 pb-4 sm:grid-cols-2">
              {NECESIDADES.map((o, i) => {
                const on = necesidades.includes(o.titulo);
                return (
                  <label
                    key={o.id}
                    className={`relative flex min-h-[60px] cursor-pointer items-center gap-3 px-4 py-3 transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-orange ${
                      on ? CAMPO_ON : CAMPO
                    } ${i === NECESIDADES.length - 1 ? "sm:col-span-2" : ""}`}
                  >
                    <input
                      type="checkbox"
                      name="necesidad"
                      className="sr-only"
                      checked={on}
                      onChange={() =>
                        setNecesidades((l) => alternar(l, o.titulo))
                      }
                    />
                    <svg
                      viewBox="0 0 32 32"
                      aria-hidden
                      className={`h-7 w-7 shrink-0 transition-colors duration-200 ${on ? "text-orange" : "text-[#8fa6c7]"}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {o.trazo}
                    </svg>
                    <span
                      className={`text-[15px] ${on ? "text-white" : "text-white/85"}`}
                    >
                      {o.titulo}
                    </span>
                    {/* Nodo cuadrado: se pueden cerrar varios circuitos */}
                    <span className="ml-auto">
                      <Nodo on={on} varias />
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* ¿Ya tiene un levantamiento o dictamen? Separa a quien llega con una revisión hecha. */}
          <div className="grid gap-4 border-y border-white/12 px-5 py-4">
            <div>
              <p className="text-[15px] text-white">
                ¿Ya le entregaron un levantamiento o dictamen de su instalación?
              </p>
              <p className="pt-1 text-sm text-white/60">
                Es el documento que deja una revisión de cumplimiento, con las
                observaciones por corregir. Si lo tiene, partimos de ahí.
              </p>
            </div>
            <Opciones
              nombre="levantamiento"
              pregunta="Levantamiento o dictamen"
              opciones={LEVANTAMIENTO}
              valor={levantamiento}
              cambiar={elegirLevantamiento}
            />
            {/* Solo para quien ya lo tiene */}
            {conLevantamiento && (
              <div className="guiada-entra grid gap-4 border-l-2 border-orange/60 pl-4">
                <Opciones
                  nombre="reviso"
                  pregunta="¿Quién hizo la revisión?"
                  opciones={REVISO}
                  valor={reviso}
                  cambiar={setReviso}
                  columnas="sm:grid-cols-2"
                />
                <Opciones
                  nombre="plazo"
                  pregunta="¿Le dieron un plazo para corregir?"
                  opciones={PLAZO}
                  valor={plazo}
                  cambiar={setPlazo}
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 px-5 py-4">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/45">
              Paso 1 de 2
            </p>
            <button
              type="button"
              disabled={!necesidades.length}
              onClick={() => setPaso(2)}
              className="min-h-12 cursor-pointer rounded-[12px] bg-orange px-6 text-[15px] font-bold text-[#1a0d05] transition-[transform,opacity] duration-200 hover:-translate-y-px active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Continuar
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setEnviado(true);
          }}
        >
          <p className="px-5 pt-4 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/55">
            Su instalación
          </p>
          <div className="mt-3 grid gap-2 px-5 sm:grid-cols-2">
            <div
              className={`group relative ${CAMPO} px-4 pb-3 pt-2.5 transition-colors duration-200 focus-within:border-orange/70 focus-within:bg-[#142742]`}
            >
              <label
                htmlFor={sectorId}
                className="block font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#9fb3d1]"
              >
                Tipo de instalación
              </label>
              <select
                id={sectorId}
                name="sector"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="mt-1 block h-8 w-full cursor-pointer bg-transparent text-base text-white outline-none [&>option]:bg-[#0f1e36]"
              >
                <option value="" disabled>
                  Elija una
                </option>
                {SECTORES.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
            <Casilla
              rotulo="Ciudad de la instalación"
              name="ciudad"
              placeholder="Ciudad y estado"
            />
          </div>
          <div className="mt-3 px-5">
            <Opciones
              nombre="etapa"
              pregunta="¿En qué etapa está?"
              opciones={ETAPAS}
              valor={etapa}
              cambiar={setEtapa}
            />
          </div>

          <p className="mt-5 border-t border-white/12 px-5 pt-4 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/55">
            Sus datos
          </p>
          <div className="mt-3 grid gap-2 px-5 sm:grid-cols-2">
            <Casilla
              rotulo="Nombre"
              name="nombre"
              autoComplete="name"
              required
            />
            <Casilla
              rotulo="Empresa"
              name="empresa"
              autoComplete="organization"
            />
            <Casilla
              rotulo="Teléfono o WhatsApp"
              name="telefono"
              type="tel"
              autoComplete="tel"
              required
              ancho="sm:col-span-2"
            />
          </div>
          <div className="mt-3 px-5">
            <Opciones
              nombre="canal"
              pregunta="¿Por dónde prefiere que le contactemos?"
              opciones={CANALES}
              valor={canal}
              cambiar={setCanal}
              columnas="grid-cols-2"
            />
            <p className="mt-2 text-xs text-white/45">
              Al enviar acepta el Aviso de privacidad.
            </p>
          </div>

          <div className="mt-2 flex items-center justify-between gap-4 px-5 py-4">
            <button
              type="button"
              onClick={() => setPaso(1)}
              className="min-h-11 cursor-pointer font-mono text-xs uppercase tracking-[0.14em] text-white/65 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
            >
              ← Regresar
            </button>
            <ElectricBorder
              color="#f26b1d"
              glowColor="#f26b1d"
              borderRadius={12}
              thickness={2}
              speed={1}
              chaos={0.5}
            >
              <button
                type="submit"
                className="min-h-12 cursor-pointer rounded-[12px] bg-orange px-6 text-[15px] font-bold text-[#1a0d05] transition-transform duration-200 hover:-translate-y-px active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Solicitar diagnóstico
              </button>
            </ElectricBorder>
          </div>
        </form>
      )}
    </div>
  );
}
