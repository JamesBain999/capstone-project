import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import { useUserEmailContext } from "../contexts/UserEmailContext";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="card p-4">
          <h1 className="mb-4 text-decoration-underline">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required // Email input is required
                className="form-control form-control-lg" // Bootstrap class
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required // Password input is required
                className="form-control form-control-lg" // Bootstrap class
              />
            </div>
            {/* Button for submitting login form */}
            <div className="row justify-content-center">
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block mt-4"
              >
                Login
              </button>{" "}
              {/* Bootstrap button class */}
            </div>
          </form>
          {/* Displaying error message if login fails */}
          {error && <p className="text-danger mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
