import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import { useUserEmailContext } from "../contexts/UserEmailContext";
import "../css/LoginPage.css"

// LoginPage component represents the login page of the application
const LoginPage = () => {
  const { setUserEmail } = useUserEmailContext(); // Getting setUserEmail function from UserEmailContext
  const [email, setEmail] = useState(""); // State for storing user's email
  const [password, setPassword] = useState(""); // State for storing user's password
  const [error, setError] = useState(""); // State for storing error message
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Function to handle user login
  const handleLogin = async (e) => {
    e.preventDefault(); // Preventing default form submission behavior

    try {
      // Calling the loginUser function from UserService to log in the user
      const loggedInUser = await UserService.loginUser({ email, password });
      // Checking if login was successful
      if (loggedInUser && loggedInUser.result === 200) {
        console.log("User logged in successfully:", loggedInUser);
        // Setting user's email in context
        setUserEmail(email);
        // Navigating to the game options page after successful login
        navigate("/GameOptions");
      } else {
        // Handling invalid email or password error
        setError("Invalid email or password");
      }
    } catch (error) {
      // Handling error during login process
      console.error("Error logging in:", error);
      setError("Error logging in. Please try again later.");
    }
  };

  return (
    <div className="login-page-container">
      <h2 className="login-page-heading">Login</h2>
      {/* Form for user login */}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          {/* Input field for entering email */}
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required // Email input is required
            className="login-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          {/* Input field for entering password */}
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required // Password input is required
            className="login-input"
          />
        </div>
        {/* Button for submitting login form */}
        <button type="submit" className="login-button">Login</button>
      </form>
      {/* Displaying error message if login fails */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default LoginPage;
