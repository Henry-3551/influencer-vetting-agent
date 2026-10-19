import test from 'node:test';import assert from 'node:assert/strict';import {engagementRate,assess} from '../lib/analysis.mjs';
test('engagement calculation',()=>assert.equal(engagementRate(1000,[{likes:100,comments:20},{likes:80,comments:0}]),10));
test('rejects missing followers',()=>assert.throws(()=>engagementRate(0,[{likes:1,comments:1}])));
test('rejects invalid metrics',()=>assert.throws(()=>engagementRate(100,[{likes:-1,comments:0}])));
test('does not assert fraud',()=>assert.equal(assess(100,[{likes:1,comments:0}]).risk,'undetermined'));
