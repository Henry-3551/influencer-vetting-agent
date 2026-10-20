import { NextResponse } from 'next/server';
import type { MockAnalysisResponse } from '../../../lib/types';
import { assess } from '../../../lib/analysis.mjs';
import { MOCK_METRICS } from '../../../lib/mock-profile.mjs';
import { mockModeAllowed } from '../../../lib/mock-mode.mjs';
import { parseInstagramProfileUrl } from '../../../lib/profile-url.mjs';

export async function POST(req: Request) {
  // Fail closed: there is no live payment adapter in this repository yet.
  if (!mockModeAllowed(process.env)) {
    return NextResponse.json(
      { error: 'Live analysis is unavailable until the paid-service adapter is implemented.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  let username: string;
  let profileUrl: string;
  try {
    ({ username, profileUrl } = parseInstagramProfileUrl(
      body && typeof body === 'object' && !Array.isArray(body) && 'url' in body
        ? body.url
        : undefined,
    ));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Invalid profile URL.' },
      { status: 400 },
    );
  }

  const result: MockAnalysisResponse = {
    mode: 'mock',
    platform: 'instagram',
    username,
    profileUrl,
    metrics: { followers: MOCK_METRICS.followers, posts: [...MOCK_METRICS.posts] },
    assessment: assess(MOCK_METRICS.followers, MOCK_METRICS.posts),
    payment: { status: 'not_attempted', transactionHash: null },
    source: { kind: 'simulated', provider: null, retrievedAt: null },
    notice: 'SIMULATED FIXTURE ONLY. No profile was fetched and no payment occurred.',
  };

  return NextResponse.json(result, { headers: { 'Cache-Control': 'no-store' } });
}
