import axios from "axios";  // Importing axios for making HTTP requests

const BASE_URL = "http://localhost:8081";  // Base URL for the backend API

// Object containing methods for interacting with game states in the backend
const gameStateService = {
  /**
   * Fetches all game states from the backend API.
   * @returns {Promise} A Promise that resolves with the fetched game states data.
   * @throws Error if there's an error while fetching game states.
   */
  getGameStates: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/gameStates`);
      return response.data;
    } catch (error) {
      console.error("Error getting game states:", error);
      throw error;
    }
  },

  /**
   * Creates a new game state in the backend.
   * @param {Object} data - Data for creating the game state.
   * @returns {Promise} A Promise that resolves with the created game state data.
   * @throws Error if there's an error while creating the game state.
   */
  createGameState: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/gameStates/create`, data);
      return response.data;
    } catch (error) {
      console.error("Error creating game state:", error);
      throw error;
    }
  },

  /**
   * Updates an existing game state in the backend.
   * @param {string} id - ID of the game state to be updated.
   * @param {Object} data - Data for updating the game state.
   * @returns {Promise} A Promise that resolves with the updated game state data.
   * @throws Error if there's an error while updating the game state.
   */
  updateGameState: async (id, data) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/gameStates/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating game state:", error);
      throw error;
    }
  },

  /**
   * Deletes a game state from the backend.
   * @param {string} id - ID of the game state to be deleted.
   * @returns {Promise} A Promise that resolves with the deletion confirmation.
   * @throws Error if there's an error while deleting the game state.
   */
  deleteGameState: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/gameStates/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting game state:", error);
      throw error;
    }
  },

  /**
   * Fetches game states associated with a specific user ID from the backend.
   * @param {string} userId - ID of the user whose game states are to be fetched.
   * @returns {Promise} A Promise that resolves with the fetched game states data.
   * @throws Error if there's an error while fetching game states.
   */
  getGameStatesbyUserId: async (userId) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/gameStates/getGameStatesbyUserId`, { userId });
      return response.data;
    } catch (error) {
      console.error("Error fetching game states by user ID:", error);
      throw error;
    }
  },
};

export default gameStateService;  // Exporting the gameStateService object for use in other parts of the application
