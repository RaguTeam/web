import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {RouterProvider} from '@tanstack/react-router';
import {MotionConfig} from 'motion/react';
import {router} from './router.tsx';
import './app.css';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 60_000,
        },
    },
});

const container = document.getElementById('root');
if (!container) {
    throw new Error('#root is missing from index.html');
}

createRoot(container).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            {/* CSS handles transitions; this is what makes the JS animations honour the same preference. */}
            <MotionConfig reducedMotion="user">
                <RouterProvider router={router}/>
            </MotionConfig>
        </QueryClientProvider>
    </StrictMode>,
);
