import React from "react";

export default function DiceComponent({ onRollDice, disabled }) {
  const handleRollDice = () => {
    const number = Math.floor(Math.random() * 6) + 1;
    onRollDice(number);
    alert(`you just rolled a ${number}`)

  };

  return <button onClick={handleRollDice} disabled={disabled}>Roll Dice</button>
  ;
}