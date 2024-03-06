import React from "react";  // Importing React library for using React components
import { Link } from "react-router-dom";  // Importing Link component from react-router-dom for navigation
import "../css/EndGameScreen.css";

// Functional component for the end game screen
const EndGameScreen = () => {
  return (
    <div className="end-game-screen">
      <h1>Congratulations! You've completed the game!</h1>  {/* Displaying a congratulatory message */}
      <p>Thank you for playing.</p>  {/* Displaying a thank you message */}
      <Link to="/GameOptions" className="return-link">Return to Main Menu</Link>  {/* Link for navigating back to the main menu */}
    </div>
  );
};

export default EndGameScreen;  // Exporting the EndGameScreen component for use in other parts of the application
