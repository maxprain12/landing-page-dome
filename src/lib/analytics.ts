/**
 * Analytics for the public site: Google Analytics 4 through Google Tag Manager, loaded only after the visitor
 * accepts it and only on the production host (src/scripts/consent.ts). The container holds a single Google tag
 * for the GA4 stream "Dome web".
 */
export const GTM_ID = "GTM-KBF9GH2P";
export const GA_ID = "G-ZMJGZGWT5E";
/** Local builds, previews and copies of the site never report to this property. */
export const ANALYTICS_HOSTS = ["dome.dowi.es"];
export const CONSENT_KEY = "dome:consent";
/** Bump when the choices change: an older decision is asked again. */
export const CONSENT_VERSION = 1;
