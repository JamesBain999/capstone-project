export default function getCategory(x, y) {
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

  for (const [tileCategory, coords] of Object.entries(categories)) {
    if (coords.some(([cx, cy]) => cx === x && cy === y)) {
      return tileCategory;
    }
  }

  return null;
}
