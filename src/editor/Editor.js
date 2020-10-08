import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import EditMenu from './EditMenu';
import FontFaceObserver from 'fontfaceobserver';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from "react-router-dom";
import { useGameContext } from '../contexts/GameContext';

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

function useCanvas() {
    const canvasRef = useRef(null);
    const [objects, setObjects] = useState([]);

    const { id } = useParams();
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
        }
    }, [loaded, id]);

    return [canvasRef, objects];
}

export default function Editor() {
    const [canvasRef, objects] = useCanvas();
    const { game, ip, port } = useGameContext();

    return (
        <>
            <div>
                <div style={{border: '5px solid black', display: 'inline-block'}}>
                    <canvas id="canvas"></canvas>
                </div>
            </div>
            <div>
                <button
                    onClick={() => {
                        canvasRef.current.add(new fabric.IText("I'm in Comic Sans", {
                            fontFamily: 'Roboto',
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
                <button
                    onClick={async () => {
                        console.log({
                            method: 'POST',
                            body: {
                                id: uuidv4(),
                                canvas: {
                                    ...canvasRef.current.toJSON(),
                                }
                            },
                        });
                        const res = await fetch('http://localhost:3000/images', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                id: uuidv4(),
                                canvas: {
                                    ...canvasRef.current.toJSON(),
                                },
                                game: {
                                    host: ip,
                                    port: port,
                                    type: game,
                                }
                            }),
                        });
                        const json = await res.json();
                        console.log(json);
                    }}
                >
                    Submit
                </button>
            </div>
            <EditMenu objects={objects} canvas={canvasRef} />
        </>
    );
}