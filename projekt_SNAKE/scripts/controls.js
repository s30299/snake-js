// controls.js
import { startGame, stopGame, restartGame } from './game_init.js';

['start', 'stop', 'restart'].forEach(action => {
    const btn = document.getElementById(`${action}-btn`);
    if (btn) btn.addEventListener('click', eval(`${action}Game`));
});

document.querySelectorAll('.touch-controls button').forEach(btn => {
    btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-dir');
        document.dispatchEvent(new KeyboardEvent('keydown', { key }));
    });
});
