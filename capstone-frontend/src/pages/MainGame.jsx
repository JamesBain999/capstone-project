import React, { useState, useEffect } from "react"; // Importing necessary modules from React library
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from react-router-dom
import DiceComponent from "../GameComponents/DiceComponent"; // Importing custom DiceComponent
import BoardComponent from "../GameComponents/BoardComponent"; // Importing custom BoardComponent
import movePlayer from "../GameComponents/MovementLogic"; // Importing custom MovementLogic function
import QuestionComponent from "../GameComponents/QuestionComponent"; // Importing custom QuestionComponent
import { useGameState } from "../contexts/GameStateContext"; // Importing custom hook from GameStateContext
import { useUserIdContext } from "../contexts/CurrentUserIdContext"; // Importing custom hook from CurrentUserIdContext
import gameStateService from "../services/GameStateService"; // Importing game state service functions
import getCategory from "../services/CategoryUtility"; // Importing utility function for determining category
import "../css/MainGame.css";

const rows = 6; // Number of rows on the game board
const columns = 10; // Number of columns on the game board
const tileSize = 100; // Size of each tile on the game board
const playerRadius = 15; // Radius of the player avatar on the game board

export default function MainGame() {
  const navigate = useNavigate(); // Initializing useNavigate hook for navigation
  const { currentUserId } = useUserIdContext(); // Using custom hook to get current user ID
  const { currentGameState, setCurrentGameState } = useGameState(); // Using custom hook to get and set game state
  const [diceNumber, setDiceNumber] = useState({ number: 0 }); // State to store the rolled dice number
  const [gameStateId, setGameStateId] = useState(null); // State to store the ID of the current game state
  const [showQuestion, setShowQuestion] = useState(false); // State to control whether to show the question component
  const [currentCategory, setCurrentCategory] = useState("history"); // State to store the current category for questions

  // useEffect hook to update the current category based on the player's position on the game board
  useEffect(() => {
    setCurrentCategory(getCategory(currentGameState.x, currentGameState.y));
    setShowQuestion(true);
  }, [currentGameState.x, currentGameState.y]);

  // useEffect hook to handle player movement based on the rolled dice number
  useEffect(() => {
    movePlayer(
      diceNumber,
      columns,
      rows,
      currentGameState,
      setCurrentGameState
    );
  }, [diceNumber]);

  // useEffect hook to handle updating the game state in the database
  useEffect(() => {
    if (gameStateId) {
      handleUpdateGameState(gameStateId);
    }
  }, [currentGameState]);

  // useEffect hook to create a new game state when the component mounts
  useEffect(() => {
    setShowQuestion(false);
    setGameStateId(currentGameState.id);
    if (currentGameState.id === null) {
      async function createGameState() {
        try {
          const newGameStateData = {
            userId: currentUserId,
            playerPositionX: currentGameState.x,
            playerPositionY: currentGameState.y,
            playerCorrectAnswers: currentGameState.score,
            gameDifficultySetting: currentGameState.gameDifficulty,
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

  // useEffect hook to handle game ending condition and cleanup
  useEffect(() => {
    if (currentGameState.score === 6) {
      async function deleteGameState() {
        try {
          await gameStateService.deleteGameState(gameStateId);
          console.log("Game state deleted");
        } catch (error) {
          console.error("Error deleting game state:", error);
        }
      }
      deleteGameState();
      navigate("/EndGameScreen");
    }
  }, [currentGameState.score]);

  const handleUpdateGameState = async () => {
    try {
      const newGameStateData = {
        userId: currentUserId,
        playerPositionX: currentGameState.x,
        playerPositionY: currentGameState.y,
        playerCorrectAnswers: currentGameState.score,
        gameDifficultySetting: currentGameState.gameDifficulty,
      };
      await gameStateService.updateGameState(gameStateId, newGameStateData);
      console.log("Game state updated");
    } catch (error) {
      console.error("Error saving game state:", error);
    }
  };

  // Function to handle rolling the dice
  const handleRollDice = (diceRoll) => {
    setDiceNumber({ number: diceRoll });
  };

  // Function to handle answering the question
  const handleAnswerQuestion = () => {
    setShowQuestion(false);
  };

  // Rendering the main game component
  return (
    <div className="App">
      <div className="gameDetails">
        <h1 className="correct-answers">
          {currentGameState.score}/6 Answers correct
        </h1>

        <DiceComponent onRollDice={handleRollDice} disabled={showQuestion} />
      </div>
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
