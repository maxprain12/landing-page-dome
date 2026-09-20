# Validación pre-publicación — pack social

Instagram congelado hasta checklist firmado.

**Puerta 5:** se firma contra la plantilla canónica endurecida en [#19](https://github.com/maxprain12/landing-page-dome/pull/19) (**merged** a `main`). El pack [#18](https://github.com/maxprain12/landing-page-dome/pull/18) (`arc-p1-123`, diagramas abstractos + pills genéricas) es el ejemplo **rechazado**.

## Pack

| Campo | Valor |
| --- | --- |
| Spug | `arc-ana-q3` |
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

Firma ratio: **Lucia** (medido PIL) — pendiente **Mateo/Roman** — fecha: 2026-09-20

## 2. Safe area

- [x] `safe-area/*-full-frame.png` (3 slides)
- [x] Many entero
- [x] CTA URL completa visible
- [x] Botón Aprobar sin clip

Firma safe area: **Lucia** — fecha: 2026-09-20 — pendiente revisión **Roman**

## 3. CTA legible

- [x] URL completa `https://dome.dowi.es/blog/pdf-to-follow-up` en las 3 slides
- [x] CTA button «Leer el how-to» en 03
- [x] Legible a 1080

Firma CTA: **Lucia** — fecha: 2026-09-20 — pendiente **Mateo**

## 4. Claims de producto

| Rol | Nombre | Fecha | OK |
| --- | --- | --- | --- |
| SEO | Virginia | | [ ] |
| Producto | Tomas | | [ ] |
| Técnico | Mateo | | [ ] |

Claim aprobado (propuesto):

> El seguimiento no debería vivir en Descargas. propuesta Q3.pdf + Ana → borrador Many. Nada sale sin Aprobar. Local-first. Tú envías solo si conectas correo o LinkedIn/X. CTA how-to PDF.

Sin métricas vanidosas. Sin nombrar competidores. Copy Virginia exacta. Tomas/Mateo claims OK en chat — puertas 4 pendientes de checkbox formal.

## 5. Fidelidad del mock a Dome real

**Firma contra puerta 5 de [#19](https://github.com/maxprain12/landing-page-dome/pull/19) (merged).** Criterio: escenario concreto Ana + `propuesta Q3.pdf` + UI workspace/people/many/approval. [#18](https://github.com/maxprain12/landing-page-dome/pull/18) = ejemplo rechazado (diagrama abstracto / chips).

### Escenario concreto (obligatorio — #19)

- [x] PDF **con nombre de archivo**: `propuesta Q3.pdf`
- [x] Persona **con nombre**: Ana
- [x] Cadena visible: **propuesta Q3.pdf + Ana → borrador de Many → Aprobar**
- [x] No «un documento» / «un contacto» genéricos

### UI de Dome, no infografía (#19)

- [x] Recreación de componentes reales: **workspace / people / many / approval**
  - Slide 01: biblioteca «Documentos recientes» (`propuesta Q3.pdf` activo + secondary faded) + ficha Ana partial/cut
  - Slide 02: sidebar Espacio de trabajo · Archivos · Ana · Many draft email · botón **Aprobar**
- [x] **No** diagramas numerados abstractos (cero 1→2→3, cero flow chart)
- [x] **No** UI inventada ni chrome ajeno
- [x] **No** framing chat-cloud / Manychat / Zapia / auto-DM / Zoe / Stripe
- [x] Local-first: Many **prepara**, tú **apruebas / envías**
- [x] Many lima `#E0EAB4` / oliva `#596037` (mark canónico)

### Copy del creativo (#19)

- [x] Permitido: local-first, «solo si conectas», Many prepara / tú apruebas
- [x] Cero veto: sin «agentes», «CRM», «escala», «Many hace el resto», «cluster P1»
- [x] Cero pills de beneficio genérico sin PDF + persona nombrados

- [ ] Gate 5 **Mateo** — checkbox formal pendiente

Firma mock: **Lucia** (creative) — pendiente **Mateo** gate 5 — fecha: 2026-09-20  
Nota gate 5: UI real Ana+propuesta Q3.pdf, cero diagrama. Refs `arc-ana/ui/dome-*-detail.png` + reel-01.

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

## 9. Firmas publicación

| Rol | Nombre | Fecha | OK |
| --- | --- | --- | --- |
| Creativo | Lucia | 2026-09-20 | [x] |
| Publicación | Sofia | | [ ] |

Puerta 9 Sofia unchecked. Doors 4 / 5 Mateo / 9 Sofia open.
