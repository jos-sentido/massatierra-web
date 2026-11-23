# Fuentes del cliente — análisis

> Qué nos dio Massatierra, qué sirve de cada cosa y qué hay que resolver antes de
> escribir una línea del sitio. **Leer esto antes de tocar contenido.**
> Llegaron por WhatsApp el 2026-11-23 (grupo «Massatierra Redes»). Los originales viven
> en la carpeta de Drive del cliente; aquí está el análisis y el texto extraído.

## De dónde vino cada cosa

| Archivo | Lo mandó | Qué es | Confianza |
|---|---|---|---|
| `MassatierraCV3.pdf` (16 pp) | Aaron Pedraza | Currículum corporativo: misión/visión, portafolio de producto, cartera de clientes con logos, presencia por país, política de calidad | **Alta** — material oficial |
| `Massatierra Brochure V1.pdf` (12 pp) | Aaron Pedraza | Folleto comercial: tecnología patentada, comparativo vs sistema tradicional, línea de producto, certificados | **Alta** — material oficial, y más reciente que el CV |
| `Ok Massatierra Lic Miguel Angel Guardado.pptx` (27 láminas) | Aaron Pedraza | **Deck de venta vertical de hotelería.** Es la expresión de marca más nueva y el mejor argumento comercial que tienen | **Alta** — pero es de un vertical |
| `Massatierra Contenido Web 2026.docx` (24 pp) | Mauro | Mapa del sitio + contenido editorial completo | ⚠️ **Del proveedor anterior** |
| `Massatierra_Contenido_Web_Final.pdf` (32 pp) | Mauro | Misma pieza, en PDF | ⚠️ **Del proveedor anterior** |

Mauro lo dijo textual: *«La información que te envió Aaron es toda la disponible, la
información que puedas necesitar te la proporcionaré yo… puede ser videollamada,
presencial, pero el punto de partida es lo que hay»*. **Mauro es la puerta de la toma
de requerimientos** y ya se ofreció. No hay que esperar a nadie más.

---

## 1 · Lo que SÍ está resuelto (y hay que aprovechar)

**El contenido editorial ya existe y está bien escrito.** El documento del proveedor
anterior trae 9 secciones completas: mapa del sitio, copy de cada página, textos de
formulario, FAQ de 11 preguntas, pie de página y hasta el guion de un asistente de
atención. No hay que escribirlo de cero — hay que **auditarlo, corregirlo y
reorganizarlo**. Eso ahorra semanas.

**La estructura que propone:**

```
Inicio · Soluciones (puesta a tierra · pararrayos · supresores · estudios · ingeniería)
Sectores (industria · hotelería · salud · telecom y datacenter · construcción · comercio)
Tecnología y respaldo (tecnología Massatierra · garantía) · Proyectos
Recursos (centro de conocimiento · biblioteca técnica · FAQ · Academia Massatierra)
Empresa · Contacto (diagnóstico y cotización · soporte técnico)
```

**Datos duros que confirmó el material:**

- Claim firma: **2 Ω garantizados por escrito durante 20 años, llave en mano.**
- Tecnología: **Electrodo Magneto Activo patentado (PAT. #285201 MR)** + **MassLink**.
  Sistema unidireccional, libre de mantenimiento, 100% cobre electrolítico.
- Línea de producto: MTK45A-D · MTK85A-D · MTK200A-D · MTK400A-D · MTK600A-D ·
  MTK1000A-D (electrodos) · MTPP02 (punta) · MTAT02 (acondicionador de terreno).
- Avales: NOM · ANCE · NMX · IEEE · ABNT (Brasil) · SEC (Chile) · IMPI.
- Cartera con nombre propio: CFE, Coca-Cola, OXXO, Telmex, Televisa, izzi, Claro, IMSS,
  SEDENA, Philips, Nestlé, Nissan, Four Seasons, Hyatt, Xcaret, Cirque du Soleil,
  Hard Rock, Vidanta, Banyan Tree, Codelco, Minera Escondida, Tequila Sauza, Megacable…
- Comparativo propio vs «sistema tradicional»: impedancia permanente, sin mantenimiento,
  confina EMI/RFI, campo catódico, vida útil 20 años vs 3.

---

## 2 · El hallazgo que cambia la estrategia: **UVIE**

En la lámina 24 del deck de hotelería aparece algo que **no está en ningún otro
documento, ni en nuestra propuesta**:

> **Estudio → Instalación → Dictamen UVIE (firma de verificador acreditado) → Garantía**
> *«Usted no necesita coordinar a cuatro proveedores. Recibe un dictamen en regla para
> Protección Civil y STPS.»*

Massatierra puede **cerrar el círculo normativo**: no solo instala, también entrega el
dictamen con firma de unidad verificadora acreditada. Eso es exactamente lo que busca
quien acaba de recibir un levantamiento de cumplimiento — el eje de toda la estrategia
de demanda inducida del anexo de pauta.

**Consecuencia para el sitio:** el contenido del proveedor anterior **no tiene página de
dictamen ni de verificación**. Es el hueco más caro del documento. Hay que abrir una
ruta propia de cumplimiento normativo (NOM-022 / dictamen / verificación) que hoy no
existe en el mapa, y que es donde aterriza el tráfico de mayor intención comercial.

---

## 3 · Lo que hay que resolver ANTES de escribir (bloqueantes)

### 3.1 Las cifras se contradicen entre documentos

| Dato | CV | Brochure V1 | Contenido web |
|---|---|---|---|
| Proyectos | +15,000 | **+30,000** | — |
| Electrodos instalados | +60,000 | **+90,000** | — |
| Países | **14** (listados) | **12** | «México y el extranjero» |
| Años | +25 | +25 | +25 ✅ |

No se puede publicar un sitio que diga una cosa mientras el folleto que el vendedor
entrega en mano dice otra. **Hay que cerrar una sola versión con el cliente.**
Nuestra propuesta usó 25 / 14 / 15,000 / 60,000 (la del CV).

### 3.2 Tres razones sociales distintas

- «Tension Cero, S.A. de C.V.» — pie de página del contenido web
- «Massatierra SA de CV» — certificados ABNT
- «Consultoría en Eficiencia de la Energía Eléctrica SA de CV» — empaque del MTAT02

Hay que saber cuál factura y cuál va en el aviso legal y el aviso de privacidad.

### 3.3 El dominio está al revés

- **massatierra.net** es el sitio vivo (HTTP 200).
- **massatierra.com.mx** solo redirige (301 → `www.massatierra.net`) — y es el que
  aparece impreso en CV, brochure y contenido web.
- **Ninguno de los dos sirve HTTPS válido.** Verificado 2026-11-23.

Lo natural es invertirlo: sitio nuevo en `.com.mx`, con `.net` redirigiendo. Es decisión
del cliente y hay que tomarla antes de configurar nada.

### 3.4 Los logos de clientes: permiso

El CV usa ~60 logos de marcas con la nota *«los logotipos son propiedad y derecho de
cada institución»*. Un currículum que se entrega en mano no es lo mismo que una página
pública indexada por Google. **Hay que preguntar explícitamente qué logos tienen
autorización de uso público.** Mientras no haya respuesta, los casos van por sector.

### 3.5 Una promesa que hoy no se puede cumplir

El contenido del proveedor anterior promete: *«un especialista le contactará en **menos
de dos horas**»* y *«diagnóstico gratuito»*. Hoy la cotización tarda tres semanas y hay
solicitudes sin responder. **Publicar esa promesa sin el CRM y el cotizador detrás es
fabricar una queja.** O se ajusta el copy, o se activa la Parte 2 junto con el sitio.
Es el mejor argumento vivo para lo que sigue.

---

## 4 · Qué falta pedir

- [ ] **Assets de marca**: logo vectorial (el ® en AI/SVG), tipografías del deck nuevo, paleta oficial.
- [ ] **Banco de fotos** en alta: las del CV y el brochure están a resolución de impresión, pero vienen incrustadas. Hace falta el original (obra, instalaciones, producto, equipo).
- [ ] **Render / foto de producto** por modelo MTK, para las fichas técnicas.
- [ ] **Fichas técnicas en PDF** de cada producto (el contenido las promete como descargable).
- [ ] **Documento de patente** y certificados, para la página de respaldo.
- [ ] **Accesos**: dominio (registrador), hosting actual, correo, Analytics/Search Console si existen.
- [ ] Lo que quedó pendiente de la reunión: **diagrama de flujo de primer contacto a cotización** y ejemplos de cotización, estudio y carpeta de proyecto (lo ofreció Aaron, no ha llegado).
- [ ] **Las 27 láminas del deck** están sin minar a fondo — se revisaron 1, 24 y 26. Vale la pena leerlo completo al armar la estructura: es el mejor argumento de venta que tienen escrito.

---

## 5 · Dónde viven los archivos

El repo **no versiona binarios** por regla propia (`.gitignore`: los assets pesados van a
Drive/Dropbox, no a git). Entonces:

| Qué | Dónde está | Estado |
|---|---|---|
| Los 5 originales (PDF/DOCX/PPTX, ~10 MB) | Drive del cliente → [Massatierra](https://drive.google.com/drive/folders/1Vj5IimCxviFHV8sktP-0c7nBguugeHnq) | ⚠️ Jos los sube (no pasan por el conector) |
| El contenido web heredado, en texto | [`contenido-heredado.md`](contenido-heredado.md) | ✅ versionado |
| El análisis | este archivo | ✅ versionado |

Hasta que Jos los suba, la única copia fuera de WhatsApp está en su Mac.
