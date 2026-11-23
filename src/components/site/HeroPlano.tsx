/*
 * Elevación esquemática de la planta, dibujada como plano industrial:
 * tres grosores de línea (contorno, detalle, achurado), ejes con burbuja, cadena de
 * cotas, niveles, lámina acanalada, cimentación en línea punteada y achurado de terreno.
 * Es un esquema sin escala: no lleva medidas para no publicar datos que nadie midió.
 *
 * Coordenadas del viewBox del hero (1600 × 900). El muro izquierdo de la nave (x = 1020)
 * es el eje del sistema de pararrayos.
 */

const SUELO = 560;
const ALERO = 350;
const CUMBRERA = 326;
const X0 = 1020;
const X1 = 1570;

const TRAZO = "#8fa6c7";
const ne = { vectorEffect: "non-scaling-stroke" as const, fill: "none" };
const mono = "var(--font-mono, ui-monospace), monospace";

const rango = (a: number, b: number, paso: number) => {
  const r: number[] = [];
  for (let v = a; v <= b + 0.01; v += paso) r.push(v);
  return r;
};

const EJES = [1157.5, 1295, 1432.5, 1570];

export default function HeroPlano() {
  return (
    <g>
      {/* ───────── Torre de transmisión, al fondo ───────── */}
      <g stroke={TRAZO} strokeWidth="0.8" opacity="0.34" {...ne}>
        <path d="M604 560 L634 300 M676 560 L646 300 M634 300 H646" />
        <path d="M607 530 L673 530 M610 500 L670 500 M614 470 L666 470 M618 438 L662 438 M622 404 L658 404 M626 370 L654 370 M630 336 L650 336" />
        <path d="M607 530 L670 500 M673 530 L610 500 M610 500 L666 470 M670 500 L614 470 M614 470 L662 438 M666 470 L618 438 M618 438 L658 404 M662 438 L622 404 M622 404 L654 370 M658 404 L626 370 M626 370 L650 336 M654 370 L630 336" />
        <path d="M596 348 H684 M604 348 L634 330 M676 348 L646 330 M590 404 H690 M598 404 L626 388 M682 404 L654 388" />
        <path d="M596 348 v9 M684 348 v9 M590 404 v9 M690 404 v9 M640 300 V282" />
        <path
          d="M684 357 Q850 430 1016 300"
          strokeDasharray="1 5"
          opacity="0.7"
        />
      </g>

      {/* ───────── Patio de equipos: tanque horizontal, silo y rack de tuberías ───────── */}
      <g stroke={TRAZO} {...ne}>
        {/* Tanque horizontal sobre silletas */}
        <g strokeWidth="1.1" opacity="0.7">
          <path d="M772 516 H852 M772 548 H852 M772 516 C760 516 760 548 772 548 M852 516 C864 516 864 548 852 548" />
          <path d="M786 548 L782 560 H796 L792 548 M832 548 L828 560 H842 L838 548" />
        </g>
        <g strokeWidth="0.7" opacity="0.45">
          <path
            d="M772 516 C778 516 778 548 772 548 M852 516 C846 516 846 548 852 548 M812 516 V506 M806 506 H818 M750 532 H874"
            strokeDasharray="10 3 2 3"
          />
        </g>

        {/* Silo vertical sobre estructura */}
        <g strokeWidth="1.2" opacity="0.8">
          <path d="M912 404 V498 M968 404 V498 M912 498 L934 528 H946 L968 498 M912 498 H968" />
          <path d="M912 404 C912 388 968 388 968 404" />
          <path d="M912 404 H968" strokeWidth="0.7" />
          <path d="M908 490 V560 M972 490 V560 M908 490 H972" />
        </g>
        <g strokeWidth="0.7" opacity="0.5">
          <path d="M908 512 L972 548 M972 512 L908 548 M908 548 H972 M908 512 H972" />
          <path d="M940 528 V542 M934 542 H946" />
          <path d="M912 428 H968 M912 452 H968 M912 476 H968" opacity="0.6" />
          {/* escalera marina del silo */}
          <path d="M974 404 V560 M982 404 V560" />
          <path
            d={rango(412, 556, 9)
              .map((y) => `M974 ${y} H982`)
              .join(" ")}
          />
          {/* eje del silo */}
          <path d="M940 376 V560" strokeDasharray="10 3 2 3" opacity="0.7" />
          <path d="M940 392 V382 M934 382 H946" />
        </g>

        {/* Rack de tuberías hacia la nave */}
        <g strokeWidth="0.9" opacity="0.65">
          <path d="M968 440 H1004 V468 M968 446 H998 V468" />
          <path d="M852 524 H892 V470 H908 M852 530 H898 V476 H908" />
          <path
            d="M986 437 V449 M876 521 V533 M895 500 H889"
            strokeWidth="1.4"
          />
          <path d="M996 468 H1012 M1004 468 V560 M998 560 H1010" />
        </g>
      </g>

      {/* ───────── Nave industrial ───────── */}
      {/* Masa del edificio: tapa lo que queda detrás */}
      <path
        d={`M${X0} ${SUELO} V${ALERO} L${X0 + 22} ${CUMBRERA} H${X1 - 22} L${X1} ${ALERO} V${SUELO} Z`}
        fill="#081529"
        opacity="0.94"
      />

      {/* Achurado: lámina acanalada en muro y cubierta */}
      <g stroke={TRAZO} strokeWidth="0.5" opacity="0.16" {...ne}>
        <path
          d={rango(X0 + 11, X1 - 6, 11)
            .map((x) => `M${x} ${ALERO + 6} V520`)
            .join(" ")}
        />
        <path
          d={rango(X0 + 30, X1 - 30, 13)
            .map((x) => `M${x} ${CUMBRERA} L${x - 4} ${ALERO}`)
            .join(" ")}
        />
      </g>

      <g stroke={TRAZO} {...ne}>
        {/* Contorno: línea gruesa */}
        <g strokeWidth="1.5" opacity="0.95">
          <path
            d={`M${X0} ${SUELO} V${ALERO} L${X0 + 22} ${CUMBRERA} H${X1 - 22} L${X1} ${ALERO} V${SUELO}`}
          />
          <path d={`M${X0 - 6} ${ALERO} H${X1 + 6}`} />
        </g>

        {/* Detalle: línea media */}
        <g strokeWidth="0.9" opacity="0.8">
          {/* Canalón y bajadas pluviales */}
          <path
            d={`M${X0 - 6} ${ALERO + 5} H${X1 + 6} M${X0 - 6} ${ALERO} V${ALERO + 5} M${X1 + 6} ${ALERO} V${ALERO + 5}`}
          />
          <path d="M1172 355 V372 L1178 380 V548 L1172 556 M1177 355 V370 L1183 378 V548 L1189 556" />
          <path d="M1447 355 V372 L1453 380 V548 L1447 556 M1452 355 V370 L1458 378 V548 L1464 556" />
          <path
            d="M1174 420 H1187 M1174 480 H1187 M1449 420 H1462 M1449 480 H1462"
            strokeWidth="1.3"
          />
          {/* Zócalo de concreto */}
          <path d={`M${X0} 520 H${X1}`} />
          {/* Extractores de cumbrera */}
          {[1130, 1295, 1460].map((x) => (
            <path
              key={x}
              d={`M${x - 9} ${CUMBRERA} V${CUMBRERA - 7} H${x + 9} V${CUMBRERA} M${x - 12} ${CUMBRERA - 7} C${x - 12} ${CUMBRERA - 21} ${x + 12} ${CUMBRERA - 21} ${x + 12} ${CUMBRERA - 7} M${x} ${CUMBRERA - 18} V${CUMBRERA - 7} M${x - 6} ${CUMBRERA - 16} V${CUMBRERA - 7} M${x + 6} ${CUMBRERA - 16} V${CUMBRERA - 7}`}
            />
          ))}
          {/* Ventanal corrido */}
          <path d="M1196 386 H1424 V428 H1196 Z M1193 428 H1427 M1193 431 H1427" />
          {/* Louver de ventilación */}
          <path d="M1058 388 H1128 V430 H1058 Z" />
          {/* Cortinas metálicas */}
          <path d="M1206 462 H1296 V560 M1206 462 V560 M1202 458 H1300 V462 M1202 458 V462" />
          <path d="M1326 462 H1416 V560 M1326 462 V560 M1322 458 H1420 V462 M1322 458 V462" />
          {/* Puerta de personal con marquesina */}
          <path d="M1488 504 H1516 V560 M1488 504 V560 M1482 498 H1522 L1526 502 M1482 498 V501" />
          <path d="M1510 532 h3" strokeWidth="1.4" />
          {/* Escalera marina con guarda */}
          <path d="M1540 352 V560 M1550 352 V560" />
          <path
            d="M1536 352 C1536 340 1554 340 1554 352 M1536 352 V470 M1554 352 V470 M1536 390 H1554 M1536 430 H1554 M1536 470 C1536 478 1554 478 1554 470"
            opacity="0.7"
          />
        </g>

        {/* Líneas finas */}
        <g strokeWidth="0.6" opacity="0.55">
          <path
            d={rango(1215, 1405, 19)
              .map((x) => `M${x} 386 V428`)
              .join(" ")}
          />
          <path d="M1196 407 H1424" />
          <path
            d={rango(393, 426, 5.5)
              .map((y) => `M1060 ${y} H1126`)
              .join(" ")}
          />
          <path
            d={rango(469, 554, 7)
              .map((y) => `M1208 ${y} H1294 M1328 ${y} H1414`)
              .join(" ")}
          />
          <path
            d={rango(360, 556, 9)
              .map((y) => `M1540 ${y} H1550`)
              .join(" ")}
          />
          <path d="M1494 512 H1510 V528 H1494 Z" />
          {/* Topes de protección */}
          <path
            d="M1200 560 V544 M1302 560 V544 M1320 560 V544 M1422 560 V544"
            strokeWidth="1.6"
          />
        </g>
        {/* Vidrio */}
        <path
          d="M1196 386 H1424 V428 H1196 Z"
          fill="#f2c98a"
          opacity="0.06"
          stroke="none"
        />
      </g>

      {/* ───────── Ejes, cotas y niveles ───────── */}
      <g stroke={TRAZO} {...ne} opacity="0.3">
        {/* Ejes: raya-punto con burbuja */}
        <g strokeWidth="0.7" strokeDasharray="16 4 2 4">
          {EJES.map((x) => (
            <path key={x} d={`M${x} 300 V600`} />
          ))}
        </g>
        <g strokeWidth="0.9">
          {/* Cadena de cotas entre ejes, con trazo a 45° */}
          <path d={`M${X0} 300 H${X1}`} />
          <path
            d={[X0, ...EJES]
              .map((x) => `M${x - 5} 305 L${x + 5} 295`)
              .join(" ")}
            strokeWidth="1.3"
          />
          <path d={`M${X0} 292 V308`} />
          {/* Niveles */}
          <path
            d={`M${X1 + 10} ${SUELO} H${X1 + 28} M${X1 + 10} ${ALERO} H${X1 + 28} M${X1 + 10} ${CUMBRERA} H${X1 + 28}`}
          />
          <path d={`M${X1 + 19} ${CUMBRERA} V${SUELO}`} strokeWidth="0.6" />
          {[SUELO, ALERO, CUMBRERA].map((y) => (
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
        {EJES.map((x) => (
          <path
            key={x}
            d={`M${x - 7} ${SUELO} V574 H${x - 20} V588 H${x + 20} V574 H${x + 7} V${SUELO}`}
          />
        ))}
        <path d="M900 560 V572 H980 V560 M1196 560 V568 H1426 V560" />
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
          d={[520, 700, 830, 1090, 1240, 1380, 1500]
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
        <text x={X1} y="612">
          ELEVACIÓN ESQUEMÁTICA · SIN ESCALA
        </text>
      </g>
    </g>
  );
}
