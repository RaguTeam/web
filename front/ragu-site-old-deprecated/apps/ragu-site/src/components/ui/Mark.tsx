import {useId} from 'react';

/**
 * The RAGU letterform: a graph across the bowl, a wireframe through the waist,
 * a halftone in the leg. Drawn rather than shipped as a bitmap so it stays
 * crisp and can pick up the surface colour behind it.
 */
export function Mark({size = 34, className}: {size?: number; className?: string}) {
    const id = useId().replace(/:/g, '');

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            className={className}
            role="img"
            aria-label="RAGU"
        >
            <defs>
                <path
                    id={`${id}-r`}
                    fillRule="evenodd"
                    d="M12 8 H40 C50 8 56 14 56 22 C56 29 52 34 45.5 36 L58 56 H44 L33.5 38 H24 V56 H12 Z
                       M24 18 V28 H39 C42.6 28 45 26 45 23 C45 20 42.6 18 39 18 Z"
                />
                <clipPath id={`${id}-c`}>
                    <use href={`#${id}-r`}/>
                </clipPath>
                <pattern id={`${id}-d`} width="4" height="4" patternUnits="userSpaceOnUse">
                    <circle cx="1.6" cy="1.6" r="1.15" fill="var(--mark-void, #0a111c)"/>
                </pattern>
            </defs>

            <rect width="64" height="64" rx="14" fill="var(--mark-void, #0a111c)"/>
            <g clipPath={`url(#${id}-c)`}>
                <rect x="8" y="6" width="52" height="17" fill="#e4573d"/>
                <rect x="8" y="23" width="52" height="15" fill="#33465c"/>
                <rect x="8" y="38" width="52" height="20" fill="#e4573d"/>
                <g stroke="var(--mark-void, #0a111c)" strokeWidth="1.7" fill="var(--mark-void, #0a111c)">
                    <path d="M14 18 L26 12 L38 17 L50 11" fill="none"/>
                    <circle cx="14" cy="18" r="2.4"/>
                    <circle cx="26" cy="12" r="2.4"/>
                    <circle cx="38" cy="17" r="2.4"/>
                    <circle cx="50" cy="11" r="2.4"/>
                </g>
                <g stroke="#dde3ea" strokeWidth="0.9" fill="none">
                    <path d="M9 31 L19 26 L29 31 L39 26 L49 31 L59 26"/>
                    <path d="M9 31 L19 36 L29 31 L39 36 L49 31 L59 36"/>
                    <path d="M19 26 V36 M39 26 V36"/>
                </g>
                <rect x="8" y="39" width="52" height="19" fill={`url(#${id}-d)`}/>
            </g>
        </svg>
    );
}
