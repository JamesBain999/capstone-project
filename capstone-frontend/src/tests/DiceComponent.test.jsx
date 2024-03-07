import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DiceComponent from "../GameComponents/DiceComponent";
import { vi } from "vitest";

describe("DiceComponent", () => {
  it("should roll a number between 1 and 6", () => {
    // Mocking the onRollDice function
    const mockOnRollDice = vi.fn();

    // Rendering the DiceComponent with the mocked onRollDice function
    const { getByText } = render(
      <DiceComponent onRollDice={mockOnRollDice} />
    );
    
    // Finding the button element with the text "Roll Dice"
    const rollButton = getByText("Roll Dice");

    // Simulating a click on the "Roll Dice" button
    fireEvent.click(rollButton);

    // Expecting that the onRollDice function was called once
    expect(mockOnRollDice).toHaveBeenCalledTimes(1);

    // Expecting that the onRollDice function was called with a number argument
    expect(mockOnRollDice).toHaveBeenCalledWith(expect.any(Number));

    // Getting the rolled number passed to the onRollDice function
    const rolledNumber = mockOnRollDice.mock.calls[0][0];

    // Expecting that the rolled number is greater than or equal to 1
    expect(rolledNumber).toBeGreaterThanOrEqual(1);

    // Expecting that the rolled number is less than or equal to 6
    expect(rolledNumber).toBeLessThanOrEqual(6);
  });
});
