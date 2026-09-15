/**
 * 3D layout for the entity cloud.
 *
 * The API already ships a 2D layout (`x`, `y`) from the indexer. That is a good
 * seed but a flat one, so we lift it into 3D — communities get pushed apart
 * along a stable axis — and then relax the whole thing with a force solver:
 * Barnes–Hut repulsion (O(n log n)) against Hooke attraction along the edges.
 *
 * Pure and deterministic: same input, same cloud, every reload. No DOM, no
 * three.js — it runs in a worker and is unit-testable on its own.
 */

export type LayoutInput = {
    /** n */
    x: Float32Array;
    y: Float32Array;
    degree: Float32Array;
    /** Community index per node, or -1. Drives the initial z separation. */
    community: Int32Array;
    /** m — indices into the node arrays */
    edgeSource: Uint32Array;
    edgeTarget: Uint32Array;
    edgeStrength: Float32Array;
    iterations?: number;
    /** Final cloud radius in world units. */
    radius?: number;
};

export type LayoutResult = {
    /** n * 3, xyz interleaved */
    positions: Float32Array;
    iterations: number;
};

const THETA = 0.9;
const THETA_SQ = THETA * THETA;
const MAX_DEPTH = 22;
const EPS = 1e-4;

/* ------------------------------------------------------------------ *
 * Deterministic noise
 * ------------------------------------------------------------------ */

/** Integer hash → [0, 1). Cheap, stable across engines, good enough for jitter. */
export function hash01(value: number): number {
    let h = value | 0;
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
    h = (h ^ (h >>> 16)) >>> 0;
    return h / 4294967296;
}

/** A stable unit vector for an integer key — used to fan communities out in 3D. */
export function unitVectorFor(key: number): [number, number, number] {
    const u = hash01(key * 2654435761) * 2 - 1;
    const phi = hash01(key * 40503 + 17) * Math.PI * 2;
    const r = Math.sqrt(Math.max(0, 1 - u * u));
    return [r * Math.cos(phi), r * Math.sin(phi), u];
}

/* ------------------------------------------------------------------ *
 * Octree
 * ------------------------------------------------------------------ */

type Octree = {
    children: Int32Array;
    count: Int32Array;
    body: Int32Array;
    mass: Float32Array;
    comX: Float32Array;
    comY: Float32Array;
    comZ: Float32Array;
    ownMass: Float32Array;
    ownX: Float32Array;
    ownY: Float32Array;
    ownZ: Float32Array;
    centerX: Float32Array;
    centerY: Float32Array;
    centerZ: Float32Array;
    half: Float32Array;
    used: number;
    capacity: number;
};

function widenInt(source: Int32Array, length: number, fill: number): Int32Array {
    const target = new Int32Array(length);
    target.fill(fill);
    target.set(source);
    return target;
}

function widenFloat(source: Float32Array, length: number): Float32Array {
    const target = new Float32Array(length);
    target.set(source);
    return target;
}

/** Nearly-coincident points can chain deep; the node pool has to be able to follow. */
function grow(tree: Octree): void {
    const next = tree.capacity * 2;
    tree.children = widenInt(tree.children, next * 8, -1);
    tree.count = widenInt(tree.count, next, 0);
    tree.body = widenInt(tree.body, next, -1);
    tree.mass = widenFloat(tree.mass, next);
    tree.comX = widenFloat(tree.comX, next);
    tree.comY = widenFloat(tree.comY, next);
    tree.comZ = widenFloat(tree.comZ, next);
    tree.ownMass = widenFloat(tree.ownMass, next);
    tree.ownX = widenFloat(tree.ownX, next);
    tree.ownY = widenFloat(tree.ownY, next);
    tree.ownZ = widenFloat(tree.ownZ, next);
    tree.centerX = widenFloat(tree.centerX, next);
    tree.centerY = widenFloat(tree.centerY, next);
    tree.centerZ = widenFloat(tree.centerZ, next);
    tree.half = widenFloat(tree.half, next);
    tree.capacity = next;
}

function createOctree(capacity: number): Octree {
    return {
        capacity,
        children: new Int32Array(capacity * 8).fill(-1),
        count: new Int32Array(capacity),
        body: new Int32Array(capacity).fill(-1),
        mass: new Float32Array(capacity),
        comX: new Float32Array(capacity),
        comY: new Float32Array(capacity),
        comZ: new Float32Array(capacity),
        ownMass: new Float32Array(capacity),
        ownX: new Float32Array(capacity),
        ownY: new Float32Array(capacity),
        ownZ: new Float32Array(capacity),
        centerX: new Float32Array(capacity),
        centerY: new Float32Array(capacity),
        centerZ: new Float32Array(capacity),
        half: new Float32Array(capacity),
        used: 0,
    };
}

function resetOctree(tree: Octree, cx: number, cy: number, cz: number, half: number): void {
    tree.children.fill(-1, 0, tree.used * 8);
    tree.count.fill(0, 0, tree.used);
    tree.body.fill(-1, 0, tree.used);
    tree.ownMass.fill(0, 0, tree.used);
    tree.ownX.fill(0, 0, tree.used);
    tree.ownY.fill(0, 0, tree.used);
    tree.ownZ.fill(0, 0, tree.used);
    tree.used = 1;
    tree.centerX[0] = cx;
    tree.centerY[0] = cy;
    tree.centerZ[0] = cz;
    tree.half[0] = half;
    tree.count[0] = 0;
    tree.body[0] = -1;
}

function childIndex(tree: Octree, node: number, px: number, py: number, pz: number): number {
    const octant =
        (px > tree.centerX[node] ? 1 : 0) |
        (py > tree.centerY[node] ? 2 : 0) |
        (pz > tree.centerZ[node] ? 4 : 0);
    const slot = node * 8 + octant;
    let child = tree.children[slot];
    if (child === -1) {
        if (tree.used >= tree.capacity) {
            grow(tree);
        }
        child = tree.used++;
        tree.children[slot] = child;
        const half = tree.half[node] * 0.5;
        tree.half[child] = half;
        tree.centerX[child] = tree.centerX[node] + (octant & 1 ? half : -half);
        tree.centerY[child] = tree.centerY[node] + (octant & 2 ? half : -half);
        tree.centerZ[child] = tree.centerZ[node] + (octant & 4 ? half : -half);
        tree.count[child] = 0;
        tree.body[child] = -1;
    }
    return child;
}

function insert(
    tree: Octree,
    bodyIndex: number,
    positions: Float32Array,
    mass: Float32Array,
): void {
    let index = bodyIndex;
    let node = 0;

    for (let depth = 0; depth <= MAX_DEPTH; depth++) {
        tree.count[node] += 1;

        if (depth === MAX_DEPTH) {
            // Coincident or near-coincident points: stop splitting and pool them.
            const m = mass[index];
            tree.ownMass[node] += m;
            tree.ownX[node] += positions[index * 3] * m;
            tree.ownY[node] += positions[index * 3 + 1] * m;
            tree.ownZ[node] += positions[index * 3 + 2] * m;
            return;
        }

        if (tree.count[node] === 1) {
            tree.body[node] = index;
            return;
        }

        const resident = tree.body[node];
        if (resident !== -1) {
            // The leaf becomes internal: push its occupant one level down first.
            tree.body[node] = -1;
            const target = childIndex(tree, node, positions[resident * 3], positions[resident * 3 + 1], positions[resident * 3 + 2]);
            pushDown(tree, target, resident, positions, mass, depth + 1);
        }

        node = childIndex(tree, node, positions[index * 3], positions[index * 3 + 1], positions[index * 3 + 2]);
    }
}

function pushDown(
    tree: Octree,
    startNode: number,
    bodyIndex: number,
    positions: Float32Array,
    mass: Float32Array,
    startDepth: number,
): void {
    let node = startNode;
    for (let depth = startDepth; depth <= MAX_DEPTH; depth++) {
        tree.count[node] += 1;

        if (depth === MAX_DEPTH) {
            const m = mass[bodyIndex];
            tree.ownMass[node] += m;
            tree.ownX[node] += positions[bodyIndex * 3] * m;
            tree.ownY[node] += positions[bodyIndex * 3 + 1] * m;
            tree.ownZ[node] += positions[bodyIndex * 3 + 2] * m;
            return;
        }

        if (tree.count[node] === 1) {
            tree.body[node] = bodyIndex;
            return;
        }

        const resident = tree.body[node];
        if (resident !== -1) {
            tree.body[node] = -1;
            const target = childIndex(tree, node, positions[resident * 3], positions[resident * 3 + 1], positions[resident * 3 + 2]);
            pushDown(tree, target, resident, positions, mass, depth + 1);
        }

        node = childIndex(tree, node, positions[bodyIndex * 3], positions[bodyIndex * 3 + 1], positions[bodyIndex * 3 + 2]);
    }
}

/**
 * Children always land after their parent in the node arrays, so a single
 * reverse sweep is a valid post-order accumulation.
 */
function summarise(tree: Octree, positions: Float32Array, mass: Float32Array): void {
    for (let node = tree.used - 1; node >= 0; node--) {
        let m = tree.ownMass[node];
        let sx = tree.ownX[node];
        let sy = tree.ownY[node];
        let sz = tree.ownZ[node];

        const resident = tree.body[node];
        if (resident !== -1) {
            const bm = mass[resident];
            m += bm;
            sx += positions[resident * 3] * bm;
            sy += positions[resident * 3 + 1] * bm;
            sz += positions[resident * 3 + 2] * bm;
        }

        for (let octant = 0; octant < 8; octant++) {
            const child = tree.children[node * 8 + octant];
            if (child === -1) {
                continue;
            }
            const cm = tree.mass[child];
            m += cm;
            sx += tree.comX[child] * cm;
            sy += tree.comY[child] * cm;
            sz += tree.comZ[child] * cm;
        }

        tree.mass[node] = m;
        if (m > 0) {
            tree.comX[node] = sx / m;
            tree.comY[node] = sy / m;
            tree.comZ[node] = sz / m;
        }
    }
}

/* ------------------------------------------------------------------ *
 * Solver
 * ------------------------------------------------------------------ */

export function seedPositions(input: LayoutInput): Float32Array {
    const n = input.x.length;
    const positions = new Float32Array(n * 3);

    let extent = 1e-6;
    for (let i = 0; i < n; i++) {
        extent = Math.max(extent, Math.abs(input.x[i]), Math.abs(input.y[i]));
    }
    const scale = 1 / extent;

    for (let i = 0; i < n; i++) {
        const community = input.community[i];
        const axis = community >= 0 ? unitVectorFor(community + 1) : ([0, 0, 0] as const);
        // A little jitter keeps identical server coordinates from stacking.
        const jx = (hash01(i * 3 + 1) - 0.5) * 0.04;
        const jy = (hash01(i * 3 + 2) - 0.5) * 0.04;
        const jz = (hash01(i * 3 + 3) - 0.5) * 0.35;

        positions[i * 3] = input.x[i] * scale + axis[0] * 0.22 + jx;
        positions[i * 3 + 1] = input.y[i] * scale + axis[1] * 0.22 + jy;
        positions[i * 3 + 2] = axis[2] * 0.5 + jz;
    }

    return positions;
}

export function computeLayout(input: LayoutInput, onProgress?: (ratio: number) => void): LayoutResult {
    const n = input.x.length;
    const positions = seedPositions(input);

    if (n === 0) {
        return {positions, iterations: 0};
    }
    if (n === 1) {
        positions.set([0, 0, 0]);
        return {positions, iterations: 0};
    }

    const iterations = input.iterations ?? clampIterations(n);
    const radius = input.radius ?? 3.2;

    const mass = new Float32Array(n);
    for (let i = 0; i < n; i++) {
        mass[i] = 1 + Math.sqrt(input.degree[i]) * 0.6;
    }

    const velocity = new Float32Array(n * 3);
    const force = new Float32Array(n * 3);
    const tree = createOctree(Math.max(64, n * 4));

    const edgeCount = input.edgeSource.length;
    // Keep the spring pull comparable regardless of how dense the corpus is.
    const attraction = 0.55 / Math.max(1, Math.sqrt(edgeCount / Math.max(1, n)));
    const repulsion = 0.078;
    const gravity = 0.018;

    for (let step = 0; step < iterations; step++) {
        const alpha = 0.9 * Math.pow(1 - step / iterations, 1.4) + 0.02;
        force.fill(0);

        // --- repulsion -------------------------------------------------
        let minX = Infinity;
        let minY = Infinity;
        let minZ = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        let maxZ = -Infinity;
        for (let i = 0; i < n; i++) {
            const px = positions[i * 3];
            const py = positions[i * 3 + 1];
            const pz = positions[i * 3 + 2];
            if (px < minX) minX = px;
            if (py < minY) minY = py;
            if (pz < minZ) minZ = pz;
            if (px > maxX) maxX = px;
            if (py > maxY) maxY = py;
            if (pz > maxZ) maxZ = pz;
        }
        const half = Math.max(maxX - minX, maxY - minY, maxZ - minZ) * 0.5 + 0.5;
        resetOctree(tree, (minX + maxX) * 0.5, (minY + maxY) * 0.5, (minZ + maxZ) * 0.5, half);
        for (let i = 0; i < n; i++) {
            insert(tree, i, positions, mass);
        }
        summarise(tree, positions, mass);

        const stack = new Int32Array(MAX_DEPTH * 8 + 16);
        for (let i = 0; i < n; i++) {
            const px = positions[i * 3];
            const py = positions[i * 3 + 1];
            const pz = positions[i * 3 + 2];
            const mi = mass[i];
            let fx = 0;
            let fy = 0;
            let fz = 0;
            let top = 0;
            stack[top++] = 0;

            while (top > 0) {
                const node = stack[--top];
                const nodeMass = tree.mass[node];
                if (nodeMass <= 0) {
                    continue;
                }
                if (tree.body[node] === i && tree.count[node] === 1) {
                    continue;
                }

                const dx = px - tree.comX[node];
                const dy = py - tree.comY[node];
                const dz = pz - tree.comZ[node];
                const distSq = dx * dx + dy * dy + dz * dz + EPS;
                const width = tree.half[node] * 2;

                if (width * width < THETA_SQ * distSq || tree.count[node] === 1) {
                    const inv = 1 / Math.sqrt(distSq);
                    const magnitude = (repulsion * nodeMass * mi) / distSq;
                    fx += dx * inv * magnitude;
                    fy += dy * inv * magnitude;
                    fz += dz * inv * magnitude;
                }
                else {
                    for (let octant = 0; octant < 8; octant++) {
                        const child = tree.children[node * 8 + octant];
                        if (child !== -1 && top < stack.length) {
                            stack[top++] = child;
                        }
                    }
                }
            }

            force[i * 3] += fx;
            force[i * 3 + 1] += fy;
            force[i * 3 + 2] += fz;
        }

        // --- attraction ------------------------------------------------
        for (let e = 0; e < edgeCount; e++) {
            const a = input.edgeSource[e];
            const b = input.edgeTarget[e];
            const weight = attraction * (0.35 + (input.edgeStrength[e] || 0.5) * 0.65);
            const dx = positions[b * 3] - positions[a * 3];
            const dy = positions[b * 3 + 1] - positions[a * 3 + 1];
            const dz = positions[b * 3 + 2] - positions[a * 3 + 2];
            force[a * 3] += dx * weight;
            force[a * 3 + 1] += dy * weight;
            force[a * 3 + 2] += dz * weight;
            force[b * 3] -= dx * weight;
            force[b * 3 + 1] -= dy * weight;
            force[b * 3 + 2] -= dz * weight;
        }

        // --- gravity + integrate --------------------------------------
        for (let i = 0; i < n; i++) {
            const o = i * 3;
            force[o] -= positions[o] * gravity;
            force[o + 1] -= positions[o + 1] * gravity;
            force[o + 2] -= positions[o + 2] * gravity;

            velocity[o] = (velocity[o] + force[o] * alpha) * 0.72;
            velocity[o + 1] = (velocity[o + 1] + force[o + 1] * alpha) * 0.72;
            velocity[o + 2] = (velocity[o + 2] + force[o + 2] * alpha) * 0.72;

            // Cap per-step travel so a hub never slingshots out of the cloud.
            const speed = Math.hypot(velocity[o], velocity[o + 1], velocity[o + 2]);
            const limit = 0.35;
            const damp = speed > limit ? limit / speed : 1;

            positions[o] += velocity[o] * damp;
            positions[o + 1] += velocity[o + 1] * damp;
            positions[o + 2] += velocity[o + 2] * damp;
        }

        if (onProgress && step % 12 === 0) {
            onProgress(step / iterations);
        }
    }

    normalise(positions, radius);
    onProgress?.(1);
    return {positions, iterations};
}

function clampIterations(n: number): number {
    if (n <= 400) return 260;
    if (n <= 900) return 220;
    if (n <= 1800) return 170;
    return 130;
}

/** Centre the cloud and scale it so the bulk of it fills `radius`. */
export function normalise(positions: Float32Array, radius: number): void {
    const n = positions.length / 3;
    let cx = 0;
    let cy = 0;
    let cz = 0;
    for (let i = 0; i < n; i++) {
        cx += positions[i * 3];
        cy += positions[i * 3 + 1];
        cz += positions[i * 3 + 2];
    }
    cx /= n;
    cy /= n;
    cz /= n;

    const radii = new Float32Array(n);
    for (let i = 0; i < n; i++) {
        const dx = positions[i * 3] - cx;
        const dy = positions[i * 3 + 1] - cy;
        const dz = positions[i * 3 + 2] - cz;
        positions[i * 3] = dx;
        positions[i * 3 + 1] = dy;
        positions[i * 3 + 2] = dz;
        radii[i] = Math.hypot(dx, dy, dz);
    }

    const sorted = Float32Array.from(radii).sort();
    // 88th, not 100th: a handful of satellites are allowed outside the ball so the
    // bulk of the cloud fills the frame instead of shrinking to fit its outliers.
    const percentile = sorted[Math.min(n - 1, Math.floor(n * 0.88))] || 1;
    const scale = radius / percentile;

    for (let i = 0; i < positions.length; i++) {
        positions[i] *= scale;
    }
}
