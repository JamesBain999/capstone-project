import React from "react";
import getCategory from "../services/CategoryUtility"; // Importing utility function for getting category
import { useGameState } from "../contexts/GameStateContext"; // Importing custom hook for accessing game state

// BoardComponent function component
export default function BoardComponent({
  rows,
  columns,
  tileSize,
  playerRadius,
}) {
  const { currentGameState } = useGameState(); // Using custom hook to get current game state

  // Function to render the board
  const renderBoard = () => {
    const board = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const category = getCategory(j, i); // Getting category for each tile
        board.push(
          <div
            key={`${i}${j}`}
            className={`tile ${category}`}
            style={{
              width: tileSize,
              height: tileSize,
              top: i * tileSize,
              left: j * tileSize,
              backgroundColor: getTileColor(category), // Setting tile color based on category
            }}
          ></div>
        );
      }
    }
    return board;
  };

  // Function to get tile color based on category
  const getTileColor = (category) => {
    switch (category) {
      case "history":
        return "lightblue";
      case "science":
        return "lightgreen";
      case "film_and_tv":
        return "lightyellow";
      case "music":
        return "lightcoral";
      default:
        return "darkslategrey";
    }
  };

  return ( 
    <>
      {/* Rendering the board */}
      {renderBoard()}
      {/* Rendering the player */}
      <div
        className="player"
        style={{
          width: playerRadius * 2,
          height: playerRadius * 2,
          borderRadius: "50%",
          backgroundColor: "black",
          position: "absolute",
          top: currentGameState.y * tileSize + (0.5 * tileSize - playerRadius),
          left: currentGameState.x * tileSize + (0.5 * tileSize - playerRadius),
        }}
      ></div>
    </>
  );
}
