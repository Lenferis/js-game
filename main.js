import Pokemon from './pokemon.js';
import { random, generateLog, countBtn } from './utils.js';
import { pokemons } from './pokemons.js';

const $control = document.querySelector('.control');
const $logs = document.querySelector('#logs');

const pikachu = pokemons.find(item => item.name === 'Pikachu');
const charmander = pokemons.find(item => item.name === 'Charmander');

const player1 = new Pokemon({
    ...pikachu,
    selectors: 'player1',
});

const player2 = new Pokemon({
    ...charmander,
    selectors: 'player2',
});

player1.attacks.forEach(item => {
    const $btn = document.createElement('button');
    $btn.classList.add('button');
    $btn.innerText = item.name;

    const btnCount = countBtn(item.maxCount, $btn);

    $btn.addEventListener('click', () => {
        btnCount();

        const damagePlayer = random(item.maxDamage, item.minDamage);
        player2.changeHP(damagePlayer, (count) => {
            const log = generateLog(player1, player2, count);
            const $p = document.createElement('p');
            $p.innerText = log;
            $logs.insertBefore($p, $logs.children[0]);
        });

        if (player2.hp.current === 0) {
            alert(`Бідний ${player2.name} програв бій!`);
            $btn.disabled = true;
            return;
        }

        const randomEnemyAttack = player2.attacks[random(player2.attacks.length - 1, 0)];
        const damageEnemy = random(randomEnemyAttack.maxDamage, randomEnemyAttack.minDamage);

        player1.changeHP(damageEnemy, (count) => {
            const log = generateLog(player2, player1, count);
            const $p = document.createElement('p');
            $p.innerText = log;
            $logs.insertBefore($p, $logs.children[0]);
        });

        if (player1.hp.current === 0) {
            alert(`Бідний ${player1.name} програв бій!`);
            $btn.disabled = true;
        }
    });

    $control.appendChild($btn);
});

const init = () => {
    console.log('Start Game!');
};

init();