import type {SVGProps} from 'react';

/**
 * A small hand-drawn set rather than an off-the-shelf icon pack: one 1.5px
 * stroke, one 18px grid, and metaphors that match this product (a node cluster
 * for the graph, a rule stack for retrieval settings).
 */
type Props = SVGProps<SVGSVGElement>;

function Glyph({children, ...rest}: Props) {
    return (
        <svg
            viewBox="0 0 18 18"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...rest}
        >
            {children}
        </svg>
    );
}

export const IconGraph = (props: Props) => (
    <Glyph {...props}>
        <circle cx="4" cy="5" r="1.9"/>
        <circle cx="14" cy="4.5" r="1.6"/>
        <circle cx="9.5" cy="13" r="2.1"/>
        <path d="M5.6 6.4 L8.2 11.2 M5.7 4.6 L12.3 4.5 M11.3 12 L13.2 6.1"/>
    </Glyph>
);

export const IconChat = (props: Props) => (
    <Glyph {...props}>
        <path d="M2.6 8.2c0-2.9 2.7-4.9 6.4-4.9s6.4 2 6.4 4.9-2.7 4.9-6.4 4.9c-.8 0-1.6-.1-2.3-.3L3.4 14.6l.7-2.6c-.9-.9-1.5-2.1-1.5-3.8Z"/>
        <path d="M6.4 8.1h5.2"/>
    </Glyph>
);

export const IconSearch = (props: Props) => (
    <Glyph {...props}>
        <circle cx="8" cy="8" r="4.6"/>
        <path d="M11.5 11.6 L15.2 15.3"/>
    </Glyph>
);

export const IconClose = (props: Props) => (
    <Glyph {...props}>
        <path d="M4.6 4.6 L13.4 13.4 M13.4 4.6 L4.6 13.4"/>
    </Glyph>
);

export const IconSliders = (props: Props) => (
    <Glyph {...props}>
        <path d="M2.6 5.4h5.1M11 5.4h4.4M2.6 12.6h3.1M9 12.6h6.4"/>
        <circle cx="9.4" cy="5.4" r="1.7"/>
        <circle cx="7.4" cy="12.6" r="1.7"/>
    </Glyph>
);

export const IconSun = (props: Props) => (
    <Glyph {...props}>
        <circle cx="9" cy="9" r="3.1"/>
        <path d="M9 1.9v1.6M9 14.5v1.6M1.9 9h1.6M14.5 9h1.6M3.9 3.9l1.2 1.2M12.9 12.9l1.2 1.2M14.1 3.9l-1.2 1.2M5.1 12.9l-1.2 1.2"/>
    </Glyph>
);

export const IconMoon = (props: Props) => (
    <Glyph {...props}>
        <path d="M14.4 10.6A5.9 5.9 0 0 1 7.1 3.4a6.2 6.2 0 1 0 7.3 7.2Z"/>
    </Glyph>
);

export const IconDisplay = (props: Props) => (
    <Glyph {...props}>
        <rect x="2.4" y="3.4" width="13.2" height="8.6" rx="1.6"/>
        <path d="M6.6 15.1h4.8M9 12v3.1"/>
    </Glyph>
);

export const IconGlobe = (props: Props) => (
    <Glyph {...props}>
        <circle cx="9" cy="9" r="6.4"/>
        <path d="M2.7 9h12.6M9 2.6c1.8 2 2.7 4.1 2.7 6.4S10.8 13.4 9 15.4C7.2 13.4 6.3 11.3 6.3 9S7.2 4.6 9 2.6Z"/>
    </Glyph>
);

export const IconChevron = (props: Props) => (
    <Glyph {...props}>
        <path d="M5.4 7 L9 10.6 L12.6 7"/>
    </Glyph>
);

export const IconArrow = (props: Props) => (
    <Glyph {...props}>
        <path d="M4.4 9h9.2M9.6 5.2 13.6 9l-4 3.8"/>
    </Glyph>
);

export const IconSend = (props: Props) => (
    <Glyph {...props}>
        <path d="M3.2 9 15 4.2 10.6 15.2 8.6 10.4 3.2 9Z"/>
    </Glyph>
);

export const IconStop = (props: Props) => (
    <Glyph {...props}>
        <rect x="5" y="5" width="8" height="8" rx="1.4" fill="currentColor" stroke="none"/>
    </Glyph>
);

export const IconReset = (props: Props) => (
    <Glyph {...props}>
        <path d="M14.6 9a5.6 5.6 0 1 1-1.9-4.2"/>
        <path d="M14.8 2.9v3.4h-3.4"/>
    </Glyph>
);

export const IconLayers = (props: Props) => (
    <Glyph {...props}>
        <path d="M9 2.6 15.4 6 9 9.4 2.6 6 9 2.6Z"/>
        <path d="M2.6 9.7 9 13.1l6.4-3.4"/>
    </Glyph>
);

export const IconInfo = (props: Props) => (
    <Glyph {...props}>
        <circle cx="9" cy="9" r="6.4"/>
        <path d="M9 8.2v4.1"/>
        <circle cx="9" cy="5.7" r="0.85" fill="currentColor" stroke="none"/>
    </Glyph>
);

export const IconSources = (props: Props) => (
    <Glyph {...props}>
        <path d="M3.2 4.6a1.6 1.6 0 0 1 1.6-1.6H8l1.4 1.7h4a1.4 1.4 0 0 1 1.4 1.4v1.1"/>
        <path d="M2.9 7.4h12.7l-1.3 6a1.4 1.4 0 0 1-1.4 1.1H4.7a1.4 1.4 0 0 1-1.4-1.2Z"/>
    </Glyph>
);

/** Sweep the thread away — distinct from closing the panel. */
export const IconSweep = (props: Props) => (
    <Glyph {...props}>
        <path d="M11.6 2.8 8.2 6.2"/>
        <path d="M6.4 5.1 12.9 11.6 10.8 13.7 4.3 7.2Z"/>
        <path d="M3.1 14.9h4.4"/>
    </Glyph>
);

export const IconPlus = (props: Props) => (
    <Glyph {...props}>
        <path d="M9 4.2v9.6M4.2 9h9.6"/>
    </Glyph>
);

/** Bring the cloud back to the middle of whatever space is left for it. */
export const IconRecentre = (props: Props) => (
    <Glyph {...props}>
        <path d="M3 6.2V4.3a1.3 1.3 0 0 1 1.3-1.3H6.2M11.8 3h1.9A1.3 1.3 0 0 1 15 4.3v1.9M15 11.8v1.9a1.3 1.3 0 0 1-1.3 1.3h-1.9M6.2 15H4.3A1.3 1.3 0 0 1 3 13.7v-1.9"/>
        <circle cx="9" cy="9" r="2"/>
    </Glyph>
);

/** The reader's own cursor, for a panel that is waiting on a click. */
export const IconPointer = (props: Props) => (
    <Glyph {...props}>
        <path d="M4.6 3.1 13.7 8.4 9.6 9.6 8.1 13.6 4.6 3.1Z"/>
    </Glyph>
);
