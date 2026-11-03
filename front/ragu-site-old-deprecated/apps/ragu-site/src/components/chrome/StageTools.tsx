import {useState} from 'react';
import {Popover} from '@base-ui/react/popover';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {queries} from '../../api/queries.ts';
import {loadWholeGraph} from '../../api/whole-graph.ts';
import {cn} from '../../lib/cn.ts';
import {compact, compactBadge, full} from '../../lib/format.ts';
import {useLang, useT} from '../../lib/i18n.ts';
import {GRAPH_LIMIT_STEPS, patchSettings, useSettings} from '../../lib/settings.ts';
import {patchScene, patchSelection, sceneStore} from '../../graph/viewer-store.ts';
import {IconPlus, IconRecentre} from '../ui/icons.tsx';
import {IslandSurface} from '../ui/primitives.tsx';

const RAMP = 'linear-gradient(to right, color-mix(in oklab, var(--text-3) 45%, transparent), var(--accent))';

/** Beyond this the browser spends longer parsing JSON than the cloud is worth. */
const WHOLE_GRAPH_BUDGET = 12000;

/**
 * Cloud size and camera reset. Both are occasional, so they live in the chrome
 * as bare controls rather than holding a permanent panel over the scene.
 */
export function StageTools() {
    const t = useT();
    const lang = useLang();
    const scene = sceneStore.use();
    const settings = useSettings();
    const queryClient = useQueryClient();
    const [progress, setProgress] = useState(0);

    const meta = scene.model?.meta;
    const shown = meta?.returned_nodes ?? 0;
    const total = meta?.total_nodes ?? 0;
    const datasetId = scene.datasetId;

    const nextStep = GRAPH_LIMIT_STEPS.find((step) => step > settings.graphLimit);
    const beyondCap = total > shown && !nextStep;

    const whole = useMutation({
        mutationFn: async () => {
            if (!datasetId) {
                throw new Error('no corpus');
            }
            const key = queries.graph(datasetId, {
                limit: settings.graphLimit,
                include_communities: true,
            }).queryKey;
            const seed = queryClient.getQueryData(key);
            if (!seed) {
                throw new Error('nothing to extend');
            }
            setProgress(0);
            const result = await loadWholeGraph(datasetId, seed, {
                budget: WHOLE_GRAPH_BUDGET,
                onProgress: (step) => setProgress(step.ratio),
            });
            queryClient.setQueryData(key, result.graph);
            return result;
        },
    });

    // While a bigger slice is on the wire the numbers on screen are the previous
    // ones. Say so rather than resetting them to zero.
    const stale = scene.loading || whole.isPending;
    const clipped = whole.data?.clipped.length ?? 0;

    return (
        <div className="pointer-events-auto flex min-h-island items-stretch gap-1 p-1">
            <button
                type="button"
                aria-label={t.viewer.recentre}
                title={t.viewer.recentre}
                onClick={() => {
                    patchSelection({selectedNode: null, selectedEdge: null});
                    patchScene({resetToken: sceneStore.get().resetToken + 1});
                }}
                className="stage-tool w-10"
            >
                <IconRecentre/>
            </button>

            <Popover.Root>
                <Popover.Trigger
                    aria-label={t.viewer.stats}
                    title={t.viewer.stats}
                    className={cn(
                        // Sized for the widest number it will ever hold, which keeps it
                        // square rather than growing a tail in a wordier locale.
                        'stage-tool w-12 flex-col gap-[5px] px-1',
                        'data-[popup-open]:bg-[color-mix(in_oklab,var(--text)_7%,transparent)] data-[popup-open]:text-text',
                    )}
                >
                    <span className={cn('font-mono text-[11px] leading-none tnum text-text', stale && 'is-stale')}>
                        {shown ? compactBadge(shown) : '—'}
                    </span>
                    <span className="h-[3px] w-8 rounded-full" style={{background: RAMP}} aria-hidden="true"/>
                    <span className={cn('font-mono text-[9px] leading-none tnum text-text-3', stale && 'is-stale')}>
                        {total ? compactBadge(total) : '—'}
                    </span>
                </Popover.Trigger>

                <Popover.Portal>
                    <Popover.Positioner sideOffset={10} align="end" className="z-50">
                        <Popover.Popup className="pop-anim relative isolate w-[19rem] rounded-island p-1.5">
                            <IslandSurface solid/>
                            <div className="px-3 py-2.5">
                                <p className="label-xs">{t.viewer.stats}</p>

                                <dl className={cn('mt-4 flex items-end justify-between gap-4', stale && 'is-stale')}>
                                    <div>
                                        <dd className="font-mono text-2xl leading-none tnum text-accent">
                                            {full(shown, lang)}
                                        </dd>
                                        <dt className="label-xs mt-2">{t.viewer.statsShown}</dt>
                                    </div>
                                    <div className="text-right">
                                        <dd className="font-mono text-lg leading-none tnum text-text-2">
                                            {full(total, lang)}
                                        </dd>
                                        <dt className="label-xs mt-2">{t.viewer.statsTotal}</dt>
                                    </div>
                                </dl>

                                <div
                                    className="mt-4 h-1 w-full overflow-hidden rounded-full"
                                    style={{background: 'color-mix(in oklab, var(--text-3) 18%, transparent)'}}
                                >
                                    <div
                                        className="h-full rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                        style={{
                                            background: RAMP,
                                            width: `${total ? Math.max(3, Math.round((shown / total) * 100)) : 0}%`,
                                        }}
                                    />
                                </div>

                                <p className="mt-3 text-xs leading-relaxed text-text-3">{t.viewer.legendHint}</p>

                                {nextStep ? (
                                    <button
                                        type="button"
                                        disabled={stale}
                                        onClick={() => patchSettings({graphLimit: nextStep})}
                                        className={cn(
                                            'mt-4 flex w-full items-center justify-center gap-2 rounded-inset px-3 py-2.5',
                                            'text-sm font-semibold text-accent',
                                            'border border-accent-line/50 transition-colors duration-200 hover:bg-accent-wash',
                                            'disabled:pointer-events-none disabled:opacity-45',
                                        )}
                                    >
                                        <IconPlus className="size-4"/>
                                        {stale
                                            ? t.common.loading
                                            : t.viewer.loadMore(compact(nextStep - settings.graphLimit, lang))}
                                    </button>
                                ) : beyondCap ? (
                                    <>
                                        <button
                                            type="button"
                                            disabled={stale}
                                            onClick={() => whole.mutate()}
                                            className={cn(
                                                'mt-4 flex w-full items-center justify-center gap-2 rounded-inset px-3 py-2.5',
                                                'text-sm font-semibold text-accent',
                                                'border border-accent-line/50 transition-colors duration-200 hover:bg-accent-wash',
                                                'disabled:pointer-events-none disabled:opacity-45',
                                            )}
                                        >
                                            <IconPlus className="size-4"/>
                                            {whole.isPending
                                                ? t.viewer.loadingRest(String(Math.round(progress * 100)))
                                                : t.viewer.loadRest}
                                        </button>
                                        <p className="mt-3 text-[11px] leading-relaxed text-text-3">
                                            {t.viewer.pagingNote}
                                        </p>
                                        {whole.isError ? (
                                            <p className="mt-2 text-[11px] text-accent">{t.viewer.loadFailed}</p>
                                        ) : null}
                                        {clipped > 0 ? (
                                            <p className="mt-2 text-[11px] leading-relaxed text-text-3">
                                                {t.viewer.clippedNote(String(clipped))}
                                            </p>
                                        ) : null}
                                    </>
                                ) : (
                                    <p className="mt-4 text-xs leading-relaxed text-text-2">{t.viewer.atMax}</p>
                                )}
                            </div>
                        </Popover.Popup>
                    </Popover.Positioner>
                </Popover.Portal>
            </Popover.Root>
        </div>
    );
}
