import axios from "axios";  // Importing axios for making HTTP requests

const BASE_URL = "http://localhost:8081";  // Base URL for API requests

/**
 * UserService object with methods for interacting with user-related endpoints.
 */
const UserService = {
  /**
   * Fetches all users from the API.
   * @returns {Promise} A Promise that resolves with the fetched users data.
   */
  getUsers: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/Users`);
      return response.data;
    } catch (error) {
      console.error("Error getting users:", error);
      throw error;
    }
  },

  /**
   * Creates a new user with the provided data.
   * @param {object} data - Data for creating the new user.
   * @returns {Promise} A Promise that resolves with the newly created user data.
   */
  createUser: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/Users/create`, data);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  /**
   * Updates an existing user with the provided data.
   * @param {string} id - The ID of the user to update.
   * @param {object} data - Data to update the user with.
   * @returns {Promise} A Promise that resolves with the updated user data.
   */
  updateUser: async (id, data) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/Users/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  /**
   * Deletes a user with the provided ID.
   * @param {string} id - The ID of the user to delete.
   * @returns {Promise} A Promise that resolves with the response data upon successful deletion.
   */
  deleteUser: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/Users/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },

  /**
   * Logs in a user with the provided credentials.
   * @param {object} data - User credentials for login.
   * @returns {Promise} A Promise that resolves with the user data upon successful login.
   */
  loginUser: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/Users/login`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Checks if an email exists in the database.
   * @param {string} email - Email to check for existence.
   * @returns {Promise} A Promise that resolves with the response data indicating email existence.
   */
  checkEmailExists: async (email) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/Users/checkEmailExists`, { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Retrieves the user ID associated with the given email.
   * @param {string} email - Email to retrieve the ID for.
   * @returns {Promise} A Promise that resolves with the user ID.
   */
  getIdByEmail: async (email) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/Users/getIdbyEmail`, { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Retrieves user data by user ID.
   * @param {string} userId - The ID of the user to retrieve data for.
   * @returns {Promise} A Promise that resolves with the user data.
   */
  getUserById: async (userId) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/Users/getUserById/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default UserService;  // Exporting the UserService object for use in other parts of the application
