import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from "./routes/AppRoutes";
import { GameStateProvider } from "./contexts/GameStateContext";
import { UserEmailProvider } from "./contexts/UserEmailContext";
import { UserIdProvider } from "./contexts/CurrentUserIdContext";

function App() {
  return (
    <div style={{background: "darkslategrey", position: "absolute", top: 0, right: 0, left: 0, bottom: 0}}>
      <UserEmailProvider>
        <UserIdProvider>
          <GameStateProvider>
            <AppRoutes />
          </GameStateProvider>
        </UserIdProvider>
      </UserEmailProvider>
    </div>
  );
}

export default App;
