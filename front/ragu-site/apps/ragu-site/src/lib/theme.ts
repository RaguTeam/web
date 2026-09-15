import {useEffect, useState} from 'react';
import {createStore} from './store.ts';

export type ThemeChoice = 'light' | 'dark' | 'system';
export type Resolved = 'light' | 'dark';

export const themeStore = createStore<ThemeChoice>('system', {
    key: 'ragu.theme',
    revive: (raw) => (raw === 'light' || raw === 'dark' || raw === 'system' ? raw : null),
});

const media = typeof matchMedia === 'function' ? matchMedia('(prefers-color-scheme: dark)') : null;

export function resolve(choice: ThemeChoice): Resolved {
    if (choice !== 'system') {
        return choice;
    }
    return media?.matches ? 'dark' : 'light';
}

function apply(): void {
    document.documentElement.dataset.theme = resolve(themeStore.get());
}

// The inline bootstrap in index.html stamps the first value; this keeps the
// attribute honest if that script was blocked, and follows every change after.
apply();
themeStore.subscribe(apply);
media?.addEventListener('change', apply);

/**
 * The 3D scene needs to know the *resolved* theme, not the choice, because
 * "system" flips underneath it.
 */
export function useTheme(): {choice: ThemeChoice; resolved: Resolved; set(next: ThemeChoice): void} {
    const choice = themeStore.use();
    const [resolved, setResolved] = useState<Resolved>(() => resolve(choice));

    useEffect(() => {
        const sync = () => setResolved(resolve(themeStore.get()));
        sync();
        const off = themeStore.subscribe(sync);
        media?.addEventListener('change', sync);
        return () => {
            off();
            media?.removeEventListener('change', sync);
        };
    }, [choice]);

    return {choice, resolved, set: themeStore.set};
}
