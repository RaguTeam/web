import {Link} from '@tanstack/react-router';
import {useT} from '../lib/i18n.ts';
import {Button, Eyebrow} from '../components/ui/primitives.tsx';
import {IconArrow} from '../components/ui/icons.tsx';

export function NotFound() {
    const t = useT();

    return (
        <section className="mx-auto flex w-full max-w-[1680px] flex-col justify-center px-5 pt-40 pb-32 sm:px-8 lg:min-h-[70dvh]">
            <Eyebrow className="text-accent">404</Eyebrow>
            <h1 className="mt-5 font-display text-[length:var(--text-title)] leading-[1.02] font-light tracking-[-0.03em] text-text">
                {t.common.notFound}
            </h1>
            <p className="prose-measure mt-4 text-[1.0625rem] leading-[1.6] text-text-2">{t.common.notFoundHint}</p>
            <div className="mt-9">
                <Link to="/">
                    <Button variant="primary" className="px-5 py-3">
                        {t.nav.backHome}
                        <IconArrow/>
                    </Button>
                </Link>
            </div>
        </section>
    );
}
