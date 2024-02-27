import React, { useState, useEffect } from "react";
import DiceComponent from "./DiceComponent";
import BoardComponent from "./BoardComponent";
import movePlayer from "./MovementLogic";
import QuestionModule from "./QuestionComponent";
import gameStateService from "../services/GameStateService";

const rows = 6;
const columns = 10;
const tileSize = 100;
const playerRadius = 15;

export default function MainGame() {
  const [currentGameState, setCurrentGameState] = useState({
    x: 0,
    y: 0,
    score: 0,
  });

  const [diceNumber, setDiceNumber] = useState(0);

  useEffect(() => {
    async function createGameState() {
      try {
        const newGameStateData = {
          playerPositionX: currentGameState.x,
          playerPositionY: currentGameState.y,
          playerCorrectAnswers: currentGameState.score,
        };
        await gameStateService.createGameState(newGameStateData);
        console.log("Game state saved on initial render");
      } catch (error) {
        console.error("Error saving game state:", error);
      }
    }
    createGameState();
  }, []);

  useEffect(() => {
    movePlayer(
      currentGameState,
      diceNumber,
      setCurrentGameState,
      setDiceNumber,
      columns,
      rows
    );
    handleUpdateGameState();
  }, [diceNumber]);

  const handleUpdateGameState = async (id) => {
    try {
      const newGameStateData = {
        playerPositionX: currentGameState.x,
        playerPositionY: currentGameState.y,
        playerCorrectAnswers: currentGameState.score,
      };
      await gameStateService.updateGameState(id, newGameStateData);
      console.log(id)
      console.log("Game state updated");
    } catch (error) {
      console.error("Error saving game state:", error);
    }
  };

  const handleRollDice = (number) => {
    setDiceNumber(number);
  };

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
          currentGameState={currentGameState}
          tileSize={tileSize}
          playerRadius={playerRadius}
        />
        <QuestionModule
          currentGameState={currentGameState}
          setCurrentGameState={setCurrentGameState}
        />
      </div>
    </div>
  );
}
