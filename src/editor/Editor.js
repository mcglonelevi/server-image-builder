import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import EditMenu from './EditMenu';

async function loadImage() {
    return new Promise((res) => {
        fabric.Image.fromURL('http://fabricjs.com/article_assets/carMinCache.png', (img) => {
            res(img);
        });
    });
}

function useCanvas() {
    const canvasRef = useRef(null);
    const [objects, setObjects] = useState([]);
    
    useEffect(() => {
        (async () => {
            const img = await loadImage();
            canvasRef.current = new fabric.Canvas('canvas', {
                width: img.width,
                height: img.height,
                backgroundImage: img,
            });
            canvasRef.current.on('selection:created', (opts) => {
                console.log(opts.selected);
                setObjects(opts.selected);
            });
            canvasRef.current.on('selection:updated', (opts) => {
                setObjects([...canvasRef.current.getActiveObjects()]);
            });
            canvasRef.current.on('selection:cleared', (opts) => {
                setObjects([]);
            });
        })();
    }, []);

    return [canvasRef, objects];
}

export default function Editor() {
    const [canvasRef, objects] = useCanvas();

    return (
        <>
            <div>
                <div style={{border: '5px solid black', display: 'inline-block'}}>
                    <canvas id="canvas"></canvas>
                </div>
            </div>
            <button
                onClick={() => {
                    canvasRef.current.add(new fabric.IText("I'm in Comic Sans", {
                        fontFamily: 'Comic Sans',
                    }));
                }}
            >
                Add Text
            </button>
            <button
                onClick={() => {
                    const objs = canvasRef.current.getActiveObjects();
                    canvasRef.current.remove(...objs);
                }}
            >
                Remove
            </button>
            <EditMenu objects={objects} canvas={canvasRef} />
        </>
    );
}