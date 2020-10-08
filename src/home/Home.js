import React from 'react';
import { useGameContext } from '../contexts/GameContext';
import { useHistory } from "react-router-dom";

function Home() {
    const {
        game,
        setGame,
        ip,
        setIp,
        port,
        setPort,
    } = useGameContext();

    const history = useHistory();

    return (
        <>
            <div className="form-group">
                <label>
                    Game
                </label>
                <select
                    value={game}
                    onChange={(e) => setGame(e.target.value)}
                    className="form-control"
                >
                    <option value=''></option>
                    <option value='7d2d'>7 Days to Die</option>
                    <option value='minecraft'>Minecraft</option>
                </select>
            </div>
            <div className="form-group">
                <label>IP Address</label>
                <input type="text" value={ip} onChange={(e) => setIp(e.target.value)} className="form-control" />
            </div>
            <div className="form-group">
                <label>Port</label>
                <input type="text" value={port} onChange={(e) => setPort(e.target.value)} className="form-control" />
            </div>
            <button 
                onClick={async () => {
                    const res = await fetch('http://localhost:3000/servers/query', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            type: game,
                            ip,
                            port,
                        }),
                    });

                    if (res.status === 200) {
                        history.push('/upload');
                    } else {
                        alert('Issue contacting server.');
                    }
                }}
                className="btn btn-primary"
            >
                Submit
            </button>
        </>
    );
}

export default Home;