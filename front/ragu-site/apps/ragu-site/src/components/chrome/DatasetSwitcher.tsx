import {useState} from 'react';
import {Popover} from '@base-ui/react/popover';
import {Link} from '@tanstack/react-router';
import {useQuery} from '@tanstack/react-query';
import {queries} from '../../api/queries.ts';
import {useLang, useT} from '../../lib/i18n.ts';
import {compact} from '../../lib/format.ts';
import {cn} from '../../lib/cn.ts';
import {IslandSurface, Skeleton} from '../ui/primitives.tsx';

/**
 * On a corpus page the brand island grows a second half. Opening it drops a
 * panel the exact width of the island — the corpus list, not a generic menu.
 */
export function DatasetSwitcher({current}: {current: string}) {
    const lang = useLang();
    const t = useT();
    const [open, setOpen] = useState(false);
    const {data, isPending} = useQuery(queries.datasets(lang));

    const active = data?.find((item) => item.id === current);

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger
                aria-label={t.chrome.pickCorpus}
                className={cn(
                    'group flex min-w-0 max-w-[9.18rem] items-center gap-2 rounded-inset px-2.5 py-2 text-left',
                    'sm:max-w-none sm:min-w-[9.18rem]',
                    'transition-colors duration-200 hover:bg-accent-wash data-[popup-open]:bg-accent-wash',
                )}
            >
                {/* Takes the slack, so the chevron sits at the far edge of the
                    control rather than trailing whatever the corpus is called. */}
                <span className="min-w-0 flex-1">
                    <span className="label-xs block">{t.chrome.corpus}</span>
                    <span className="block truncate text-sm font-semibold text-text">
                        {active?.title ?? current}
                    </span>
                </span>
                <svg
                    viewBox="0 0 12 12"
                    className="size-3 shrink-0 text-text-3 transition-transform duration-300 group-data-[popup-open]:rotate-180"
                    aria-hidden="true"
                >
                    <path d="M2 4.5 L6 8.5 L10 4.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
            </Popover.Trigger>

            <Popover.Portal>
                <Popover.Positioner sideOffset={10} align="start" className="z-50">
                    <Popover.Popup
                        className={cn(
                            'pop-anim relative isolate w-[min(30rem,calc(100vw-2rem))] rounded-island p-1.5',
                        )}
                    >
                        <IslandSurface solid/>
                        <div className="px-3 pt-2 pb-1">
                            <p className="label-xs">{t.nav.datasets}</p>
                        </div>
                        <div className="flex flex-col gap-1 p-1">
                            {isPending
                                ? [0, 1, 2].map((key) => <Skeleton key={key} className="h-16 w-full"/>)
                                : data?.map((item) => (
                                      <Link
                                          key={item.id}
                                          to="/c/$datasetId"
                                          params={{datasetId: item.id}}
                                          onClick={() => setOpen(false)}
                                          className={cn(
                                              'group grid grid-cols-[1fr_auto] items-center gap-3 rounded-inset px-3 py-2.5',
                                              'transition-colors duration-200',
                                              item.id === current
                                                  ? 'bg-accent-wash'
                                                  : 'hover:bg-[color-mix(in_oklab,var(--text)_6%,transparent)]',
                                          )}
                                      >
                                          <span className="min-w-0">
                                              <span
                                                  className={cn(
                                                      'block truncate text-sm font-semibold',
                                                      item.id === current ? 'text-accent' : 'text-text',
                                                  )}
                                              >
                                                  {item.title}
                                              </span>
                                              <span className="block truncate text-xs text-text-3">{item.domain}</span>
                                          </span>
                                          <span className="label-xs tnum whitespace-nowrap">
                                              {compact(item.stats.nodes, lang)} · {compact(item.stats.edges, lang)}
                                          </span>
                                      </Link>
                                  ))}
                        </div>
                    </Popover.Popup>
                </Popover.Positioner>
            </Popover.Portal>
        </Popover.Root>
    );
}
