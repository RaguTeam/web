import type {ButtonHTMLAttributes, CSSProperties, HTMLAttributes, ReactNode} from 'react';
import {cn} from '../../lib/cn.ts';

/* ------------------------------------------------------------------ *
 * Island — content in front, glass behind.
 *
 * The pane is its own layer so effects can be applied to it alone: a parent
 * carrying `backdrop-filter` would flatten any glass nested inside it, and
 * scaling the container would drag the text through the animation with it.
 * ------------------------------------------------------------------ */
export function IslandSurface({
    solid,
    className,
    style,
}: {
    solid?: boolean;
    className?: string;
    style?: CSSProperties;
}) {
    return (
        <span
            aria-hidden="true"
            style={style}
            className={cn(solid ? 'island-surface-solid' : 'island-surface', className)}
        />
    );
}

/* ------------------------------------------------------------------ *
 * Button
 * ------------------------------------------------------------------ */
type Variant = 'primary' | 'ghost' | 'quiet' | 'icon';

const VARIANTS: Record<Variant, string> = {
    primary:
        'bg-accent text-accent-ink hover:bg-accent-hover shadow-[0_10px_28px_-14px_var(--accent-line)] px-4 py-2.5',
    ghost:
        'border border-edge-strong/70 text-text hover:border-accent-line hover:bg-accent-wash px-4 py-2.5',
    quiet:
        'text-text-2 hover:text-text hover:bg-accent-wash px-3 py-2',
    icon:
        'text-text-2 hover:text-text hover:bg-accent-wash size-9 justify-center',
};

export function Button({
    variant = 'ghost',
    className,
    ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {variant?: Variant}) {
    return (
        <button
            type="button"
            {...rest}
            className={cn(
                'inline-flex items-center gap-2 rounded-control text-sm font-medium',
                'transition-[background-color,color,border-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
                'active:translate-y-px disabled:pointer-events-none disabled:opacity-45',
                VARIANTS[variant],
                className,
            )}
        />
    );
}

/* ------------------------------------------------------------------ *
 * Chip — a square-cornered data tag, not a pill badge.
 * ------------------------------------------------------------------ */
export function Chip({
    className,
    active,
    tone = 'neutral',
    ...rest
}: HTMLAttributes<HTMLSpanElement> & {active?: boolean; tone?: 'neutral' | 'accent'}) {
    return (
        <span
            {...rest}
            className={cn(
                'label-xs inline-flex items-center gap-1.5 rounded-chip border px-2 py-1',
                active
                    ? 'border-accent-line bg-accent-wash text-accent'
                    : tone === 'accent'
                      ? 'border-accent-line/60 text-accent'
                      : 'border-edge text-text-3',
                className,
            )}
        />
    );
}

/* ------------------------------------------------------------------ *
 * Section scaffolding
 * ------------------------------------------------------------------ */
export function Eyebrow({children, className}: {children: ReactNode; className?: string}) {
    return <p className={cn('label-xs', className)}>{children}</p>;
}

export function SectionTitle({children, className}: {children: ReactNode; className?: string}) {
    return (
        <h2
            className={cn(
                'font-display text-[length:var(--text-section)] leading-[1.08] font-normal tracking-[-0.02em] text-text',
                className,
            )}
        >
            {children}
        </h2>
    );
}

export function Lede({children, className}: {children: ReactNode; className?: string}) {
    return <p className={cn('prose-measure text-[0.975rem] leading-relaxed text-text-2', className)}>{children}</p>;
}

/* ------------------------------------------------------------------ *
 * Loading — skeletons shaped like the thing that is coming.
 * ------------------------------------------------------------------ */
export function Skeleton({className}: {className?: string}) {
    return (
        <div
            className={cn('shimmer overflow-hidden rounded-chip bg-edge/60', className)}
            aria-hidden="true"
        />
    );
}

export function Divider({className}: {className?: string}) {
    return <div className={cn('h-px w-full bg-edge', className)} aria-hidden="true"/>;
}
