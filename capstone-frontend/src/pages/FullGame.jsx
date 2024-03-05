import React, { useState, useEffect } from "react";
import DiceComponent from "../GameComponents/DiceComponent";
import BoardComponent from "../GameComponents/BoardComponent";
import movePlayer from "../GameComponents/MovementLogic";
import QuestionComponent from "../GameComponents/QuestionComponent";
import { useGameState } from "../GameComponents/GameStateContext";
import { useUserIdContext } from "../contexts/CurrentUserIdContext";
import gameStateService from "../services/GameStateService";
import getCategory from "../services/CategoryUtility";

const rows = 6;
const columns = 10;
const tileSize = 100;
const playerRadius = 15;

export default function MainGame() {
  const { currentUserId } = useUserIdContext();
  const { currentGameState, setCurrentGameState } = useGameState();
  const [diceNumber, setDiceNumber] = useState({ number: 0 });
  const [gameStateId, setGameStateId] = useState(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("history");

  useEffect(() => {
    setCurrentCategory(getCategory(currentGameState.x, currentGameState.y));
    setShowQuestion(true);
  }, [currentGameState.x, currentGameState.y]);

  useEffect(() => {
    movePlayer(
      diceNumber,
      columns,
      rows,
      currentGameState,
      setCurrentGameState
    );
  }, [diceNumber]);

  useEffect(() => {
    if (gameStateId) {
      handleUpdateGameState(gameStateId);
    }
  }, [currentGameState]);

  useEffect(() => {
    setShowQuestion(false)
    setGameStateId(currentGameState.id);
    if (currentGameState.id === null) {
      async function createGameState() {
        try {
          const newGameStateData = {
            userId: currentUserId,
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
    }
  }, []);

  const handleUpdateGameState = async () => {
    try {
      const newGameStateData = {
        userId: currentUserId,
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

  const handleRollDice = (diceRoll) => {
    setDiceNumber({ number: diceRoll });
  };

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
          tileSize={tileSize}
          playerRadius={playerRadius}
        />
        <div>
          {showQuestion && (
            <QuestionComponent
              onAnswerQuestion={handleAnswerQuestion}
              currentCategory={currentCategory}
            />
          )}
        </div>
      </div>
    </div>
  );
}
