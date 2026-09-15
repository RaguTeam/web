import {useEffect, useMemo, useRef} from 'react';
import {useFrame, useThree} from '@react-three/fiber';
import {Vector3} from 'three';
import type {GraphModel} from './model.ts';
import {fade, hoverStore, selectionStore} from './viewer-store.ts';

const MAX_LABELS = 26;
const COLLISION_PX = 54;

type Entry = {index: number; id: string; label: string; type: string; strong: boolean};

/**
 * Labels are DOM, not sprites: they inherit the site's typography and stay
 * crisp at any DPR. Only a couple of dozen are ever mounted — the hubs, plus
 * whatever the reader is pointing at — and they are positioned imperatively so
 * React never re-renders on camera movement.
 */
export function Labels({model, positions}: {model: GraphModel; positions: Float32Array}) {
    const gl = useThree((state) => state.gl);
    const camera = useThree((state) => state.camera);
    const size = useThree((state) => state.size);
    const selection = selectionStore.use();
    const hovered = hoverStore.use();

    const container = useMemo(() => {
        const element = document.createElement('div');
        element.style.position = 'absolute';
        element.style.inset = '0';
        element.style.pointerEvents = 'none';
        element.style.overflow = 'hidden';
        return element;
    }, []);

    useEffect(() => {
        const parent = gl.domElement.parentElement;
        parent?.appendChild(container);
        return () => {
            container.remove();
        };
    }, [container, gl]);

    const entries = useMemo<Entry[]>(() => {
        const query = selection.search.trim().toLowerCase();
        const typeFilter = new Set(selection.types);
        const communityFilter = new Set(selection.communities);
        const highlighted = new Set(selection.highlight);
        const explicit = query.length > 0 || typeFilter.size > 0 || communityFilter.size > 0;

        const candidates: Entry[] = [];
        for (let i = 0; i < model.nodes.length; i++) {
            const node = model.nodes[i];
            if (query && !node.label.toLowerCase().includes(query)) continue;
            if (typeFilter.size > 0 && !typeFilter.has(node.entity_type)) continue;
            if (communityFilter.size > 0 && !(node.community_id && communityFilter.has(node.community_id))) continue;
            if (!explicit && highlighted.size > 0 && !highlighted.has(node.id)) continue;
            candidates.push({index: i, id: node.id, label: node.label, type: node.entity_type, strong: false});
        }

        candidates.sort((a, b) => model.degree[b.index] - model.degree[a.index]);
        const picked = candidates.slice(0, MAX_LABELS);

        for (const id of [selection.selectedNode, hovered]) {
            if (!id) continue;
            const index = model.indexOf.get(id);
            if (index === undefined) continue;
            const existing = picked.find((entry) => entry.index === index);
            if (existing) {
                existing.strong = true;
            }
            else {
                const node = model.nodes[index];
                picked.unshift({index, id: node.id, label: node.label, type: node.entity_type, strong: true});
            }
        }

        return picked;
    }, [model, selection, hovered]);

    const nodesRef = useRef<HTMLElement[]>([]);

    useEffect(() => {
        container.textContent = '';
        nodesRef.current = entries.map((entry) => {
            const element = document.createElement('span');
            element.className = entry.strong ? 'ragu-label ragu-label--strong' : 'ragu-label';
            element.textContent = entry.label;
            if (entry.strong) {
                const type = document.createElement('em');
                type.className = 'ragu-label__type';
                type.textContent = entry.type;
                element.appendChild(type);
            }
            container.appendChild(element);
            return element;
        });
        return () => {
            container.textContent = '';
            nodesRef.current = [];
        };
    }, [entries, container]);

    const projected = useMemo(() => new Vector3(), []);
    const placed = useRef<number[]>([]);

    useFrame(() => {
        const elements = nodesRef.current;
        if (elements.length === 0) {
            return;
        }
        const opacity = fade.graph;
        placed.current.length = 0;
        const width = size.width;
        const height = size.height;

        for (let k = 0; k < entries.length; k++) {
            const element = elements[k];
            if (!element) continue;
            const index = entries[k].index;
            projected.set(positions[index * 3], positions[index * 3 + 1], positions[index * 3 + 2]);
            const distance = projected.distanceTo(camera.position);
            projected.project(camera);

            const behind = projected.z > 1;
            const x = (projected.x * 0.5 + 0.5) * width;
            const y = (-projected.y * 0.5 + 0.5) * height;

            let hidden = behind || x < 8 || x > width - 8 || y < 8 || y > height - 8 || opacity < 0.08;

            if (!hidden && !entries[k].strong) {
                for (let p = 0; p < placed.current.length; p += 2) {
                    if (Math.abs(placed.current[p] - x) < COLLISION_PX && Math.abs(placed.current[p + 1] - y) < 20) {
                        hidden = true;
                        break;
                    }
                }
            }

            if (hidden) {
                element.style.opacity = '0';
                element.style.visibility = 'hidden';
                continue;
            }

            placed.current.push(x, y);
            const depthFade = Math.max(0, Math.min(1, 1.65 - distance / 12));
            element.style.visibility = 'visible';
            element.style.opacity = String((entries[k].strong ? 1 : 0.55 + depthFade * 0.45) * opacity);
            element.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0) translate(-50%, -140%)`;
        }
    });

    return null;
}
