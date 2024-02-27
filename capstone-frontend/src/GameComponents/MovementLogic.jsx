export default function movePlayer(playerPos, diceNumber, setPlayerPos, setDiceNumber, columns, rows){
    if (diceNumber === 0) return playerPos; // No movement if dice not rolled yet

    let newX = playerPos.x;
    let newY = playerPos.y;

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
    setPlayerPos({ x: newX, y: newY });
    setDiceNumber(0); // Reset dice number after movement
};