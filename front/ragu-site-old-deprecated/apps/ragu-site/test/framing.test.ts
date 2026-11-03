import test from 'node:test';
import assert from 'node:assert/strict';
import {frameStage, projectedRect} from '../src/graph/framing.ts';

const VIEWPORT = {width: 1600, height: 900};

/** The centre of where the view actually lands on the canvas. */
function centreOf(stage: {x: number; y: number; width: number; height: number}) {
    const offset = frameStage(stage, VIEWPORT);
    assert.ok(offset, 'expected a framing');
    const rect = projectedRect(offset);
    return {x: rect.x + rect.width / 2, y: rect.y + rect.height / 2, width: rect.width, height: rect.height};
}

test('no stage at all leaves the projection alone', () => {
    assert.equal(frameStage(null, VIEWPORT), null);
    assert.equal(frameStage({x: 0, y: 0, width: 0, height: 0}, VIEWPORT), null);
});

test('a full-canvas stage is the identity framing', () => {
    const offset = frameStage({x: 0, y: 0, width: 1600, height: 900}, VIEWPORT);
    assert.ok(offset);
    assert.equal(offset.fullWidth, 1600);
    assert.equal(offset.fullHeight, 900);
    assert.equal(offset.offsetX, 0);
    assert.equal(offset.offsetY, 0);
});

test('the view lands centred on the free rectangle', () => {
    for (const stage of [
        {x: 0, y: 0, width: 1000, height: 900},
        {x: 40, y: 180, width: 543, height: 277},
        {x: 800, y: 450, width: 800, height: 450},
    ]) {
        const centre = centreOf(stage);
        assert.ok(
            Math.abs(centre.x - (stage.x + stage.width / 2)) < 1e-6,
            `x drifted for ${JSON.stringify(stage)}: ${centre.x}`,
        );
        assert.ok(
            Math.abs(centre.y - (stage.y + stage.height / 2)) < 1e-6,
            `y drifted for ${JSON.stringify(stage)}: ${centre.y}`,
        );
    }
});

test('the view fits inside the free rectangle without distorting', () => {
    const stage = {x: 40, y: 180, width: 543, height: 277};
    const landed = centreOf(stage);

    assert.ok(landed.width <= stage.width + 1e-6, `too wide: ${landed.width}`);
    assert.ok(landed.height <= stage.height + 1e-6, `too tall: ${landed.height}`);
    // One dimension touches the edge — it shrank exactly as far as it had to.
    assert.ok(
        Math.abs(landed.width - stage.width) < 1e-6 || Math.abs(landed.height - stage.height) < 1e-6,
        'shrank further than necessary',
    );
    // Aspect is preserved.
    assert.ok(Math.abs(landed.width / landed.height - 1600 / 900) < 1e-6);
});

test('a quadrant halves the view', () => {
    const landed = centreOf({x: 0, y: 0, width: 800, height: 450});
    assert.ok(Math.abs(landed.width - 800) < 1e-6);
    assert.ok(Math.abs(landed.height - 450) < 1e-6);
});

test('a stage on the right pushes the view right', () => {
    const landed = centreOf({x: 600, y: 0, width: 1000, height: 900});
    assert.ok(landed.x > 800, `expected a rightward landing, got ${landed.x}`);
});
