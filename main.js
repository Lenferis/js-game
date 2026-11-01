import Pokemon from './pokemon.js';
import { random, generateLog } from './utils.js';

const $btnKick = document.getElementById('btn-kick');
const $btnSpecial = document.getElementById('btn-special');
const $logs = document.querySelector('#logs');

const player1 = new Pokemon({
    name: 'Pikachu',
    hp: 100,
    type: 'electric',
    selectors: 'character',
});

const player2 = new Pokemon({
    name: 'Charmander',
    hp: 100,
    type: 'fire',
    selectors: 'enemy',
});

const countClicks = (maxLimit = 6, $btn) => {
    let clicks = 0;
    const initialText = $btn.innerText;
    
    $btn.innerText = `${initialText} (${maxLimit - clicks})`;

    return () => {
        clicks++;
        const leftClicks = maxLimit - clicks;
        
        if (leftClicks >= 0) {
            $btn.innerText = `${initialText} (${leftClicks})`;
        }
        
        if (clicks >= maxLimit) {
            $btn.disabled = true;
            $btn.innerText = `${initialText} (0)`;
        }
        
        return leftClicks;
    };
};

const btnCountJolt = countClicks(6, $btnKick);
const btnCountSpecial = countClicks(6, $btnSpecial);

$btnKick.addEventListener('click', () => {
    btnCountJolt();
    console.log('Thunder Jolt!');

    player1.changeHP(random(20), (count) => {
        const log = generateLog(player1, player2, count);
        const $p = document.createElement('p');
        $p.innerText = log;
        $logs.insertBefore($p, $logs.children[0]);
    });

    player2.changeHP(random(20), (count) => {
        const log = generateLog(player2, player1, count);
        const $p = document.createElement('p');
        $p.innerText = log;
        $logs.insertBefore($p, $logs.children[0]);
    });
});

$btnSpecial.addEventListener('click', () => {
    btnCountSpecial();
    console.log('Special Attack!');

    player1.changeHP(random(35), (count) => {
        const log = generateLog(player1, player2, count);
        const $p = document.createElement('p');
        $p.innerText = log;
        $logs.insertBefore($p, $logs.children[0]);
    });

    player2.changeHP(random(25), (count) => {
        const log = generateLog(player2, player1, count);
        const $p = document.createElement('p');
        $p.innerText = log;
        $logs.insertBefore($p, $logs.children[0]);
    });
});

const init = () => {
    console.log('Start Game!');
};

init();