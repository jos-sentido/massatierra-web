"use client";

import {
  Atom01Icon,
  Call02Icon,
  Clock01Icon,
  FlashIcon,
  WhatsappIcon,
  Wrench01Icon,
} from "@hugeicons/core-free-icons";
import CountUp from "@/components/CountUp";
import DecryptedText from "@/components/DecryptedText";
import ElectricBorder from "@/components/ElectricBorder";
import Encabezado from "@/components/site/Encabezado";
import HeroSistema from "@/components/site/HeroSistema";
import Pie from "@/components/site/Pie";
import { Ficha, Rotulo } from "@/components/site/Rotulo";
import Diagnostico from "@/components/site/Diagnostico";
import Sectores, { type Sector } from "@/components/site/Sectores";
import LogoLoop from "@/components/LogoLoop";
import MagnetLines from "@/components/MagnetLines";
import SplitText from "@/components/SplitText";
import Topography from "@/components/Topography";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const ORANGE = "#f26b1d";
const COPPER = "#e0a06a";

// La sigla sola no le dice nada a la mayoría: cada una lleva su bajada
// siempre visible (sin depender del cursor, que en el celular no existe).
const AVALES: [string, string][] = [
  ["NOM", "Norma oficial mexicana"],
  ["ANCE", "Certificación eléctrica"],
  ["NMX", "Norma mexicana"],
  ["IEEE", "Estándar internacional"],
  ["ABNT", "Aval en Brasil"],
  ["SEC", "Aval en Chile"],
  ["IMPI", "Patente registrada"],
];

const SECTORES: Sector[] = [
  {
    titulo: "Industria y manufactura",
    texto:
      "Líneas de producción, automatización, tableros y equipos de control.",
    areas: [
      "Subestaciones",
      "Cuartos eléctricos",
      "Líneas de producción",
      "PLC y variadores",
      "Almacenes",
    ],
    imagen: `${BASE}/lab/sector-industria.jpg`,
    alt: "Imagen conceptual: planta de manufactura de noche, con pararrayos en la azotea",
  },
  {
    titulo: "Hotelería",
    texto: "Instalaciones y sistemas que sostienen la experiencia del huésped.",
    areas: [
      "Cuartos eléctricos",
      "Equipos de comunicación",
      "Elevadores",
      "Bombeo",
      "Plantas de emergencia",
    ],
    imagen: `${BASE}/lab/sector-hoteleria.jpg`,
    alt: "Imagen conceptual: hotel frente al mar de noche, con pararrayos en la azotea",
  },
  {
    titulo: "Hospitales y clínicas",
    texto:
      "Infraestructura eléctrica y equipos sensibles para la atención médica.",
    areas: [
      "Cuartos eléctricos",
      "Infraestructura de comunicación",
      "Sistemas de respaldo",
      "Equipos médicos sensibles",
    ],
    imagen: `${BASE}/lab/sector-salud.jpg`,
    alt: "Imagen conceptual: hospital de noche, con pararrayos en la azotea",
  },
  {
    titulo: "Telecomunicaciones y centros de datos",
    texto:
      "Servidores, redes, sistemas de respaldo e instalaciones de transmisión.",
    areas: [
      "Servidores y racks",
      "Torres",
      "Shelters",
      "UPS y baterías",
      "Tableros",
    ],
    imagen: `${BASE}/lab/sector-telecom.jpg`,
    alt: "Imagen conceptual: torre de telecomunicaciones y centro de datos de noche, con pararrayos en la punta",
  },
  {
    titulo: "Construcción e infraestructura",
    texto:
      "Ingeniería y ejecución para obra nueva, ampliaciones y modernizaciones.",
    areas: [
      "Desarrollos habitacionales",
      "Edificios comerciales",
      "Parques industriales",
      "Infraestructura",
    ],
    imagen: `${BASE}/lab/sector-construccion.jpg`,
    alt: "Imagen conceptual: edificio en construcción de noche, con pararrayos en el punto más alto",
  },
  {
    titulo: "Minería",
    texto: "Infraestructura de operación, mantenimiento y servicios.",
    areas: ["Operación", "Mantenimiento", "Almacenamiento", "Servicios"],
    imagen: `${BASE}/lab/sector-mineria.jpg`,
    alt: "Imagen conceptual: operación minera de noche, con pararrayos en la estructura más alta",
  },
];

function Nota({ children }: { children: React.ReactNode }) {
  return (
    <span className="pointer-events-none absolute bottom-3 right-4 z-20 rounded-md bg-black/45 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white/70">
      {children}
    </span>
  );
}

export default function Vitrina() {
  return (
    <>
      <Encabezado demo />
      <main className="bg-[#050d1c] text-white">
        {/* 1 · HERO */}
        <section className="relative isolate flex min-h-[min(92svh,860px)] items-center overflow-hidden max-md:min-h-[100svh] max-md:items-end">
          <HeroSistema className="-z-20" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#040a17]/90 via-[#040a17]/45 to-transparent max-lg:via-[#040a17]/70 max-md:bg-gradient-to-t max-md:from-[#040a17] max-md:from-25% max-md:via-[#040a17]/60 max-md:via-50% max-md:to-transparent" />
          <div className="mx-auto w-full max-w-6xl px-6 py-24 max-md:pb-14 max-md:pt-0">
            <div className="max-w-xl">
              <Rotulo simbolo="descarga">Tierras físicas y pararrayos</Rotulo>
              <SplitText
                tag="h1"
                text="Tecnología para proteger lo que mantiene en marcha su empresa"
                splitType="words"
                effect="rise"
                trigger="load"
                textAlign="left"
                className="mt-3 !flex flex-wrap gap-x-[0.26em] text-[28px] font-bold leading-[1.1] tracking-tight sm:text-5xl sm:leading-[1.08]"
              />
              <p className="mt-5 max-w-md text-base text-white/80">
                Tecnología patentada, ingeniería especializada e instalación,
                con garantía de desempeño por escrito.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <ElectricBorder
                  color={ORANGE}
                  glowColor={ORANGE}
                  borderRadius={14}
                  thickness={2}
                  speed={1}
                  chaos={0.5}
                >
                  <button
                    type="button"
                    className="min-h-12 cursor-pointer rounded-[14px] bg-orange px-6 text-[15px] font-bold text-[#1a0d05] transition-transform duration-200 hover:-translate-y-px active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    Solicitar diagnóstico
                  </button>
                </ElectricBorder>
                <button
                  type="button"
                  className="min-h-12 cursor-pointer rounded-[14px] border border-white/40 px-6 text-[15px] font-semibold transition-colors duration-200 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Hablar con un especialista
                </button>
              </div>
            </div>
          </div>
          <Nota>Haga clic en el cielo: el rayo va al sistema</Nota>
        </section>

        {/* 2 · RESPALDO */}
        <section className="border-y border-white/10 bg-[#081428]">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-6 py-10 md:grid-cols-4">
            <div>
              <p className="text-4xl font-bold tabular-nums text-orange">
                +<CountUp to={25} duration={1.6} />
              </p>
              <p className="mt-1 text-sm text-white/70">años de experiencia</p>
            </div>
            <div>
              <p className="text-4xl font-bold tabular-nums text-orange">
                <CountUp to={20} duration={1.6} />
              </p>
              <p className="mt-1 text-sm text-white/70">
                años de garantía por escrito
              </p>
            </div>
            <div className="col-span-2">
              <p className="font-mono text-3xl font-medium tracking-wide sm:text-4xl">
                <DecryptedText
                  text="PAT. #285201 MR"
                  animateOn="view"
                  sequential
                  speed={45}
                  aria-label="Patente 285201 MR"
                />
              </p>
              <p className="mt-1 text-sm text-white/70">
                Electrodo Magneto Activo patentado · IMPI
              </p>
            </div>
          </div>
          <div className="border-t border-white/10 py-5">
            <LogoLoop
              ariaLabel="Normas y avales"
              logos={AVALES.map(([sigla, que]) => ({
                node: (
                  <span className="flex flex-col items-center gap-1.5 leading-none">
                    <span className="font-mono text-lg font-medium tracking-[0.2em] text-white/80">
                      {sigla}
                    </span>
                    <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">
                      {que}
                    </span>
                  </span>
                ),
                title: `${sigla} · ${que}`,
              }))}
              speed={45}
              gap={72}
              logoHeight={44}
              fadeOut
              fadeOutColor="#081428"
              pauseOnHover
            />
          </div>
        </section>

        {/* 3 · TECNOLOGÍA */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-2">
            <div>
              <Rotulo simbolo="bobina">Tecnología</Rotulo>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Electrodo Magneto Activo
              </h2>
              <p className="mt-4 max-w-md text-white/75">
                MassLink es un sistema unidireccional: solo permite el drenado
                de corrientes no deseadas a tierra y evita que regresen del
                subsuelo a las aplicaciones.
              </p>
              <div className="mt-8 max-w-md">
                <Ficha
                  renglones={[
                    ["Impedancia", "Baja", FlashIcon],
                    ["Mantenimiento", "Libre de mantenimiento", Wrench01Icon],
                    ["Material", "100% cobre electrolítico", Atom01Icon],
                  ]}
                />
              </div>
            </div>
            <div className="relative mx-auto aspect-square w-full max-w-[440px]">
              <MagnetLines
                rows={13}
                columns={13}
                containerSize="100%"
                lineColor={COPPER}
                accentColor={ORANGE}
                lineWidth={2}
                lineHeight={22}
                mode="dipole"
                shape="needle"
                clickPulse
                idle
              />
              <Nota>Mueva el cursor: el campo responde</Nota>
            </div>
          </div>
        </section>

        {/* 4 · ESTUDIOS */}
        <section className="relative isolate overflow-hidden border-y border-white/10">
          <div className="absolute inset-0 -z-10">
            <Topography
              style={{ width: "100%", height: "100%" }}
              color={COPPER}
              lineCount={26}
              elevation={0.9}
              tilt={0.55}
              speed={0.25}
              glow={0.5}
              fog={0.7}
              opacity={0.75}
              mouseInteraction
              hoverEffect="lift"
              clickEffect="pulse"
              markers="plus"
            />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#050d1c] via-[#050d1c]/70 to-transparent" />
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="max-w-lg">
              <Rotulo simbolo="resistencia">Estudios y medición</Rotulo>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Conozca las condiciones de su terreno antes de decidir
              </h2>
              <p className="mt-4 text-white/75">
                Medición de resistividad del terreno y de resistencia a tierra
                para diseñar el sistema y documentar el cumplimiento.
              </p>
              <p className="mt-6 font-mono text-xl tracking-wide text-orange">
                <DecryptedText
                  text="NOM-022-STPS-2015"
                  animateOn="view"
                  sequential
                  speed={40}
                  aria-label="NOM-022-STPS-2015"
                />
              </p>
            </div>
          </div>
          <Nota>El terreno se levanta bajo el cursor</Nota>
        </section>

        {/* 5 · SECTORES */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <Rotulo simbolo="barra">Sectores</Rotulo>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Especialización para distintos sectores
          </h2>
          <p className="mt-3 max-w-xl text-white/70">
            Cada instalación es distinta; todas terminan conectadas a la misma
            tierra.
          </p>
          <div className="mt-10">
            <Sectores sectores={SECTORES} />
          </div>
        </section>

        {/* 6 · DIAGNÓSTICO */}
        <section className="border-t border-white/10 bg-[#081428]">
          <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 py-20 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <Rotulo simbolo="tierra">Diagnóstico</Rotulo>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Cuéntenos qué necesita proteger
              </h2>
              <p className="mt-4 max-w-md text-white/75">
                Comparta las características de su instalación o proyecto. Un
                especialista le ayudará a identificar cómo comenzar.
              </p>
              <div className="mt-8 max-w-md">
                <Ficha
                  renglones={[
                    ["Conmutador", "+52 33 3627 3226", Call02Icon],
                    ["WhatsApp", "+52 33 1043 3045", WhatsappIcon],
                    ["Horario", "Lunes a viernes, 9:00 a 18:00", Clock01Icon],
                  ]}
                />
              </div>
            </div>
            <Diagnostico />
          </div>
        </section>
      </main>
      <Pie demo />
    </>
  );
}
