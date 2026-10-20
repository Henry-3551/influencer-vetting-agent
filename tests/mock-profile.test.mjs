import test from 'node:test';
import assert from 'node:assert/strict';
import { MOCK_METRICS } from '../lib/mock-profile.mjs';
import { assess } from '../lib/analysis.mjs';

test('mock fixture stays explicitly synthetic and never supplies a risk verdict', () => {
  assert.equal(Object.isFrozen(MOCK_METRICS), true);
  assert.equal(assess(MOCK_METRICS.followers, MOCK_METRICS.posts).risk, 'undetermined');
});
