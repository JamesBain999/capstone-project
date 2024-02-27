import React from "react";

export default function BoardComponent({
  playerPos,
  rows,
  columns,
  tileSize,
  playerRadius,
}) {
  const getCategory = (x, y) => {
    const categories = {
      category1: [
        [0, 0],
        [4, 0],
        [8, 0],
        [9, 3],
        [7, 5],
        [3, 5],
        [0, 4],
      ],
      category2: [
        [1, 0],
        [5, 0],
        [9, 0],
        [9, 4],
        [6, 5],
        [2, 5],
        [0, 3],
      ],
      category3: [
        [2, 0],
        [6, 0],
        [9, 1],
        [9, 5],
        [5, 5],
        [1, 5],
        [0, 2],
      ],
      category4: [
        [3, 0],
        [7, 0],
        [9, 2],
        [8, 5],
        [4, 5],
        [0, 5],
        [0, 1],
      ],
    };

    for (const [cat, coords] of Object.entries(categories)) {
      if (coords.some(([cx, cy]) => cx === x && cy === y)) {
        return cat;
      }
    }

    return null; // Handle the case where x and y don't match any category
  };

  const renderBoard = () => {
    const board = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const category = getCategory(j, i);
        const isPlayerOnTile = playerPos.x === j && playerPos.y === i;
        board.push(
          <div
            key={`${i}${j}`}
            className={`tile ${category} ${
              isPlayerOnTile ? "player-tile" : ""
            }`}
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
      case "category1":
        return "lightblue";
      case "category2":
        return "lightgreen";
      case "category3":
        return "lightyellow";
      case "category4":
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
          top: playerPos.y * tileSize + (0.5 * tileSize - playerRadius),
          left: playerPos.x * tileSize + (0.5 * tileSize - playerRadius),
        }}
      ></div>
    </>
  );
}
