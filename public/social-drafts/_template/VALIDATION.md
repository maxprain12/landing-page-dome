# Validación pre-publicación — pack social

Copiá este archivo a `public/social-drafts/<pack>/VALIDATION.md` y rellenalo **antes** de que Sofía publique. Instagram está congelado hasta que el pack pase este checklist.

Esta es la plantilla canónica. En un pack real, `VALIDATION.md` y `ratios.json` viven juntos en `public/social-drafts/<pack>/`.

No inventar credenciales ni publicar desde este repo.

---

## Pack

| Campo | Valor |
| --- | --- |
| Slug | `_template` |
| PR | |
| Canales | LinkedIn / X / IG feed / IG reel / avatar |
| **Slot de secuencia** | `1` dolor/beneficio · `2` loop · `3` CTA how-to · `chapter-c2` · `chapter-dock` |
| Post anterior (pack o URL) | (obligatorio salvo el slot 1) |
| Post siguiente (si aplica) | |
| CTA (URL completa) | https://dome.dowi.es/… |
| Fecha del export | YYYY-MM-DD |

---

## Ratios esperados (píxeles reales del export)

Medí el archivo, no el artboard de diseño. El script `pnpm run check:social-drafts` lee el IHDR/SOF y lo compara con `ratios.json`.

| Preset | Uso | Px |
| --- | --- | --- |
| `linkedin` | Banner LinkedIn | **1584×396** |
| `x` | Banner X / Twitter | **1500×500** |
| `ig-feed` / `ig-carousel` | Feed o slide de carrusel IG | **1080×1350** |
| `ig-reel` | Reel / story 9:16 | **1080×1920** |
| `ig-square` | Quote card / post cuadrado | **1080×1080** |
| `ig-avatar-320` / `640` / `1080` | Avatar de perfil | **320 / 640 / 1080** (cuadrado) |

Vídeo (mp4) no entra en el check de píxeles: anotá el tamaño a mano si el pack incluye reel.

---

## 1. Ratio nativo medido

- [ ] Cada export de `ratios.json` coincide en px reales (`file`, Preview, o el script).
- [ ] No hay recorte «para que entre» ni canvas con letterbox fingido.

Comando:

```bash
pnpm run check:social-drafts -- <pack>
```

| Archivo | Preset | Esperado | Medido | OK |
| --- | --- | --- | --- | --- |
| | | | | [ ] |

Firma ratio: **Roman / Mateo** — fecha: ________

---

## 2. Safe area (captura full-frame)

Adjuntá capturas del frame completo (no crop del mock) en `safe-area/`. El script no las valida: es review humana.

- [ ] `safe-area/full-frame.png` (o una por slide) subida al pack
- [ ] **Many** entero, sin clip en bordes ni en la zona de UI del canal
- [ ] **CTA** entero (botón + URL)
- [ ] **Badges / pills / tags** sin cortar
- [ ] **Botones** (Aprobar, etc.) con hit-area visible

Firma safe area: **Lucia / Roman** — fecha: ________

---

## 3. CTA legible a tamaño móvil

- [ ] La URL está **completa** (no `dome.dowi.es/…` cortada, no QR sin URL)
- [ ] Legible en preview móvil (~390 CSS px de ancho, o zoom 100 % en el export 1080)
- [ ] El destino coincide con el permalink real (p. ej. `https://dome.dowi.es/blog/pdf-to-follow-up`)

Firma CTA: **Lucia / Mateo** — fecha: ________

---

## 4. Claims de producto

El copy del creativo no se publica sin las tres firmas. Nada de métricas vanidosas ni ataques con nombre de competidor.

| Rol | Nombre | Fecha | OK |
| --- | --- | --- | --- |
| SEO | Virginia | | [ ] |
| Producto | Tomas | | [ ] |
| Técnico | Mateo | | [ ] |

Claim aprobado (citar literal):

> …

Notas / vetos:

---

## 5. Fidelidad del mock a Dome real

El pack [#18](https://github.com/maxprain12/landing-page-dome/pull/18) (`arc-p1-123`: diagramas abstractos + pills de beneficio genérico) **no pasa**. Si el creativo podría ser de cualquier herramienta, el pack queda bloqueado. «cluster P1» y el resto de jerga de este checklist son para **este archivo**, no para slides ni captions.

### Escenario concreto (obligatorio)

Una escena reconocible, no un beneficio genérico:

- [ ] PDF **con nombre de archivo** (p. ej. `propuesta Q3.pdf`)
- [ ] Persona **con nombre** (p. ej. Ana)
- [ ] Cadena visible: **ese PDF + esa persona → borrador de Many → Aprobar**
- [ ] No vale «un documento», «un contacto», «el agente» sin nombre

### UI de Dome, no infografía

- [ ] Recreación de componentes reales: **workspace / people / many / approval** (biblioteca, persona, chat de Many, botón Aprobar; dock si el pack lo pide)
- [ ] **No** diagramas numerados abstractos (1→2→3 en círculos, flechas geométricas, flow charts)
- [ ] **No** UI inventada ni chrome de otro producto
- [ ] **No** framing de chat-cloud / Manychat / Zapia / auto-DM
- [ ] Logos de proveedores solo desde SVG públicos del repo o `SOURCES.txt`

### Copy del creativo

**Permitido:** local-first, «solo si conectas», Many prepara / tú apruebas.

**Veto** (aparece en slide, caption u overlay → pack bloqueado):

- «agentes», «CRM», «escala», «Many hace el resto», «cluster P1»
- Pills de beneficio genérico sin escenario (`Más productividad`, `Tu equipo en un solo lugar`, `IA que trabaja por ti`…)

- [ ] Cero jerga SaaS de la lista de veto
- [ ] Cero pills de beneficio sin el PDF + persona nombrados
- [ ] Local-first visible: Many **prepara**, la persona **aprueba / envía**

Firma mock: **Mateo / Roman** — fecha: ________

---

## 6. Secuencia editorial (no un revoltijo)

El feed no es un mishmash. Cada post ocupa **un** slot del arco y enlaza al anterior.

Arco obligatorio (cluster P1), en este orden:

1. **Dolor / beneficio**
2. **Loop** Documento → Persona → Many → Aprobar
3. **CTA how-to PDF** (p. ej. `https://dome.dowi.es/blog/pdf-to-follow-up`)

**Capítulos aparte**, solo **después** de 1→2→3 publicados:

- `chapter-c2` — anti-Manychat (no somos auto-DM)
- `chapter-dock` — multi-provider (Dome + tu modelo)

- [ ] Slot declarado arriba (`1` / `2` / `3` / `chapter-c2` / `chapter-dock`)
- [ ] Este pack no mezcla slots (un carrusel puede contar el loop **o** el beneficio **o** el CTA, no los tres más un capítulo)
- [ ] Enlace al post anterior rellenado (caption, sticker o slide). Slot 1: «es el arranque» anotado
- [ ] Si es `chapter-*`: los slots 1–3 ya tienen publish OK. Si no, este pack queda bloqueado

| Rol | Nombre | Fecha | OK |
| --- | --- | --- | --- |
| Editorial / SEO | Virginia | | [ ] |
| Creativo (arco) | Lucia | | [ ] |

---

## 7. Formato cerrado (no slides huérfanos)

Se publica un **carrusel o reel cerrado**, no recortes sueltos.

- [ ] Carrusel: todos los slides del arco de *este* post, numerados, mismo ratio, `ratios.json` completo
- [ ] Reel: todos los frames del beat + mp4 si el pack lo declara; no un still suelto de un reel de 4
- [ ] Quote card / banner único: es una pieza cerrada, no la slide 03 de otro carrusel
- [ ] Nada de «subimos solo la 2 y la 4»

Pieza declarada: carrusel (N slides) / reel (N frames) / único (banner o quote)

Firma formato: **Lucia / Roman** — fecha: ________

---

## 8. Tokens de marca Dome (obligatorio)

Canon: [dome/docs/brand](https://github.com/maxprain12/dome/blob/main/docs/brand/README.md) + [tokens.md](https://github.com/maxprain12/dome/blob/main/docs/brand/tokens.md). Many: `assets/many.svg`.

| Token | Hex / valor | ¿Este pack? |
| --- | --- | --- |
| Many body (lima) | **`#E0EAB4`** | [ ] |
| Many ojos / stroke (oliva) | **`#596037`** | [ ] |
| Ink zinc | `#27272A` light / `#FAFAFA` dark | [ ] |
| Tipografía | **Inter** (UI/display); JetBrains Mono solo en code | [ ] |
| Lima | solo en el símbolo Many, no como wash de slide | [ ] |

- [ ] Many sale del SVG canónico, no redibujado
- [ ] **Cero** paletas inventadas
- [ ] **Cero** colores de competidor o de mock ajeno (morado Zoe, rosa Stripe, azul Manychat, papel cálido `#f1ead6`, Instrument Serif)

| Rol | Nombre | Fecha | OK |
| --- | --- | --- | --- |
| Creativo | Lucia | | [ ] |
| Técnico | Mateo | | [ ] |

---

## 9. OK creativo + OK de publicación

Instagram (y el resto de canales del pack) no se publican hasta las dos firmas.

| Rol | Nombre | Fecha | OK |
| --- | --- | --- | --- |
| Creativo | Lucia | | [ ] |
| Publicación | Sofia | | [ ] |

Sofía no publica con gates 1–8 abiertos, sin slot de secuencia, ni sin `pnpm run check:social-drafts` en verde sobre este pack. Los `chapter-*` no se publican antes que 1→2→3.

---

## Evidencia

| Qué | Ruta |
| --- | --- |
| Manifest de px | `ratios.json` |
| Safe-area full-frame | `safe-area/` |
| Superdesign / canvas | |
| PR de assets | |

---

## Resultado

- [ ] Pack **listo para publicar** (todas las firmas + script OK)
- [ ] Pack **bloqueado** — motivo:
