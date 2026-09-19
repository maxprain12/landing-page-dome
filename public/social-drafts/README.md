# Social drafts — gate de pre-publicación

Carpeta de **packs creativos en draft**. No son la landing. No se publican en Instagram / LinkedIn / X hasta que el pack pase el checklist. El sitio auto-despliega desde `main`: no mergear un pack a `main` solo para «dejarlo visible».

Instagram está congelado hasta que cada pack tenga validación firmada.

## Cómo validar un pack

1. Copiá [`_template/VALIDATION.md`](./_template/VALIDATION.md) y [`_template/ratios.json`](./_template/ratios.json) a `public/social-drafts/<pack>/`.
2. Editá `ratios.json`: un entry por export (png/jpg). Usá un `preset` de la tabla o `width` + `height` en px reales.
3. Adjuntá capturas full-frame en `<pack>/safe-area/` (Many, CTA, badges y botones sin clip).
4. Rellená las **nueve** puertas y las firmas (Virginia / Tomas / Mateo / Lucia / Roman / Sofia), incluido **slot de secuencia**, **formato cerrado** y **tokens de marca**.
5. Corré el check de píxeles:

```bash
pnpm run check:social-drafts
pnpm run check:social-drafts -- pdf-to-follow-up
pnpm run check:social-drafts -- public/social-drafts/pdf-to-follow-up
```

El script lee el IHDR (PNG) o SOF (JPEG) y falla (exit ≠ 0) si el tamaño no coincide. Sin dependencias extra. Los mp4 no se miden. Las capturas en `safe-area/` no entran en el manifest.

Sofía publica **después** de creative OK (Lucia) + publish OK (Sofia), script verde, y gates 6–8 (secuencia, formato cerrado, marca). No hay credenciales de Instagram en este repo.

## Secuencia editorial (arco, no mishmash)

Cada post ocupa **un** slot y **enlaza al anterior**. No se publica un revoltijo de ángulos.

| Orden | Slot | Qué es |
| --- | --- | --- |
| 1 | `1` | Dolor / beneficio |
| 2 | `2` | Loop Documento → Persona → Many → Aprobar |
| 3 | `3` | CTA how-to PDF (cluster P1, p. ej. `/blog/pdf-to-follow-up`) |
| Después | `chapter-c2` | Anti-Manychat (capítulo aparte) |
| Después | `chapter-dock` | Dock multi-provider (capítulo aparte) |

`chapter-c2` y `chapter-dock` **solo después** de que 1→2→3 tengan publish OK. El campo «post anterior» es obligatorio salvo el slot 1.

## Formato cerrado

Carrusel o reel **completo**. Prohibido subir slides huérfanos (la 02 sin la 01/03, un still suelto de un reel de 4). Un banner o quote card cuenta si es pieza cerrada, no un recorte de otro pack.

## Tokens de marca (obligatorio)

Canon: [dome/docs/brand](https://github.com/maxprain12/dome/blob/main/docs/brand/README.md). Many = `assets/many.svg`.

| Uso | Valor |
| --- | --- |
| Many lima | `#E0EAB4` |
| Many oliva | `#596037` |
| Ink | zinc (`#27272A` / `#FAFAFA`) |
| Tipo | Inter |

Lima solo en el símbolo Many. **No** paletas inventadas ni colores de competidor (morado Zoe, rosa Stripe, azul Manychat, papel cálido).

## Ratios canónicos

| Canal | Preset | Px |
| --- | --- | --- |
| LinkedIn banner | `linkedin` | 1584×396 |
| X banner | `x` | 1500×500 |
| IG feed / carrusel | `ig-feed` / `ig-carousel` | 1080×1350 |
| IG reel | `ig-reel` | 1080×1920 |
| IG / LinkedIn cuadrado | `ig-square` | 1080×1080 |
| Avatar perfil | `ig-avatar-320` / `640` / `1080` | 320 / 640 / 1080 |

## Packs que necesitan revalidación

Estos packs ya tienen (o tendrán) exports en PRs abiertos. **No regenerar creatividades** desde esta infra: copiar el checklist, declarar ratios y firmar.

| Pack | PR | Slot sugerido | Qué hay | Estado |
| --- | --- | --- | --- | --- |
| [`pdf-to-follow-up`](./pdf-to-follow-up/) | [#9](https://github.com/maxprain12/landing-page-dome/pull/9) | arco P1 (`1`–`3`) | LinkedIn 1584×396, X 1500×500, reels 1080×1920 | Revalidar |
| [`dock-multi-provider`](./dock-multi-provider/) | [#10](https://github.com/maxprain12/landing-page-dome/pull/10) | `chapter-dock` (después de 1→2→3) | Stills + reel 1080×1920 | Revalidar |
| [`c2-anti-manychat`](./c2-anti-manychat/) | [#11](https://github.com/maxprain12/landing-page-dome/pull/11) | `chapter-c2` (después de 1→2→3) | Quote card 1080×1080 | Revalidar |
| [`carousel-zoe-stripe`](./carousel-zoe-stripe/) | [#14](https://github.com/maxprain12/landing-page-dome/pull/14) | a definir (no mezclar capítulo) | Carrusel 4 slides 1080×1350 | Revalidar — marca Zoe/Stripe |

Quien valide (Lucia / Mateo / Roman) abre el `VALIDATION.md` del pack, corre el script sobre los PNG del PR de assets, y deja las firmas. Los PNG viven en esos PRs, no en este gate.

## Convención de carpeta

```
public/social-drafts/<pack>/
  ratios.json          ← contrato de px (CI)
  VALIDATION.md        ← checklist + firmas
  README.md            ← claim, caption, canvas
  *.png                ← exports
  safe-area/           ← screenshots full-frame (review humana)
```

`_template/` no es un pack: el scanner lo ignora.
