namespace $ {

	export const $raggu_web_front_scene_point_vert = `
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
    float fade = smoothstep(uFar, uNear, depth);
    vColor = mix(aColor, uHaze, uHazeAmount * (1.0 - fade));
    vAlpha = aAlpha * uOpacity * mix(0.3, 1.0, fade);
    gl_PointSize = aSize * (uScale / max(depth, 0.001));
    gl_Position = projectionMatrix * mv;
}
`

	export const $raggu_web_front_scene_point_frag = `
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
`

	export const $raggu_web_front_scene_line_vert = `
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
`

	export const $raggu_web_front_scene_line_frag = `
varying vec3 vColor;
varying float vAlpha;

void main() {
    if (vAlpha < 0.004) discard;
    gl_FragColor = vec4(vColor, vAlpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
`

	export function $raggu_web_front_scene_point_scale( height: number, ratio: number, fov: number ) {
		return ( height * ratio ) / ( 2 * Math.tan( ( ( fov / 2 ) * Math.PI ) / 180 ) )
	}

	export type $raggu_web_front_scene_rect = { x: number, y: number, width: number, height: number }

	export function $raggu_web_front_scene_frame( stage: $raggu_web_front_scene_rect | null, viewport: { width: number, height: number } ) {

		if( !stage || viewport.width <= 0 || viewport.height <= 0 || stage.width <= 0 || stage.height <= 0 ) return null

		const scale = Math.max( viewport.width / stage.width, viewport.height / stage.height )
		const full_width = viewport.width / scale
		const full_height = viewport.height / scale

		return {
			full_width,
			full_height,
			offset_x: full_width / 2 - ( stage.x + stage.width / 2 ),
			offset_y: full_height / 2 - ( stage.y + stage.height / 2 ),
			width: viewport.width,
			height: viewport.height,
		}

	}

	export function $raggu_web_front_scene_degree_ramp( degree: number, max: number ) {
		if( max <= 1 ) return 0.5
		return Math.pow( Math.log1p( degree ) / Math.log1p( max ), 1.85 )
	}

}
