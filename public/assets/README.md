# Image assets (landing)

Drop PNG files in this folder with these exact names. The landing references them as `/assets/...`.

## Many mascot (transparent PNG, ~256×256)

| File | Suggested use |
|------|----------------|
| `many-wave.png` | Greeting, wave mood |
| `many-think.png` | Lightbulb / thinking |
| `many-glasses.png` | Scholar / reading |

If a file is missing, the page falls back to `/Many.svg` for the mascot.

## Product screenshots (~1280×800)

| File | Shown in |
|------|----------|
| `screen-home.png` | Product — home workspace |
| `screen-many.png` | Meet Many — assistant panel |
| `screen-marketplace.png` | Marketplace (below agent cards) |

If a screenshot is missing, a labeled placeholder appears until you add the file (no build step required).

## Export tips

- Use the same window size for consistency (e.g. 1280×800).
- `Many` images: transparent background, high enough resolution for Retina (e.g. 512px wide max dimension).
