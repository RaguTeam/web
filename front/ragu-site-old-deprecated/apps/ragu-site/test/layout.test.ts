import test from 'node:test';
import assert from 'node:assert/strict';
import {computeLayout, hash01, normalise, unitVectorFor, type LayoutInput} from '../src/graph/layout.ts';

function ring(n: number, edgesPerNode = 2): LayoutInput {
    const x = new Float32Array(n);
    const y = new Float32Array(n);
    const degree = new Float32Array(n);
    const community = new Int32Array(n);

    for (let i = 0; i < n; i++) {
        const angle = (i / n) * Math.PI * 2;
        x[i] = Math.cos(angle) * 300;
        y[i] = Math.sin(angle) * 300;
        degree[i] = edgesPerNode * 2;
        community[i] = i % 4;
    }

    const m = n * edgesPerNode;
    const edgeSource = new Uint32Array(m);
    const edgeTarget = new Uint32Array(m);
    const edgeStrength = new Float32Array(m).fill(0.8);
    let cursor = 0;
    for (let i = 0; i < n; i++) {
        for (let step = 1; step <= edgesPerNode; step++) {
            edgeSource[cursor] = i;
            edgeTarget[cursor] = (i + step) % n;
            cursor += 1;
        }
    }

    return {x, y, degree, community, edgeSource, edgeTarget, edgeStrength, iterations: 40, radius: 3};
}

test('hash01 stays inside the unit interval', () => {
    for (const seed of [0, 1, -7, 12345, 2 ** 30]) {
        const value = hash01(seed);
        assert.ok(value >= 0 && value < 1, `hash01(${seed}) = ${value}`);
    }
});

test('unitVectorFor returns unit-length vectors', () => {
    for (let key = 0; key < 32; key++) {
        const [x, y, z] = unitVectorFor(key);
        assert.ok(Math.abs(Math.hypot(x, y, z) - 1) < 1e-5);
    }
});

test('computeLayout returns finite xyz for every node', () => {
    const {positions} = computeLayout(ring(120));
    assert.equal(positions.length, 120 * 3);
    for (let i = 0; i < positions.length; i++) {
        assert.ok(Number.isFinite(positions[i]), `position ${i} is ${positions[i]}`);
    }
});

test('computeLayout is deterministic', () => {
    const a = computeLayout(ring(80)).positions;
    const b = computeLayout(ring(80)).positions;
    for (let i = 0; i < a.length; i++) {
        assert.equal(a[i], b[i]);
    }
});

test('computeLayout centres the cloud and honours the radius', () => {
    const radius = 3;
    const {positions} = computeLayout({...ring(200), radius});
    const n = positions.length / 3;

    let cx = 0;
    let cy = 0;
    let cz = 0;
    let outside = 0;
    for (let i = 0; i < n; i++) {
        cx += positions[i * 3];
        cy += positions[i * 3 + 1];
        cz += positions[i * 3 + 2];
        if (Math.hypot(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]) > radius * 1.35) {
            outside += 1;
        }
    }

    assert.ok(Math.abs(cx / n) < 0.05, `centroid x drifted to ${cx / n}`);
    assert.ok(Math.abs(cy / n) < 0.05, `centroid y drifted to ${cy / n}`);
    assert.ok(Math.abs(cz / n) < 0.05, `centroid z drifted to ${cz / n}`);
    assert.ok(outside / n < 0.05, `${outside} of ${n} nodes escaped the ball`);
});

test('computeLayout survives coincident seed positions', () => {
    const input = ring(64);
    input.x.fill(0);
    input.y.fill(0);
    const {positions} = computeLayout(input);
    for (let i = 0; i < positions.length; i++) {
        assert.ok(Number.isFinite(positions[i]));
    }
});

test('computeLayout handles the degenerate sizes', () => {
    const empty: LayoutInput = {
        x: new Float32Array(0),
        y: new Float32Array(0),
        degree: new Float32Array(0),
        community: new Int32Array(0),
        edgeSource: new Uint32Array(0),
        edgeTarget: new Uint32Array(0),
        edgeStrength: new Float32Array(0),
    };
    assert.equal(computeLayout(empty).positions.length, 0);

    const single: LayoutInput = {
        ...empty,
        x: Float32Array.of(12),
        y: Float32Array.of(-4),
        degree: Float32Array.of(0),
        community: Int32Array.of(-1),
    };
    const positions = computeLayout(single).positions;
    assert.deepEqual([...positions], [0, 0, 0]);
});

test('normalise scales without moving the centroid', () => {
    const positions = Float32Array.of(1, 0, 0, -1, 0, 0, 0, 2, 0, 0, -2, 0);
    normalise(positions, 4);
    let sum = 0;
    for (const value of positions) {
        sum += value;
    }
    assert.ok(Math.abs(sum) < 1e-4);
    assert.ok(Math.max(...positions) > 3);
});
