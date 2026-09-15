import {useEffect} from 'react';
import {Link} from '@tanstack/react-router';
import {motion} from 'motion/react';
import {stack, stackEntry} from '../content/stack.ts';
import {patchScene} from '../graph/viewer-store.ts';
import {pageTitleStore} from '../lib/chrome-store.ts';
import {useLang, useT} from '../lib/i18n.ts';
import {Eyebrow, IslandSurface} from '../components/ui/primitives.tsx';
import {IconArrow} from '../components/ui/icons.tsx';
import {NotFound} from './not-found.tsx';

const REVEAL = {
    initial: {opacity: 0, y: 18},
    animate: {opacity: 1, y: 0},
    transition: {duration: 0.65, ease: [0.22, 1, 0.36, 1] as const},
};

export function StackEntryView({entryId}: {entryId: string}) {
    const lang = useLang();
    const t = useT();
    const entry = stackEntry(lang, entryId);
    const siblings = stack(lang).filter((item) => item.id !== entryId);

    useEffect(() => {
        patchScene({mode: 'ambient', datasetId: null, model: null, positions: null});
        pageTitleStore.set(entry?.name ?? null);
        return () => pageTitleStore.set(null);
    }, [entry?.name]);

    if (!entry) {
        return <NotFound/>;
    }

    return (
        <article className="mx-auto w-full max-w-[1680px] px-5 pt-32 pb-24 sm:px-8 lg:pt-40">
            <div className="grid grid-cols-12 gap-x-8 gap-y-12">
                <header className="col-span-12 lg:col-span-7">
                    <motion.div {...REVEAL}>
                        <Eyebrow className="text-accent">{entry.badge}</Eyebrow>
                        <h1 className="mt-5 font-display text-[length:var(--text-title)] leading-[1.02] font-light tracking-[-0.03em] text-text">
                            {entry.name}
                        </h1>
                        <p className="prose-measure mt-5 text-[1.0625rem] leading-[1.6] text-text-2">{entry.tagline}</p>
                    </motion.div>
                </header>

                <motion.aside
                    {...REVEAL}
                    transition={{...REVEAL.transition, delay: 0.1}}
                    className="relative isolate col-span-12 self-start rounded-island px-5 py-5 lg:col-span-4 lg:col-start-9"
                >
                    <IslandSurface/>
                    <dl className="flex flex-wrap gap-x-8 gap-y-5">
                        {entry.figure.map((figure) => (
                            <div key={figure.caption}>
                                <dd className="font-mono text-2xl leading-none tnum text-text">{figure.value}</dd>
                                <dt className="label-xs mt-2">{figure.caption}</dt>
                            </div>
                        ))}
                    </dl>
                    {entry.links.length > 0 ? (
                        <ul className="mt-6 flex flex-col gap-2.5 border-t border-edge pt-5">
                            {entry.links.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="group inline-flex items-center gap-2 text-sm text-text-2 transition-colors duration-200 hover:text-accent"
                                    >
                                        {link.label}
                                        <IconArrow className="size-4 -rotate-45 transition-transform duration-300 group-hover:translate-x-0.5"/>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </motion.aside>

                <motion.div
                    {...REVEAL}
                    transition={{...REVEAL.transition, delay: 0.16}}
                    className="col-span-12 lg:col-span-7"
                >
                    {entry.body.map((paragraph, index) => (
                        <p key={index} className="prose-measure mt-6 text-[0.975rem] leading-[1.75] text-text-2 first:mt-0">
                            {paragraph}
                        </p>
                    ))}
                </motion.div>

                <motion.ul
                    {...REVEAL}
                    transition={{...REVEAL.transition, delay: 0.22}}
                    className="col-span-12 flex flex-col divide-y divide-edge lg:col-span-4 lg:col-start-9"
                >
                    {entry.facts.map((fact, index) => (
                        <li key={index} className="flex gap-4 py-4 first:pt-0">
                            <span className="font-mono text-xs tnum text-accent">{String(index + 1).padStart(2, '0')}</span>
                            <p className="text-sm leading-relaxed text-text-2">{fact}</p>
                        </li>
                    ))}
                </motion.ul>
            </div>

            <nav aria-label={t.nav.technology} className="hairline-t mt-20 grid grid-cols-1 gap-4 pt-10 sm:grid-cols-3">
                {siblings.map((sibling) => (
                    <Link
                        key={sibling.id}
                        to="/stack/$entryId"
                        params={{entryId: sibling.id}}
                        className="group relative isolate rounded-island px-4 py-4 transition-colors duration-200"
                    >
                        <IslandSurface/>
                        <p className="label-xs">{sibling.badge}</p>
                        <p className="mt-2 flex items-center gap-2 font-display text-lg leading-none font-medium tracking-[-0.015em] text-text">
                            {sibling.name}
                            <IconArrow className="size-4 text-accent transition-transform duration-300 group-hover:translate-x-1"/>
                        </p>
                    </Link>
                ))}
            </nav>
        </article>
    );
}
