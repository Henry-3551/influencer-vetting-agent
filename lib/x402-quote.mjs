const HEX_ADDRESS = /^0x[0-9a-fA-F]{40}$/;
const EXPECTED_RESOURCE = 'https://gateway.usebuy.ai/v1/social/instagram/profile';
const KNOWN_NETWORKS = new Set(['celo', 'celo-sepolia']);

/** Validate a free x402 payment challenge before ANY wallet or payment is configured. */
export function summarizeQuote(status, challenge, expectedResource = EXPECTED_RESOURCE) {
  const problems = [];
  if (status !== 402) problems.push(`Expected HTTP 402, received ${status}`);
  if (challenge === null || typeof challenge !== 'object' || Array.isArray(challenge)) {
    return { valid: false, problems: [...problems, 'Response body is not a JSON object'], offers: [] };
  }
  if (challenge.x402Version !== 1) problems.push(`Unexpected x402Version: ${String(challenge.x402Version)}`);
  if (!Array.isArray(challenge.accepts) || challenge.accepts.length === 0) {
    return { valid: false, problems: [...problems, 'No payment offers found'], offers: [] };
  }
  const offers = challenge.accepts.map((offer, index) => {
    const warnings = [];
    if (!offer || typeof offer !== 'object' || Array.isArray(offer)) {
      problems.push(`Offer ${index + 1}: malformed object`);
      return { index: index + 1, network: null, token: null, atomicAmount: null, amountIfSixDecimals: null, addressFormatValid: false, warnings: ['Malformed offer'] };
    }
    if (offer.scheme !== 'exact') warnings.push('Unexpected payment scheme');
    if (!KNOWN_NETWORKS.has(offer.network)) warnings.push('Unrecognized network');
    if (offer.resource !== expectedResource) warnings.push('Resource URL mismatch');
    if (!/^[0-9]+$/.test(String(offer.maxAmountRequired ?? ''))) warnings.push('Amount is not a non-negative integer string');
    if (!HEX_ADDRESS.test(offer.payTo ?? '')) warnings.push('Invalid payTo address (expected 0x + 40 hex digits)');
    if (!HEX_ADDRESS.test(offer.asset ?? '')) warnings.push('Invalid token contract address (expected 0x + 40 hex digits)');
    if (offer.extra?.gateway?.capability !== 'instagram.profile') warnings.push('Unexpected capability identifier');
    const atomic = /^[0-9]+$/.test(String(offer.maxAmountRequired ?? '')) ? BigInt(String(offer.maxAmountRequired)) : null;
    if (atomic !== null && atomic === 0n) warnings.push('Unexpected zero quote');
    const amountIfSixDecimals = atomic === null ? null : `${atomic / 1000000n}.${(atomic % 1000000n).toString().padStart(6, '0')}`;
    if (warnings.length) problems.push(`Offer ${index + 1} (${String(offer.network ?? 'unknown')}): ${warnings.join('; ')}`);
    return {
      index: index + 1,
      network: typeof offer.network === 'string' ? offer.network : null,
      token: typeof offer.extra?.name === 'string' ? offer.extra.name : null,
      atomicAmount: atomic?.toString() ?? null,
      amountIfSixDecimals,
      addressFormatValid: HEX_ADDRESS.test(offer.payTo ?? '') && HEX_ADDRESS.test(offer.asset ?? ''),
      warnings,
    };
  });
  if (!offers.some(o => o.network === 'celo' && o.warnings.length === 0)) problems.push('No valid-looking Celo mainnet offer available');
  return { valid: problems.length === 0, problems, offers };
}
