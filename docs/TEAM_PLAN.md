# Team implementation plan — Track 3

## Current state (mock-first)
- Frontend and `/api/analyze` return **simulated fixture data only**.
- No live scraping, market-data retrieval, payment, agent identity, or wallet wiring exists.
- Real mode must fail closed until a separately reviewed payment adapter is implemented.

## Day-one acceptance criteria
1. A profile URL is validated and normalized server-side.
2. The mock report explains precisely where its data came from and never asserts fraud.
3. Tests and typechecking run in CI; the application builds successfully.
4. One teammate verifies a **documented** real `buy` service exists before API design is finalized.

## Workstreams (proposed owners; confirm with team)
- **Henry**: API contracts, frontend UX, branch/review policy, integration architecture, security review.
- **Nonso**: evidence-based analytical metrics, Python agent evaluation, report text rules; no unsupported fraud conclusions.
- **McGibson**: inspect current `buy` docs/catalog, record supported provider/schema/pricing, plan a safe small test call, integration tests.

## Real integration gate (all required before any paid call)
- Verified official service identifier and documented request/response schema.
- Provider terms permit intended use; data returned is adequate for meaningful metrics.
- Explicit authorization for one tiny payment, maximum spend, and a controlled low-balance wallet.
- Private keys remain server-side; no wallet material in logs, browser, fixtures, or repository.
- Receipt and settlement status captured; ambiguous transaction outcomes are never blindly retried.
- Traceable provenance and clear error/report states added before claiming real analysis.

## Pull request policy
- Feature branches -> PR -> review/checks -> merge to `main`.
- Do not commit .env files, payment credentials or user data.
- Keep integration changes separate from independent frontend improvements.
