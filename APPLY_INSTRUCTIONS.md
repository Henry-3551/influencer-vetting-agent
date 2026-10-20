# InfluenceCheck AI — mock-first hardening patch

Repository: https://github.com/Henry-3551/influencer-vetting-agent

GitHub app can read the repository but received 403 (Resource not accessible by integration) for branch/file/issue creation, so **nothing has been pushed**. This is a reviewable patch to apply on a feature branch.

## Apply safely

1. On your computer, clone the repository or open your existing local clone.
2. From the repository root, run `git status` and ensure you have no uncommitted changes you might overwrite.
3. Run `git switch -c feat/mock-hardening-and-team-workflow`.
4. Copy the *contents* of this patch folder to the repository root, preserving directories, replacing matching files.
5. Run `npm ci`, `npm test`, `npx tsc --noEmit`, `npm run build`.
6. If all pass, run:
   `git add app/api/analyze/route.ts app/page.tsx lib/analysis.mjs lib/profile-url.mjs lib/mock-profile.mjs lib/mock-mode.mjs lib/types.ts tests .github/workflows/ci.yml docs/TEAM_PLAN.md`
   `git commit -m "test: harden mock analysis contracts and add CI"`
   `git push -u origin feat/mock-hardening-and-team-workflow`
7. Open a PR targeting main at https://github.com/Henry-3551/influencer-vetting-agent/compare/main...feat/mock-hardening-and-team-workflow

The patch adds stricter profile URL validation, typed mock response, explicit fixture provenance, fail-closed real-mode guard, tests, a GitHub Actions workflow and a team plan. It does not integrate a real paid service or spend funds.

## Validation performed here

- `npm test`: 27 tests passed.
- `npm ci`: not completed (restricted network / unavailable local lockfile).
- `npx tsc --noEmit` and `npm run build`: not verified in this environment.

**Important:** Since this patch changes tracked files, don't blindly overwrite newer work. Use a branch and review the diff first.
