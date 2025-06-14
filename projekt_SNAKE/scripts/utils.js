// utils.js
import { snake } from './snake.js';

export function isOnSnake(pos) {
    return snake.some(segment => segment.x === pos.x && segment.y === pos.y);
}
