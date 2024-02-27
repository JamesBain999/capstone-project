import React, { useState } from "react";
import DiceComponent from "./DiceComponent";
import BoardComponent from "./BoardComponent";
import movePlayer from "./MovementLogic";
import QuestionModule from "./QuestionComponent";

const rows = 6;
const columns = 10;
const tileSize = 100;
const playerRadius = 15;

export default function MainGame() {
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [diceNumber, setDiceNumber] = useState(0);

  const handleRollDice = (number) => {
    setDiceNumber(number);
  };

  React.useEffect(() => {
    movePlayer(
      playerPos,
      diceNumber,
      setPlayerPos,
      setDiceNumber,
      columns,
      rows
    );
  }, [diceNumber, playerPos]);

  return (
    <div className="App">
      <DiceComponent onRollDice={handleRollDice} />
      <div
        className="game-board"
        style={{
          width: columns * tileSize,
          height: rows * tileSize,
        }}
      >
        <BoardComponent
          rows={rows}
          columns={columns}
          playerPos={playerPos}
          tileSize={tileSize}
          playerRadius={playerRadius}
        />
        <QuestionModule />
      </div>
    </div>
  );
}
