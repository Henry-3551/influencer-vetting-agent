# buy social-data discovery (read-only; no spending)

**Status:** Research spike. No live service has been selected or quoted; no payment or live Instagram retrieval is implemented.

Official instructions: https://github.com/celo-org/buy-skill/blob/main/skills/use-api-gateway/SKILL.md

## Step 1 — free live catalog

From the repository root, run:

```powershell
node scripts/inspect-buy-catalog.mjs
```

The script performs **one GET only** to `https://gateway.usebuy.ai/v1/catalog`. It outputs the available Instagram capabilities, descriptions, advertised method/URL and indicative prices, plus top-level input field names. It does not need a wallet, quote, authentication or private key, and it does not access a paid endpoint.

For a specific capability ID from that output, inspect its **exact** request schema:

```powershell
node scripts/inspect-buy-catalog.mjs --details="<paste capability id from output>"
```

Share the sanitized catalog output with Henry, Nonso and McGibson. Don't paste wallet addresses or secrets into issues; this public catalog should not include any.

## Step 2 — pick a service using the actual response

A candidate must be `available: true`, permit public-profile/post use, and provide enough evidence to derive follower count and per-post likes/comments. **Do not assume those output fields exist** just because a description says Instagram. Request validation and quotes are separate steps.

Capture in Issue #1:
- Current capability ID, method, URL, live `inputSchema`, and platform.
- Whether public profile plus post metrics are available and permitted by provider terms.
- The advertised price / pricing model, and the response of an **unpaid quote for the exact input**.
- Any required `maxResults` bundle from `priceOptions`.
- Explicit maximum single-transaction cost, intended token, and authorization by the team.
- How a settled paid response's transaction hash and provenance will be recorded.

The catalog price is indicative; **the exact 402 challenge is the price authority**. Do not pay or retry automatically in this discovery milestone. A 402 is a quote, not a successful purchase.

## Step 3 — stop before a paid request

No private key, seed phrase or upstream provider key belongs in source control or the frontend. For the eventual execution, use the official `buy` client with a controlled, low-balance keychain wallet. Use the same exact input for quote and payment; avoid default automatic retries when settlement is uncertain. Get explicit token/amount approval before one test purchase.

## What this does not prove

It doesn't verify a paid response schema, successful payment, data accuracy or access to any particular Instagram account. Until those are validated, the product stays in clearly labeled **mock mode**.
