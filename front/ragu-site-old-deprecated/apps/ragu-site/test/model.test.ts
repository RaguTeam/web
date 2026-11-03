import test from 'node:test';
import assert from 'node:assert/strict';
import {buildModel, neighboursOf} from '../src/graph/model.ts';
import {parseCitations} from '../src/components/viewer/chat-store.ts';
import type {GraphResponse} from '../src/api/types.ts';

function node(id: string, type: string, degree: number, community?: string) {
    return {
        id,
        label: id.toUpperCase(),
        entity_type: type,
        description: `about ${id}`,
        degree,
        community_id: community ?? null,
        x: degree * 3,
        y: -degree,
        source_chunk_ids: [],
    };
}

const response: GraphResponse = {
    nodes: [node('a', 'DISEASE', 3, 'c1'), node('b', 'DISEASE', 2, 'c1'), node('c', 'PRODUCT', 1)],
    edges: [
        {id: 'e1', source: 'a', target: 'b', relation_type: 'TREATS', description: '', strength: 0.9},
        {id: 'e2', source: 'b', target: 'c', relation_type: 'PART_OF', description: '', strength: 0.4},
        // Dangling and self edges must not reach the renderer.
        {id: 'e3', source: 'a', target: 'zz', relation_type: 'TREATS', description: '', strength: 1},
        {id: 'e4', source: 'c', target: 'c', relation_type: 'RELATED_TO', description: '', strength: 1},
    ],
    communities: [{id: 'c1', title: 'Cluster one', summary: '', level: 0, size: 2, node_ids: ['a', 'b']}],
    meta: {
        dataset_id: 'test',
        total_nodes: 3,
        total_edges: 4,
        returned_nodes: 3,
        returned_edges: 4,
        limit: 500,
        filters: {},
    },
};

test('buildModel drops dangling and self edges', () => {
    const model = buildModel(response);
    assert.equal(model.edges.length, 2);
    assert.deepEqual(
        model.edges.map((edge) => edge.id),
        ['e1', 'e2'],
    );
});

test('buildModel indexes nodes and tracks the maximum degree', () => {
    const model = buildModel(response);
    assert.equal(model.indexOf.get('b'), 1);
    assert.equal(model.maxDegree, 3);
    assert.equal(model.x[0], 9);
});

test('buildModel tallies types by frequency', () => {
    const model = buildModel(response);
    assert.deepEqual(model.types, [
        {name: 'DISEASE', count: 2},
        {name: 'PRODUCT', count: 1},
    ]);
    assert.equal(model.relationTypes.length, 2);
});

test('adjacency is symmetric and complete', () => {
    const model = buildModel(response);
    const a = neighboursOf(model, model.indexOf.get('a')!);
    const b = neighboursOf(model, model.indexOf.get('b')!);
    const c = neighboursOf(model, model.indexOf.get('c')!);

    assert.deepEqual(a.nodes, [model.indexOf.get('b')]);
    assert.equal(b.nodes.length, 2);
    assert.deepEqual(c.nodes, [model.indexOf.get('b')]);
    assert.deepEqual(a.edges, [0]);
});

const refs = (segments: ReturnType<typeof parseCitations>) =>
    segments.filter((segment) => segment.kind === 'ref');

test('parseCitations lifts inline references out of the prose', () => {
    const segments = parseCitations(
        'AML starts in the bone marrow (Entity: ent-11f5cf62de8017813ae6a389a109db2a). Testing matters (Chunk: chunk-7b02b6929b1ad3d9f3288746d731884e).',
    );

    const found = refs(segments);
    assert.equal(found.length, 2);
    assert.equal(found[0].kind === 'ref' && found[0].type, 'entity');
    assert.equal(found[1].kind === 'ref' && found[1].type, 'chunk');
    assert.ok(segments.some((segment) => segment.kind === 'text' && segment.value.includes('bone marrow')));
});

test('parseCitations reads the Russian citation form', () => {
    const segments = parseCitations(
        'Острый миелоидный лейкоз (см. chunk-83fa3f1b2bc8bb450643b5498de52c9d) начинается в костном мозге (rel-0e160fbe9f09696050cc77a212de9be1).',
    );

    const found = refs(segments);
    assert.equal(found.length, 2);
    assert.equal(found[0].kind === 'ref' && found[0].type, 'chunk');
    assert.equal(found[1].kind === 'ref' && found[1].type, 'relation');
});

test('parseCitations folds a reference into the phrase that named it', () => {
    const labels = new Map([['ent-891887a7cc93ebbc', 'Bell Laboratories']]);
    const segments = parseCitations(
        'Bell Laboratories (ent-891887a7cc93ebbc) is a research organisation.',
        (id) => labels.get(id),
    );

    const found = refs(segments);
    assert.equal(found.length, 1);
    assert.equal(found[0].kind === 'ref' && found[0].inline, true);
    assert.equal(found[0].kind === 'ref' && found[0].text, 'Bell Laboratories');
    // The name is not left standing twice.
    const prose = segments
        .map((segment) => (segment.kind === 'text' ? segment.value : ''))
        .join('');
    assert.equal(prose.includes('Bell Laboratories'), false);
    assert.ok(prose.includes('is a research organisation'));
});

test('parseCitations keeps a standalone chip when the phrase does not match', () => {
    const segments = parseCitations('Diagnosis rests on the marrow (ent-abc123def456).', () => 'Bone marrow');
    const found = refs(segments);
    assert.equal(found.length, 1);
    assert.equal(found[0].kind === 'ref' && found[0].inline, false);
    assert.equal(found[0].kind === 'ref' && found[0].text, 'Bone marrow');
});

test('parseCitations falls back to a short id when nothing resolves', () => {
    const segments = parseCitations('See (ent-abc123def456) and (rel-abc123def456) and (chunk-abc123def456).');
    const found = refs(segments);
    assert.deepEqual(
        found.map((segment) => (segment.kind === 'ref' ? segment.text : '')),
        ['abc123de', 'rel', 'src'],
    );
});

test('parseCitations recognises an id whose prefix the agent dropped', () => {
    const segments = parseCitations('It makes the blood malfunction (Chunk: 126e88ea9cd11440f17ad64c8afadd7c).');
    const found = refs(segments);
    assert.equal(found.length, 1);
    assert.equal(found[0].kind === 'ref' && found[0].type, 'chunk');
    // The prefix goes back on so the id can be looked up.
    assert.equal(found[0].kind === 'ref' && found[0].id, 'chunk-126e88ea9cd11440f17ad64c8afadd7c');
});

test('parseCitations reads the kind from a Russian label when the prefix is missing', () => {
    const found = refs(parseCitations('Показатель (Сущность: 11f5cf62de8017813ae6a389a109db2a).'));
    assert.equal(found[0].kind === 'ref' && found[0].type, 'entity');
    assert.equal(found[0].kind === 'ref' && found[0].id, 'ent-11f5cf62de8017813ae6a389a109db2a');
});

test('parseCitations renders the markdown the agent writes rather than printing it', () => {
    const segments = parseCitations('**Treatment options**\nChemotherapy is standard.');
    assert.deepEqual(segments, [
        {kind: 'strong', value: 'Treatment options'},
        {kind: 'text', value: '\nChemotherapy is standard.'},
    ]);
});

test('parseCitations splits a bracket holding several references', () => {
    const found = refs(
        parseCitations(
            'распространились на отдалённые органы (rel-03d40380b3c3c54dae497b7322f236ee, rel-4ec4764ee92833eb0c2eea967fc6da5d).',
        ),
    );
    assert.equal(found.length, 2);
    assert.deepEqual(
        found.map((segment) => (segment.kind === 'ref' ? segment.id : '')),
        ['rel-03d40380b3c3c54dae497b7322f236ee', 'rel-4ec4764ee92833eb0c2eea967fc6da5d'],
    );
});

test('parseCitations still folds the first of several references', () => {
    const segments = parseCitations(
        'Bell Laboratories (ent-891887a7cc93ebbc, rel-4ec4764ee9283) is in New Jersey.',
        (id) => (id === 'ent-891887a7cc93ebbc' ? 'Bell Laboratories' : undefined),
    );
    const found = refs(segments);
    assert.equal(found.length, 2);
    assert.equal(found[0].kind === 'ref' && found[0].inline, true);
    assert.equal(found[1].kind === 'ref' && found[1].inline, false);
});

test('parseCitations ignores parentheses that are not references', () => {
    const segments = parseCitations('Chemotherapy (the standard of care) is used first.');
    assert.deepEqual(segments, [{kind: 'text', value: 'Chemotherapy (the standard of care) is used first.'}]);
});

test('parseCitations leaves plain text untouched', () => {
    const segments = parseCitations('No references here at all.');
    assert.deepEqual(segments, [{kind: 'text', value: 'No references here at all.'}]);
});

test('parseCitations is reusable across calls', () => {
    assert.equal(refs(parseCitations('one (Entity: ent-abc123def456)')).length, 1);
    assert.equal(refs(parseCitations('two (Entity: ent-abc123def456)')).length, 1);
});
