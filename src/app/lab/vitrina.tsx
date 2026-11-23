"use client";

import { useState } from "react";
import CountUp from "@/components/CountUp";
import DecryptedText from "@/components/DecryptedText";
import ElectricBorder from "@/components/ElectricBorder";
import HeroVideo from "@/components/site/HeroVideo";
import RayoAlSistema, { type Sistema } from "@/components/site/RayoAlSistema";
import LogoLoop from "@/components/LogoLoop";
import MagnetLines from "@/components/MagnetLines";
import SplitText from "@/components/SplitText";
import SpotlightCard from "@/components/SpotlightCard";
import Stepper, { Step } from "@/components/Stepper";
import Topography from "@/components/Topography";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const ORANGE = "#f26b1d";
const COPPER = "#e0a06a";

// Dónde está el sistema dentro de cada video (0–1). Si cambia el video, se recalibra.
const SISTEMA_H: Sistema = {
  aspecto: 1912 / 1080,
  posicion: [0.68, 0.5],
  punta: [0.689, 0.153],
  recorrido: [
    [0.689, 0.153],
    [0.689, 0.31],
    [0.691, 0.585],
    [0.678, 0.64],
    [0.677, 0.9],
  ],
  tierra: [0.677, 0.86],
  horizonte: 0.61,
};
const SISTEMA_V: Sistema = {
  aspecto: 1080 / 1912,
  posicion: [0.5, 0],
  punta: [0.494, 0.136],
  recorrido: [
    [0.494, 0.136],
    [0.495, 0.3],
    [0.518, 0.335],
    [0.518, 0.69],
    [0.518, 0.868],
  ],
  tierra: [0.518, 0.85],
  horizonte: 0.62,
};

const AVALES = ["NOM", "ANCE", "NMX", "IEEE", "ABNT", "SEC", "IMPI"];

const SECTORES = [
  [
    "Industria y manufactura",
    "Líneas de producción, automatización, tableros y equipos de control.",
  ],
  [
    "Hotelería",
    "Instalaciones y sistemas que sostienen la experiencia del huésped.",
  ],
  [
    "Hospitales y clínicas",
    "Infraestructura eléctrica y equipos sensibles para la atención médica.",
  ],
  [
    "Telecomunicaciones y centros de datos",
    "Servidores, redes, sistemas de respaldo e instalaciones de transmisión.",
  ],
  [
    "Construcción e infraestructura",
    "Ingeniería y ejecución para obra nueva, ampliaciones y modernizaciones.",
  ],
  ["Minería", "Infraestructura de operación, mantenimiento y servicios."],
];

function Etiqueta({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/55">
      <span className="text-orange">{n}</span> · {children}
    </p>
  );
}

function Nota({ children }: { children: React.ReactNode }) {
  return (
    <span className="pointer-events-none absolute bottom-3 right-4 z-20 rounded-md bg-black/45 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white/70">
      {children}
    </span>
  );
}

export default function Vitrina() {
  const [enviado, setEnviado] = useState(false);

  return (
    <main className="bg-[#050d1c] text-white">
      {/* 1 · HERO */}
      <section className="relative isolate flex min-h-[min(92svh,860px)] items-center overflow-hidden max-md:min-h-[100svh] max-md:items-end">
        <div className="absolute inset-0 -z-20">
          <HeroVideo
            src={`${BASE}/lab/hero.mp4`}
            srcVertical={`${BASE}/lab/hero-vertical.mp4`}
            poster={`${BASE}/lab/hero-poster.jpg`}
            posterVertical={`${BASE}/lab/hero-vertical-poster.jpg`}
            label="Video conceptual: un rayo cae en la punta pararrayos; la energía baja por la conducción y se disipa en el electrodo bajo tierra"
            className="object-[68%_50%] max-md:object-top"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#050d1c]/95 via-[#050d1c]/65 to-transparent max-md:bg-gradient-to-t max-md:from-[#050d1c] max-md:from-30% max-md:via-[#050d1c]/55 max-md:via-55% max-md:to-transparent" />
        <RayoAlSistema
          className="-z-10"
          horizontal={SISTEMA_H}
          vertical={SISTEMA_V}
        />
        <div className="mx-auto w-full max-w-6xl px-6 py-24 max-md:pb-14 max-md:pt-0">
          <div className="max-w-xl">
            <Etiqueta n="01">Tierras físicas y pararrayos</Etiqueta>
            <SplitText
              tag="h1"
              text="Tecnología para proteger lo que mantiene en marcha su empresa"
              splitType="words"
              effect="rise"
              trigger="load"
              textAlign="left"
              className="mt-3 text-[28px] font-bold leading-[1.1] tracking-tight sm:text-5xl sm:leading-[1.08]"
            />
            <p className="mt-5 max-w-md text-base text-white/80">
              Tecnología patentada, ingeniería especializada e instalación, con
              garantía de desempeño por escrito.
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
            logos={AVALES.map((a) => ({
              node: (
                <span className="font-mono text-lg font-medium tracking-[0.2em] text-white/75">
                  {a}
                </span>
              ),
              title: a,
            }))}
            speed={45}
            gap={72}
            logoHeight={28}
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
            <Etiqueta n="02">Tecnología</Etiqueta>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Electrodo Magneto Activo
            </h2>
            <p className="mt-4 max-w-md text-white/75">
              MassLink es un sistema unidireccional: solo permite el drenado de
              corrientes no deseadas a tierra y evita que regresen del subsuelo
              a las aplicaciones.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-white/80">
              {[
                "Baja impedancia",
                "Libre de mantenimiento",
                "100% cobre electrolítico",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="h-px w-6 bg-orange" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
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
            <Etiqueta n="03">Estudios y medición</Etiqueta>
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
        <Etiqueta n="04">Sectores</Etiqueta>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Especialización para distintos sectores
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SECTORES.map(([titulo, texto], i) => (
            <SpotlightCard
              key={titulo}
              spotlightColor="rgba(242,107,29,0.28)"
              borderGlow={0.7}
              className="cursor-pointer rounded-2xl border border-white/10 bg-[#0b1f3a] p-6"
            >
              <p className="font-mono text-xs text-orange">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-6 text-lg font-semibold">{titulo}</h3>
              <p className="mt-2 text-sm text-white/70">{texto}</p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 6 · FORMULARIO */}
      <section className="border-t border-white/10 bg-[#081428]">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-6 py-20 md:grid-cols-2">
          <div>
            <Etiqueta n="05">Cumplimiento</Etiqueta>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Cuéntenos qué le observaron
            </h2>
            <p className="mt-4 max-w-md text-white/75">
              Usted no necesita coordinar a cuatro proveedores. Estudio,
              instalación, dictamen y garantía con un solo responsable.
            </p>
          </div>
          <div>
            {enviado ? (
              <p
                role="status"
                className="rounded-2xl border border-white/15 bg-[#0b1f3a] p-8 text-white/85"
              >
                Gracias. Este es un formulario de demostración: no se envió
                ningún dato.
              </p>
            ) : (
              <Stepper
                theme="dark"
                accentColor={ORANGE}
                indicator="numbers"
                backButtonText="Regresar"
                nextButtonText="Continuar"
                completeButtonText="Enviar"
                onFinalStepCompleted={() => setEnviado(true)}
              >
                <Step>
                  <div className="space-y-4">
                    <label className="block text-sm">
                      <span className="text-white/80">Nombre</span>
                      <input
                        type="text"
                        autoComplete="name"
                        className="mt-1 h-11 w-full rounded-lg border border-white/20 bg-white/5 px-3 text-base outline-none focus-visible:border-orange"
                      />
                    </label>
                    <label className="block text-sm">
                      <span className="text-white/80">Teléfono o WhatsApp</span>
                      <input
                        type="tel"
                        autoComplete="tel"
                        className="mt-1 h-11 w-full rounded-lg border border-white/20 bg-white/5 px-3 text-base outline-none focus-visible:border-orange"
                      />
                    </label>
                    <fieldset className="text-sm">
                      <legend className="text-white/80">
                        ¿Recibió recientemente un levantamiento o dictamen de
                        cumplimiento?
                      </legend>
                      <div className="mt-2 flex gap-6">
                        {["Sí", "No"].map((o) => (
                          <label
                            key={o}
                            className="flex min-h-11 cursor-pointer items-center gap-2"
                          >
                            <input
                              type="radio"
                              name="levantamiento"
                              className="h-4 w-4 accent-[#f26b1d]"
                            />
                            {o}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                </Step>
                <Step>
                  <div className="space-y-4">
                    <label className="block text-sm">
                      <span className="text-white/80">Empresa</span>
                      <input
                        type="text"
                        autoComplete="organization"
                        className="mt-1 h-11 w-full rounded-lg border border-white/20 bg-white/5 px-3 text-base outline-none focus-visible:border-orange"
                      />
                    </label>
                    <label className="block text-sm">
                      <span className="text-white/80">
                        Ciudad de la instalación
                      </span>
                      <input
                        type="text"
                        className="mt-1 h-11 w-full rounded-lg border border-white/20 bg-white/5 px-3 text-base outline-none focus-visible:border-orange"
                      />
                    </label>
                    <label className="block text-sm">
                      <span className="text-white/80">¿Qué le pidieron?</span>
                      <textarea
                        rows={3}
                        className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-base outline-none focus-visible:border-orange"
                      />
                    </label>
                  </div>
                </Step>
              </Stepper>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
