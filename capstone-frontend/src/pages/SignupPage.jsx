import React, { useState } from "react";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [name, setname] = useState("");
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
      navigate("/GameOptions");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };
  

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <p>{error}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupPage;
