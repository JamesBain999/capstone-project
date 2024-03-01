import React, { useEffect, useState } from "react";
import { fetchQuestions } from "../services/ApiUtility";
import getCategory from "../services/CategoryUtility";

export default function QuestionComponent({
  currentGameState,
  setCurrentGameState,
  onAnswerQuestion,
}) {
  const [currentCategory, setCurrentCategory] = useState("science");
  const [fullDeck, setFullDeck] = useState({
    science: [],
    film_and_tv: [],
    music: [],
    history: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentCategory(getCategory(currentGameState.x, currentGameState.y));
  }, [currentGameState]);

  const fetchData = async () => {
    const scienceQuestions = await fetchQuestions("science");
    const film_and_tvQuestions = await fetchQuestions("film_and_tv");
    const musicQuestions = await fetchQuestions("music");
    const historyQuestions = await fetchQuestions("history");

    const allQuestions = {
      science: [...scienceQuestions],
      film_and_tv: [...film_and_tvQuestions],
      music: [...musicQuestions],
      history: [...historyQuestions],
    };

    setFullDeck(allQuestions);
  };

  const handleAnswerButtonClick = (selectedAnswer) => {
    if (selectedAnswer === fullDeck[currentCategory][0].correctAnswer) {
      alert("This answer is correct!");
      setCurrentGameState((prevGameState) => ({
        ...prevGameState,
        score: prevGameState.score + 1,
      }));
    } else {
      alert("This answer is incorrect...");
    }
    setFullDeck((prevDeck) => {
      const updatedDeck = { ...prevDeck };
      updatedDeck[currentCategory].shift();
      return updatedDeck;
    });
    onAnswerQuestion();
  };

  return (
    <>
      <div className="question-section">
        {fullDeck[currentCategory]?.length > 0 && (
          <>
            <h1 id="question-text">
              {fullDeck[currentCategory][0].question.text}
            </h1>
            <div id="answer-section">
              {[
                fullDeck[currentCategory][0].correctAnswer,
                ...fullDeck[currentCategory][0].incorrectAnswers,
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
              <h1>{currentGameState.score} out of 6</h1>
            </div>
          </>
        )}
      </div>
    </>
  );
}
