import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gameStateService from "../services/GameStateService"; // Importing GameStateService for fetching game states
import UserService from "../services/UserService"; // Importing UserService for fetching user data
import { useUserEmailContext } from "../contexts/UserEmailContext"; // Importing context hook for user email
import { useUserIdContext } from "../contexts/CurrentUserIdContext"; // Importing context hook for current user ID
import "../css/GameStartOptions.css";

// GameStartOptions component
const GameStartOptions = ({
  onGameLoaded,
  onNewGame,
  gameDifficulty,
  setGameDifficulty,
}) => {
  const { userEmail } = useUserEmailContext(); // Getting user email from context
  const [gameStates, setGameStates] = useState([]); // State for storing game states
  const { setCurrentUserId } = useUserIdContext(); // Getting function to set current user ID from context

  // Fetching user ID and game states when component mounts
  useEffect(() => {
    fetchUserId();
  }, []);

  // Function to fetch user ID based on user email
  const fetchUserId = async () => {
    try {
      const fetchedUserId = await UserService.getIdByEmail(userEmail); // Fetching user ID using user email
      setCurrentUserId(fetchedUserId.userId); // Setting current user ID in context
      fetchGameStates(fetchedUserId.userId); // Fetching game states associated with the user ID
    } catch (error) {
      console.error("Error fetching userId:", error);
    }
  };

  // Function to fetch game states based on user ID
  const fetchGameStates = async (userId) => {
    try {
      const fetchedGameStates = await gameStateService.getGameStatesbyUserId(
        userId
      ); // Fetching game states using user ID
      setGameStates(fetchedGameStates.data); // Setting fetched game states in component state
      console.log(fetchedGameStates);
    } catch (error) {
      console.error("Error fetching game states:", error);
    }
  };

  // Function to handle loading a game
  function handleLoadGame(gameId) {
    const selectedGameState = gameStates.find((state) => state.id === gameId); // Finding the selected game state
    if (selectedGameState) {
      onGameLoaded(selectedGameState); // Calling callback function to load the selected game state
    } else {
      console.error("Game state not found");
    }
  }

  // Function to handle starting a new game
  function handleNewGame() {
    onNewGame(); // Calling callback function to start a new game
  }

  // Rendering the game start options
  return (
    <div className="game-start-options-container">
      <h1>Welcome to the Game!</h1>
      <h2>Load Old Game:</h2>
      <ul>
        {/* Displaying a list of saved games */}
        {gameStates && gameStates.length > 0 ? (
          gameStates.map((state) => (
            <li key={state.id}>
              {/* Linking to the main game page with the option to load the selected game */}
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
      <h2>Start New Game</h2>
      {/* Dropdown to select game difficulty */}
      <label className="difficulty-label">Select Difficulty:</label>
      <select
        value={gameDifficulty}
        onChange={(e) => setGameDifficulty(e.target.value)}
        className="difficulty-select"
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      {/* Button to start a new game */}
      <Link to="/GameOptions/MainGame">
        <button className="start-new-game-button" onClick={handleNewGame}>Start New Game</button>
      </Link>
      {/* Button to navigate to the account update page */}
      <Link to="/updateAccount">
        <button className="update-account-button">Update Account</button>
      </Link>
    </div>
  );
};

export default GameStartOptions;
