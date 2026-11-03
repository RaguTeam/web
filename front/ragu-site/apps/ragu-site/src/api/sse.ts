export type SseEvent = {event: string; data: string};

/**
 * Server-Sent Events from a stream that arrives in arbitrary pieces: a piece
 * can end mid-line, or hold several events at once. Only what the backend
 * sends is handled — `event:` and `data:` lines, events split by a blank line.
 */
export function sseParser(onEvent: (event: SseEvent) => void) {
    let buffer = '';

    const flush = (block: string) => {
        let event = 'message';
        const data: string[] = [];
        for (const line of block.split(/\r?\n/)) {
            if (line.startsWith('event:')) {
                event = line.slice(6).trim();
            }
            else if (line.startsWith('data:')) {
                data.push(line.slice(5).replace(/^ /, ''));
            }
        }
        if (data.length > 0) {
            onEvent({event, data: data.join('\n')});
        }
    };

    return {
        push(piece: string) {
            buffer += piece;
            const blocks = buffer.split(/\r?\n\r?\n/);
            buffer = blocks.pop() ?? '';
            for (const block of blocks) {
                flush(block);
            }
        },
        end() {
            flush(buffer);
            buffer = '';
        },
    };
}
