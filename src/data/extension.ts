import type { StoreLink } from "./stores";

/** Store URLs stay null until the listing is live; set them here or via env at build time. */
export const extensionStores: StoreLink[] = [
  { id: "chrome", href: import.meta.env.PUBLIC_EXTENSION_CHROME_URL || null },
  { id: "edge", href: import.meta.env.PUBLIC_EXTENSION_EDGE_URL || null },
  { id: "safari", href: import.meta.env.PUBLIC_EXTENSION_SAFARI_URL || null },
];
