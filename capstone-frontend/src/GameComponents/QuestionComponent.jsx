import React, { useEffect, useState } from "react";
import { fetchQuestions } from "../services/ApiUtility"; // Importing utility function for fetching questions
import { useGameState } from "../contexts/GameStateContext"; // Importing custom hook for accessing game state context
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function QuestionComponent({
  onAnswerQuestion,
  currentCategory,
}) {
  const { currentGameState, setCurrentGameState } = useGameState(); // Using custom hook to get current game state
  const [currentQuestion, setCurrentQuestion] = useState(null); // State for storing the current question

  // Fetching data (questions) when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch questions based on game difficulty and category
  const fetchData = async () => {
    // Fetching questions using the game difficulty and category from the game state
    const fetchedQuestion = await fetchQuestions(
      `${currentGameState.gameDifficulty}`,
      `${currentCategory}`
    );
    // Setting the current question to the first fetched question
    setCurrentQuestion(fetchedQuestion[0]);
    console.log(
      `Difficulty of current question: ${currentGameState.gameDifficulty}`
    );
    console.log(`Question data fetched from API: ${fetchedQuestion[0]}`);
  };

  // Function to handle user's answer to the question
  const handleAnswerButtonClick = (selectedAnswer) => {
    // Checking if the selected answer is correct
    if (selectedAnswer === currentQuestion.correctAnswer) {
      // Alerting the user that the answer is correct
      toast.success("This answer is correct!");
      // Updating the game state to increment the score
      setCurrentGameState((prevGameState) => ({
        ...prevGameState,
        score: prevGameState.score + 1,
      }));
    } else {
      // Alerting the user that the answer is incorrect
      toast.error(
        `This answer is incorrect. The correct answer was: ${currentQuestion.correctAnswer}`
      );
    }
    // Calling the callback function to proceed to the next question
    onAnswerQuestion();
  };

  // Rendering the question and answer options
  return (
    <>
      <div className="question-section">
        {/* Checking if a question is available */}
        {currentQuestion && (
          <>
            {/* Displaying the category and question */}
            <h1 id="category-text">
              You landed on{" "}
              <span style={{ fontWeight: "1000" }}>
                {currentCategory.toUpperCase()}
              </span>
            </h1>
            <h1 id="question-text">{currentQuestion.question.text}</h1>
            {/* Rendering the answer options as buttons */}
            <div id="answer-section">
              {[
                currentQuestion.correctAnswer,
                ...currentQuestion.incorrectAnswers,
              ]
                .sort() // Sorting answer options
                .map((answerOption, index) => (
                  <button
                    className="question-button"
                    key={index}
                    onClick={() => handleAnswerButtonClick(answerOption)}
                  >
                    {answerOption}
                  </button>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
