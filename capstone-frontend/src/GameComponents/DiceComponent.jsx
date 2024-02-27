import React from "react";

export default function DiceComponent({ onRollDice }) {
  const handleRollDice = () => {
    const number = Math.floor(Math.random() * 6) + 1;
    onRollDice(number);
  };

  return <button onClick={handleRollDice}>Roll Dice</button>;
}