import {useMemo, useState} from 'react';
import {Popover} from '@base-ui/react/popover';
import {AnimatePresence, motion} from 'motion/react';
import {cn} from '../../lib/cn.ts';
import {useLang, useT} from '../../lib/i18n.ts';
import {entityTypeName} from '../../lib/type-names.ts';
import type {GraphModel} from '../../graph/model.ts';
import {patchSelection, selectionStore, toggleCommunity, toggleType} from '../../graph/viewer-store.ts';
import {IconChevron, IconClose, IconSearch} from '../ui/icons.tsx';
import {IslandSurface} from '../ui/primitives.tsx';

const POPUP = 'pop-anim relative isolate w-[min(22rem,calc(100vw-2rem))] rounded-island p-1.5';

function FilterButton({label, count, children}: {label: string; count: number; children: React.ReactNode}) {
    return (
        <Popover.Root>
            <Popover.Trigger
                className={cn(
                    'relative isolate flex items-center gap-1.5 rounded-inset px-3 py-2.5 text-sm font-medium',
                    'transition-colors duration-200',
                    count > 0 ? 'text-accent' : 'text-text-2 hover:text-text',
                )}
            >
                {count > 0 ? (
                    <span aria-hidden="true" className="accent-pane"/>
                ) : (
                    <span
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 rounded-[inherit] border border-edge transition-colors duration-200"
                    />
                )}
                {label}
                {count > 0 ? <span className="font-mono text-xs tnum">{count}</span> : null}
                <IconChevron className="size-3.5 opacity-60"/>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Positioner sideOffset={10} align="start" className="z-40">
                    <Popover.Popup className={POPUP}>
                        <IslandSurface solid/>
                        {children}
                    </Popover.Popup>
                </Popover.Positioner>
            </Popover.Portal>
        </Popover.Root>
    );
}

function FacetList({
    items,
    selected,
    onToggle,
    onClear,
    clearLabel,
    rename,
}: {
    items: Array<{key: string; label: string; count: number}>;
    selected: string[];
    onToggle: (key: string) => void;
    onClear: () => void;
    clearLabel: string;
    rename?: (raw: string) => string;
}) {
    return (
        <>
            <div className="scroll-thin max-h-[min(24rem,50dvh)] overflow-y-auto p-1">
                <ul className="flex flex-col">
                    {items.map((item) => {
                        const active = selected.includes(item.key);
                        return (
                            <li key={item.key}>
                                <button
                                    type="button"
                                    onClick={() => onToggle(item.key)}
                                    aria-pressed={active}
                                    className={cn(
                                        'grid w-full grid-cols-[auto_1fr_auto] items-center gap-2.5 rounded-inset px-2.5 py-2 text-left',
                                        'transition-colors duration-150',
                                        active
                                            ? 'bg-accent-wash'
                                            : 'hover:bg-[color-mix(in_oklab,var(--text)_6%,transparent)]',
                                    )}
                                >
                                    <span
                                        className={cn(
                                            'size-2 rounded-[3px] transition-colors duration-150',
                                            active ? 'bg-accent' : 'bg-edge-strong',
                                        )}
                                    />
                                    <span
                                        className={cn('truncate text-sm', active ? 'font-medium text-accent' : 'text-text-2')}
                                    >
                                        {rename ? rename(item.label) : item.label}
                                    </span>
                                    <span className="font-mono text-xs tnum text-text-3">{item.count}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
            {selected.length > 0 ? (
                <button
                    type="button"
                    onClick={onClear}
                    className="mt-1 w-full rounded-inset px-2.5 py-2 text-sm font-medium text-text-3 transition-colors duration-200 hover:bg-accent-wash hover:text-accent"
                >
                    {clearLabel}
                </button>
            ) : null}
        </>
    );
}

export function GraphControls({model, className}: {model: GraphModel | null; className?: string}) {
    const t = useT();
    const lang = useLang();
    const selection = selectionStore.use();
    const [draft, setDraft] = useState(selection.search);

    const typeItems = useMemo(
        () => (model?.types ?? []).map((type) => ({key: type.name, label: type.name, count: type.count})),
        [model],
    );

    const communityItems = useMemo(
        () =>
            (model?.communities ?? [])
                .slice()
                .sort((a, b) => b.size - a.size)
                .slice(0, 60)
                .map((community) => ({key: community.id, label: community.title, count: community.size})),
        [model],
    );

    const matches = useMemo(() => {
        if (!model) {
            return 0;
        }
        const query = selection.search.trim().toLowerCase();
        const types = new Set(selection.types);
        const communities = new Set(selection.communities);
        if (!query && types.size === 0 && communities.size === 0) {
            return model.nodes.length;
        }
        let total = 0;
        for (const node of model.nodes) {
            if (query && !node.label.toLowerCase().includes(query)) continue;
            if (types.size > 0 && !types.has(node.entity_type)) continue;
            if (communities.size > 0 && !(node.community_id && communities.has(node.community_id))) continue;
            total += 1;
        }
        return total;
    }, [model, selection]);

    const filtering =
        selection.search.trim().length > 0 || selection.types.length > 0 || selection.communities.length > 0;

    return (
        <div className={cn('pointer-events-auto relative isolate rounded-island p-1.5', className)}>
            {/* The pane picks up the accent while a filter is live. Scaling it
                instead would read as the panel's padding growing. */}
            <IslandSurface
                className={cn(
                    'transition-[border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    filtering && 'border-accent-line/70',
                )}
            />

            <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex min-w-[13rem] flex-1 items-center">
                    <IconSearch className="pointer-events-none absolute left-3 text-text-3"/>
                    <input
                        value={draft}
                        onChange={(event) => {
                            setDraft(event.target.value);
                            patchSelection({search: event.target.value});
                        }}
                        placeholder={t.viewer.search}
                        aria-label={t.viewer.search}
                        className={cn(
                            'w-full rounded-inset border border-edge bg-surface/40 py-2.5 pr-10 pl-9 text-sm text-text',
                            'outline-none transition-colors duration-200 placeholder:text-text-3',
                            'focus:border-accent-line focus:bg-surface/70',
                        )}
                    />
                    {draft ? (
                        <button
                            type="button"
                            aria-label={t.viewer.clear}
                            onClick={() => {
                                setDraft('');
                                patchSelection({search: ''});
                            }}
                            className="stage-tool absolute right-1.5 size-7"
                        >
                            <IconClose className="size-4"/>
                        </button>
                    ) : null}
                </div>

                <FilterButton label={t.viewer.entityTypes} count={selection.types.length}>
                    <p className="label-xs px-3 pt-2 pb-1">{t.viewer.entityTypes}</p>
                    <FacetList
                        items={typeItems}
                        selected={selection.types}
                        onToggle={toggleType}
                        onClear={() => patchSelection({types: []})}
                        clearLabel={t.viewer.clear}
                        rename={(raw) => entityTypeName(raw, lang)}
                    />
                </FilterButton>

                {communityItems.length > 0 ? (
                    <FilterButton label={t.viewer.communities} count={selection.communities.length}>
                        <p className="label-xs px-3 pt-2 pb-1">{t.viewer.communities}</p>
                        <FacetList
                            items={communityItems}
                            selected={selection.communities}
                            onToggle={toggleCommunity}
                            onClear={() => patchSelection({communities: []})}
                            clearLabel={t.viewer.clear}
                        />
                    </FilterButton>
                ) : null}
            </div>

            <AnimatePresence initial={false}>
                {filtering ? (
                    <motion.p
                        initial={{height: 0, opacity: 0}}
                        animate={{height: 'auto', opacity: 1}}
                        exit={{height: 0, opacity: 0}}
                        transition={{duration: 0.28, ease: [0.22, 1, 0.36, 1]}}
                        className="label-xs overflow-hidden px-2"
                    >
                        <span className="flex flex-wrap items-center gap-x-2 pt-2.5">
                            {matches > 0 ? (
                                <span className="text-accent">{t.viewer.matches(matches)}</span>
                            ) : (
                                <span>
                                    {t.viewer.noMatches} — {t.viewer.noMatchesHint}
                                </span>
                            )}
                            <button
                                type="button"
                                onClick={() => {
                                    setDraft('');
                                    patchSelection({search: '', types: [], communities: [], highlight: []});
                                }}
                                className="underline decoration-edge-strong underline-offset-4 transition-colors duration-200 hover:text-accent"
                            >
                                {t.viewer.clearAll}
                            </button>
                        </span>
                    </motion.p>
                ) : null}
            </AnimatePresence>
        </div>
    );
}
