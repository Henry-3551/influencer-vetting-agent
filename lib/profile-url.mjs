/** Validate a public Instagram profile URL without contacting Instagram. */
export function parseInstagramProfileUrl(input) {
  if (typeof input !== 'string' || input.length > 500) {
    throw new Error('Enter a valid Instagram profile URL.');
  }

  let parsed;
  try {
    parsed = new URL(input.trim());
  } catch {
    throw new Error('Enter a valid HTTPS Instagram profile URL.');
  }

  if (
    parsed.protocol !== 'https:' ||
    !['instagram.com', 'www.instagram.com'].includes(parsed.hostname) ||
    parsed.username ||
    parsed.password ||
    parsed.port
  ) {
    throw new Error('Only HTTPS Instagram profile URLs are supported.');
  }

  const segments = parsed.pathname.split('/').filter(Boolean);
  if (segments.length !== 1) {
    throw new Error('Enter a profile URL, not a post or another page.');
  }

  const username = segments[0];
  const reserved = new Set([
    'p', 'reel', 'reels', 'stories', 'explore', 'accounts',
    'direct', 'about', 'developer', 'privacy', 'terms',
  ]);
  if (
    username.length > 30 ||
    !/^[A-Za-z0-9_](?:[A-Za-z0-9._]{0,28}[A-Za-z0-9_])?$/.test(username) ||
    reserved.has(username.toLowerCase())
  ) {
    throw new Error('Enter a valid public Instagram profile URL.');
  }

  return { username, profileUrl: `https://www.instagram.com/${username}/` };
}
