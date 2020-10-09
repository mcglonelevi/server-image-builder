import React, { useState } from 'react';
import { fabric } from 'fabric';
import EditMenu from './EditMenu';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from "react-router-dom";
import { useGameContext } from '../contexts/GameContext';
import useCanvas from '../hooks/useCanvas';
import { useHistory } from "react-router-dom";

function useSubmitCanvas() {
    const [loading, setLoading] = useState(false);

    const submitCanvas = async ({ game, ip, port, history, canvasRef }) => {
        const imageId = uuidv4();
        const readId = uuidv4();

        try {
            setLoading(true);
            const res = await fetch('http://localhost:3000/images', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: imageId,
                    canvas: {
                        ...canvasRef.current.toJSON(),
                    },
                    game: {
                        host: ip,
                        port: port,
                        type: game,
                    },
                    readId,
                }),
            });
            
            if (res.status !== 200) {
                throw new Error('Error submitting image.');
            }

            history.push(`/view/${readId}`);
        } catch (e) {
            setLoading(false);
            alert('Error submitting image.');
        }
    };

    return [loading, submitCanvas];
}

export default function Editor() {
    const { id } = useParams();
    const [canvasRef, objects] = useCanvas(id);
    const { game, ip, port } = useGameContext();
    const history = useHistory();
    const [loading, submitCanvas] = useSubmitCanvas();

    const canvasStyles = loading ? { pointerEvents: 'none' } : {};

    return (
        <>
            <div>
                <div style={{border: '5px solid black', display: 'inline-block'}}>
                    <canvas id="canvas" style={canvasStyles}></canvas>
                </div>
            </div>
            <div className="btn-toolbar">
                <div className="btn-group mr-2">
                    <button
                        className="btn btn-success"
                        onClick={() => {
                            canvasRef.current.add(new fabric.IText("I'm in Comic Sans", {
                                fontFamily: 'Roboto',
                            }));
                        }}
                        disabled={loading}
                    >
                        Add Text
                    </button>
                </div>
                <div className="btn-group mr-2">
                    <button
                        className="btn btn-danger"
                        onClick={() => {
                            const objs = canvasRef.current.getActiveObjects();
                            canvasRef.current.remove(...objs);
                        }}
                        disabled={loading}
                    >
                        Remove
                    </button>
                </div>
                <div className="btn-group mr-2">
                    <button
                        className="btn btn-primary"
                        onClick={() => submitCanvas({ game, ip, port, history, canvasRef })}
                        disabled={loading}
                    >
                        Submit
                    </button>
                </div>
            </div>
            <EditMenu objects={objects} canvas={canvasRef} />
        </>
    );
}