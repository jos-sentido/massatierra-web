"use client";

import { useEffect, useRef } from "react";

/** Punto en coordenadas del video, de 0 a 1. */
type P = [number, number];

export type Sistema = {
  /** Proporción ancho/alto del video. */
  aspecto: number;
  /** Mismo encuadre que el video: object-position en fracción (0–1). */
  posicion: P;
  /** Extremo de la punta pararrayos: ahí termina siempre el rayo. */
  punta: P;
  /** Recorrido de la energía: de la punta, por la bajante, hasta el electrodo. */
  recorrido: P[];
  /** Centro de la disipación en el terreno. */
  tierra: P;
  /** Altura del horizonte: un clic por debajo nace en el cielo, encima del clic. */
  horizonte: number;
};

type Props = {
  horizontal: Sistema;
  vertical: Sistema;
  className?: string;
};

const NS = "http://www.w3.org/2000/svg";

function el<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | number>,
) {
  const n = document.createElementNS(NS, tag);
  for (const k in attrs) n.setAttribute(k, String(attrs[k]));
  return n;
}

/** Rayo quebrado entre dos puntos (desplazamiento del punto medio). */
function quebrado(a: P, b: P, rugosidad: number, niveles = 5): P[] {
  let pts: P[] = [a, b];
  let amp = Math.hypot(b[0] - a[0], b[1] - a[1]) * rugosidad;
  for (let i = 0; i < niveles; i++) {
    const out: P[] = [];
    for (let j = 0; j < pts.length - 1; j++) {
      const [x1, y1] = pts[j];
      const [x2, y2] = pts[j + 1];
      const nx = -(y2 - y1);
      const ny = x2 - x1;
      const l = Math.hypot(nx, ny) || 1;
      const d = (Math.random() - 0.5) * amp;
      out.push(pts[j], [
        (x1 + x2) / 2 + (nx / l) * d,
        (y1 + y2) / 2 + (ny / l) * d,
      ]);
    }
    out.push(pts[pts.length - 1]);
    pts = out;
    amp *= 0.55;
  }
  return pts;
}

const linea = (pts: P[]) =>
  pts
    .map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`)
    .join(" ");

/**
 * Capa interactiva sobre el video del hero.
 * Un clic en el cielo crea un rayo que SIEMPRE termina en la punta; desde ahí la
 * energía baja por la conducción y se disipa en el electrodo. Nunca sale del sistema.
 * Va dentro de un contenedor `relative` que cubre el mismo recuadro que el video.
 */
export default function RayoAlSistema({
  horizontal,
  vertical,
  className = "",
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const zona = svg?.parentElement;
    if (!svg || !zona) return;
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqV = window.matchMedia("(max-aspect-ratio: 4/5)");

    const caer = (ev: PointerEvent) => {
      if (quieto.matches) return;
      // Los botones y enlaces del hero siguen funcionando normal.
      if (
        (ev.target as Element).closest("a,button,input,textarea,select,label")
      )
        return;

      const r = zona.getBoundingClientRect();
      const W = r.width;
      const H = r.height;
      const s = mqV.matches ? vertical : horizontal;

      // Mismo cálculo que object-fit: cover + object-position del video.
      const escala = Math.max(W / s.aspecto, H);
      const vw = s.aspecto * escala;
      const vh = escala;
      const ox = (W - vw) * s.posicion[0];
      const oy = (H - vh) * s.posicion[1];
      const px = (p: P): P => [ox + p[0] * vw, oy + p[1] * vh];

      const punta = px(s.punta);
      const suelo = oy + s.horizonte * vh;
      let origen: P = [ev.clientX - r.left, ev.clientY - r.top];
      // Un rayo no nace bajo tierra ni por debajo de la punta: sube al cielo.
      if (origen[1] > Math.min(suelo, punta[1]) - 24)
        origen = [origen[0], Math.max(8, punta[1] * 0.25)];

      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      const g = el("g", {});
      svg.appendChild(g);
      const limpiar = () => g.remove();

      // 1 · Rayo: del clic a la punta.
      const tronco = quebrado(origen, punta, 0.22);
      const d = linea(tronco);
      const halo = el("path", {
        d,
        fill: "none",
        stroke: "#ffd27a",
        "stroke-width": 9,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        opacity: 0.35,
        filter: "url(#rayo-brillo)",
      });
      const nucleo = el("path", {
        d,
        fill: "none",
        stroke: "#fffbe8",
        "stroke-width": 2.4,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        filter: "url(#rayo-brillo)",
      });
      g.append(halo, nucleo);
      // Ramas cortas que se apagan en el aire: el tronco es el único que llega.
      for (let i = 0; i < 2; i++) {
        const a = tronco[Math.floor(tronco.length * (0.25 + 0.3 * i))];
        const largo = 40 + Math.random() * 70;
        const b: P = [
          a[0] + (Math.random() - 0.5) * largo * 1.6,
          a[1] + largo * 0.6,
        ];
        if (b[1] < punta[1] - 10) {
          const rama = el("path", {
            d: linea(quebrado(a, b, 0.3, 3)),
            fill: "none",
            stroke: "#fff3c4",
            "stroke-width": 1.2,
            "stroke-linecap": "round",
            opacity: 0.8,
          });
          g.append(rama);
          rama.animate([{ opacity: 0.8 }, { opacity: 0 }], {
            duration: 260,
            delay: 90,
            fill: "forwards",
          });
        }
      }
      const largoRayo = nucleo.getTotalLength();
      for (const p of [halo, nucleo]) {
        p.setAttribute("stroke-dasharray", String(largoRayo));
        p.animate([{ strokeDashoffset: largoRayo }, { strokeDashoffset: 0 }], {
          duration: 110,
          easing: "ease-in",
          fill: "both",
        });
        p.animate(
          [{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }, { opacity: 0 }],
          {
            duration: 420,
            delay: 110,
            fill: "forwards",
          },
        );
      }

      // Destello en la punta.
      const flash = el("circle", {
        cx: punta[0],
        cy: punta[1],
        r: 26,
        fill: "url(#rayo-destello)",
        opacity: 0,
      });
      g.append(flash);
      flash.animate(
        [
          { opacity: 0, transform: "scale(0.4)" },
          { opacity: 1, transform: "scale(1.5)" },
          { opacity: 0, transform: "scale(2.2)" },
        ],
        { duration: 480, delay: 90, easing: "ease-out", fill: "forwards" },
      );
      flash.style.transformOrigin = `${punta[0]}px ${punta[1]}px`;

      // 2 · Conducción: la energía baja por el sistema.
      const camino = el("path", {
        d: linea(s.recorrido.map(px)),
        fill: "none",
        stroke: "#ffb066",
        "stroke-width": 5,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        filter: "url(#rayo-brillo)",
        opacity: 0,
      });
      g.append(camino);
      const largo = camino.getTotalLength();
      const tramo = Math.min(90, largo * 0.3);
      camino.setAttribute("stroke-dasharray", `${tramo} ${largo + tramo}`);
      const T_BAJA = 620;
      camino.animate(
        [
          { strokeDashoffset: tramo, opacity: 1 },
          { strokeDashoffset: -largo, opacity: 1 },
        ],
        {
          duration: T_BAJA,
          delay: 150,
          easing: "cubic-bezier(.45,0,.3,1)",
          fill: "forwards",
        },
      );
      camino.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 120,
        delay: 150 + T_BAJA,
        fill: "forwards",
      });

      // 3 · Disipación: anillos en el terreno.
      const t = px(s.tierra);
      const rx = vw * 0.09;
      let ultimo: Animation | undefined;
      for (let i = 0; i < 3; i++) {
        const anillo = el("ellipse", {
          cx: t[0],
          cy: t[1],
          rx,
          ry: rx * 0.3,
          fill: "none",
          stroke: "#ff9a4d",
          "stroke-width": 2.5,
          opacity: 0,
          filter: "url(#rayo-brillo)",
        });
        anillo.style.transformOrigin = `${t[0]}px ${t[1]}px`;
        g.append(anillo);
        ultimo = anillo.animate(
          [
            { opacity: 0.95, transform: "scale(0.15)" },
            { opacity: 0, transform: "scale(1.9)" },
          ],
          {
            duration: 900,
            delay: 150 + T_BAJA - 60 + i * 170,
            easing: "ease-out",
            fill: "forwards",
          },
        );
      }
      if (ultimo) ultimo.onfinish = limpiar;
      else limpiar();
    };

    zona.addEventListener("pointerdown", caer);
    return () => zona.removeEventListener("pointerdown", caer);
  }, [horizontal, vertical]);

  return (
    <svg
      ref={svgRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="rayo-brillo" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="rayo-destello">
          <stop offset="0" stopColor="#fffbe8" />
          <stop offset="0.35" stopColor="#ffd27a" stopOpacity="0.8" />
          <stop offset="1" stopColor="#ffd27a" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
