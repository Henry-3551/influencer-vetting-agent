#!/usr/bin/env node
/** One read-only unpaid 402 challenge for the known Instagram endpoint. No wallet or payment. */
import { parseInstagramProfileUrl } from '../lib/profile-url.mjs';
import { summarizeQuote } from '../lib/x402-quote.mjs';

const RESOURCE = 'https://gateway.usebuy.ai/v1/social/instagram/profile';
const username = process.argv[2];
if (process.argv.length !== 3) {
  console.error('Usage: node scripts/inspect-buy-quote.mjs <public-instagram-username>');
  process.exitCode = 2;
} else {
  try {
    const parsed = parseInstagramProfileUrl(`https://www.instagram.com/${username}/`);
    const body = JSON.stringify({ username: parsed.username });
    const response = await fetch(RESOURCE, {
      method: 'POST',
      redirect: 'error',
      headers: { 'content-type': 'application/json', accept: 'application/json', 'cache-control': 'no-store' },
      body,
      signal: AbortSignal.timeout(20000),
    });
    const raw = await response.text();
    if (raw.length > 100000) throw new Error('Unusually large response; refusing to parse.');
    let challenge;
    try { challenge = JSON.parse(raw); } catch { throw new Error(`Expected JSON, received HTTP ${response.status} with non-JSON body`); }
    const summary = summarizeQuote(response.status, challenge, RESOURCE);
    console.log(JSON.stringify({
      checkedAt: new Date().toISOString(),
      mode: 'UNPAID_QUOTE_NO_WALLET_NO_SIGNATURE',
      request: { method: 'POST', resource: RESOURCE, body: JSON.parse(body) },
      httpStatus: response.status,
      ...summary,
      notice: 'Address shape and amount display are preliminary checks, not contract authenticity or payment approval.',
    }, null, 2));
    if (!summary.valid) process.exitCode = 1;
  } catch (error) {
    console.error(`Unpaid quote inspection failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}
