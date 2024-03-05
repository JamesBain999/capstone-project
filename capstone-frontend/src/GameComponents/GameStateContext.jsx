import React, { createContext, useContext, useState } from "react";

const GameStateContext = createContext();

export const useGameState = () => useContext(GameStateContext);

export const GameStateProvider = ({ children }) => {
  const [currentGameState, setCurrentGameState] = useState({
    x: 0,
    y: 0,
    score: 0,
  });

  return (
    <GameStateContext.Provider value={{ currentGameState, setCurrentGameState }}>
      {children}
    </GameStateContext.Provider>
  );
};
