export interface StoreLink {
  id: string;
  href: string | null;
}

export function liveStores(stores: StoreLink[]): Array<StoreLink & { href: string }> {
  return stores.filter((store): store is StoreLink & { href: string } => Boolean(store.href));
}
