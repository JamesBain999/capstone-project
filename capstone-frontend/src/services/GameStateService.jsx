import axios from "axios";

const BASE_URL = "http://localhost:8081";

const gameStateService = {
  getGameStates: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/gameStates`);
      return response.data;
    } catch (error) {
      console.error("Error getting game states:", error);
      throw error;
    }
  },
  createGameState: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/gameStates/create`, data);
      return response.data;
    } catch (error) {
      console.error("Error creating game state:", error);
      throw error;
    }
  },
  updateGameState: async (id, data) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/gameStates/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error creating game state:", error);
      throw error;
    }
  },
  deleteGameState: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/gameStates/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting game state:", error);
      throw error;
    }
  },
};

export default gameStateService;
