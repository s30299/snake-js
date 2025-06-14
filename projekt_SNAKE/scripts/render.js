// render.js
import { setGridSize, tileCount, gridSize } from './config.js';
import { snake } from './snake.js';
import { apple } from './apple.js';

const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

function drawCell(pos, color) {
    ctx.fillStyle = color;
    ctx.fillRect(pos.x * gridSize, pos.y * gridSize, gridSize, gridSize);
}

export function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach(segment => drawCell(segment, 'red'));
    drawCell(apple, 'yellow');
}

function resizeCanvas() {
    const size = Math.min(window.innerWidth, window.innerHeight) * 0.7;
    canvas.width = size;
    canvas.height = size;
    const newGridSize = canvas.width / tileCount;
    setGridSize(newGridSize);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
