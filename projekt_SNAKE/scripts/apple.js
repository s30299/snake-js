// apple.js
import { tileCount } from './config.js';
import { isOnSnake } from './utils.js';

export let apple = getRandomApplePosition();

export function getRandomApplePosition() {
    let position;
    do {
        position = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    } while (isOnSnake(position));
    return position;
}

export function repositionApple() {
    apple = getRandomApplePosition();
}
