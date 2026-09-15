import {useEffect, useRef, useState} from 'react';
import {Link, useRouterState} from '@tanstack/react-router';
import {useQuery} from '@tanstack/react-query';
import {AnimatePresence, motion} from 'motion/react';
import {cn} from '../../lib/cn.ts';
import {useLang, useT} from '../../lib/i18n.ts';
import {queries} from '../../api/queries.ts';
import {patchScene, sceneStore} from '../../graph/viewer-store.ts';
import {Mark} from '../ui/Mark.tsx';
import {IslandSurface} from '../ui/primitives.tsx';
import {ControlIsland} from './ControlIsland.tsx';
import {DatasetSwitcher} from './DatasetSwitcher.tsx';
import {StageTools} from './StageTools.tsx';
import {IconChat, IconGraph} from '../ui/icons.tsx';
import {pageTitleStore} from '../../lib/chrome-store.ts';

const SPRING = {type: 'spring', stiffness: 320, damping: 34, mass: 0.7} as const;

/** Every island in the chrome is this tall, whatever it happens to hold. */
export const ISLAND = 'min-h-island items-stretch p-1';

function useScrolled(threshold = 12): boolean {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > threshold);
        onScroll();
        window.addEventListener('scroll', onScroll, {passive: true});
        return () => window.removeEventListener('scroll', onScroll);
    }, [threshold]);
    return scrolled;
}

/**
 * Publishes the chrome's real height as `--chrome-h`.
 *
 * The islands wrap onto a second row below the desktop breakpoint, so a
 * hard-coded gap under the header is wrong at exactly the widths where it
 * matters: the centre island lands on top of the page's own controls. Measured,
 * it cannot drift out of step with the layout again.
 */
function useChromeHeight(ref: React.RefObject<HTMLElement | null>): void {
    useEffect(() => {
        const element = ref.current;
        if (!element) {
            return;
        }
        const publish = () => {
            const height = Math.round(element.getBoundingClientRect().height);
            document.documentElement.style.setProperty('--chrome-h', `${height}px`);
        };
        publish();
        const observer = new ResizeObserver(publish);
        observer.observe(element);
        return () => observer.disconnect();
    }, [ref]);
}

function BrandIsland({datasetId}: {datasetId: string | null}) {
    const t = useT();

    return (
        <div className={cn('pointer-events-auto relative isolate flex min-w-0 rounded-island', ISLAND)}>
            <IslandSurface/>
            <Link
                to="/"
                aria-label={t.nav.home}
                className="group flex shrink-0 items-center gap-2.5 rounded-inset px-2 transition-colors duration-200 hover:bg-accent-wash"
            >
                <Mark size={30} className="shrink-0 rounded-[9px]"/>
                {/* On a corpus page at phone width the switcher needs the room more than the wordmark does. */}
                <span className={cn('pr-1', datasetId && 'hidden sm:block')}>
                    <span className="block font-display text-[1.05rem] leading-none font-medium tracking-[-0.01em] text-text">
                        RAGU
                    </span>
                    <span className="label-xs mt-1 hidden text-[9.5px] sm:block">graph rag</span>
                </span>
            </Link>

            <AnimatePresence initial={false}>
                {datasetId ? (
                    <motion.div
                        key="switcher"
                        initial={{opacity: 0, width: 0}}
                        animate={{opacity: 1, width: 'auto'}}
                        exit={{opacity: 0, width: 0}}
                        transition={SPRING}
                        className="flex items-center overflow-hidden"
                    >
                        <span className="mx-1.5 h-8 w-px shrink-0 self-center bg-edge" aria-hidden="true"/>
                        <DatasetSwitcher current={datasetId}/>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
}

const HOME_LINKS = [
    {hash: 'pipeline', key: 'overview' as const},
    {hash: 'corpora', key: 'datasets' as const},
    {hash: 'stack', key: 'technology' as const},
];

function HomeLinks() {
    const t = useT();
    return (
        <nav className="flex items-stretch gap-1 whitespace-nowrap">
            {HOME_LINKS.map((link) => (
                <a
                    key={link.hash}
                    href={`#${link.hash}`}
                    className="flex items-center rounded-inset px-4 text-sm font-medium text-text-2 transition-colors duration-200 hover:bg-accent-wash hover:text-text"
                >
                    {t.nav[link.key]}
                </a>
            ))}
        </nav>
    );
}

function StackTitle() {
    const t = useT();
    const title = pageTitleStore.use();
    return (
        <div className="flex items-center gap-3 px-3 whitespace-nowrap">
            <Link to="/" className="label-xs flex items-center transition-colors duration-200 hover:text-accent">
                ← {t.nav.home}
            </Link>
            <span className="my-2 w-px bg-edge" aria-hidden="true"/>
            <span className="flex items-center text-sm font-semibold text-text">
                {title ?? t.nav.technology}
            </span>
        </div>
    );
}

/**
 * Active state is a pane of tinted glass laid over the control, not a border
 * plus a wash: the border lives on that pane, so switching states never
 * changes the button's own box and nothing shifts sideways.
 *
 * The pane casts its shadow downwards, which optically eats the gap under the
 * button. A pixel of bottom margin hands that gap back.
 */
function ViewToggle({
    active,
    onClick,
    label,
    icon,
}: {
    active: boolean;
    onClick: () => void;
    label: string;
    icon: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={cn(
                'relative isolate mb-px flex items-center gap-2 rounded-inset px-3.5 text-sm font-medium',
                'transition-colors duration-200',
                active
                    ? 'text-accent'
                    : 'text-text-3 hover:bg-[color-mix(in_oklab,var(--text)_6%,transparent)] hover:text-text',
            )}
        >
            <motion.span
                aria-hidden="true"
                className="accent-pane"
                initial={false}
                animate={{opacity: active ? 1 : 0, scale: active ? 1 : 0.92}}
                transition={SPRING}
            />
            {icon}
            {label}
        </button>
    );
}

/**
 * Two toggles and nothing else. The corpus is named by the switcher a few
 * pixels to the left; printing it here as well only made the island wide
 * enough to collide with its neighbours.
 */
function DatasetToggles({datasetId}: {datasetId: string | null}) {
    const t = useT();
    const lang = useLang();
    const scene = sceneStore.use();
    const {data} = useQuery({...queries.dataset(datasetId ?? '', lang), enabled: datasetId !== null});

    const toggle = (key: 'graphVisible' | 'chatVisible') => {
        const next = !scene[key];
        const other = key === 'graphVisible' ? scene.chatVisible : scene.graphVisible;
        // Never leave the stage empty.
        if (!next && !other) {
            return;
        }
        patchScene({[key]: next});
    };

    return (
        <div className="flex items-stretch gap-1 whitespace-nowrap">
            {/* The page still needs a heading; it just does not need to be read twice. */}
            {datasetId ? <h1 className="sr-only">{data?.title ?? datasetId}</h1> : null}
            <ViewToggle
                active={scene.graphVisible}
                onClick={() => toggle('graphVisible')}
                label={t.viewer.graph}
                icon={<IconGraph/>}
            />
            <ViewToggle
                active={scene.chatVisible}
                onClick={() => toggle('chatVisible')}
                label={t.viewer.chat}
                icon={<IconChat/>}
            />
        </div>
    );
}

type CentreKind = 'home' | 'dataset' | 'stack';

/**
 * One pane of the centre island. Every pane is mounted on every route and the
 * ones that are not the current page are collapsed to nothing, which is what
 * lets the island morph: it is a flex row, so its width is the sum of its
 * panes, and one shrinking to zero while another grows adds up to a single
 * width travelling smoothly from one to the other.
 *
 * Nothing here is measured or written down. The panes size themselves, which is
 * what keeps the morph honest when the language — and with it every label
 * inside them — changes.
 */
function CentrePane({active, children}: {active: boolean; children: React.ReactNode}) {
    return (
        <div className="centre-pane flex shrink-0 items-stretch" data-active={active ? '' : undefined} inert={!active}>
            {children}
        </div>
    );
}

function CentreIsland({datasetId, isStackPage}: {datasetId: string | null; isStackPage: boolean}) {
    const kind: CentreKind = datasetId ? 'dataset' : isStackPage ? 'stack' : 'home';

    return (
        <div
            className={cn(
                'pointer-events-auto relative isolate flex rounded-island',
                ISLAND,
                // Below the breakpoint the home links have nowhere to go, and an
                // island holding nothing is just a dot.
                kind === 'home' && 'hidden md:flex',
            )}
        >
            <IslandSurface/>
            <CentrePane active={kind === 'home'}>
                <HomeLinks/>
            </CentrePane>
            <CentrePane active={kind === 'stack'}>
                <StackTitle/>
            </CentrePane>
            <CentrePane active={kind === 'dataset'}>
                <DatasetToggles datasetId={datasetId}/>
            </CentrePane>
        </div>
    );
}

export function TopChrome() {
    const pathname = useRouterState({select: (state) => state.location.pathname});
    const scrolled = useScrolled();
    const headerRef = useRef<HTMLElement>(null);
    useChromeHeight(headerRef);

    const datasetMatch = /^\/c\/([^/]+)/.exec(pathname);
    const isStackPage = pathname.startsWith('/stack');
    const datasetId = datasetMatch ? decodeURIComponent(datasetMatch[1]) : null;

    return (
        <header
            ref={headerRef}
            className={cn(
                'pointer-events-none sticky top-0 z-30',
                'transition-[padding-top] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                // The corpus page is fixed and has no scrollbar; without a stand-in
                // for it the chrome would sit further right there than anywhere else.
                datasetId && 'gutter-stable',
                scrolled ? 'pt-2.5' : 'pt-4',
            )}
        >
            <div className="relative mx-auto flex w-full max-w-[1680px] flex-wrap items-start gap-2 px-3 sm:gap-3 sm:px-5">
                <BrandIsland datasetId={datasetId}/>

                <div className="ml-auto flex items-start gap-2 sm:gap-3">
                    {datasetId ? <StageTools/> : null}
                    <ControlIsland/>
                </div>

                {/*
                  Pinned to the middle of the viewport rather than laid out
                  between its neighbours, so it sits in the same place on every
                  route no matter how wide the brand island has grown. Below the
                  breakpoint there is no room for that and it takes its own row,
                  which the measured `--chrome-h` accounts for.
                */}
                <div
                    className={cn(
                        'order-last mt-2 flex w-full justify-center',
                        'lg:absolute lg:top-0 lg:left-1/2 lg:order-none lg:mt-0 lg:w-auto lg:-translate-x-1/2',
                    )}
                >
                    <CentreIsland datasetId={datasetId} isStackPage={isStackPage}/>
                </div>
            </div>
        </header>
    );
}
