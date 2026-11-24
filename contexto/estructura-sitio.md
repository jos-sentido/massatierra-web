# Estructura del sitio — mapa auditado

> Mapa del sitio nuevo. Parte del mapa del proveedor anterior
> ([`contenido-heredado.md`](contenido-heredado.md)), auditado contra
> [`brief.md`](brief.md), [`decisiones.md`](decisiones.md) y el
> [anexo de pauta](https://propuestas.sentido.mx/massatierra/google-ads).
>
> **Alcance (Jos, 2026-11-23): el sitio se desarrolla completo, sin etapas.** Nada se deja
> «para después del lanzamiento»; lo único que espera es lo que depende de información del
> cliente (🚧).
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
| ✏️ | Academia «Próximamente» → página real de **Capacitación** | Una página vacía no suma. El brief dice que ya hay **capacitaciones con validez oficial**; hacen falta los cursos y el temario (ver la pregunta 4) |
| ➕ | El centro de conocimiento lleva los 4 artículos ya escritos **más los de normativa** que alimentan `/cumplimiento` | ⚠️ Escribir artículos nuevos estaba cotizado en el módulo de Contenido: Jos define si entra al alcance del sitio |
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
│   └── /capacitacion               🚧 cursos y temario (pregunta 4)
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

## Inicio — orden de secciones (Jos, 2026-11-24)

Alineado con la vitrina (`/lab`). Las secciones marcadas con 👁 ya existen como componente.

1. 👁 **Hero** — dibujo técnico animado, rayo que el visitante provoca
2. 👁 **Respaldo** — +25 años · 20 años de garantía (🚧 decisión 8) · PAT. #285201 · cinta de avales
3. **Cumplimiento: la cadena completa** — estudio → instalación → dictamen UVIE → garantía (borde con corriente)
4. **Soluciones** — 4 tarjetas; Supresores solo si se confirma (decisión 9)
5. 👁 **Tecnología propia** — Electrodo Magneto Activo, líneas de campo, renglones de ficha
6. 👁 **Estudios y medición** — terreno en curvas de nivel; aquí entra «¿Su instalación presenta estas señales?»
7. 👁 **Sectores** — paneles conectados a tierra; absorbe «Experiencia por sector» (enlace a Proyectos)
8. **Así trabajamos** — 5 pasos
9. 👁 **Diagnóstico** — hoja de solicitud (es el cierre)

Sale del heredado: **«Encuentre el camino para su proyecto»** (sus 4 destinos ya están en hero,
Soluciones, Estudios y el acceso a Soporte). El boceto de **todas** las páginas, con sus
secciones en orden, está en el entregable:
https://propuestas.sentido.mx/massatierra/estructura-web (pestaña «Wireframes»).
Esa página y este documento deben coincidir; si se cambia uno, se cambia el otro.

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

**Dos formatos, los mismos datos (Jos, 2026-11-24).** La solicitud de diagnóstico se ofrece
como **guiada** (una pregunta a la vez, por omisión) o como **formulario** (todo a la vista),
con un selector. La guiada no es un bot ni un chat libre: es un guion fijo con opciones y
campos (`components/site/SolicitudGuiada.tsx`). Su ventaja es la ramificación: si la persona
ya tiene un levantamiento se le pregunta además **quién revisó** (Protección Civil · STPS ·
unidad verificadora · otro) y **si tiene plazo** para corregir; si no, nunca lo ve. El guion:
necesidad → levantamiento → (quién revisó → plazo) → tipo de instalación → etapa (obra nueva ·
ampliación · operando) → ciudad → nombre y empresa → teléfono y canal preferido (WhatsApp ·
llamada) → hoja de resumen. **El documento que se guarda debe traer estos campos** en ambos
formatos, y la guiada registra en qué pregunta se abandona.

**Formulario de soporte** (`/soporte`): los campos del heredado, a otra colección.

**Conversiones que pide el anexo:** llamadas · clics a WhatsApp · descargas de ficha técnica ·
solicitudes de cotización · abandonos de formulario. Se instrumentan desde el primer día,
porque el remarketing necesita audiencia acumulada.

## Lo que el sitio NO lleva (y por qué)

- Logos de clientes (decisión 4). Los casos van por sector.
- Cifras de trayectoria más allá de «+25 años» (decisión 1). Es la única que coincide en
  todos los documentos.
- El asistente virtual del heredado. Es parte del servicio de CRM, que se contrata aparte.
- El cotizador y el tablero. Son un build aparte.

## Migración desde el sitio actual

El sitio vivo es Joomla en `massatierra.net` (decisión 3). Antes de cambiar el DNS hay que:
- [ ] Rastrear las URLs actuales (y revisar Search Console si dan acceso) para armar el
      mapa de redirecciones 301 hacia las rutas nuevas
- [ ] Decidir el dominio canónico y emitir el certificado (requisito antes de la pauta)

## Diseño y movimiento

Todo esto forma parte del sitio completo; el detalle y las demos están en el entregable
(pestaña «Elementos de diseño»):

- **Hero en video** con el recorrido de la descarga (idea de Jos): entra por la punta, baja por
  la conducción, el electrodo la disipa y las corrientes del subsuelo no regresan. Imágenes
  conceptuales generadas en Higgsfield. 🚧 Ingeniería de Massatierra valida la escena.
- **Escena 3D del electrodo** que el visitante puede girar (Tecnología / Productos).
- **Animación esquemática** del recorrido, etiquetada, para explicar cada componente.
- **Microinteracciones**, **texto técnico que se decodifica** (React Bits) y **transiciones
  tarjeta → página**.
- Herramientas: shadcn + registro `@react-bits` ya instalados en el repo; Getlayers (MCP)
  pendiente de que Jos instale el plugin.
- Reglas de calidad (auditoría `ui-ux-pro-max`): 1–2 movimientos por pantalla, vidrio solo
  sobre imágenes, efectos que no dependan del cursor, video que se pausa fuera de pantalla e
  imagen fija con movimiento reducido, formularios cortos en 2 pasos.

## Preguntas para Mauro (además de las decisiones abiertas)

1. **Formato de dictamen** que entregan, y 2 o 3 ejemplos de levantamientos de clientes
   (anonimizados). Sin esto, `/cumplimiento` habla en abstracto.
2. **¿Venden o integran supresores de pico?** No aparecen en el CV, el brochure ni el deck.
3. **Fichas técnicas** de cada modelo MTK, MTPP02 y MTAT02, y qué diferencia a un MTK de otro
   (capacidad, aplicación). Sin eso, las fichas no se pueden escribir.
4. **Capacitaciones con validez oficial:** ¿qué cursos hay, con qué registro (¿STPS/DC-3?) y
   cómo se contratan? Si son reales, `/recursos/capacitacion` se construye con esa información.
5. **Casos:** de todos los proyectos, ¿cuáles se pueden contar con nombre del sector, ciudad
   y alcance? Ver también la decisión 4.
