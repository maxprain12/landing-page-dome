import type { StoreLink } from "./stores";

/** Store URLs stay null until the listing is live; set them here or via env at build time. */
export const companionStores: StoreLink[] = [
  { id: "appStore", href: import.meta.env.PUBLIC_COMPANION_APP_STORE_URL || null },
  { id: "testFlight", href: import.meta.env.PUBLIC_COMPANION_TESTFLIGHT_URL || null },
];
