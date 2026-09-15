import {useCallback, useEffect, useRef, useState} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {Popover} from '@base-ui/react/popover';
import {motion} from 'motion/react';
import {api} from '../../api/client.ts';
import {queries} from '../../api/queries.ts';
import type {AgentRequest, AnswerTrace} from '../../api/types.ts';
import {cn} from '../../lib/cn.ts';
import {ms, wattHours} from '../../lib/format.ts';
import {useLang, useT} from '../../lib/i18n.ts';
import {relationTypeName} from '../../lib/type-names.ts';
import {useSettings} from '../../lib/settings.ts';
import {patchScene, patchSelection, sceneStore} from '../../graph/viewer-store.ts';
import {chatStore, nextId, parseCitations, patchChat, resetChat, type RefKind} from './chat-store.ts';
import {IconClose, IconInfo, IconSend, IconSources, IconStop, IconSweep} from '../ui/icons.tsx';
import {IslandSurface} from '../ui/primitives.tsx';
import {Disclosure} from '../ui/Disclosure.tsx';

/* ------------------------------------------------------------------ *
 * How the answer was produced — kept behind an icon, not in the flow.
 * ------------------------------------------------------------------ */
function MetaPopover({trace}: {trace: AnswerTrace}) {
    const t = useT();

    const rows: Array<[string, string]> = [
        [t.chat.traceEngine, trace.engine],
        [t.chat.traceTopK, String(trace.top_k)],
        [t.chat.traceRerank, trace.rerank ? t.settings.on : t.settings.off],
        [t.chat.traceRetrieval, ms(trace.timings.retrieval_ms)],
        [t.chat.traceGeneration, ms(trace.timings.generation_ms)],
        [t.chat.traceTotal, ms(trace.timings.total_ms)],
    ];

    return (
        <Popover.Root>
            <Popover.Trigger
                aria-label={t.chat.meta}
                title={t.chat.meta}
                className="stage-tool size-7 data-[popup-open]:text-accent"
            >
                <IconInfo className="size-4"/>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Positioner sideOffset={8} align="start" className="z-40">
                    <Popover.Popup className="pop-anim relative isolate w-[17rem] rounded-island p-1.5">
                        <IslandSurface solid/>
                        <div className="px-3 py-2.5">
                            <p className="label-xs">{t.chat.meta}</p>
                            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
                                {rows.map(([label, value]) => (
                                    <div key={label}>
                                        <dt className="label-xs text-[9.5px]">{label}</dt>
                                        <dd className="mt-1 font-mono text-xs tnum text-text-2">{value}</dd>
                                    </div>
                                ))}
                            </dl>
                            <div className="mt-3 flex items-baseline justify-between gap-3 border-t border-edge pt-3">
                                <span className="label-xs text-[9.5px]">{t.chat.traceEnergy}</span>
                                <span className="font-mono text-xs tnum text-accent">
                                    {wattHours(trace.energy.watt_hours)}
                                </span>
                            </div>
                            {trace.query_plan?.used && trace.query_plan.sub_questions?.length ? (
                                <div className="mt-3 border-t border-edge pt-3">
                                    <p className="label-xs text-[9.5px]">{t.chat.tracePlan}</p>
                                    <ol className="mt-2 flex flex-col gap-1.5">
                                        {trace.query_plan.sub_questions.map((question, index) => (
                                            <li key={index} className="text-xs leading-relaxed text-text-2">
                                                <span className="font-mono text-accent">{index + 1}.</span> {question}
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            ) : null}
                        </div>
                    </Popover.Popup>
                </Popover.Positioner>
            </Popover.Portal>
        </Popover.Root>
    );
}

/* ------------------------------------------------------------------ *
 * What the answer read.
 * ------------------------------------------------------------------ */
function Sources({trace}: {trace: AnswerTrace}) {
    const t = useT();
    const lang = useLang();

    const entities = trace.entities ?? [];
    const relations = trace.relations ?? [];
    const chunks = trace.chunks ?? [];
    const communities = trace.communities ?? [];
    const total = entities.length + relations.length + chunks.length + communities.length;

    return (
        <Disclosure
            className="mt-4 -mr-1 -ml-2"
            label={t.chat.sources}
            count={total > 0 ? total : undefined}
            hint={t.chat.sourcesHint}
            icon={<IconSources className="size-4"/>}
            actions={<MetaPopover trace={trace}/>}
        >
            <div className="flex flex-col gap-4">
                {entities.length > 0 ? (
                    <div>
                        <p className="label-xs text-[9.5px]">{t.chat.traceEntities}</p>
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                            {entities.slice(0, 24).map((entity) => (
                                <li key={entity.id}>
                                    <button
                                        type="button"
                                        onClick={() => patchSelection({selectedNode: entity.id, selectedEdge: null})}
                                        className="rounded-chip border border-accent-line/40 px-2 py-1 text-xs text-accent transition-colors duration-200 hover:bg-accent-wash"
                                    >
                                        {entity.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : null}

                {relations.length > 0 ? (
                    <div>
                        <p className="label-xs text-[9.5px]">{t.chat.traceRelations}</p>
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                            {relations.slice(0, 16).map((relation) => (
                                <li
                                    key={relation.id}
                                    className="rounded-chip border border-edge px-2 py-1 font-mono text-[0.68rem] text-text-3"
                                >
                                    {relationTypeName(relation.relation_type, lang)}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : null}

                {chunks.length > 0 ? (
                    <div>
                        <p className="label-xs text-[9.5px]">{t.chat.traceChunks}</p>
                        <ul className="mt-2 flex flex-col gap-2">
                            {chunks.slice(0, 5).map((chunk) => (
                                <li key={chunk.id} className="rounded-inset border border-edge bg-surface/35 px-3 py-2.5">
                                    <p className="text-xs leading-relaxed text-text-2">
                                        {chunk.content.slice(0, 260)}
                                        {chunk.content.length > 260 ? '…' : ''}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : null}

                {total === 0 ? <p className="text-xs text-text-3">{t.chat.noSources}</p> : null}
            </div>
        </Disclosure>
    );
}

/* ------------------------------------------------------------------ *
 * The answer itself
 * ------------------------------------------------------------------ */
function Answer({content}: {content: string}) {
    const t = useT();
    const lang = useLang();
    const model = sceneStore.use().model;

    const resolve = useCallback(
        (id: string, type: RefKind): string | undefined => {
            if (!model) {
                return undefined;
            }
            if (type === 'entity') {
                const index = model.indexOf.get(id);
                return index === undefined ? undefined : model.nodes[index].label;
            }
            if (type === 'relation') {
                const index = model.edgeIndexOf.get(id);
                return index === undefined ? undefined : relationTypeName(model.edges[index].relation_type, lang);
            }
            return undefined;
        },
        [model, lang],
    );

    const segments = parseCitations(content, resolve);

    return (
        <div className="text-[0.9375rem] leading-[1.75] whitespace-pre-wrap text-text">
            {segments.map((segment, index) =>
                segment.kind === 'text' ? (
                    <span key={index}>{segment.value}</span>
                ) : segment.kind === 'strong' ? (
                    <strong key={index} className="font-semibold text-text">
                        {segment.value}
                    </strong>
                ) : segment.type === 'entity' ? (
                    <button
                        key={index}
                        type="button"
                        data-ref={segment.id}
                        title={t.chat.citation}
                        onClick={() => patchSelection({selectedNode: segment.id, selectedEdge: null})}
                        className="ref"
                    >
                        {segment.text}
                    </button>
                ) : (
                    <span key={index} data-ref={segment.id} className="ref ref--muted">
                        {segment.text}
                    </span>
                ),
            )}
        </div>
    );
}

function Pending({startedAt}: {startedAt: number | null}) {
    const t = useT();
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (!startedAt) {
            return;
        }
        const id = window.setInterval(() => setSeconds(Math.floor((Date.now() - startedAt) / 1000)), 250);
        return () => window.clearInterval(id);
    }, [startedAt]);

    return (
        <div className="rounded-inset border border-edge bg-surface/40 px-4 py-4">
            <div className="flex items-center gap-2.5">
                <span className="relative flex size-2">
                    <span className="absolute inline-flex size-2 animate-ping rounded-full bg-accent opacity-60"/>
                    <span className="relative inline-flex size-2 rounded-full bg-accent"/>
                </span>
                <p className="text-sm font-medium text-text">{t.chat.thinking}</p>
                <span className="label-xs tnum ml-auto">{t.chat.elapsed(String(seconds))}</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-text-3">{t.chat.thinkingHint}</p>
            <div className="mt-3 flex flex-col gap-2">
                <div className="shimmer h-2 w-full rounded-full bg-edge/50"/>
                <div className="shimmer h-2 w-[82%] rounded-full bg-edge/50"/>
                <div className="shimmer h-2 w-[64%] rounded-full bg-edge/50"/>
            </div>
        </div>
    );
}

export function ChatPanel({datasetId, className}: {datasetId: string; className?: string}) {
    const t = useT();
    const lang = useLang();
    const settings = useSettings();
    const chat = chatStore.use();
    const [draft, setDraft] = useState('');
    const abortRef = useRef<AbortController | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const {data: suggestions} = useQuery(queries.suggestions(datasetId, lang));

    const mutation = useMutation({
        mutationFn: async (message: string) => {
            const controller = new AbortController();
            abortRef.current = controller;
            const history = chatStore
                .get()
                .entries.slice(-8)
                .map((entry) => ({role: entry.role, content: entry.content}));

            const body: AgentRequest = {
                message,
                history,
                engine: settings.useGraph ? 'mix' : 'naive',
                use_query_plan: settings.queryPlan,
                top_k: settings.topK,
                rerank: settings.rerank,
                include_trace: true,
                locale: lang,
            };
            return api.ask(datasetId, body, controller.signal);
        },
        onSuccess: (response) => {
            const message = response.message;
            patchChat({
                pending: false,
                startedAt: null,
                error: null,
                entries: [
                    ...chatStore.get().entries,
                    // The gateway can hand back the same message id twice, so the
                    // thread keys on its own counter rather than that id.
                    {id: nextId('assistant'), role: 'assistant', content: message.content, trace: message.trace ?? null},
                ],
            });
            patchSelection({highlight: message.trace?.highlight?.node_ids ?? []});
        },
        onError: (error: unknown) => {
            const aborted = error instanceof DOMException && error.name === 'AbortError';
            patchChat({pending: false, startedAt: null, error: aborted ? null : t.chat.failed});
        },
    });

    const send = useCallback(
        (text: string) => {
            const trimmed = text.trim();
            if (!trimmed || chatStore.get().pending) {
                return;
            }
            patchChat({
                entries: [...chatStore.get().entries, {id: nextId('user'), role: 'user', content: trimmed}],
                pending: true,
                error: null,
                startedAt: Date.now(),
                queued: null,
            });
            setDraft('');
            mutation.mutate(trimmed);
        },
        [mutation],
    );

    // Questions handed over from the entity card arrive through the store.
    useEffect(() => {
        if (chat.queued && !chat.pending) {
            send(chat.queued);
        }
    }, [chat.queued, chat.pending, send]);

    useEffect(() => {
        scrollRef.current?.scrollTo({top: scrollRef.current.scrollHeight, behavior: 'smooth'});
    }, [chat.entries.length, chat.pending]);

    const stop = () => {
        abortRef.current?.abort();
        patchChat({pending: false, startedAt: null});
    };

    const starters = suggestions?.suggestions ?? [];

    return (
        <motion.section
            layout
            initial={{opacity: 0, x: 40}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: 40}}
            transition={{type: 'spring', stiffness: 260, damping: 32, mass: 0.8}}
            className={cn('pointer-events-auto relative isolate flex min-h-0 flex-col rounded-island p-1.5', className)}
            aria-label={t.viewer.chat}
        >
            <IslandSurface/>

            <header className="flex items-center justify-between gap-3 px-3 pt-2 pb-3">
                <p className="label-xs">{t.viewer.chat}</p>
                <div className="flex items-center gap-0.5">
                    <span className="label-xs mr-1">{settings.useGraph ? 'mix' : 'naive'}</span>
                    {chat.entries.length > 0 ? (
                        <button
                            type="button"
                            onClick={() => resetChat(datasetId)}
                            aria-label={t.chat.clearThread}
                            title={t.chat.clearThread}
                            className="stage-tool size-8"
                        >
                            <IconSweep className="size-4"/>
                        </button>
                    ) : null}
                    {/* Closing the panel and clearing the thread are different intentions. */}
                    <button
                        type="button"
                        onClick={() => patchScene({chatVisible: false})}
                        aria-label={t.chat.hidePanel}
                        title={t.chat.hidePanel}
                        className="stage-tool size-8"
                    >
                        <IconClose className="size-4"/>
                    </button>
                </div>
            </header>

            <div ref={scrollRef} className="scroll-thin flex-1 overflow-y-auto px-3 pb-2">
                {chat.entries.length === 0 && !chat.pending ? (
                    <div className="flex h-full flex-col justify-end pb-2">
                        <p className="text-sm font-medium text-text">{t.chat.empty}</p>
                        <p className="mt-1.5 text-xs text-text-3">{t.chat.emptyHint}</p>
                    </div>
                ) : (
                    <ol className="flex flex-col gap-5 py-2">
                        {chat.entries.map((entry) =>
                            entry.role === 'user' ? (
                                <li key={entry.id} className="flex justify-end">
                                    <p className="max-w-[85%] rounded-inset rounded-br-[6px] bg-accent px-4 py-2.5 text-[0.9375rem] leading-relaxed text-accent-ink">
                                        {entry.content}
                                    </p>
                                </li>
                            ) : (
                                <li key={entry.id}>
                                    <p className="label-xs mb-2">{t.chat.agent}</p>
                                    <Answer content={entry.content}/>
                                    {entry.trace ? <Sources trace={entry.trace}/> : null}
                                </li>
                            ),
                        )}
                        {chat.pending ? (
                            <li>
                                <Pending startedAt={chat.startedAt}/>
                            </li>
                        ) : null}
                        {chat.error ? (
                            <li className="rounded-inset border border-accent-line bg-accent-wash px-4 py-3">
                                <p className="text-sm font-medium text-accent">{chat.error}</p>
                                <p className="mt-1 text-xs text-text-2">{t.common.errorHint}</p>
                            </li>
                        ) : null}
                    </ol>
                )}
            </div>

            {starters.length > 0 && chat.entries.length === 0 ? (
                <ul className="flex flex-wrap gap-1.5 px-3 pb-3">
                    {starters.slice(0, 3).map((question) => (
                        <li key={question}>
                            <button
                                type="button"
                                onClick={() => send(question)}
                                className="rounded-inset border border-edge px-3 py-2 text-left text-xs leading-snug text-text-2 transition-colors duration-200 hover:border-accent-line hover:bg-accent-wash hover:text-text"
                            >
                                {question}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : null}

            <form
                className="flex items-end gap-2 rounded-inset border border-edge bg-surface/50 p-1.5"
                onSubmit={(event) => {
                    event.preventDefault();
                    send(draft);
                }}
            >
                <textarea
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' && !event.shiftKey) {
                            event.preventDefault();
                            send(draft);
                        }
                    }}
                    rows={1}
                    placeholder={t.chat.placeholder}
                    aria-label={t.chat.placeholder}
                    className="scroll-thin max-h-32 min-h-10 flex-1 resize-none bg-transparent px-2.5 py-2 text-[0.9375rem] leading-relaxed text-text outline-none placeholder:text-text-3"
                />
                {chat.pending ? (
                    <button
                        type="button"
                        onClick={stop}
                        aria-label={t.chat.stop}
                        className="flex size-10 shrink-0 items-center justify-center rounded-[11px] border border-edge-strong text-text-2 transition-colors duration-200 hover:border-accent-line hover:text-accent"
                    >
                        <IconStop/>
                    </button>
                ) : (
                    <button
                        type="submit"
                        disabled={draft.trim().length === 0}
                        aria-label={t.chat.send}
                        className={cn(
                            'flex size-10 shrink-0 items-center justify-center rounded-[11px] transition-all duration-200',
                            'bg-accent text-accent-ink hover:bg-accent-hover active:translate-y-px',
                            'disabled:pointer-events-none disabled:opacity-40',
                        )}
                    >
                        <IconSend/>
                    </button>
                )}
            </form>
        </motion.section>
    );
}
