import {useEffect, useMemo, useRef} from 'react';
import {useQuery} from '@tanstack/react-query';
import {AnimatePresence, motion} from 'motion/react';
import {queries} from '../api/queries.ts';
import {resetChat} from '../components/viewer/chat-store.ts';
import {buildModel, type GraphModel} from '../graph/model.ts';
import {useLayout} from '../graph/use-layout.ts';
import {EMPTY_SELECTION, patchScene, sceneStore, selectionStore} from '../graph/viewer-store.ts';
import {cn} from '../lib/cn.ts';
import {useLang, useT} from '../lib/i18n.ts';
import {useSettings} from '../lib/settings.ts';
import {GraphControls} from '../components/viewer/GraphControls.tsx';
import {DetailPanel} from '../components/viewer/DetailPanel.tsx';
import {ChatPanel} from '../components/viewer/ChatPanel.tsx';
import {Button, IslandSurface} from '../components/ui/primitives.tsx';

/**
 * Publishes the part of the viewport the panels have left over, so the camera
 * can frame that instead of the whole window. Measured through a resize
 * observer, which fires all the way through the panel animation — the cloud
 * slides out from under the chat as it opens rather than after it.
 */
function useStageRect(active: boolean) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!active || !ref.current) {
            patchScene({stage: null});
            return;
        }

        const element = ref.current;
        let frame = 0;

        const measure = () => {
            const rect = element.getBoundingClientRect();
            if (rect.width < 200 || rect.height < 160) {
                patchScene({stage: null});
                return;
            }
            const previous = sceneStore.get().stage;
            const moved =
                !previous ||
                Math.abs(previous.x - rect.x) > 0.5 ||
                Math.abs(previous.y - rect.y) > 0.5 ||
                Math.abs(previous.width - rect.width) > 0.5 ||
                Math.abs(previous.height - rect.height) > 0.5;
            if (moved) {
                patchScene({stage: {x: rect.x, y: rect.y, width: rect.width, height: rect.height}});
            }
        };

        const schedule = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(measure);
        };

        measure();
        const observer = new ResizeObserver(schedule);
        observer.observe(element);
        window.addEventListener('resize', schedule);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', schedule);
            cancelAnimationFrame(frame);
        };
    }, [active]);

    return ref;
}

/**
 * Waiting for a layout is not something to act on, so it is not dressed as
 * something to act on: no island, no bar to aim at. A small solid tumbles over
 * the empty stage and says what is happening.
 */
function CloudLoader({label, percent, quiet}: {label: string; percent?: number; quiet?: boolean}) {
    return (
        <div
            className={cn(
                'pointer-events-none flex items-center justify-center gap-3.5 text-text-3',
                quiet ? 'flex-row' : 'flex-col gap-4',
            )}
            style={{perspective: '320px'}}
        >
            <span className={cn('loader-solid', quiet && 'scale-[0.6]')} aria-hidden="true">
                <i/>
                <i/>
                <i/>
                <i/>
                <i/>
                <i/>
            </span>
            <span className="flex items-baseline gap-2" role="status" aria-live="polite">
                <span className="label-xs">{label}</span>
                {percent !== undefined ? (
                    <span className="label-xs tnum text-[10px] opacity-60">{percent}%</span>
                ) : null}
            </span>
        </div>
    );
}

export function DatasetView({datasetId}: {datasetId: string}) {
    const t = useT();
    const lang = useLang();
    const settings = useSettings();
    const scene = sceneStore.use();
    const selection = selectionStore.use();

    const graphQuery = useQuery(
        queries.graph(datasetId, {limit: settings.graphLimit, include_communities: true}),
    );
    const detailQuery = useQuery(queries.dataset(datasetId, lang));

    const model = useMemo(() => (graphQuery.data ? buildModel(graphQuery.data) : null), [graphQuery.data]);
    const {positions, progress} = useLayout(model);

    /*
     * The last cloud that was fully solved, kept so that asking for a bigger
     * slice shows the previous one going stale rather than dropping the stage
     * back to the placeholder. Model and positions are held as one pair: a new
     * model indexed against old positions is not a graph.
     */
    const solved = useRef<{id: string; model: GraphModel; positions: Float32Array} | null>(null);
    const ready = model !== null && positions !== null;
    if (ready) {
        solved.current = {id: datasetId, model, positions};
    }
    else if (solved.current && solved.current.id !== datasetId) {
        solved.current = null;
    }
    const shown = ready ? {model, positions} : solved.current;

    // Entering a corpus resets everything that belonged to the previous one.
    // The thread is cleared here rather than inside the chat panel, which mounts
    // late and would otherwise wipe a question queued by the entity card.
    useEffect(() => {
        selectionStore.set(EMPTY_SELECTION);
        resetChat(datasetId);
        patchScene({mode: 'graph', datasetId, graphVisible: true, chatVisible: false, stage: null});
        return () => {
            solved.current = null;
            patchScene({mode: 'ambient', datasetId: null, model: null, positions: null, progress: 0, stage: null});
        };
    }, [datasetId]);

    useEffect(() => {
        patchScene({model: shown?.model ?? null, positions: shown?.positions ?? null, progress});
    }, [shown?.model, shown?.positions, progress]);

    useEffect(() => {
        patchScene({loading: graphQuery.isFetching});
    }, [graphQuery.isFetching]);

    const chatOpen = scene.chatVisible;
    const graphOpen = scene.graphVisible;
    const solving = graphQuery.isPending || (model !== null && positions === null);
    // Nothing on the stage yet, versus a previous cloud still holding it.
    const cold = solving && shown === null;
    const warm = solving && shown !== null;
    const stageRef = useStageRect(graphOpen);

    // Fixed, so this page has no scrollbar of its own, and its panels would sit a
    // scrollbar's width right of the same chrome on a page that does have one.
    return (
        <div className="gutter-stable pointer-events-none fixed inset-0 z-20 flex flex-col">
            {/* The chrome measures itself; a hard-coded gap here would be wrong
                at every width where its islands wrap onto a second row. */}
            <div className="shrink-0" style={{height: 'calc(var(--chrome-h, 76px) + 1.75rem)'}} aria-hidden="true"/>

            <div className="mx-auto flex min-h-0 w-full max-w-[1680px] flex-1 flex-col gap-4 px-3 pb-4 sm:px-5 lg:flex-row">
                {graphOpen ? (
                    <div
                        // On a narrow screen the two panels cannot share the width, so the
                        // cloud keeps running behind the chat instead of beside it.
                        //
                        // Deliberately not a layout animation: animating this column's
                        // width squashes the controls island on the way and reflows its
                        // contents into a stack. The cloud's own framing carries the move.
                        className={cn('min-h-0 flex-1 flex-col', chatOpen ? 'hidden lg:flex' : 'flex')}
                    >
                        <GraphControls model={shown?.model ?? null} className="w-full max-w-[44rem] self-start"/>

                        <div ref={stageRef} className="relative flex min-h-0 flex-1 items-center justify-center">
                            <AnimatePresence mode="wait">
                                {graphQuery.isError ? (
                                    <motion.div
                                        key="error"
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        exit={{opacity: 0}}
                                        className="pointer-events-auto relative isolate rounded-island px-6 py-6 text-center"
                                    >
                                        <IslandSurface/>
                                        <p className="text-sm font-semibold text-text">{t.viewer.graphFailed}</p>
                                        <p className="mt-2 max-w-[36ch] text-xs text-text-2">{t.common.errorHint}</p>
                                        <Button className="mt-4" onClick={() => void graphQuery.refetch()}>
                                            {t.viewer.retry}
                                        </Button>
                                    </motion.div>
                                ) : cold ? (
                                    <motion.div
                                        key="cold"
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        exit={{opacity: 0}}
                                        transition={{duration: 0.4}}
                                    >
                                        <CloudLoader
                                            label={t.viewer.loadingGraph}
                                            percent={
                                                graphQuery.isPending ? undefined : Math.round(progress * 100)
                                            }
                                        />
                                    </motion.div>
                                ) : null}
                            </AnimatePresence>

                            {/* A cloud is already up, so the wait belongs out of its way. */}
                            <AnimatePresence>
                                {warm ? (
                                    <motion.div
                                        key="warm"
                                        initial={{opacity: 0}}
                                        animate={{opacity: 0.7}}
                                        exit={{opacity: 0}}
                                        transition={{duration: 0.4}}
                                        className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2"
                                    >
                                        <CloudLoader quiet label={t.viewer.loadingGraph}/>
                                    </motion.div>
                                ) : null}
                            </AnimatePresence>
                        </div>

                        <AnimatePresence mode="wait">
                            {chatOpen && selection.selectedNode ? (
                                <DetailPanel
                                    key="compact"
                                    datasetId={datasetId}
                                    model={shown?.model ?? null}
                                    nodeId={selection.selectedNode}
                                    compact
                                    className="w-full max-w-[44rem] self-start max-h-[42vh]"
                                />
                            ) : null}
                        </AnimatePresence>
                    </div>
                ) : null}

                <AnimatePresence mode="wait" initial={false}>
                    {chatOpen ? (
                        <ChatPanel
                            key="chat"
                            datasetId={datasetId}
                            className={cn('min-h-0 w-full', graphOpen ? 'lg:max-w-[34rem]' : 'mx-auto max-w-[54rem]')}
                        />
                    ) : (
                        <DetailPanel
                            key="detail"
                            datasetId={datasetId}
                            model={shown?.model ?? null}
                            nodeId={selection.selectedNode}
                            hint
                            waiting={cold}
                            className={cn(
                                'w-full lg:w-full lg:max-w-[24rem]',
                                selection.selectedNode && 'min-h-0 max-h-[52vh] lg:max-h-none',
                            )}
                        />
                    )}
                </AnimatePresence>
            </div>

            <span className="sr-only">{detailQuery.data?.description}</span>
        </div>
    );
}
