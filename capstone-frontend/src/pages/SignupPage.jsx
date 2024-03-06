import React, { useState } from "react";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { useUserEmailContext } from "../contexts/UserEmailContext";
import "../css/SignupPage.css"

// SignupPage component represents the sign up page of the application
const SignupPage = () => {
  const { setUserEmail } = useUserEmailContext(); // Using custom hook to get setUserEmail function
  const [name, setName] = useState(""); // State variable for user's name
  const [password, setPassword] = useState(""); // State variable for user's password
  const [email, setEmail] = useState(""); // State variable for user's email
  const [error, setError] = useState(""); // State variable for error messages
  const navigate = useNavigate(); // Initializing useNavigate hook for navigation

  // Function to handle user signup
  const handleSignup = async (e) => {
    e.preventDefault(); // Preventing default form submission behavior

    try {
      // Checking if email already exists
      const emailExistsResponse = await UserService.checkEmailExists(email);
      if (emailExistsResponse.result === 409) {
        setError("Email already exists"); // Setting error message if email already exists
        return;
      }
      // Creating new user
      const newUser = await UserService.createUser({ name, password, email });
      console.log("User signed up successfully:", newUser);
      // Setting user's email in context
      setUserEmail(email);
      // Navigating to game options page after successful signup
      navigate("/GameOptions");
    } catch (error) {
      console.error("Error signing up:", error); // Logging error if signup fails
    }
  };

  // Rendering the signup form
  return (
    <div className="signup-page-container">
      <h2 className="signup-page-heading">Sign Up</h2>
      {/* Form for user signup */}
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          {/* Input field for entering name */}
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required // Name input is required
            className="signup-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          {/* Input field for entering email */}
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required // Email input is required
            className="signup-input"
          />
          {/* Displaying error message if there's an error */}
          {error && <p className="error-message">{error}</p>}
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
            className="signup-input"
          />
        </div>
        {/* Button to submit the signup form */}
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupPage; // Exporting the SignupPage component
