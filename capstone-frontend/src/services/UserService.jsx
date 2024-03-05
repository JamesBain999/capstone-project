import axios from "axios";

const BASE_URL = "http://localhost:8081";

const UserService = {
  getUsers: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/Users`);
      return response.data;
    } catch (error) {
      console.error("Error getting game states:", error);
      throw error;
    }
  },
  createUser: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/Users/create`, data);
      return response.data;
    } catch (error) {
      console.error("Error creating game state:", error);
      throw error;
    }
  },
  updateUser: async (id, data) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/Users/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error creating game state:", error);
      throw error;
    }
  },
  deleteUser: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/Users/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting game state:", error);
      throw error;
    }
  },
  loginUser: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/Users/login`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  checkEmailExists: async (email) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/Users/checkEmailExists`, { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getIdByEmail: async (email) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/Users/getIdbyEmail`, { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default UserService;
