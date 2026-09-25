type SignedRelease = { version: string; channels: string[]; notesMarkdown: string };

/** Short fingerprint of what the changelog shows, shared by the build and the live script. */
export function releasesSignature(releases: SignedRelease[]): string {
  const text = JSON.stringify(releases.map((entry) => [entry.version, entry.channels, entry.notesMarkdown]));
  let hash = 5381;
  for (let i = 0; i < text.length; i += 1) {
    hash = ((hash << 5) + hash + (text.codePointAt(i) ?? 0)) | 0;
  }
  return `${releases.length}-${(hash >>> 0).toString(36)}`;
}
