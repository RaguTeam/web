import {sceneStore} from '../graph/viewer-store.ts';

/**
 * The page background is built from separate layers rather than one gradient,
 * so navigation can change their weight independently: the aurora recedes when
 * a corpus opens and the cloud needs the contrast.
 */
export function Backdrop() {
    const mode = sceneStore.use().mode;
    const quiet = mode === 'graph';

    return (
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <div
                className="absolute inset-0"
                style={{background: 'linear-gradient(175deg, var(--bg) 0%, var(--bg-deep) 100%)'}}
            />

            <div
                className="absolute inset-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{opacity: quiet ? 0.4 : 1}}
            >
                <div
                    className="aurora absolute -top-[22vh] -right-[10vw] size-[58vw] rounded-full"
                    style={{background: 'radial-gradient(circle at 50% 50%, var(--aurora-a), transparent 68%)'}}
                />
                <div
                    className="aurora absolute top-[38vh] -left-[16vw] size-[54vw] rounded-full [animation-delay:-9s]"
                    style={{background: 'radial-gradient(circle at 50% 50%, var(--aurora-b), transparent 66%)'}}
                />
                <div
                    className="aurora absolute -bottom-[28vh] left-[32vw] size-[62vw] rounded-full [animation-delay:-17s]"
                    style={{background: 'radial-gradient(circle at 50% 50%, var(--aurora-c), transparent 70%)'}}
                />
            </div>

            {/* A vignette keeps the top islands legible over a bright cloud. */}
            <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{
                    opacity: quiet ? 1 : 0,
                    background:
                        'radial-gradient(120% 80% at 50% -10%, color-mix(in oklab, var(--bg) 78%, transparent) 0%, transparent 46%)',
                }}
            />

            <div className="backdrop-grain absolute inset-0"/>
        </div>
    );
}
