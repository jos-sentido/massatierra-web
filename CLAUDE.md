# massatierra-web — guía para Claude

Sitio oficial de Massatierra. **Lee `contexto/` antes de escribir una línea.**

## Orden de lectura

1. [`contexto/brief.md`](contexto/brief.md) — quién es Massatierra, qué vende, qué lo distingue.
2. [`contexto/decisiones.md`](contexto/decisiones.md) — **lo que está abierto y bloquea contenido.**
3. [`contexto/fuentes.md`](contexto/fuentes.md) — qué documentos dio el cliente y qué vale de cada uno.
4. [`contexto/contenido-heredado.md`](contexto/contenido-heredado.md) — el copy del proveedor anterior.
5. [`contexto/estructura-sitio.md`](contexto/estructura-sitio.md) — **el mapa del sitio nuevo**, auditado.

## Dos reglas que no se rompen

**No inventar datos técnicos ni cifras.** Es una empresa de ingeniería eléctrica que
garantiza valores por escrito. Un número inventado aquí es un problema legal, no un
detalle de copy. Si un dato no está en `contexto/`, se pregunta — no se rellena.

**Los secretos nunca entran a git.** Llaves de Firebase, accesos del cliente y
credenciales van en variables de entorno de Vercel. El `.gitignore` ya cubre `.env*`.

## Dónde se reporta el avance

El estado del cliente vive en `sentido-core/clientes/massatierra/estado.md`. **Al cerrar
cada avance importante, se escribe ahí** (bitácora + pendientes). Esa es toda la
sincronización: el contexto no se queda atrapado en una conversación.

Los punteros nuevos (URL de Vercel, proyecto de Firebase, dominio) se registran en
`sentido-core/clientes/massatierra/config.yaml · homes.web`.

## Lo que sigue (orden sugerido)

1. Levantar el proyecto Next.js y dejarlo desplegando en Vercel con staging público.
2. Cerrar `contexto/estructura-sitio.md` — el mapa auditado, con la ruta de cumplimiento
   normativo que el contenido heredado no tiene.
3. Construir página por página con el copy ya depurado.
4. Formulario de contacto → Firestore (referencia: `modularte-web` usa `/api/cotizar`).
