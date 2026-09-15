import {useQuery} from '@tanstack/react-query';
import {AnimatePresence, motion} from 'motion/react';
import {queries} from '../../api/queries.ts';
import type {GraphModel} from '../../graph/model.ts';
import {patchScene, patchSelection} from '../../graph/viewer-store.ts';
import {askQuestion} from './chat-store.ts';
import {cn} from '../../lib/cn.ts';
import {useLang, useT} from '../../lib/i18n.ts';
import {entityTypeName, relationTypeName} from '../../lib/type-names.ts';
import {Chip, Skeleton} from '../ui/primitives.tsx';
import {IconChat, IconClose, IconSources} from '../ui/icons.tsx';
import {Disclosure} from '../ui/Disclosure.tsx';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * One content swaps for another inside a panel that never moves: the outgoing
 * half rises out, the incoming half arrives from below. `mode="wait"` matters
 * as much as the motion — two panels alive at once is what used to flash an
 * empty pane between entities.
 */
const SWAP = {
    initial: {opacity: 0, y: 8},
    animate: {opacity: 1, y: 0},
    exit: {opacity: 0, y: -8},
    transition: {duration: 0.18, ease: EASE},
};

/* ------------------------------------------------------------------ *
 * The prompt, before anything is picked.
 *
 * Not a panel of its own: it is a hint, so it sits inside the panel it will
 * become, at the height of the search field above it, over glass turned nearly
 * all the way down.
 * ------------------------------------------------------------------ */
function Hint({dimmed}: {dimmed?: boolean}) {
    const t = useT();

    return (
        <motion.div
            {...SWAP}
            title={t.viewer.emptyCardHint}
            className={cn(
                // Two pixels over the search field it sits beside: the pane
                // behind it is turned most of the way down, and a panel with a
                // faint edge and a light row of content reads shorter than it is.
                'flex h-11 items-center gap-2.5 px-2.5 transition-opacity duration-500',
                dimmed && 'opacity-45',
            )}
        >
            <span
                className="flex size-7 shrink-0 items-center justify-center rounded-full text-text-3"
                style={{background: 'color-mix(in oklab, var(--text) 7%, transparent)'}}
            >
                {/* The dot marks where the cursor's tip is, which is what a
                    click actually lands on. */}
                <svg viewBox="0 0 18 18" width="14" height="14" aria-hidden="true">
                    <circle cx="4.6" cy="3.1" r="3" fill="var(--accent)" opacity="0.8"/>
                    <path
                        d="M4.6 3.1 13.7 8.4 9.6 9.6 8.1 13.6 4.6 3.1Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>
            <span className="truncate text-sm text-text-2">{t.viewer.emptyCard}</span>
        </motion.div>
    );
}

/* ------------------------------------------------------------------ *
 * The entity itself.
 * ------------------------------------------------------------------ */
function EntityBody({
    datasetId,
    model,
    nodeId,
    dense,
}: {
    datasetId: string;
    model: GraphModel | null;
    nodeId: string;
    dense?: boolean;
}) {
    const t = useT();
    const lang = useLang();
    const {data, isPending, isError} = useQuery(queries.node(datasetId, nodeId));

    // Show what the cloud already knows while the detail request is in flight.
    const local = model?.nodes[model.indexOf.get(nodeId) ?? -1];
    const node = data?.node ?? local;

    // A self-loop comes back in both directions under one id, so the pair, not
    // the id, is what identifies a row.
    const relations = [...(data?.outgoing_relations ?? []), ...(data?.incoming_relations ?? [])];
    const chunks = data?.provenance_chunks ?? [];

    const close = () => patchSelection({selectedNode: null, selectedEdge: null});

    return (
        <motion.div {...SWAP} className="flex min-h-0 flex-1 flex-col">
            <header className="flex items-start justify-between gap-3 px-3 pt-2">
                <div className="min-w-0">
                    <p className="label-xs">{t.viewer.entityCard}</p>
                    <h2
                        className={cn(
                            'mt-2 font-display leading-tight font-medium tracking-[-0.02em] text-text',
                            dense ? 'text-lg' : 'text-2xl',
                        )}
                    >
                        {node?.label ?? <Skeleton className="h-6 w-40"/>}
                    </h2>
                    {node ? (
                        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                            <Chip tone="accent">{entityTypeName(node.entity_type, lang)}</Chip>
                            <Chip>
                                <span className="tnum">{node.degree}</span> {t.viewer.degree}
                            </Chip>
                        </div>
                    ) : null}
                </div>
                <button
                    type="button"
                    onClick={close}
                    aria-label={t.common.close}
                    className="stage-tool size-8 shrink-0"
                >
                    <IconClose/>
                </button>
            </header>

            <div className="scroll-thin mt-3 min-h-0 flex-1 overflow-y-auto px-3 pb-2">
                {isPending && !local ? (
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-3 w-full"/>
                        <Skeleton className="h-3 w-[92%]"/>
                        <Skeleton className="h-3 w-[74%]"/>
                    </div>
                ) : isError && !local ? (
                    <p className="text-sm text-text-2">{t.common.errorHint}</p>
                ) : (
                    <p className={cn('leading-[1.65] text-text-2', dense ? 'text-[0.85rem]' : 'text-sm')}>
                        {node?.description}
                    </p>
                )}

                {relations.length > 0 ? (
                    <section className="mt-6">
                        <p className="label-xs">{t.viewer.relations(relations.length)}</p>
                        <ul className="mt-3 flex flex-col divide-y divide-edge">
                            {relations.slice(0, dense ? 6 : 40).map((relation) => (
                                <li key={`${relation.direction}-${relation.id}`}>
                                    <button
                                        type="button"
                                        onClick={() => patchSelection({selectedNode: relation.other_node_id, selectedEdge: null})}
                                        className="group grid w-full grid-cols-[auto_1fr] items-baseline gap-x-3 py-2.5 text-left transition-colors duration-200"
                                    >
                                        <span
                                            className={cn(
                                                'font-mono text-[0.62rem] tracking-[0.08em] uppercase',
                                                relation.direction === 'outgoing' ? 'text-accent' : 'text-text-3',
                                            )}
                                        >
                                            {relation.direction === 'outgoing' ? '→' : '←'}{' '}
                                            {relationTypeName(relation.relation_type, lang)}
                                        </span>
                                        <span className="truncate text-sm text-text-2 transition-colors duration-200 group-hover:text-accent">
                                            {relation.other_node_label}
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </section>
                ) : null}

                {chunks.length > 0 ? (
                    // Pulled left of the prose by its own summary padding, so the
                    // icon and the section labels line up with the text above.
                    <Disclosure
                        className="mt-6 -mr-1 -ml-2"
                        label={t.viewer.provenance}
                        count={chunks.length}
                        icon={<IconSources className="size-4"/>}
                    >
                        <ul className="flex flex-col gap-3">
                            {chunks.slice(0, 6).map((chunk) => (
                                <li key={chunk.id} className="rounded-inset border border-edge bg-surface/35 px-3 py-3">
                                    <p className="label-xs">{chunk.id.slice(0, 16)}</p>
                                    <p className="mt-2 text-xs leading-relaxed text-text-2">
                                        {chunk.content.slice(0, 420)}
                                        {chunk.content.length > 420 ? '…' : ''}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </Disclosure>
                ) : null}
            </div>

            {node ? (
                <button
                    type="button"
                    onClick={() => {
                        patchScene({chatVisible: true});
                        askQuestion(t.viewer.askTemplate(node.label));
                    }}
                    className={cn(
                        'mt-2 flex items-center justify-center gap-2 rounded-inset px-4 py-3 text-sm font-semibold',
                        'bg-accent text-accent-ink transition-colors duration-200 hover:bg-accent-hover active:translate-y-px',
                    )}
                >
                    <IconChat/>
                    {t.viewer.askAbout}
                </button>
            ) : null}
        </motion.div>
    );
}

/* ------------------------------------------------------------------ *
 * The panel both of them live in.
 * ------------------------------------------------------------------ */
export function DetailPanel({
    datasetId,
    model,
    nodeId,
    className,
    compact: dense,
    /** Show the prompt when nothing is picked, instead of collapsing away. */
    hint,
    /** Nothing is clickable yet, so the prompt should not ask for a click. */
    waiting,
}: {
    datasetId: string;
    model: GraphModel | null;
    nodeId: string | null;
    className?: string;
    compact?: boolean;
    hint?: boolean;
    waiting?: boolean;
}) {
    const t = useT();
    const open = nodeId !== null;

    return (
        <motion.aside
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 10}}
            transition={{duration: 0.24, ease: EASE}}
            className={cn(
                'pointer-events-auto relative isolate flex min-h-0 flex-col rounded-island p-1.5',
                // A hint hugs its one line; a card takes the height it is given.
                !open && 'self-start',
                className,
            )}
            aria-label={t.viewer.entityCard}
        >
            {/* Turned nearly all the way down while this is only a prompt, and
                brought up to a full pane once it holds an entity. */}
            <motion.span
                aria-hidden="true"
                className="island-surface"
                initial={false}
                animate={{opacity: open ? 1 : 0.3}}
                transition={{duration: 0.36, ease: EASE}}
            />
            <AnimatePresence mode="wait" initial={false}>
                {open ? (
                    <EntityBody key={nodeId} datasetId={datasetId} model={model} nodeId={nodeId} dense={dense}/>
                ) : hint ? (
                    <Hint key="hint" dimmed={waiting}/>
                ) : null}
            </AnimatePresence>
        </motion.aside>
    );
}
