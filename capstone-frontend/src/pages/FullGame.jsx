import React, { useState, useEffect } from "react";
import DiceComponent from "../GameComponents/DiceComponent";
import BoardComponent from "../GameComponents/BoardComponent";
import movePlayer from "../GameComponents/MovementLogic";
import QuestionComponent from "../GameComponents/QuestionComponent";
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
  const [diceNumber, setDiceNumber] = useState({ number: 0 });
  const [gameStateId, setGameStateId] = useState(null);
  const [showQuestion, setShowQuestion] = useState(false);

  // useEffect to move player and update game state based on diceNumber
  useEffect(() => {
    movePlayer(
      currentGameState,
      diceNumber,
      setCurrentGameState,
      columns,
      rows
    );
  }, [diceNumber]);

  // useEffect to update game state when currentGameState changes
  useEffect(() => {
    if (gameStateId !== null) {
      handleUpdateGameState(gameStateId);
    }
  }, [currentGameState]);

  // useEffect to create game state on initial render
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

  // Function to update game state
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

  // Function to handle rolling dice
  const handleRollDice = (diceRoll) => {
    setDiceNumber({ number: diceRoll });
    setShowQuestion(true);
  };

  // Function to handle answering question
  const handleAnswerQuestion = () => {
    setShowQuestion(false);
  };

  return (
    <div className="App">
      <h1>{currentGameState.score}/6 Answers correct</h1>
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
