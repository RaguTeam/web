import {useRef, useState, type ReactNode} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {cn} from '../../lib/cn.ts';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * A summary that grows a body — used wherever secondary detail hangs off a
 * panel: the sources behind an answer, the chunks behind an entity.
 *
 * The plate is an absolutely-positioned layer rather than padding, so opening
 * it paints a background around the summary instead of pushing the summary
 * inward. It reaches a quarter-rem further out than the surrounding content,
 * which lands it half a rem inside the panel it sits in.
 */
export function Disclosure({
    label,
    count,
    icon,
    hint,
    actions,
    children,
    className,
}: {
    label: string;
    count?: number;
    icon?: ReactNode;
    hint?: string;
    /** Controls that belong beside the summary, not inside the body. */
    actions?: ReactNode;
    children: ReactNode;
    className?: string;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div ref={ref} className={cn('relative isolate flex flex-col', className)}>
            <motion.span
                aria-hidden="true"
                initial={false}
                animate={{opacity: open ? 1 : 0}}
                transition={{duration: 0.3, ease: EASE}}
                className="absolute -inset-x-1 -inset-y-1 -z-10 rounded-inset"
                style={{background: 'color-mix(in oklab, var(--text) 5%, transparent)'}}
            />

            <div className="flex items-center gap-1">
                <button
                    type="button"
                    title={hint}
                    aria-expanded={open}
                    onClick={() => {
                        const next = !open;
                        setOpen(next);
                        if (next) {
                            window.setTimeout(
                                () => ref.current?.scrollIntoView({behavior: 'smooth', block: 'nearest'}),
                                340,
                            );
                        }
                    }}
                    className={cn(
                        'label-xs flex items-center gap-1.5 rounded-inset px-2 py-1.5',
                        'transition-colors duration-200 hover:text-accent',
                        open && 'text-accent',
                    )}
                >
                    {icon}
                    {label}
                    {count !== undefined ? <span className="tnum opacity-70">{count}</span> : null}
                </button>
                {actions}
            </div>

            <AnimatePresence initial={false}>
                {open ? (
                    <motion.div
                        initial={{height: 0, opacity: 0}}
                        animate={{height: 'auto', opacity: 1}}
                        exit={{height: 0, opacity: 0}}
                        transition={{duration: 0.32, ease: EASE}}
                        className="overflow-hidden"
                    >
                        {/* The body carries the summary's own padding, so its section labels
                            line up with the icon above them — and with the prose the whole
                            disclosure is pulled out to meet. */}
                        <div className="mt-2 border-t border-edge px-2 pt-3 pb-1">{children}</div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
}
