import React from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
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
        <Box>
            <Box>
                <InputLabel shrink htmlFor="game">
                    Game
                </InputLabel>
                <NativeSelect
                    inputProps={{
                        id: 'game',
                    }}
                    value={game}
                    onChange={(e) => setGame(e.target.value)}
                >
                    <option value=''></option>
                    <option value='7d2d'>7 Days to Die</option>
                    <option value='minecraft'>Minecraft</option>
                </NativeSelect>
            </Box>
            <Box>
                <TextField label="IP Address" type="text" value={ip} onChange={(e) => setIp(e.target.value)} />
            </Box>
            <Box>
                <TextField label="Port" type="text" value={port} onChange={(e) => setPort(e.target.value)} />
            </Box>
            <button onClick={async () => {
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
            }}>
                Submit
            </button>
        </Box>
    );
}

export default Home;