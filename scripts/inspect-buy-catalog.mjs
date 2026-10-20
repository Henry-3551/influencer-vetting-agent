#!/usr/bin/env node
/**
 * Read-only discovery. GET https://gateway.usebuy.ai/v1/catalog is free.
 * Does NOT quote, sign, fund a wallet, call paid services, or persist data.
 * Usage: node scripts/inspect-buy-catalog.mjs
 *        node scripts/inspect-buy-catalog.mjs --details="<id from listing>"
 */
import { listInstagramCapabilities, summarizeInstagramCapabilities, detailForCapability } from '../lib/buy-catalog.mjs';

const CATALOG_URL = 'https://gateway.usebuy.ai/v1/catalog';
const arg = process.argv.slice(2);
if (arg.length > 1 || (arg.length === 1 && !arg[0].startsWith('--details='))) {
  console.error('Usage: node scripts/inspect-buy-catalog.mjs [--details=<catalog capability id>]');
  process.exitCode = 2;
} else {
  try {
    const response = await fetch(CATALOG_URL, {
      method: 'GET',
      headers: { accept: 'application/json' },
      redirect: 'error',
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error(`Free catalog returned HTTP ${response.status}`);
    const type = response.headers.get('content-type') ?? '';
    if (!type.includes('json')) throw new Error(`Expected JSON; got ${type || 'unknown content type'}`);
    const catalog = await response.json();
    const capabilities = listInstagramCapabilities(catalog);
    const detailId = arg[0]?.slice('--details='.length);
    const result = detailId ? detailForCapability(catalog, detailId) : summarizeInstagramCapabilities(catalog);
    console.log(JSON.stringify({
      source: CATALOG_URL,
      checkedAt: new Date().toISOString(),
      instagramCapabilityCount: capabilities.length,
      availableCount: capabilities.filter((c) => c.available === true).length,
      mode: 'READ_ONLY_CATALOG_DISCOVERY_NO_PAYMENT',
      result,
    }, null, 2));
    if (!capabilities.length) console.error('No Instagram capability found. Do not guess an endpoint; consider other platform options.');
  } catch (error) {
    console.error(`Catalog discovery failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}
