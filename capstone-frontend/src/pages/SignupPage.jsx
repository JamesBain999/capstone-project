import React, { useState } from "react";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { useUserEmailContext } from "../contexts/UserEmailContext";
import "../css/SignupPage.css";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const SignupPage = () => {
  const { setUserEmail } = useUserEmailContext();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const emailExistsResponse = await UserService.checkEmailExists(email);
      if (emailExistsResponse.result === 409) {
        setError("Email already exists");
        return;
      }
      const newUser = await UserService.createUser({ name, password, email });
      console.log("User signed up successfully:", newUser);
      setUserEmail(email);
      navigate("/GameOptions");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="signup-page-container">
      <h2 className="signup-page-heading">Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-control" // Bootstrap class
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control" // Bootstrap class
          />
          {error && <p className="error-message">{error}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control" // Bootstrap class
          />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button> {/* Bootstrap button class */}
      </form>
    </div>
  );
}

export default SignupPage;
