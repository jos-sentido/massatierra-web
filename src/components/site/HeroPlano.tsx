/*
 * Elevación esquemática de una subestación, dibujada como plano eléctrico:
 * pórtico de celosía, transformador de potencia con radiadores y boquillas,
 * generador de emergencia en su gabinete y tablero de media tensión.
 * Tres grosores de línea (contorno, detalle, achurado), ejes, cotas, niveles,
 * cimentación en línea punteada y achurado de terreno. Esquema sin escala:
 * no lleva medidas para no publicar datos que nadie midió.
 *
 * Coordenadas del viewBox del hero (1600 × 900). El sistema de pararrayos baja
 * por la cara exterior de la columna derecha del pórtico (x = 1330), cargado a
 * la derecha para dejar libre la columna de textos.
 */

const SUELO = 560;
const TRABE_A = 352; // cuerda superior del pórtico
const TRABE_B = 372; // cuerda inferior
const CL = 1060; // columna izquierda
const CR = 1318; // columna derecha (la bajante va por su cara exterior)
const X1 = 1570;

const TRAZO = "#8fa6c7";
const FONDO = "#081529";
const ne = { vectorEffect: "non-scaling-stroke" as const, fill: "none" };
const mono = "var(--font-mono, ui-monospace), monospace";

const rango = (a: number, b: number, paso: number) => {
  const r: number[] = [];
  for (let v = a; v <= b + 0.01; v += paso) r.push(v);
  return r;
};

/** Columna de celosía: dos montantes y diagonales en zigzag. */
function columna(cx: number, arriba: number, abajo: number) {
  const a = cx - 7;
  const b = cx + 7;
  const zig = rango(arriba, abajo - 20, 20)
    .map((y, i) =>
      i % 2 ? `M${b} ${y} L${a} ${y + 20}` : `M${a} ${y} L${b} ${y + 20}`,
    )
    .join(" ");
  return { montantes: `M${a} ${abajo} V${arriba} M${b} ${abajo} V${arriba} M${a} ${arriba} H${b}`, zig };
}

const EJES = [CL, 1190, CR, 1478];
const FASES = [1150, 1190, 1230];

export default function HeroPlano() {
  const izq = columna(CL, TRABE_A, SUELO);
  const der = columna(CR, TRABE_A, SUELO);
  const trabeZig = rango(CL + 7, CR - 27, 20)
    .map((x, i) =>
      i % 2
        ? `M${x} ${TRABE_B} L${x + 20} ${TRABE_A}`
        : `M${x} ${TRABE_A} L${x + 20} ${TRABE_B}`,
    )
    .join(" ");

  return (
    <g>
      {/* ───────── Torre de transmisión, al fondo ───────── */}
      <g stroke={TRAZO} strokeWidth="0.8" opacity="0.3" {...ne}>
        <path d="M604 560 L634 300 M676 560 L646 300 M634 300 H646" />
        <path d="M607 530 L673 530 M610 500 L670 500 M614 470 L666 470 M618 438 L662 438 M622 404 L658 404 M626 370 L654 370 M630 336 L650 336" />
        <path d="M607 530 L670 500 M673 530 L610 500 M610 500 L666 470 M670 500 L614 470 M614 470 L662 438 M666 470 L618 438 M618 438 L658 404 M662 438 L622 404 M622 404 L654 370 M658 404 L626 370 M626 370 L650 336 M654 370 L630 336" />
        <path d="M596 348 H684 M604 348 L634 330 M676 348 L646 330 M590 404 H690 M598 404 L626 388 M682 404 L654 388" />
        <path d="M596 348 v9 M684 348 v9 M590 404 v9 M690 404 v9 M640 300 V282" />
        {/* Línea que llega a la subestación */}
        <path
          d={`M684 357 Q880 430 ${CL - 7} ${TRABE_A + 6}`}
          strokeDasharray="1 5"
          opacity="0.7"
        />
      </g>

      {/* ───────── Generador de emergencia en gabinete ───────── */}
      <path d="M898 548 V478 H1026 V548 Z" fill={FONDO} opacity="0.94" />
      <g stroke={TRAZO} {...ne}>
        <g strokeWidth="1.4" opacity="0.9">
          <path d="M898 548 V478 H1026 V548" />
          <path d="M890 548 H1034 V560 M890 548 V560" />
        </g>
        <g strokeWidth="0.9" opacity="0.75">
          {/* Puertas de servicio */}
          <path d="M956 488 H986 V542 H956 Z M990 488 H1020 V542 H990 Z" />
          <path d="M981 512 v8 M995 512 v8" strokeWidth="1.4" />
          {/* Silenciador y escape */}
          <path d="M954 478 V468 H1000 V478 M954 468 C950 468 950 478 954 478 M1000 468 C1004 468 1004 478 1000 478" />
          <path d="M1012 478 V446 M1005 446 H1019 L1016 440 H1008 Z" />
        </g>
        <g strokeWidth="0.6" opacity="0.55">
          {/* Persiana de admisión */}
          <path d="M906 488 H946 V540 H906 Z" />
          <path
            d={rango(494, 536, 6)
              .map((y) => `M908 ${y} H944`)
              .join(" ")}
          />
          {/* Patines */}
          <path d="M900 556 h10 M1014 556 h10" strokeWidth="1.2" />
        </g>
      </g>

      {/* ───────── Pórtico de la subestación ───────── */}
      <g stroke={TRAZO} {...ne}>
        <g strokeWidth="1.4" opacity="0.95">
          <path d={izq.montantes} />
          <path d={der.montantes} />
          <path d={`M${CL - 7} ${TRABE_A} H${CR + 7} M${CL + 7} ${TRABE_B} H${CR - 7}`} />
        </g>
        <g strokeWidth="0.6" opacity="0.5">
          <path d={izq.zig} />
          <path d={der.zig} />
          <path d={trabeZig} />
        </g>
        {/* Herraje que sujeta el mástil a la columna derecha */}
        <path
          d={`M${CR + 7} 356 H1334 M${CR + 7} 368 H1334`}
          strokeWidth="1.2"
          opacity="0.9"
        />
      </g>

      {/* ───────── Cadenas de aisladores y bajadas a las boquillas ───────── */}
      <g stroke={TRAZO} {...ne}>
        {FASES.map((x) => (
          <g key={x}>
            <path d={`M${x} ${TRABE_B} V398`} strokeWidth="0.9" opacity="0.8" />
            <g strokeWidth="0.9" opacity="0.85">
              {[378, 384, 390, 396].map((y) => (
                <ellipse key={y} cx={x} cy={y} rx="5" ry="1.6" />
              ))}
            </g>
            <path
              d={`M${x} 398 C${x - 7} 402 ${x - 7} 407 ${x} 410`}
              strokeWidth="1"
              opacity="0.8"
            />
          </g>
        ))}
      </g>

      {/* ───────── Transformador de potencia ───────── */}
      <path d="M1120 538 V452 H1260 V538 Z" fill={FONDO} opacity="0.94" />
      <g stroke={TRAZO} {...ne}>
        <g strokeWidth="1.5" opacity="0.95">
          <path d="M1120 538 V452 H1260 V538 Z" />
          {/* Base de concreto */}
          <path d="M1110 538 H1270 V560 M1110 538 V560" />
        </g>
        <g strokeWidth="0.9" opacity="0.8">
          {/* Radiadores a cada lado */}
          <path d="M1094 466 H1120 M1094 526 H1120 M1260 466 H1286 M1260 526 H1286" />
          <path d="M1094 466 V526 M1286 466 V526" />
          {/* Boquillas de alta tensión */}
          {FASES.map((x) => (
            <g key={x}>
              <path d={`M${x - 3} 452 V412 M${x + 3} 452 V412`} />
              <path
                d={[418, 426, 434, 442]
                  .map((y) => `M${x - 7} ${y} H${x + 7}`)
                  .join(" ")}
              />
              <circle cx={x} cy="410" r="2" />
            </g>
          ))}
          {/* Tanque conservador */}
          <path d="M1244 428 H1282 M1244 442 H1282 M1244 428 C1238 428 1238 442 1244 442 M1282 428 C1288 428 1288 442 1282 442 M1252 442 V452 M1274 442 V466" />
          {/* Placa de datos y refuerzos del tanque */}
          <path d="M1176 486 H1204 V502 H1176 Z" />
        </g>
        <g strokeWidth="0.6" opacity="0.5">
          <path
            d={rango(1097, 1117, 4)
              .map((x) => `M${x} 466 V526`)
              .join(" ")}
          />
          <path
            d={rango(1263, 1283, 4)
              .map((x) => `M${x} 466 V526`)
              .join(" ")}
          />
          <path d="M1120 470 H1260 M1120 520 H1260" />
          <path d="M1180 491 H1200 M1180 496 H1196" />
        </g>
      </g>

      {/* ───────── Tablero de media tensión ───────── */}
      <path d="M1400 560 V494 H1556 V560 Z" fill={FONDO} opacity="0.94" />
      <g stroke={TRAZO} {...ne}>
        <g strokeWidth="1.4" opacity="0.9">
          <path d="M1400 560 V494 H1556 V560" />
          <path d="M1396 494 H1560" />
        </g>
        <g strokeWidth="0.9" opacity="0.75">
          <path d="M1452 494 V560 M1504 494 V560" />
          {[1400, 1452, 1504].map((x) => (
            <path key={x} d={`M${x + 7} 512 H${x + 45} V554 H${x + 7} Z`} />
          ))}
          <path
            d="M1444 528 v10 M1496 528 v10 M1548 528 v10"
            strokeWidth="1.4"
          />
        </g>
        <g strokeWidth="0.6" opacity="0.55">
          <path
            d={[1400, 1452, 1504]
              .map((x) => `M${x + 9} 500 H${x + 43} M${x + 9} 505 H${x + 43}`)
              .join(" ")}
          />
          {[1400, 1452, 1504].map((x) => (
            <circle key={x} cx={x + 16} cy="520" r="2.2" />
          ))}
        </g>
      </g>

      {/* ───────── Ejes, cotas y niveles ───────── */}
      <g stroke={TRAZO} {...ne} opacity="0.3">
        <g strokeWidth="0.7" strokeDasharray="16 4 2 4">
          {EJES.map((x) => (
            <path key={x} d={`M${x} 300 V600`} />
          ))}
        </g>
        <g strokeWidth="0.9">
          {/* Cadena de cotas entre ejes, con trazo a 45° */}
          <path d={`M${CL} 316 H${CR}`} />
          <path
            d={[CL, 1190, CR]
              .map((x) => `M${x - 5} 321 L${x + 5} 311`)
              .join(" ")}
            strokeWidth="1.3"
          />
          {/* Niveles: terreno y trabe */}
          <path
            d={`M${X1 + 10} ${SUELO} H${X1 + 28} M${X1 + 10} ${TRABE_A} H${X1 + 28}`}
          />
          <path d={`M${X1 + 19} ${TRABE_A} V${SUELO}`} strokeWidth="0.6" />
          {[SUELO, TRABE_A].map((y) => (
            <path
              key={y}
              d={`M${X1 + 14} ${y - 7} H${X1 + 24} L${X1 + 19} ${y} Z`}
              fill={TRAZO}
              stroke="none"
            />
          ))}
        </g>
      </g>

      {/* ───────── Terreno: cimentación y achurado ───────── */}
      <g
        stroke={TRAZO}
        strokeWidth="0.8"
        strokeDasharray="5 4"
        opacity="0.4"
        {...ne}
      >
        {[CL, CR].map((x) => (
          <path
            key={x}
            d={`M${x - 9} ${SUELO} V574 H${x - 22} V588 H${x + 22} V574 H${x + 9} V${SUELO}`}
          />
        ))}
        <path d="M1110 560 V574 H1270 V560 M890 560 V570 H1034 V560 M1396 560 V570 H1560 V560" />
        {/* Ducto subterráneo del generador al tablero */}
        <path d="M1026 566 V600 H1404 V570" opacity="0.6" />
      </g>
      <path
        d={`M0 ${SUELO} H1600`}
        stroke="#c9d6e8"
        strokeWidth="1.3"
        opacity="0.6"
        {...ne}
      />
      {/* Símbolo de terreno natural: grupos de tres rayas a 45° */}
      <g stroke={TRAZO} strokeWidth="0.8" opacity="0.38" {...ne}>
        <path
          d={[520, 700, 840, 1076, 1366, 1576]
            .map(
              (x) =>
                `M${x} 560 l-10 12 M${x + 7} 560 l-10 12 M${x + 14} 560 l-10 12 M${x - 8} 574 h20`,
            )
            .join(" ")}
        />
      </g>

      {/* Pie de plano */}
      <g
        fontFamily={mono}
        fill={TRAZO}
        opacity="0.5"
        fontSize="10"
        letterSpacing="1.5"
        textAnchor="end"
      >
        <text x={CR - 24} y="616">
          ELEVACIÓN ESQUEMÁTICA · SIN ESCALA
        </text>
      </g>
    </g>
  );
}
