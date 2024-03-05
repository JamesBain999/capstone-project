import React, { useEffect, useState } from "react";
import { fetchQuestions } from "../services/ApiUtility";
import { useGameState } from "./GameStateContext";

export default function QuestionComponent({onAnswerQuestion,currentCategory}) {
  const { setCurrentGameState } = useGameState();
  const [currentQuestion, setCurrentQuestion] = useState(null
);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const fetchedQuestion = await fetchQuestions(`${currentCategory}`);
    setCurrentQuestion(fetchedQuestion[0]);
  };

  const handleAnswerButtonClick = (selectedAnswer) => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      alert("This answer is correct!");
      setCurrentGameState((prevGameState) => ({
        ...prevGameState,
        score: prevGameState.score + 1,
      }));
    } else {
      alert("This answer is incorrect...");
    }
    onAnswerQuestion();
  };

  return (
    <>
      <div className="question-section">
        {currentQuestion && (
          <>
            <h1>Category is: {currentCategory.toUpperCase()}</h1>
            <h1 id="question-text">
              {currentQuestion.question.text}
            </h1>
            <div id="answer-section">
              {[
                currentQuestion.correctAnswer,
                ...currentQuestion.incorrectAnswers,
              ]
                .sort()
                .map((answerOption, index) => (
                  <button
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
