#!/usr/bin/env node
/**
 * Checks PNG/JPEG pixel size of social-draft exports against each pack's ratios.json.
 *
 *   node scripts/check-social-draft-ratios.mjs
 *   node scripts/check-social-draft-ratios.mjs pdf-to-follow-up
 *   node scripts/check-social-draft-ratios.mjs public/social-drafts/c2-anti-manychat
 *
 * Packs without image exports are skipped (stubs / PR-only assets).
 * A pack with images and no ratios.json fails. Videos are ignored.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const SOCIAL_DRAFTS_DIR = 'public/social-drafts';

export const KNOWN_PRESETS = {
  linkedin: { width: 1584, height: 396 },
  x: { width: 1500, height: 500 },
  'ig-feed': { width: 1080, height: 1350 },
  'ig-carousel': { width: 1080, height: 1350 },
  'ig-reel': { width: 1080, height: 1920 },
  'ig-square': { width: 1080, height: 1080 },
  'ig-avatar-320': { width: 320, height: 320 },
  'ig-avatar-640': { width: 640, height: 640 },
  'ig-avatar-1080': { width: 1080, height: 1080 },
};

const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg']);
const SKIP_DIRS = new Set(['safe-area', 'evidence']);
const PNG_SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function assertNever(value) {
  throw new Error(`unhandled image format: ${value}`);
}

export function readPngSize(buf) {
  if (buf.length < 24) return null;
  if (!buf.subarray(0, 8).equals(PNG_SIG)) return null;
  if (buf.toString('ascii', 12, 16) !== 'IHDR') return null;
  return {
    width: buf.readUInt32BE(16),
    height: buf.readUInt32BE(20),
    format: 'png',
  };
}

export function readJpegSize(buf) {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let i = 2;
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) {
      i += 1;
      continue;
    }
    const marker = buf[i + 1];
    if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) {
      i += 2;
      continue;
    }
    if (marker === 0x00 || marker === 0xff) {
      i += 1;
      continue;
    }
    if (i + 4 > buf.length) break;
    const len = buf.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xc3) {
      return {
        width: buf.readUInt16BE(i + 7),
        height: buf.readUInt16BE(i + 5),
        format: 'jpeg',
      };
    }
    if (len < 2) break;
    i += 2 + len;
  }
  return null;
}

export function readImageSize(buf) {
  const png = readPngSize(buf);
  if (png) return png;
  const jpeg = readJpegSize(buf);
  if (jpeg) return jpeg;
  return null;
}

export function resolveExpectedSize(entry) {
  if (!entry || typeof entry !== 'object') {
    return { error: 'entry must be an object' };
  }
  const presetName = entry.preset;
  let fromPreset = null;
  if (presetName != null) {
    if (typeof presetName !== 'string' || !(presetName in KNOWN_PRESETS)) {
      return { error: `unknown preset "${presetName}"` };
    }
    fromPreset = KNOWN_PRESETS[presetName];
  }
  const hasWidth = Number.isInteger(entry.width);
  const hasHeight = Number.isInteger(entry.height);
  if (fromPreset && (hasWidth || hasHeight)) {
    if (entry.width !== fromPreset.width || entry.height !== fromPreset.height) {
      return {
        error: `preset "${presetName}" is ${fromPreset.width}×${fromPreset.height}, got ${entry.width}×${entry.height}`,
      };
    }
  }
  if (fromPreset) return { width: fromPreset.width, height: fromPreset.height };
  if (hasWidth && hasHeight) return { width: entry.width, height: entry.height };
  return { error: 'entry needs preset or integer width+height' };
}

export function loadManifest(packDir) {
  const manifestPath = path.join(packDir, 'ratios.json');
  if (!fs.existsSync(manifestPath)) return null;
  let data;
  try {
    data = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`invalid JSON in ${manifestPath}: ${message}`);
  }
  if (!data || typeof data !== 'object' || !Array.isArray(data.files)) {
    throw new Error(`${manifestPath} must be an object with a files array`);
  }
  return data;
}

function listImageFiles(dir, relBase = '') {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const rel = relBase ? `${relBase}/${entry.name}` : entry.name;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name) || entry.name.startsWith('_')) continue;
      out.push(...listImageFiles(full, rel));
      continue;
    }
    if (IMAGE_EXT.has(path.extname(entry.name).toLowerCase())) out.push(rel);
  }
  return out;
}

export function listPackImages(packDir) {
  return listImageFiles(packDir);
}

export function validatePack(packDir, { requireImages = false } = {}) {
  const errors = [];
  const checked = [];
  const images = listPackImages(packDir);
  let manifest;
  try {
    manifest = loadManifest(packDir);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, skipped: false, errors: [message], checked };
  }

  if (images.length === 0) {
    if (requireImages) {
      return {
        ok: false,
        skipped: false,
        errors: [`${packDir}: no PNG/JPEG exports to check`],
        checked,
      };
    }
    return { ok: true, skipped: true, reason: 'no-images', errors, checked };
  }

  if (!manifest) {
    return {
      ok: false,
      skipped: false,
      errors: [`${packDir}: images present but ratios.json is missing`],
      checked,
    };
  }

  for (const entry of manifest.files) {
    if (!entry || typeof entry.file !== 'string' || entry.file.length === 0) {
      errors.push(`${packDir}: files[] entry is missing "file"`);
      continue;
    }
    const expected = resolveExpectedSize(entry);
    if (expected.error) {
      errors.push(`${entry.file}: ${expected.error}`);
      continue;
    }
    const abs = path.join(packDir, entry.file);
    if (!fs.existsSync(abs)) {
      errors.push(`${entry.file}: missing (expected ${expected.width}×${expected.height})`);
      continue;
    }
    const size = readImageSize(fs.readFileSync(abs));
    if (!size) {
      errors.push(`${entry.file}: not a readable PNG/JPEG`);
      continue;
    }
    const format = size.format;
    switch (format) {
      case 'png':
      case 'jpeg':
        break;
      default:
        assertNever(format);
    }
    if (size.width !== expected.width || size.height !== expected.height) {
      errors.push(
        `${entry.file}: ${size.width}×${size.height} ${size.format}, expected ${expected.width}×${expected.height}`,
      );
      continue;
    }
    checked.push({ file: entry.file, ...size });
  }

  return { ok: errors.length === 0, skipped: false, errors, checked };
}

export function findPackDirs(draftsRoot) {
  if (!fs.existsSync(draftsRoot)) return [];
  return fs
    .readdirSync(draftsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_') && !entry.name.startsWith('.'))
    .map((entry) => path.join(draftsRoot, entry.name))
    .sort();
}

export function resolvePackDir(repoRoot, spec) {
  if (!spec) return null;
  const asPath = path.resolve(repoRoot, spec);
  if (fs.existsSync(asPath)) return asPath;
  const asSlug = path.join(repoRoot, SOCIAL_DRAFTS_DIR, spec);
  if (fs.existsSync(asSlug)) return asSlug;
  return asPath;
}

export function checkSocialDrafts(repoRoot, spec) {
  if (spec) {
    const packDir = resolvePackDir(repoRoot, spec);
    const name = path.basename(packDir);
    if (!fs.existsSync(packDir)) {
      return { ok: false, results: [{ name, dir: packDir, ok: false, skipped: false, errors: [`pack not found: ${spec}`], checked: [] }] };
    }
    const result = validatePack(packDir, { requireImages: true });
    return { ok: result.ok, results: [{ name, dir: packDir, ...result }] };
  }

  const draftsRoot = path.join(repoRoot, SOCIAL_DRAFTS_DIR);
  const dirs = findPackDirs(draftsRoot);
  const results = dirs.map((dir) => ({ name: path.basename(dir), dir, ...validatePack(dir) }));
  return { ok: results.every((item) => item.ok), results };
}

function isMain() {
  return path.resolve(process.argv[1] || '') === fileURLToPath(import.meta.url);
}

function printReport(report) {
  let skipped = 0;
  let failed = 0;
  let checkedFiles = 0;
  for (const item of report.results) {
    if (item.skipped) {
      skipped += 1;
      console.log(`check:social-drafts: skip ${item.name} (${item.reason || 'skipped'})`);
      continue;
    }
    checkedFiles += item.checked.length;
    if (item.ok) {
      console.log(`check:social-drafts: OK ${item.name} (${item.checked.length} file${item.checked.length === 1 ? '' : 's'})`);
      continue;
    }
    failed += 1;
    console.error(`check:social-drafts: FAIL ${item.name}`);
    for (const error of item.errors) console.error(`  ${error}`);
  }
  if (report.results.length === 0) {
    console.log('check:social-drafts: OK (no packs under public/social-drafts/)');
    return;
  }
  if (failed > 0) return;
  console.log(
    `check:social-drafts: OK (${checkedFiles} file${checkedFiles === 1 ? '' : 's'} checked, ${skipped} stub${skipped === 1 ? '' : 's'} skipped)`,
  );
}

if (isMain()) {
  const spec = process.argv.slice(2).find((arg) => !arg.startsWith('-'));
  const report = checkSocialDrafts(path.join(__dirname, '..'), spec);
  printReport(report);
  if (!report.ok) process.exit(1);
}
