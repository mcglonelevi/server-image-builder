import React, { useState } from 'react';
import { useGameContext } from '../contexts/GameContext';
import { useHistory } from "react-router-dom";

function useVerifyGameServer() {
    const [loading, setLoading] = useState(false);

    const validateServer = async ({ game, ip, port, history }) => {
        setLoading(true);
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
            setLoading(false);
        }
    }
    return [loading, validateServer];
}

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
    const [loading, validateServer] = useVerifyGameServer();

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
                    disabled={loading}
                >
                    <option value=''></option>
                    <option value='7d2d'>7 Days to Die</option>
                    <option value='garrysmod'>Garry's Mod</option>
                    <option value='minecraft'>Minecraft</option>
                    <option value='rust'>Rust</option>
                    <option value='starbound'>Starbound</option>
                    <option value='tf2'>TF2</option>
                    <option value='forrest'>The Forest</option>
                    <option value='unturned'>Unturned</option>
                </select>
            </div>
            <div className="form-group">
                <label>IP Address</label>
                <input type="text" value={ip} onChange={(e) => setIp(e.target.value)} className="form-control" disabled={loading} />
            </div>
            <div className="form-group">
                <label>Port</label>
                <input type="text" value={port} onChange={(e) => setPort(e.target.value)} className="form-control" disabled={loading} />
            </div>
            <button 
                onClick={() => validateServer({ game, ip, port, history })}
                className="btn btn-primary"
                disabled={loading}
            >
                {loading ? 'Verifying server exists...' : 'Submit'}
            </button>
        </>
    );
}

export default Home;