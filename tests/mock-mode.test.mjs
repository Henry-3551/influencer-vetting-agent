import test from 'node:test';
import assert from 'node:assert/strict';
import { mockModeAllowed } from '../lib/mock-mode.mjs';

test('default local environment is mock-only', () => {
  assert.equal(mockModeAllowed({}), true);
  assert.equal(mockModeAllowed({ ANALYSIS_MODE: 'mock', BUY_PAYMENTS_ENABLED: 'false' }), true);
});

test('fails closed if someone enables live mode or changes the payment switch', () => {
  for (const env of [
    { ANALYSIS_MODE: 'live' },
    { BUY_PAYMENTS_ENABLED: 'true' },
    { BUY_PAYMENTS_ENABLED: 'yes' },
    { ANALYSIS_MODE: 'mock', BUY_PAYMENTS_ENABLED: '1' },
  ]) assert.equal(mockModeAllowed(env), false);
});
