import {useEffect, useMemo, useRef} from 'react';
import {useFrame, useThree, type ThreeEvent} from '@react-three/fiber';
import {
    BufferAttribute,
    BufferGeometry,
    Color,
    type Group,
    type PerspectiveCamera,
    Vector3,
} from 'three';
import {degreeToRamp, palette, rampAt} from './colors.ts';
import {frameStage} from './framing.ts';
import {createLineMaterial, createPointMaterial, pointScale} from './shaders.ts';
import type {GraphModel} from './model.ts';
import {fade, hoverStore, sceneStore, selectionStore} from './viewer-store.ts';
import type {Resolved} from '../lib/theme.ts';

/** Structural — avoids importing drei's transitive `three-stdlib` types. */
type Controls = {
    target: Vector3;
    autoRotate: boolean;
    autoRotateSpeed: number;
    addEventListener(type: string, listener: () => void): void;
    removeEventListener(type: string, listener: () => void): void;
};

type Props = {
    model: GraphModel;
    positions: Float32Array;
    theme: Resolved;
};

type Buffers = {
    pointGeometry: BufferGeometry;
    haloGeometry: BufferGeometry;
    lineGeometry: BufferGeometry;
    color: Float32Array;
    alpha: Float32Array;
    size: Float32Array;
    haloAlpha: Float32Array;
    haloSize: Float32Array;
    lineColor: Float32Array;
    lineAlpha: Float32Array;
    /* What the paint pass decided; what is on screen eases towards it. */
    targetColor: Float32Array;
    targetAlpha: Float32Array;
    targetSize: Float32Array;
    targetHaloAlpha: Float32Array;
    targetHaloSize: Float32Array;
    targetLineColor: Float32Array;
    targetLineAlpha: Float32Array;
    /** 1 where the node (or edge) is what the reader asked to see. */
    accented: Uint8Array;
    lineAccented: Uint8Array;
    baseRamp: Float32Array;
    /** Half the cloud's extent, used to place the depth ramp around it. */
    radius: number;
};

function createBuffers(model: GraphModel, positions: Float32Array): Buffers {
    const n = model.nodes.length;
    const m = model.edges.length;

    const color = new Float32Array(n * 3);
    const alpha = new Float32Array(n).fill(1);
    const size = new Float32Array(n);
    const haloAlpha = new Float32Array(n);
    const haloSize = new Float32Array(n);
    const baseRamp = new Float32Array(n);

    let radius = 0;
    for (let i = 0; i < n; i++) {
        baseRamp[i] = degreeToRamp(model.degree[i], model.maxDegree);
        const x = positions[i * 3];
        const y = positions[i * 3 + 1];
        const z = positions[i * 3 + 2];
        const d = Math.sqrt(x * x + y * y + z * z);
        if (d > radius) {
            radius = d;
        }
    }

    const pointGeometry = new BufferGeometry();
    pointGeometry.setAttribute('position', new BufferAttribute(positions, 3));
    pointGeometry.setAttribute('aColor', new BufferAttribute(color, 3));
    pointGeometry.setAttribute('aAlpha', new BufferAttribute(alpha, 1));
    pointGeometry.setAttribute('aSize', new BufferAttribute(size, 1));

    const haloGeometry = new BufferGeometry();
    haloGeometry.setAttribute('position', new BufferAttribute(positions, 3));
    haloGeometry.setAttribute('aColor', new BufferAttribute(color, 3));
    haloGeometry.setAttribute('aAlpha', new BufferAttribute(haloAlpha, 1));
    haloGeometry.setAttribute('aSize', new BufferAttribute(haloSize, 1));

    const linePositions = new Float32Array(m * 6);
    const lineColor = new Float32Array(m * 6);
    const lineAlpha = new Float32Array(m * 2);
    for (let e = 0; e < m; e++) {
        const a = model.edgeSource[e] * 3;
        const b = model.edgeTarget[e] * 3;
        linePositions[e * 6] = positions[a];
        linePositions[e * 6 + 1] = positions[a + 1];
        linePositions[e * 6 + 2] = positions[a + 2];
        linePositions[e * 6 + 3] = positions[b];
        linePositions[e * 6 + 4] = positions[b + 1];
        linePositions[e * 6 + 5] = positions[b + 2];
    }

    const lineGeometry = new BufferGeometry();
    lineGeometry.setAttribute('position', new BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('aColor', new BufferAttribute(lineColor, 3));
    lineGeometry.setAttribute('aAlpha', new BufferAttribute(lineAlpha, 1));

    return {
        pointGeometry,
        haloGeometry,
        lineGeometry,
        color,
        alpha,
        size,
        haloAlpha,
        haloSize,
        lineColor,
        lineAlpha,
        targetColor: new Float32Array(n * 3),
        targetAlpha: new Float32Array(n),
        targetSize: new Float32Array(n),
        targetHaloAlpha: new Float32Array(n),
        targetHaloSize: new Float32Array(n),
        targetLineColor: new Float32Array(m * 6),
        targetLineAlpha: new Float32Array(m * 2),
        accented: new Uint8Array(n),
        lineAccented: new Uint8Array(m),
        baseRamp,
        radius: radius || 3.2,
    };
}

/** Matches the radius the layout normalises to. */
const ORIGIN = new Vector3(0, 0, 0);

/** "No panels are in the way" — reused so the loop allocates nothing. */
const WHOLE = {x: 0, y: 0, width: 0, height: 0};

function fullStage(size: {width: number; height: number}) {
    WHOLE.width = size.width;
    WHOLE.height = size.height;
    return WHOLE;
}
const scratch = new Color();

/*
 * Time constants for the hover transition, in seconds.
 *
 * Repainting the whole cloud the instant the pointer crosses a point turns a
 * sweep across the canvas into a strobe. What the reader pointed at snaps —
 * that is the answer to their gesture — while everything else dims gently and
 * comes back slower still, so passing over a hub does not flash the cloud.
 */
const ACCENT_TAU = 0.04;
const DIM_TAU = 0.1;
const RESTORE_TAU = 0.3;
const SETTLED = 0.0015;

export function Cloud({model, positions, theme}: Props) {
    const selection = selectionStore.use();
    const hovered = hoverStore.use();
    const scene = sceneStore.use();
    const size = useThree((state) => state.size);
    const gl = useThree((state) => state.gl);
    const camera = useThree((state) => state.camera);
    const raycaster = useThree((state) => state.raycaster);
    const controls = useThree((state) => state.controls) as Controls | null;

    const buffers = useMemo(() => createBuffers(model, positions), [model, positions]);
    const colors = useMemo(() => palette(theme), [theme]);

    const materials = useMemo(() => {
        const depth = {haze: colors.haze, amount: 0.66};
        return {
            point: createPointMaterial(0, false, 22, depth),
            halo: createPointMaterial(1, colors.additive, 26, depth),
            line: createLineMaterial({haze: colors.haze, amount: 0.54}),
        };
    }, [colors]);

    useEffect(() => {
        return () => {
            buffers.pointGeometry.dispose();
            buffers.haloGeometry.dispose();
            buffers.lineGeometry.dispose();
        };
    }, [buffers]);

    useEffect(() => {
        return () => {
            materials.point.dispose();
            materials.halo.dispose();
            materials.line.dispose();
        };
    }, [materials]);

    /* ------------------------------------------------------------------ *
     * Paint — the single place visual state is derived.
     * ------------------------------------------------------------------ */
    const easing = useRef(false);
    const primed = useRef(false);

    useEffect(() => {
        primed.current = false;
    }, [buffers]);

    useEffect(() => {
        const n = model.nodes.length;
        const m = model.edges.length;
        const {
            targetColor,
            targetAlpha,
            targetSize,
            targetHaloAlpha,
            targetHaloSize,
            targetLineAlpha,
            targetLineColor,
            accented,
            lineAccented,
            baseRamp,
        } = buffers;

        const query = selection.search.trim().toLowerCase();
        const typeFilter = new Set(selection.types);
        const communityFilter = new Set(selection.communities);
        const highlighted = new Set(selection.highlight);

        const focusId = hovered ?? selection.selectedNode;
        const focusIndex = focusId ? (model.indexOf.get(focusId) ?? -1) : -1;

        const neighbourNodes = new Set<number>();
        const neighbourEdges = new Set<number>();
        if (focusIndex >= 0) {
            for (let k = model.adjOffset[focusIndex]; k < model.adjOffset[focusIndex + 1]; k++) {
                neighbourNodes.add(model.adjNode[k]);
                neighbourEdges.add(model.adjEdge[k]);
            }
        }

        const explicitFilter = query.length > 0 || typeFilter.size > 0 || communityFilter.size > 0;
        const filtering = explicitFilter || highlighted.size > 0;
        const matched = new Uint8Array(n);

        for (let i = 0; i < n; i++) {
            const node = model.nodes[i];
            let hit = true;
            if (query) {
                hit = node.label.toLowerCase().includes(query);
            }
            if (hit && typeFilter.size > 0) {
                hit = typeFilter.has(node.entity_type);
            }
            if (hit && communityFilter.size > 0) {
                hit = node.community_id ? communityFilter.has(node.community_id) : false;
            }
            // A chat citation highlights on its own, but never fights an explicit filter.
            if (hit && !explicitFilter && highlighted.size > 0) {
                hit = highlighted.has(node.id);
            }
            matched[i] = hit ? 1 : 0;
        }

        const {accent, accentSoft, dim} = colors;

        for (let i = 0; i < n; i++) {
            const t = baseRamp[i];
            scratch.copy(rampAt(colors.ramp, t));

            let a = 0.58 + t * 0.4;
            // World units: gl_PointSize scales them by the perspective factor.
            let s = 0.045 + t * 0.34;

            const isFocus = i === focusIndex;
            const isNeighbour = neighbourNodes.has(i);

            if (filtering) {
                if (matched[i] === 1) {
                    scratch.lerp(accent, 0.5);
                    a = 1;
                    s *= 1.16;
                }
                else {
                    a = dim;
                    s *= 0.7;
                }
            }

            if (focusIndex >= 0) {
                if (isFocus) {
                    scratch.copy(accent);
                    a = 1;
                    s *= 1.8;
                }
                else if (isNeighbour) {
                    scratch.lerp(accentSoft, 0.7);
                    a = 1;
                    s *= 1.1;
                }
                else {
                    a *= 0.3;
                }
            }

            targetColor[i * 3] = scratch.r;
            targetColor[i * 3 + 1] = scratch.g;
            targetColor[i * 3 + 2] = scratch.b;
            targetAlpha[i] = a;
            targetSize[i] = s;
            targetHaloAlpha[i] = a * (isFocus ? 0.5 : 0.16) * (colors.additive ? 1 : 0.5);
            targetHaloSize[i] = s * (isFocus ? 3.6 : 2.4);
            // What the reader singled out answers immediately; the rest eases.
            accented[i] = isFocus || isNeighbour || (filtering && matched[i] === 1) ? 1 : 0;
        }

        for (let e = 0; e < m; e++) {
            const a = model.edgeSource[e];
            const b = model.edgeTarget[e];
            let value = colors.edgeOpacity * (0.45 + model.edgeStrength[e] * 0.55);
            let tint = colors.edge;
            let hot = false;

            if (focusIndex >= 0) {
                if (neighbourEdges.has(e)) {
                    value = 0.8;
                    tint = accent;
                    hot = true;
                }
                else {
                    value *= 0.14;
                }
            }
            else if (filtering) {
                const both = matched[a] === 1 && matched[b] === 1;
                value = both ? value * 1.5 : value * 0.15;
                hot = both;
            }

            lineAccented[e] = hot ? 1 : 0;
            targetLineAlpha[e * 2] = value;
            targetLineAlpha[e * 2 + 1] = value;
            for (let v = 0; v < 2; v++) {
                targetLineColor[e * 6 + v * 3] = tint.r;
                targetLineColor[e * 6 + v * 3 + 1] = tint.g;
                targetLineColor[e * 6 + v * 3 + 2] = tint.b;
            }
        }

        // The first paint of a cloud has nothing to ease from.
        if (!primed.current) {
            buffers.color.set(targetColor);
            buffers.alpha.set(targetAlpha);
            buffers.size.set(targetSize);
            buffers.haloAlpha.set(targetHaloAlpha);
            buffers.haloSize.set(targetHaloSize);
            buffers.lineColor.set(targetLineColor);
            buffers.lineAlpha.set(targetLineAlpha);
            primed.current = true;
            markUpdated(buffers);
        }

        easing.current = true;
    }, [buffers, model, colors, selection, hovered]);

    /* ------------------------------------------------------------------ *
     * Camera, docking, idle rotation
     * ------------------------------------------------------------------ */
    const groupRef = useRef<Group>(null);
    const stageRect = useRef({x: 0, y: 0, width: 0, height: 0});
    const idleRef = useRef(0);
    const focusTarget = useRef(new Vector3());
    const hasFocus = useRef(false);
    /** True from the moment a drag starts until the pointer is released. */
    const dragging = useRef(false);

    useEffect(() => {
        const id = selection.selectedNode;
        const index = id ? (model.indexOf.get(id) ?? -1) : -1;
        if (index < 0) {
            hasFocus.current = false;
            return;
        }
        focusTarget.current.set(positions[index * 3], positions[index * 3 + 1], positions[index * 3 + 2]);
        hasFocus.current = true;
        idleRef.current = 0;
    }, [selection.selectedNode, model, positions]);

    useEffect(() => {
        hasFocus.current = false;
    }, [scene.resetToken]);

    useEffect(() => {
        if (!controls) {
            return;
        }
        // Turning the cloud is not pointing at it: hover is dropped for the
        // whole gesture, so the cloud does not flicker under a moving cursor.
        const start = () => {
            idleRef.current = 0;
            dragging.current = true;
            hoverStore.set(null);
        };
        const end = () => {
            dragging.current = false;
        };
        controls.addEventListener('start', start);
        controls.addEventListener('end', end);
        return () => {
            controls.removeEventListener('start', start);
            controls.removeEventListener('end', end);
        };
    }, [controls]);

    useFrame((state, delta) => {
        const fov = (state.camera as PerspectiveCamera).fov ?? 45;
        const scale = pointScale(size.height, gl.getPixelRatio(), fov);
        materials.point.uniforms.uScale.value = scale;
        materials.halo.uniforms.uScale.value = scale;
        const opacity = fade.graph;
        materials.point.uniforms.uOpacity.value = opacity;
        materials.halo.uniforms.uOpacity.value = opacity;
        materials.line.uniforms.uOpacity.value = opacity;
        if (groupRef.current) {
            groupRef.current.visible = opacity > 0.004;
        }

        // The depth ramp tracks the orbit, so the front of the cloud stays fully
        // lit and the back stays hazy however far in the reader has zoomed.
        const orbit = camera.position.distanceTo(controls ? controls.target : ORIGIN);
        const near = Math.max(0.1, orbit - buffers.radius * 1.05);
        const far = orbit + buffers.radius * 1.25;
        for (const material of [materials.point, materials.halo, materials.line]) {
            material.uniforms.uNear.value = near;
            material.uniforms.uFar.value = far;
        }

        if (easing.current) {
            easing.current = ease(buffers, model.nodes.length, model.edges.length, delta);
        }

        if (raycaster.params.Points) {
            raycaster.params.Points.threshold = Math.max(0.05, camera.position.length() * 0.014);
        }

        // The panels' free rectangle is framed by skewing the frustum, not by
        // moving the cloud: a camera aimed at a moved cloud would simply put it
        // back in the middle of the frame.
        const target = scene.stage ?? fullStage(size);
        const rate = Math.min(1, delta * 3.4);
        const current = stageRect.current;
        if (current.width === 0) {
            Object.assign(current, target);
        }
        else {
            current.x += (target.x - current.x) * rate;
            current.y += (target.y - current.y) * rate;
            current.width += (target.width - current.width) * rate;
            current.height += (target.height - current.height) * rate;
        }

        const perspective = camera as PerspectiveCamera;
        const offset = frameStage(current, size);
        // Within a pixel of the whole canvas there is nothing to skew.
        const identity =
            !offset ||
            (Math.abs(offset.offsetX) < 1 &&
                Math.abs(offset.offsetY) < 1 &&
                Math.abs(offset.fullWidth - size.width) < 1);

        if (offset && !identity) {
            perspective.setViewOffset(
                offset.fullWidth,
                offset.fullHeight,
                offset.offsetX,
                offset.offsetY,
                offset.width,
                offset.height,
            );
        }
        else if (perspective.view?.enabled) {
            perspective.clearViewOffset();
        }

        if (controls) {
            controls.target.lerp(hasFocus.current ? focusTarget.current : ORIGIN, Math.min(1, delta * 2.4));
            idleRef.current += delta;
            controls.autoRotate = idleRef.current > 2.6;
            controls.autoRotateSpeed = 0.32;
        }
    });

    /* ------------------------------------------------------------------ *
     * Picking
     * ------------------------------------------------------------------ */
    const pressedAt = useRef<{x: number; y: number} | null>(null);

    useEffect(() => {
        const canvas = gl.domElement;
        const down = (event: PointerEvent) => {
            pressedAt.current = {x: event.clientX, y: event.clientY};
        };
        canvas.addEventListener('pointerdown', down);
        return () => canvas.removeEventListener('pointerdown', down);
    }, [gl]);

    const onMove = (event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();
        idleRef.current = 0;
        if (dragging.current) {
            return;
        }
        const index = event.index;
        if (index === undefined) {
            return;
        }
        const node = model.nodes[index];
        if (node && hoverStore.get() !== node.id) {
            hoverStore.set(node.id);
        }
    };

    const onOut = () => hoverStore.set(null);

    const onClick = (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        // Letting go of a rotation is not a choice of entity: a press that
        // travelled is a drag, whatever happens to be under the cursor at the end.
        const origin = pressedAt.current;
        if (origin) {
            const travelled = Math.hypot(
                event.nativeEvent.clientX - origin.x,
                event.nativeEvent.clientY - origin.y,
            );
            if (travelled > 4) {
                return;
            }
        }
        const index = event.index;
        if (index === undefined) {
            return;
        }
        const node = model.nodes[index];
        if (!node) {
            return;
        }
        selectionStore.set((prev) => ({
            ...prev,
            selectedNode: prev.selectedNode === node.id ? null : node.id,
            selectedEdge: null,
        }));
    };

    useEffect(() => {
        const perspective = camera as PerspectiveCamera;
        return () => {
            if (perspective.view?.enabled) {
                perspective.clearViewOffset();
            }
        };
    }, [camera]);

    useEffect(() => {
        const canvas = gl.domElement;
        canvas.style.cursor = hovered ? 'pointer' : '';
        return () => {
            canvas.style.cursor = '';
        };
    }, [hovered, gl]);

    return (
        <group ref={groupRef}>
            <lineSegments geometry={buffers.lineGeometry} material={materials.line} frustumCulled={false}/>
            <points geometry={buffers.haloGeometry} material={materials.halo} frustumCulled={false}/>
            <points
                geometry={buffers.pointGeometry}
                material={materials.point}
                frustumCulled={false}
                onPointerMove={onMove}
                onPointerOut={onOut}
                onClick={onClick}
            />
        </group>
    );
}

function markUpdated(buffers: Buffers): void {
    for (const geometry of [buffers.pointGeometry, buffers.haloGeometry, buffers.lineGeometry]) {
        for (const name of ['aColor', 'aAlpha', 'aSize']) {
            const attribute = geometry.getAttribute(name);
            if (attribute) {
                attribute.needsUpdate = true;
            }
        }
    }
}

/**
 * Walks every point and edge one step towards what the paint pass asked for.
 * Returns false once nothing is moving any more, which is what stops the loop
 * from re-uploading buffers that have not changed.
 */
function ease(buffers: Buffers, n: number, m: number, delta: number): boolean {
    const accentRate = 1 - Math.exp(-delta / ACCENT_TAU);
    const dimRate = 1 - Math.exp(-delta / DIM_TAU);
    const restoreRate = 1 - Math.exp(-delta / RESTORE_TAU);

    let drift = 0;

    const step = (current: Float32Array, target: Float32Array, index: number, rate: number) => {
        const gap = target[index] - current[index];
        const size = gap < 0 ? -gap : gap;
        if (size > drift) {
            drift = size;
        }
        current[index] = size < SETTLED ? target[index] : current[index] + gap * rate;
    };

    for (let i = 0; i < n; i++) {
        const rate = buffers.accented[i]
            ? accentRate
            : buffers.targetAlpha[i] < buffers.alpha[i]
              ? dimRate
              : restoreRate;
        step(buffers.alpha, buffers.targetAlpha, i, rate);
        step(buffers.size, buffers.targetSize, i, rate);
        step(buffers.haloAlpha, buffers.targetHaloAlpha, i, rate);
        step(buffers.haloSize, buffers.targetHaloSize, i, rate);
        step(buffers.color, buffers.targetColor, i * 3, rate);
        step(buffers.color, buffers.targetColor, i * 3 + 1, rate);
        step(buffers.color, buffers.targetColor, i * 3 + 2, rate);
    }

    for (let e = 0; e < m; e++) {
        const rate = buffers.lineAccented[e]
            ? accentRate
            : buffers.targetLineAlpha[e * 2] < buffers.lineAlpha[e * 2]
              ? dimRate
              : restoreRate;
        step(buffers.lineAlpha, buffers.targetLineAlpha, e * 2, rate);
        step(buffers.lineAlpha, buffers.targetLineAlpha, e * 2 + 1, rate);
        for (let v = 0; v < 6; v++) {
            step(buffers.lineColor, buffers.targetLineColor, e * 6 + v, rate);
        }
    }

    markUpdated(buffers);
    return drift >= SETTLED;
}
