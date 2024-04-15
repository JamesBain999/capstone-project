import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// DiceComponent function component
export default function DiceComponent({ onRollDice, disabled }) {
  // Function to handle rolling the dice
  const handleRollDice = () => {
    // Generating a random number between 1 and 6
    const number = Math.floor(Math.random() * 6) + 1;
    // Calling the callback function passed as prop with the rolled number
    onRollDice(number);
    // Alerting the user about the rolled number
    toast.info(`You just rolled a ${number}`);
  };

  // Rendering the button for rolling the dice
  return (
    <button
      style={{
        borderRadius: "30px",
        textTransform: "uppercase",
        fontSize: "20px",
        fontWeight: "500",
        width: "350px",
        boxShadow: "none",
        padding: "0",
        border: "solid black 5px"
      }}
      onClick={handleRollDice}
      disabled={disabled}
    >
      Press here to roll your dice
    </button>
  );
}
