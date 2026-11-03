import {useEffect, useState} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import {Ambient} from './Ambient.tsx';
import {Cloud} from './Cloud.tsx';
import {Labels} from './Labels.tsx';
import {fade, sceneStore} from './viewer-store.ts';
import {useTheme} from '../lib/theme.ts';

function FadeDriver({graph, ambient}: {graph: number; ambient: number}) {
    useFrame((_, delta) => {
        const rate = Math.min(1, delta * 2.6);
        fade.graph += (graph - fade.graph) * rate;
        fade.ambient += (ambient - fade.ambient) * rate;
    });
    return null;
}

function Scene() {
    const scene = sceneStore.use();
    const {resolved} = useTheme();

    const graphReady = scene.mode === 'graph' && scene.model !== null && scene.positions !== null;
    const graphTarget = graphReady && scene.graphVisible ? 1 : 0;
    // On the landing page the constellation is scenery behind body copy, so it
    // sits well back; on a corpus page it only covers the gap before the real
    // cloud has finished solving.
    const ambientTarget = scene.mode === 'ambient' ? 0.42 : graphReady ? 0 : 0.5;

    return (
        <>
            <FadeDriver graph={graphTarget} ambient={ambientTarget}/>
            <Ambient theme={resolved}/>
            {scene.model && scene.positions ? (
                <>
                    <Cloud model={scene.model} positions={scene.positions} theme={resolved}/>
                    <Labels model={scene.model} positions={scene.positions}/>
                </>
            ) : null}
            <OrbitControls
                makeDefault
                enablePan={false}
                enableZoom={scene.mode === 'graph'}
                enableRotate
                enableDamping
                dampingFactor={0.06}
                rotateSpeed={0.55}
                zoomSpeed={0.7}
                minDistance={3.4}
                maxDistance={20}
            />
        </>
    );
}

/**
 * One canvas for the whole site. It sits behind every route, so navigating
 * from the landing page into a corpus is a crossfade inside a live scene
 * rather than a teardown and a remount.
 */
export function Stage() {
    const scene = sceneStore.use();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const id = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(id);
    }, []);

    const interactive = scene.mode === 'graph' && scene.graphVisible;

    return (
        <div
            aria-hidden="true"
            className="fixed inset-0 z-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
                opacity: mounted ? 1 : 0,
                pointerEvents: interactive ? 'auto' : 'none',
                touchAction: interactive ? 'none' : 'auto',
            }}
        >
            <Canvas
                dpr={[1, 2]}
                gl={{antialias: true, alpha: true, powerPreference: 'high-performance'}}
                camera={{fov: 45, position: [0, 0, 11], near: 0.1, far: 120}}
                style={{pointerEvents: interactive ? 'auto' : 'none'}}
            >
                <Scene/>
            </Canvas>
        </div>
    );
}
