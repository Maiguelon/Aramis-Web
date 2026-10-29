import test from 'node:test';
import assert from 'node:assert/strict';
import { tallyFormUrl } from '../lib/lead-intake.mjs';

test('public form link preserves attribution and plan without forwarding private URL parameters or prices', () => {
  const url = new URL(tallyFormUrl('fakeForm', { pageUrl: 'https://aramis.agency/servicios?email=private@example.test&token=secret&utm_source=google#private',
    sourceForm: 'plan_card', title: 'Plan web', selections: { posts: 4, pagina: true, precio: 100, unexpected: 'private' } }));
  assert.equal(url.searchParams.get('source_url'), 'https://aramis.agency/servicios');
  assert.equal(url.searchParams.get('utm_source'), 'google');
  assert.deepEqual(JSON.parse(url.searchParams.get('plan')), { selections: { posts: 4, pagina: true } });
  assert.ok(!url.href.includes('private')); assert.ok(!url.href.includes('secret'));
  assert.equal(url.pathname, '/r/fakeForm');
  assert.equal(url.searchParams.get('plan_title'), 'Plan web');
});
test('invalid form IDs cannot change form origin or create an unsafe URL', () => {
  for (const id of ['', '../evil', 'https://evil.test', 'x?secret=1']) assert.equal(tallyFormUrl(id), null);
  assert.equal(new URL(tallyFormUrl('fakeForm')).origin, 'https://tally.so');
});

test('form link handles absent attribution and empty selections without inventing a plan', () => {
  const url = new URL(tallyFormUrl('fakeForm', { pageUrl: 'not-a-url', sourceForm: 'unknown' }));
  assert.equal(url.searchParams.get('source_form'), 'footer');
  assert.equal(url.searchParams.has('source_url'), false);
  assert.equal(url.searchParams.has('plan'), false);
});
