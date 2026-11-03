import {useEffect, useMemo, useState} from 'react';
import DOMPurify from 'dompurify';
import {cn} from '../../lib/cn.ts';
import {RICH_TAGS, hasHtml, hasMarkup, hasMath, splitMath} from '../../lib/rich-text.ts';

type Katex = typeof import('katex').default;

// KaTeX is loaded lazily, on the first formula.
let katexModule: Katex | null = null;
let katexLoad: Promise<Katex> | null = null;

function loadKatex(): Promise<Katex> {
    katexLoad ??= Promise.all([import('katex'), import('katex/dist/katex.min.css')]).then(([module]) => {
        katexModule = module.default;
        return katexModule;
    });
    return katexLoad;
}

function useKatex(needed: boolean): Katex | null {
    const [katex, setKatex] = useState<Katex | null>(katexModule);
    useEffect(() => {
        if (!needed || katex) {
            return;
        }
        let live = true;
        void loadKatex().then((module) => {
            if (live) {
                setKatex(module);
            }
        });
        return () => {
            live = false;
        };
    }, [needed, katex]);
    return katex;
}

/**
 * Sanitized HTML with formulas rendered into the string, not patched into the
 * DOM afterwards: otherwise a remounted card shows raw TeX.
 */
function toHtml(text: string, katex: Katex | null): string {
    const root = document.createElement('div');
    if (hasHtml(text)) {
        root.append(
            DOMPurify.sanitize(text, {
                ALLOWED_TAGS: [...RICH_TAGS],
                ALLOWED_ATTR: ['colspan', 'rowspan'],
                RETURN_DOM_FRAGMENT: true,
            }),
        );
    } else {
        root.append(document.createTextNode(text));
    }

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const texts: Text[] = [];
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        texts.push(node as Text);
    }
    for (const node of texts) {
        const parts = splitMath(node.data);
        if (!parts.some((part) => part.kind === 'math')) {
            continue;
        }
        node.replaceWith(
            ...parts.map((part) => {
                if (part.kind === 'text') {
                    return document.createTextNode(part.value);
                }
                const slot = document.createElement('span');
                slot.className = part.display ? 'rich-math rich-math-display' : 'rich-math';
                if (katex) {
                    slot.innerHTML = katex.renderToString(part.value, {
                        displayMode: part.display,
                        throwOnError: false,
                        trust: false,
                    });
                } else {
                    slot.textContent = part.value;
                }
                return slot;
            }),
        );
    }
    return root.innerHTML;
}

export function RichText({text, className}: {text: string; className?: string}) {
    const rich = hasMarkup(text);
    const katex = useKatex(rich && hasMath(text));
    const html = useMemo(() => (rich ? toHtml(text, katex) : ''), [rich, text, katex]);

    if (!rich) {
        return <p className={className}>{text}</p>;
    }
    return (
        <div
            className={cn('rich-text', !hasHtml(text) && 'whitespace-pre-line', className)}
            dangerouslySetInnerHTML={{__html: html}}
        />
    );
}
