import {
    createRootRoute,
    createRoute,
    createRouter,
    createHashHistory,
} from '@tanstack/react-router';
import {Suspense, lazy} from 'react';
import {RootLayout} from './routes/root.tsx';
import {Home} from './routes/home.tsx';
import {NotFound} from './routes/not-found.tsx';

// The explorer pulls in the chat, the filter popovers and the graph model; the
// landing page should not pay for any of it.
const DatasetView = lazy(() => import('./routes/dataset.tsx').then((module) => ({default: module.DatasetView})));
const StackEntryView = lazy(() => import('./routes/stack.tsx').then((module) => ({default: module.StackEntryView})));

const rootRoute = createRootRoute({
    component: RootLayout,
    notFoundComponent: NotFound,
});

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Home,
});

const datasetRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/c/$datasetId',
    component: function DatasetRoute() {
        const {datasetId} = datasetRoute.useParams();
        return (
            <Suspense fallback={null}>
                <DatasetView datasetId={datasetId}/>
            </Suspense>
        );
    },
});

const stackRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/stack/$entryId',
    component: function StackRoute() {
        const {entryId} = stackRoute.useParams();
        return (
            <Suspense fallback={null}>
                <StackEntryView entryId={entryId}/>
            </Suspense>
        );
    },
});

const routeTree = rootRoute.addChildren([homeRoute, datasetRoute, stackRoute]);

/**
 * Hash history: this ships as a static bundle, and a static host has no
 * rewrite rule to hand `/c/medical` back to index.html.
 */
export const router = createRouter({
    routeTree,
    history: createHashHistory(),
    defaultPreload: 'intent',
    scrollRestoration: true,
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}
