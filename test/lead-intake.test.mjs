import test from 'node:test';
import assert from 'node:assert/strict';
import { tallyEmbedUrl, isTallySubmissionMessage } from '../lib/lead-intake.mjs';

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

test('only the matching Tally frame can signal completion; loading and forged messages cannot', () => {
  const source = {}, other = {};
  const event = { origin: 'https://tally.so', source, data: JSON.stringify({ event: 'Tally.FormSubmitted', payload: { formId: 'fakeForm', id: 'submission001' } }) };
  assert.equal(isTallySubmissionMessage(event, source, 'fakeForm'), true);
  assert.equal(isTallySubmissionMessage({ ...event, origin: 'https://evil.test' }, source, 'fakeForm'), false);
  assert.equal(isTallySubmissionMessage(event, other, 'fakeForm'), false);
  assert.equal(isTallySubmissionMessage(event, source, 'otherForm'), false);
  assert.equal(isTallySubmissionMessage({ ...event, data: '{' }, source, 'fakeForm'), false);
  assert.equal(isTallySubmissionMessage({ ...event, data: { event: 'Tally.FormLoaded', payload: { formId: 'fakeForm' } } }, source, 'fakeForm'), false);
});
