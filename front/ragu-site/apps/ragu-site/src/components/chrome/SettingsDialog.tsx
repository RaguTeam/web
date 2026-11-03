import {useEffect, useState} from 'react';
import {Dialog} from '@base-ui/react/dialog';
import {Switch} from '@base-ui/react/switch';
import {NumberField} from '@base-ui/react/number-field';
import {cn} from '../../lib/cn.ts';
import {clamp} from '../../lib/format.ts';
import {useT} from '../../lib/i18n.ts';
import {
    DEFAULT_SETTINGS,
    GRAPH_LIMIT_STEPS,
    TOP_K_MAX,
    TOP_K_MIN,
    patchSettings,
    settingsStore,
    useSettings,
} from '../../lib/settings.ts';
import {Button, Divider, IslandSurface} from '../ui/primitives.tsx';
import {IconClose} from '../ui/icons.tsx';

/**
 * The track carries the state; the thumb only travels. Centring it with the
 * flex row rather than a transform keeps the two from fighting.
 */
function Toggle({
    label,
    hint,
    checked,
    onChange,
    onLabel,
    offLabel,
}: {
    label: string;
    hint: string;
    checked: boolean;
    onChange: (next: boolean) => void;
    onLabel: string;
    offLabel: string;
}) {
    return (
        <div className="grid grid-cols-[1fr_auto] items-start gap-x-6 gap-y-2 py-4">
            <div className="min-w-0">
                <p className="text-sm font-semibold text-text">{label}</p>
                <p className="mt-1 max-w-[46ch] text-xs leading-relaxed text-text-3">{hint}</p>
            </div>
            <div className="flex items-center gap-3">
                <span
                    className={cn(
                        'label-xs tnum transition-colors duration-200',
                        checked ? 'text-accent' : 'text-text-3',
                    )}
                >
                    {checked ? onLabel : offLabel}
                </span>
                <Switch.Root
                    checked={checked}
                    onCheckedChange={onChange}
                    className={cn(
                        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border px-[3px]',
                        'transition-colors duration-250 ease-[cubic-bezier(0.22,1,0.36,1)]',
                        checked
                            ? 'border-transparent bg-accent shadow-[var(--accent-glow)]'
                            : 'border-edge-strong bg-surface-sunk',
                    )}
                >
                    <Switch.Thumb
                        className={cn(
                            'size-[18px] rounded-full bg-white shadow-thumb dark:bg-[#dde4ee]',
                            'transition-transform duration-250 ease-[cubic-bezier(0.22,1,0.36,1)]',
                            'data-[checked]:translate-x-[18px]',
                        )}
                    />
                </Switch.Root>
            </div>
        </div>
    );
}

const STEPPER = cn(
    'flex w-9 items-center justify-center text-text-3 transition-colors duration-200',
    'hover:bg-accent-wash hover:text-text disabled:pointer-events-none disabled:opacity-35',
);

/** Saved on commit only, so typing "12" never stores 1; empty input reverts. */
function TopKField({value, label, less, more}: {value: number; label: string; less: string; more: string}) {
    const [draft, setDraft] = useState<number | null>(value);

    // Reset to defaults.
    useEffect(() => setDraft(value), [value]);

    const commit = (next: number | null) => {
        if (next === null || !Number.isFinite(next)) {
            setDraft(value);
            return;
        }
        const committed = clamp(Math.round(next), TOP_K_MIN, TOP_K_MAX);
        setDraft(committed);
        patchSettings({topK: committed});
    };

    return (
        <NumberField.Root
            value={draft}
            min={TOP_K_MIN}
            max={TOP_K_MAX}
            step={1}
            format={{maximumFractionDigits: 0, useGrouping: false}}
            onValueChange={setDraft}
            onValueCommitted={commit}
        >
            <NumberField.Group
                className={cn(
                    'flex h-9 overflow-hidden rounded-inset border border-edge-strong bg-surface-sunk',
                    'transition-colors duration-200 focus-within:border-accent',
                )}
            >
                <NumberField.Decrement aria-label={less} className={STEPPER}>
                    −
                </NumberField.Decrement>
                <NumberField.Input
                    aria-label={label}
                    className="w-14 border-x border-edge bg-transparent text-center font-mono text-sm tnum text-text outline-none"
                />
                <NumberField.Increment aria-label={more} className={STEPPER}>
                    +
                </NumberField.Increment>
            </NumberField.Group>
        </NumberField.Root>
    );
}

export function SettingsDialog({open, onOpenChange}: {open: boolean; onOpenChange: (next: boolean) => void}) {
    const t = useT();
    const settings = useSettings();

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Backdrop
                    className={cn(
                        'fixed inset-0 z-40 bg-[color-mix(in_oklab,var(--bg-deep)_72%,transparent)] backdrop-blur-[3px]',
                        'transition-opacity duration-300 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
                    )}
                />
                <Dialog.Popup
                    className={cn(
                        'pop-anim relative isolate fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
                        'w-[min(38rem,calc(100vw-2rem))] rounded-island p-1.5',
                    )}
                >
                    <IslandSurface solid/>
                    <div className="max-h-[min(46rem,calc(100dvh-6rem))] overflow-y-auto scroll-thin px-5 py-4">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <Dialog.Title className="font-display text-2xl leading-tight font-normal tracking-[-0.02em] text-text">
                                    {t.settings.title}
                                </Dialog.Title>
                                <Dialog.Description className="label-xs mt-2">
                                    {t.settings.subtitle}
                                </Dialog.Description>
                            </div>
                            <Dialog.Close
                                aria-label={t.settings.close}
                                className="rounded-inset p-2 text-text-3 transition-colors duration-200 hover:bg-accent-wash hover:text-text"
                            >
                                <IconClose/>
                            </Dialog.Close>
                        </div>

                        <div className="mt-6">
                            <p className="label-xs text-accent">{t.settings.groupRetrieval}</p>
                            <p className="mt-1.5 text-xs text-text-3">{t.settings.groupRetrievalHint}</p>
                        </div>

                        <div className="mt-2 divide-y divide-edge">
                            <Toggle
                                label={t.settings.useGraph}
                                hint={t.settings.useGraphHint}
                                checked={settings.useGraph}
                                onChange={(next) => patchSettings({useGraph: next})}
                                onLabel={t.settings.on}
                                offLabel={t.settings.off}
                            />
                            <Toggle
                                label={t.settings.queryPlan}
                                hint={t.settings.queryPlanHint}
                                checked={settings.queryPlan}
                                onChange={(next) => patchSettings({queryPlan: next})}
                                onLabel={t.settings.on}
                                offLabel={t.settings.off}
                            />
                            <Toggle
                                label={t.settings.rerank}
                                hint={t.settings.rerankHint}
                                checked={settings.rerank}
                                onChange={(next) => patchSettings({rerank: next})}
                                onLabel={t.settings.on}
                                offLabel={t.settings.off}
                            />

                            <div className="grid grid-cols-[1fr_auto] items-start gap-x-6 gap-y-2 py-4">
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-text">{t.settings.topK}</p>
                                    <p className="mt-1 max-w-[46ch] text-xs leading-relaxed text-text-3">
                                        {t.settings.topKHint}
                                    </p>
                                </div>
                                <TopKField
                                    value={settings.topK}
                                    label={t.settings.topK}
                                    less={t.settings.topKLess}
                                    more={t.settings.topKMore}
                                />
                            </div>

                            <div className="py-4">
                                <div className="flex items-baseline justify-between gap-4">
                                    <p className="text-sm font-semibold text-text">{t.settings.graphLimit}</p>
                                    <span className="font-mono text-sm tnum text-accent">{settings.graphLimit}</span>
                                </div>
                                <p className="mt-1 max-w-[46ch] text-xs leading-relaxed text-text-3">
                                    {t.settings.graphLimitHint}
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {GRAPH_LIMIT_STEPS.map((step) => (
                                        <button
                                            key={step}
                                            type="button"
                                            onClick={() => patchSettings({graphLimit: step})}
                                            className={cn(
                                                'relative isolate rounded-chip px-3 py-1.5 font-mono text-xs tnum transition-colors duration-200',
                                                settings.graphLimit === step
                                                    ? 'text-accent'
                                                    : 'text-text-3 hover:text-text',
                                            )}
                                        >
                                            {settings.graphLimit === step ? (
                                                <span aria-hidden="true" className="accent-pane"/>
                                            ) : (
                                                <span
                                                    aria-hidden="true"
                                                    className="absolute inset-0 -z-10 rounded-[inherit] border border-edge"
                                                />
                                            )}
                                            {step}
                                        </button>
                                    ))}
                                </div>
                                <p className="mt-3 text-[11px] leading-relaxed text-text-3">{t.viewer.apiCap}</p>
                            </div>
                        </div>

                        <Divider className="mt-2"/>

                        <div className="mt-4 flex items-center justify-between gap-3">
                            <Button variant="quiet" onClick={() => settingsStore.set(DEFAULT_SETTINGS)}>
                                {t.settings.reset}
                            </Button>
                            <Dialog.Close render={<Button variant="primary">{t.settings.close}</Button>}/>
                        </div>
                    </div>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
