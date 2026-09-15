import {Suspense, lazy, useLayoutEffect} from 'react';
import {Outlet} from '@tanstack/react-router';
import {Backdrop} from '../components/Backdrop.tsx';
import {TopChrome} from '../components/chrome/TopChrome.tsx';
import {useT} from '../lib/i18n.ts';

// three.js is the heaviest thing on the page and nothing above the fold needs
// it, so the scene arrives in its own chunk after first paint.
const Stage = lazy(() => import('../graph/Stage.tsx').then((module) => ({default: module.Stage})));

/**
 * Publishes the width of this browser's scrollbar as `--scrollbar-w`.
 *
 * Nothing can read it off the page: the corpus view is fixed and never scrolls,
 * so on that route the measurement it would take is zero — which is exactly the
 * route that needs the number. A throwaway scrolling box gives the real one.
 * Overlay scrollbars measure zero, which is the right answer there.
 */
function useScrollbarWidth(): void {
    useLayoutEffect(() => {
        const measure = () => {
            const probe = document.createElement('div');
            probe.style.cssText =
                'position:absolute;top:-9999px;width:100px;height:100px;overflow:scroll;visibility:hidden';
            document.body.appendChild(probe);
            const width = probe.offsetWidth - probe.clientWidth;
            probe.remove();
            document.documentElement.style.setProperty('--scrollbar-w', `${width}px`);
        };
        measure();
        // A zoom change resizes it, and a zoom change is a resize.
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);
}

export function RootLayout() {
    const t = useT();
    useScrollbarWidth();

    return (
        <>
            <a
                href="#main"
                className="sr-only z-50 focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:rounded-control focus:bg-accent focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-accent-ink"
            >
                {t.chrome.skipToContent}
            </a>

            <Backdrop/>
            <Suspense fallback={null}>
                <Stage/>
            </Suspense>
            <TopChrome/>

            <main id="main" className="relative z-20">
                <Outlet/>
            </main>
        </>
    );
}
