/**
 * Function to determine the category based on the given coordinates (x, y) on the game board.
 * @param {number} x - The x-coordinate on the game board.
 * @param {number} y - The y-coordinate on the game board.
 * @returns {string|null} The category of the tile at the given coordinates, or null if no category is found.
 */
export default function getCategory(x, y) {
  // Object mapping categories to their respective coordinates on the game board
  const categories = {
    history: [
      [0, 0],
      [4, 0],
      [8, 0],
      [9, 3],
      [7, 5],
      [3, 5],
      [0, 4],
    ],
    science: [
      [1, 0],
      [5, 0],
      [9, 0],
      [9, 4],
      [6, 5],
      [2, 5],
      [0, 3],
    ],
    film_and_tv: [
      [2, 0],
      [6, 0],
      [9, 1],
      [9, 5],
      [5, 5],
      [1, 5],
      [0, 2],
    ],
    music: [
      [3, 0],
      [7, 0],
      [9, 2],
      [8, 5],
      [4, 5],
      [0, 5],
      [0, 1],
    ],
  };

  // Loop through categories and check if given coordinates match any category coordinates
  for (const [tileCategory, coords] of Object.entries(categories)) {
    if (coords.some(([cx, cy]) => cx === x && cy === y)) {
      return tileCategory; // Return category if coordinates match
    }
  }

  return null; // Return null if no category matches the given coordinates
}
