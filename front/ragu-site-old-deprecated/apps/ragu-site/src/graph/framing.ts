export type Rect = {x: number; y: number; width: number; height: number};

/** Arguments for `PerspectiveCamera.setViewOffset`. */
export type ViewOffset = {
    fullWidth: number;
    fullHeight: number;
    offsetX: number;
    offsetY: number;
    width: number;
    height: number;
};

/**
 * Panels cover part of the canvas, so the scene is drawn into the part they
 * left rather than the middle of the window.
 *
 * The first attempt moved the cloud in world space and pointed the camera at
 * where it had gone — which cancels out exactly, because a camera aimed at the
 * cloud puts the cloud back in the middle of the frame. The offset belongs to
 * the projection, not to the scene: the camera keeps orbiting the cloud, and
 * the frustum is skewed so that view lands inside the free rectangle.
 *
 * That also keeps picking and the label overlay honest, since both read the
 * projection matrix rather than a transform applied behind their backs.
 */
export function frameStage(stage: Rect | null, viewport: {width: number; height: number}): ViewOffset | null {
    if (!stage || viewport.width <= 0 || viewport.height <= 0 || stage.width <= 0 || stage.height <= 0) {
        return null;
    }

    // Uniform, so the frame keeps its aspect: the view shrinks until it fits
    // the free rectangle in both directions.
    const scale = Math.max(viewport.width / stage.width, viewport.height / stage.height);
    const fullWidth = viewport.width / scale;
    const fullHeight = viewport.height / scale;

    return {
        fullWidth,
        fullHeight,
        offsetX: fullWidth / 2 - (stage.x + stage.width / 2),
        offsetY: fullHeight / 2 - (stage.y + stage.height / 2),
        width: viewport.width,
        height: viewport.height,
    };
}

/** Where the framed view lands on the canvas, in CSS pixels. Used by the tests. */
export function projectedRect(offset: ViewOffset): Rect {
    return {
        x: -offset.offsetX,
        y: -offset.offsetY,
        width: offset.fullWidth,
        height: offset.fullHeight,
    };
}
