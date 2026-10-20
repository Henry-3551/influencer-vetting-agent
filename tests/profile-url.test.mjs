import test from 'node:test';
import assert from 'node:assert/strict';
import { parseInstagramProfileUrl } from '../lib/profile-url.mjs';

const accept = [
  'https://instagram.com/creator/',
  'https://www.instagram.com/my.creator_02?igsh=abc',
  '  https://instagram.com/creator  ',
];
for (const url of accept) {
  test(`accepts profile URL: ${url.trim()}`, () => {
    assert.equal(typeof parseInstagramProfileUrl(url).username, 'string');
  });
}

const reject = [
  'http://instagram.com/creator',
  'https://instagram.com.evil.com/creator',
  'https://instagram.com@evil.com/creator',
  'https://someone@instagram.com/creator',
  'https://instagram.com:8443/creator',
  'https://instagram.com/p/abcdef',
  'https://instagram.com/creator/stories',
  'https://instagram.com/explore/',
  'https://instagram.com/.private',
  'https://instagram.com/' + 'a'.repeat(31),
  'https://instagram.com/creator%2Fpost',
  '',
  null,
];
for (const url of reject) {
  test(`rejects invalid profile URL: ${String(url).slice(0, 65)}`, () => {
    assert.throws(() => parseInstagramProfileUrl(url));
  });
}

test('returns canonical URL without tracking query', () => {
  const parsed = parseInstagramProfileUrl('https://instagram.com/My.Name/?igsh=tracking');
  assert.deepEqual(parsed, {
    username: 'My.Name',
    profileUrl: 'https://www.instagram.com/My.Name/',
  });
});
