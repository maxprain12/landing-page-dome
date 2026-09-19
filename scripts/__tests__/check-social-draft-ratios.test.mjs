import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import {
  KNOWN_PRESETS,
  checkSocialDrafts,
  readImageSize,
  readJpegSize,
  readPngSize,
  resolveExpectedSize,
  validatePack,
} from '../check-social-draft-ratios.mjs';

function fakePng(width, height) {
  const buf = Buffer.alloc(33);
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).copy(buf);
  buf.writeUInt32BE(13, 8);
  buf.write('IHDR', 12);
  buf.writeUInt32BE(width, 16);
  buf.writeUInt32BE(height, 20);
  buf[24] = 8;
  buf[25] = 2;
  return buf;
}

function fakeJpeg(width, height) {
  const buf = Buffer.alloc(20);
  buf[0] = 0xff;
  buf[1] = 0xd8;
  buf[2] = 0xff;
  buf[3] = 0xc0;
  buf.writeUInt16BE(11, 4);
  buf[6] = 8;
  buf.writeUInt16BE(height, 7);
  buf.writeUInt16BE(width, 9);
  buf[11] = 3;
  return buf;
}

function makePack(files, manifest) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'social-draft-'));
  if (manifest) {
    fs.writeFileSync(path.join(dir, 'ratios.json'), JSON.stringify(manifest));
  }
  for (const [name, buf] of Object.entries(files)) {
    const dest = path.join(dir, name);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, buf);
  }
  return dir;
}

describe('readPngSize / readJpegSize', () => {
  it('reads IHDR width and height', () => {
    assert.deepEqual(readPngSize(fakePng(1584, 396)), { width: 1584, height: 396, format: 'png' });
  });

  it('reads SOF0 width and height', () => {
    assert.deepEqual(readJpegSize(fakeJpeg(1080, 1350)), { width: 1080, height: 1350, format: 'jpeg' });
  });

  it('returns null for garbage', () => {
    assert.equal(readImageSize(Buffer.from('not-an-image')), null);
  });
});

describe('resolveExpectedSize', () => {
  it('resolves known presets', () => {
    assert.deepEqual(resolveExpectedSize({ preset: 'linkedin' }), KNOWN_PRESETS.linkedin);
    assert.deepEqual(resolveExpectedSize({ preset: 'ig-carousel' }), { width: 1080, height: 1350 });
    assert.deepEqual(resolveExpectedSize({ preset: 'ig-avatar-640' }), { width: 640, height: 640 });
  });

  it('accepts explicit width and height', () => {
    assert.deepEqual(resolveExpectedSize({ width: 800, height: 600 }), { width: 800, height: 600 });
  });

  it('rejects unknown presets and mismatched overrides', () => {
    assert.match(resolveExpectedSize({ preset: 'billboard' }).error, /unknown preset/);
    assert.match(resolveExpectedSize({ preset: 'x', width: 1, height: 1 }).error, /1500×500/);
  });
});

describe('validatePack', () => {
  it('skips stub packs that have a manifest but no images', () => {
    const dir = makePack({}, { pack: 'stub', files: [{ file: 'banner.png', preset: 'linkedin' }] });
    const result = validatePack(dir);
    assert.equal(result.ok, true);
    assert.equal(result.skipped, true);
    assert.equal(result.reason, 'no-images');
  });

  it('fails an explicit pack check when images are missing', () => {
    const dir = makePack({}, { pack: 'stub', files: [{ file: 'banner.png', preset: 'linkedin' }] });
    const result = validatePack(dir, { requireImages: true });
    assert.equal(result.ok, false);
    assert.match(result.errors[0], /no PNG\/JPEG/);
  });

  it('passes when PNG pixels match the preset', () => {
    const dir = makePack(
      { 'banner-linkedin.png': fakePng(1584, 396) },
      { pack: 'ok', files: [{ file: 'banner-linkedin.png', preset: 'linkedin' }] },
    );
    const result = validatePack(dir);
    assert.equal(result.ok, true);
    assert.equal(result.skipped, false);
    assert.equal(result.checked[0].width, 1584);
  });

  it('fails when the measured size is wrong', () => {
    const dir = makePack(
      { 'feed.png': fakePng(1080, 1080) },
      { pack: 'bad', files: [{ file: 'feed.png', preset: 'ig-feed' }] },
    );
    const result = validatePack(dir);
    assert.equal(result.ok, false);
    assert.match(result.errors[0], /1080×1080 png, expected 1080×1350/);
  });

  it('fails images without a manifest and ignores safe-area shots', () => {
    const dir = makePack({
      'export.png': fakePng(10, 10),
      'safe-area/full-frame.png': fakePng(390, 844),
    });
    const result = validatePack(dir);
    assert.equal(result.ok, false);
    assert.match(result.errors[0], /ratios.json is missing/);
  });
});

describe('checkSocialDrafts', () => {
  it('skips _template and stub packs under a drafts root', () => {
    const repo = fs.mkdtempSync(path.join(os.tmpdir(), 'landing-'));
    const drafts = path.join(repo, 'public/social-drafts');
    fs.mkdirSync(path.join(drafts, '_template'), { recursive: true });
    fs.writeFileSync(
      path.join(drafts, '_template', 'ratios.json'),
      JSON.stringify({ pack: '_template', files: [{ file: 'missing.png', preset: 'linkedin' }] }),
    );
    const stub = path.join(drafts, 'pdf-to-follow-up');
    fs.mkdirSync(stub, { recursive: true });
    fs.writeFileSync(
      path.join(stub, 'ratios.json'),
      JSON.stringify({ pack: 'pdf-to-follow-up', files: [{ file: 'banner-linkedin.png', preset: 'linkedin' }] }),
    );
    const report = checkSocialDrafts(repo);
    assert.equal(report.ok, true);
    assert.equal(report.results.length, 1);
    assert.equal(report.results[0].skipped, true);
  });
});
