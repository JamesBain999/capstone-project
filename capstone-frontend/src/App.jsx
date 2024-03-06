import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { GameStateProvider } from "./contexts/GameStateContext";
import { UserEmailProvider } from "./contexts/UserEmailContext";
import { UserIdProvider } from "./contexts/CurrentUserIdContext";

function App() {
  return (
    <div>
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
