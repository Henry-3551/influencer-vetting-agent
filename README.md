# InfluenceCheck AI — Influencer Vetting Agent

Track 3 Build with buy / Celo Agents on Open Rails.

## Local quick start

Requires Node.js 20.9+ and npm.

```bash
npm install
npm run dev
npm test
```

Open http://localhost:3000 and enter a public Instagram profile URL. The returned data is **simulated**. No real profile is fetched and no payment is made.

## Scope and safety

- Next.js + TypeScript web UI, validated analysis API, deterministic mock data and tested engagement calculator.
- Real `buy` service discovery, payment authorization, external data collection, ERC-8004 identity, Python agent, persistence and deployment **are not implemented**.
- Never commit wallet secrets. Keep payment execution server-side and require explicit authorization and spend limits.
- Engagement patterns alone do not prove fake followers.

See `docs/SRS.md` and `docs/INTEGRATION.md` for acceptance criteria and implementation plan.
