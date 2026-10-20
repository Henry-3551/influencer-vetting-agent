import test from 'node:test';
import assert from 'node:assert/strict';
import { listInstagramCapabilities, summarizeInstagramCapabilities, detailForCapability } from '../lib/buy-catalog.mjs';

const catalog = {
  capabilities: [
    { id: 'test.profile', platform: 'instagram', available: true, method: 'POST', url: 'https://gateway.example/placeholder', inputSchema: { properties: { body: { type: 'object' } }, required: ['body'] }, price: { amount: 'unknown' } },
    { id: 'test.posts', platform: 'Instagram', available: false, method: 'POST', priceOptions: [{maxResults: 5}] },
    { id: 'other', platform: 'youtube', available: true },
    null,
  ],
};
test('filters by explicit platform facet, case insensitive', () => {
  assert.deepEqual(listInstagramCapabilities(catalog).map(c=>c.id), ['test.profile', 'test.posts']);
});
test('keeps live availability and input fields without assuming endpoints', () => {
  const list = summarizeInstagramCapabilities(catalog);
  assert.equal(list[0].available, true);
  assert.deepEqual(list[0].requiredFields, ['body']);
  assert.equal(list[1].available, false);
  assert.equal(list[1].url, null);
});
test('returns exact advertised input schema only for a matched catalog ID', () => {
  assert.deepEqual(detailForCapability(catalog, 'test.profile').inputSchema.required, ['body']);
  assert.throws(() => detailForCapability(catalog, 'unknown'));
});
test('fails closed on unexpected catalog shapes', () => {
  for (const data of [null, {}, {capabilities:{}}, {capabilities:null}]) {
    assert.throws(() => listInstagramCapabilities(data), /Unexpected gateway catalog/);
  }
});
