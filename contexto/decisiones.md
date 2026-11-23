# Decisiones abiertas

> **Lo que está aquí bloquea contenido.** No se resuelve inventando: se pregunta a Mauro
> (33 3137 7575), que ya se ofreció a aclarar lo que haga falta. Es el hito
> «Requerimientos Web» del build.
>
> Cuando algo se cierre, se mueve a *Resueltas* con fecha y fuente.

## 🚧 Abiertas — bloquean escribir

### 1. Las cifras de trayectoria se contradicen

| Dato | CV | Brochure V1 | Contenido heredado |
|---|---|---|---|
| Proyectos | +15,000 | **+30,000** | — |
| Electrodos instalados | +60,000 | **+90,000** | — |
| Países | **14** (listados) | **12** | «México y el extranjero» |
| Años | +25 | +25 | +25 ✅ |

El sitio no puede decir algo distinto al folleto que el vendedor entrega en mano.
La propuesta de Sentido usó las del CV (25 / 14 / 15,000 / 60,000).

**Los 14 países del CV:** México, Chile, Brasil, Colombia, Perú, Ecuador, Puerto Rico,
Argentina, Panamá, Guatemala, Nicaragua, Honduras, El Salvador, Costa Rica.

### 2. Razón social

Tres candidatas en los documentos:
- **Tension Cero, S.A. de C.V.** — pie del contenido heredado
- **Massatierra SA de CV** — certificados ABNT
- **Consultoría en Eficiencia de la Energía Eléctrica SA de CV** — empaque del MTAT02

Define el aviso legal, el aviso de privacidad y los términos de garantía.

### 3. Dominio canónico

Verificado 2026-11-23:
- `massatierra.net` → HTTP 200, es el sitio vivo (Joomla sobre Apache)
- `massatierra.com.mx` → 301 a `www.massatierra.net`
- **Ninguno sirve HTTPS válido**

Todo el material impreso dice `.com.mx`. Lo natural es invertirlo: sitio nuevo en
`.com.mx`, con `.net` redirigiendo. **El certificado es requisito no negociable antes de
encender pauta.**

### 4. Permiso de uso de logos de clientes

El CV lleva ~60 logos con la nota *«los logotipos son propiedad y derecho de cada
institución»*. Un currículum que se entrega en mano no es una página pública indexada.
**Hasta tener autorización explícita por marca, los casos van por sector, sin logo.**

### 5. La promesa de respuesta en dos horas

El contenido heredado publica *«un especialista le contactará en menos de dos horas»* y
*«diagnóstico gratuito»*. Hoy la cotización tarda ~3 semanas y hay solicitudes sin
responder — es justo lo que la propuesta de Sentido documenta.

Dos salidas: ajustar el copy a algo que se cumpla, o activar el CRM y el cotizador junto
con el sitio. Publicarla sin respaldo es fabricar una queja.

### 8. Cómo se enuncia el claim de 2 Ω

El claim no dice lo mismo en todas las fuentes:
- **Brief / material comercial:** *«2 Ω garantizados por escrito durante 20 años, llave en mano.»*
- **Contenido heredado:** *«Nuestro objetivo de diseño es alcanzar una resistencia a tierra
  **menor a 2 Ω**… Los valores comprometidos… se establecen en la documentación de cada
  proyecto.»*

No es lo mismo un valor garantizado que un objetivo de diseño. Además, «2 Ω» y «menor a
2 Ω» tampoco son el mismo valor. Es justo el tipo de cifra que el sitio no puede
publicar mal. Hay que confirmar con Massatierra la redacción exacta que respalda su
contrato de garantía. Bloquea Inicio, `/tecnologia/garantia` y los términos de garantía.
*(Detectado 2026-11-23 al auditar la estructura.)*

### 9. Supresores de pico

El heredado tiene una página completa de supresores, pero **no aparecen** en el CV, el
brochure ni el deck. Hay que confirmar si los venden o integran antes de publicar la página.

### 10. La UVIE: ¿propia o aliada?

El deck dice que el dictamen lleva *«firma de verificador acreditado»*. Para la sección de
cumplimiento hace falta saber si la UVIE es de Massatierra o de un aliado, qué normas cubre
el dictamen y ante quién vale. Sin eso, `/cumplimiento/dictamen-uvie` no se escribe.

## 📐 De arquitectura

### 6. La ruta de cumplimiento normativo

El contenido heredado **no tiene página de dictamen, verificación ni NOM-022**, y es donde
aterriza el tráfico de mayor intención comercial (ver `brief.md` → UVIE, y el
[anexo de pauta](https://propuestas.sentido.mx/massatierra/google-ads)).

Propuesta: abrir una sección propia que hable el idioma del dictamen —no el del catálogo—
y que sea el destino de las campañas de captura.
→ **Ya está aterrizada** en [`estructura-sitio.md`](estructura-sitio.md) (`/cumplimiento`
y sus 3 páginas). Falta validarla con Mauro.

### 7. Alcance del sitio vs. el cotizador

El cotizador sistematizado y el tablero de dirección son un **desarrollo aparte**
(confirmado por Jos, 2026-11-23), con su propio build. El sitio debe dejar previsto por
dónde se conectan, sin construirlos aquí.

Demos de referencia: [cotizador](https://propuestas.sentido.mx/massatierra/cotizador) ·
[tablero](https://propuestas.sentido.mx/massatierra/tablero)

## ✅ Resueltas

| Decisión | Resolución | Fecha |
|---|---|---|
| Stack | Next.js + Tailwind + Firebase (mismo que `modularte-web`) | 2026-11-23 · Jos |
| Repo | `massatierra-web`, aislado, privado | 2026-11-23 · Jos |
| Cotizador y tablero | Build aparte, no entran al alcance del sitio | 2026-11-23 · Jos |

## 📥 Pendiente de recibir del cliente

- [ ] Logo vectorial (AI/SVG) y tipografías del deck nuevo
- [ ] Banco de fotos en alta (obra, instalaciones, producto, equipo)
- [ ] Render o foto por modelo MTK, para las fichas
- [ ] Fichas técnicas en PDF (el contenido heredado las promete descargables)
- [ ] Documento de patente y certificados
- [ ] Accesos: dominio (ambos registradores), hosting, correo, Analytics, Search Console
- [ ] Diagrama de flujo de primer contacto a cotización + ejemplos de cotización, estudio
      y carpeta de proyecto — lo ofreció Aaron, no ha llegado
