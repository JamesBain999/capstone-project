import React, { useState } from "react";

export default function QuestionModule() {
  const questions = [
    {
      questionText: "What is the capital of France?",
      answerOptions: [
        { answerText: "New york", isCorrect: false },
        { answerText: "Dublin", isCorrect: false },
        { answerText: "London", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [showScore, setShowScore] = useState(false);

  const handleAnswerButtonClick = (isCorrect) => {
    if (isCorrect === true) {
      alert("this answer is correct!");
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <>
      {showScore ? (
        <div className="score-section">
          You scored 1 out of {questions.length}
        </div>
      ) : (
        <div className="question-section">
          <h1 id="question-text">{questions[0].questionText}</h1>
          <div id="answer-section">
            {questions[0].answerOptions.map((answeroption) => (
              <button
                onClick={() => handleAnswerButtonClick(answeroption.isCorrect)}
              >
                {answeroption.answerText}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
