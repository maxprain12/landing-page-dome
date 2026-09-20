# Validación pre-publicación — pack social

Instagram congelado hasta checklist firmado.

**Puerta 5:** se firma contra la plantilla canónica endurecida en [#19](https://github.com/maxprain12/landing-page-dome/pull/19) (**merged** a `main`). El pack [#18](https://github.com/maxprain12/landing-page-dome/pull/18) (`arc-p1-123`, diagramas abstractos + pills genéricas) es el ejemplo **rechazado**.

## Pack

| Campo | Valor |
| --- | --- |
| Slug | `arc-ana-q3` |
| PR | https://github.com/maxprain12/landing-page-dome/pull/20 |
| Canales | IG feed / carrusel |
| **Slot de secuencia** | Pack concreto **Ana + propuesta Q3.pdf** (dolor · loop UI · CTA how-to) — carrusel cerrado 01→02→03 |
| Post anterior (pack o URL) | Reemplaza abstracto [#18](https://github.com/maxprain12/landing-page-dome/pull/18) |
| Post siguiente (si aplica) | — |
| CTA (URL completa) | https://dome.dowi.es/blog/pdf-to-follow-up |
| Fecha del export | 2026-09-20 |

## 1. Ratios esperados

| Archivo | Preset | Esperado | Medido | OK |
| --- | --- | --- | --- | --- |
| 01-dolor.png | ig-carousel | 1080×1350 | 1080×1350 | [x] |
| 02-loop.png | ig-carousel | 1080×1350 | 1080×1350 | [x] |
| 03-cta.png | ig-carousel | 1080×1350 | 1080×1350 | [x] |

`pnpm run check:social-drafts -- arc-ana-q3`

Firma ratio: **Lucia** (PIL) + **Mateo** (medido local 1080×1350 + `check:social-drafts` OK en `cac9295`) — fecha: 2026-09-20

## 2. Safe area

- [x] `safe-area/*-full-frame.png` (3 slides)
- [x] Many entero
- [x] CTA URL completa visible
- [x] Botón Aprobar sin clip

Firma safe area: **Lucia** + **Mateo** (revisión visual) — fecha: 2026-09-20 — pendiente revisión **Roman** (opcional)

## 3. CTA legible

- [x] URL completa `https://dome.dowi.es/blog/pdf-to-follow-up` en las 3 slides
- [x] CTA button «Leer el how-to» en 03
- [x] Legible a 1080

Firma CTA: **Lucia** + **Mateo** — fecha: 2026-09-20

## 4. Claims de producto

| Rol | Nombre | Fecha | OK |
| --- | --- | --- | --- |
| SEO | Virginia | | [ ] |
| Producto | Tomas | 2026-09-20 | [x] |
| Técnico | Mateo | 2026-09-20 | [x] |

Claim aprobado (producto + técnico OK):

> El seguimiento no debería vivir en Descargas. propuesta Q3.pdf + Ana → borrador Many. Nada sale sin Aprobar. Local-first. Tú envías solo si conectas correo o LinkedIn/X. CTA how-to PDF.

Notas producto: alineado con `docs/product/positioning.md`. Escenario concreto (PDF + persona nombrados). Cero jerga SaaS. «solo si conectas» evita overclaim.

Notas técnico (Mateo): claims de producto coherentes con flujo real workspace/people/many/approval. Sin overclaim de envío automático. Sin métricas vanidosas. Sin competidores. Copy Virginia exacta.

## 5. Fidelidad del mock a Dome real

**Firma contra puerta 5 de [#19](https://github.com/maxprain12/landing-page-dome/pull/19) (merged).** Criterio: escenario concreto Ana + `propuesta Q3.pdf` + UI workspace/people/many/approval. [#18](https://github.com/maxprain12/landing-page-dome/pull/18) = ejemplo rechazado (diagrama abstracto / chips).

### Escenario concreto (obligatorio — #19)

- [x] PDF **con nombre de archivo**: `propuesta Q3.pdf`
- [x] Persona **con nombre**: Ana
- [x] Cadena visible: **propuesta Q3.pdf + Ana → borrador de Many → Aprobar**
- [x] No «un documento» / «un contacto» genéricos

### UI de Dome, no infografía (#19)

- [x] Recreación de componentes reales: **workspace / people / many / approval**
  - Slide 01: biblioteca «Documentos recientes» (`propuesta Q3.pdf` activo + secondary faded) + ficha Ana
  - Slide 02: sidebar Espacio de trabajo · Archivos · Ana · Many draft email · botón **Aprobar**
  - Slide 03: chips nombrados PDF + Ana + Many prepara + Aprobar + CTA how-to (no diagrama numerado)
- [x] **No** diagramas numerados abstractos (cero 1→2→3 flow chart genérico)
- [x] **No** UI inventada ni chrome ajeno
- [x] **No** framing chat-cloud / Manychat / Zapia / auto-DM / Zoe / Stripe
- [x] Local-first: Many **prepara**, tú **apruebas / envías**
- [x] Many lima `#E0EAB4` / oliva `#596037` (mark canónico)

### Copy del creativo (#19)

- [x] Permitido: local-first, «solo si conectas», Many prepara / tú apruebas
- [x] Cero veto: sin «agentes», «CRM», «escala», «Many hace el resto», «cluster P1»
- [x] Cero pills de beneficio genérico sin PDF + persona nombrados

- [x] Gate 5 **Mateo** — **OK** 2026-09-20 (`cac9295`)

Firma mock: **Lucia** (creative) + **Mateo** (gate 5) — fecha: 2026-09-20  
Nota gate 5: UI real Ana + `propuesta Q3.pdf` + workspace / people / many / approval. Cero diagrama abstracto. Contraste claro vs [#18](https://github.com/maxprain12/landing-page-dome/pull/18).

## 6. Secuencia editorial

- [x] Pack cerrado 01→02→03 = dolor · loop · CTA
- [x] Sin «cluster P1» en copy creativo
- [x] Caption: propuesta Q3.pdf · Ana · Many prepara · tú apruebas. Local-first. How-to → dome.dowi.es/blog/pdf-to-follow-up

## 7. Formato cerrado

- [x] Carrusel de 3 slides completo (1080×1350)
- Pieza declarada: carrusel (3 slides)

Firma formato: **Lucia** — fecha: 2026-09-20

## 8. Tokens de marca

- [x] Fondo `#F4F4F5`, ink `#27272A`, muted `#71717A`, surface `#FAFAFA`, border `#E4E4E7`
- [x] Many lima `#E0EAB4` / oliva `#596037`
- [x] Tipografía Inter
- [x] Sin paleta Zoe/Stripe/Manychat

Firma tokens: **Mateo** — fecha: 2026-09-20

## 9. Firmas publicación

| Rol | Nombre | Fecha | OK |
| --- | --- | --- | --- |
| Creativo | Lucia | 2026-09-20 | [x] |
| Publicación | Sofia | | [ ] |

**Pendiente para publicar:** Virginia (SEO puerta 4) + Sofia (puerta 9). Técnico Mateo + gate 5 + producto Tomas OK.
