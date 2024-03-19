import React from "react";
import { Link } from "react-router-dom";
import "../css/LandingPage.css";

function LandingPage() {
  return (
    <div className="container landing-page-container">
      <h1 className="landing-page-heading">
        Welcome to Trivia Hunt
      </h1>
      <p className="display-4 landing-page-text">
        Please log in or sign up to continue.
      </p>
      <div className="row justify-content-center align-items-center">
        <div className="col">
          <Link to="/login" className="landing-page-button btn btn-primary btn-lg btn-block">
            Login
          </Link>
        </div>
        <div className="col">
          <Link to="/signup" className="landing-page-button btn btn-primary btn-lg btn-block">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
