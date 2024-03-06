import React from "react";
import { Link } from "react-router-dom";
import "../css/LandingPage.css"

// LandingPage component represents the landing page of the application
function LandingPage() {
  return (
    <div className="landing-page-container">
      {/* Heading welcoming users to the application */}
      <h1 className="landing-page-heading">Welcome to Trivia Hunt</h1>
      {/* Information prompting users to log in or sign up */}
      <p className="landing-page-text">Please log in or sign up to continue.</p>
      <div className="landing-page-links">
        {/* Navigation links for logging in and signing up */}
        <Link to="/login" className="landing-page-link">Login</Link>
        <Link to="/signup" className="landing-page-link">Sign Up</Link>
      </div>
    </div>
  );
}

// Exporting the LandingPage component as the default export
export default LandingPage;
