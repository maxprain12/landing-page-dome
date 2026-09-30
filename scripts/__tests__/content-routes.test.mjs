import assert from 'node:assert/strict';
import test from 'node:test';
import { contentRoute } from '../content-routes.mjs';

test('retired posts are gone in both locales; replaced manuals redirect to relevant guides', () => {
  for (const locale of ['', '/en']) {
    for (const slug of ['pdf-to-follow-up', 'local-first', 'many-with-ollama']) assert.deepEqual(contentRoute(`${locale}/blog/${slug}/`), { status: 410 });
    assert.deepEqual(contentRoute(`${locale}/manual/first-workflow`), { status: 301, location: `${locale}/manual/getting-started` });
    assert.deepEqual(contentRoute(`${locale}/manual/contacts/`), { status: 301, location: `${locale}/manual/integrations` });
    assert.deepEqual(contentRoute(`${locale}/manual/email-and-social`), { status: 301, location: `${locale}/manual/integrations` });
    assert.equal(contentRoute(`${locale}/manual/library`), null);
    assert.equal(contentRoute(`${locale}/blog/new-post`), null);
  }
});
