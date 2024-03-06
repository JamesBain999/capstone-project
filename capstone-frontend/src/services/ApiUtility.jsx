import axios from "axios";  // Importing axios for making HTTP requests

/**
 * Function to fetch trivia questions from an external API based on game difficulty and category.
 * @param {string} gameDifficulty - Difficulty level of the game.
 * @param {string} category - Category of the trivia questions.
 * @returns {Promise} A Promise that resolves with the fetched questions data or null if there's an error.
 */
export function fetchQuestions(gameDifficulty, category) {
  return axios
    .get(`https://the-trivia-api.com/v2/questions?difficulties=${gameDifficulty}&categories=${category}&limit=1`)
    .then(response => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      return null;
    });
}
