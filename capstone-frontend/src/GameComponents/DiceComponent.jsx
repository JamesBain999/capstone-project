import React from "react";

// DiceComponent function component
export default function DiceComponent({ onRollDice, disabled }) {
  // Function to handle rolling the dice
  const handleRollDice = () => {
    // Generating a random number between 1 and 6
    const number = Math.floor(Math.random() * 6) + 1;
    // Calling the callback function passed as prop with the rolled number
    onRollDice(number);
    // Alerting the user about the rolled number
    alert(`You just rolled a ${number}`);
  };

  // Rendering the button for rolling the dice
  return (
    <button onClick={handleRollDice} disabled={disabled}>
      Roll Dice
    </button>
  );
}
