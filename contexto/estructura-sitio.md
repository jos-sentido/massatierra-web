# Estructura del sitio — mapa auditado

> Mapa del sitio nuevo. Parte del mapa del proveedor anterior
> ([`contenido-heredado.md`](contenido-heredado.md)), auditado contra
> [`brief.md`](brief.md), [`decisiones.md`](decisiones.md) y el
> [anexo de pauta](https://propuestas.sentido.mx/massatierra/google-ads).
>
> **Estado:** propuesta de Sentido, 2026-11-23. Falta validarla con Mauro. Lo marcado con 🚧
> no se escribe hasta que se cierre la decisión que se indica.

## Qué cambia respecto al mapa heredado

| | Cambio | Por qué |
|---|---|---|
| ➕ | **Sección nueva: Cumplimiento normativo** (NOM-022, dictamen UVIE, levantamientos) | Es el hueco más caro del contenido heredado y el destino de la campaña A1 del anexo de pauta |
| ➕ | **Productos con ficha técnica** (MTK, MTPP02, MTAT02) dentro de Tecnología | El heredado nunca nombra un modelo. La campaña B2 mide descargas de ficha técnica |
| ➕ | **Sector Minería** | Tiene cartera documentada (Codelco, Minera Escondida, Minera Candelaria) y el propio heredado la menciona en Proyectos, pero no le da página |
| ➕ | **Pregunta de origen en el formulario:** «¿Recibió recientemente un levantamiento o dictamen de cumplimiento?» | Lo pide el anexo de pauta para separar la demanda inducida de la comercial |
| ✏️ | La garantía y la cifra de 2 Ω | El heredado la suaviza a «objetivo de diseño menor a 2 Ω», y el brief dice «2 Ω garantizados por escrito». Ver la decisión 8 |
| ✏️ | Contacto sin «menos de dos horas» ni «gratuito» | Decisión 5. Mientras no se cierre, el copy no promete tiempos |
| ✏️ | Empresa con presencia en México · Chile · Perú | Son las oficinas del brief. El heredado solo dice «México y el extranjero» |
| ⏸️ | Academia Massatierra **no sale en el lanzamiento** como «Próximamente» | Una página vacía no suma. El brief dice que ya hay **capacitaciones con validez oficial**: si existen, sale como página real (ver la pregunta 4) |
| ⏸️ | El centro de conocimiento sale con lo que ya está escrito (4 artículos) | Los artículos nuevos de normativa son del módulo de Contenido (fase 2) |
| ❓ | Supresores de pico | Están en el heredado, pero en ningún material oficial del cliente (CV, brochure, deck). Se confirma antes de publicar (decisión 9) |

## Árbol de rutas

Las rutas van en español, sin acentos y en minúsculas. ⭐ = destino de campaña.

```
/                                   Inicio
│
├── /soluciones                     Hub de soluciones
│   ├── /puesta-a-tierra            Sistemas de puesta a tierra          ⭐ B2
│   ├── /pararrayos                 Sistemas de pararrayos (NMX-J549)    ⭐ B2
│   ├── /supresores                 Supresores de pico                   ❓ decisión 9
│   ├── /estudios-y-medicion        Estudios de tierras y resistividad   ⭐ A1/B1
│   └── /ingenieria-e-instalacion   Servicio integral
│
├── /cumplimiento                   ★ NUEVA — Cumplimiento normativo     ⭐ A1/B1
│   ├── /nom-022-stps               Qué exige y cómo se cumple           ⭐ B1
│   ├── /dictamen-uvie              Estudio → instalación → dictamen → garantía
│   └── /recibi-un-levantamiento    Para quien ya tiene una observación  ⭐ A1
│
├── /sectores
│   ├── /industria
│   ├── /hoteleria                  (aquí rinde el deck de hotelería)
│   ├── /salud
│   ├── /telecom-y-centros-de-datos
│   ├── /construccion
│   ├── /comercio-y-servicios
│   └── /mineria                    ★ NUEVA
│
├── /tecnologia                     Electrodo Magneto Activo · MassLink · patente
│   ├── /productos                  Línea MTK, MTPP02, MTAT02            ⭐ B2/B5
│   │   └── /[modelo]               Ficha + PDF descargable              🚧 fichas del cliente
│   ├── /comparativo                vs. «sistema tradicional»            ⭐ A3/B4
│   └── /garantia                   Garantía de desempeño 20 años        🚧 decisión 8
│
├── /proyectos                      Experiencia por sector               🚧 decisión 4 (logos)
│   └── /[caso]                     Hoy solo existe telecom Zapopan
│
├── /recursos
│   ├── /centro-de-conocimiento     Los 4 artículos del heredado
│   ├── /biblioteca-tecnica         Catálogo, fichas, patente, certificados
│   ├── /preguntas-frecuentes       11 del heredado + las de cumplimiento
│   └── /capacitacion               ❓ solo si hay oferta real (pregunta 4)
│
├── /empresa                        Quiénes somos, misión, visión, calidad, presencia
│
├── /contacto                       Diagnóstico y cotización → Firestore
│   └── /soporte                    Clientes existentes → Firestore
│
├── /aviso-de-privacidad            🚧 decisión 2 (razón social)
└── /terminos-de-garantia           🚧 decisiones 2 y 8
```

En total son unas 35 páginas. Las fichas por modelo son plantilla: una página que se alimenta de datos.

## La sección de cumplimiento, a detalle

Es la sección que cambia el negocio del sitio, así que va con más detalle.

**A quién le habla:** al responsable de mantenimiento, de seguridad e higiene o de la planta
que acaba de recibir un levantamiento de Protección Civil o de STPS y tiene que entregar
algo en regla. No está comparando electrodos: necesita un **dictamen**.

**Cómo habla:** en el idioma del documento que esa persona tiene en la mano (norma, observación,
dictamen, plazo), no en el del catálogo. El anexo de pauta pide replicar el lenguaje del
dictamen, y para eso hace falta **el formato de dictamen real** del cliente.

| Página | Qué responde | Qué ya tenemos | Qué falta |
|---|---|---|---|
| `/cumplimiento` | «Tengo que cumplir. ¿Quién me resuelve todo?» → la cadena completa con un solo responsable | La cadena estudio → instalación → dictamen UVIE → garantía y la cita del deck (lámina 24) | — |
| `/cumplimiento/nom-022-stps` | Qué pide la norma, cada cuánto y qué se entrega | El brief: «medición anual obligatoria de resistencia a tierra» | 🚧 Revisar el texto contra la norma y con ingeniería de Massatierra. **No se parafrasea la NOM de memoria** |
| `/cumplimiento/dictamen-uvie` | Qué es el dictamen, quién lo firma y ante quién vale | El deck: «firma de verificador acreditado», «en regla para Protección Civil y STPS» | 🚧 Decisión 10: ¿la UVIE es propia o aliada? ¿Qué normas cubre el dictamen? |
| `/cumplimiento/recibi-un-levantamiento` | «Me observaron esto. ¿Qué hago y en cuánto tiempo?» | La pregunta de origen del formulario | 🚧 El formato de dictamen y ejemplos reales de observaciones (anonimizados) |

**Lo que no va aquí:** montos de multas ni sanciones. El anexo tiene la búsqueda «multa por
no cumplir nom 022», pero publicar una cifra de sanción es dar un dato legal que no nos
toca. La página puede atraer esa búsqueda sin dar números.

## Navegación

**Menú principal:** Soluciones · Cumplimiento · Sectores · Tecnología · Proyectos · Recursos · Empresa
**Botón principal:** Solicitar diagnóstico. Sin «gratuito» mientras siga abierta la decisión 5.
**Accesos permanentes:** WhatsApp (+52 33 1043 3045) · Soporte técnico
**Pie de página:** contacto completo · Aviso de privacidad · Términos de garantía · razón social 🚧

Cumplimiento va en el menú principal, y no escondido dentro de Soluciones, a propósito: es
lo primero que busca quien llega con un levantamiento.

## Formularios y medición

**Formulario de diagnóstico** (`/contacto` y versiones cortas incrustadas en las páginas de
campaña). Usa los campos del heredado y suma dos:
- «¿Recibió recientemente un levantamiento o dictamen de cumplimiento?» (sí / no)
- La página de origen y los UTM, en campos ocultos

Destino: Firestore, igual que `modularte-web` con `/api/cotizar`. **Debe quedar lista para
conectarse al cotizador** (decisión 7): el documento que se guarda tiene que traer lo que el
cotizador necesite, sin construir el cotizador aquí.

**Formulario de soporte** (`/soporte`): los campos del heredado, a otra colección.

**Conversiones que pide el anexo:** llamadas · clics a WhatsApp · descargas de ficha técnica ·
solicitudes de cotización · abandonos de formulario. Se instrumentan desde el lanzamiento,
porque el remarketing necesita audiencia acumulada.

## Lo que el lanzamiento NO lleva

- Logos de clientes (decisión 4). Los casos van por sector.
- Cifras de trayectoria más allá de «+25 años» (decisión 1). Es la única que coincide en
  todos los documentos.
- Academia «Próximamente».
- El asistente virtual del heredado. Es parte del CRM (fase 2).
- El cotizador y el tablero. Son un build aparte.

## Migración desde el sitio actual

El sitio vivo es Joomla en `massatierra.net` (decisión 3). Antes de cambiar el DNS hay que:
- [ ] Rastrear las URLs actuales (y revisar Search Console si dan acceso) para armar el
      mapa de redirecciones 301 hacia las rutas nuevas
- [ ] Decidir el dominio canónico y emitir el certificado (requisito antes de la pauta)

## Preguntas para Mauro (además de las decisiones abiertas)

1. **Formato de dictamen** que entregan, y 2 o 3 ejemplos de levantamientos de clientes
   (anonimizados). Sin esto, `/cumplimiento` habla en abstracto.
2. **¿Venden o integran supresores de pico?** No aparecen en el CV, el brochure ni el deck.
3. **Fichas técnicas** de cada modelo MTK, MTPP02 y MTAT02, y qué diferencia a un MTK de otro
   (capacidad, aplicación). Sin eso, las fichas no se pueden escribir.
4. **Capacitaciones con validez oficial:** ¿qué cursos hay, con qué registro (¿STPS/DC-3?) y
   cómo se contratan? Si son reales, `/recursos/capacitacion` sale en el lanzamiento.
5. **Casos:** de todos los proyectos, ¿cuáles se pueden contar con nombre del sector, ciudad
   y alcance? Ver también la decisión 4.
