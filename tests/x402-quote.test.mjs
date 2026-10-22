import test from 'node:test';
import assert from 'node:assert/strict';
import { summarizeQuote } from '../lib/x402-quote.mjs';
const resource = 'https://gateway.usebuy.ai/v1/social/instagram/profile';
const validOffer = {
  scheme: 'exact', network: 'celo', maxAmountRequired: '5000', resource,
  asset: '0x' + 'a'.repeat(40), payTo: '0x' + 'b'.repeat(40),
  extra: { name: 'USDC', gateway: { capability: 'instagram.profile' } },
};
const wrap = offer => ({ x402Version: 1, accepts: [offer] });
test('a valid-looking mainnet offer has 5000 atomic units and 0.005000 six-decimal tokens', () => {
  const r = summarizeQuote(402, wrap(validOffer));
  assert.equal(r.valid, true);
  assert.equal(r.offers[0].atomicAmount, '5000');
  assert.equal(r.offers[0].amountIfSixDecimals, '0.005000');
});
test('rejects malformed asset and payment destination addresses', () => {
  const r = summarizeQuote(402, wrap({ ...validOffer, payTo: '0x1234', asset: '0xabcdef' }));
  assert.equal(r.valid, false);
  assert.match(r.problems.join(' '), /Invalid payTo address/);
  assert.match(r.problems.join(' '), /Invalid token contract address/);
});
test('rejects incorrect resource and unknown network', () => {
  const r = summarizeQuote(402, wrap({ ...validOffer, resource: 'https://example.com', network: 'not-celo' }));
  assert.equal(r.valid, false);
});
test('rejects incorrect statuses, missing offers, and version mismatch', () => {
  assert.equal(summarizeQuote(200, wrap(validOffer)).valid, false);
  assert.equal(summarizeQuote(402, { x402Version: 1, accepts: [] }).valid, false);
  assert.equal(summarizeQuote(402, { x402Version: 2, accepts: [validOffer] }).valid, false);
});
test('does not require testnet but refuses malformed testnet offer', () => {
  const r = summarizeQuote(402, {x402Version:1,accepts:[validOffer,{ ...validOffer, network:'celo-sepolia',asset:'0x1234'}]});
  assert.equal(r.valid, false);
});
