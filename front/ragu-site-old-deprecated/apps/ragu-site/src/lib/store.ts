import {useSyncExternalStore} from 'react';

export type Store<T> = {
    get(): T;
    set(next: T | ((prev: T) => T)): void;
    subscribe(listener: () => void): () => void;
    use(): T;
};

type Options<T> = {
    /** localStorage key. Omit for in-memory state. */
    key?: string;
    /** Narrow an unknown persisted value back to `T`, or return null to fall back to the default. */
    revive?: (raw: unknown) => T | null;
};

/**
 * A minimal external store. React Query owns server state; this owns the
 * handful of UI preferences that outlive a route.
 */
export function createStore<T>(initial: T, options: Options<T> = {}): Store<T> {
    const {key, revive} = options;
    const listeners = new Set<() => void>();
    let value = read();

    function read(): T {
        if (!key || typeof localStorage === 'undefined') {
            return initial;
        }
        try {
            const raw = localStorage.getItem(key);
            if (raw === null) {
                return initial;
            }
            const parsed: unknown = JSON.parse(raw);
            const revived = revive ? revive(parsed) : (parsed as T);
            return revived ?? initial;
        }
        catch {
            return initial;
        }
    }

    function write(next: T): void {
        if (!key || typeof localStorage === 'undefined') {
            return;
        }
        try {
            localStorage.setItem(key, JSON.stringify(next));
        }
        catch {
            /* Storage can be unavailable (private mode, blocked site data). Values stay in memory. */
        }
    }

    const store: Store<T> = {
        get: () => value,
        set(next) {
            const resolved = typeof next === 'function' ? (next as (prev: T) => T)(value) : next;
            if (Object.is(resolved, value)) {
                return;
            }
            value = resolved;
            write(value);
            for (const listener of listeners) {
                listener();
            }
        },
        subscribe(listener) {
            listeners.add(listener);
            return () => {
                listeners.delete(listener);
            };
        },
        use() {
            return useSyncExternalStore(store.subscribe, store.get, () => initial);
        },
    };

    return store;
}
