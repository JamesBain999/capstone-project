import React, { useState, useEffect } from "react"; // Importing necessary modules from React library
import { useUserIdContext } from "../contexts/CurrentUserIdContext"; // Importing custom hook from CurrentUserIdContext
import UserService from "../services/UserService"; // Importing UserService for handling user-related operations
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom for navigation
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from react-router-dom for navigation
import { useUserEmailContext } from "../contexts/UserEmailContext";
import "../css/UpdateAccountPage.css";

// Functional component for updating user account information
const UpdateAccountPage = () => {
  const { currentUserId } = useUserIdContext(); // Using custom hook to get current user ID
  const { setUserEmail } = useUserEmailContext(); // Using custom hook to use setUserEmail
  const navigate = useNavigate(); // Initializing useNavigate hook for navigation
  const [name, setName] = useState(""); // State to manage user's name
  const [email, setEmail] = useState(""); // State to manage user's email
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state
  const [success, setSuccess] = useState(false); // State to manage success state

  // useEffect hook to fetch user data based on currentUserId when the component mounts or currentUserId changes
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userData = await UserService.getUserById(currentUserId);
        setName(userData.data.name);
        setEmail(userData.data.email);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };

    fetchUserData();
  }, [currentUserId]);

  // Function to handle updating user account information
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await UserService.updateUser(currentUserId, { name, email });
      setUserEmail(email);
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  // Function to handle deleting user account
  const handleDelete = async () => {
    try {
      setLoading(true);
      await UserService.deleteUser(currentUserId);
      setLoading(false);
      console.log("Account deleted successfully!");
      navigate("/"); // Redirect to LandingPage after successful deletion
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  // Rendering the UpdateAccountPage component
  return (
    <div className="update-account-container">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {success && (
        <p className="success-message">Account updated successfully!</p>
      )}
      <h1>Your Account</h1>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button type="submit" className="update-button">
            Update Account
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="delete-button"
          >
            Delete Your Account
          </button>
          <Link to="/GameOptions" className="return-link">
            <button className="return-button">Return to Game Options</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateAccountPage; // Exporting the UpdateAccountPage component for use in other parts of the application
