import test from 'node:test';
import assert from 'node:assert/strict';
import { tallyFormUrl, planSummary } from '../lib/lead-intake.mjs';

test('public form link preserves attribution and plan without forwarding private URL parameters or prices', () => {
  const url = new URL(tallyFormUrl('fakeForm', { pageUrl: 'https://aramis.agency/servicios?email=private@example.test&token=secret&utm_source=google#private',
    sourceForm: 'plan_card', title: 'Plan web', selections: { posts: 4, pagina: true, precio: 100, unexpected: 'private' } }));
  assert.equal(url.searchParams.get('source_url'), 'https://aramis.agency/servicios');
  assert.equal(url.searchParams.get('utm_source'), 'google');
  assert.deepEqual(JSON.parse(url.searchParams.get('plan')), { selections: { posts: 4, pagina: true } });
  assert.ok(!url.href.includes('private')); assert.ok(!url.href.includes('secret'));
  assert.equal(url.pathname, '/r/fakeForm');
  assert.equal(url.searchParams.get('plan_title'), 'Plan web');
  assert.equal(url.searchParams.get('plan_summary'), '4 posts por mes · Historias bonificadas · Página personalizada');
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
  assert.equal(url.searchParams.has('plan_title'), false);
  assert.equal(url.searchParams.has('plan_summary'), false);
});

test('prebuilt video and identity plans produce readable summaries without unrelated service claims', () => {
  assert.equal(planSummary({ reels: 4 }), '4 reels por mes · Historias bonificadas');
  assert.equal(planSummary({ brandbook: true, tarjetas: true, folletos: 2 }), 'Brandbook · Tarjetas · 2 folletos');
  assert.equal(planSummary({ posts: 1, reels: 1, ads: true, folletos: 1, tiendanube: true }),
    '1 post por mes · 1 reel por mes · Historias bonificadas · Gestión de Meta Ads · 1 folleto · Tiendanube');
});

test('display summary ignores invalid choices and cannot be injected through browser query parameters', () => {
  assert.equal(planSummary({ posts: -1, reels: 101, folletos: '5', ads: 'true', pagina: false, price: 500 }), '');
  const footer = new URL(tallyFormUrl('fakeForm', { sourceForm: 'footer', title: 'Unexpected plan', selections: { posts: 4 } }));
  assert.equal(footer.searchParams.has('plan_summary'), false);
  assert.equal(footer.searchParams.has('plan_title'), false);
  const plan = new URL(tallyFormUrl('fakeForm', { sourceForm: 'plan_card', pageUrl: 'https://aramis.agency/planes?plan_summary=private&plan_title=private',
    title: 'Plan <web>\n', selections: { pagina: true, description: 'private', precio: 500 } }));
  assert.equal(plan.searchParams.get('plan_summary'), 'Página personalizada');
  assert.equal(plan.searchParams.get('plan_title'), 'Plan web');
  assert.ok(!plan.href.includes('private'));
  const empty = new URL(tallyFormUrl('fakeForm', { sourceForm: 'plan_card', title: 'Plan vacío', selections: { posts: 0, pagina: false } }));
  assert.equal(empty.searchParams.has('plan_summary'), false);
});
