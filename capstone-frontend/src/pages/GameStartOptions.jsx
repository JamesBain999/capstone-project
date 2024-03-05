import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gameStateService from "../services/GameStateService";

const GameStartOptions = ({ onGameLoaded, onNewGame }) => {
  const [gameStates, setGameStates] = useState([]);

  useEffect(() => {
    fetchGameStates();
  }, []);

  const fetchGameStates = async () => {
    try {
      const fetchedGameStates = await gameStateService.getGameStates();
      setGameStates(fetchedGameStates.data);
    } catch (error) {
      console.error("Error fetching game states:", error);
    }
  };

  function handleLoadGame(gameId) {
    const selectedGameState = gameStates.find((state) => state.id === gameId);
    if (selectedGameState) {
      onGameLoaded(selectedGameState);
    } else {
      console.error("Game state not found");
    }
  }

  function handleNewGame() {
    onNewGame();
  }

  return (
    <div>
      <h1>Welcome to the Game!</h1>
      <h2>Load Old Game:</h2>
      <ul>
        {gameStates.map((state) => (
          <li key={state.id}>
            <Link to="/GameOptions/MainGame">
              <button onClick={() => handleLoadGame(state.id)}>
                Load Game {state.id}
              </button>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/GameOptions/MainGame">
        <button onClick={handleNewGame}>Start New Game</button>
      </Link>
    </div>
  );
};

export default GameStartOptions;
