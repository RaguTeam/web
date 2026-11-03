import {AdditiveBlending, Color, NormalBlending, ShaderMaterial} from 'three';

export const POINT_VERT = /* glsl */ `
attribute float aSize;
attribute float aAlpha;
attribute vec3 aColor;
uniform float uScale;
uniform float uOpacity;
uniform float uNear;
uniform float uFar;
uniform vec3 uHaze;
uniform float uHazeAmount;
varying vec3 vColor;
varying float vAlpha;

void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float depth = -mv.z;
    // Distant points recede instead of piling up into a flat wall — they lose
    // opacity, and they also drain towards the page, which is the cue that
    // survives an additively-blended cloud.
    float fade = smoothstep(uFar, uNear, depth);
    vColor = mix(aColor, uHaze, uHazeAmount * (1.0 - fade));
    vAlpha = aAlpha * uOpacity * mix(0.3, 1.0, fade);
    gl_PointSize = aSize * (uScale / max(depth, 0.001));
    gl_Position = projectionMatrix * mv;
}
`;

export const POINT_FRAG = /* glsl */ `
uniform float uSoft;
varying vec3 vColor;
varying float vAlpha;

void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv) * 2.0;
    if (d > 1.0) discard;
    float core = smoothstep(1.0, 0.18, d);
    float glow = pow(1.0 - d, 2.4);
    float a = mix(core, glow, uSoft) * vAlpha;
    if (a < 0.004) discard;
    gl_FragColor = vec4(vColor, a);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
`;

export const LINE_VERT = /* glsl */ `
attribute float aAlpha;
attribute vec3 aColor;
uniform float uOpacity;
uniform float uNear;
uniform float uFar;
uniform vec3 uHaze;
uniform float uHazeAmount;
varying vec3 vColor;
varying float vAlpha;

void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float fade = smoothstep(uFar, uNear, -mv.z);
    vColor = mix(aColor, uHaze, uHazeAmount * (1.0 - fade));
    vAlpha = aAlpha * uOpacity * mix(0.2, 1.0, fade);
    gl_Position = projectionMatrix * mv;
}
`;

export const LINE_FRAG = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;

void main() {
    if (vAlpha < 0.004) discard;
    gl_FragColor = vec4(vColor, vAlpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
`;

/** How far a point at the back of the cloud drains towards the haze colour. */
export type Depth = {haze: Color; amount: number};

const NO_HAZE: Depth = {haze: new Color(0, 0, 0), amount: 0};

export function createPointMaterial(
    soft: 0 | 1,
    additive: boolean,
    far = 22,
    depth: Depth = NO_HAZE,
): ShaderMaterial {
    return new ShaderMaterial({
        vertexShader: POINT_VERT,
        fragmentShader: POINT_FRAG,
        transparent: true,
        depthWrite: false,
        blending: additive ? AdditiveBlending : NormalBlending,
        uniforms: {
            uScale: {value: 400},
            uOpacity: {value: 1},
            uSoft: {value: soft},
            uNear: {value: 4},
            uFar: {value: far},
            uHaze: {value: depth.haze.clone()},
            uHazeAmount: {value: depth.amount},
        },
    });
}

export function createLineMaterial(depth: Depth = NO_HAZE): ShaderMaterial {
    return new ShaderMaterial({
        vertexShader: LINE_VERT,
        fragmentShader: LINE_FRAG,
        transparent: true,
        depthWrite: false,
        uniforms: {
            uOpacity: {value: 1},
            uNear: {value: 4},
            uFar: {value: 24},
            uHaze: {value: depth.haze.clone()},
            uHazeAmount: {value: depth.amount},
        },
    });
}

/** gl_PointSize is in framebuffer pixels, so the scale carries the DPR. */
export function pointScale(viewportHeight: number, pixelRatio: number, fovDegrees: number): number {
    return (viewportHeight * pixelRatio) / (2 * Math.tan(((fovDegrees / 2) * Math.PI) / 180));
}
