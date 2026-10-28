import test from 'node:test';
import assert from 'node:assert/strict';
import { tallyEmbedUrl } from '../lib/lead-intake.mjs';

test('embed whitelists attribution and plan, never forwards private URL parameters or prices', () => {
  const url = new URL(tallyEmbedUrl('fakeForm', { pageUrl: 'https://aramis.agency/servicios?email=private@example.test&token=secret&utm_source=google#private',
    sourceForm: 'plan_card', title: 'Plan web', selections: { posts: 4, pagina: true, precio: 100, unexpected: 'private' } }));
  assert.equal(url.searchParams.get('source_url'), 'https://aramis.agency/servicios');
  assert.equal(url.searchParams.get('utm_source'), 'google');
  assert.deepEqual(JSON.parse(url.searchParams.get('plan')), { selections: { posts: 4, pagina: true } });
  assert.ok(!url.href.includes('private')); assert.ok(!url.href.includes('secret'));
});
test('invalid form IDs cannot change embed origin or create an unsafe URL', () => {
  for (const id of ['', '../evil', 'https://evil.test', 'x?secret=1']) assert.equal(tallyEmbedUrl(id), null);
  assert.equal(new URL(tallyEmbedUrl('fakeForm')).origin, 'https://tally.so');
});
