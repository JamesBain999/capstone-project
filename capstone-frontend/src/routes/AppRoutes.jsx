import React, { useState } from "react";  // Importing necessary modules from React library
import { Routes, Route } from "react-router-dom";  // Importing Routes and Route components from react-router-dom
import MainGame from "../pages/MainGame";  // Importing MainGame page component
import GameStartOptions from "../pages/GameStartOptions";  // Importing GameStartOptions page component
import { useGameState } from "../contexts/GameStateContext";  // Importing custom hook from GameStateContext
import LandingPage from "../pages/LandingPage";  // Importing LandingPage page component
import LoginPage from "../pages/LoginPage";  // Importing LoginPage page component
import SignupPage from "../pages/SignupPage";  // Importing SignupPage page component
import UpdateAccount from "../pages/UpdateAccountPage";  // Importing UpdateAccount page component
import EndGameScreen from "../pages/EndGameScreen";  // Importing EndGameScreen page component

// Functional component for handling application routes
function AppRoutes(props) {
  const { currentGameState, setCurrentGameState } = useGameState();  // Using custom hook to get and set game state
  const [gameDifficulty, setGameDifficulty] = useState("easy");  // State to manage game difficulty

  // Function to handle loading an existing game
  const handleGameLoaded = (gameState) => {
    setCurrentGameState({
      id: gameState.id,
      x: gameState.playerPositionX,
      y: gameState.playerPositionY,
      score: gameState.playerCorrectAnswers,
      gameDifficulty: gameState.gameDifficultySetting,
    });
  };

  // Function to handle starting a new game
  const handleNewGame = () => {
    setCurrentGameState({
      id: null,
      x: 0,
      y: 0,
      score: 0,
      gameDifficulty: `${gameDifficulty}`,
    });
  };

  // Rendering the application routes
  return (
    <Routes>
      <Route index element={<LandingPage />} />  {/* Route for rendering LandingPage component */}
      <Route path="/login" element={<LoginPage />} />  {/* Route for rendering LoginPage component */}
      <Route path="/signup" element={<SignupPage />} />  {/* Route for rendering SignupPage component */}
      <Route path="/updateAccount" element={<UpdateAccount />} />  {/* Route for rendering UpdateAccount component */}
      {/* Route for rendering GameStartOptions component with necessary props */}
      <Route
        path="/GameOptions"
        element={
          <GameStartOptions
            {...props}
            onGameLoaded={handleGameLoaded}
            onNewGame={handleNewGame}
            gameDifficulty={gameDifficulty}
            setGameDifficulty={setGameDifficulty}
          />
        }
      />
      {/* Route for rendering MainGame component with currentGameState prop */}
      <Route
        path="/GameOptions/MainGame"
        element={<MainGame {...props} currentGameState={currentGameState} />}
      />
      <Route path="/EndGameScreen" element={<EndGameScreen {...props} />} />  {/* Route for rendering EndGameScreen component */}
    </Routes>
  );
}

export default AppRoutes;  // Exporting the AppRoutes component for use in other parts of the application
