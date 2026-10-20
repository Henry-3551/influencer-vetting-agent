/** Prevent confusing an unimplemented live integration with a working paid analysis. */
export function mockModeAllowed(env) {
  return (
    (env.ANALYSIS_MODE === undefined || env.ANALYSIS_MODE === 'mock') &&
    (env.BUY_PAYMENTS_ENABLED === undefined || env.BUY_PAYMENTS_ENABLED === 'false')
  );
}
