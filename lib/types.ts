/** Public API response contract for the mock-first MVP. */
export type EngagementPost = { likes: number; comments: number };
export type Assessment = {
  engagementRate: number;
  postsReviewed: number;
  observations: string[];
  risk: 'undetermined';
  confidence: 'low';
};
export type MockAnalysisResponse = {
  mode: 'mock';
  platform: 'instagram';
  username: string;
  profileUrl: string;
  metrics: { followers: number; posts: EngagementPost[] };
  assessment: Assessment;
  payment: { status: 'not_attempted'; transactionHash: null };
  source: { kind: 'simulated'; provider: null; retrievedAt: null };
  notice: string;
};
