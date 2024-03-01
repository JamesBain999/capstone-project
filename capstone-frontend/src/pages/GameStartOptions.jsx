// import React from "react";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import gameStateService from "../services/GameStateService";

// const [oldGameStatesList, setOldGameStatesList] = useState([])

// const handleGetGameStates = async () => {
//     try {
//       let readyToMerge = await gameStateService.getGameStates();
//       setOldGameStatesList(readyToMerge)
//       console.log("Game state updated");
//     } catch (error) {
//       console.error("Error saving game state:", error);
//     }
//   };

// const GameStartOptions = () => {
//   return (
//     <div>
//       {oldGameStatesList.map}  
//       <Link to="/MainGame">
//         <button>New Game</button>
//       </Link>
//     </div>
//   );
// };

// export default GameStartOptions;
