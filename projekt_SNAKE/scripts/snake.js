// snake.js
export let snake = [{ x: 5, y: 5 }];
export let direction = { x: 1, y: 0 };

export function setDirection(newDir) {
    direction = newDir;
}

export function getNextHead() {
    const head = snake[0];
    return { x: head.x + direction.x, y: head.y + direction.y };
}

export function moveSnake(eatApple) {
    const newHead = getNextHead();
    snake.unshift(newHead);
    if (!eatApple) snake.pop();
}

export function resetSnake() {
    snake = [{ x: 5, y: 5 }];
    direction = { x: 1, y: 0 };
}
