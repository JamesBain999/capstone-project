import React, { createContext, useContext, useState } from "react";

// Creating a context for managing game state
const GameStateContext = createContext();

// Custom hook for accessing the game state context
export const useGameState = () => useContext(GameStateContext);

// Provider component for managing game state
export const GameStateProvider = ({ children }) => {
  // State for storing the current game state
  const [currentGameState, setCurrentGameState] = useState({
    userId: null,
    x: 0,
    y: 0,
    score: 0,
    gameDifficulty: "easy"
  });

  // Providing the current game state and a function to set it as context value
  return (
    <GameStateContext.Provider value={{ currentGameState, setCurrentGameState }}>
      {children}
    </GameStateContext.Provider>
  );
};
