import axios from "axios";

export function fetchQuestions(category) {
  return axios
    .get(`https://the-trivia-api.com/v2/questions?difficulty=easy&categories=${category}&limit=1`)
    .then(response => {
      // Check if response status is OK
      if (response.status === 200) {
        return response.data;
      } else {
        // If response status is not OK, throw an error
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
    })
    .catch(error => {
      // Handle errors
      console.error("Error fetching data:", error);
      return null;
    });
}
