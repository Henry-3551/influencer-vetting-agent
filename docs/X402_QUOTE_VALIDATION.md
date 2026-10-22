# Read-only x402 challenge verification

## Discovery result

On 2026-10-22, an unpaid request to `instagram.profile` returned HTTP 402 with `x402Version: 1`, a 5000-atomic-unit charge (indicatively $0.005 for a 6-decimal USD stablecoin), and offers on Celo mainnet (USDC, USDT, USAT) plus a Celo Sepolia sandbox offer.

**Critical caution:** The pasted response contains multiple abbreviated-looking `asset` and `payTo` addresses. These are not usable payment addresses as pasted. Do not manually transfer money or construct a payment from them. Determine whether this was an output-copying issue by obtaining a fresh unpaid response and verifying address format. Token/recipient authenticity still requires using the documented official client rather than trusting a shape check.

## Run a fresh *unpaid* request

```powershell
node scripts/inspect-buy-quote.mjs instagram
```

The command accepts one Instagram username, sends exactly one JSON POST to the known official gateway URL, **without a payment header**, and summarizes the response. It does not set up or fund a wallet, hold private keys, sign, buy, or automatically retry. It exits with a failure status if any advertised payment offer has an invalid address shape or unexpected resource/scheme/network.

A valid-looking JSON summary is **not permission or proof of a safe payment**. A contract could still be wrong; this validator only checks syntax and consistency.

## Before one real paid call

1. Recheck the free catalog availability and detailed input schema.
2. Confirm a fresh unpaid quote in the official `buy` CLI/MCP and check token contract addresses, network, amount and payee from trustworthy sources.
3. Agree on the maximum atomic/human-readable amount, token, and one-request limit. Get explicit authorization.
4. Set up the official keychain-backed client and a separate low-balance wallet. **Never post a private key, seed, payment authorization or API credential.**
5. After one authorized call, preserve transaction ID and provider response safely, with sensitive data removed.
6. Verify the response actually contains follower count and recent-post likes/comments. Do not infer availability from the catalog description.
7. If timeout/settlement unknown, stop and inspect receipt; never retry automatically.

Official reference: https://github.com/celo-org/buy-skill/blob/main/skills/use-api-gateway/SKILL.md
