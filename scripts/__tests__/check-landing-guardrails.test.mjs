import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { countHex } from '../check-brand-tokens.mjs';
import { diffI18nCatalogs } from '../check-i18n-parity.mjs';
import { extractAssetRefs } from '../check-required-assets.mjs';

describe('countHex', () => {
  it('ignores css variable definitions', () => {
    assert.equal(countHex('  --color-bg: #f1ead6;\n', { skipCssVars: true }), 0);
    assert.equal(countHex('  color: #fff;\n', { skipCssVars: true }), 1);
  });
});

describe('diffI18nCatalogs', () => {
  it('reports missing keys', () => {
    const diff = diffI18nCatalogs({ nav: { a: 'A' } }, { nav: {} });
    assert.deepEqual(diff.missingInEs, ['nav.a']);
  });
});

describe('extractAssetRefs', () => {
  it('finds /assets paths', () => {
    assert.deepEqual(extractAssetRefs('src="/assets/wave.svg"'), ['/assets/wave.svg']);
  });
});

describe('checkContentParity', () => {
  it('requires a matching translation and Image alt', async () => {
    const { checkContentParity } = await import('../check-content-parity.mjs');
    const errors = checkContentParity(process.cwd());
    assert.equal(errors.length, 0, errors.join('\n'));
  });
});
