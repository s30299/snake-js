// config.js
export const tileCount = 20;

export let gridSize = 20;
export function setGridSize(newSize) {
    gridSize = newSize;
}

export const gameState = {
    speed: 200,
    score: 0,
    gameOver: false,
    directionChanged: false,
    timeoutId: null,
};
