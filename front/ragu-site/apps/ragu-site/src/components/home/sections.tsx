import {Link} from '@tanstack/react-router';
import {useQuery} from '@tanstack/react-query';
import {motion} from 'motion/react';
import type {DatasetCard} from '../../api/types.ts';
import {queries} from '../../api/queries.ts';
import {compact} from '../../lib/format.ts';
import {useLang, useT} from '../../lib/i18n.ts';
import {cn} from '../../lib/cn.ts';
import {pipeline} from '../../content/pipeline.ts';
import {stack} from '../../content/stack.ts';
import {Chip, Eyebrow, IslandSurface, Lede, SectionTitle, Skeleton} from '../ui/primitives.tsx';
import {IconArrow} from '../ui/icons.tsx';
import {Constellation} from './Constellation.tsx';

const REVEAL = {
    initial: {opacity: 0, y: 22},
    whileInView: {opacity: 1, y: 0},
    viewport: {once: true, margin: '-12% 0px'},
    transition: {duration: 0.7, ease: [0.22, 1, 0.36, 1] as const},
};

function SectionHead({eyebrow, title, lede}: {eyebrow: string; title: string; lede: string}) {
    return (
        <motion.div {...REVEAL} className="max-w-[52rem]">
            <Eyebrow className="text-accent">{eyebrow}</Eyebrow>
            <SectionTitle className="mt-4">{title}</SectionTitle>
            <Lede className="mt-4">{lede}</Lede>
        </motion.div>
    );
}

/* ------------------------------------------------------------------ *
 * Pipeline — a rail, not four equal cards.
 * ------------------------------------------------------------------ */
export function Pipeline() {
    const t = useT();
    const lang = useLang();
    const steps = pipeline(lang);

    return (
        <section id="pipeline" className="mx-auto w-full max-w-[1680px] scroll-mt-28 px-5 py-24 sm:px-8">
            <SectionHead eyebrow="pipeline" title={t.home.pipelineTitle} lede={t.home.pipelineLede}/>

            <ol className="mt-14 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
                {steps.map((step, index) => (
                    <motion.li
                        key={step.ordinal}
                        {...REVEAL}
                        transition={{...REVEAL.transition, delay: index * 0.07}}
                        className="relative"
                    >
                        {/* A rail rather than four loose cards: the passes run in order. */}
                        <div className="flex items-center gap-3">
                            <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-edge-strong">
                                <span className="size-[5px] rounded-full bg-accent"/>
                            </span>
                            <span className="font-mono text-xs tnum text-accent">{step.ordinal}</span>
                            <span
                                aria-hidden="true"
                                className="hidden h-px flex-1 xl:block"
                                style={{background: 'linear-gradient(to right, var(--edge-strong), transparent)'}}
                            />
                            {index < steps.length - 1 ? (
                                <IconArrow aria-hidden="true" className="hidden shrink-0 text-edge-strong xl:block"/>
                            ) : null}
                        </div>

                        <h3 className="mt-5 font-display text-xl leading-none font-medium tracking-[-0.015em] text-text">
                            {step.name}
                        </h3>
                        <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-text-2">{step.detail}</p>
                        <p className="label-xs mt-4">{step.output}</p>
                    </motion.li>
                ))}
            </ol>
        </section>
    );
}

/* ------------------------------------------------------------------ *
 * Corpora
 * ------------------------------------------------------------------ */
function CorpusCard({item, featured, index}: {item: DatasetCard; featured: boolean; index: number}) {
    const t = useT();
    const lang = useLang();
    const types = item.preview.primary_entity_types?.slice(0, featured ? 6 : 3) ?? [];

    return (
        <motion.article
            {...REVEAL}
            transition={{...REVEAL.transition, delay: index * 0.08}}
            className={cn(
                'group relative isolate flex flex-col overflow-hidden rounded-island p-1.5',
                featured ? 'col-span-12 lg:col-span-7 lg:row-span-2' : 'col-span-12 sm:col-span-6 lg:col-span-5',
            )}
        >
            <IslandSurface/>
            <Link
                to="/c/$datasetId"
                params={{datasetId: item.id}}
                className="flex h-full flex-col outline-none"
                aria-label={`${t.home.openGraph}: ${item.title}`}
            >
                <div
                    className={cn(
                        'relative overflow-hidden rounded-inset bg-surface-sunk/60',
                        featured ? 'h-56 lg:h-72' : 'h-36',
                    )}
                >
                    <Constellation
                        seed={item.id}
                        nodes={item.stats.nodes}
                        edges={item.stats.edges}
                        className="absolute inset-0 size-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                'linear-gradient(to top, color-mix(in oklab, var(--surface) 62%, transparent), transparent 58%)',
                        }}
                    />
                    <Chip className="absolute top-3 left-3 bg-[var(--glass-tint-strong)] backdrop-blur-md">
                        {item.domain}
                    </Chip>
                </div>

                <div className="flex flex-1 flex-col px-4 pt-5 pb-4">
                    <h3
                        className={cn(
                            'font-display leading-none font-medium tracking-[-0.02em] text-text',
                            featured ? 'text-3xl' : 'text-xl',
                        )}
                    >
                        {item.title}
                    </h3>

                    <p className={cn('mt-3 text-sm leading-relaxed text-text-2', featured ? 'max-w-[46ch]' : 'line-clamp-3')}>
                        {item.description}
                    </p>

                    <dl className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
                        {(
                            [
                                [item.stats.nodes, t.common.entities],
                                [item.stats.edges, t.common.relations],
                                [item.stats.communities, t.common.communities],
                                [item.stats.chunks, t.common.chunks],
                            ] as const
                        ).map(([value, label]) => (
                            <div key={label}>
                                <dd className="font-mono text-base leading-none tnum text-text">
                                    {compact(value, lang)}
                                </dd>
                                <dt className="label-xs mt-1.5">{label}</dt>
                            </div>
                        ))}
                    </dl>

                    {types.length > 0 ? (
                        <ul className="mt-5 flex flex-wrap gap-1.5">
                            {types.map((type) => (
                                <li key={type}>
                                    <Chip>{type}</Chip>
                                </li>
                            ))}
                        </ul>
                    ) : null}

                    {/* Pinned so the CTAs line up across cards of different heights. */}
                    <span className="mt-auto flex items-center gap-2 pt-7 text-sm font-semibold text-accent">
                        {t.home.openGraph}
                        <IconArrow className="transition-transform duration-300 group-hover:translate-x-1"/>
                    </span>
                </div>
            </Link>
        </motion.article>
    );
}

export function Corpora() {
    const t = useT();
    const lang = useLang();
    const {data, isPending, isError, refetch} = useQuery(queries.datasets(lang));

    const sorted = data ? [...data].sort((a, b) => b.stats.nodes - a.stats.nodes) : [];

    return (
        <section id="corpora" className="mx-auto w-full max-w-[1680px] scroll-mt-28 px-5 py-24 sm:px-8">
            <SectionHead eyebrow="corpora" title={t.home.datasetsTitle} lede={t.home.datasetsLede}/>

            {isError ? (
                <div className="relative isolate mt-12 rounded-island px-6 py-8">
                    <IslandSurface/>
                    <p className="text-sm font-semibold text-text">{t.common.error}</p>
                    <p className="mt-2 max-w-[46ch] text-sm text-text-2">{t.common.errorHint}</p>
                    <button
                        type="button"
                        onClick={() => void refetch()}
                        className="mt-5 rounded-inset border border-edge-strong px-4 py-2 text-sm font-medium transition-colors duration-200 hover:border-accent-line hover:bg-accent-wash"
                    >
                        {t.common.retry}
                    </button>
                </div>
            ) : (
                <div className="mt-12 grid grid-cols-12 gap-5">
                    {isPending
                        ? [0, 1, 2].map((key) => (
                              <Skeleton
                                  key={key}
                                  className={cn(
                                      'rounded-island',
                                      key === 0 ? 'col-span-12 h-[30rem] lg:col-span-7' : 'col-span-12 h-56 sm:col-span-6 lg:col-span-5',
                                  )}
                              />
                          ))
                        : sorted.map((item, index) => (
                              <CorpusCard key={item.id} item={item} featured={index === 0} index={index}/>
                          ))}
                </div>
            )}
        </section>
    );
}

/* ------------------------------------------------------------------ *
 * Stack — a broken 7/5 grid, not a row of equal tiles.
 * ------------------------------------------------------------------ */
export function StackSection() {
    const t = useT();
    const lang = useLang();
    const entries = stack(lang);

    return (
        <section id="stack" className="mx-auto w-full max-w-[1680px] scroll-mt-28 px-5 py-24 sm:px-8">
            <SectionHead eyebrow="stack" title={t.home.overviewTitle} lede={t.home.overviewLede}/>

            <div className="mt-12 grid grid-cols-12 gap-5">
                {entries.map((entry, index) => (
                    <motion.article
                        key={entry.id}
                        {...REVEAL}
                        transition={{...REVEAL.transition, delay: index * 0.06}}
                        className={cn(
                            'group relative isolate rounded-island p-1.5',
                            index % 4 === 0 || index % 4 === 3
                                ? 'col-span-12 lg:col-span-7'
                                : 'col-span-12 lg:col-span-5',
                        )}
                    >
                        <IslandSurface/>
                        <Link
                            to="/stack/$entryId"
                            params={{entryId: entry.id}}
                            className="flex h-full flex-col px-4 py-5 outline-none"
                        >
                            <Eyebrow className="text-accent">{entry.badge}</Eyebrow>
                            <h3 className="mt-3 font-display text-2xl leading-none font-medium tracking-[-0.02em] text-text">
                                {entry.name}
                            </h3>

                            <p className="prose-measure mt-4 text-sm leading-relaxed text-text-2">{entry.tagline}</p>

                            {/* Their own row, wrapping: a Russian caption like
                                "размеченных сущностей" will not share a line with a title. */}
                            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
                                {entry.figure.map((figure) => (
                                    <li key={figure.caption}>
                                        <p className="font-mono text-lg leading-none tnum text-text">{figure.value}</p>
                                        <p className="label-xs mt-1.5">{figure.caption}</p>
                                    </li>
                                ))}
                            </ul>

                            <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-accent">
                                {t.home.more}
                                <IconArrow className="transition-transform duration-300 group-hover:translate-x-1"/>
                            </span>
                        </Link>
                    </motion.article>
                ))}
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ *
 * Footer
 * ------------------------------------------------------------------ */
export function Footer() {
    const t = useT();

    return (
        <footer className="mx-auto w-full max-w-[1680px] px-5 pt-16 pb-14 sm:px-8">
            <div className="hairline-t grid grid-cols-1 gap-10 pt-10 md:grid-cols-[1.4fr_1fr_1fr]">
                <div>
                    <p className="font-display text-lg leading-none font-medium tracking-[-0.01em] text-text">RAGU</p>
                    <p className="prose-measure mt-3 text-sm leading-relaxed text-text-2">{t.home.footerBlurb}</p>
                </div>

                <nav aria-label={t.home.footerProject}>
                    <p className="label-xs">{t.home.footerProject}</p>
                    <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                        <li>
                            <a className="text-text-2 transition-colors duration-200 hover:text-accent" href="https://github.com/RaguTeam/RAGU">
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a className="text-text-2 transition-colors duration-200 hover:text-accent" href="https://arxiv.org/abs/2607.11683">
                                arXiv 2607.11683
                            </a>
                        </li>
                        <li>
                            <a className="text-text-2 transition-colors duration-200 hover:text-accent" href="https://pypi.org/project/graph-ragu/">
                                graph_ragu on PyPI
                            </a>
                        </li>
                    </ul>
                </nav>

                <nav aria-label={t.home.footerThis}>
                    <p className="label-xs">{t.home.footerThis}</p>
                    <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                        <li>
                            <Link to="/stack/$entryId" params={{entryId: 'interface'}} className="text-text-2 transition-colors duration-200 hover:text-accent">
                                {t.nav.technology}
                            </Link>
                        </li>
                        <li>
                            <a className="text-text-2 transition-colors duration-200 hover:text-accent" href="https://github.com/RaguTeam/web">
                                {t.home.footerThis}
                            </a>
                        </li>
                        <li className="label-xs pt-1">{t.home.rights}</li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
}
