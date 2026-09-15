import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite';
import {viteSingleFile} from 'vite-plugin-singlefile';

// Declared locally so the browser app does not have to carry Node's globals.
declare const process: {env: Record<string, string | undefined>};

// `RAGU_BASE` lets the same build target a sub-path host (GitHub Pages: `/web/`).
const base = process.env.RAGU_BASE ?? '/';

export default defineConfig(({mode}) => {
    // A distributable build: every route, every chunk, every asset folded into
    // one index.html, so it can be handed over or opened straight off disk. Kept
    // behind its own mode rather than the default: the hosted deployment relies
    // on the lazy routes and the worker chunk staying separate files that load
    // only once the reader needs them.
    const singlefile = mode === 'singlefile';

    return {
        base: singlefile ? './' : base,
        plugins: [
            react(),
            tailwind(),
            ...(singlefile ? [viteSingleFile({removeViteModuleLoader: true})] : []),
        ],
        // The gateway's CORS allowlist names localhost:5173 explicitly — stay on it.
        server: {port: 5173, strictPort: true},
        preview: {port: 5174},
        build: {
            target: 'es2022',
            cssTarget: 'chrome111',
            // Otherwise an asset over the default 4kb threshold is still emitted as
            // its own file, which is exactly what a single-file build cannot have.
            assetsInlineLimit: singlefile ? Number.MAX_SAFE_INTEGER : undefined,
        },
    };
});
