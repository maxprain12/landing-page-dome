# Google OAuth consent screen — URLs (Dome landing)

Use these **exact** values in [Google Cloud Console → OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent) so they match the public site and pass verification.

| Field | Recommended value |
|--------|-------------------|
| **Application home page** | `https://dome.dowi.es/` |
| **Privacy policy link** | `https://dome.dowi.es/privacy/` |

Notes:

- Home page must stay on the **same domain** as declared (no redirect to another domain; avoid `www` vs apex mismatch—pick one and stick to it).
- Privacy policy URL must match the **character-for-character** link users see on [dome.dowi.es](https://dome.dowi.es) (including trailing slash if you use `/privacy/`).
- Verify domain ownership in **Google Search Console** if Google asks for homepage domain verification.

Site `site` in Astro: [`astro.config.mjs`](../astro.config.mjs) (`https://dome.dowi.es`).
