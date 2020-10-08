import React, { useState, useContext } from 'react';

const GameContext = React.createContext();

function useGameContextProvider() {
    const [game, setGame] = useState('7d2d');
    const [ip, setIp] = useState('173.199.84.67');
    const [port, setPort] = useState('25000');

    return {
        game,
        setGame,
        ip,
        setIp,
        port,
        setPort,
    };
}

export function useGameContext() {
    return useContext(GameContext);
}

export function GameContextProvider({ children }) {
    const gameContext = useGameContextProvider();

    return (
        <GameContext.Provider value={gameContext}>
            {children}
        </GameContext.Provider>
    );
}
