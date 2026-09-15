import {Color} from 'three';
import type {Resolved} from '../lib/theme.ts';

/**
 * The cloud is a *sequential* encoding, not a categorical one.
 *
 * A knowledge graph carries 40+ entity types; painting each one a hue produces
 * confetti that no colour-vision check can pass and nobody can read. So the ramp
 * encodes the one continuous quantity that actually means something — how
 * connected an entity is — in a single hue, and the brand accent is reserved
 * for interaction: hover, selection, search hits, the type you highlighted.
 *
 * Steps are taken from a validated blue ramp; both ends clear the ordinal
 * contrast floor against their own surface.
 */
const RAMP_LIGHT = ['#7cb0ec', '#5598e7', '#2a78d6', '#1c5cab', '#104281', '#0d366b'];
const RAMP_DARK = ['#1c5cab', '#256abf', '#3987e5', '#6da7ec', '#9ec5f4', '#cde2fb'];

const ACCENT_LIGHT = '#d64b2e';
const ACCENT_DARK = '#ff6e4e';

const EDGE_LIGHT = '#8e9cb2';
const EDGE_DARK = '#3f5f8c';

export type Palette = {
    ramp: Color[];
    accent: Color;
    accentSoft: Color;
    edge: Color;
    /**
     * What distance drains a point towards. Depth is the one thing a projected
     * point cloud cannot say by position alone, so the far side of the cloud
     * loses colour into the page instead of only losing opacity.
     */
    haze: Color;
    /** Base opacity for the edge mesh — light surfaces need less ink. */
    edgeOpacity: number;
    /** Points blend additively only where the surface can take it. */
    additive: boolean;
    dim: number;
};

const cache = new Map<Resolved, Palette>();

export function palette(theme: Resolved): Palette {
    const hit = cache.get(theme);
    if (hit) {
        return hit;
    }

    const dark = theme === 'dark';
    const value: Palette = {
        ramp: (dark ? RAMP_DARK : RAMP_LIGHT).map((hex) => new Color(hex)),
        accent: new Color(dark ? ACCENT_DARK : ACCENT_LIGHT),
        accentSoft: new Color(dark ? '#ffa48c' : '#e8825f'),
        edge: new Color(dark ? EDGE_DARK : EDGE_LIGHT),
        // Additive points cannot be darkened by alpha alone, so on dark the haze
        // is near-black; on light it is the page itself.
        haze: new Color(dark ? '#05090f' : '#eef0f3'),
        edgeOpacity: dark ? 0.3 : 0.24,
        additive: dark,
        dim: dark ? 0.1 : 0.14,
    };

    cache.set(theme, value);
    return value;
}

const scratch = new Color();

/** `t` in [0, 1] — 0 is a leaf entity, 1 is the most connected hub. */
export function rampAt(ramp: Color[], t: number): Color {
    const clamped = t <= 0 ? 0 : t >= 1 ? 1 : t;
    const scaled = clamped * (ramp.length - 1);
    const index = Math.min(ramp.length - 2, Math.floor(scaled));
    return scratch.copy(ramp[index]).lerp(ramp[index + 1], scaled - index);
}

/**
 * Degree is heavily skewed — a handful of hubs, a long tail of leaves — so a
 * linear map would paint 95% of the cloud the same colour. Compress it.
 */
export function degreeToRamp(degree: number, maxDegree: number): number {
    if (maxDegree <= 1) {
        return 0.5;
    }
    // Log first to tame the skew, then a gamma so the long tail of leaf entities
    // does not all land in the middle of the ramp looking identical.
    return Math.pow(Math.log1p(degree) / Math.log1p(maxDegree), 1.85);
}
