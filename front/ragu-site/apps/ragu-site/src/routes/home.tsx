import {useEffect} from 'react';
import {patchScene} from '../graph/viewer-store.ts';
import {Hero} from '../components/home/Hero.tsx';
import {Corpora, Footer, Pipeline} from '../components/home/sections.tsx';

export function Home() {
    useEffect(() => {
        patchScene({mode: 'ambient', datasetId: null, model: null, positions: null});
    }, []);

    return (
        <>
            <Hero/>
            <Pipeline/>
            <Corpora/>
            <Footer/>
        </>
    );
}
