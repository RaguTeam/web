import {useMemo} from 'react';
import {hash01} from '../../graph/layout.ts';

type Point = {x: number; y: number; r: number; hub: boolean};

/**
 * A card preview, not a data visualisation: the corpus id seeds the geometry
 * and the node/edge counts set the density, so each card is recognisably its
 * own corpus without fetching two megabytes to draw a thumbnail.
 */
export function Constellation({
    seed,
    nodes,
    edges,
    className,
}: {
    seed: string;
    nodes: number;
    edges: number;
    className?: string;
}) {
    const {points, links} = useMemo(() => {
        let key = 0;
        for (let i = 0; i < seed.length; i++) {
            key = (Math.imul(key, 31) + seed.charCodeAt(i)) | 0;
        }

        const density = Math.min(1, Math.log10(Math.max(10, nodes)) / 5);
        const count = Math.round(18 + density * 30);
        const generated: Point[] = [];

        for (let i = 0; i < count; i++) {
            const angle = hash01(key + i * 7) * Math.PI * 2;
            const radius = Math.pow(hash01(key + i * 13 + 1), 0.62) * 46;
            const wobble = (hash01(key + i * 23 + 5) - 0.5) * 8;
            generated.push({
                x: 50 + Math.cos(angle) * radius + wobble,
                y: 50 + Math.sin(angle) * radius * 0.74 + wobble * 0.6,
                r: 0.9 + hash01(key + i * 41 + 9) * 2.6,
                hub: hash01(key + i * 57 + 3) > 0.88,
            });
        }

        const ratio = Math.min(2.4, edges / Math.max(1, nodes));
        const wanted = Math.round(count * ratio * 0.8);
        const generatedLinks: Array<[number, number]> = [];
        for (let i = 0; i < count && generatedLinks.length < wanted; i++) {
            for (let step = 1; step <= 3 && generatedLinks.length < wanted; step++) {
                const j = (i + step + Math.floor(hash01(key + i * 91 + step) * 5)) % count;
                if (j === i) continue;
                const a = generated[i];
                const b = generated[j];
                if (Math.hypot(a.x - b.x, a.y - b.y) < 26) {
                    generatedLinks.push([i, j]);
                }
            }
        }

        return {points: generated, links: generatedLinks};
    }, [seed, nodes, edges]);

    return (
        <svg viewBox="0 0 100 100" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <g stroke="var(--edge-strong)" strokeWidth="0.28" opacity="0.75">
                {links.map(([a, b], index) => (
                    <line key={index} x1={points[a].x} y1={points[a].y} x2={points[b].x} y2={points[b].y}/>
                ))}
            </g>
            <g>
                {points.map((point, index) => (
                    <circle
                        key={index}
                        cx={point.x}
                        cy={point.y}
                        r={point.r}
                        fill={point.hub ? 'var(--accent)' : 'var(--text-3)'}
                        opacity={point.hub ? 0.95 : 0.5}
                    />
                ))}
            </g>
        </svg>
    );
}
