import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gameStateService from "../services/GameStateService";
import UserService from "../services/UserService";
import { useUserEmailContext } from "../contexts/UserEmailContext";
import { useUserIdContext } from "../contexts/CurrentUserIdContext";

const GameStartOptions = ({ onGameLoaded, onNewGame }) => {
  const { userEmail } = useUserEmailContext();
  const [gameStates, setGameStates] = useState([]);
  const { setCurrentUserId } = useUserIdContext();

  useEffect(() => {
    fetchUserId();
  }, []);

  const fetchUserId = async () => {
    try {
      const fetchedUserId = await UserService.getIdByEmail(userEmail);
      setCurrentUserId(fetchedUserId.userId);
      fetchGameStates(fetchedUserId.userId);
    } catch (error) {
      console.error("Error fetching userId:", error);
    }
  };

  const fetchGameStates = async (userId) => {
    try {
      const fetchedGameStates = await gameStateService.getGameStatesbyUserId(
        userId
      );
      setGameStates(fetchedGameStates.data);
      console.log(fetchedGameStates);
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
        {gameStates.length > 0 ? (
          gameStates.map((state) => (
            <li key={state.id}>
              <Link to="/GameOptions/MainGame">
                <button onClick={() => handleLoadGame(state.id)}>
                  Load Game {state.id}
                </button>
              </Link>
            </li>
          ))
        ) : (
          <li>No saved games found.</li>
        )}
      </ul>

      <Link to="/GameOptions/MainGame">
        <button onClick={handleNewGame}>Start New Game</button>
      </Link>
    </div>
  );
};

export default GameStartOptions;
