import axios from "axios";

export async function fetchQuestions(category) {
  try {
    const response = await axios.get(`https://the-trivia-api.com/v2/questions?difficulty=easy&categories=${category}&limit=50`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
