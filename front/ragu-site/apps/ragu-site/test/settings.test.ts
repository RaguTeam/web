import test from 'node:test';
import assert from 'node:assert/strict';
import {migrateLegacySettings} from '../src/lib/settings.ts';

function storage(entries: Record<string, string>) {
    const map = new Map(Object.entries(entries));
    return {
        map,
        getItem: (key: string) => map.get(key) ?? null,
        setItem: (key: string, value: string) => void map.set(key, value),
        removeItem: (key: string) => void map.delete(key),
    };
}

test('a saved rerank from before the default changed is dropped, the rest is kept', () => {
    const saved = {useGraph: false, queryPlan: true, topK: 12, rerank: true, graphLimit: 1500};
    const s = storage({'ragu.settings': JSON.stringify(saved)});
    migrateLegacySettings(s);
    assert.deepEqual(JSON.parse(s.map.get('ragu.settings.v2')!), {...saved, rerank: false});
    assert.equal(s.map.has('ragu.settings'), false);
});

test('a choice made after the reset is not reset again', () => {
    const current = JSON.stringify({rerank: true});
    const s = storage({'ragu.settings': JSON.stringify({rerank: true, topK: 3}), 'ragu.settings.v2': current});
    migrateLegacySettings(s);
    assert.equal(s.map.get('ragu.settings.v2'), current);
    assert.equal(s.map.has('ragu.settings'), false);
});

test('nothing saved, nothing written; garbage is left for the defaults', () => {
    const empty = storage({});
    migrateLegacySettings(empty);
    assert.equal(empty.map.size, 0);

    const broken = storage({'ragu.settings': '{not json'});
    migrateLegacySettings(broken);
    assert.equal(broken.map.has('ragu.settings.v2'), false);
});
