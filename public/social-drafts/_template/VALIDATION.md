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

- [ ] UI tomada de componentes reales de Dome (biblioteca, persona, Many, Aprobar, dock…)
- [ ] **No** UI inventada ni chrome de otro producto
- [ ] **No** framing de chat-cloud / Manychat / Zapia / auto-DM
- [ ] Local-first visible: Many **prepara**, la persona **aprueba / envía**
- [ ] Logos de proveedores solo desde SVG públicos del repo o `SOURCES.txt`

Firma mock: **Mateo / Roman** — fecha: ________

---

## 6. OK creativo + OK de publicación

Instagram (y el resto de canales del pack) no se publican hasta las dos firmas.

| Rol | Nombre | Fecha | OK |
| --- | --- | --- | --- |
| Creativo | Lucia | | [ ] |
| Publicación | Sofia | | [ ] |

Sofía no publica con gates 1–5 abiertos ni sin `pnpm run check:social-drafts` en verde sobre este pack.

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
