import React, { useState, useEffect } from "react";
import DiceComponent from "./DiceComponent";
import BoardComponent from "./BoardComponent";
import movePlayer from "./MovementLogic";
import QuestionComponent from "./QuestionComponent";
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
  const [gameStateId, setGameStateId] = useState(null);
  const [showQuestion, setShowQuestion] = useState(false);

  useEffect(() => {
    async function createGameState() {
      try {
        const newGameStateData = {
          playerPositionX: currentGameState.x,
          playerPositionY: currentGameState.y,
          playerCorrectAnswers: currentGameState.score,
        };
        const createdGameState = await gameStateService.createGameState(
          newGameStateData
        );
        setGameStateId(createdGameState.data.id);
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

  useEffect(() => {
    if (gameStateId !== null) {
      handleUpdateGameState(gameStateId);
    }
  }, [currentGameState]);

  const handleUpdateGameState = async () => {
    try {
      const newGameStateData = {
        playerPositionX: currentGameState.x,
        playerPositionY: currentGameState.y,
        playerCorrectAnswers: currentGameState.score,
      };
      await gameStateService.updateGameState(gameStateId, newGameStateData);
      console.log("Game state updated");
    } catch (error) {
      console.error("Error saving game state:", error);
    }
  };

  const handleRollDice = (number) => {
    setDiceNumber(number);
    setShowQuestion(true);
  };

  const handleAnswerQuestion = () => {
    setShowQuestion(false);
  };
  return (
    <div className="App">
      <h1>{currentGameState.score}/6 Answers correct</h1>
      <h1>Your last roll was a "{diceNumber}"</h1>
      <DiceComponent onRollDice={handleRollDice} disabled={showQuestion} />
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
        <div style={{ display: showQuestion ? "block" : "none" }}>
          <QuestionComponent
            currentGameState={currentGameState}
            setCurrentGameState={setCurrentGameState}
            onAnswerQuestion={handleAnswerQuestion}
          />
        </div>
      </div>
    </div>
  );
}
