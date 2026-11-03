/**
 * What an entity description may carry beyond plain prose: an HTML table pulled
 * out of a parsed document, and TeX. Pure string work, no DOM — the component
 * that renders it lives in `components/ui/RichText.tsx`.
 */

/**
 * The markup a description is allowed to keep. Anything else is dropped by the
 * sanitiser, so detection looks for these names only: "<5 mg" in prose, or a
 * `<div>` that would be stripped anyway, is not a reason to parse it as HTML.
 */
export const RICH_TAGS = [
    'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption', 'colgroup', 'col',
    'b', 'strong', 'i', 'em', 'u', 'sub', 'sup', 'br', 'p', 'span', 'ul', 'ol', 'li', 'code',
] as const;

const HTML_TAG = new RegExp(`</?(?:${RICH_TAGS.join('|')})\\b[^>]*>`, 'i');

export type MathPart =
    | {kind: 'text'; value: string}
    | {kind: 'math'; value: string; display: boolean};

export function hasHtml(text: string): boolean {
    return HTML_TAG.test(text);
}

export function hasMath(text: string): boolean {
    return splitMath(text).some((part) => part.kind === 'math');
}

/** Whether the description needs anything more than a plain paragraph. */
export function hasMarkup(text: string): boolean {
    return hasHtml(text) || hasMath(text);
}

const PAIRS = [
    {open: '$$', close: '$$', display: true},
    {open: '\\[', close: '\\]', display: true},
    {open: '\\(', close: '\\)', display: false},
] as const;

/**
 * Splits text into prose and TeX.
 *
 * `$$…$$` and `\[…\]` are display maths, `\(…\)` and `$…$` inline. A single
 * dollar is the risky one — "$5 to $10" is money, not maths — so it follows
 * pandoc's rule: the opening `$` is followed by a non-space, the closing one is
 * preceded by a non-space and not followed by a digit. `\$` is a literal
 * dollar. A delimiter that never closes stays as text.
 */
export function splitMath(text: string): MathPart[] {
    const parts: MathPart[] = [];
    let prose = '';
    let i = 0;

    const flush = () => {
        if (prose) {
            parts.push({kind: 'text', value: prose});
            prose = '';
        }
    };

    while (i < text.length) {
        if (text.startsWith('\\$', i)) {
            prose += '$';
            i += 2;
            continue;
        }

        const pair = PAIRS.find((candidate) => text.startsWith(candidate.open, i));
        if (pair) {
            const end = text.indexOf(pair.close, i + pair.open.length);
            const body = end === -1 ? '' : text.slice(i + pair.open.length, end);
            if (body.trim()) {
                flush();
                parts.push({kind: 'math', value: body.trim(), display: pair.display});
                i = end + pair.close.length;
                continue;
            }
        }

        if (text[i] === '$' && !text.startsWith('$$', i)) {
            const end = closingDollar(text, i);
            if (end !== -1) {
                flush();
                parts.push({kind: 'math', value: text.slice(i + 1, end), display: false});
                i = end + 1;
                continue;
            }
        }

        prose += text[i];
        i += 1;
    }

    flush();
    return parts;
}

function closingDollar(text: string, open: number): number {
    const first = text[open + 1];
    if (first === undefined || /\s/.test(first)) {
        return -1;
    }
    for (let j = open + 1; j < text.length; j += 1) {
        if (text[j] === '\n' && text[j + 1] === '\n') {
            return -1;
        }
        if (text[j] === '$' && text[j - 1] !== '\\') {
            if (/\s/.test(text[j - 1]) || /\d/.test(text[j + 1] ?? '')) {
                return -1;
            }
            return j;
        }
    }
    return -1;
}
