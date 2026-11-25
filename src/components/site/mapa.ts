/*
 * Navegación del sitio, según contexto/estructura-sitio.md.
 * Una sola fuente para el menú y el pie de página.
 *
 * Pendiente de decisión (no se listan hasta confirmarse):
 * - /soluciones/supresores (decisión 9: no aparece en el material oficial del cliente)
 */

export type Enlace = { titulo: string; href: string; nota?: string };
export type Seccion = Enlace & { resumen?: string; hijos?: Enlace[] };

export const MENU: Seccion[] = [
  {
    titulo: "Soluciones",
    href: "/soluciones",
    resumen: "Protección eléctrica para las necesidades de su instalación.",
    hijos: [
      {
        titulo: "Puesta a tierra",
        href: "/soluciones/puesta-a-tierra",
        nota: "Tierras físicas para personas, equipos y operación",
      },
      {
        titulo: "Pararrayos",
        href: "/soluciones/pararrayos",
        nota: "De la captación a la tierra",
      },
      {
        titulo: "Estudios y medición",
        href: "/soluciones/estudios-y-medicion",
        nota: "Conozca las condiciones de su instalación",
      },
      {
        titulo: "Ingeniería e instalación",
        href: "/soluciones/ingenieria-e-instalacion",
        nota: "De la necesidad a una solución instalada",
      },
    ],
  },
  {
    titulo: "Cumplimiento",
    href: "/cumplimiento",
    resumen:
      "Estudio, instalación, dictamen y garantía con un solo responsable.",
    hijos: [
      {
        titulo: "NOM-022-STPS",
        href: "/cumplimiento/nom-022-stps",
        nota: "Qué exige y cómo se cumple",
      },
      {
        titulo: "Dictamen UVIE",
        href: "/cumplimiento/dictamen-uvie",
        nota: "Firma de verificador acreditado",
      },
      {
        titulo: "Recibí un levantamiento",
        href: "/cumplimiento/recibi-un-levantamiento",
        nota: "Qué hacer con las observaciones",
      },
    ],
  },
  {
    titulo: "Sectores",
    href: "/sectores",
    resumen: "Entendemos lo que su operación necesita proteger.",
    hijos: [
      { titulo: "Industria y manufactura", href: "/sectores/industria" },
      { titulo: "Hotelería", href: "/sectores/hoteleria" },
      { titulo: "Hospitales y clínicas", href: "/sectores/salud" },
      {
        titulo: "Telecomunicaciones y centros de datos",
        href: "/sectores/telecom-y-centros-de-datos",
      },
      {
        titulo: "Construcción e infraestructura",
        href: "/sectores/construccion",
      },
      {
        titulo: "Comercio y servicios",
        href: "/sectores/comercio-y-servicios",
      },
      { titulo: "Residencial", href: "/sectores/residencial" },
      { titulo: "Minería", href: "/sectores/mineria" },
    ],
  },
  {
    titulo: "Tecnología",
    href: "/tecnologia",
    resumen: "Electrodo Magneto Activo patentado.",
    hijos: [
      {
        titulo: "Productos",
        href: "/tecnologia/productos",
        nota: "Electrodos MTK, punta MTPP02 y acondicionador MTAT02",
      },
      {
        titulo: "Comparativo",
        href: "/tecnologia/comparativo",
        nota: "Frente al sistema tradicional",
      },
      {
        titulo: "Garantía",
        href: "/tecnologia/garantia",
        nota: "Desempeño por escrito",
      },
    ],
  },
  { titulo: "Proyectos", href: "/proyectos" },
  {
    titulo: "Recursos",
    href: "/recursos",
    resumen: "Entienda su instalación y decida con información.",
    hijos: [
      {
        titulo: "Centro de conocimiento",
        href: "/recursos/centro-de-conocimiento",
      },
      { titulo: "Biblioteca técnica", href: "/recursos/biblioteca-tecnica" },
      {
        titulo: "Preguntas frecuentes",
        href: "/recursos/preguntas-frecuentes",
      },
      { titulo: "Capacitación", href: "/recursos/capacitacion" },
    ],
  },
  { titulo: "Empresa", href: "/empresa" },
];

export const CONTACTO = {
  conmutador: "+52 33 3627 3226",
  whatsapp: "+52 33 1043 3045",
  correos: ["ventas@massatierra.com.mx", "contacto@massatierra.com.mx"],
  direccion: [
    "Calz. San Juan No. 64, Col. Ciudad Granja",
    "C.P. 45010, Zapopan, Jalisco",
  ],
  horario: "Lunes a viernes, 9:00 a 18:00",
  oficinas: ["México", "Chile", "Perú"],
};
