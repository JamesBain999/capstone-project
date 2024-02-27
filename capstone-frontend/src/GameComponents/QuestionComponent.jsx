import React, { useEffect, useState } from "react";
import axios from "axios";

export default function QuestionModule({
  currentGameState,
  setCurrentGameState,
}) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://the-trivia-api.com/v2/questions?difficulty=easy&categories=science,film_and_tv,music,history&limit=50"
      );
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAnswerButtonClick = (correctAnswer) => {
    if (correctAnswer === questions[currentQuestion].correctAnswer) {
      alert("This answer is correct!");
      setCurrentGameState((prevGameState) => ({
        ...prevGameState,
        score: prevGameState.score + 1,
      }));
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
    if (currentGameState.score === 6) {
      setShowScore(true);
    }
  };

  let allAnswers = [];
  questions.map((answers) => {
    allAnswers.push(
      [answers.correctAnswer, ...answers.incorrectAnswers].sort((a, b) =>
        a < b ? -1 : 1
      )
    );
  });

  return (
    <>
      {showScore ? (
        <div className="score-section">
          You scored {currentGameState.score} out of {questions.length}
        </div>
      ) : (
        <div className="question-section">
          {questions.length > 0 && (
            <>
              <h1 id="question-text">
                {currentQuestion + 1}.{" "}
                {questions[currentQuestion].question.text}
              </h1>
              <div id="answer-section">
                {allAnswers[currentQuestion].map((answeroption) => (
                  <button onClick={() => handleAnswerButtonClick(answeroption)}>
                    {answeroption}
                  </button>
                ))}
                <h1>{currentGameState.score} out of 6</h1>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
