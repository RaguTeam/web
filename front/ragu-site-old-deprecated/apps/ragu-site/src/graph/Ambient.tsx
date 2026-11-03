import {useEffect, useMemo, useRef} from 'react';
import {useFrame, useThree} from '@react-three/fiber';
import {BufferAttribute, BufferGeometry, type Group, type PerspectiveCamera} from 'three';
import {palette, rampAt} from './colors.ts';
import {hash01} from './layout.ts';
import {createLineMaterial, createPointMaterial, pointScale} from './shaders.ts';
import {fade} from './viewer-store.ts';
import type {Resolved} from '../lib/theme.ts';

const COUNT = 620;
const RADIUS = 3.4;
const LINK_DISTANCE = 0.82;
const MAX_LINKS = 900;

/**
 * The landing page shows the *shape* of a knowledge graph without paying for
 * one: a deterministic shell of points with short links between near
 * neighbours. Same geometry as the real cloud, none of the network.
 */
function buildAmbient(theme: Resolved) {
    const colors = palette(theme);
    const positions = new Float32Array(COUNT * 3);
    const color = new Float32Array(COUNT * 3);
    const alpha = new Float32Array(COUNT);
    const size = new Float32Array(COUNT);
    const haloAlpha = new Float32Array(COUNT);
    const haloSize = new Float32Array(COUNT);

    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < COUNT; i++) {
        // Fibonacci sphere, then pushed off the shell so it reads as a volume.
        const y = 1 - (i / (COUNT - 1)) * 2;
        const ring = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = golden * i;
        const shell = 0.62 + hash01(i * 7 + 3) * 0.42;
        const r = RADIUS * shell;

        positions[i * 3] = Math.cos(theta) * ring * r;
        positions[i * 3 + 1] = y * r;
        positions[i * 3 + 2] = Math.sin(theta) * ring * r;

        const weight = Math.pow(hash01(i * 13 + 5), 2.2);
        const tint = rampAt(colors.ramp, weight);
        color[i * 3] = tint.r;
        color[i * 3 + 1] = tint.g;
        color[i * 3 + 2] = tint.b;

        alpha[i] = 0.32 + weight * 0.5;
        size[i] = 0.03 + weight * 0.24;
        haloAlpha[i] = alpha[i] * 0.14 * (colors.additive ? 1 : 0.5);
        haloSize[i] = size[i] * 2.6;
    }

    const linkA: number[] = [];
    const linkB: number[] = [];
    for (let i = 0; i < COUNT && linkA.length < MAX_LINKS; i++) {
        for (let step = 1; step <= 3; step++) {
            const j = (i + step * 17 + Math.floor(hash01(i * 31 + step) * 9)) % COUNT;
            if (j === i) {
                continue;
            }
            const dx = positions[i * 3] - positions[j * 3];
            const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
            const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
            if (dx * dx + dy * dy + dz * dz < LINK_DISTANCE * LINK_DISTANCE) {
                linkA.push(i);
                linkB.push(j);
            }
        }
    }

    const linkCount = linkA.length;
    const linePositions = new Float32Array(linkCount * 6);
    const lineColor = new Float32Array(linkCount * 6);
    const lineAlpha = new Float32Array(linkCount * 2);
    for (let e = 0; e < linkCount; e++) {
        const a = linkA[e] * 3;
        const b = linkB[e] * 3;
        linePositions.set([positions[a], positions[a + 1], positions[a + 2]], e * 6);
        linePositions.set([positions[b], positions[b + 1], positions[b + 2]], e * 6 + 3);
        const value = colors.edgeOpacity * 0.7;
        lineAlpha[e * 2] = value;
        lineAlpha[e * 2 + 1] = value;
        for (let v = 0; v < 2; v++) {
            lineColor[e * 6 + v * 3] = colors.edge.r;
            lineColor[e * 6 + v * 3 + 1] = colors.edge.g;
            lineColor[e * 6 + v * 3 + 2] = colors.edge.b;
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

    const lineGeometry = new BufferGeometry();
    lineGeometry.setAttribute('position', new BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('aColor', new BufferAttribute(lineColor, 3));
    lineGeometry.setAttribute('aAlpha', new BufferAttribute(lineAlpha, 1));

    return {pointGeometry, haloGeometry, lineGeometry, additive: colors.additive};
}

export function Ambient({theme}: {theme: Resolved}) {
    const size = useThree((state) => state.size);
    const gl = useThree((state) => state.gl);
    const groupRef = useRef<Group>(null);

    const geometry = useMemo(() => buildAmbient(theme), [theme]);
    const materials = useMemo(
        () => ({
            point: createPointMaterial(0, false, 24),
            halo: createPointMaterial(1, geometry.additive, 28),
            line: createLineMaterial(),
        }),
        [geometry.additive],
    );

    useEffect(() => {
        return () => {
            geometry.pointGeometry.dispose();
            geometry.haloGeometry.dispose();
            geometry.lineGeometry.dispose();
        };
    }, [geometry]);

    useEffect(() => {
        return () => {
            materials.point.dispose();
            materials.halo.dispose();
            materials.line.dispose();
        };
    }, [materials]);

    useFrame((state, delta) => {
        const fov = (state.camera as PerspectiveCamera).fov ?? 45;
        const scale = pointScale(size.height, gl.getPixelRatio(), fov);
        const opacity = fade.ambient;
        materials.point.uniforms.uScale.value = scale;
        materials.halo.uniforms.uScale.value = scale;
        materials.point.uniforms.uOpacity.value = opacity;
        materials.halo.uniforms.uOpacity.value = opacity;
        materials.line.uniforms.uOpacity.value = opacity;

        if (groupRef.current) {
            groupRef.current.visible = opacity > 0.004;
            groupRef.current.rotation.y += delta * 0.045;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.09) * 0.16;
        }
    });

    return (
        <group ref={groupRef}>
            <lineSegments geometry={geometry.lineGeometry} material={materials.line} frustumCulled={false}/>
            <points geometry={geometry.haloGeometry} material={materials.halo} frustumCulled={false}/>
            <points geometry={geometry.pointGeometry} material={materials.point} frustumCulled={false}/>
        </group>
    );
}
