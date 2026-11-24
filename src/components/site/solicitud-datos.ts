/*
 * Opciones de la solicitud de diagnóstico. Una sola fuente para los dos formatos
 * (guiada y formulario), para que ambos guarden exactamente los mismos datos.
 */

export const ORIENTACION = "Orientación para definir la solución";

export const LEVANTAMIENTO = ["Sí, ya lo tengo", "No", "No estoy seguro"];
export const CON_LEVANTAMIENTO = "Sí, ya lo tengo";

export const REVISO = [
  "Protección Civil",
  "STPS",
  "Una unidad verificadora",
  "Otro",
];

export const PLAZO = ["Sí, tengo fecha", "No", "No lo sé"];

export const SECTORES = [
  "Industria y manufactura",
  "Hotelería",
  "Hospital o clínica",
  "Telecom o centro de datos",
  "Construcción",
  "Comercio y servicios",
  "Minería",
  "Otra",
];

export const ETAPAS = ["Obra nueva", "Ampliación", "Ya está operando"];

export const CANALES = ["WhatsApp", "Llamada"];

/**
 * Se pueden pedir varias soluciones a la vez (p. ej. puesta a tierra y
 * pararrayos). «Orientación» es la excepción: significa «no sé qué necesito»,
 * así que excluye a las demás y viceversa.
 */
export function alternar(lista: string[], titulo: string): string[] {
  if (lista.includes(titulo)) return lista.filter((t) => t !== titulo);
  if (titulo === ORIENTACION) return [ORIENTACION];
  return [...lista.filter((t) => t !== ORIENTACION), titulo];
}
