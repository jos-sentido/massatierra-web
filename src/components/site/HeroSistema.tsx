"use client";

import { useEffect, useRef } from "react";
import HeroPlano from "./HeroPlano";

/*
 * Hero «el sistema manejando una descarga», en dibujo técnico de línea.
 *
 * - La escena (nave, punta, bajante, electrodo, terreno) es un SVG de trazo fino:
 *   nítido a cualquier tamaño y en el mismo lenguaje que el resto del sitio.
 * - El rayo se pinta en un <canvas>: canal quebrado con ramas, resplandor y parpadeo.
 *   Nace donde el visitante hace clic y SIEMPRE termina en la punta.
 * - Al tocar la punta, la energía cambia de azul (descarga) a naranja (bajo control):
 *   baja por la bajante y se disipa en anillos desde el electrodo.
 * - Solo: cae un rayo cada pocos segundos mientras el hero está en pantalla.
 * - Con «reducir movimiento» queda el dibujo fijo, sin rayos ni pulsos.
 *
 * Va dentro de un contenedor `relative`; escucha los clics de ese contenedor.
 */

// Geometría de la escena, en unidades del viewBox (1600 × 900).
const X = 1330; // eje del sistema: cara exterior de la columna derecha del pórtico
const PUNTA: [number, number] = [X, 262];
const TIERRA: [number, number] = [X, 692];
const RECORRIDO = `M${X} 262 L${X} 590 L${X} 692`;

// Las tres partes del sistema: [altura, número, parte, componente].
const NOTAS: [number, string, string, string][] = [
  [282, "01", "CAPTACIÓN", "PUNTA MTPP02"],
  [452, "02", "CONDUCCIÓN", "BAJANTE DE COBRE"],
  [642, "03", "PUESTA A TIERRA", "ELECTRODO MAGNETO ACTIVO"],
];

const VB_ANCHO = "0 0 1600 900";
const VB_ALTO = "1050 170 520 730";
const VB_MOVIL = "1060 170 540 560"; // proporción 27:28, la del bloque en celular

type Pt = { x: number; y: number };
type Rama = { pts: Pt[]; ancho: number; desde: number; rama: boolean };

function desplazar(a: Pt, b: Pt, rugosidad: number, niveles: number): Pt[] {
  let pts = [a, b];
  let amp = Math.hypot(b.x - a.x, b.y - a.y) * rugosidad;
  for (let n = 0; n < niveles; n++) {
    const out: Pt[] = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const p = pts[i];
      const q = pts[i + 1];
      const nx = -(q.y - p.y);
      const ny = q.x - p.x;
      const l = Math.hypot(nx, ny) || 1;
      const d = (Math.random() - 0.5) * amp;
      out.push(p, {
        x: (p.x + q.x) / 2 + (nx / l) * d,
        y: (p.y + q.y) / 2 + (ny / l) * d,
      });
    }
    out.push(pts[pts.length - 1]);
    pts = out;
    amp *= 0.52;
  }
  return pts;
}

/** Canal principal + ramas que se apagan en el aire (nunca llegan al sistema). */
function crearRayo(origen: Pt, destino: Pt): Rama[] {
  const tronco = desplazar(origen, destino, 0.16, 7);
  const ramas: Rama[] = [{ pts: tronco, ancho: 2.8, desde: 0, rama: false }];
  const largo = Math.hypot(destino.x - origen.x, destino.y - origen.y);
  const brotar = (base: Pt[], ancho: number, nivel: number, offset: number) => {
    const cuantas =
      nivel === 0
        ? 3 + Math.floor(Math.random() * 3)
        : Math.random() < 0.6
          ? 1
          : 0;
    for (let k = 0; k < cuantas; k++) {
      const t = 0.1 + Math.random() * 0.62;
      const i = Math.floor(base.length * t);
      const p = base[i];
      const q = base[Math.min(i + 6, base.length - 1)];
      const ang =
        Math.atan2(q.y - p.y, q.x - p.x) +
        (Math.random() < 0.5 ? -1 : 1) * (0.35 + Math.random() * 0.55);
      const l = largo * (0.1 + Math.random() * 0.2) * (nivel === 0 ? 1 : 0.55);
      const fin = { x: p.x + Math.cos(ang) * l, y: p.y + Math.sin(ang) * l };
      // Las ramas no bajan más allá de la punta: lo único que llega es el canal principal.
      if (fin.y > destino.y - 12) fin.y = destino.y - 12 - Math.random() * 30;
      const pts = desplazar(p, fin, 0.2, 5);
      const desde = offset + t * (nivel === 0 ? 1 : 0.4);
      ramas.push({ pts, ancho: ancho * 0.55, desde, rama: true });
      if (nivel < 1) brotar(pts, ancho * 0.55, nivel + 1, desde);
    }
  };
  brotar(tronco, 2.8, 0, 0);
  return ramas;
}

export default function HeroSistema({
  className = "",
}: {
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const canvas = canvasRef.current;
    const zona = svg?.closest("section") ?? svg?.parentElement?.parentElement;
    if (!svg || !canvas || !zona) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mqMovil = window.matchMedia("(max-width: 767px)");
    const mqAlto = window.matchMedia("(max-aspect-ratio: 4/5)");
    const mqQuieto = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Celular: la ilustración va en su propio bloque bajo los textos, encuadrada
    // en el sistema y con sus notas. Tableta vertical: encuadre alto detrás del texto.
    const encuadre = () => {
      const [vb, par] = mqMovil.matches
        ? [VB_MOVIL, "xMidYMid slice"]
        : mqAlto.matches
          ? [VB_ALTO, "xMidYMin slice"]
          : [VB_ANCHO, "xMaxYMid slice"];
      svg.setAttribute("viewBox", vb);
      svg.setAttribute("preserveAspectRatio", par);
    };
    encuadre();
    mqMovil.addEventListener("change", encuadre);
    mqAlto.addEventListener("change", encuadre);

    let W = 0;
    let H = 0;
    const medir = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(canvas);

    /** Punto del dibujo → píxeles del canvas (sin calibrar nada a mano). */
    const aPantalla = (p: [number, number]): Pt => {
      const m = svg.getScreenCTM();
      const r = canvas.getBoundingClientRect();
      if (!m) return { x: 0, y: 0 };
      const q = new DOMPoint(p[0], p[1]).matrixTransform(m);
      return { x: q.x - r.left, y: q.y - r.top };
    };

    const q = <T extends Element>(sel: string) => svg.querySelector<T>(sel);
    const pulso = q<SVGPathElement>("[data-pulso]");
    const destello = q<SVGCircleElement>("[data-destello]");
    const brilloElectrodo = q<SVGGElement>("[data-electrodo-on]");
    const anillos = svg.querySelectorAll<SVGEllipseElement>("[data-anillo]");

    /** La energía ya dentro del sistema: naranja, ordenada, hacia abajo. */
    const conducir = () => {
      if (pulso) {
        const largo = pulso.getTotalLength();
        const tramo = largo * 0.22;
        pulso.style.strokeDasharray = `${tramo} ${largo + tramo}`;
        pulso.animate(
          [
            { strokeDashoffset: tramo, opacity: 1 },
            { strokeDashoffset: -largo, opacity: 1 },
          ],
          { duration: 700, easing: "cubic-bezier(.5,0,.25,1)", fill: "both" },
        );
        pulso.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 160,
          delay: 700,
          fill: "forwards",
        });
      }
      destello?.animate(
        [
          { opacity: 0, transform: "scale(.3)" },
          { opacity: 1, transform: "scale(1)" },
          { opacity: 0, transform: "scale(1.9)" },
        ],
        { duration: 520, easing: "ease-out" },
      );
      brilloElectrodo?.animate(
        [{ opacity: 0 }, { opacity: 1, offset: 0.25 }, { opacity: 0 }],
        {
          duration: 1500,
          delay: 520,
          easing: "ease-out",
        },
      );
      anillos.forEach((a, i) =>
        a.animate(
          [
            { opacity: 0, transform: "scale(.12)" },
            { opacity: 0.95, offset: 0.12 },
            { opacity: 0, transform: "scale(1)" },
          ],
          {
            duration: 1700,
            delay: 600 + i * 190,
            easing: "cubic-bezier(.2,.6,.3,1)",
          },
        ),
      );
    };

    // ── Rayo en canvas ──
    type Descarga = { ramas: Rama[]; t0: number; tocado: boolean };
    let descargas: Descarga[] = [];
    let raf = 0;

    const trazo = (pts: Pt[], hasta: number) => {
      const n = Math.max(2, Math.floor(pts.length * hasta));
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < n; i++) ctx.lineTo(pts[i].x, pts[i].y);
    };

    const T_GUIA = 95; // ms: el canal baja hasta la punta
    const VIDA = 620;

    const pintar = (ahora: number) => {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      descargas = descargas.filter((d) => ahora - d.t0 < VIDA);

      for (const d of descargas) {
        const t = ahora - d.t0;
        const avance = Math.min(1, t / T_GUIA);
        // Descarga de retorno: fogonazo, baja, re-enciende y se extingue.
        let I: number;
        if (t < T_GUIA) I = 0.55;
        else {
          const u = t - T_GUIA;
          I =
            u < 70
              ? 1
              : u < 120
                ? 0.3
                : u < 170
                  ? 0.85
                  : 0.85 * Math.exp(-(u - 170) / 110);
        }
        if (!d.tocado && t >= T_GUIA) {
          d.tocado = true;
          conducir();
        }

        const punta = d.ramas[0].pts[d.ramas[0].pts.length - 1];
        // Resplandor del cielo alrededor del canal.
        if (I > 0.05) {
          const g = ctx.createRadialGradient(
            punta.x,
            punta.y - H * 0.18,
            0,
            punta.x,
            punta.y - H * 0.18,
            H * 0.75,
          );
          g.addColorStop(0, `rgba(150,185,255,${0.24 * I})`);
          g.addColorStop(1, "rgba(150,185,255,0)");
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, W, H);
        }

        for (const r of d.ramas) {
          const local = r.rama
            ? Math.min(1, Math.max(0, (avance - r.desde) / 0.35))
            : avance;
          if (local <= 0) continue;
          // Las ramas se apagan antes que el canal principal.
          const i = r.rama
            ? I * Math.max(0, 1 - Math.max(0, t - T_GUIA) / 190)
            : I;
          if (i <= 0.01) continue;
          trazo(r.pts, local);
          ctx.shadowColor = "rgba(140,175,255,1)";
          ctx.shadowBlur = 34;
          ctx.strokeStyle = `rgba(110,150,255,${0.14 * i})`;
          ctx.lineWidth = r.ancho * 10;
          ctx.stroke();
          ctx.shadowBlur = 10;
          ctx.strokeStyle = `rgba(185,210,255,${0.5 * i})`;
          ctx.lineWidth = r.ancho * 2.8;
          ctx.stroke();
          ctx.shadowBlur = 3;
          ctx.strokeStyle = `rgba(255,255,255,${Math.min(1, i * 1.1)})`;
          ctx.lineWidth = r.ancho * (r.rama ? 0.7 : 1);
          ctx.stroke();
        }
      }
      ctx.shadowBlur = 0;
      ctx.globalCompositeOperation = "source-over";
      raf = descargas.length ? requestAnimationFrame(pintar) : 0;
      if (!raf) ctx.clearRect(0, 0, W, H);
    };

    const caer = (origen: Pt) => {
      const punta = aPantalla(PUNTA);
      // Un rayo no nace bajo tierra ni por debajo de la punta: sube al cielo.
      const o =
        origen.y > punta.y - 30
          ? { x: origen.x, y: Math.max(6, punta.y * 0.12) }
          : origen;
      descargas.push({
        ramas: crearRayo(o, punta),
        t0: performance.now(),
        tocado: false,
      });
      if (!raf) raf = requestAnimationFrame(pintar);
    };

    const alClic = (ev: PointerEvent) => {
      if (mqQuieto.matches) return;
      if (
        (ev.target as Element).closest("a,button,input,textarea,select,label")
      )
        return;
      const r = canvas.getBoundingClientRect();
      // En celular los textos van arriba, fuera del dibujo: ahí no cae nada.
      if (ev.clientY < r.top || ev.clientY > r.bottom) return;
      caer({ x: ev.clientX - r.left, y: ev.clientY - r.top });
      ultimo = performance.now();
    };
    zona.addEventListener("pointerdown", alClic);

    // Rayo espontáneo mientras el hero está a la vista.
    let visible = false;
    let ultimo = performance.now() - 4200;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(zona);
    const reloj = window.setInterval(() => {
      if (!visible || mqQuieto.matches || document.hidden) return;
      if (performance.now() - ultimo < 6200) return;
      ultimo = performance.now();
      const punta = aPantalla(PUNTA);
      caer({ x: punta.x + (Math.random() - 0.35) * W * 0.3, y: 4 });
    }, 500);

    return () => {
      zona.removeEventListener("pointerdown", alClic);
      mqAlto.removeEventListener("change", encuadre);
      mqMovil.removeEventListener("change", encuadre);
      ro.disconnect();
      io.disconnect();
      window.clearInterval(reloj);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const linea = { vectorEffect: "non-scaling-stroke" as const, fill: "none" };
  const cobre = "#d9955f";

  const notas = (
    clase: string,
    titulo: number,
    sub: number,
    espacio: number,
    ancho: number,
    alto: number,
  ) => (
    <g
      className={clase}
      fontFamily="var(--font-mono, ui-monospace), monospace"
      fontSize={titulo}
      letterSpacing={espacio}
    >
      {NOTAS.map(([y, n, parte, pieza]) => (
        <g key={n}>
          <rect
            x={X + 34}
            y={y - alto / 2}
            width={ancho}
            height={alto}
            rx="3"
            fill="#050d1c"
            fillOpacity="0.86"
            stroke={cobre}
            strokeOpacity="0.28"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={`M${X + 4} ${y} H${X + 34}`}
            stroke={cobre}
            strokeWidth="1"
            opacity="0.75"
            {...linea}
          />
          <circle cx={X + 4} cy={y} r="2" fill={cobre} />
          <text x={X + 46} y={y - sub * 0.25}>
            <tspan fill="#f26b1d">{n}</tspan>
            <tspan fill="#dfe7f2" dx={titulo * 0.6}>
              {parte}
            </tspan>
          </text>
          <text x={X + 46} y={y + sub * 1.2} fill="#9fb0c8" fontSize={sub}>
            {pieza}
          </text>
        </g>
      ))}
    </g>
  );

  return (
    <div className={`absolute inset-0 ${className}`}>
      <svg
        ref={svgRef}
        viewBox={VB_ANCHO}
        preserveAspectRatio="xMaxYMid slice"
        role="img"
        aria-label="Dibujo técnico: un rayo cae en la punta pararrayos de una subestación con transformador, generador y tablero; la energía baja por la conducción y se disipa en el terreno desde el electrodo"
        className="hero-sistema absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="hs-cielo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#040a17" />
            <stop offset="0.62" stopColor="#0a1a33" />
            <stop offset="0.622" stopColor="#070f1d" />
            <stop offset="1" stopColor="#040910" />
          </linearGradient>
          <radialGradient id="hs-nube">
            <stop offset="0" stopColor="#7fa2e8" stopOpacity="0.2" />
            <stop offset="1" stopColor="#7fa2e8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hs-destello">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.3" stopColor="#ffd9a8" stopOpacity="0.85" />
            <stop offset="1" stopColor="#f26b1d" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hs-calor">
            <stop offset="0" stopColor="#f26b1d" stopOpacity="0.5" />
            <stop offset="1" stopColor="#f26b1d" stopOpacity="0" />
          </radialGradient>
          <filter id="hs-brillo" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="hs-desvanecer" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.3" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="1" />
          </linearGradient>
          <pattern
            id="hs-reticula"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M80 0 H0 V80"
              fill="none"
              stroke="#6f8fc2"
              strokeWidth="1"
              opacity="0.07"
              vectorEffect="non-scaling-stroke"
            />
          </pattern>
          <mask id="hs-mask">
            <rect width="1600" height="900" fill="url(#hs-desvanecer)" />
          </mask>
        </defs>

        <rect width="1600" height="900" fill="url(#hs-cielo)" />
        <rect
          width="1600"
          height="560"
          fill="url(#hs-reticula)"
          mask="url(#hs-mask)"
        />

        {/* Tormenta lejana: resplandores dentro de las nubes */}
        <ellipse
          className="hs-nube"
          cx="1240"
          cy="150"
          rx="330"
          ry="120"
          fill="url(#hs-nube)"
        />
        <ellipse
          className="hs-nube hs-nube-b"
          cx="820"
          cy="110"
          rx="260"
          ry="95"
          fill="url(#hs-nube)"
        />

        <g mask="url(#hs-mask)">
          {/* Estratos del terreno: curvas finas, como en la sección de estudios */}
          <g stroke="#8fa6c7" strokeWidth="1" opacity="0.13" {...linea}>
            <path d="M0 610 C240 596 420 628 700 612 S1180 598 1600 618" />
            <path d="M0 668 C300 650 520 690 820 668 S1300 652 1600 676" />
            <path d="M0 732 C260 716 560 752 880 730 S1340 712 1600 740" />
            <path d="M0 800 C340 782 600 820 940 798 S1380 780 1600 808" />
            <path d="M0 864 C300 850 640 880 980 862 S1400 848 1600 870" />
          </g>

          <HeroPlano />

          {/* Disipación en reposo: anillos tenues y constantes */}
          <g
            transform={`translate(${TIERRA[0]} ${TIERRA[1]})`}
            stroke={cobre}
            strokeWidth="1"
            opacity="0.3"
            {...linea}
          >
            <ellipse rx="70" ry="22" />
            <ellipse rx="140" ry="44" />
            <ellipse rx="215" ry="68" />
            <ellipse rx="295" ry="93" />
          </g>

          {/* Disipación activa: se enciende con cada descarga */}
          <g
            transform={`translate(${TIERRA[0]} ${TIERRA[1]})`}
            filter="url(#hs-brillo)"
          >
            {[0, 1, 2, 3].map((i) => (
              <ellipse
                key={i}
                data-anillo
                rx="300"
                ry="94"
                stroke="#ff9a4d"
                strokeWidth="1.6"
                opacity="0"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                {...linea}
              />
            ))}
          </g>
          <g data-electrodo-on opacity="0">
            <circle cx={TIERRA[0]} cy="650" r="120" fill="url(#hs-calor)" />
          </g>

          {/* ── El sistema ── */}
          {/* Bajante */}
          <path
            d={`M${X} 350 V590`}
            stroke={cobre}
            strokeWidth="1.6"
            {...linea}
          />
          <g stroke={cobre} strokeWidth="1.2" opacity="0.8" {...linea}>
            <path d={`M${X - 6} 400 h12 M${X - 6} 470 h12 M${X - 6} 530 h12`} />
          </g>
          {/* Punta: mástil corto, cuerpo central y tres laterales */}
          <path
            d={`M${X} 350 V292`}
            stroke="#c9d6e8"
            strokeWidth="1.6"
            {...linea}
          />
          <path
            d={`M${X - 3.5} 292 L${X} 262 L${X + 3.5} 292 Z`}
            fill="#e6edf7"
            stroke="#e6edf7"
            strokeWidth="0.6"
          />
          <path
            d={`M${X} 296 l-11 -9 M${X} 296 l11 -9 M${X} 298 l0 -10`}
            stroke="#c9d6e8"
            strokeWidth="1.2"
            {...linea}
          />
          <rect
            x={X - 4.5}
            y="298"
            width="9"
            height="5"
            rx="1"
            fill="#f2c21d"
          />
          {/* Electrodo: cabeza azul, tres patas de cobre y cono */}
          <rect
            x={X - 8}
            y="590"
            width="16"
            height="15"
            rx="2"
            fill="#2a6fd6"
          />
          <path
            d={`M${X - 20} 605 H${X + 20} M${X - 18} 605 L${X - 3} 676 M${X + 18} 605 L${X + 3} 676 M${X} 605 V676`}
            stroke={cobre}
            strokeWidth="1.6"
            {...linea}
          />
          <path d={`M${X - 7} 676 H${X + 7} L${X} 694 Z`} fill={cobre} />

          {/* Pulso de energía bajo control */}
          <path
            data-pulso
            d={RECORRIDO}
            stroke="#ffb066"
            strokeWidth="3.2"
            strokeLinecap="round"
            opacity="0"
            filter="url(#hs-brillo)"
            {...linea}
          />
          <circle
            data-destello
            cx={PUNTA[0]}
            cy={PUNTA[1]}
            r="26"
            fill="url(#hs-destello)"
            opacity="0"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />

          {/* Anotaciones técnicas: salen hacia la derecha, nunca hacia los textos.
              Escritorio y celular llevan su propia talla de letra. */}
          {notas("hs-notas", 13, 11, 1.6, 224, 44)}
          {notas("hs-notas-movil", 17, 13, 1.1, 228, 52)}
        </g>
      </svg>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
    </div>
  );
}
