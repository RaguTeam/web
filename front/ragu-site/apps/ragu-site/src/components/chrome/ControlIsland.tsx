import {Suspense, lazy, useState} from 'react';
import {Menu} from '@base-ui/react/menu';
import {cn} from '../../lib/cn.ts';
import {langStore, useLang, useT} from '../../lib/i18n.ts';
import {useTheme, type ThemeChoice} from '../../lib/theme.ts';
import {IconDisplay, IconGlobe, IconMoon, IconSliders, IconSun} from '../ui/icons.tsx';
import {IslandSurface} from '../ui/primitives.tsx';

// Nobody opens settings on the first paint; the dialog and its controls can wait.
const SettingsDialog = lazy(() =>
    import('./SettingsDialog.tsx').then((module) => ({default: module.SettingsDialog})),
);

const POPUP = 'pop-anim relative isolate min-w-[11rem] rounded-panel p-1.5 outline-none';

const ITEM =
    'flex cursor-default items-center gap-2.5 rounded-control px-2.5 py-2 text-sm text-text-2 outline-none ' +
    'transition-colors duration-150 data-[highlighted]:bg-accent-wash data-[highlighted]:text-text';

function Trigger({label, children}: {label: string; children: React.ReactNode}) {
    return (
        <Menu.Trigger
            aria-label={label}
            className={cn(
                'flex size-10 items-center justify-center self-center rounded-inset text-text-2',
                'transition-colors duration-200 hover:bg-accent-wash hover:text-text',
                'data-[popup-open]:bg-accent-wash data-[popup-open]:text-accent',
            )}
        >
            {children}
        </Menu.Trigger>
    );
}

/** A three-state appearance control — a two-state sun/moon switch cannot say "match system". */
function ThemeMenu() {
    const t = useT();
    const {choice, resolved, set} = useTheme();

    const options: Array<{value: ThemeChoice; label: string; icon: React.ReactNode}> = [
        {value: 'light', label: t.chrome.themeLight, icon: <IconSun/>},
        {value: 'dark', label: t.chrome.themeDark, icon: <IconMoon/>},
        {value: 'system', label: t.chrome.themeSystem, icon: <IconDisplay/>},
    ];

    return (
        <Menu.Root>
            <Trigger label={t.chrome.theme}>
                {choice === 'system' ? <IconDisplay/> : resolved === 'dark' ? <IconMoon/> : <IconSun/>}
            </Trigger>
            <Menu.Portal>
                <Menu.Positioner sideOffset={10} align="end" className="z-50">
                    <Menu.Popup className={POPUP}>
                        <IslandSurface solid/>
                        <p className="label-xs px-2.5 pt-1.5 pb-2">{t.chrome.theme}</p>
                        <Menu.RadioGroup value={choice} onValueChange={(value) => set(value as ThemeChoice)}>
                            {options.map((option) => (
                                <Menu.RadioItem key={option.value} value={option.value} className={ITEM}>
                                    <span className="text-text-3">{option.icon}</span>
                                    <span className="flex-1">{option.label}</span>
                                    <Menu.RadioItemIndicator className="size-1.5 rounded-full bg-accent"/>
                                </Menu.RadioItem>
                            ))}
                        </Menu.RadioGroup>
                    </Menu.Popup>
                </Menu.Positioner>
            </Menu.Portal>
        </Menu.Root>
    );
}

function LangMenu() {
    const t = useT();
    const lang = useLang();

    return (
        <Menu.Root>
            <Trigger label={t.chrome.language}>
                <span className="relative">
                    <IconGlobe/>
                </span>
            </Trigger>
            <Menu.Portal>
                <Menu.Positioner sideOffset={10} align="end" className="z-50">
                    <Menu.Popup className={POPUP}>
                        <IslandSurface solid/>
                        <p className="label-xs px-2.5 pt-1.5 pb-2">{t.chrome.language}</p>
                        <Menu.RadioGroup value={lang} onValueChange={(value) => langStore.set(value === 'ru' ? 'ru' : 'en')}>
                            <Menu.RadioItem value="en" className={ITEM}>
                                <span className="font-mono text-xs text-text-3">EN</span>
                                <span className="flex-1">English</span>
                                <Menu.RadioItemIndicator className="size-1.5 rounded-full bg-accent"/>
                            </Menu.RadioItem>
                            <Menu.RadioItem value="ru" className={ITEM}>
                                <span className="font-mono text-xs text-text-3">RU</span>
                                <span className="flex-1">Русский</span>
                                <Menu.RadioItemIndicator className="size-1.5 rounded-full bg-accent"/>
                            </Menu.RadioItem>
                        </Menu.RadioGroup>
                    </Menu.Popup>
                </Menu.Positioner>
            </Menu.Portal>
        </Menu.Root>
    );
}

export function ControlIsland() {
    const t = useT();
    const [settingsOpen, setSettingsOpen] = useState(false);

    return (
        <>
            <div className="pointer-events-auto relative isolate flex min-h-island items-stretch gap-1 rounded-island p-1">
                <IslandSurface/>
                <ThemeMenu/>
                <LangMenu/>
                <span className="my-2 w-px shrink-0 bg-edge" aria-hidden="true"/>
                <button
                    type="button"
                    aria-label={t.chrome.settings}
                    onClick={() => setSettingsOpen(true)}
                    className={cn(
                        'flex size-10 items-center justify-center self-center rounded-inset text-text-2',
                        'transition-colors duration-200 hover:bg-accent-wash hover:text-text',
                    )}
                >
                    <IconSliders/>
                </button>
            </div>
            {settingsOpen ? (
                <Suspense fallback={null}>
                    <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen}/>
                </Suspense>
            ) : null}
        </>
    );
}
