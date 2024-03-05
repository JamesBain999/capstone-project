import React from "react";
import getCategory from "../services/CategoryUtility"
import { useGameState } from "./GameStateContext";

export default function BoardComponent({rows,columns,tileSize,playerRadius}) {
  const {currentGameState, setCurrentGameState} = useGameState();
  const renderBoard = () => {
    const board = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const category = getCategory(j, i);
        board.push(
          <div
            key={`${i}${j}`}
            className={`tile ${category}`}
            style={{
              width: tileSize,
              height: tileSize,
              top: i * tileSize,
              left: j * tileSize,
              backgroundColor: getTileColor(category),
            }}
          ></div>
        );
      }
    }
    return board;
  };

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
      {renderBoard()}
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
