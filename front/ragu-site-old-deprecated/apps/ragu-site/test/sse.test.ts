import test from 'node:test';
import assert from 'node:assert/strict';
import {sseParser, type SseEvent} from '../src/api/sse.ts';

function parse(pieces: string[]): SseEvent[] {
    const events: SseEvent[] = [];
    const parser = sseParser((event) => events.push(event));
    for (const piece of pieces) {
        parser.push(piece);
    }
    parser.end();
    return events;
}

const STREAM = 'event: delta\ndata: {"text": "Язык"}\n\nevent: delta\ndata: {"text": " C"}\n\nevent: message\ndata: {}\n\n';

test('events split however the network cuts them come out whole', () => {
    const whole = parse([STREAM]);
    assert.deepEqual(whole.map((event) => event.event), ['delta', 'delta', 'message']);
    assert.equal(whole[0].data, '{"text": "Язык"}');

    for (let cut = 1; cut < STREAM.length; cut++) {
        assert.deepEqual(parse([STREAM.slice(0, cut), STREAM.slice(cut)]), whole, `cut at ${cut}`);
    }
    assert.deepEqual(parse([...STREAM]), whole);
});

test('CRLF framing is read the same way', () => {
    assert.deepEqual(parse([STREAM.replaceAll('\n', '\r\n')]), parse([STREAM]));
});

test('an event the server never closed is still delivered at the end', () => {
    assert.deepEqual(parse(['event: error\ndata: {"code": "x"}']), [{event: 'error', data: '{"code": "x"}'}]);
});
