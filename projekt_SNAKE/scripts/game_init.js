// game_init.js
import { snake, direction, moveSnake, setDirection, resetSnake } from './snake.js';
import { apple, repositionApple } from './apple.js';
import { draw } from './render.js';
import {gameState, tileCount} from './config.js';
import './controls.js';

const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

document.addEventListener('keydown', handleKeyPress);
document.addEventListener('DOMContentLoaded', updateMaxScoreDisplay);
// document.addEventListener('keydown', handleKeyPress, { passive: false });

function handleKeyPress(e) {
    if (gameState.directionChanged) return;
    if (keys.includes(e.key)) {
        e.preventDefault();
        if (gameState.directionChanged) return;
    }


    switch (e.key) {
        case 'ArrowUp': if (direction.y !== 1) setDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (direction.y !== -1) setDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (direction.x !== 1) setDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (direction.x !== -1) setDirection({ x: 1, y: 0 }); break;
    }
    gameState.directionChanged = true;
}

function updateMaxScoreDisplay() {
    const max = parseInt(localStorage.getItem('maxScore')) || 0;
    document.getElementById('max-score').textContent = max;
}

function gameLoop() {
    checkBestScore();
    if (gameState.gameOver) return;

    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (
        newHead.x < 0 || newHead.x >= tileCount ||
        newHead.y < 0 || newHead.y >= tileCount ||
        snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
    ) {
        gameState.gameOver = true;
        stopGame();
        alert("Game Over!");
        return;
    }

    const ateApple = newHead.x === apple.x && newHead.y === apple.y;
    moveSnake(ateApple);

    if (ateApple) {
        gameState.score++;
        document.getElementById('score').textContent = gameState.score;
        repositionApple();
        if (gameState.score % 5 === 0 && gameState.speed > 50) gameState.speed -= 20;
    }

    draw();
    gameState.directionChanged = false;
    gameState.timeoutId = setTimeout(gameLoop, gameState.speed);
}

export function startGame() {
    if (gameState.timeoutId !== null) return; 

    gameState.gameOver = false;
    updateMaxScoreDisplay();
    gameLoop();
}

export function stopGame() {
    clearTimeout(gameState.timeoutId);
    gameState.timeoutId = null;
}

export function checkBestScore() {
    const maxScore = parseInt(localStorage.getItem('maxScore')) || 0;
    if (gameState.score > maxScore) {
        localStorage.setItem('maxScore', gameState.score);
        document.getElementById('max-score').textContent = gameState.score;
    }
}

export function restartGame() {
    stopGame();
    resetSnake();
    repositionApple();
    gameState.score = 0;
    gameState.speed = 200;
    gameState.gameOver = false;
    document.getElementById('score').textContent = gameState.score;
    draw();
    startGame();
}
