import { useEffect, useRef, useState } from 'react';
import FontFaceObserver from 'fontfaceobserver';
import { fabric } from 'fabric';

async function loadImage(id) {
    return new Promise((res) => {
        fabric.Image.fromURL(`http://localhost:3000/${id}`, (img) => {
            res(img);
        });
    });
}

async function usePreloadedFonts() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            const observer = new FontFaceObserver('Roboto');
            await observer.load();
            setLoaded(true);
        })();
    }, []);

    return loaded;
}

export default function useCanvas(id) {
    const canvasRef = useRef(null);
    const [objects, setObjects] = useState([]);
    const loaded = usePreloadedFonts();
    const hasRun = useRef(false);

    useEffect(() => {
        if (loaded && !hasRun.current) {
            hasRun.current = true;
            (async () => {
                const img = await loadImage(id);
                canvasRef.current = new fabric.Canvas('canvas', {
                    width: img.width,
                    height: img.height,
                    backgroundImage: img,
                });
                canvasRef.current.on('selection:created', (opts) => {
                    setObjects(opts.selected);
                });
                canvasRef.current.on('selection:updated', (opts) => {
                    setObjects([...canvasRef.current.getActiveObjects()]);
                });
                canvasRef.current.on('selection:cleared', (opts) => {
                    setObjects([]);
                });
            })();
        }
    }, [loaded, id]);

    return [canvasRef, objects];
}
