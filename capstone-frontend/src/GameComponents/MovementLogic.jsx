export default function movePlayer(
  currentGameState,
  diceNumber,
  setCurrentGameState,
  setDiceNumber,
  columns,
  rows
) {

  if (diceNumber === 0) return currentGameState; // No movement if dice not rolled yet

  let newX = currentGameState.x;
  let newY = currentGameState.y;

  // Calculate new position based on dice roll
  for (let i = 0; i < diceNumber; i++) {
    if (newY === 0 && newX < columns - 1) {
      newX++;
    } else if (newX === columns - 1 && newY < rows - 1) {
      newY++;
    } else if (newY === rows - 1 && newX > 0) {
      newX--;
    } else if (newX === 0 && newY > 0) {
      newY--;
    }
  }

  // Update player position
  setCurrentGameState({ ...currentGameState, x: newX, y: newY});
//   setDiceNumber(0); // Reset dice number after movement
}
