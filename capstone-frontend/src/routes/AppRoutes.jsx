import { Routes, Route } from "react-router-dom";
import MainGame from "../pages/FullGame";
// import GameStartOptions from "../pages/GameStartOptions";

function AppRoutes(props) {
  return (
    <Routes>
      {/* <Route index element={<GameStartOptions {...props} />} /> */}
      <Route path="/MainGame" element={<MainGame {...props} />} />
    </Routes>
  );
}
export default AppRoutes;
