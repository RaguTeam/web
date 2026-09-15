/** 41767 → "41.8k". Keeps the shape of a number without its noise. */
export function compact(n: number, locale = 'en'): string {
    return new Intl.NumberFormat(locale, {notation: 'compact', maximumFractionDigits: 1}).format(n);
}

/**
 * A badge has to hold the same width in every locale, and Russian compact
 * notation spells out "тыс." — so this one is deliberately locale-independent.
 * Five characters is the widest it ever gets.
 */
export function compactBadge(n: number): string {
    if (n < 1000) {
        return String(n);
    }
    if (n < 999_500) {
        return `${(n / 1000).toFixed(n < 9950 ? 1 : 0)}k`;
    }
    return `${(n / 1_000_000).toFixed(1)}M`;
}

export function full(n: number, locale = 'en'): string {
    return new Intl.NumberFormat(locale).format(n);
}

export function ms(value: number): string {
    return value < 1000 ? `${Math.round(value)} ms` : `${(value / 1000).toFixed(1)} s`;
}

export function wattHours(value: number): string {
    if (value < 0.001) {
        return `${(value * 1_000_000).toFixed(0)} µWh`;
    }
    if (value < 1) {
        return `${(value * 1000).toFixed(value < 0.01 ? 1 : 0)} mWh`;
    }
    return `${value.toFixed(2)} Wh`;
}

/** RELATED_TO → Related to. Relation types arrive shouting; the UI should not. */
export function humanizeType(raw: string): string {
    const words = raw.replace(/[_\s]+/g, ' ').trim().toLowerCase();
    return words.charAt(0).toUpperCase() + words.slice(1);
}

export function initials(label: string): string {
    return label
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join('');
}

export function clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
}
