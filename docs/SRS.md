# MVP Software Requirements Specification (draft)

## Problem
Small businesses need evidence-based public influencer engagement assessments before purchasing promotions.

## MVP user story
Given a public Instagram profile URL, a merchant requests a report and sees public metrics, transparent engagement calculations, caveats and evidence for a paid external data request.

## Functional requirements
1. Accept only HTTPS Instagram profile URLs, rejecting invalid input.
2. Support mock demo mode clearly identified as simulated.
3. In real mode, query a verified independent `buy` data service with an explicit per-request spending cap.
4. Calculate average per-post engagement rate as mean(likes+comments)/followers*100.
5. Report observations and limitations without asserting fraud as fact.
6. Record external provider, quoted cost, payment status, transaction evidence and response metadata.
7. Never automatically retry an ambiguous paid transaction.

## Nonfunctional requirements
- No wallet secrets in browser or repository.
- Validate and limit all input and external API response fields.
- Support failure, insufficient-data and payment-rejected states.
- Accessible mobile-friendly UI.

## Definition of done
One independently verifiable paid request on Celo mainnet produces a report with source attribution, reproducible metrics and a traceable payment reference. Until then, the system is a mock prototype.

## Ownership
Henry: architecture, UI, API contracts and integration. Nonso: agent and analysis. McGibson: paid-service validation, backend and tests.
