# Validación pre-publicación — pack social

Instagram congelado hasta checklist firmado.

## Pack

| Campo | Valor |
| --- | --- |
| Slug | `arc-p1-123` |
| PR | [#18](https://github.com/maxprain12/landing-page-dome/pull/18) |
| Canales | IG feed / carrusel |
| **Slot de secuencia** | Pack cerrado del arco **1→2→3** (beneficio · loop · CTA how-to) |
| Post anterior (pack o URL) | — (slot 1 del arco) |
| Post siguiente (si aplica) | chapter-c2 / chapter-dock (después) |
| CTA (URL completa) | https://dome.dowi.es/blog/pdf-to-follow-up |
| Fecha del export | 2026-09-19 |

## Ratios esperados

| Archivo | Preset | Esperado | Medido | OK |
| --- | --- | --- | --- | --- |
| 01-beneficio.png | ig-carousel | 1080×1350 | 1080×1350 | [x] |
| 02-loop.png | ig-carousel | 1080×1350 | 1080×1350 | [x] |
| 03-cta-howto.png | ig-carousel | 1080×1350 | 1080×1350 | [x] |

`pnpm run check:social-drafts -- arc-p1-123`

Firma ratio: **Lucia** (medido PIL) — pendiente **Mateo/Roman** — fecha: 2026-09-19

## 2. Safe area

- [x] `safe-area/*-full-frame.png` (3 slides)
- [x] Many entero
- [x] CTA URL completa visible
- [x] Tags / botón Aprobar sin clip

Firma safe area: **Lucia** — fecha: 2026-09-19 — pendiente revisión **Roman**

## 3. CTA legible

- [x] URL completa `https://dome.dowi.es/blog/pdf-to-follow-up` en las 3 slides
- [x] Legible a 1080

Firma CTA: **Lucia** — fecha: 2026-09-19 — pendiente **Mateo**

## 4. Claims de producto

| Rol | Nombre | Fecha | OK |
| --- | --- | --- | --- |
| SEO | Virginia | 2026-09-19 | [x] |
| Producto | Tomas | 2026-09-19 | [x] |
| Técnico | Mateo | | [ ] |

Claim aprobado (SEO + producto OK):

> Menos idas y venidas. Más seguimientos con contexto. Local-first. Documento + persona. Many prepara, tú apruebas. CTA how-to PDF.

Notas producto: alineado con `docs/product/positioning.md`. Loop Documento → Persona → Many → Aprobar canónico. «tú envías — solo si conectas» en slide 03 evita overclaim. Sin chat único cloud ni DMs automáticos.

Notas SEO: keyword alineada con `/blog/pdf-to-follow-up`; sin competidores ni métricas vanity. Secuencia 1→2→3 correcta.

Sin métricas vanidosas. Sin nombrar competidores.

## 5. Fidelidad del mock

- [x] Loop abstracto Documento → Persona → Many → Aprobar (chips tipográficos + Many canónico SVG)
- [x] **No** UI inventada de producto ni chrome ajeno
- [x] **No** framing chat-cloud / Manychat / Zapia
- [x] Local-first: Many prepara / tú apruebas
- [x] Many desde `assets/many.svg` (lima/oliva)

Nota: no usa capturas crudas de pantalla; es composición de marca del loop. Si Mateo exige captura de componentes reales, iteramos.

Firma mock: **Lucia** — pendiente **Mateo/Roman** — fecha: 2026-09-19

## 6. Secuencia editorial

- [x] Pack cerrado 01→02→03 = arco P1 completo
- [x] C2 / dock **no** incluidos

Firma editorial / SEO: **Virginia** — 2026-09-19 — OK

## 7. Formato cerrado

- [x] Carrusel de 3 slides completo (no slides huérfanas)

## 8. Tokens de marca

- [x] Fondo chrome `#F4F4F5`, ink `#27272A`, muted `#71717A`, surface `#FAFAFA`
- [x] Many lima `#E0EAB4` / oliva `#596037` vía SVG canónico
- [x] Tipografía Inter
- [x] Sin paleta Zoe/Stripe/Manychat

## 9. Firmas publicación

| Rol | Nombre | Fecha | OK |
| --- | --- | --- | --- |
| Creativo | Lucia | 2026-09-19 | [x] |
| Publicación | Sofia | | [ ] |
