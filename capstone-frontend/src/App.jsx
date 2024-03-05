import React from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { GameStateProvider } from "./GameComponents/GameStateContext";

function App() {
  return (
    <div>
      <GameStateProvider>
        <AppRoutes />
      </GameStateProvider>
    </div>
  );
}

export default App;
