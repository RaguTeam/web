import {Link} from '@tanstack/react-router';
import {useQuery} from '@tanstack/react-query';
import {motion} from 'motion/react';
import {queries} from '../../api/queries.ts';
import {useLang, useT} from '../../lib/i18n.ts';
import {full} from '../../lib/format.ts';
import {Button, Eyebrow, IslandSurface, Skeleton} from '../ui/primitives.tsx';
import {IconArrow} from '../ui/icons.tsx';

const RISE = {
    hidden: {opacity: 0, y: 18},
    shown: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {delay: 0.06 * index, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const},
    }),
};

export function Hero() {
    const t = useT();
    const lang = useLang();
    const {data, isPending, isError} = useQuery(queries.datasets(lang));

    const totals = data?.reduce(
        (sum, item) => ({
            nodes: sum.nodes + item.stats.nodes,
            edges: sum.edges + item.stats.edges,
            communities: sum.communities + item.stats.communities,
            chunks: sum.chunks + item.stats.chunks,
        }),
        {nodes: 0, edges: 0, communities: 0, chunks: 0},
    );

    const badges = data?.[0]?.badges ?? [];

    return (
        <section className="relative mx-auto grid w-full max-w-[1680px] grid-cols-12 items-center gap-x-8 gap-y-14 px-5 pt-32 pb-24 sm:px-8 lg:min-h-[88dvh] lg:pt-40">
            <div className="col-span-12 lg:col-span-7">
                <motion.div initial="hidden" animate="shown" custom={0} variants={RISE}>
                    <Eyebrow className="text-accent">{t.home.eyebrow}</Eyebrow>
                </motion.div>

                <motion.h1
                    initial="hidden"
                    animate="shown"
                    custom={1}
                    variants={RISE}
                    className="mt-6 font-display text-[length:var(--text-display)] leading-[0.96] font-light tracking-[-0.035em] text-text"
                >
                    {t.home.title}
                    <span className="mt-1 block italic font-normal text-text-2">{t.home.titleAccent}</span>
                </motion.h1>

                <motion.p
                    initial="hidden"
                    animate="shown"
                    custom={2}
                    variants={RISE}
                    className="prose-measure mt-8 text-[1.0625rem] leading-[1.65] text-text-2"
                >
                    {t.home.lede}
                </motion.p>

                <motion.div
                    initial="hidden"
                    animate="shown"
                    custom={3}
                    variants={RISE}
                    className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-4"
                >
                    <Link to="/c/$datasetId" params={{datasetId: 'medical'}}>
                        <Button variant="primary" className="px-5 py-3">
                            {t.home.ctaPrimary}
                            <IconArrow className="transition-transform duration-300 group-hover:translate-x-0.5"/>
                        </Button>
                    </Link>
                    <a
                        href="#pipeline"
                        className="rounded-control px-3 py-3 text-sm font-medium text-text-2 underline decoration-edge-strong underline-offset-[6px] transition-colors duration-200 hover:text-accent hover:decoration-accent-line"
                    >
                        {t.home.ctaSecondary}
                    </a>
                </motion.div>
            </div>

            <motion.aside
                initial={{opacity: 0, y: 26}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.28, duration: 0.85, ease: [0.22, 1, 0.36, 1]}}
                className="relative isolate col-span-12 rounded-island p-1.5 lg:col-span-4 lg:col-start-9"
            >
                <IslandSurface/>
                <div className="px-4 py-4">
                    <div className="flex items-baseline justify-between gap-4">
                        <p className="label-xs">{t.home.metricsTitle}</p>
                        <span className="label-xs text-accent tnum">
                            {data?.length ?? 3} {t.home.corpora}
                        </span>
                    </div>

                    <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5">
                        {(
                            [
                                ['nodes', t.home.metricNodes],
                                ['edges', t.home.metricEdges],
                                ['communities', t.home.metricCommunities],
                                ['chunks', t.home.metricChunks],
                            ] as const
                        ).map(([key, label]) => (
                            <div key={key}>
                                <dt className="label-xs">{label}</dt>
                                <dd className="mt-1.5 font-mono text-[1.35rem] leading-none tnum text-text">
                                    {isPending ? (
                                        <Skeleton className="h-5 w-20"/>
                                    ) : isError || !totals ? (
                                        '—'
                                    ) : (
                                        full(totals[key], lang)
                                    )}
                                </dd>
                            </div>
                        ))}
                    </dl>

                    {badges.length > 0 ? (
                        <div className="mt-6 border-t border-edge pt-4">
                            <ul className="flex flex-col gap-2">
                                {badges.map((badge) => (
                                    <li key={badge.label} className="flex items-baseline justify-between gap-4">
                                        <span className="label-xs">{badge.label}</span>
                                        <span className="truncate font-mono text-xs text-text-2">{badge.value}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : null}
                </div>
            </motion.aside>
        </section>
    );
}
