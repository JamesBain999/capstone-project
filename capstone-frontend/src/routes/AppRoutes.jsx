import React from "react";
import { Routes, Route } from "react-router-dom";
import MainGame from "../pages/FullGame";
import GameStartOptions from "../pages/GameStartOptions";
import { useGameState } from "../GameComponents/GameStateContext";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";

function AppRoutes(props) {
  const { currentGameState, setCurrentGameState } = useGameState();

  const handleGameLoaded = (gameState) => {
    setCurrentGameState({
      id: gameState.id,
      x: gameState.playerPositionX,
      y: gameState.playerPositionY,
      score: gameState.playerCorrectAnswers,
    });
  };

  const handleNewGame = () => {
    setCurrentGameState({
      id: null,
      x: 0,
      y: 0,
      score: 0,
    });
  };

  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/GameOptions"
        element={
          <GameStartOptions
            {...props}
            onGameLoaded={handleGameLoaded}
            onNewGame={handleNewGame}
          />
        }
      />
      <Route
        path="/GameOptions/MainGame"
        element={<MainGame {...props} currentGameState={currentGameState} />}
      />
    </Routes>
  );
}

export default AppRoutes;
