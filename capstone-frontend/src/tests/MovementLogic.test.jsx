import movePlayer from '../GameComponents/MovementLogic';

describe('movePlayer function', () => {
  it('should move player within boundaries along the edge', () => {
    const columns = 10;
    const rows = 6;
    const initialGameState = { x: 0, y: 0 };

    // Test moving right
    let currentGameState = { ...initialGameState };
    movePlayer({ number: 2 }, columns, rows, currentGameState, newState => {
      currentGameState = newState;
    });
    expect(currentGameState.x).toBe(2);
    expect(currentGameState.y).toBe(0);

    // Test moving down
    currentGameState = { ...initialGameState, x: 9, y: 0 };
    movePlayer({ number: 2 }, columns, rows, currentGameState, newState => {
      currentGameState = newState;
    });
    expect(currentGameState.x).toBe(9);
    expect(currentGameState.y).toBe(2);

    // Test moving left
    currentGameState = { ...initialGameState, x: 5, y: 5 };
    movePlayer({ number: 3 }, columns, rows, currentGameState, newState => {
      currentGameState = newState;
    });
    expect(currentGameState.x).toBe(2);
    expect(currentGameState.y).toBe(5);

    // Test moving up
    currentGameState = { ...initialGameState, x: 0, y: 1 };
    movePlayer({ number: 1 }, columns, rows, currentGameState, newState => {
      currentGameState = newState;
    });
    expect(currentGameState.x).toBe(0);
    expect(currentGameState.y).toBe(0);
  });

  it('should not move player outside boundaries', () => {
    const columns = 10;
    const rows = 6;
    const initialGameState = { x: 0, y: 0 }; // Starting position at top-left corner

    // Test moving around a corner
    let currentGameState = { ...initialGameState, x: 8, y: 0 };
    movePlayer({ number: 5 }, columns, rows, currentGameState, newState => {
      currentGameState = newState;
    });
    expect(currentGameState.x).toBe(9);
    expect(currentGameState.y).toBe(4);
  });
});
