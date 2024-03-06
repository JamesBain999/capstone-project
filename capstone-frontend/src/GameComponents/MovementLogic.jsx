// Function to move the player on the game board based on the dice roll
export default function movePlayer(diceNumber, columns, rows, currentGameState, setCurrentGameState) {

  // If the dice has not been rolled yet (diceNumber is 0), return the current game state without any movement
  if (diceNumber.number === 0) return currentGameState;

  // Initialize new coordinates for the player's position
  let newX = currentGameState.x;
  let newY = currentGameState.y;

  // Calculate new position based on the dice roll
  for (let i = 0; i < diceNumber.number; i++) {
    // Move right if not at the rightmost column
    if (newY === 0 && newX < columns - 1) {
      newX++;
    }
    // Move down if not at the bottom row
    else if (newX === columns - 1 && newY < rows - 1) {
      newY++;
    }
    // Move left if not at the leftmost column
    else if (newY === rows - 1 && newX > 0) {
      newX--;
    }
    // Move up if not at the top row
    else if (newX === 0 && newY > 0) {
      newY--;
    }
  }

  // Update player position in the game state
  setCurrentGameState({ ...currentGameState, x: newX, y: newY });
}
