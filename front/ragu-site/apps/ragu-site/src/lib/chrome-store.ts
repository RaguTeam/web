import {createStore} from './store.ts';

/** Static pages hand the top chrome a title so it does not have to parse the URL. */
export const pageTitleStore = createStore<string | null>(null);
